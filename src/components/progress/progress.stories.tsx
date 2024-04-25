import React from "react";
import { Progress } from "./index";
import { Icon } from "../icon";

export default {
title: "Progress",
component: Progress,
};

export const knobsProgress = () => (
  <Progress
    count={50}
    countNumber={true}
    height={10}
    circle={false}
    size={100}
    primary={'#FF4785'}
    secondary={'#FFAE00'}
    bottomColor={'#DDDDDD'}
    flashColor={'#FFFFFF'}
    progressText={""}
  ></Progress>
);

export const circle = () => <Progress count={80} circle={true}></Progress>;

export const progressText = () => (
  <Progress count={11} progressText={'yehuozhili'}></Progress>
);

export const changeColor = () => (
  <Progress
    count={20}
    primary='blue'
    secondary='yellow'
    bottomColor='brown'
  ></Progress>
);

export const withIcon = () => (
  <Progress
    count={11}
    progressText={
      <span>
        <Icon icon='admin'></Icon>
      </span>
    }
  ></Progress>
);