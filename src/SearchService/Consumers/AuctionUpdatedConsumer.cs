using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Entities;

namespace SearchService.Consumers;

public class AuctionUpdatedConsumer : IConsumer<AuctionUpdated>
{
    public async Task Consume(ConsumeContext<AuctionUpdated> context)
    {
        Console.WriteLine("");
        Console.WriteLine("--->> Consuming Auction Updeted:" + context.Message.Id);
        Console.WriteLine("");

        var result = await DB.Update<Item>()
        .Match(a => a.ID == context.Message.Id)
        .Modify(a => a.Make, context.Message.Make)
        .Modify(a => a.Model, context.Message.Model)
        .Modify(a => a.Color, context.Message.Color)
        .Modify(a => a.Mileage, context.Message.Mileage)
        .Modify(a => a.Year, context.Message.Year)
        .ExecuteAsync();

        if (!result.IsAcknowledged) throw new MessageException(typeof(AuctionUpdated), "Problem updating mongodb");
    }
}



