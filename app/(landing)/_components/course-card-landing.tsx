import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "../../../lib/format";
import { Loader } from "lucide-react"; // Import the Loader icon from Lucide React

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  realPrice: number;
  description: string;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  realPrice,
  description,
  category,
}: CourseCardProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    router.push(`/courses/${id}`);
  };

  return (
    <div className="m-5">
      <div className="!bg-gray-700 group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <Link href={`/courses/${id}`} onClick={handleClick} className="col-span-2 text-left text-gray-600 hover:text-gray-700">
          <div className="relative w-full aspect-video rounded-md overflow-hidden shadow-lg">
            {/* Image with conditional Loader */}
            {loading ? (
              <div className="flex items-center justify-center w-full h-full bg-gray-800">
                <Loader className="animate-spin text-white" size={40} />
              </div>
            ) : (
              <Image
                width={220}
                height={150}
                src={imageUrl}
                alt=""
                className="h-full w-full border-none object-cover text-gray-700 transition group-hover:scale-125"
              />
            )}
            <span className="absolute top-2 left-2 rounded-full bg-yellow-200 px-2 text-xs font-semibold text-yellow-600">{category}</span>
          </div>
        </Link>

        <div className="col-span-3 flex flex-col space-y-3 text-left">
          <a href="#" className="mt-3 overflow-hidden text-2xl font-semibold">
            {title}
          </a>
          <p className="overflow-hidden text-sm">{description}</p>
          <Link href={`/courses/${id}`} className="text-sm font-semibold text-gray-300 hover:text-gray-500">
            Saurabh Badaya
          </Link>

          <div className="flex flex-col text-gray-700">
            <div className="flex justify-between h-fit space-x-2 text-sm font-medium">
              <div className="flex">
                <div className="rounded-full bg-green-100 px-2 py-2 text-green-700">{formatPrice(price)}</div>
                <div className="rounded-full px-1 py-2 text-white line-through">{formatPrice(realPrice)}</div>
              </div>
              <div className="rounded-full py-2 bg-blue-100 px-2 text-blue-700">
                {chaptersLength} {chaptersLength === 1 ? "Lesson" : "Lessons"}
              </div>
            </div>
            <a href="#" className="my-5 rounded-md px-5 py-2 text-center transition hover:scale-105 bg-orange-600 text-white">
              Enroll Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
