import { AddTodo } from "./AddTodo";
import { Project, Todo } from "./page";
import styles from "./refined.module.css";
import { TodoDisplay } from "./todo";
export const RefinedTasks = ({tasks, close, add}: {tasks: Todo[], close: () => void, add: (idx: number) => void}) => {
    return <div className={styles.refined}>
        <h2> Select Tasks to Add</h2>
        <div className={styles.taskContainer}>
            {tasks.length === 0 && <p>Model did not return any new tasks</p>}
            {tasks.map((todo, idx) => 
                <AddTodo todo={todo} key={idx} add={()=> {
                    add(idx);
                }}/>
            )} 
        </div>
        <button className={`generate-project ${styles.close}`} onClick={close}>Close</button>
    </div> 
}