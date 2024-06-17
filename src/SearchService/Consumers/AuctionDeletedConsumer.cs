﻿using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Entities;

namespace SearchService.Consumers;

public class AuctionDeletedConsumer : IConsumer<AuctionDeleted>
{
    public async Task Consume(ConsumeContext<AuctionDeleted> context)
    {
        Console.WriteLine("");
        Console.WriteLine("--->> Consuming Auction Deleted:" + context.Message.Id);
        Console.WriteLine("");

        var result = await DB.DeleteAsync<Item>(context.Message.Id);

        if (!result.IsAcknowledged) throw new MessageException(typeof(AuctionDeleted), "Problem deleting auction");
    }
}
