import { amaranth } from "@/app/layout";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    return (
        <div>
            <h1 className={cn(amaranth.className, "text-2xl font-bold")}><span className="text-primary">Project</span> Settings</h1>
            
        </div>
    )
}