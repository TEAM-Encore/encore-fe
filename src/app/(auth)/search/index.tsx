import { useState } from 'react'
import { FlatList } from 'react-native'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Flex, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'
import { ReviewCard } from '@/components/ReviewCard'
import { Search } from '@/components/search/Search'

const MOCK = ['알라딘', '레미제라블', '오페라의 유령', '캣츠']

const RESULT_MOCK = [
  {
    id: 1,
    title: '5년차 찐 뮤덕의 알라딘 후기',
    summary:
      '넘버 퀄리티부터 배우합까지, 전반적으로 모두 만족스러웠던 공연입니다. 다시 본다면 개인적으로는 1열..',
    author: '뮤사랑',
    likes: 10,
  },
  {
    id: 2,
    title: '레미제라블 넘버 하나하나가 명곡',
    summary:
      '음악이 정말 좋아요. 특히 민턴 배우님 음색이 너무 좋아서 감동받았습니다. 꼭 다시 보고 싶어요!',
    author: '뮤지컬러버',
    likes: 25,
  },
  {
    id: 3,
    title: '오페라의 유령 보고 왔어요',
    summary:
      '무대 세트가 정말 화려하고 웅장해서 놀랐어요. 샹들리에 떨어지는 장면은 정말 압권이었습니다..',
    author: '극장매니아',
    likes: 15,
  },
  {
    id: 4,
    title: '캣츠 다시 봐도 재밌네요',
    summary:
      '배우들의 유연함과 춤 실력이 정말 대단합니다. 메모리 넘버에서는 눈물이 날 뻔 했어요 ㅠㅠ',
    author: '공연덕후',
    likes: 30,
  },
]

export default function Index() {
  const [searchValue, setSearchValue] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  return (
    <Screen
      className="!px-0"
      header={
        <Header className="pr-5 pl-3">
          <Header.Back />
          <Row className="ml-2 h-[36px] flex-1">
            <Search
              placeholder="공연 제목"
              value={searchValue}
              onChangeText={setSearchValue}
              onDelete={() => setSearchValue('')}
              className="!h-[36px] !text-[14px] placeholder:!text-gray-07 !py-[9px] w-full"
              onEndEditing={() => setIsSearching(true)}
            />
          </Row>
        </Header>
      }
    >
      <Col className="w-full">
        {isSearching ? (
          <FlatList
            data={RESULT_MOCK}
            renderItem={({ item }) => (
              <ReviewCard {...item} className="!p-4 !w-full" hideImage />
            )}
            contentContainerClassName="mt-3 gap-5 px-5"
          />
        ) : (
          <Col>
            {MOCK.map((searchKey) => (
              <Row
                key={searchKey}
                align="center"
                justify="space-between"
                className="border-b border-b-gray-09 px-5 py-[17px]"
              >
                <Text color="gray-01" className="font-normal text-[16px]">
                  {searchKey}
                </Text>
                <Flex>
                  <Icon name="Close" size={24} color="#FBFBFB" />
                </Flex>
              </Row>
            ))}
          </Col>
        )}
      </Col>
    </Screen>
  )
}
