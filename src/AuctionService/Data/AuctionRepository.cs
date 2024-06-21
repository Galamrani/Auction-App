using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace AuctionService;

public class AuctionRepository : IAuctionRepository
{
    private readonly AuctionDbContext _auctionDbContext;
    private readonly IMapper _mapper;

    public AuctionRepository(AuctionDbContext auctionDbContext, IMapper mapper)
    {
        _auctionDbContext = auctionDbContext;
        _mapper = mapper;
    }
    public async void AddAuction(Auction auction)
    {
        await _auctionDbContext.Auctions.AddAsync(auction);
    }

    public async Task<AuctionDto> GetAuctionByIdAsync(Guid id)
    {
        return await _auctionDbContext.Auctions
            .ProjectTo<AuctionDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Auction> GetAuctionEntityByIdAsync(Guid id)
    {
        return await _auctionDbContext.Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<List<AuctionDto>> GetAuctionsAsync(string date)
    {
        var query = _auctionDbContext.Auctions.OrderBy(x => x.Item.Make).AsQueryable();

        if (!string.IsNullOrEmpty(date))
        {
            query = query.Where(x => x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
        }

        return await query.ProjectTo<AuctionDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    public void RemoveAuction(Auction auction)
    {
        _auctionDbContext.Auctions.Remove(auction);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _auctionDbContext.SaveChangesAsync() > 0;
    }
}
