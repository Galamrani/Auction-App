using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionCreatedFaultConsumers : IConsumer<Fault<AuctionCreated>>
{
    public Task Consume(ConsumeContext<Fault<AuctionCreated>> context)
    {
        Console.WriteLine("");
        Console.WriteLine("--->> Consuming Auction Created Fault:" + context.Message.FaultId);
        Console.WriteLine("--->> Consuming Auction Created Fault:" + context.Message.Exceptions.First().Message);
        Console.WriteLine("");
        return Task.CompletedTask;
    }
}
