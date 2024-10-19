import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "../../../../../lib/utils";



interface CourseSidebarItemProps {
    label: string;
    id: string;
    // userProgress: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean;
}

export const CourseListItem = ({
    label,
    id,
    // userProgress,
    isCompleted,
    courseId,
    isLocked,
    
 
}) => {
    const pathname = usePathname();
    const router = useRouter();

    const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);

    const isActive = pathname?.includes(id);

    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`);
    }

    return  (
        <div className=" border-2  border-slate-500  ">
        <button 
        onClick={onClick}
        type="button"
        className={cn(
            " w-full flex pl-1 items-center gap-x-4 text-slate-200 text-sm font-[500] l-6 transition-all hover:text-slate-300 hover:bg-slate-300/20",isActive && "text-slate-300 bg-slate-200/20 hover:bg-slate/200/20 hover:text-slate-300",
            isCompleted && "text-emerald-700 hover:text-emerald-700",
            isCompleted && isActive && "bg-emerald-200/20",
        )}
        >
            
            <div className="flex items-center  w-full  ">
                <div className="flex items-center gap-x-2 py-4">
                    <Icon size={22} 
                    className={cn("text-slate-300",
                        isActive && "text-slate-900",
                        isCompleted && "text-emerald-700"
                    )}
                    />
                    {label}
                </div>
                
            </div>
        </button>
        </div>
    );
}
