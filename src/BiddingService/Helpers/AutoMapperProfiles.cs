using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BiddingService.DTOs;
using BiddingService.Entities;
using Contracts;

namespace BiddingService.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Bid, BidDto>();
            CreateMap<Bid, BidPlaced>();
        }
    }
}