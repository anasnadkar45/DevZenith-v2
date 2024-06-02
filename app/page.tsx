import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

export default function Home() {
  return (
    <nav className="h-16 flex justify-between items-center">
      <div>
        <Link href="/">
          <h1 className="text-2xl font-semibold ">
            Dev<span className="text-primary">Zenith</span>
          </h1>
        </Link>
      </div>
      <div className="space-x-3">
        <LoginLink>
          <Button>
            Log in
          </Button>
        </LoginLink>
        <RegisterLink>
          <Button variant={"secondary"}>
            Sign up
          </Button>
        </RegisterLink>
      </div>
    </nav>
  );
}
