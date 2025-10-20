import { router } from 'expo-router'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'
import { Search } from '@/components/search/Search'

const RECENT_SEARCHES = ['알라딘', '레미제라블', '오페라의 유령', '캣츠']

export default function SearchIndex() {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/search/result?q=${encodeURIComponent(searchValue)}`)
    }
  }

  return (
    <Screen
      className="!px-0"
      header={
        <Header className="pr-5 pl-3">
          <Header.Back />
          <Header.Right className="ml-2 h-[36px] flex-1">
            <Search
              placeholder="공연 제목"
              value={searchValue}
              onChangeText={setSearchValue}
              onDelete={() => setSearchValue('')}
              className="placeholder:!text-gray-07 !py-[9px] h-[36px] w-full text-[14px]"
              onSubmitEditing={handleSearch}
            />
          </Header.Right>
        </Header>
      }
    >
      <Col className="h-full w-full">
        <FlatList
          data={RECENT_SEARCHES}
          renderItem={({ item }) => (
            <Row
              key={item}
              align="center"
              justify="space-between"
              className="border-b border-b-gray-09 px-5 py-[17px]"
              onPress={() => {
                setSearchValue(item)
                router.push(`/search/result?q=${encodeURIComponent(item)}`)
              }}
            >
              <Text color="gray-01" className="font-normal text-[16px]">
                {item}
              </Text>
              <Icon name="Close" size={24} color="#FBFBFB" />
            </Row>
          )}
        />
      </Col>
    </Screen>
  )
}
