"use client"
import { ChangeEventHandler, useState } from "react";
import { Project, Todo, TodoStatus } from "./page"
import { updateStatus } from "../../../lib/firestore";
import { TodoDisplay } from "./todo";
import styles from "./project.module.css";

export const ProjectDetails = ({ project, projectId }: { project: Project, projectId: string }) => {


    return (<div className={styles.container}>
        <h2 className={styles.title}>{project.name}</h2>
        <p className={styles.projectdescription}>{project.description}</p>
        <article className={styles["project-display"]}>
            <h2>Todo</h2>
            <h2>In Progress</h2>
            <h2>Complete</h2>
            {project.todos.map((todo: Todo, idx: number) => (
                <TodoDisplay project={project} idx={idx} key={idx} />
            ))}
        </article>
    </div>)
}