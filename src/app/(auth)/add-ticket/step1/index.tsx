import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList } from 'react-native'
import { Button } from '@/components/Button'
import { Col } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import { Search } from '@/components/search/Search'
import { SearchItem } from '@/components/search/SearchItem'
import AddTicketHeader from '../components/AddTicketHeader'
import { type FormType, schema } from '../schema'

export default function Step1() {
  const [searchValue, setSearchValue] = useState('')
  const form = useForm<Pick<FormType, 'musicalId'>>({
    resolver: zodResolver(schema.pick({ musicalId: true })),
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
        value={searchValue}
        onChangeText={setSearchValue}
        onDelete={() => setSearchValue('')}
      />
      <FlatList
        data={[
          {
            id: 1,
            name: '알라딘 (3연)',
          },
          {
            id: 2,
            name: '알라딘 (3연)',
          },
        ]}
        renderItem={({ item }) => (
          <SearchItem
            selected={form.watch('musicalId') === item.id}
            onPress={() => {
              form.setValue('musicalId', item.id, {
                shouldValidate: true,
              })
            }}
          >
            {item.name}
          </SearchItem>
        )}
        contentContainerClassName="gap-2 mt-4"
      />
    </Screen>
  )
}
