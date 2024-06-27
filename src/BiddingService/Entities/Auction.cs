using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Entities;

namespace BiddingService.Entities
{
    public class Auction : Entity
    {
        public DateTime AuctionEnd { get; set; }
        public string Seller { get; set; }
        public int ReservePrice { get; set; }
        public bool Finished { get; set; }
    }
}