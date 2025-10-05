import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Pressable, StatusBar, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheet } from '@/components/BottomSheet'
import { Button } from '@/components/Button'
import { Icon } from '@/components/common/icons/Icon'
import { Logo } from '@/components/common/icons/svgs'
import { Col } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'
import { TextField } from '@/components/TextField'

export default function ProfileSetup() {
  const [isBottomOpen, setIsBottomOpen] = useState(false)

  const form = useForm({
    defaultValues: {
      image: null,
      nickname: '',
    },
  })

  return (
    <>
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
        <Pressable
          className="mt-6 flex items-center justify-center"
          onPress={() => setIsBottomOpen(true)}
        >
          <View className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full bg-gray-01">
            <Logo size={44} color="#C1C1C1" />
            <View className="absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full bg-gray-09">
              <Icon name="Camera" size={16} className="text-white" />
            </View>
          </View>
        </Pressable>

        <Controller
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <Col className="mt-8 gap-2.5">
              <View className="relative">
                <TextField
                  className="pr-20 leading-5"
                  placeholder="닉네임을 입력해주세요."
                  placeholderTextColor="#8B8B8B"
                  {...field}
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

      {isBottomOpen && (
        <GestureHandlerRootView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
        >
          <BottomSheet.Root
            isOpen={isBottomOpen}
            close={() => setIsBottomOpen(false)}
            backgroundColor="#FFFFFF"
            borderTopRadius={20}
          >
            <BottomSheet.Content className="bg-white">
              <Pressable className="flex h-[68px] flex-row items-center justify-center gap-2.5 bg-white py-5">
                <Icon name="Image" size={24} className="text-gray-09" />
                <Text variant="subhead-long-03" color="gray-09">
                  갤러리에서 변경하기
                </Text>
              </Pressable>
              <Pressable className="flex h-[68px] flex-row items-center justify-center gap-2.5 bg-white py-5">
                <Icon name="Delete" size={24} className="text-sub-alert" />
                <Text variant="subhead-long-03" color="sub-alert">
                  사진 삭제하기
                </Text>
              </Pressable>
            </BottomSheet.Content>
          </BottomSheet.Root>
        </GestureHandlerRootView>
      )}
    </>
  )
}
