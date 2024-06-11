"use client"
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { Project, Todo, TodoStatus } from "./page"
import { deleteTask, updateStatus } from "../../../lib/firestore";
import { refineTask } from "../../../lib/functions";
import styles from "./project.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { SiGooglegemini } from "react-icons/si";
import { Loading } from "../../components/Loading";

export const TodoDisplay = ({ todo, project, deleteTask, setRefinedTodos }: { todo: Todo, project: Project, deleteTask: MouseEventHandler<HTMLButtonElement>, setRefinedTodos: (refinedTodos: Todo[]) => void }) => {
    const [loading, setLoading] = useState<boolean>(false);
    return (<article className={styles["todo-item"]} key={todo.task}>
        <div className={styles.todoTitle}>
            <h3>{todo.task}</h3>
            <span onClick={deleteTask} className="drag-exempt"><FaRegTrashAlt className={styles.delete + " drag-exempt"} /></span>

        </div>
        <hr className={styles.line} />
        <p className={styles.description}>{todo.description}</p>
        {!loading ? <button onClick={() => {
            refineTask(todo, project).then((newTodos) => {
                setRefinedTodos(newTodos);
                setLoading(false);
            }).catch((error) => {
                alert(`Got Error: ${error}. Please try again`)
                setLoading(false);
            });
            setLoading(true);
        }} className={`generate-project ${styles.refine}`}><SiGooglegemini />Refine</button>
            : <Loading></Loading>}
    </article>);
}