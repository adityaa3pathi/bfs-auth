import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import HeroSection from "./_components/HeroSection";
import FAQSection from "./_components/Faqs";
import  Stats  from "./_components/Stats";
import ThreeInfo from "./_components/Three-info";
import Features from "./_components/features";
import Socials from "./_components/socials";
import Footer from "../componentss/footer";
import { CoursesList } from "./_components/courses-list-landing";
import SearchPage from "./_components/courses-view-search-landing";
import TestimonialSlider from "./_components/testimonials";
import Navbar from "./_components/nav-bar";


export default function Landing() {
    return(
<div>
        <div>
            <Navbar/>
            <HeroSection/>
            </div>
            <div>
            
           <Stats/>
           <ThreeInfo/>
           <Socials/>
           <Features/>
           <SearchPage/>
           {/* courses */}
           <TestimonialSlider/>
           {/* testimonials */}
           <FAQSection/>
            <Footer/>
            </div>
            
        </div> 
    )
}