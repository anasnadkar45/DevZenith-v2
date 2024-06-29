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
        <ModeToggle />
        {user ? (
          <div className="flex gap-2">
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
          <div className="flex items-center gap-x-2">
            <Button asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <Button variant="secondary" asChild>
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