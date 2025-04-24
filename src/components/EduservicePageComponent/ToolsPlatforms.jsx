import React from "react";
import Image from "next/image";

const tools = [
    { icon: "/images/Images/figma.png",name: "Figma" },
    { icon: "/images/Images/adobe.png",name: "Adobe " },
    { icon: "/images/Images/Framer.png",name: "Framer" },
    { icon: "/images/Images/Webflow.png",name: "Webflow" },
    { icon: "/images/Images/Adobeillustrator.png",name: "Adobe illustrator" },
    { icon: "/images/Images/Notion.png" ,name: "Notion"},
    { icon: "/images/Images/Behance.png",name: "Behance" },
    { icon: "/images/Images/Dribble.png",name: "Dribble" },
    { icon: "/images/Images/Canva.png",name: "Canva" },
    { icon: "/images/Images/Miro.png",name: "Miro" },
];

 const ToolsPlatforms = () => {
    return (
        <div className="bg-white py-10 ">
            <h2 className="text-4xl font-bold text-center mb-6">
                Tools & Platforms You'll Master
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
                {tools.map((tool, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <Image src={tool.icon} alt={tool.name}  width={100} height={100} className="mb-2" />
                        <span className="text-sm font-medium text-black text-center">
                            {tool.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ToolsPlatforms;
