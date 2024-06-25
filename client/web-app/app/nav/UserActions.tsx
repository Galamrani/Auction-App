'use client'

import { Button, Dropdown, DropdownDivider } from 'flowbite-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { AiFillTrophy, AiOutlineLogout } from 'react-icons/ai'
import { FaMoneyBillWave } from 'react-icons/fa6'
import { HiUser } from 'react-icons/hi'

type Props = {
    name: string | undefined | null
}

export default function UserActions({name}: Props) {
  return (
    <Dropdown label={`Welcome, ${name}`} inline>
    <Dropdown.Item icon={HiUser}>
      <Link href='/'>My Auctions</Link>
    </Dropdown.Item>
    <Dropdown.Item icon={AiFillTrophy}>
      <Link href='/'>Auctions Won</Link>
    </Dropdown.Item>    
    <Dropdown.Item icon={FaMoneyBillWave}>
      <Link href='/'>Post Auction</Link>
    </Dropdown.Item>   
    <DropdownDivider /> 
    <Dropdown.Item icon={AiOutlineLogout} onClick={() => signOut({callbackUrl: '/'})}>
      Sign out
    </Dropdown.Item>  
  </Dropdown>
  )
}


