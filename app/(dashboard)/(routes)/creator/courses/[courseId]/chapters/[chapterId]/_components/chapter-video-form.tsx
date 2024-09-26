// "use client";

// import * as z from "zod";
// import axios from "axios";
// import { Button } from "@/../components/ui/button";
// import { ImageIcon, Pencil, PlusCircle, Video } from "lucide-react";
// import { useState } from "react";
// import MuxPlayer from "@mux/mux-player-react";
// import Image from "next/image";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Chapter, MuxData } from "@prisma/client";
// import { FileUpload } from "@/../components/file-upload";




// interface ChapterVideoFormProps {
//     initialData: Chapter & { muxData?: MuxData | null};
//     courseId: string
//     chapterId: string
// };



// const formSchema = z.object({
//     videoUrl: z.string().min(1),
// });


// export const ChapterVideoForm = ({
//     initialData,
//     courseId,
//     chapterId
// }: ChapterVideoFormProps) =>  {

//     const [isEditing, setIsEditing] = useState(false);

//     const toggleEdit = () => setIsEditing((current) => !current);
//     const router = useRouter();

//     const onSubmit = async (values: z.infer<typeof formSchema>) => {
//         try {
//                 await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
//                 toast.success("Chapter updated");
//                 toggleEdit();
//                 router.refresh();
            
//         }


//         catch {
//             toast.error("Something went wrong");
//         }
//     }


//     return (
//         <div className="mt-6 border bg-slate-100 rounded-md p-4"  >

//             <div className="font-medium flex items-center justify-between">
//                 Chapter Video
//                 <Button onClick={toggleEdit} variant="ghost"> 

//                 {isEditing && (
//                     <>Cancel</>
//                 )}  
                
//                 {!isEditing && !initialData.videoUrl && (
//                     <>
//                     <PlusCircle className="h-4 w-4 mr-2" />
//                     Add an Video 
//                     </>
//                 )}
//                 {!isEditing && initialData.videoUrl && (
//                     <>
//                     <Pencil className="h-4 w-4 mr-2" />
//                     Change your Video
//                     </>
//                 )}
//                 </Button>
//             </div>

//             {!isEditing && (
//                !initialData.videoUrl ? (
//                 <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
//                    <Video className="h-10 w-10 text-slate-500" />
//                 </div>) : (
//                       <div className="relative aspect-video mt-2">

//                        <MuxPlayer 
//                        playbackId={initialData?.muxData?.playbackId || ""}
//                        />
                        
//                        </div>
//                 )

//                )}

//             {isEditing && (
//                 <div>
//                     <FileUpload
//                     endpoint="chapterVideo"
//                     onChange= {(url) => {
//                         if(url) {
//                             onSubmit({videoUrl: url });
//                         }
//                     }}
//                     />
//                     <div className="text-xs text-muted-foreground mt-4">
//                         Upload this chapter&apos;s video
//                     </div>
//                 </div>
//  )}
//  {initialData.videoUrl && !isEditing && (
//     <div className="text-xs text-muted-foreground mt-2">
//                 Videos can take few minutes to process Refresh the page if video does not appear
//     </div>
//  )}
//         </div>
//     )
// }




"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/../components/ui/button";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import { FileUpload } from "@/../components/file-upload";

interface ChapterVideoFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    videoUrl: z.string().url().min(1).regex(
        /^https:\/\/(www\.)?youtube\.com\/watch\?v=.+$/,
        "Must be a valid YouTube video URL"
    ),
});

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterVideoFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter updated");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    };

    const extractVideoId = (url: string) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        return urlParams.get('v');
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter Video
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : !initialData.videoUrl ? (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add a Video
                        </>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Change your Video
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <Video className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${extractVideoId(initialData.videoUrl)}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )
            )}

            {isEditing && (
                <div>
                      <input
            type="text"
            placeholder="Enter YouTube video URL"
            className="border p-2 w-full rounded"
            onChange={(e) => onSubmit({ videoUrl: e.target.value })}
        />
        <div className="text-xs text-muted-foreground mt-4">
            Enter the unlisted YouTube URL for this chapter's video.
        </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    Videos can take a few minutes to process. Refresh the page if the video does not appear.
                </div>
            )}
        </div>
    );
};