'use client'

import { useParamsStore } from '@/hooks/useParamsStore'
import React from 'react'
import { IoHomeOutline } from "react-icons/io5";

export default function Logo() {
    const reset = useParamsStore(state => state.reset);

    return (
        <div onClick={reset} 
        className='cursor-pointer flex items-center gap-2 text-3xl font-semibold text-gray-800 hover:text-red-600 transition-colors'>
        <IoHomeOutline size={34}/>
            <span className="text-lg font-bold tracking-widest text-gray-800 hover:text-red-600 transition-colors">AUCTIONS</span>
        </div>
    )
}
