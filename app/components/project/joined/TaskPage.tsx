// app/components/project/joined/TaskPage.tsx

import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Task {
    id: string;
    title: string;
    priority: string;
    status: string;
    User: {
        firstName: string;
        lastName: string;
        profileImage: string;
    } | null;
}

interface ProjectMembership {
    User: {
        id: string;
        profileImage: string;
        firstName: string;
        lastName: string;
    } | null;
}

interface ProjectData {
    id: string;
    tasks: Task[];
    ProjectMemberships: ProjectMembership[];
}

interface TaskPageProps {
    projectData: ProjectData | null;
}

export function TaskPage({ projectData }: TaskPageProps) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 grid grid-cols-12  gap-2 p-2">
                <div className="col-span-12 lg:col-span-8 bg-card rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <div className="text-lg font-medium">Assigned Tasks</div>
                    </div>
                    <div className="p-6 space-y-6">
                        {projectData?.tasks.map((task) => (
                            <div key={task.id} className="flex items-center gap-4">
                                <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-12">
                                    <Image src={task.User?.profileImage as string} alt='' width={50} height={50} className='rounded-md'/>
                                </div>
                                <div className="flex-1 items-center">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium">{`${task?.User?.firstName} ${task?.User?.lastName}`}</div>
                                    </div>
                                    <div className="mt-2 space-y-2">
                                        <div key={task.id} className="flex items-center justify-between">
                                            <div className="text-sm text-slate-400">{task.title}</div>
                                            <Progress value={task.status === 'DONE' ? 100 : task.status === 'IN_PROGRESS' ? 50 : 0} className="w-24" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-4 bg-card rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <div className="text-lg font-medium">Project Overview</div>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>Total Tasks</div>
                            <div className="font-medium">{projectData?.tasks.length}</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>Completed</div>
                            <div className="font-medium">{projectData?.tasks.filter(task => task.status === 'DONE').length}</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>In Progress</div>
                            <div className="font-medium">{projectData?.tasks.filter(task => task.status === 'IN_PROGRESS').length}</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>Todo</div>
                            <div className="font-medium text-red-500">{projectData?.tasks.filter(task => task.status === 'TODO').length}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function UserIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

function Progress({ value, className }: { value: number; className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-primary rounded" style={{ width: `${value}%` }}></div>
            </div>
        </div>
    );
}
