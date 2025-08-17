import { colors } from '@/styles/color'
import { cn } from '@/utils/cn'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextInput } from 'react-native'
import { Col } from './common/ui/Flex'
import { Text } from './common/ui/Text'

type TextFieldProps = React.ComponentProps<typeof TextInput> & {
  error?: string
}

export function TextField({
  className,
  onFocus: injectedOnFocus,
  onBlur: injectedOnBlur,
  error,
  ...rest
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Col gap={6} className="w-full">
      <TextInput
        placeholderTextColor={colors.gray['08']}
        className={cn(
          'h-[52px] w-full rounded-[8px] border px-4 py-[14px] text-[16px] text-gray-01 transition-colors',
          {
            'border-gray-01': isFocused && !error,
            'border-gray-09': !isFocused && !error,
            'border-sub-alert': error,
          },
          className,
        )}
        textAlignVertical="center"
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
      {error && (
        <Text variant="caption" className="text-sub-alert">
          {error}
        </Text>
      )}
    </Col>
  )
}

type FormTextFieldProps = TextFieldProps & {
  name: string
}

export function FormTextField({ name, error, ...rest }: FormTextFieldProps) {
  const context = useFormContext()

  return (
    <Controller
      control={context.control}
      name={name}
      render={({ field }) => <TextField {...field} {...rest} error={error} />}
    />
  )
}
