import { useMutation, useQuery } from '@tanstack/react-query'
import { router, useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { searchKeys } from '@/apis/search/keys'
import { searchMutations } from '@/apis/search/mutations'
import { searchQueries } from '@/apis/search/queries'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'
import { Search } from '@/components/search/Search'
import { queryClient } from '@/lib/query-client'

export default function SearchIndex() {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/search/result?q=${encodeURIComponent(searchValue)}`)
    }
  }

  const { data: recentKeywords, refetch } = useQuery(
    searchQueries.getRecentSearchLogs(),
  )

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch]),
  )
  const { mutate: deleteRecentSearchLog } = useMutation(
    searchMutations.deleteRecentSearchLog(),
  )

  return (
    <Screen
      className="!px-0"
      header={
        <Header className="pr-5 pl-3">
          <Header.Back />
          <Header.Right className="ml-2 h-[36px] flex-1">
            <Search
              height="48"
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
          data={recentKeywords}
          renderItem={({ item }) => (
            <Row
              key={item.name}
              align="center"
              justify="space-between"
              className="border-b border-b-gray-09 px-5 py-[17px]"
              onPress={() => {
                setSearchValue(item.name ?? '')
                router.push(
                  `/search/result?q=${encodeURIComponent(item.name ?? '')}`,
                )
              }}
            >
              <Text color="gray-01" className="font-normal text-[16px]">
                {item.name}
              </Text>
              <Icon
                name="Close"
                size={24}
                color="#FBFBFB"
                onPress={() =>
                  deleteRecentSearchLog(
                    { name: item.name ?? '' },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: searchKeys.all,
                        })
                      },
                    },
                  )
                }
              />
            </Row>
          )}
        />
      </Col>
    </Screen>
  )
}
