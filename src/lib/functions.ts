import { httpsCallable } from "firebase/functions";
import { functions } from "./clientApp"
import { Todo } from "../app/projects/[id]/page";

export async function createProject(topic: string, features: string[], userEmail: string) {
    const projectScaffoldingFlow = httpsCallable(
        functions,
        'projectScaffoldingFlow', 
      );
    const response = await projectScaffoldingFlow({
      topic: topic,
      features: features, 
      userEmail: userEmail
    }); 
    return response.data;
}
export async function refineTask(task: Todo): Promise<Todo[]> {
  console.log(task);
  console.log("Starting Update on ", task);
  const refineTaskFlow = httpsCallable(
    functions, 
    'refineTaskFlow',
  );
    const response = await refineTaskFlow(task); 
    console.log(response);
    return response.data as Todo[];
}