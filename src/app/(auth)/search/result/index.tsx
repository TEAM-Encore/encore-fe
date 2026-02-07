import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { api } from '@/api'
import { Col } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Header } from '@/components/Header'
import { ReviewCard } from '@/components/ReviewCard'
import { Search } from '@/components/search/Search'
import { useInfiniteList } from '@/hooks/useInfiniteList'

export default function SearchResult() {
  const { q } = useLocalSearchParams<{ q: string }>()
  const [searchValue, setSearchValue] = useState(q || '')

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
        />
      </Col>
    </Screen>
  )
}
