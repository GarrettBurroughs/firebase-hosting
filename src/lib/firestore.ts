import { Firestore, FirestoreError, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import {db as clientDB} from "./clientApp";
import { Project, Todo, TodoStatus } from "../app/projects/[id]/page";

export const getProjectListings = async (db: any = clientDB, email: string) => {
    const q = query(collection(db, "projects"), where("userEmail", "==", email)); 
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((d) => (
        {
            name: d.data().name,
            id: d.id,
        }
    ))
}

export const getProjectDetails = (projectId: string, cb: (doc: any) => void, err: (error: FirestoreError) => void) => {
    return onSnapshot(doc(clientDB, "projects", projectId), cb, err);
}

export const updateStatus = async (project: Project, taskNumber: number, newStatus: TodoStatus) => {
    // Update the status to a new one
    project.todos[taskNumber].status = newStatus;
    const projectRef = doc(clientDB, "projects", project.projectId);
    setDoc(projectRef, project, {merge: false});
}


export const deleteTask = async (project: Project, taskNumber: number) => {
    // Update the status to a new one
    project.todos.splice(taskNumber, 1);
    const projectRef = doc(clientDB, "projects", project.projectId);
    setDoc(projectRef, project, {merge: false});
}

export const createTask = async (project: Project, newTask: Todo) => {
    // Update the status to a new one
    project.todos.push(newTask);
    const projectRef = doc(clientDB, "projects", project.projectId);
    setDoc(projectRef, project, {merge: false});
}

export const deleteProject = async (projectId: string) => {
    return await deleteDoc(doc(clientDB, "projects", projectId))
}