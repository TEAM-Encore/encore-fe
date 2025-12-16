import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList } from 'react-native'
import { musicalQueries } from '@/apis/musical/queries'
import { Button } from '@/components/Button'
import { Col } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import { Search } from '@/components/search/Search'
import { SearchItem } from '@/components/search/SearchItem'
import { useDebounce } from '@/hooks/useDebounce'
import { useUser } from '@/providers/user.provider'
import AddTicketHeader from '../components/AddTicketHeader'
import { type FormType, schema } from '../schema'

export default function Step1() {
  const [keyword, setKeyword] = useState('')

  const user = useUser()

  const { data } = useQuery(
    musicalQueries.searchMusicals({
      keyword: useDebounce(keyword, 150),
      pageable: {},
    }),
  )
  const form = useForm<Pick<FormType, 'musicalId' | 'hall'>>({
    resolver: zodResolver(schema.pick({ musicalId: true, hall: true })),
  })

  const router = useRouter()

  const onSubmit = form.handleSubmit((data) => {
    router.push({
      pathname: '/add-ticket/step2',
      params: {
        data: JSON.stringify(data),
      },
    })
  })

  return (
    <Screen
      header={<AddTicketHeader progress={25} onBack={() => router.back()} />}
      fixedButton={
        <Button onPress={onSubmit} disabled={!form.formState.isValid}>
          확인
        </Button>
      }
      className="py-[29px]"
    >
      <Col gap={8}>
        <Text variant="body-01" className="text-gray-07">
          1/4
        </Text>
        <Text variant="subhead-05" className="text-gray-01">
          관람한 공연을 검색해주세요.
        </Text>
      </Col>
      <Spacing size={29} />
      <Search
        placeholder="공연명 검색하기"
        value={keyword}
        onChangeText={setKeyword}
        onDelete={() => setKeyword('')}
      />
      <FlatList
        data={data?.data?.content ?? []}
        renderItem={({ item }) => (
          <SearchItem
            selected={form.watch('musicalId') === item.musical_id}
            onPress={() => {
              form.setValue('musicalId', item.musical_id ?? 0, {
                shouldValidate: true,
              })
              form.setValue('hall', item.location ?? '', {
                shouldValidate: true,
              })
            }}
          >
            {item.title + ' ' + item.location}
          </SearchItem>
        )}
        contentContainerClassName="gap-2 mt-4"
      />
    </Screen>
  )
}
