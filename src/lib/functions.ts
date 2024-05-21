import { httpsCallable } from "firebase/functions";
import { functions } from "./clientApp"

export async function generateMenuItem() {
    const menuSuggestionFlow = httpsCallable(
        functions,
        'menuSuggestionFlow', 
      );
    const response = await menuSuggestionFlow("Ai App Developer"); 
    return response.data;
}