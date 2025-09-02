import React from 'react'
import { Pressable, SafeAreaView } from 'react-native'
import { Text } from '@/components/common/ui/Text'
import { Popup } from '@/components/Popup'

export default function Index() {
  async function handleOpenPopup() {
    const resume = await Popup()
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Pressable
        onPress={handleOpenPopup}
        className="rounded-xl bg-yellow-400 px-6 py-3 active:scale-95"
      >
        <Text variant="subhead-02" className="font-bold text-[#1A1A1A]">
          모달 열기
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}
