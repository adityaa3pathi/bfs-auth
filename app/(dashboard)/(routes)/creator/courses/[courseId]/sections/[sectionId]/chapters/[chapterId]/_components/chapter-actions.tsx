"use client"

import { Trash } from "lucide-react";
import { Button } from "../../../../../../../../../../../components/ui/button";
import { ConfirModal } from "../../../../../../../../../../../components/modals/confirm-modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Fondamento } from "next/font/google";


interface ChapterActionsProps  {
    disabled: boolean;
    courseId: string;
    chapterId: String;
    sectionId: string;
    isPublished: boolean;
};

export const ChapterActions  = ({
    disabled,
    courseId,
    chapterId,
    sectionId,
    isPublished
}: ChapterActionsProps) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if(isPublished) {
                await axios.patch(`/api/courses/${courseId}/sections/${sectionId}/chapters/${chapterId}/unpublish`);
                toast.success("chapter unpublished")
            } else {
                await axios.patch(`/api/courses/${courseId}/sections/${sectionId}/chapters/${chapterId}/publish`);
                toast.success("Chapter  Published")
            }
                router.refresh();
        }
        catch {
            toast.error("something went wrong")
        }
        finally {
            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/courses/${courseId}/sections/${sectionId}/chapters/${chapterId}`);

            toast.success("Chapter deleted")
            router.refresh();
            router.push(`/creator/courses/${courseId}/sections/${sectionId}`);
        }  catch(error) {
            console.log(error)
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }

    }

   return ( <div className="flex items-center text-gray-700 gap-x-2">
        <Button 
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
        >
                {isPublished ? "Unpublish" : "Publish"}
        </Button>
        <ConfirModal onConfirm={onDelete}>
        <Button  size="sm">
            <Trash  className="h-4 w-4"/>
        </Button>
        </ConfirModal>
        </div>
)


}