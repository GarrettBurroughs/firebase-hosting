"use client"
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { Project, Todo, TodoStatus } from "./page"
import styles from "./project.module.css";
import { createTask } from "../../../lib/firestore";

export const AddTodo = ({ todo, add}: {todo: Todo, add: () => void}) => {
    return (<article className={styles.addTodo} key={todo.task}>
        <div className={styles.todoTitle}>
            <h3>{todo.task}</h3>
        </div>
        <hr className={styles.line}/>
        <p className={styles.description}>{todo.description}</p>
        <button onClick={add} className={`generate-project ${styles.add}`}>Add Task</button>
    </article>);
}