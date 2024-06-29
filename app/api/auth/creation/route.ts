import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log("User from session:", user);

  if (!user || user === null || !user.id) {
    console.error("No user found in session or user.id is missing");
    return NextResponse.redirect("http://localhost:3000");
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  console.log("User from database:", dbUser);

  if (!dbUser) {
    try {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          firstName: user.given_name ?? "",
          lastName: user.family_name ?? "",
          email: user.email ?? "",
          profileImage:
            user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        },
      });
    } catch (error) {
      console.error("Error creating user in database:", error);
      return NextResponse.redirect("http://localhost:3000");
    }
  }

  if (dbUser) {
    return NextResponse.redirect("http://localhost:3000/profile");
  } else {
    return NextResponse.redirect("http://localhost:3000");
  }
}
