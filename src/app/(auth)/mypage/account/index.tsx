import { Screen } from '@/components/common/ui/Screen';
import { Spacing } from '@/components/common/ui/Spacing';
import { Header } from '@/components/Header';
import { MypageSection } from '../_components/MypageSection';
import { Col } from '@/components/common/ui/Flex';
import { Dialog } from '@/components/Dialog';
import { overlay } from 'overlay-kit';
import { router } from 'expo-router';

export default function Account() {
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
        <MypageSection items={[{ label: '계정 정보', value: 'sa8266su@gmail.com' }]} />
        <MypageSection
          items={[
            {
              label: '로그아웃',
              onPress: () =>
                overlay.open(
                  o => (
                    <Dialog
                      {...o}
                      title='로그아웃 하시겠어요?'
                      top='확인'
                      bottom='취소'
                      onTopPress={() => router.replace('/')}
                    />
                  ),
                  { overlayId: 'logout' }
                ),
            },
            {
              label: '회원탈퇴',
              onPress: () =>
                overlay.open(
                  o => (
                    <Dialog
                      {...o}
											title='회원 탈퇴를 하시겠어요?'
											description="회원 탈퇴 시 이용 내역이 삭제됩니다."
                      top='확인'
                      bottom='취소'
                      onTopPress={() => router.replace('/')}
                    />
                  ),
                  { overlayId: 'delete-account' }
                ),
            },
          ]}
        />
      </Col>
    </Screen>
  );
}
