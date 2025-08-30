import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'
import { ReviewOptions } from '@/components/ReviewOptions'
import { TextField } from '@/components/TextField'

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
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-12 px-5">
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
      <TextField
        as="textarea"
        placeholder="리뷰를 입력해주세요"
        className="mt-4"
      />
    </SafeAreaView>
  )
}
