import { zodResolver } from '@hookform/resolvers/zod'
import * as ImagePicker from 'expo-image-picker'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import { useForm } from 'react-hook-form'
import { Image } from 'react-native'
import { ticketMutations } from '@/apis/ticket/mutations'
import { BottomSheet } from '@/components/BottomSheet'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import { toast } from '@/components/Toaster'
import { useUser } from '@/providers/user.provider'
import { cn } from '@/utils/cn'
import { uploadImage } from '@/utils/upload-image'
import AddTicketHeader from '../components/AddTicketHeader'
import { type FormType, schema } from '../schema'

export default function Step4() {
  const params = useLocalSearchParams<{
    data: string
  }>()
  const parsedData: FormType = JSON.parse(params.data)
  const router = useRouter()

  const user = useUser()

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...parsedData,
      noTicketUpload: false,
    },
  })

  const { mutate } = ticketMutations.createTicket()

  const onTicketChange = () => {
    overlay.open((ov) => (
      <BottomSheet.Root {...ov} backgroundColor="#FFFFFF" borderTopRadius={20}>
        {({ onClose }) => (
          <BottomSheet.Content>
            <Row
              center
              gap={6}
              className="py-6"
              onPress={() => {
                onTicketImageUpload()
                onClose()
              }}
            >
              <Icon name="Image" size={24} />
              <Text variant="subhead-03" color="gray-09">
                갤러리에서 변경하기
              </Text>
            </Row>
            <Row
              center
              gap={6}
              className="py-6"
              onPress={() => {
                form.setValue('ticketImageUrl', undefined)
                onClose()
              }}
            >
              <Icon name="Delete" size={24} color="sub-alert" />
              <Text variant="subhead-03" color="sub-alert">
                사진에서 삭제하기
              </Text>
            </Row>
          </BottomSheet.Content>
        )}
      </BottomSheet.Root>
    ))
  }

  const onTicketImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      selectionLimit: 1,
    })

    if (result.assets?.[0]) {
      const url = await uploadImage(result.assets[0])
      if (url) {
        form.setValue('ticketImageUrl', url.url)
        form.setValue('dynamicTicketImageUrl', url.dynamicUrl)
      }
    }
  }

  const onSubmit = form.handleSubmit(async (data) => {
    if (!user?.id) return

    console.log(data)

    mutate(
      {
        musical_id: data.musicalId,
        viewed_date: data.viewedDate,
        show_time: `${data.showTime.hour}:${data.showTime.minute}`,
        floor: Number(data.floor),
        zone: data.zone,
        col: data.col,
        number: data.seatNumber,
        actor_ids: data.actors.map((actor) => actor.id),
        ticket_image_url: data.noTicketUpload ? undefined : data.ticketImageUrl,
      },
      {
        onSuccess: () => {
          toast.show('티켓을 등록했어요.')
          router.dismissTo('/')
        },
        onError: (error) => {
          toast.show(error.message)
          console.error(error)
        },
      },
    )
  })

  return (
    <Screen
      className="py-[29px]"
      header={<AddTicketHeader progress={100} onBack={() => router.back()} />}
      fixedButton={
        <Button
          onPress={onSubmit}
          disabled={
            !form.watch('ticketImageUrl') && !form.watch('noTicketUpload')
          }
        >
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

      <Col
        center
        gap={4}
        onPress={
          form.watch('ticketImageUrl') ? onTicketChange : onTicketImageUpload
        }
        className="relative h-[194px] rounded-lg border border-gray-09 border-dashed"
      >
        {form.watch('ticketImageUrl') && (
          <Image
            source={{ uri: form.watch('ticketImageUrl') }}
            className="absolute inset-0 h-[194px] rounded-lg"
          />
        )}
        <Icon
          name="Camera"
          size={24}
          className={cn(
            form.watch('ticketImageUrl') ? 'text-gray-01' : 'text-gray-07',
          )}
        />
        <Text
          variant="subhead-02"
          className={cn(
            form.watch('ticketImageUrl') ? 'text-gray-01' : 'text-gray-07',
          )}
        >
          사진 {form.watch('ticketImageUrl') ? '변경' : '추가'}
        </Text>
      </Col>
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
            티켓 업로드 안함{' '}
          </Text>
          <Text variant="caption" className="text-gray-07">
            (후기글 작성 불가)
          </Text>
        </Row>
      </Row>
    </Screen>
  )
}
