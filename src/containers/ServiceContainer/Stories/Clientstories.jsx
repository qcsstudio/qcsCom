import Heading from "@/components/HeadingComponent/Heading";
import IconNtext from "@/components/iconNtextComponent/IconNtext";
import StoriesswiperTestimonial from "./StoriesswiperTestimonial";
import { ClientTestimonial, studentTestimonial } from "./TestimonialsData";

const ClientStories = ({ type , heading }) => {
  return (
    <>
      <IconNtext text="Client Stories" link="/images/Icons/ClientStories.png" />
      <Heading heading={heading || "Hear Stories Straight From the People We Helped"} />

      {type === "student" && (
        <StoriesswiperTestimonial testimonials={studentTestimonial} />
      )}

      {type === "client" && (
        <StoriesswiperTestimonial testimonials={ClientTestimonial} />
      )}

      {type === "both" && (
        <>
          <StoriesswiperTestimonial testimonials={ClientTestimonial} />
          <StoriesswiperTestimonial testimonials={studentTestimonial} />
        </>
      )}
    </>
  );
};

export default ClientStories;
