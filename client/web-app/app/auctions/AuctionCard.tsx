import Image from 'next/image'
import React from 'react'
import CountdownTimer from './CountdownTimer'
import { Auction } from '@/types'

type Props = {
    auction: Auction
}

export default function AuctionCard(props: Props) {
  return (
    <a href="#" className='group'>
        <div className='w-full bg-gray-200 aspect-w-16 aspect-h-10 rounded-lg overflow-hidden'>
          <div>
            <Image
                  src={props.auction.imageUrl}
                  alt='image'
                  fill
                  priority
                  className='object-cover group-hover:opacity-75 duration-700 ease-in-out'
                  sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw'
              />
              <div className='absolute bottom-2 left-2 text-sm'>
                <CountdownTimer auctionEnd={props.auction.auctionEnd}/>
              </div>
          </div>
        </div>
        <div className='flex justify-between items-center mt-4'>
          <h3 className='text-gray-700'>{props.auction.make} {props.auction.model}</h3>
          <p className='font-semibold text-sm'>{props.auction.year}</p>
        </div>
        
    </a>
  )
}



