import { getAuthenticatedAppForUser } from "../lib/serverApp";
import ProjectCreator from "./ProjectCreator";



export default async function Home() {
  return (
    <main className="content">
      <ProjectCreator />
    </main>
  );
}
