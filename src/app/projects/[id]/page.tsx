"use client"

import { useEffect, useState } from "react";
import { getProjectDetails } from "../../../lib/firestore";
import { ProjectDetails } from "./projectDetails";
import { Loading } from "../../components/Loading";

export type TodoStatus = "Todo" | "In Progress" | "Complete";
export interface Todo {
    description: string;
    task: string;
    status: TodoStatus;
}

export interface Project {
    projectId: string;
    name: string;
    description: string;
    todos: Todo[];
}

export default function ProjectView({ params } : { params: { id: string } }) {
    const [projectDetails, setProjectDetails] = useState<Project>();
    const [error, setError] = useState<string | null>(null);
    useEffect(() =>  {
        getProjectDetails(params.id, (doc) => {
            setError(null);
            if (!doc.data()) {
                setError("Project Not Found");
            }
            setProjectDetails({...doc.data(), projectId: params.id }as Project)
        }, (error) => {
            console.error(error);
            setError("There was an error loading the project: " + error); 
        });
    })
    return <>
        {error && <p>{error}</p>}
        {!error && (projectDetails ? <ProjectDetails project={projectDetails} projectId={params.id} /> : <Loading />)}
    </>
}