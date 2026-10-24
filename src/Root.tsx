import React from "react";
import {Composition} from "remotion";
import {PixelMv} from "./PixelMv";

const FPS = 30;
const DURATION = 2135;

export const Root: React.FC = () => (
  <>
    <Composition id="LeftHandRightHand-Landscape" component={PixelMv} durationInFrames={DURATION} fps={FPS} width={1920} height={1080} defaultProps={{portrait:false}} />
    <Composition id="LeftHandRightHand-Portrait" component={PixelMv} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} defaultProps={{portrait:true}} />
  </>
);
