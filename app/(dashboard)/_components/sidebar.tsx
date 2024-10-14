import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"
import { SidebarItem } from "./sidebarItem"

export const SideBar = () => {

    return (
      <div className="mt-6 fixed h-full bg-gray-800 w-[250px]  flex flex-col  shadow-sm  left-0 top-[64px]      overflow-y-auto">
        
        
        <SidebarRoutes />
      </div>
      
    )
}