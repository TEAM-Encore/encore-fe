import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { Spacing } from '@/components/common/ui/Spacing'
import { ReviewCard } from '@/components/ReviewCard'
import { useUser } from '@/providers/user.provider'
import SortSelector from './SortSelector'

const tabs = [
  { label: '인기순', value: 'likecount' },
  { label: '최신순', value: 'createdat' },
]

export default function ReviewStep() {
  const router = useRouter()
  const flatListRef = useRef<FlatList>(null)

  const user = useUser()
  const [sort, setSort] = useState<(typeof tabs)[number]['value']>(
    tabs[0].value,
  )

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['reviews', sort],
      queryFn: async ({ pageParam }) => {
        const params = new URLSearchParams({
          cursor: pageParam?.toString() ?? '',
          'pageable.page': '0',
          'pageable.size': '3',
          'pageable.sort': sort,
          userId: String(user?.id),
        })
        if (pageParam != null) params.set('cursor', String(pageParam))

        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_HOST}/api/mvp/review/list?${params}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        return response.json().then((data) => data.data)
      },
      initialPageParam: undefined as number | undefined,
      getNextPageParam: (lastPage) => {
        return lastPage?.nextCursor ?? undefined
      },
    })

  const reviews = data?.pages.flatMap((page) => page?.content ?? []) ?? []

  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false })
  }, [])

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
            onPress={() => router.push(`/review-detail/${item.review_id}`)}
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
