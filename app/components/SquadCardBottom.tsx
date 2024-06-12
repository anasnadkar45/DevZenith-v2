import { Button } from "@/components/ui/button";
import { handleVote } from "../actions";
import { FaArrowCircleUp } from "react-icons/fa";
import { BiSolidCommentDots } from "react-icons/bi";
import { IoBookmark } from "react-icons/io5";
import { CopyLink } from "./CopyLink";

interface iAppProps {
    id: string;
}

export async function SquadCardBottom({id}:iAppProps) {
    return (
        <div className="flex justify-between items-center border p-1 rounded-xl">
            <div className="flex border rounded-lg p-1">
                <form action={handleVote}>
                    <input type="hidden" name="voteDirection" value="UP" />
                    <input type="hidden" name="squadPostId" value={id} />
                    <Button variant={"ghost"} size={"sm"} className="space-x-2 group hover:bg-green-400/40 transition-all hover:duration-150">
                        <FaArrowCircleUp className="text-slate-300 group-hover:text-green-400 transition-all hover:duration-150" size={20} />
                        <span className="group-hover:text-green-400 text-slate-400 font-bold text-sm">Upvote</span>
                    </Button>
                </form>



            </div>

            <Button variant={"ghost"} size={"sm"} className="flex items-center gap-2 group hover:bg-orange-400/40 transition-all hover:duration-150">
                <IoBookmark className="text-slate-300 group-hover:text-orange-400 transition-all hover:duration-150" size={20} />
                <p className="group-hover:text-orange-400 text-slate-400 font-bold text-sm">Bookmark</p>
            </Button>
            <CopyLink id={id} />
        </div>
    )
}