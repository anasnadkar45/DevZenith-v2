import { Button } from "@/components/ui/button";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
export default function DashboardPage() {
    noStore();
    return (
        <div>
            <Button>
                <Link href={'/main/new-resource'}>
                    Add Resources
                </Link>
            </Button>

        </div>
    )
}