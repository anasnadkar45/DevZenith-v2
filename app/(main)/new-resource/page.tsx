import { ResourceForm } from "@/app/components/form/ResourceForm";

export default function NewResource(){
    return(
        <div>
            <h1 className="text-3xl font-bold text-primary mb-3">New Resource</h1>
            <ResourceForm />
        </div>
    )
}