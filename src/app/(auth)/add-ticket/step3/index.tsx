import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { ticketQueries } from '@/apis/ticket/queries'
import { Button } from '@/components/Button'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import { Search } from '@/components/search/Search'
import { useDebounce } from '@/hooks/useDebounce'
import AddTicketHeader from '../components/AddTicketHeader'
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

  const [keyword, setKeyword] = useState('')
  const [selectState, setSelectState] = useState(false)

  const { data } = useQuery(
    ticketQueries.searchActors({
      keyword: useDebounce(keyword, 150),
    }),
  )

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
      | 'actors'
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
        actors: true,
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
      actors: [],
    },
  })

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
        value={keyword}
        onChangeText={(text) => {
          setKeyword(text)
          setSelectState(false)
        }}
        onDelete={() => setKeyword('')}
      />
      <Spacing size={16} />
      {!selectState && (
        <FlatList
          data={data?.data}
          renderItem={({ item }) => (
            <Row
              key={item.id}
              align="center"
              gap={16}
              onPress={() => {
                const actors = form.watch('actors') ?? []

                setSelectState(true)

                if (item.id) {
                  if (actors.some((actor) => actor.id === item.id)) {
                    return
                  }

                  form.setValue(
                    'actors',
                    [
                      ...actors,
                      {
                        id: item.id,
                        name: item.name ?? '',
                        imageUrl: item.actor_image_url ?? '',
                      },
                    ],
                    {
                      shouldValidate: true,
                    },
                  )
                }
              }}
              className="rounded-[10px] bg-gray-11 px-[10px] py-[13px]"
            >
              <Image
                source={{ uri: item.actor_image_url }}
                width={53}
                height={53}
                className="rounded-md"
                resizeMode="cover"
              />
              <Text variant="body-02" className="text-gray-01">
                {item.name}
              </Text>
            </Row>
          )}
          contentContainerClassName="gap-3 "
        />
      )}

      {selectState && (
        <Row wrap="wrap" gap={10} className="mt-[23px]">
          {form.watch('actors')?.map((item) => (
            <Col
              key={item.id}
              gap={4}
              center
              className="relative h-[100px] w-[78px]"
            >
              <Image
                source={{
                  uri: item.imageUrl,
                }}
                width={72}
                height={72}
                className="rounded-md"
                resizeMode="cover"
              />
              <Text variant="body-02" className="text-gray-01">
                {item.name}
              </Text>
              <Icon
                name="XCircle"
                size={20}
                onPress={() => {
                  form.setValue(
                    'actors',
                    form
                      .watch('actors')
                      ?.filter((actor) => actor.id !== item.id),
                    {
                      shouldValidate: true,
                    },
                  )
                }}
                className="-top-2 -right-1 absolute"
              />
            </Col>
          ))}
        </Row>
      )}
    </Screen>
  )
}
