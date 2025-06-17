"use client";

import { botContext } from '@/context/Bot.context';
import Spline from '@splinetool/react-spline';
import { useContext, useEffect } from 'react';

export default function Bot() {
    
    const {botActivate,setBotActivate}= useContext(botContext);

    useEffect(()=>{
            console.log("Clicked",botActivate);
    },[botActivate]);

    return (
        <div style={{ width: "100%", height: "100%" , display:"flex", justifyContent:"center",alignItems:"center"}} >
            <Spline scene="https://prod.spline.design/OJow-atyjfcrmg1x/scene.splinecode" className=' cursor-pointer' onClick={()=>setBotActivate(!botActivate)}/>
            
        </div>
    );
}
