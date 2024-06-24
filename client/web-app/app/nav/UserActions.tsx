'use client'

import { Button, Dropdown } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    name: string | undefined | null
}

export default function UserActions({name}: Props) {
  return (
    <Dropdown label={`Welcome, ${name}`} inline>
    <Dropdown.Item>Dashboard</Dropdown.Item>
    <Dropdown.Item>Settings</Dropdown.Item>
    <Dropdown.Item>Earnings</Dropdown.Item>
    <Dropdown.Item>Sign out</Dropdown.Item>
  </Dropdown>
  )
}


