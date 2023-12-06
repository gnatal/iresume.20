import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import i18n from '../../i18n/i18n';
import { useSelector } from 'react-redux';

function Loading() {
  const appLanguage = useSelector((state: any) => state.appLanguage.value);
  i18n.changeLanguage(appLanguage)
  const t = i18n.t
  return (
    <View className='flex flex-col justify-center items-center h-screen bg-[#f2f2f2]'>
      <Text className='font-bold text-5xl text-[#33b5e5] mb-10 text-center'>{i18n.t('Loading')}	</Text>
      <View>
        <ActivityIndicator size="large" color='#33B5E5' />
      </View>
    </View>
  )
}

export default Loading;