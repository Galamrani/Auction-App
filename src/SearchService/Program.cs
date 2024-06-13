using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Data;
using SearchService.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();


var app = builder.Build();



app.UseAuthorization();

app.MapControllers();

try
{
    await SearchSeed.InitDb(app);
}
catch (Exception e)
{
    Console.WriteLine(e);
}

app.Run();
