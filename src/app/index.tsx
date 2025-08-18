import { Icon } from '@/components/common/icons/Icon'
import { Col } from '@/components/common/ui/Flex'
import { CTAButton } from '@/components/CTAButton'
import { Search } from '@/components/search/Search'
import { FormTextField, TextField } from '@/components/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  search: z.string(),
})

type FormType = z.infer<typeof schema>

export default function Index() {
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
  })

  const insets = useSafeAreaInsets()

  console.log(form.watch())

  return (
    <FormProvider {...form}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <ScrollView contentContainerClassName="flex-1">
          <Col center gap={12} className="flex-1 bg-gray-12 px-5">
            <Controller
              control={form.control}
              name="search"
              render={({ field }) => (
                <Search
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="공연명 검색하기"
                  onDelete={() => {
                    form.resetField('search')
                  }}
                />
              )}
            />

            <FormTextField
              control={form.control}
              name="name"
              placeholder="인풋필드 선택 전"
              error="오류 메시지"
              rightElement={(value) =>
                value && value.length > 0 ? (
                  <Icon name="CheckCircle" size={24} className="text-white" />
                ) : null
              }
            />

            <TextField placeholder="인풋필드 선택 후" />
          </Col>

          <View
            className="absolute inset-x-0 bottom-0 px-5 py-4"
            style={{ paddingBottom: insets.bottom }}
          >
            <CTAButton text="다음" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </FormProvider>
  )
}
