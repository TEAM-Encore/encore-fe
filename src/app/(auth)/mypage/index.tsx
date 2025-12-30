import { useQuery } from '@tanstack/react-query'
import { userQueries } from '@/apis/user/queries'
import { Avatar } from '@/components/Avatar'
import { Col } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import MypageHeader from './_components/MypageHeader'
import type { MypageSectionItem } from './_components/MypageSection'
import MypageSection from './_components/MypageSection'

const MOCK: Record<string, MypageSectionItem[]> = {
  account: [
    { label: '계정 관리', href: '/mypage/account' },
    { label: '프로필 수정', href: '/mypage/account/profile' },
    { label: '작성글', href: '/mypage/reviews' },
    { label: '좋아요 목록', href: '/mypage/likes' },
  ],
  externalLinks: [
    {
      label: '문의사항',
      href: 'https://honored-collard-ece.notion.site/24c84f6854f18047900ff1f8340543b3?source=copy_link',
    },
    {
      label: '이용약관',
      href: 'https://honored-collard-ece.notion.site/24c84f6854f180bf9db3c0b0c808e20b',
    },
    {
      label: '개인정보 처리방침',
      href: 'https://honored-collard-ece.notion.site/24c84f6854f18047900ff1f8340543b3?source=copy_link',
    },
  ],
  appInfo: [{ label: '앱 버전', value: '1.0.0' }],
}

export default function Index() {
  const { data } = useQuery(userQueries.getMyInfo())

  return (
    <Screen header={<MypageHeader />} scrollable>
      <Spacing size={21} />
      <Col gap={20} center>
        <Avatar imageUrl={data?.data?.profile_image_url ?? undefined} />
        <Text variant="subhead-04" color="gray-01">
          {data?.data?.nickname ?? ''}
        </Text>
      </Col>
      <Spacing size={10} />
      <Col gap={42}>
        <MypageSection title="내 계정" items={MOCK.account} />
        <MypageSection title="외부 링크" items={MOCK.externalLinks} />
        <MypageSection title="앱 정보" items={MOCK.appInfo} />
      </Col>
    </Screen>
  )
}
