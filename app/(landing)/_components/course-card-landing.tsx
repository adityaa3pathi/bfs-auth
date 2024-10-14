import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../../../lib/format";

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    
    category: string;
}

export const CourseCard = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    
    category,
}: CourseCardProps) => {
  return ( 


    <div className="m-5 ">
    
    <div className="!bg-gray-700 group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full ">

    <Link href={`/courses/${id}`}
    className="col-span-2 text-left text-gray-600 hover:text-gray-700"
    >
        <div className="relative  w-full aspect-video rounded-md overflow-hidden shadow-lg">
      <Image
      width={220}
      height={150}
      src={imageUrl} alt="" className="h-full w-full border-none object-cover text-gray-700 transition group-hover:scale-125" />
      <span className="absolute top-2 left-2 rounded-full bg-yellow-200 px-2 text-xs font-semibold text-yellow-600">{category}</span>
      </div>

    </Link>



    <div className="col-span-3 flex flex-col space-y-3 pr-8 text-left">
    <a href="#" className="mt-3 overflow-hidden text-2xl font-semibold"> {title}</a>
    <p className="overflow-hidden text-sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna .</p>
    <Link href={`/courses/${id}`} className="text-sm font-semibold text-gray-300 hover:text-gray-500">Saurabh Badaya</Link>

    <div className="flex flex-col text-gray-700 ">
      <div className="flex  justify-between h-fit space-x-2 text-sm font-medium">
        <div className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">{formatPrice(price)}</div>

        <div className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700"> {chaptersLength} {chaptersLength === 1 ? "Lesson" : "Lessons"}</div>
      </div>
      <a href="#" className="my-5 rounded-md px-5 py-2 text-center transition hover:scale-105 bg-orange-600 text-white sm:ml-auto">Enroll Now </a>
    </div>
  </div>


    </div>

        </div>
  

)

}
