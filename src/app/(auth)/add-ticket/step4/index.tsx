import { zodResolver } from '@hookform/resolvers/zod'
import * as ImagePicker from 'expo-image-picker'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { Image } from 'react-native'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import AddTicketHeader from '../components/AddTicketHeader'
import { type FormType, schema } from '../schema'

export default function Step4() {
  const params = useLocalSearchParams<{
    data: string
  }>()
  const parsedData: FormType = JSON.parse(params.data)
  const router = useRouter()

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...parsedData,
      noTicketUpload: false,
    },
  })

  const onTicketImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      selectionLimit: 1,
    })

    if (result.assets?.[0]) {
      form.setValue('ticketImageUrl', result.assets[0].uri)
    }
  }

  const onSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Screen
      className="py-[29px]"
      header={<AddTicketHeader progress={100} onBack={() => router.back()} />}
      fixedButton={
        <Button onPress={onSubmit} disabled={!form.formState.isValid}>
          등록
        </Button>
      }
    >
      <Col gap={8}>
        <Text variant="body-01" className="text-gray-07">
          4/4
        </Text>
        <Text variant="subhead-05" className="text-gray-01">
          티켓 사진을 업로드해주세요.
        </Text>
      </Col>
      <Spacing size={31} />
      {form.watch('ticketImageUrl') ? (
        <Image
          source={{ uri: form.watch('ticketImageUrl') }}
          className="h-[194px] rounded-lg"
        />
      ) : (
        <Col
          center
          gap={4}
          onPress={onTicketImageUpload}
          className="h-[194px] rounded-lg border border-gray-09 border-dashed"
        >
          <Icon name="Camera" size={24} className="text-gray-07" />
          <Text variant="subhead-02" className="text-gray-07">
            사진 추가
          </Text>
        </Col>
      )}

      <Row align="center" gap={6} className="mt-[15px]">
        <Checkbox
          checked={form.watch('noTicketUpload')}
          onChange={(value) => form.setValue('noTicketUpload', !value)}
        />
        <Row
          align="center"
          onPress={() =>
            form.setValue('noTicketUpload', !form.watch('noTicketUpload'))
          }
        >
          <Text variant="body-02" className="text-gray-01">
            티켓 업로드 안함
          </Text>
          <Text variant="caption" className="text-gray-07">
            (후기글 작성 불가)
          </Text>
        </Row>
      </Row>
    </Screen>
  )
}
