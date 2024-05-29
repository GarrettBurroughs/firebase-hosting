
"use client"
import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from "react";
import {createProject} from "../lib/functions";
import { useRouter } from "next/navigation";
import { useUserSession } from "./components/Header";



export default function ProjectCreator() {
  const router = useRouter();
  const [loadingProject, setLoadingProject] = useState<Boolean>(false);
  const features = [
    "App Check",
    "App Hosting",
    "Authentication",
    "Data Connect",
    "Extensions",
    "Firestore Database",
    "Functions",
    "Hosting",
    "Machine Learning",
    "Realtime Database",
    "Storage",
    "A/B Testing",
    "AdMob",
    "App Distribution",
    "Crashlytics",
    "Dynamic Links",
    "Messaging",
    "Performance",
    "Release Monitoring",
    "Remote Config",
    "Test Lab",
    "Dashboard",
    "Realtime Analytics",
    "Events",
    "Key Events",
    "Audiences",
    "Custom Definitions",
    "Latest Release",
    "DebugView",
  ];
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [topic, setTopic] = useState<string>("");
  const userSession = useUserSession(null);
  const onclick: MouseEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();
    setLoadingProject(true);
    console.log({topic: topic, features: selectedFeatures, email: userSession?.email});
    try {
      const projectId =  await createProject(topic, selectedFeatures, userSession?.email!);
      setLoadingProject(false);
      router.push(`/projects/${projectId}`)
    } catch (e) {
      alert("Error generating project " + e);
      setLoadingProject(false);
    }
  }

  const addFeature = (feature: string) =>  {
    console.log("adding " + feature);
    setSelectedFeatures([...selectedFeatures, feature])
  }
  const removeFeature = (feature: string) =>  {
    console.log("removing " + feature);
    setSelectedFeatures(selectedFeatures.filter(el => el != feature))
  }

  const handleFeatureChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.checked ? addFeature(e.target.value) : removeFeature(e.target.value);
  }

  return (
    <>
      <h1 className="heading">Start your Firebase Project Here</h1>
     <article className="card">
        <h2>1. Select Your Features</h2>
        <div className="feature-grid">
          {features.map((featureName, idx) => (<p className="feature-option" key={idx}>
            <input type="checkbox" value={featureName} id={`feature-${idx}`} 
                onChange={handleFeatureChange}
            ></input>
            <label htmlFor={`feature-${idx}`} className="feature-label" >{featureName}</label>
          </p>
          ))}
        </div>
        <h2>2. Give an idea or leave blank to have gemini create one for you</h2>
        <input type="text" className="idea-input" placeholder="Enter your idea" onChange={e => {
            setTopic(e.target.value);
        }}></input>
        <h2>3. Have Gemini scaffold out your project!</h2>
        {loadingProject ? <p>Generating Project ...</p> : <input type="button" value="Generate Project" className="generate-project" onClick={onclick}></input>}
      </article>
    </>
  );
}
