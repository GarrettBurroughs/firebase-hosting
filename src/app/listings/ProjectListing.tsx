"use client"
import Link from "next/link";
import { deleteProject } from "../../lib/firestore";
import { MouseEventHandler } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import styles from "./listing.module.css";


export function ProjectListing({ projectId, projectName }: { projectId: string, projectName: string}) {
    const handleDeleteProject: MouseEventHandler<HTMLButtonElement> = (e) => {
        deleteProject(projectId).then(() => {window.location.reload()});
    }
    return <Link className={styles["project-link"]} href={`/projects/${projectId}`}><article className={styles.listing}>
        <p>{projectName}</p>
        <span onClick={handleDeleteProject}><FaRegTrashAlt className={styles.delete} /></span>
    </article>
    </Link>
}