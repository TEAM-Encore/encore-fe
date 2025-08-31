import { zodResolver } from '@hookform/resolvers/zod'
import type { PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import z from 'zod'

type PropsWithStrictChildren = PropsWithChildren

const schema = z.object({
  musicalId: z.number(),
  showTime: z.string(),
  viewedDate: z.string(),
  actorIds: z.array(z.number()),
  ticketImageUrl: z.string().optional(),
})

export type FormType = z.infer<typeof schema>

export function AddTicketProvider({ children }: PropsWithStrictChildren) {
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      actorIds: [],
    },
  })

  return <FormProvider {...form}>{children}</FormProvider>
}
