import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import { overlay } from 'overlay-kit'
import { useForm } from 'react-hook-form'
import { userQueries } from '@/apis/user/queries'
import GalleryBottomSheet from '@/app/login/profile-setup/components/GalleryBottomSheet'
import {
  type LoginFormType,
  loginSchema,
} from '@/app/login/profile-setup/schema'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { Col, Flex } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'
import { FormTextField } from '@/components/TextField'

export default function Profile() {
  const { data } = useQuery(userQueries.getMyInfo())
  const { mutateAsync } = useMutation(userQueries.patchUserInfo())

  const form = useForm<LoginFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      image: data?.data?.profile_image_url,
      nickname: data?.data?.nickname,
    },
  })

  const onSubmit = form.handleSubmit(async (data: LoginFormType) => {
    await mutateAsync(
      {
        nick_name: data.nickname,
        profile_image_url: data.image,
      },
      {
        onSuccess: () => router.replace('/'),
        onError: (error) => console.error(error),
      },
    )
  })

  return (
    <Screen
      header={
        <Header>
          <Header.Back />
          <Header.Center>프로필 수정</Header.Center>
        </Header>
      }
      fixedButton={<Button onPress={onSubmit}>완료</Button>}
    >
      <Spacing size={30} />
      <Flex center>
        <Avatar
          onUpload={() => {
            if (form.watch('image')) {
              // TODO: 사진 없는 경우 갤러리로 바로 이동
            } else {
              overlay.open((o) => (
                <GalleryBottomSheet
                  {...o}
                  onOpenGallery={() => {}}
                  onDeletePhoto={() => {}}
                />
              ))
            }
          }}
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
