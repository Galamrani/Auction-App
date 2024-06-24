'use client'

import { useParamsStore } from '@/hooks/useParamsStore'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function Search() {
    const setParams = useParamsStore(state => state.setParmas);
    const [value, setValue] = useState('');
  

    function onChange(event: any) {
        setValue(event.target.value);
    }

    function search() {
        setParams({searchTerm: value});
    }


    return (
    <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
        <input 
            onKeyDown={(e: any) => {
                if (e.key === 'Enter') search()
            }}
            value={value}
            onChange={onChange}
            type="text" 
            placeholder='Search'
            className='flex-grow pl-5 bg-transparent focus:outline-none border-transparent focus:border-transparent focus:ring-0 text-sm text-gray-6000'
        />
        <button onClick={search}>
            <FaSearch size={34} className='bg-gray-800 text-white rounded-full p-2 cursor-pointer mx-2 hover:bg-red-600 transition-colors' />
        </button>
    </div>
  )
}


