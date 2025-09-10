import prismadb from "@/../lib/db";
import {Attachment, Chapter } from "@prisma/client";

interface GetPublicChapterProps {

    courseId: string;
    
    chapterId: string;
}
export const getPublicChapter = async ({
    
    courseId,
    chapterId,
    
  }: GetPublicChapterProps) => {
    try {
    //   const purchase = await prismadb.purchase.findUnique({
    //     where: {
    //       userId_courseId: {
    //         userId,
    //         courseId,
    //       },
    //     },
    //   });
  
      const course = await prismadb.course.findUnique({
        where: {
          isPublished: true,
          id: courseId,
        },
        select: {
          price: true,
        },
      });
  
      const chapter = await prismadb.chapter.findUnique({
        where: {
          id: chapterId,
          isPublished: true,
        },
      });
  
      if (!chapter || !course) {
        throw new Error("Chapter or course not found");
      }
  
      let attachments: Attachment[] = [];
      let nextChapter: Chapter | null = null;
      let muxData: { id: string; assetId: string; playbackId: string | null; chapterId: string; } | null = null;
  
      // Fetch attachments only if a purchase was made
    //   if (purchase) {
    //     attachments = await prismadb.attachment.findMany({
    //       where: {
    //         courseId: courseId,
    //       },
    //     }); 
    //   }
  
      // Fetch muxData and nextChapter only if the chapter is free or purchased
      if (chapter.IsFree ) {
        muxData = await prismadb.muxData.findUnique({
          where: {
            chapterId: chapterId,
          },
        });
  
        nextChapter = await prismadb.chapter.findFirst({
          where: {
            courseId: courseId,
            isPublished: true,
            position: {
              gt: chapter?.position,
            },
          },
          orderBy: {
            position: "asc",
          },
        });
      }
  
    //   const userProgress = await prismadb.userProgress.findUnique({
    //     where: {
    //       userId_chapterId: {
    //         userId,
    //         chapterId,
    //       },
    //     },
    //   });
  
      return {
        chapter,
        course,
       
         muxData,
        attachments,
        nextChapter,
        // userProgress,
        // purchase,
      };
    } catch (error) {
      console.error("[GET_CHAPTER]", error);
      return {
        chapter: null,
        course: null,
        section: null,
         muxData: null,
        attachments: [],
        nextChapter: null,
        userProgress: null,
        purchase: null,
      };
    }
  };
  