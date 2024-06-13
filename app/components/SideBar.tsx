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
        <nav className='pt-6  border-r h-full flex-col gap-y-4 fixed w-[200px]'>

            <div className=''>
                <SideBarLinks />

                <div className='fixed bottom-0 ml-3 mb-5 '>
                    
                    {user ? (
                        <Button className='w-[175.2px]'>
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
