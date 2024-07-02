'use client'
import React from 'react'
import { motion } from "framer-motion"
import Image from 'next/image'
import Logo from '../../../public/logo.png'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { Button } from '@/components/ui/button'

type Props = {}

function Navbar({ }: Props) {
    return (
        <div className='w-full max-w-full mx-auto  sm:px-8 lg:px-16 flex items-center justify-between font-light text-zinc-300 sticky top-0 backdrop-blur-md z-50'>
            <div className='overflow-hidden p-4'>
                <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <a href="/" className='z-50 flex items-center space-x-1'>
                        <div className="flex">
                            <Image
                                src={Logo}
                                alt="Logo"
                                width={40}
                                height={40}
                            />
                            <h1 className="text-3xl font-[900] ">
                                ev<span className="text-primary">Zenith</span>
                            </h1>
                        </div>
                    </a>
                </motion.div>
            </div>
            <div className='overflow-hidden p-4'>
                <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className='flex items-center space-x-6' >
                    <div className="flex items-center gap-x-4">
                        <button className='relative inline-flex h-9 w-full items-center justify-center rounded-md bg-white px-6 font-medium text-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'>
                            <div className='absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur' />
                            <LoginLink>Login</LoginLink>
                        </button>

                        <Button size={"sm"} asChild>
                            <RegisterLink>Register</RegisterLink>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Navbar