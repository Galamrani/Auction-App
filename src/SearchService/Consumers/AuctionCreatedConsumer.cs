using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Entities;

namespace SearchService.Consumers;

public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
{
    private readonly IMapper _mapper;

    public AuctionCreatedConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }
    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        Console.WriteLine("");
        Console.WriteLine("--->> Consuming Auction Created:" + context.Message.Id);
        Console.WriteLine("");

        var item = _mapper.Map<Item>(context.Message);

        await item.SaveAsync();
    }
}
