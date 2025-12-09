import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { api } from '@/api'
import { Spacing } from '@/components/common/ui/Spacing'
import { ReviewCard } from '@/components/ReviewCard'
import { useInfiniteList } from '@/hooks/useInfiniteList'
import SortSelector from './SortSelector'

const tabs = [
  { label: '인기순', value: 'likecount' },
  { label: '최신순', value: 'createdat' },
]

export default function ReviewStep() {
  const [sort, setSort] = useState(tabs[0].value)

  const flatListRef = useRef<FlatList>(null)

  const { rows, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteList({
      queryKey: ['reviews', sort],
      fn: api().getReviewList,
      params: {
        userId: 10010,
      },
    })

  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
  //   useInfiniteQuery({
  //     queryKey: ['reviews', sort],
  //     queryFn: async ({ pageParam }) => {
  //       const params = new URLSearchParams({
  //         page: '0',
  //         sort: sort,
  //       })

  //       const response = await fetch(
  //         `${process.env.EXPO_PUBLIC_API_HOST}/api/mvp/review/list?${params}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         },
  //       )
  //       const json = await response.json()
  //       return json.data
  //     },
  //     initialPageParam: 0,
  //     getNextPageParam: (lastPage) => {
  //       if (lastPage?.last) return undefined
  //       const content = lastPage?.content ?? []
  //       return content[content.length - 1]?.review_id
  //     },
  //   })

  const reviews = data?.pages.flatMap((page) => page?.content ?? []) ?? []

  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false })
  }, [sort])

  return (
    <>
      <SortSelector tabs={tabs} value={sort} onChange={setSort} />
      <Spacing size={1} />
      <FlatList
        data={reviews}
        ref={flatListRef}
        contentContainerClassName="px-5 gap-5 pb-6"
        keyExtractor={(item) => item.review_id}
        renderItem={({ item }) => (
          <ReviewCard
            title={item.title}
            summary={item.content ?? ''}
            author={item.nickname ?? ''}
            likes={item.like_count ?? 0}
            // onPress={() => router.push(`/review-detail/${item.review_id}`)}
          />
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage()
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={{ padding: 20 }} />
          ) : null
        }
        ListEmptyComponent={
          isLoading ? <ActivityIndicator style={{ padding: 20 }} /> : null
        }
      />
    </>
  )
}
