import { useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import { pointQueries } from '@/apis/point/queries'
import { Icon } from '@/components/common/icons/Icon'
import { Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'

export default function MypageHeader() {
  const { data } = useQuery(pointQueries.getMyBalance())

  return (
    <Header>
      <Header.Back />
      <Header.Center>
        <Text variant="subhead-05" color="gray-01">
          마이페이지
        </Text>
      </Header.Center>
      <Header.Right className="pr-[7px]">
        <Row
          align="center"
          gap={6}
          className="rounded-lg bg-gray-11 px-3 py-2.5"
          onPress={() => router.push('/mypage/point')}
        >
          <Icon name="Point" size={15} color="#FFDD56" />
          <Text variant="subhead-02" color="primary-04">
            {data?.data?.current_balance ?? 0}
          </Text>
        </Row>
      </Header.Right>
    </Header>
  )
}
