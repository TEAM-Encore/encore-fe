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
import { GalleryBottomSheet } from './components/GalleryBottomSheet'
import { type LoginFormType, loginSchema } from './schema'

export default function ProfileSetup() {
  const form = useForm<LoginFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      image: undefined,
      nickname: '',
    },
  })

  const onSubmit = form.handleSubmit(() => {
    // do something
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
        rightElement={() => (
          <Col
            align="center"
            justify="center"
            className="h-7 w-[64px] rounded-[4px] bg-primary-04"
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
