import z from 'zod'

export const loginSchema = z.object({
  image: z.string().optional(),
  nickname: z
    .string()
    .min(1, '닉네임을 입력해주세요.')
    .max(6, '6글자가 초과되었어요.')
    .regex(/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]+$/, '여백 없이 한글, 영문, 숫자만 가능해요.')
    .regex(/^[^ㄱ-ㅎㅏ-ㅣ]+$/, '완성된 글자로 입력해주세요.'),
})

export type LoginFormType = z.infer<typeof loginSchema>
