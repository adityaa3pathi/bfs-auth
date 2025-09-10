

// import { auth } from "@clerk/nextjs/server";
// import prismadb from "../../../../lib/db";
// import { redirect } from "next/navigation";
// import { getProgress } from "../../../../actions/get-progress";
// import { CourseSidebar } from "./_components/course-sidebar";
// import { CourseNavbar } from "./_components/course-navbar";

// const CourseLayout =  async ({
//     children,
//     params
// }: {
//     children: React.ReactNode;
//     params: {courseId: string};
// }) => {
//     const {userId} = auth();

//     if(!userId) {

//         return redirect("/")
//     }

//     const course = await prismadb.course.findUnique({
//         where: {
//             id: params.courseId,
//         },
//         include: {
//             chapters: {
//                 where: {
//                     isPublished: true,
//                 },
//                 include: {
//                     userProgress: {
//                         where: {
//                             userId, 
//                         }
//                     }
//                 },
//                 orderBy: {
//                     position: "asc"
//                 }
//             }
//         }

//     });
//     if(!course) {
//         return redirect("/");
//     }

//     const progressCount = await getProgress(userId, course.id);

//     return (
//         <div className="h-full">
//             <div className="h-[80px md:pl-80 fixed inset-y-0 w-full z-50]">
//                     <CourseNavbar
//                     course={course}
//                     progressCount={progressCount}
//                     />
//             </div>


//             <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
//             <CourseSidebar
//             course={course}
//             progressCount= {progressCount}
//             />
//             </div>
//             <main className="md:pl-80  pt-[80px] h-full">
//                return <>{children}</>;
//             </main>
            
//         </div>
//     )
// }


import { getUserId } from "../../../../lib/auth-utils";
import prismadb from "../../../../lib/db";
import { redirect } from "next/navigation";
import Footer from "../../../(landing)/_components/footer";
import { getProgress } from "../../../../actions/get-progress";
import NavBar from "../../../(dashboard)/_components/navbar";





const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const userId = await getUserId();

  // Handle the case where the user is not authenticated
  if (!userId) {

    //adding the logic to render course page even if the user is not logged in
    const course = await prismadb.course.findUnique({
      where: {
        id: params.courseId,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
           orderBy: {
          position: "asc",
        },
        }

      }
    })
    // redirect("/");
   // return null;  Important: Return null to prevent further rendering after redirect
  }

  // Fetch course with chapters and progress
if(userId){
const course = await prismadb.course.findUnique({
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

  // Redirect to home if the course doesn't exist
  if (!course) {
    redirect("/");
    return null;
  }
}

  // Fetch the progress count
  // const progressCount = await getProgress(userId, course.id);

  return (
    <div className="flex flex-col justify-between bg-gray-00 text-gray-200 min-h-screen">
    <div className="h-[80px] fixed w-full z-50">
    <NavBar/>
    </div>
    <main className="flex bg-gray-900 flex-row justify-between gap-4 pt-[80px]">
      <div className="flex-grow overflow-auto m-4"> {/* Adjust children to avoid overlap */}
        {children}
      </div>
    </main>
    <footer className="w-full bg-blue_gray-800 border-t shadow-sm z-50 ">
      <Footer />
    </footer>
  </div>
  );
};

export default CourseLayout;
