import { zodResolver } from '@hookform/resolvers/zod'
import { overlay } from 'overlay-kit'
import { Controller, useForm } from 'react-hook-form'
import { StatusBar } from 'react-native'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { Col, Flex, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'
import { TextField } from '@/components/TextField'
import { GalleryBottomSheet } from './components/GalleryBottomSheet'
import { type LoginFormType, loginSchema } from './schema'

export default function ProfileSetup() {
  const form = useForm<LoginFormType>({
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
      fixedButton={<Button onPress={onSubmit}>시작하기</Button>}
    >
      <StatusBar barStyle="light-content" />
      <Col className="mt-6">
        <Text variant="subhead-05" color="gray-01">
          프로필만 설정하면
        </Text>
        <Text variant="subhead-05" color="gray-01">
          바로 시작할 수 있어요!
        </Text>
      </Col>

      <Flex center className="mt-6">
        <Avatar
          onUpload={() => overlay.open((o) => <GalleryBottomSheet {...o} />)}
        />
      </Flex>

      <Controller
        control={form.control}
        name="nickname"
        render={({ field }) => (
          <Col gap={10} className="mt-8">
            <Row gap={16} className="relative w-full">
              <TextField
                style={{ paddingRight: 90 }}
                placeholder="닉네임을 입력해주세요."
                placeholderTextColor="#8B8B8B"
                {...field}
                onChangeText={field.onChange}
                error={form.formState.errors.nickname?.message}
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
            </Row>
          </Col>
        )}
      />
    </Screen>
  )
}
