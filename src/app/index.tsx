import { useState } from 'react'

import { Button, SafeAreaView, View } from 'react-native'
import { Popup } from '@/components/Popup'


export default function Index() {
  const [popupOpen, setPopupOpen] = useState(false)

  return (

    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button title="팝업 열기" onPress={() => setPopupOpen(true)} />
      <View style={{ width: 287 }}>
        <Popup
          isOpen={popupOpen}
          title="작성 중인 글이 있어요"
          subtitle="이어서 쓰시겠어요?"
          primaryLabel="이어 쓰기"
          secondaryLabel="새로 쓰기"
          onClose={() => {
            setPopupOpen(false)
          }}
        />
      </View>

    </SafeAreaView>
  )
}
