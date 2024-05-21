"use client"
import Link from "next/link";
import { MouseEventHandler, useEffect } from "react";
import {run } from "../lib/vertex";
import { generateMenuItem } from "../lib/functions";



export default function Home() {
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
  const onclick: MouseEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    generateMenuItem().then(alert).catch(console.error);
  }
  return (
    <main className="content">
      <h1 className="heading">Start your Firebase Project Here</h1>
      <article className="card">
        <h2>1. Select Your Features</h2>
        <div className="feature-grid">
          {features.map((featureName, idx) => (<p className="feature-option" key={idx}>
            <input type="checkbox" value={featureName} id={`feature-${idx}`} ></input>
            <label htmlFor={`feature-${idx}`} className="feature-label" >{featureName}</label>
          </p>
          ))}
        </div>
        <h2>2. Give an idea or leave blank to have gemini create one for you</h2>
        <input type="text" className="idea-input" placeholder="Enter your idea"></input>
        <h2>3. Have Gemini scaffold out your project!</h2>
        <input type="button" value="Generate Project" className="generate-project" onClick={onclick}></input>
      </article>
    </main>
  );
}
