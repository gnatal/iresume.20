import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

function Loading() {
  return (
    <View className='flex flex-col justify-center items-center h-screen bg-[#f2f2f2]'>
      <Text className='font-bold text-5xl text-[#33b5e5] mb-10 text-center'>Aguarde</Text>
      <View>
        <ActivityIndicator size="large" color='#33B5E5' />
      </View>
    </View>
  )
}

export default Loading;