import prismadb from "@/../lib/db";
import { getUserId } from "../../../lib/auth-utils";
import { NextResponse } from "next/server";






export async function POST(req: Request) {

    { 
        
        try {
            const userId = await getUserId();
                const {title} = await req.json();

                    console.log(userId);
                if(!userId) {

                    return new NextResponse("Unauthorized", {status: 401});
                }


                const course = await prismadb.course.create({
                    data: {
                        userId,
                        title,
                    }
                });
                 

                return NextResponse.json(course);
    }

    catch (error) {

        console.log("[COURSE]", error);
        return new NextResponse("Internal Error", {status: 501});
    }
}
    
}