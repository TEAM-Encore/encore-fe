import { zodResolver } from '@hookform/resolvers/zod'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList } from 'react-native-gesture-handler'
import { Button } from '@/components/Button'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Flex, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Search } from '@/components/search/Search'
import { AddTicketHeader } from '../components/AddTicketHeader'
import { type FormType, schema } from '../schema'

const ACTORS = [
  {
    id: 1,
    name: '옥주현',
  },
  {
    id: 2,
    name: '서경수',
  },
]

export default function Step3() {
  const params = useLocalSearchParams<{
    data: string
  }>()

  const parsedData: Pick<
    FormType,
    | 'musicalId'
    | 'floor'
    | 'area'
    | 'row'
    | 'seatNumber'
    | 'viewedDate'
    | 'showTime'
    | 'hall'
  > = JSON.parse(params.data)

  const form = useForm<
    Pick<
      FormType,
      | 'musicalId'
      | 'floor'
      | 'area'
      | 'row'
      | 'seatNumber'
      | 'viewedDate'
      | 'showTime'
      | 'hall'
      | 'actorIds'
    >
  >({
    resolver: zodResolver(
      schema.pick({
        musicalId: true,
        floor: true,
        area: true,
        row: true,
        seatNumber: true,
        viewedDate: true,
        showTime: true,
        hall: true,
        actorIds: true,
      }),
    ),
    defaultValues: {
      musicalId: parsedData.musicalId,
      floor: parsedData.floor,
      area: parsedData.area,
      row: parsedData.row,
      seatNumber: parsedData.seatNumber,
      viewedDate: parsedData.viewedDate,
      showTime: parsedData.showTime,
      hall: parsedData.hall,
      actorIds: [],
    },
  })

  const [searchValue, setSearchValue] = useState('')

  const onSubmit = form.handleSubmit((data) => {
    router.push({
      pathname: '/add-ticket/step4',
      params: {
        data: JSON.stringify(data),
      },
    })
  })

  return (
    <Screen
      className="py-[29px]"
      header={<AddTicketHeader progress={75} onBack={() => router.back()} />}
      fixedButton={
        <Button onPress={onSubmit} disabled={!form.formState.isValid}>
          확인
        </Button>
      }
    >
      <Col gap={8} className="mb-[31px]">
        <Text variant="body-01" className="text-gray-07">
          3/4
        </Text>
        <Text variant="subhead-05" className="text-gray-01">
          배우 정보를 입력해주세요.
        </Text>
      </Col>
      <Search
        placeholder="배우 이름 검색하기"
        value={searchValue}
        onChangeText={setSearchValue}
        onDelete={() => setSearchValue('')}
      />
      <FlatList
        data={ACTORS}
        style={{ flexGrow: 0 }}
        renderItem={({ item }) => (
          <Row
            key={item.id}
            align="center"
            gap={16}
            onPress={() => {
              const actors = form.watch('actorIds') ?? []
              actors.push(item.id)
              form.setValue('actorIds', actors)
            }}
            className="rounded-[10px] bg-gray-11 px-[10px] py-[13px]"
          >
            <Flex className="size-[53px] rounded-md bg-gray-05" />
            <Text variant="body-02" className="text-gray-01">
              {item.name}
            </Text>
          </Row>
        )}
        contentContainerClassName="gap-3 mt-4"
      />
      <FlatList
        data={form.watch('actorIds')}
        horizontal
        renderItem={({ item }) => (
          <Col gap={4} center className="relative h-[100px] w-[78px]">
            <Col className="size-[72px] rounded-md bg-gray-05" />
            <Text variant="body-02" className="text-gray-01">
              {ACTORS.find((actor) => actor.id === item)?.name}
            </Text>
            <Icon
              name="XCircle"
              size={20}
              onPress={() => {
                form.setValue(
                  'actorIds',
                  form.watch('actorIds')?.filter((id) => id !== item),
                )
              }}
              className="-top-2 -right-1 absolute"
            />
          </Col>
        )}
        contentContainerClassName="gap-[10px] mt-[23px]"
      />
    </Screen>
  )
}
