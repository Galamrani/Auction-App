import React from 'react'
import AuctionForm from '../AuctionForm'

export default function Create() {
  return (
    <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'>
      <h1>Post an Auction</h1>
      <AuctionForm />
    </div>
  )
}
