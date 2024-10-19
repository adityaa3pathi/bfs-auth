import { getUserId } from "../../../lib/auth-utils";
import { Chapter, Course, UserProgress } from "prisma/prisma-client";
import NavBarContainer from "./navbar-container"; // Import client component
import { usePathname, useRouter } from "next/navigation";






export default async function NavBar() {

      

  const userId = await getUserId();


  // Fetch userId in the server-side component
  

  // Pass the fetched userId to the client-side component
  return (<>
    
    <NavBarContainer
      userId={userId} // Pass userId from the server to the client
     
      
    />
    </>
  );
}
