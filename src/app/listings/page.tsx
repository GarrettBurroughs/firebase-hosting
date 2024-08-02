// 'use client'
import { getFirestore } from "firebase/firestore";
import { getProjectListings } from "../../lib/firestore";
import { getAuthenticatedAppForUser } from "../../lib/serverApp";
import { ProjectListing } from "./ProjectListing";


interface ProjectListingInfo { 
    id: string, name: string;
}
export default async function Listings() {
    // const {firebaseServerApp, currentUser} = await getAuthenticatedAppForUser();
    
    // const listings = currentUser?.email ? await getProjectListings(getFirestore(firebaseServerApp), currentUser?.email!) : [];

    return <>
        <h2>Project Listings</h2>
        {process.env.STAGING && <h2>In staging</h2>}
        {/* {currentUser ? <ul> 
            {listings && listings.map(listing => <ProjectListing key={listing.id} projectId={listing.id} projectName={listing.name} />)} 
        </ul> : <p>Not Logged In</p>} */}
    </>
}
