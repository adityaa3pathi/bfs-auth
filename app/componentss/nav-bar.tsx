
import { Chapter, Course, UserProgress } from "prisma/prisma-client";
import NavBarContainer from "./navbar-container"; // Import client component
import { usePathname, useRouter } from "next/navigation";

import { MobileSidebar } from "../(dashboard)/_components/mobile-sidebar";




export default async function NavBar() {

      

 


  // Fetch userId in the server-side component
  

  // Pass the fetched userId to the client-side component
  return (<>
    
    <NavBarContainer
      // Pass userId from the server to the client
     
      
    />
    </>
  );
}
