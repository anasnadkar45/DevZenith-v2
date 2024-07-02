import Image from 'next/image'
import React from 'react'
import Logo from '../../../public/logo.png'

type Props = {}

function Footer({ }: Props) {
    return (
        <div className='dark'>
            <footer className='bg-zinc-50 dark:bg-black text-zinc-700 dark:text-zinc-400 text-sm z-20'>
                <hr className="w-full border-none h-px bg-gradient-to-r from-black/0 via-black/20 to-black/0 dark:from-white/0 dark:via-white/25 dark:to-white/0 " />
                <div className='w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-8 flex flex-col sm:flex-row gap-10 justify-between'>
                    <div>
                        <a href="/" className='z-50 flex items-center space-x-1'>
                            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden dark:block h-7 sm:h-8"><path fillRule="evenodd" clipRule="evenodd" d="M29.8022 24.317C30.2747 24.05 30.4361 23.4582 30.1636 22.9953C29.891 22.5329 29.2873 22.3741 28.8148 22.6411L15.9211 29.9362L3.07463 22.6683C2.60281 22.4012 1.999 22.5594 1.72597 23.0225C1.45347 23.4854 1.61541 24.077 2.08741 24.3441L15.3897 31.8698C15.5053 31.9353 15.6327 31.9771 15.7645 31.9929C15.8963 32.0087 16.0299 31.9981 16.1576 31.9617C16.278 31.9433 16.3941 31.9031 16.5002 31.8431L29.8022 24.317Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M31.1298 16.6012C31.1974 16.1929 31.0061 15.7675 30.6177 15.5488L16.555 7.63105C16.4443 7.56873 16.3234 7.52682 16.198 7.50732C16.0631 7.46888 15.922 7.45758 15.7827 7.47405C15.6434 7.49053 15.5088 7.53446 15.3865 7.60332L1.32289 15.5214C0.913972 15.7518 0.723686 16.2117 0.824499 16.6391C0.780205 16.9913 0.91787 17.3598 1.32768 17.5916L15.3904 25.5478C15.5127 25.6169 15.6475 25.661 15.7869 25.6776C15.9263 25.6942 16.0675 25.6829 16.2026 25.6445C16.3297 25.6253 16.4522 25.583 16.5642 25.5197L30.6275 17.563C31.0408 17.329 31.1776 16.9562 31.1298 16.6012ZM28.2266 16.5591L15.9459 9.64453L3.67206 16.5554L15.9528 23.5034L28.2266 16.5591Z" fill="white"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M31.3429 10.6097C31.8677 10.3131 32.0476 9.65608 31.7442 9.14178C31.4416 8.62819 30.7712 8.45201 30.2464 8.74854L15.9269 16.8501L1.66063 8.77876C1.13584 8.48152 0.465408 8.65787 0.162793 9.172C-0.14053 9.68541 0.0391253 10.3432 0.564095 10.6397L15.337 18.9976C15.4654 19.0702 15.607 19.1165 15.7534 19.1339C15.8998 19.1514 16.0482 19.1395 16.19 19.0991C16.3236 19.0791 16.4524 19.0347 16.5701 18.9681L31.3429 10.6097Z" fill="white"></path><path d="M2.7403 9.6795L15.8991 1.62024L29.0577 9.67879L15.8989 17.2013L2.7403 9.6795Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M31.3255 8.49027C31.8513 8.78627 32.0333 9.44279 31.7325 9.95692C31.4307 10.4707 30.7603 10.6474 30.2344 10.3514L15.9128 2.28787L1.64317 10.3224C1.11731 10.6184 0.44688 10.4415 0.145328 9.92794C-0.15587 9.41381 0.0262664 8.75729 0.55159 8.46129L15.325 0.143725C15.4534 0.0713274 15.5949 0.0251207 15.7412 0.00776107C15.8875 -0.00959854 16.0358 0.00223134 16.1775 0.0425706C16.3093 0.0631109 16.4364 0.107185 16.5526 0.172702L31.3255 8.49027Z" fill="white"></path>
                            </svg>
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
                    </div>
                    <div className='flex flex-wrap sm:gap-x-12 gap-y-6 sm:mt-0'>
                        <p className="leading-relaxed">MIT Licensed<br />Copyright © 2024 AnasNadkar.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer