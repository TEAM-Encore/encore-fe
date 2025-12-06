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
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_HOST}/api/mvp/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "nick_name": data.nickname,
        "profile_image_url": data.image,
      }),
    })
    
    if (response.status === 200) router.push('/')
  })

  const onOpenGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    })

    const fileName = result?.assets?.[0]?.fileName
    const uri = result?.assets?.[0]?.uri

    if (!fileName || !uri) return

    onUploadImage(fileName, uri)
  }

  const onDeletePhoto = () => {
    form.setValue('image', undefined)
  }

  const onUploadImage = async (fileName: string, uri: string) => {
    try {
      const response = await api.saveImage({ imageName: fileName })
      const uploadUrl = response as string
      const blob = await fetch(uri).then(r => r.blob())

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': blob.type,
        },
        body: blob,
      })

      const r = await uploadResponse.text()


      form.setValue('image', r)
      router.push('/')

    } catch (error) {
      console.error(error)
    }
  }

  const onCheckNickname = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_HOST}/api/mvp/users/nickname-validation?nickname=${form.watch('nickname')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (data.data?.is_valid) {
        form.clearErrors('nickname')
        return;
      };

      switch (data.code) {
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
    } catch (error) {
      console.error(error)
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
        <Button disabled={!form.watch('nickname') /* || !form.watch('image')*/} onPress={onSubmit}>
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
          source={{ uri: form.watch('image') || undefined }}
          onUpload={() => overlay.open((o) => <GalleryBottomSheet {...o} onOpenGallery={onOpenGallery} onDeletePhoto={onDeletePhoto} />)}
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
