"use client"
import { ChangeEventHandler, useState } from "react";
import { Project, TodoStatus } from "./page"
import { deleteTask, updateStatus } from "../../../lib/firestore";
import { refineTask } from "../../../lib/functions";
import styles from "./project.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { SiGooglegemini } from "react-icons/si";

export const TodoDisplay = ({ project, idx }: { project: Project, idx: number }) => {
    const [newStatus, setNewStatus] = useState<TodoStatus>('Todo'); // Initial state
    const getStatusClass = () => {
        const statusClasses = {
            "Todo": styles.col1,
            "In Progress": styles.col2,
            "Complete": styles.col3,
        }
        return statusClasses[project.todos[idx].status];
    }
    const handleStatusChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        setNewStatus(event.target.value as TodoStatus);
    };
    const todo = project.todos[idx];
    return (<article className={`${styles["todo-item"]} ${getStatusClass()}`} key={todo.task}>
        <div className={styles.todoTitle}>
            <h3>{todo.task}</h3>
            <span onClick={() => { deleteTask(project, idx) }}><FaRegTrashAlt className={styles.delete} /></span>

        </div>
        <hr className={styles.line}/>
        <p className={styles.description}>{todo.description}</p>
        {/* <select value={newStatus} onChange={handleStatusChange}>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
        </select> */}
        {/* <button onClick={() => { updateStatus(project, idx, newStatus) }}>Update Status</button> */}
        <button onClick={() => { refineTask(todo) }} className={`generate-project ${styles.refine}`}><SiGooglegemini />Refine</button>
    </article>);
}