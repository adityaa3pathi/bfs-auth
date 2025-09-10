import React, { ReactNode } from "react";
import "../../globals.css";
import Navbar from "../_components/nav-bar";
import Footer from "../_components/footer";




   function RootLayout({ children }: { children: ReactNode }) {
                  return (
                        <div className="h-[80px] fixed w-full z-50">
        <Navbar />
        {children}
        <Footer/>
      </div>
                 
   
            
                );
                }
          export default RootLayout;
            
        