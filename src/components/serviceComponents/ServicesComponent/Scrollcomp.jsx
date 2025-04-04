import { TbWorld } from "react-icons/tb";
import { CardData } from "./CardData";
import Cardscroll from "./Cardscroll"


export default function Scrollcomp() {
  return (
    <>
    <div className="grid grid-cols-1 no-scrollbar h-[600px] w-[60%] ">
    {CardData.map((card,index)=>{
      return (
      <div key={index}>
          <Cardscroll card={card}/>
      </div>
      );
    })}
   

    </div>
    
    </>
  );
}
