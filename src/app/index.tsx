import { Avatar } from '@/components/Avatar'
import { zodResolver } from '@hookform/resolvers/zod'
import * as ImagePicker from 'expo-image-picker'
import { useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

const schema = z.object({
  uri: z.string().optional(),
})

type FormType = z.infer<typeof schema>

export default function Index() {
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
  })

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-12">
      <Avatar
        source={{ uri: form.watch('uri') }}
        onUpload={async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            selectionLimit: 1,
          })

          if (result.assets) {
            form.setValue('uri', result.assets[0].uri)
          }
        }}
      />
    </SafeAreaView>
  )
}
