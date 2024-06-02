import React from 'react';
import { UserNav } from './UserNav';
import Link from 'next/link';
import { LoginLink, RegisterLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { SideBarLinks } from './SideBarLinks';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

export async function SideBar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className='pt-8 border-r h-full flex-col gap-y-4'>
            <div className='mb-8'>
                <Link href="/">
                    <h1 className="font-bold text-4xl px-3 pb-3">
                        Dev<span className="text-primary">Zenith</span>
                    </h1>
                </Link>
                <div className='h-[1px] border-b'></div>
            </div>

            <SideBarLinks />

            <div className='fixed bottom-0 ml-3 mb-5 '>
                <div className="border-t h-[1px] -mr-[29px] -ml-6 mb-5"></div>
                {user ? (
                    <UserNav
                        email={user.email as string}
                        name={user.given_name as string}
                        userImage={
                            user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
                        }
                    />
                ) : (
                    <div className="flex items-center gap-x-2">
                        <Button asChild>
                            <LoginLink>Login</LoginLink>
                        </Button>
                        <Button variant="secondary" asChild>
                            <RegisterLink>Register</RegisterLink>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
}
