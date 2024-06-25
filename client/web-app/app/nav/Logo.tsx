'use client'

import { useParamsStore } from '@/hooks/useParamsStore'
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { IoHomeOutline } from "react-icons/io5";

export default function Logo() {
    const router = useRouter();
    const pathname = usePathname();
    const reset = useParamsStore(state => state.reset);

    function doReset() {
        if (pathname !== '/') router.push('/');
        reset();
    }

    return (
        <div 
            onClick={doReset} 
            className='cursor-pointer flex items-center gap-2 text-3xl font-semibold text-gray-800 hover:text-red-600 transition-colors'
        >
            <div className='flex items-center gap-2 hover:text-red-600 transition-colors'>
                <IoHomeOutline size={34}/>
                <span className="text-lg font-bold tracking-widest">AUCTIONS</span>
            </div>
        </div>
    );
}
