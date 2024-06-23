export type PagedResult<T> = {
    results: T[]
    pageCount: number
    totalCount: number
}

export type Auction = {
    id: string
    reservePrice: number
    seller: string
    winner?: string
    createdAt: string
    updatedAt: string
    auctionEnd: string
    status: string
    soldAmount: number
    currentHighBid: number
    make: string
    model: string
    year: number
    color: string
    mileage: number
    imageUrl: string
}
  
