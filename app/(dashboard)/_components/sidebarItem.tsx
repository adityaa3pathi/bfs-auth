"use client";


import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";


import { LucideIcon }  from "lucide-react"
import { cn } from "@/../lib/utils";

interface SideBarItemsProps {

        icon: LucideIcon;
        label: string;
        href: string;
    }
    export const SidebarItem = ({
    icon: Icon,
    label,
    href

 }: SideBarItemsProps) => {

    const pathname = usePathname();
    const router = useRouter();

    

        const isActive = (
        pathname === "/" && href === "/" ) || 
        pathname === href || 
        pathname?.startsWith(`${href}/`)
        

        const onClick = ()  => {
            router.push(href);
        }

 


        return (


        <button  
        onClick={onClick}
        type="button"
        className={cn(
            `flex items-center gap-x-2 text-slate-200 text-sm font-[500] pl-6 transition-all hover: hover:bg-slate-300/20`,
            isActive && `bg-sky-200/20  
            hover:bg-sky-200/20 hover:`
            )}
            >

    <div className="flex items-center gap-x-2 py-4">

        <Icon
        size={22}
        className={cn(
            "text-slate-500",
            isActive && "text-sky-400"
        )}
        />
        {label}
    </div>

    < div 
    className={cn("ml-auto opacity-0 border-2 border-sky-400 h-full transition-all",
        isActive && "opacity-100"
    )}
    />

    

 </button>

        
    )
}