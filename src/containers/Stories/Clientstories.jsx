import { IoMdPause } from "react-icons/io";


const testimonials = [
  {
    name: "Tobias Green",
    title: "FOUNDER, GREENSPARK INNOVATIONS",
    quote:
      "Working with this team felt like having a secret weapon. They took our scattered ideas and turned them into a website that screams 'wow!' Our customers can't stop raving about it!",
    image: "/images/Images/client1.png",
  },
  {
    name: "Silas Leighton",
    title: "MANAGING DIRECTOR, VENTUREVISTA",
    quote:
      "Finally, an agency that speaks our language! They understood our vision better than we did and brought it to life in a way that exceeded expectations. 10/10 would recommend!",
    image: "/images/Images/client2.png",
  },
  {
    name: "Orion Vance",
    title: "CEO, LUNAR LUX CO.",
    quote:
      "I came in with high hopes, and they absolutely blew me away. From strategy to execution, every detail was on point. I'm telling everyone I know—hire them!",
    image: "/images/Images/client3.png",
  },
  {
    name: "Callum Yates",
    title: "CO-FOUNDER, DRIFTWOOD MEDIA",
    quote:
      "Our brand went from a whisper to a roar. The team's creativity and expertise made all the difference. We're getting noticed like never before!",
    image: "/images/Images/client4.png",
  },
  {
    name: "Jasper Lowell",
    title: "CEO, COPPERLEAF ENTERPRISES",
    quote:
      "Our online presence went from zero to hero in no time. The team made the process so seamless, I almost forgot I was working on a big project!",
    image: "/images/Images/client5.png",
  },
  {
    name: "Jasper Lowell",
    title: "BRAND MANAGER, STELLAR BLOOM STUDIO",
    quote:
      "They made us feel like their most important client. The attention to detail, quick responses, and innovative ideas were top-notch. We'll definitely be back for more!",
    image: "/images/Images/client6.png",
  },
];

 const ClientStories = () => {
  return (
    <>
      <h2 className="text-5xl w-[70%] mx-auto font-bold text-center">
        Hear Stories <span></span>Straight From
        the People We Helped
      </h2>
    <div className="w-[85%] mx-auto  text-center mb-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {testimonials.map((testimonial, index) => (
            <div key={index}>
          <div  className="p-6 rounded-lg  bg-[#F5F7F9] h-[182px] flex">
            <p className="text-[#F1813B] text-3xl  leading-none"><IoMdPause/></p>
            <p className="text-[#0F0F0F]  text-left  text-sm mt-4 ms-3">{testimonial.quote}</p>
            
          </div>
          <div className=" items-center mt-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full mr-4"
              />
              <div className="text-left">
                <p className="font-semibold text-lg">{testimonial.name}</p>
                <p className="text-xs text-[#0F0F0F]">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
export default ClientStories;