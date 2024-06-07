import Tiptap from "@/app/components/Tiptap";

export default function CreatePostRoute({
    params,
}: {
    params: { id: string };
}) {
    return (
        <div>
            <h1>{params.id}</h1>
            <Tiptap />
        </div>
    )
}