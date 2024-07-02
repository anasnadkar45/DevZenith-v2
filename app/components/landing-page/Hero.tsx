'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from "framer-motion"
import HeroAnimation from './HeroAnimation'
import Header1 from '../../../public/header1.png'
import Header2 from '../../../public/header2.png'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { Badge } from '@/components/ui/badge'

type Props = {}

function Hero({ }: Props) {
    const wrapper = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25,
            }
        }
    }

    const list = {
        hidden: { opacity: 0, x: -100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: [0.455, 0.03, 0.515, 0.955], delay: 1 }
        }
    }
    const container = {
        visible: {
            transition: {
                staggerChildren: 0.025
            }
        }
    }
    return (
        <div className='w-full px-4 sm:px-8 lg:px-16 pt-10'>
            <div className='flex flex-col mt-4'>
                <div className='shrink-0 md:w-1/2 lg:w-7/12 xl:w-auto mx-auto'>
                    <motion.h1 initial='hidden' animate='visible' variants={container} className='text-4xl text-center lg:text-5xl mb-8 font-semibold'>
                        {/* <span className='text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-300 inline-block'>The best way to</span> */}
                        <HeroAnimation text='Collaboration That Fascinates.' className='text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-300 inline-block' />
                        <HeroAnimation text='Imagine Discovering Projects by Skills and' className='text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-violet-600 inline-block' />
                        <HeroAnimation text='Seamlessly Joining to Build Together.' className='text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-300 inline-block' />
                        {/* <span className='text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-violet-600 inline-block'>do clustering</span>
                    <span className='text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-300 inline-block'>in TypeScript</span> */}
                    </motion.h1>
                    <motion.ul initial='hidden' animate='visible' variants={wrapper} className='text-white w-full mx-auto space-y-2'>
                        <motion.li variants={list} className='flex justify-center'>
                            <Badge variant={'secondary'} className='text-md'>Empower Your Coding Journey Through Collaboration.</Badge>
                        </motion.li>
                    </motion.ul>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 1.5 }} className='mt-10 flex justify-center items-center gap-3'>
                        <div className='inline-flex relative z-10 h-10 rounded-xl p-px shadow-lg bg-gradient-to-b from-white to-zinc-300'>
                            <div className='flex items-center gap-1 px-6 font-medium rounded-xl whitespace-nowrap bg-white text-black'>
                                <LoginLink>Get Started</LoginLink>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="fill-current h-3.5 "><path d="M429.8 273l17-17-17-17L276.2 85.4l-17-17-33.9 33.9 17 17L354.9 232 24 232 0 232l0 48 24 0 330.8 0L242.2 392.6l-17 17 33.9 33.9 17-17L429.8 273z"></path></svg>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <div className='pt-3 shrink grow overflow-hidden z-20'>
                    <motion.div initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 1.5 }} className='relative'>
                        <div className='relative p-px overflow-hidden rounded-3xl sm:rounded-[2rem] bg-gradient-to-br from-white to-zinc-600'>
                            <div className='rounded-3xl sm:rounded-[31px] overflow-hidden p-1.5 bg-gradient-to-br from-zinc-400 to-zinc-700'>
                                <div className='rounded-[17px] sm:rounded-[25px] overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-950'>
                                    <Image src={Header1} className='object-fill object-center' alt='Hero-Image' />
                                    <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
                                        <button className='inline-flex h-10 rounded-xl p-px bg-gradient-to-br from-[#84B2E5] to-[#2F6EB1] shadow-lg'>
                                            <LoginLink>Login</LoginLink>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Hero