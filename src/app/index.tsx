import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'expo-router'
import { useForm } from 'react-hook-form'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { SafeAreaView as SafeArea } from 'react-native-safe-area-context'
import { z } from 'zod'
import { Button } from '@/components/Button'
import { Text } from '@/components/common/ui/Text'
import { ReviewOptions } from '@/components/ReviewOptions'
import { TextField } from '@/components/TextField'
import { toast } from '@/components/Toaster'

const schema = z.object({
  review: z.enum(['GOOD', 'NORMAL', 'BAD']),
})

export default function Index() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      review: 'GOOD',
    },
  })
  return (
    <SafeArea className="flex-1 items-center justify-center bg-gray-12 px-5">
      <Link href="/add-ticket/step1" asChild>
        <Text className="text-center font-semibold text-white">
          Add Ticket 페이지로 이동
        </Text>
      </Link>

      <ReviewOptions
        value={form.watch('review')}
        options={[
          { label: '잘 들려요', value: 'GOOD' },
          { label: '보통이에요', value: 'NORMAL' },
          { label: '좋지 않아요', value: 'BAD' },
        ]}
        onSelect={(value) => {
          form.setValue('review', value)
        }}
      />
      <Button onPress={() => toast.show('토스트')}>토스트</Button>
      <TextField
        as="textarea"
        placeholder="리뷰를 입력해주세요"
        className="mt-4"
      />
    </SafeArea>
  )
}
