"use client"

import { useEffect, useState } from "react";
import { getProjectDetails, updateStatus } from "../../../lib/firestore";
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
    }, []);

    useEffect(() => {
        console.log(projectDetails);
    }, [projectDetails]);

    const updateTodo = (idx: number, status: TodoStatus) => {
        if (!projectDetails) return;
        const newDetails = { ...projectDetails }
        newDetails.todos[idx].status = status as TodoStatus;
        console.log("Updating", idx, status);
        setProjectDetails(newDetails);
        updateStatus(projectDetails, idx, status);
        // Update in firebase too
    }
    return <>
        {error && <p>{error}</p>}
        {!error && (projectDetails ? <ProjectDetails project={projectDetails} projectId={params.id} updateTodo={updateTodo}/> : <Loading />)}
    </>
}