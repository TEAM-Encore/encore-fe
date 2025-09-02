import { ReviewOptions } from '@/components/ReviewOptions'
import { TextField } from '@/components/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

const schema = z.object({
  review: z.enum(['GOOD', 'NORMAL', 'BAD']),
})

export default function Index() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111' }}>
      <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => setSelectedId(null)}>
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
