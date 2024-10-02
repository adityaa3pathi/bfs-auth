import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/../components/ui/sheet"
import { SideBar } from "./sidebar";


export const MobileSidebar = () => {

    return (
        <Sheet>
            <SheetTrigger 
            className="md:hidden  hover:opacity-75 transition"
            > 
                <Menu/>
            </SheetTrigger>
            <SheetContent 
            side="left"
            className=" "
            >
                <SideBar/>
            </SheetContent>
        </Sheet>
    )
}