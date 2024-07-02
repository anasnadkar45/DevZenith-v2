import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { MobileMenu } from "./MobileMenu";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "./UserNav";
import { ModeToggle } from "./ModeToggle";
import { FeedBack } from "./form/FeedBack";
import Logo from "../../public/logo.png";
import Image from "next/image";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="fixed mb-12 w-full border-b bg-card mx-auto flex px-3 h-14 items-center z-10">
      <div className="md:col-span-3">
        {
          user ? (
            <Link href="/profile">
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

            </Link>
          ) : (
            <Link href="/">
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
            </Link>
          )
        }

      </div>

      {/* <NavbarLinks /> */}



      <div className="flex items-center ms-auto md:col-span-3">
        {user ? (
          <div className="flex gap-2">
            <ModeToggle />
            <div>
              <FeedBack />
            </div>
            <UserNav
              email={user.email as string}
              name={user.given_name as string}
              userImage={
                user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
              }
            />
          </div>
        ) : (
          <div className="flex items-center gap-x-4">
            <button className='relative inline-flex h-9 w-full items-center justify-center rounded-md bg-white px-6 font-medium text-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'>
              <div className='absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur' />
              <LoginLink>Login</LoginLink>
            </button>

            <Button size={"sm"}  asChild>
              <RegisterLink>Register</RegisterLink>
            </Button>
          </div>
        )}

        {/* <div className="md:hidden">
          <MobileMenu />
        </div> */}
      </div>
    </nav>
  );
}