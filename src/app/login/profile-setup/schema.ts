import z from 'zod'

export const loginSchema = z.object({
  profile_image_url: z.string().optional(),
  nick_name: z
    .string()
    .max(6, '6글자가 초과되었어요.')
    .regex(
      /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]+$/,
      '여백 없이 한글, 영문, 숫자만 가능해요.',
    ),
})

export type LoginFormType = z.infer<typeof loginSchema>
