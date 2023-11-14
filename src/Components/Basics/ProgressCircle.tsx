import React from "react"
import { Platform } from "react-native";
import AnimatedProgressWheel from 'react-native-progress-wheel';

export const PercentProgressCircle = ({ percent }) => {
  return (
    <AnimatedProgressWheel
      size={Platform.OS === 'ios' ? 20 : 40}
      width={8}
      color={"#42A5F5"}
      progress={percent}
      backgroundColor={"#F5F5F5"}
      animateFromValue={100}
      duration={3000}
    />
  )
}