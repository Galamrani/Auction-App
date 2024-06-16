using AutoMapper;
using Contracts;
using SearchService.Entities;

namespace SearchService.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AuctionCreated, Item>();
    }
}
