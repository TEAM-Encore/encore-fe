import z from 'zod'

export const loginSchema = z.object({
  image: z.string().optional(),
  nickname: z
    .string()
    .min(1, '닉네임을 입력해주세요')
    .max(6, '닉네임은 6자 이하여야 합니다')
    .regex(/^[가-힣a-zA-Z0-9]+$/, '한글, 영문, 숫자만 사용 가능합니다')
    .refine((val) => !val.includes(' '), '공백은 사용할 수 없습니다'),
})

export type LoginFormType = z.infer<typeof loginSchema>
