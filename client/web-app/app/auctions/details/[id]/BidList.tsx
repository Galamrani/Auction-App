'use client'

import { getBidsForAuction } from '@/app/actions/auctionActions'
import { useBidStore } from '@/hooks/useBidsStore'
import { Auction, Bid } from '@/types'
import { User } from 'next-auth'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import BidItem from './BidItem'
import BidForm from './BidForm'
import { numberWithCommas } from '@/lib/numberWithCommas'

type Props = {
    user: User | null
    auction: Auction
}

export default function BidList({user, auction}: Props) {
    const [loading, setLoading] = useState(true);
    const bids = useBidStore(state => state.bids);
    const setBids = useBidStore(state => state.setBids);

    const highBid = bids.reduce((prev, curr) => prev > curr.amount ? prev : curr.amount, 0);

    useEffect(() => {
        getBidsForAuction(auction.id)
            .then((res: any) => {
                if (res.error) throw res.error();
                setBids(res as Bid[]);
            }).catch(err => {
                toast.error(err.message);
            }).finally(() => setLoading(false)) 
    }, [auction.id, setLoading, setBids])

    if (loading) return <span>Loading bids...</span>

    return (
        <div className='rounded-lg shadow-md'>
            <div className='py-2 px-4 bg-white'>
                <div className='sticky top-0 bg-white p-2'>
                    <h1 className='m-auto font-semibold text-gray-700 p-2 bg-blue-300 rounded-md shadow'><strong>Current highest bid: ${numberWithCommas(highBid)}</strong></h1>
                </div>
            </div>

            <div className='overflow-auto h-[400px] flex flex-col-reverse px-2'>
                {bids.length === 0 ? (
                    <h2 className='m-auto text-xl font-semibold text-center p-4 bg-gray-300 rounded-md shadow'>
                        No bids have been placed yet.
                    </h2>
                ) : (
                    <>
                        {bids.map(bid => (
                            <BidItem key={bid.id} bid={bid} />
                        ))}
                    </>
                )}
            </div>

            <div className='px-2 pb-2 text-gray-500'>
                {!user ? (
                    <div className='flex items-center justify-center p-2 text-lg font-semibold'>
                        Please login to make a bid
                    </div>
                ) : user && user.username === auction.seller ? (
                    <div className='flex items-center justify-center p-2 text-lg font-semibold'>
                        You cannot bid on your own auction
                    </div>
                ) : (
                    <BidForm auctionId={auction.id} highBid={highBid} />
                )}
            </div>
        </div>
    )
}
