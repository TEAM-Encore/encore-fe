
import posterplaceholder from '@/assets/images/poster-placeholder.png'
import { TicketBook } from '@/components/TicketBook'
import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function Index() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111'}}>
  <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => setSelectedId(null)}>
        <View
          style={{
            
            width: 320,
            gap: 20,
          }}
        >
          
          <TicketBook
            active={selectedId === 1}
            onPress={() => setSelectedId(1)}
            title="비더슈탄트"
            date="2024.06.21"
            theaterseat="샤롯데 시어터 B구역 6열 4번"
            attendees={['우선영', '염지은', '하은영', '윤혜원']}
            posterUrl={posterplaceholder}
          />

          
          <TicketBook
            active={selectedId === 2}
            onPress={() => setSelectedId(2)}
            title="헤드윅"
            date="2024.07.03"
            theaterseat="B구역 7열 12번"
            attendees={['홍길동', '김철수']}
            posterUrl={posterplaceholder}
          />
        </View>
      </Pressable>
    </SafeAreaView>
  )
}
