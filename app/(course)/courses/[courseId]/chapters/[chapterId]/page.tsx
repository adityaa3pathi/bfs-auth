import { getUserId } from "../../../../../../lib/auth-utils";
import { redirect } from "next/navigation";
import React from "react";
import { getChapter } from "../../../../../../actions/get-chapter";
import ChapterClientPage from "./chapter-client-page"; // Client Component

import prismadb from "../../../../../../lib/db";
import { getProgress } from "../../../../../../actions/get-progress";
import { getPublicChapter } from "../../../../../../actions/get-public-chapter";


const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const  userId = await getUserId(); 

  let chapter, course, muxData, attachments, nextChapter, userProgress, purchase;

  if (userId) {(
    {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  }));
  }

  else {(
   {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    
  } = await getPublicChapter({
    
    chapterId: params.chapterId,
    courseId: params.courseId,
  }));

}

  if (!chapter || !course) {
    redirect("/");
    return null;
  }

  const isLocked = !chapter.IsFree && !purchase;
  const completedOnEnd = !!purchase && !userProgress?.isCompleted;


  const coursee = await prismadb.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      sections: {  // Include sections with chapters and userProgress
        include: {
          chapters: {
            where: {
              isPublished: true,
            },
            include: {
              userProgress: {
                where: userId ? { userId } : {},
              },
            },
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
  });
  

  if(!coursee) {
    redirect('/');
  }

  const progressCount = userId ? await getProgress(userId, coursee.id) : 0;


  // Pass the fetched data to a client-side component
  return (
    <ChapterClientPage
      chapter={chapter}
      course={coursee}
      attachments={attachments}
      nextChapter={nextChapter}
      userProgress={userProgress}
      isLocked={isLocked}
      purchase={purchase}
      muxData={muxData}
      completedOnEnd={completedOnEnd}
      params={params}
      progressCount={progressCount}
    />
  );
};

export default ChapterIdPage;
