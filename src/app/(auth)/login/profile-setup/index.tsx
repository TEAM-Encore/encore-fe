import { zodResolver } from '@hookform/resolvers/zod'
import { overlay } from 'overlay-kit'
import { useForm } from 'react-hook-form'
import { StatusBar } from 'react-native'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { Col, Flex } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'
import { FormTextField } from '@/components/TextField'
import GalleryBottomSheet from './components/GalleryBottomSheet'
import { type LoginFormType, loginSchema } from './schema'
import * as ImagePicker from 'expo-image-picker'
import { api } from '@/api'
import { router } from 'expo-router'
import { useImageUpload } from '@/hooks/useImageUpload'

export default function ProfileSetup() {
  const form = useForm<LoginFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      image: undefined,
      nickname: '',
    },
  })

  const onSubmit = form.handleSubmit(async (data: LoginFormType) => {
    try {
      const response = await api().patchUserInfo({
        nick_name: data.nickname,
        profile_image_url: data.image,
      })

      if (response.code === 1000) {
        router.replace('/')
      }
    } catch (error) {
      console.error(error)
    }
  })

  const uploadImage = useImageUpload()

  const onOpenGallery = async () => {
    overlay.unmount('gallery')

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    })

    const uri = result?.assets?.[0]?.uri
    const fileName = result?.assets?.[0]?.fileName

    if (!fileName || !uri) return

    const url = await uploadImage({ uri, fileName })
    form.setValue('image', url)
  }

  const onDeletePhoto = () => {
    overlay.unmount('gallery')
    form.setValue('image', undefined)
  }

  const onCheckNickname = async () => {
    try {
      const response = await api().validateUserNickname({ nickname: form.watch('nickname') })
      const data = response.data;
      if (data?.is_valid) {
        form.clearErrors('nickname')
        return;
      };
    } catch (error: any) {
      switch (error.code) {
        case 3004: case 3005:
          form.setError('nickname', { message: '6글자가 초과되었어요.' })
          break;
        case 3003:
          form.setError('nickname', { message: '중복되는 닉네임이에요' })
          break;
        case 3006: case 3007:
          form.setError('nickname', { message: '여백 없이 한글, 영문, 숫자만 가능해요.' })
          break;
        default:
          form.setError('nickname', { message: '금칙어가 포함된 닉네임이에요.' })
          break;
      }
    }
  }

  return (
    <Screen
      header={
        <Header>
          <Header.Back />
          <Header.Center>회원가입</Header.Center>
        </Header>
      }
      fixedButton={
        <Button disabled={!form.formState.isValid} onPress={onSubmit}>
          시작하기
        </Button>
      }
    >
      <StatusBar barStyle="light-content" />
      <Spacing size={24} />
      <Col>
        <Text variant="subhead-05" color="gray-01">
          프로필만 설정하면
        </Text>
        <Text variant="subhead-05" color="gray-01">
          바로 시작할 수 있어요!
        </Text>
      </Col>

      <Spacing size={24} />
      <Flex center>
        <Avatar
          source={{ uri: form.watch('image') }}
          onUpload={() => overlay.open((o) => <GalleryBottomSheet {...o} onOpenGallery={onOpenGallery} onDeletePhoto={onDeletePhoto} />, { overlayId: 'gallery' })}
        />
      </Flex>

      <Spacing size={32} />
      <FormTextField
        control={form.control}
        name="nickname"
        style={{ paddingRight: 90 }}
        placeholder="닉네임을 입력해주세요."
        placeholderTextColor="#8B8B8B"
        rightElement={() => (
          <Col
            align="center"
            justify="center"
            className="h-7 w-[64px] rounded-[4px] bg-primary-04"
            onPress={onCheckNickname}
          >
            <Text variant="caption" color="gray-12">
              중복 확인
            </Text>
          </Col>
        )}
      />
    </Screen>
  )
}
