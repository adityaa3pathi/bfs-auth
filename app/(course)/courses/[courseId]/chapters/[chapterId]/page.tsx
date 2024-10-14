import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { getChapter } from "../../../../../../actions/get-chapter";
import ChapterClientPage from "./chapter-client-page"; // Client Component

import prismadb from "../../../../../../lib/db";
import { getProgress } from "../../../../../../actions/get-progress";


const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
    return null;
  }

  const {
    chapter,
    course,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

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
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if(!coursee) {
    redirect('/');
  }

  const progressCount = await getProgress(userId, coursee.id);


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
      completedOnEnd={completedOnEnd}
      params={params}
      progressCount={progressCount}
    />
  );
};

export default ChapterIdPage;
