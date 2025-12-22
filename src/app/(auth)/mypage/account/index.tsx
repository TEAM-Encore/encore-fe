import { router } from 'expo-router'
import { overlay } from 'overlay-kit'
import { Col } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
import { Dialog } from '@/components/Dialog'
import { Header } from '@/components/Header'
import { deleteToken } from '@/lib/storage'
import { useAuth } from '@/providers/user.provider'
import MypageSection from '../_components/MypageSection'

export default function Account() {
  const { logout } = useAuth()

  return (
    <Screen
      header={
        <Header>
          <Header.Back />
          <Header.Center>계정 관리</Header.Center>
        </Header>
      }
    >
      <Spacing size={32} />
      <Col gap={20}>
        <MypageSection
          items={[{ label: '계정 정보', value: 'sa8266su@gmail.com' }]}
        />
        <MypageSection
          items={[
            {
              label: '로그아웃',
              onPress: () =>
                overlay.open(
                  (o) => (
                    <Dialog
                      {...o}
                      title="로그아웃 하시겠어요?"
                      top="확인"
                      bottom="취소"
                      onTopPress={() => {
                        o.close()
                        logout()
                        router.replace('/login')
                      }}
                    />
                  ),
                  { overlayId: 'logout' },
                ),
            },
            {
              label: '회원탈퇴',
              onPress: () =>
                overlay.open(
                  (o) => (
                    <Dialog
                      {...o}
                      title="회원 탈퇴를 하시겠어요?"
                      description="회원 탈퇴 시 이용 내역이 삭제됩니다."
                      top="확인"
                      bottom="취소"
                      onTopPress={() => {
                        o.close()
                        router.replace('/login')
                      }}
                    />
                  ),
                  { overlayId: 'delete-account' },
                ),
            },
          ]}
        />
      </Col>
    </Screen>
  )
}
