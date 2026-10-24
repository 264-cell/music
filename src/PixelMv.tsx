import React, {useLayoutEffect, useRef} from "react";
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig} from "remotion";

type Props = {portrait:boolean};

const PixelScene: React.FC<Props> = ({portrait}) => {
  const ref=useRef<HTMLCanvasElement>(null);
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();

  useLayoutEffect(()=>{
    const canvas=ref.current, ctx=canvas?.getContext("2d");
    if(!canvas||!ctx) return;
    const w=portrait?180:320, h=portrait?320:180;
    canvas.width=w; canvas.height=h; ctx.imageSmoothingEnabled=false;
    const t=frame/fps;
    const rect=(x:number,y:number,rw:number,rh:number,color:string)=>{
      ctx.fillStyle=color; ctx.fillRect(Math.round(x),Math.round(y),rw,rh);
    };
    rect(0,0,w,h,"#24213a");
    const ground=portrait?250:142;
    for(let i=0;i<30;i++){
      const x=(i*47+Math.floor(t*2))%w, y=(i*29+9)%Math.max(20,ground-20);
      if(Math.sin(t*2+i)>.1) rect(x,y,1,1,"#e7dfc7");
    }
    for(let i=0;i<14;i++){
      const x=(i*31-Math.floor(t*4)%31+w)%w, bh=14+(i*13%31);
      rect(x,ground-bh,18,bh,"#393453");
      if(i%3===0) rect(x+4,ground-bh+5,2,2,"#ffd982");
    }
    // Rain is generated from fixed indices and frame time; renders are deterministic.
    for(let i=0;i<45;i++){
      rect((i*37+Math.floor(t*(22+i%5)))%w,(i*61+Math.floor(t*(35+i%7)))%h,1,3,"#707b9b");
    }
    // Tiles join in the chorus section.
    const progress=Math.max(0,Math.min(1,(t-32)/20)), pathY=ground-3;
    for(let i=0;i<Math.floor(progress*12);i++){
      rect(portrait?34+i*9:72+i*13,pathY,7,3,i%2?"#74d9b7":"#f5c86c");
    }
    const blink=frame%129>124;
    const friend=(x:number,y:number,accent:string,phase:number)=>{
      const bob=Math.abs(Math.sin(t*7+phase))*2;
      rect(x+4,y-bob+17,15,3,accent);
      rect(x+2+(frame%12<6?2:0),y-bob+21,5,3,"#f2e9d7");
      rect(x+15-(frame%12<6?2:0),y-bob+21,5,3,"#f2e9d7");
      rect(x,y-bob,22,20,"#f2e9d7"); rect(x+4,y-bob+4,14,10,"#302744");
      rect(x+6,y-bob+7,3,3,blink?"#302744":"#71dfbc");
      rect(x+13,y-bob+7,3,3,blink?"#302744":"#71dfbc");
      rect(x+9,y-bob+13,4,2,accent); rect(x+9,y-bob+17,4,2,"#71dfbc");
    };
    const y=portrait?190:96;
    friend(portrait?47:116,y,"#f3a267",0);
    friend(portrait?104:174,y,"#71dfbc",1.5);
    for(let i=0;i<12;i++){
      const a=i*2.4+t*1.1, r=5+(i*7%14);
      if(progress>.15) rect((portrait?90:160)+Math.cos(a)*r,y+9+Math.sin(a)*r*.55,2,2,i%2?"#f3a267":"#ffe08a");
    }
    const dawn=Math.max(0,Math.min(1,(t-58)/13));
    if(dawn>0){ctx.globalAlpha=dawn*.48;rect(0,0,w,h,"#f0a76e");ctx.globalAlpha=1;rect(w*.5-8,ground-28,16,16,"#ffd982");}
    // Captions stay blank until authorized lyric text and verified timings are supplied.
  },[frame,fps,portrait]);

  return <canvas ref={ref} style={{width:"100%",height:"100%",imageRendering:"pixelated"}} />;
};

export const PixelMv: React.FC<Props> = ({portrait}) => (
  <AbsoluteFill style={{backgroundColor:"#171528"}}>
    <PixelScene portrait={portrait}/>
    <Audio src={staticFile("source/left-hand-right-hand.mp4")}/>
  </AbsoluteFill>
);
