import React from 'react';
import { UserNav } from './UserNav';
import Link from 'next/link';
import { LoginLink, LogoutLink, RegisterLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { SideBarLinks } from './SideBarLinks';
import { Button } from "@/components/ui/button";

export async function SideBar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className='pt-6  border-r h-full flex-col gap-y-4 fixed w-[240px]'>
            {/* <div className='mb-5'>
                <Link href="/main/resources">
                    <h1 className="font-bold text-3xl px-3 pb-5">
                        Dev<span className="text-primary">Zenith</span>
                    </h1>
                </Link>
                <div className='h-[1px] border-b'></div>
            </div> */}

            <div className=''>
                <SideBarLinks />

                <div className='fixed bottom-0 ml-3 mb-5 '>
                    
                    {user ? (
                        <Button className='w-[215.2px]'>
                            <LogoutLink>Log out</LogoutLink>
                        </Button>
                    ) : (
                        <>
                        </>
                    )}
                </div>
            </div>

        </nav>
    );
}
