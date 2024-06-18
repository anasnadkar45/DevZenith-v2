import AssignTask from "@/app/components/project/myproject/AssignTask";

export default function TasksPage() {
    return (
        <div>
            <div className="flex justify-between">
                <p className="text-2xl font-bold">Task's</p>
                <AssignTask />
            </div>
        </div>
    )
}