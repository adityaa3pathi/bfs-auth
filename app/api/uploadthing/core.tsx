import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getUserId } from "../../../lib/auth-utils";
 
const f = createUploadthing();
 
const handleAuth = () => {
  const userId =  getUserId();
    if(!userId) throw new Error("Unauthorized");
    return { userId };
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  courseImage: f({image: {maxFileSize: "4MB", maxFileCount: 1} })
  .middleware(() => handleAuth())
  .onUploadComplete(() => {}),
  
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
  .middleware(() => handleAuth())
  .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB"}})
  .middleware(() => handleAuth())
  .onUploadComplete(() => {})


} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;