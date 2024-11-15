"useclient"

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "../../../../../../../lib/utils";
import { useConfettiStore } from "../../../../../../../hooks/use-confetti-store";


interface VideoPlayerProps {
    playbackId: string;
    courseId: string;
    chapterId: string;
    nextChapterId?: string;
    isLocked: boolean;
    completedOnEnd: boolean;
    title: string; 
}

// const extractVideoId = (url: string) => {
//     const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
//     return videoIdMatch ? videoIdMatch[1] : null;
// };

export const  VideoPlayer = ({
playbackId,
courseId,
chapterId,
nextChapterId,
isLocked,
completedOnEnd,
title,
}: VideoPlayerProps) => {

    const [isReady, setIsReady] = useState(false);  


    // const videoId = extractVideoId(videoUrl);

return (<div className="relative aspect-video">
    { !isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
            <Loader2  className="h-8 w-8 animate-spin text-secondary"/>
        </div>
    )}
    {isLocked && (
        <div className="absolute inset-0  flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
            <Lock className="h-8 w-8"/>
            <p className="text-sm">
                This chapter is locked
            </p>

        </div>
    )}


{!isLocked && (
    <MuxPlayer
    title={title}
    className={cn(
        !isReady && "hidden"
    )}
    onCanPlay={() => setIsReady(true)}
        autoPlay
        playbackId={playbackId}
/>
)}


{/*     
    {!isLocked && videoId && (
           <iframe
           className={`w-full h-full ${!isReady ? "hidden" : ""}`}
           src={`https://www.youtube.com/embed/${videoId}`}
           title={title}
           onLoad={() => setIsReady(true)}
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           allowFullScreen
       />
    )} */}
   
</div>)
}