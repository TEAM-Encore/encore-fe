import { useState } from 'react'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { TextInput, View } from 'react-native'
import { colors } from '@/styles/color'
import { cn } from '@/utils/cn'
import { Col } from './common/ui/Flex'
import { Text } from './common/ui/Text'

type TextFieldProps = React.ComponentProps<typeof TextInput> & {
  as?: 'input' | 'textarea'
  error?: string
  rightElement?: (value?: string) => React.ReactNode
}

export function TextField({
  as = 'input',
  className,
  onFocus: injectedOnFocus,
  onBlur: injectedOnBlur,
  error,
  value,
  rightElement,
  ...rest
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Col gap={6} className="w-full">
      <View className="relative">
        <TextInput
          placeholderTextColor={colors.gray['08']}
          className={cn(
            'h-[52px] w-full rounded-[8px] border px-4 py-[10px] text-[16px] text-gray-01',
            {
              'border-gray-01': isFocused && !error,
              'border-gray-09': !isFocused && !error,
              'border-sub-alert': error,
              'h-[117px]': as === 'textarea',
            },
            className,
          )}
          textAlignVertical={as === 'textarea' ? 'top' : 'center'}
          multiline={as === 'textarea'}
          scrollEnabled={as === 'textarea'}
          value={value}
          onFocus={(e) => {
            setIsFocused(true)
            injectedOnFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            injectedOnBlur?.(e)
          }}
          {...rest}
        />
        {rightElement && (
          <View className="absolute inset-y-0 right-4 justify-center">
            {rightElement(value)}
          </View>
        )}
      </View>
      {error && (
        <Text variant="caption" className="text-sub-alert">
          {error}
        </Text>
      )}
    </Col>
  )
}

type FormTextFieldProps<TFieldValues extends FieldValues> = TextFieldProps & {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
}

export function FormTextField<TFieldValues extends FieldValues>({
  control,
  name,
  error,
  ...rest
}: FormTextFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <TextField
          {...rest}
          error={error ?? fieldState.error?.message}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
        />
      )}
    />
  )
}
