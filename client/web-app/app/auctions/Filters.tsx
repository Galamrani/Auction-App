import { useParamsStore } from '@/hooks/useParamsStore'
import { Button } from 'flowbite-react'
import React from 'react'
import { BsStopFill } from 'react-icons/bs';
import { TbLivePhoto, TbLivePhotoOff } from "react-icons/tb";
import { ImSortAlphaAsc } from "react-icons/im";
import { IoTimer, IoTimeOutline } from "react-icons/io5";
import { MdOutlineAddToPhotos } from "react-icons/md";

export default function Filters() {
    const setParams = useParamsStore(state => state.setParmas)
    const orderBy = useParamsStore(state => state.orderBy)
    const filterBy = useParamsStore(state => state.filterBy)
    
    const orderButtons = [
        {
            label: 'Alphabetical',
            icon: ImSortAlphaAsc,
            value: 'make'
        },
        {
            label: 'End date',
            icon: IoTimer,
            value: 'end'
        },
        {
            label: 'Recently added',
            icon: MdOutlineAddToPhotos,
            value: 'new'
        },
    ]
    const filterButtons = [
        {
            label: 'Live Auctions',
            icon: TbLivePhoto,
            value: 'live'
        },
        {
            label: 'Ending < 6 hours',
            icon: IoTimeOutline,
            value: 'endingSoon'
        },
        {
            label: 'Completed',
            icon: TbLivePhotoOff,
            value: 'finished'
        },
    ]

    return (
        <div className='flex justify-start items-center mb-4 space-x-24'>
            <div> 
                <span className='uppercase text-sm text-gray-500 mr-2'>Order By</span>
                <Button.Group>
                    {orderButtons.map(({label, icon: Icon, value}) => (
                        <Button 
                            key={label} 
                            onClick={() => setParams({orderBy: value})}
                            color={`${orderBy === value ? 'red' : 'gray'}`}
                        >
                            <Icon className='mr-3 h-4 w-4'/>
                            {label}
                        </Button>
                    ))}
                </Button.Group>
            </div>
            <div> 
                <span className='uppercase text-sm text-gray-500 mr-2'>Filter By</span>
                <Button.Group>
                    {filterButtons.map(({label, icon: Icon, value}) => (
                        <Button 
                            key={label} 
                            onClick={() => setParams({filterBy: value})}
                            color={`${filterBy === value ? 'red' : 'gray'}`}
                        >
                            <Icon className='mr-3 h-4 w-4'/>
                            {label}
                        </Button>
                    ))}
                </Button.Group>
            </div>
        </div>
    )
}
