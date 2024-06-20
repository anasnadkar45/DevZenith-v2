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

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="fixed mb-12 w-full border-b bg-card mx-auto flex px-3 h-14 items-center z-10">
      <div className="md:col-span-3">
        {
          user ? (
            <Link href="/dashboard">
              <h1 className="text-3xl font-bold ">
                Dev<span className="text-primary">Zenith</span>
              </h1>
            </Link>
          ) : (
            <Link href="/">
              <h1 className="text-3xl font-bold ">
                Dev<span className="text-primary">Zenith</span>
              </h1>
            </Link>
          )
        }

      </div>

      {/* <NavbarLinks /> */}



      <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        <div>
          <FeedBack />
        </div>

        <ModeToggle />
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

        {/* <div className="md:hidden">
          <MobileMenu />
        </div> */}
      </div>
    </nav>
  );
}