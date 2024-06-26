import React from 'react'
import AuctionForm from '../../AuctionForm'
import { getDetailedViewData } from '@/app/actions/auctionActions'

export default async function Update({params}: {params: {id: string}}) {
  const data = await getDetailedViewData(params.id);

  return (
    <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'>
      <h1 className='text-3xl font-bold'>Update your auction</h1>
      <AuctionForm auction={data} />
    </div>
  )
}