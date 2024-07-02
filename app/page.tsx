import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import Navbar from "./components/landing-page/Navbar";
import Hero from "./components/landing-page/Hero";
import Footer from "./components/landing-page/Footer";
import { Features } from "./components/landing-page/Features";

export default async function Home() {
  unstable_noStore();
  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) {
    return redirect("/resources/all");
  }
  return (
    <main className="relative bg-black">
      <Navbar />
      <div className="max-w-screen-xl mx-auto overflow-hidden">
        <Hero />
        <Features />
      </div>
      <Footer />
      <svg className='absolute top-0 left-0 bottom-0 right-0 opacity-20 ' width="100%" height="100%">
        <pattern id="smallGrid" width="25" height="25" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="#fff" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#smallGrid)" />
      </svg>
    </main>
  );
}