import { usePatchUserInfo } from '@/apis/user/mutations'
import { userQueries } from '@/apis/user/queries'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { CheckCircle } from '@/components/common/icons/svgs/CheckCircle'
import { Col, Flex, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'
import { FormTextField } from '@/components/TextField'
import { toast } from '@/components/Toaster'
import { cn } from '@/utils/cn'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ActivityIndicator, StatusBar } from 'react-native'
import GalleryBottomSheet from './components/GalleryBottomSheet'
import { type LoginFormType, loginSchema } from './schema'

export default function ProfileSetup() {
  const router = useRouter()
  const [verifiedNickname, setVerifiedNickname] = useState<string | null>(null)

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      image: undefined,
      nickname: '',
    },
  })

  const nickname = form.watch('nickname')
  const isNicknameVerified = verifiedNickname === nickname && !!nickname
  const canCheckNickname = form.formState.isValid && !!nickname

  const {
    refetch: checkNickname,
    isLoading: isChecking,
  } = useQuery({
    ...userQueries.nicknameValidation({ nickname }),
    enabled: false,
  })

  const { mutate: updateProfile, isPending: isSubmitting } = usePatchUserInfo()

  const handleNicknameCheck = async () => {
    const currentNickname = form.getValues('nickname')

    const isValid = await form.trigger('nickname')
    if (!isValid) {
      const nicknameError = form.formState.errors.nickname
      toast.show(nicknameError?.message || '여백 없이 한글, 영문, 숫자만 가능해요.')
      return
    }

    try {
      const { data: response } = await checkNickname()

      if (!response?.data) {
        toast.show('일시적인 오류가 발생했어요. 다시 시도해주세요.')
        return
      }

      if (response.data.is_valid === true) {
        setVerifiedNickname(currentNickname)
      } else {
        setVerifiedNickname(null)
        toast.show('중복되는 닉네임이에요')
      }
    } catch (error: unknown) {
      setVerifiedNickname(null)

      const apiError = error as { status?: number; data?: { code?: number } }
      const errorCode = apiError?.data?.code

      if (!errorCode) {
        toast.show('일시적인 오류가 발생했어요. 다시 시도해주세요.')
        return
      }

      switch (errorCode) {
        case 3003:
          toast.show('중복되는 닉네임이에요')
          break
        case 3004:
        case 3005:
          toast.show('3글자 이상 입력해주세요.')
          break
        case 3006:
        case 3007:
          toast.show('여백 없이 한글, 영문, 숫자만 가능해요.')
          break
        default:
          toast.show('금칙어가 포함된 닉네임이에요.')
          break
      }
    }
  }

  const onSubmit = form.handleSubmit((values) => {
    updateProfile(
      {
        nick_name: values.nickname,
        profile_image_url: values.image,
        agree_term_enums: ['SERVICE_TERMS', 'PRIVACY_POLICY'],
      },
      {
        onSuccess: () => {
          router.replace('/')
        },
        onError: () => {
          toast.show('회원가입에 실패했습니다')
        },
      },
    )
  })

  return (
    <Screen
      header={
        <Header>
          <Header.Back />
          <Header.Center>회원가입</Header.Center>
        </Header>
      }
      fixedButton={
        <Button
          disabled={!isNicknameVerified || isSubmitting}
          onPress={onSubmit}
        >
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
          onUpload={() => overlay.open((o) => <GalleryBottomSheet {...o} />)}
        />
      </Flex>

      <Spacing size={32} />
      <FormTextField
        control={form.control}
        name="nickname"
        style={{ paddingRight: 90 }}
        placeholder="닉네임을 입력해주세요."
        placeholderTextColor="#8B8B8B"
        rightElement={() => {
          if (isNicknameVerified) {
            return (
              <Row align="center" justify="center" className="h-7 w-7">
                <CheckCircle width={28} height={28} color="#FFFFFF" />
              </Row>
            )
          }

          const isDisabled = !canCheckNickname
          return (
            <Row
              align="center"
              justify="center"
              gap={6}
              className={cn(
                'h-7 rounded-[4px] px-3',
                isDisabled ? 'bg-gray-08' : 'bg-primary-04',
              )}
              onPress={isDisabled || isChecking ? undefined : handleNicknameCheck}
            >
              {isChecking && (
                <ActivityIndicator size="small" color="#171717" />
              )}
              <Text variant="caption" color={isDisabled ? 'sub-white' : 'gray-12'}>
                중복 확인
              </Text>
            </Row>
          )
        }}
      />
    </Screen>
  )
}
