'use client'

import { useParamsStore } from '@/hooks/useParamsStore'
import { Button, Dropdown, DropdownDivider } from 'flowbite-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { AiFillTrophy, AiOutlineLogout } from 'react-icons/ai'
import { FaMoneyBillWave } from 'react-icons/fa6'
import { HiUser } from 'react-icons/hi'

type Props = {
    user: User
}

export default function UserActions({user}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const setParams = useParamsStore(state => state.setParmas);
   
  function setWinner() {
    setParams({winner: user.username, seller: undefined});
    if (pathname !== '/') router.push('/');
  }
  function setSeller() {
    setParams({seller: user.username, winner: undefined});
    if (pathname !== '/') router.push('/');
  }

  console.log(user);
  return (
    <Dropdown label={`Welcome, ${user?.name}`} inline>
    <Dropdown.Item icon={HiUser} onClick={setSeller}>
      My Auctions
    </Dropdown.Item>
    <Dropdown.Item icon={AiFillTrophy} onClick={setWinner}>
      Auctions Won
    </Dropdown.Item>    
    <Dropdown.Item icon={FaMoneyBillWave}>
      <Link href='/auctions/create'>Post Auction</Link>
    </Dropdown.Item>   
    <Dropdown.Item>
      <Link href='/session'>Session (dev only)</Link>
    </Dropdown.Item>   
    <DropdownDivider /> 
    <Dropdown.Item icon={AiOutlineLogout} onClick={() => signOut({callbackUrl: '/'})}>
      Sign out
    </Dropdown.Item>  
  </Dropdown>
  )
}


