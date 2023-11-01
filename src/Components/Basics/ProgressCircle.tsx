import React from "react";
import { Platform, Text, View } from "react-native";
// import AnimatedProgressWheel from 'react-native-progress-wheel';

export const PercentProgressCircle = ({ percent }) => {
  return (
    <View>
      <Text>{percent}</Text>
    </View>
  );
};
