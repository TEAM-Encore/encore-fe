import { overlay } from 'overlay-kit'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, StatusBar, View } from 'react-native'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { Col, Flex } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'
import { TextField } from '@/components/TextField'
import { GalleryBottomSheet } from './components/GalleryBottomSheet'

export default function ProfileSetup() {
  const form = useForm({
    defaultValues: {
      image: null,
      nickname: '',
    },
  })

  return (
    <Screen
      className=""
      header={
        <Header>
          <Header.Back />
          <Header.Center>회원가입</Header.Center>
        </Header>
      }
      fixedButton={<Button>시작하기</Button>}
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
          <Col className="mt-8 gap-2.5">
            <View className="relative flex w-full flex-row gap-4">
              <TextField
                style={{ paddingRight: 90 }}
                placeholder="닉네임을 입력해주세요."
                placeholderTextColor="#8B8B8B"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
              />
              <Pressable className="-translate-y-1/2 absolute top-1/2 right-4 flex h-7 w-[64px] items-center justify-center rounded-[4px] bg-primary-04">
                <Text variant="caption" color="gray-12">
                  중복 확인
                </Text>
              </Pressable>
            </View>
            <Text variant="caption" color="sub-alert">
              {form.formState.errors.nickname?.message}
            </Text>
          </Col>
        )}
      />
    </Screen>
  )
}
