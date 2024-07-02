import { getBidsForAuction, getDetailedViewData } from '@/app/actions/auctionActions'
import React from 'react'
import CountdownTimer from '../../CountdownTimer';
import Image from 'next/image'
import { getCurrentUser } from '@/app/actions/authActions';
import DetailedSpecs from './DetailsSpecs';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import BidItem from './BidItem';
import BidList from './BidList';

export default async function Details({ params }: { params: { id: string } }) {
  const data = await getDetailedViewData(params.id);
  const user = await getCurrentUser();

  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex items-center gap-3'>
        <h1 className='text-3xl font-bold'>{data.make} {data.model}</h1>
          {user?.username === data.seller && (
            <div className='flex gap-2 ml-6'>
              <>
                <EditButton id={data.id}/>
                <DeleteButton id={data.id}/>
              </>
            </div>
          )}
        </div>

        <div className='flex gap-3'>
          <h3 className='text-2xl font-semibold'>Time remaining:</h3>
          <CountdownTimer auctionEnd={data.auctionEnd} />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6 mt-3'>
        <div className='w-full bg-gray-200 aspect-h-10 aspect-w-16 rounded-lg overflow-hidden'>
          <Image 
            src={data.imageUrl} 
            alt='image' 
            width={1280} 
            height={720} 
          />        
        </div>
          <BidList user={user} auction={data}/>
      </div>

      <div className='mt-3 grid grid-cols-1 rounded-lg'>
        <DetailedSpecs auction={data} />
      </div>

    </div>
  )
}