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
  soundQuality: z.enum(['GOOD', 'AVERAGE', 'POOR']),
  soundQualityReason: z
    .string()
    .min(20, '20자 이상 입력해주세요.')
    .max(500, '500자 이내로 작성해주세요.'),
  facilityQuality: z.enum(['GOOD', 'AVERAGE', 'POOR']),
  facilityQualityReason: z
    .string()
    .min(20, '20자 이상 입력해주세요.')
    .max(500, '500자 이내로 작성해주세요.'),
  ratingNumber: z.number().min(1).max(5),
  ratingStory: z.number().min(1).max(5),
  ratingRewatch: z.number().min(1).max(5),
  ratingActing: z.number().min(1).max(5),
  ratingPerformance: z.number().min(1).max(5),
  overallComment: z
    .string()
    .min(20, '20자 이상 입력해주세요.')
    .max(500, '500자 이내로 작성해주세요.'),
})

export type ReviewWriteFormType = z.infer<typeof reviewWriteSchema>
