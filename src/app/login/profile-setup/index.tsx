import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { overlay } from 'overlay-kit'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { ActivityIndicator, Keyboard, Pressable, StatusBar } from 'react-native'
import { api } from '@/api'
import { userKeys } from '@/apis/user/keys'
import { userMutations } from '@/apis/user/mutations'
import { userQueries } from '@/apis/user/queries'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { CheckCircle } from '@/components/common/icons/svgs'
import { Col, Flex } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'
import { FormTextField } from '@/components/TextField'
import { toast } from '@/components/Toaster'
import { queryClient } from '@/lib/query-client'
import { uploadImage } from '@/utils/upload-image'
import GalleryBottomSheet from './components/GalleryBottomSheet'
import { type LoginFormType, loginSchema } from './schema'

interface ProfileSetupProps {
  isFromAccount?: boolean
}

export default function ProfileSetup({
  isFromAccount = false,
}: ProfileSetupProps) {
  const { data: myInfo } = useQuery(userQueries.getMyInfo())

  const form = useForm<LoginFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      profile_image_url: myInfo?.profile_image_url ?? undefined,
      nick_name: myInfo?.nickname ?? '',
    },
  })

  useEffect(() => {
    if (myInfo?.email) {
      form.reset({
        profile_image_url: myInfo.profile_image_url ?? undefined,
        nick_name: myInfo.nickname ?? '',
      })
    }
  }, [myInfo, form.reset])

  const profile_image_url = useWatch({
    control: form.control,
    name: 'profile_image_url',
  })
  const nick_name = useWatch({ control: form.control, name: 'nick_name' })

  const { mutate: patchUserInfo, isPending } = useMutation(
    userMutations.patchUserInfo(),
  )
  const { mutate: validateUserNickname, isPending: isCheckingNickname } =
    useMutation(userMutations.validateUserNickname())
  const { mutate: setupComplete } = useMutation(userMutations.setupComplete())

  const [validatedNickname, setValidatedNickname] = useState<string>()
  const isNicknameValid = validatedNickname === nick_name && !!nick_name
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [imageFilePath, setImageFilePath] = useState<string | undefined>(
    undefined,
  )

  const onCheckNickname = async () => {
    const isValid = await form.trigger('nick_name')
    if (!isValid) return

    validateUserNickname(
      { nickname: nick_name },
      {
        onSuccess: (data) => {
          if (data?.data?.is_valid) {
            setValidatedNickname(nick_name)
          }
        },
        onError: (error) => {
          setValidatedNickname(undefined)
          const err = error as Error & {
            error?: { code?: number; message?: string }
          }
          form.setError('nick_name', {
            message: err.error?.message ?? err.message,
          })
        },
      },
    )
  }

  const onSubmit = form.handleSubmit(async (data: LoginFormType) => {
    const payload: Partial<LoginFormType> = {}

    if (data.nick_name !== myInfo?.nickname) {
      payload.nick_name = data.nick_name
    }

    if (data.profile_image_url !== myInfo?.profile_image_url) {
      payload.profile_image_url = imageFilePath
    }

    patchUserInfo(payload, {
      onSuccess: () => {
        if (isFromAccount) {
          queryClient.invalidateQueries({ queryKey: userKeys.myInfo() })
          toast.show('프로필 수정이 완료되었습니다.')
          router.back()
        } else {
          setupComplete(undefined, {
            onSuccess: () => {
              router.replace('/')
            },
            onError: (error: { message?: string }) =>
              toast.show(error.message ?? ''),
          })
        }
      },
      onError: (error) => toast.show(error.message),
    })
  })

  const buttonText = () => {
    if (isPending) return <ActivityIndicator />
    if (isFromAccount) return '저장하기'
    return '시작하기'
  }

  return (
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <Screen
        header={
          <Header>
            <Header.Back />
            <Header.Center>
              {isFromAccount ? '프로필 수정' : '회원가입'}
            </Header.Center>
          </Header>
        }
        fixedButton={
          <Button
            disabled={!form.formState.isValid || isPending || (isFromAccount && !form.formState.isDirty)}
            onPress={onSubmit}
          >
            {buttonText()}
          </Button>
        }
      >
        <StatusBar barStyle="light-content" />
        {!isFromAccount && (
          <>
            <Spacing size={24} />
            <Col>
              <Text variant="subhead-05" color="gray-01">
                프로필만 설정하면
              </Text>
              <Text variant="subhead-05" color="gray-01">
                바로 시작할 수 있어요!
              </Text>
            </Col>
          </>
        )}

        <Spacing size={24} />
        <Flex center>
          <Avatar
            imageUrl={profile_image_url || undefined}
            onUpload={async () => {
              if (
                imageFilePath &&
                imageFilePath !== 'dynamic/encore-default.png'
              ) {
                overlay.open((o) => (
                  <GalleryBottomSheet
                    {...o}
                    onOpenGallery={(url, file_path) => {
                      setImageFilePath(file_path)
                      form.setValue('profile_image_url', url)
                    }}
                    onDeletePhoto={async () => {
                      const defaultPath = 'dynamic/encore-default.png'
                      setImageFilePath(defaultPath)
                      try {
                        const { url } = await api().viewImage({
                          file_path: defaultPath,
                        })
                        if (url) form.setValue('profile_image_url', url)
                      } catch {
                        form.setValue('profile_image_url', undefined)
                      }
                    }}
                    onUploadStart={() => setIsUploadingImage(true)}
                    onUploadEnd={() => setIsUploadingImage(false)}
                  />
                ))
              } else {
                try {
                  const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ['images'],
                    allowsEditing: false,
                    aspect: [1, 1],
                    quality: 0.8,
                  })
                  if (result.canceled || !result.assets?.length) return
                  const asset = result.assets[0]
                  setIsUploadingImage(true)
                  try {
                    const res = await uploadImage(asset)
                    if (res.url && res.file_path) {
                      setImageFilePath(res.file_path)
                      form.setValue('profile_image_url', res.url)
                    }
                  } finally {
                    setIsUploadingImage(false)
                  }
                } catch {
                  toast.show('이미지를 불러오는 데 실패했습니다.')
                }
              }
            }}
            loading={isUploadingImage}
          />
        </Flex>

        <Spacing size={32} />
        <FormTextField
          control={form.control}
          name="nick_name"
          style={{ paddingRight: 90 }}
          placeholder="닉네임을 입력해주세요."
          placeholderTextColor="#8B8B8B"
          rightElement={() =>
            isNicknameValid ? (
              <CheckCircle width={24} height={24} className="text-primary-04" />
            ) : (
              <Col
                align="center"
                justify="center"
                className="h-7 w-[64px] rounded-[4px] bg-primary-04"
                onPress={onCheckNickname}
              >
                {isCheckingNickname ? (
                  <ActivityIndicator />
                ) : (
                  <Text variant="caption" color="gray-12">
                    중복 확인
                  </Text>
                )}
              </Col>
            )
          }
        />
      </Screen>
    </Pressable>
  )
}
