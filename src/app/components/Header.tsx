"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Firebase } from "./Firebase";

import {
  signInWithGoogle,
  signOut,
  onAuthStateChanged
} from "../../lib/auth"
import { MouseEventHandler, useEffect, useState } from "react";
import { firebaseConfig } from "../../lib/config";
import { User } from "firebase/auth";
export function useUserSession(initialUser: User | null) {
  // The initialUser comes from the server via a server component
  const [user, setUser] = useState(initialUser);
  const router = useRouter();

  // Register the service worker that sends auth state back to server
  // The service worker is built with npm run build-service-worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const serializedFirebaseConfig = encodeURIComponent(JSON.stringify(firebaseConfig));
      const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`

      navigator.serviceWorker
        .register(serviceWorkerUrl)
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser: User | null) => {
      setUser(authUser)
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onAuthStateChanged((authUser: User | null) => {
      if (user === undefined) return

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        router.refresh()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return user;
}

export function Header({ initialUser }: any) {
  const pathname = usePathname();
  const user = useUserSession(initialUser);

  const handleSignOut: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    signOut();
  }

  const handleSignIn: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    signInWithGoogle();
  };

  return (
    <>

      <header className="header">
        <div className="navigation">
          <Link href="/">Home </Link> 
          <Link href="/listings">Projects</Link>
        </div>
        <Firebase />
        <div> 
          {user ? <button className="sign-out" onClick={handleSignOut}>Sign Out</button> : <button className="sign-in" onClick={handleSignIn}>Sign in with Google</button>}
        </div>
      </header>


    </>
  );
}
