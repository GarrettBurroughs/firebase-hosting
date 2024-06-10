"use client"
import { ChangeEventHandler, useState } from "react";
import { Project, Todo, TodoStatus } from "./page"
import { createTask, deleteTask, updateStatus } from "../../../lib/firestore";
import { TodoDisplay } from "./todo";
import styles from "./project.module.css";
import { DndContext, DragEndEvent, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { DroppableColumn } from "./DroppableColumn";
import { SmartPointerSensor } from "./SmartPointerSensor";
import { Modal } from "../../components/Modal";
import { RefinedTasks } from "./RefinedTasks";

export const ProjectDetails = ({ project, projectId, updateTodo }: { project: Project, projectId: string, updateTodo: (idx: number, status: TodoStatus) => void }) => {
    const containers = ['Todo', 'In Progress', 'Done'];
    const smartPointer = useSensor(SmartPointerSensor);
    const sensors = useSensors(smartPointer);
    const [showModal, setShowModal] = useState<boolean>(false);
    const handleDragEnd = (event: DragEndEvent) => {
        console.log(event);
        const { over, active } = event;
        const idx = parseInt(active.id as string);
        updateTodo(idx, over?.id as TodoStatus)
    }
    const [refinedTodos, setRefinedTodos] = useState<Todo[]>([])

    const updateRefinedTodos = (refinedTodos: Todo[]) => {
        setRefinedTodos(refinedTodos);
        setShowModal(true);
    }

    const getTodos = (status: string) => project.todos
        .map((todo, idx) => {
            return todo.status === status ?
                <Draggable id={'' + idx} key={`${todo.status} ${idx}`}>
                    <TodoDisplay
                        todo={todo}
                        deleteTask={(e) => {
                            e.stopPropagation();
                            deleteTask(project, idx)
                        }}
                        setRefinedTodos={updateRefinedTodos}
                    ></TodoDisplay>
                </Draggable>
                :
                null
        }
        )


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{project.name}</h1>
            <h2 className={styles.projectdescription}>{project.description}</h2>
            <Modal showModal={showModal}>
                <RefinedTasks 
                    tasks={refinedTodos} 
                    close={() => { setShowModal(false) }} 
                    add={(idx) => {
                        const newTask = refinedTodos.splice(idx, 1)[0];
                        setRefinedTodos(refinedTodos);
                        createTask(project, newTask)
                    }}>
                </RefinedTasks>
            </Modal>
            <div className={styles["project-display"]}>
                <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                    {containers.map((id) => (
                        // We updated the Droppable component so it would accept an `id`
                        // prop and pass it to `useDroppable`
                        <DroppableColumn key={id} id={id}>
                            {getTodos(id)}
                        </DroppableColumn>
                    ))}
                </DndContext>
            </div>
        </div>
    );

}

