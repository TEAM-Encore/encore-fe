import z from 'zod'

export const reviewWriteSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(30, '30자 이내로 작성해주세요.'),
  seatViewImage: z.string().min(1, '시야 이미지를 선택해주세요.'),
  seatViewComment: z
    .string()
    .min(20, '20자 이상 입력해주세요.')
    .max(500, '500자 이내로 작성해주세요.'),

  // TODO: Step 4~6 추가 예정
})

export type ReviewWriteFormType = z.infer<typeof reviewWriteSchema>
