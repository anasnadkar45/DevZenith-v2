import { unstable_noStore as noStore } from "next/cache";

export default function ResourcesPage(){
    noStore();
    return(
        <div>
            hii from resources page
        </div>
    )
}