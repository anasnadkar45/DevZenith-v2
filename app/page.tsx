import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

export default function Home() {
  noStore();
  return (
    <div>
      hey
    </div>
  );
}
