
import { getCourses } from "../../../actions/get-landing-courses";
import prismadb from "../../../lib/db";
import { SearchPageClient } from "./search-page-client-landing";



const SearchPage = async () => {
 

 
  const categories = await prismadb.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses();

  return <SearchPageClient courses={courses}  />;
};

export default SearchPage;
