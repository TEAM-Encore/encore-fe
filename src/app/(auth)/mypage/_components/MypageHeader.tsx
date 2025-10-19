import { router } from 'expo-router'
import { Icon } from '@/components/common/icons/Icon'
import { Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'

export default function MypageHeader() {
  return (
    <Header>
      <Header.Back />
      <Header.Center>
        <Text variant="subhead-05" color="gray-01">
          마이페이지
        </Text>
      </Header.Center>
      <Header.Right>
        <Row
          align="center"
          gap={6}
          className="rounded-lg bg-gray-11 p-3"
          onPress={() => router.push('/mypage/point')}
        >
          <Icon name="Point" size={14} color="#FFDD56" />
          <Text variant="subhead-02" color="primary-04">
            15
          </Text>
        </Row>
      </Header.Right>
    </Header>
  )
}
