import { useState } from 'react'
import { Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ReviewCard } from '@/components/ReviewCard'
import posterplaceholder from '../../assets/images/poster-placeholder.png'


export default function Index() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111' }}>
      <Pressable
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => setSelectedId(null)}
      >
        <View
          style={{
            width: 320,
            gap: 20,
          }}
        >
          <ReviewCard
            active={selectedId === 1}
            onPress={() => setSelectedId(1)}
            posterUrl={posterplaceholder}
            title="5년차 찐 뮤덕의 알라딘 후기"
            summary={`넘버 퀄리티부터 배우합까지, 전반적으로 모두 만족스러웠던 공연.`}
            author="뮤사랑"
            likes={10}
          />
        </View>
      </Pressable>
    </SafeAreaView>
  )
}
