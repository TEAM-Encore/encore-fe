import { useMutation, useQuery } from '@tanstack/react-query'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { api } from '@/api'
import { searchKeys } from '@/apis/search/keys'
import { searchMutations } from '@/apis/search/mutations'
import { searchQueries } from '@/apis/search/queries'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Flex, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'
import { ReviewCard } from '@/components/ReviewCard'
import { Search } from '@/components/search/Search'
import { useInfiniteList } from '@/hooks/useInfiniteList'
import { queryClient } from '@/lib/query-client'

export default function SearchResult() {
  const { q } = useLocalSearchParams<{ q: string }>()
  const [searchValue, setSearchValue] = useState(q || '')
  const [isFocusing, setIsFocusing] = useState(false)

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.setParams({ q: searchValue })
    }
  }

  const {
    rows: reviews,
    fetchNextPage,
    ...queryProps
  } = useInfiniteList({
    queryKey: 'reviews',
    fn: api().getReviewList,
    params: {
      search_keyword: searchValue,
    },
    enabled: !!searchValue,
  })

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
              onSubmitEditing={() => {
                handleSearch()
                setIsFocusing(false)
              }}
              onFocus={() => setIsFocusing(true)}
              onEndEditing={() => setIsFocusing(false)}
            />
          </Header.Right>
        </Header>
      }
    >
      {isFocusing && (
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
                  router.replace(
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
      )}
      {!queryProps.isLoading && reviews.length === 0 && (
        <Flex align="center" justify="center" className="h-full w-full">
          <Text variant="body-01" className="text-gray-06">
            검색 결과가 없습니다.
          </Text>
        </Flex>
      )}
      {!queryProps.isLoading && !!reviews.length && (
        <Col className="h-full w-full">
          <FlatList
            data={reviews}
            renderItem={({ item }) => (
              <ReviewCard
                title={item.title ?? ''}
                summary={item.content ?? ''}
                author={item.nickname ?? ''}
                likes={item.like_count ?? 0}
                onPress={() => router.push(`/review-detail/${item.review_id}`)}
              />
            )}
            contentContainerClassName="mt-3 gap-5 px-5"
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              queryProps.isFetchingNextPage ? (
                <ActivityIndicator style={{ padding: 20 }} />
              ) : null
            }
            ListEmptyComponent={
              queryProps.isLoading ? (
                <ActivityIndicator style={{ padding: 20 }} />
              ) : null
            }
          />
        </Col>
      )}
    </Screen>
  )
}
