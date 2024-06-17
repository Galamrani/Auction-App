using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionsCotroller : ControllerBase
{
    private readonly AuctionDbContext _context;
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;

    public AuctionsCotroller(AuctionDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint)
    {
        _context = context;
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
    }

    [HttpGet]
    public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions(string date)
    {
        var query = _context.Auctions.OrderBy(x => x.Item.Make).AsQueryable();

        if (!string.IsNullOrEmpty(date))
        {
            query = query.Where(x => x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
        }

        return await query.ProjectTo<AuctionDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
    {
        var auction = await _context.Auctions
        .Include(x => x.Item)
        .FirstOrDefaultAsync(x => x.Id == id);

        if (auction == null) return NotFound();

        return _mapper.Map<AuctionDto>(auction);
    }

    [HttpPost]
    public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto createAuctionDto)
    {
        var auction = _mapper.Map<Auction>(createAuctionDto);

        // TODO: add current user as seller

        auction.Seller = "test";

        _context.Auctions.Add(auction);

        var newAuction = _mapper.Map<AuctionDto>(auction);

        await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(newAuction));

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Could not save to the DB");

        return CreatedAtAction(nameof(GetAuctionById), new { auction.Id }, newAuction);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDto updateAuctionDto)
    {
        var auction = await _context.Auctions
        .Include(x => x.Item)
        .FirstOrDefaultAsync(x => x.Id == id);

        if (auction == null) return NotFound();

        // TODO: check seller == username

        auction.Item.Make = updateAuctionDto.Make ?? auction.Item.Make;
        auction.Item.Model = updateAuctionDto.Model ?? auction.Item.Model;
        auction.Item.Color = updateAuctionDto.Color ?? auction.Item.Color;
        auction.Item.Mileage = updateAuctionDto.Mileage ?? auction.Item.Mileage;
        auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;

        await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auction));

        if (await _context.SaveChangesAsync() > 0) return Ok();

        return BadRequest("Could not save to the DB");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAuction(Guid id)
    {
        var auction = await _context.Auctions.FindAsync(id);

        if (auction == null) return NotFound();

        await _publishEndpoint.Publish(new AuctionDeleted { Id = auction.Id.ToString() });

        _context.Auctions.Remove(auction);

        if (await _context.SaveChangesAsync() > 0) return Ok();

        return BadRequest("Could not delete from the DB");
    }
}
