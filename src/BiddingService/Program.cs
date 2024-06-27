using BiddingService.Consumers;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MongoDB.Driver;
using MongoDB.Entities;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddControllers();

builder.Services.AddMassTransit(x =>
{
    x.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();
    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("bids", false));
    x.UsingRabbitMq((context, config) =>
    {
        config.Host(builder.Configuration["RabbitMq:Host"], "/", host =>
        {
            host.Username(builder.Configuration.GetValue("RabbitMQ:Username", "guest"));
            host.Password(builder.Configuration.GetValue("RabbitMQ:Password", "guest"));
        });

        config.ConfigureEndpoints(context);
    });
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.Authority = builder.Configuration["IdentityServiceUrl"];
        opt.RequireHttpsMetadata = false;
        opt.TokenValidationParameters.ValidateAudience = false;
        opt.TokenValidationParameters.NameClaimType = "username";
    });


var app = builder.Build();

app.UseAuthorization();

app.MapControllers();

await DB.InitAsync("BidDd", MongoClientSettings.FromConnectionString(builder.Configuration.GetConnectionString("BidDbConnection")));

app.Run();
