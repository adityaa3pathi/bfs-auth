
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node"
import prismadb from "../../../../../../../../lib/db";
import { getUserId } from "../../../../../../../../lib/auth-utils";
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";



const { video } = new Mux({
   tokenId: process.env.MUX_TOKEN_ID!,
   tokenSecret: process.env.MUX_TOKEN_SECRET!,
}
);

export const dynamic = "force-dynamic";

export async function DELETE(
    req:Request,
    {params} : {
        params: {courseId: string; chapterId: string}}
 
) {
    


    const  userId =  await getUserId();
try {


    if(!userId) {
        return new NextResponse("Unauthorized", {status: 401 });
    }

    const ownCourse = await prismadb.course.findUnique({
        where: {
            id: params.courseId,
            userId,
        }
    });

    if (!ownCourse) {
        return new NextResponse("Unauthorized", {status: 401});
    }

       const chapter = await prismadb.chapter.findUnique({
            where:  {
                id: params.chapterId,
                courseId: params.courseId
            }
        });

        if(!chapter) {
            return new NextResponse("NOt Found", {status:404});
        }

        if(chapter.videoUrl) {
            const existingMuxdata = await prismadb.muxData.findFirst({
                where: {
                    chapterId: params.chapterId,
                }
            });

            if (existingMuxdata && existingMuxdata.assetId) {
                try {
                    await video.assets.delete(existingMuxdata.assetId);
                } catch (error) {
                    console.error("Failed to delete Mux asset:", error);
                    return new NextResponse("Error deleting video asset", { status: 500 });
                }
                await prismadb.muxData.delete({
                    where: {
                        id: existingMuxdata.id,
                    }
                });

            }
        }

        const deletedChapter = await prismadb.chapter.delete({
            where: {
                id: params.chapterId
         } });

         const publishedChaptersInCourse = await prismadb.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true,
            }
         });

         if (!publishedChaptersInCourse.length) {
                await prismadb.course.update({
                    where: {
                        id: params.courseId,
                    },
                    data: {
                        isPublished: false
                    }
                });
         }

         return NextResponse.json(deletedChapter);


} catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error)

    return new NextResponse("Internal Server Error", {status: 500});
   }
}

export async function PATCH(
    req: Request,
    {params} : {
        params: {courseId: string; chapterId: string}}
) { 
    try {
        const  userId = await getUserId();
        const {isPublished, ...values } = await req.json();

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }
   
            const ownCourse = await prismadb.course.findUnique({
                where: {
                    id: params.courseId,
                    userId
                }
            })

            if(!ownCourse) {
                return new NextResponse("Unauthorized", {status: 401});
            }

            const chapter = await prismadb.chapter.update({
                where: {
                    id: params.chapterId,
                    courseId: params.courseId,
                },
                data: {
                    ...values
                }
            });


            // TODO: handle video upload
            if (values.videoUrl) {
                const existingMuxData = await prismadb.muxData.findFirst({
                    where: {
                            chapterId: params.chapterId,
                    } 
                })

                if(existingMuxData) {
                    
                    await video.assets.delete(existingMuxData.assetId);
                    await prismadb.muxData.delete({
                        where: {
                            id: existingMuxData.id,
                        }
                    })

                }

                const asset = await video.assets.create({
                    input: values.videoUrl,
                    playback_policy: ["public"],
                    test: false,
                });
                    await prismadb.muxData.create({
                        data: {
                            chapterId: params.chapterId,
                            assetId: asset.id,
                            playbackId: asset.playback_ids?.[0]?.id,
                        }
                    })

            }


            return NextResponse.json(chapter);
    }

    catch (error) {
                console.log("[COURSES_CHAPTER_ID]", error);
    } 
    return new NextResponse  ("Internal Error", {status: 500})
}



// import { NextResponse } from "next/server";
// import Mux from "@mux/mux-node"
// import prismadb from "../../../../../../../../lib/db";
// import { getUserId } from "../../../../../../../../lib/auth-utils";

// export async function DELETE(
//     req: Request,
//     { params }: { params: { courseId: string; chapterId: string; sectionId: string } }
// ) {
//     try {
//         const userId = await getUserId();

//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 });
//         }

//         // Verify ownership of the course
//         const ownCourse = await prismadb.course.findUnique({
//             where: {
//                 id: params.courseId,
//                 userId,
//             },
//         });

//         if (!ownCourse) {
//             return new NextResponse("Unauthorized", { status: 401 });
//         }

//         // Check if the chapter exists
//         const chapter = await prismadb.chapter.findUnique({
//             where: {
//                 id: params.chapterId,
//                 courseId: params.courseId,
//                 sectionId: params.sectionId
//             },
//         });

//         if (!chapter) {
//             return new NextResponse("Not Found", { status: 404 });
//         }

//         // Delete the chapter
//         const deletedChapter = await prismadb.chapter.delete({
//             where: { id: params.chapterId },
//         });

//         // If no other chapters are published, unpublish the course
//         const publishedChaptersInCourse = await prismadb.chapter.findMany({
//             where: { courseId: params.courseId, isPublished: true },
//         });

//         if (!publishedChaptersInCourse.length) {
//             await prismadb.course.update({
//                 where: { id: params.courseId },
//                 data: { isPublished: false },
//             });
//         }

//         return NextResponse.json(deletedChapter);
//     } catch (error) {
//         console.log("[CHAPTER_ID_DELETE]", error);
//         return new NextResponse("Internal Server Error", { status: 500 });
//     }
// }

// export async function PATCH(
//     req: Request,
//     { params }: { params: { courseId: string; chapterId: string; sectionId: string } }
// ) {
//     try {
//         const userId = await getUserId();
//         const { isPublished, videoUrl, ...values } = await req.json();

//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 });
//         }

//         // Verify ownership of the course
//         const ownCourse = await prismadb.course.findUnique({
//             where: {
//                 id: params.courseId,
//                 userId,
//             },
//         });

//         if (!ownCourse) {
//             return new NextResponse("Unauthorized", { status: 401 });
//         }

//         // Update the chapter with the new video URL or other details
//         const updatedChapter = await prismadb.chapter.update({
//             where: { id: params.chapterId, courseId: params.courseId },
//             data: { videoUrl, ...values },
//         });

//         return NextResponse.json(updatedChapter);
//     } catch (error) {
//         console.log("[COURSES_CHAPTER_ID_PATCH]", error);
//         return new NextResponse("Internal Error", { status: 500 });
//     }
// }
