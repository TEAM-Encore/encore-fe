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
  soundQuality: z.number().min(1).max(3),
  soundQualityReason: z
    .string()
    .min(20, '20자 이상 입력해주세요.')
    .max(500, '500자 이내로 작성해주세요.'),
  facilityQuality: z.number().min(1).max(3),
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

export const step6Schema = reviewWriteSchema.pick({
  ratingNumber: true,
  ratingStory: true,
  ratingRewatch: true,
  ratingActing: true,
  ratingPerformance: true,
  overallComment: true,
})
export type Step6FormType = z.infer<typeof step6Schema>

export type ReviewWriteFormType = z.infer<typeof reviewWriteSchema>

export const reviewEditSchema = reviewWriteSchema

export type ReviewEditFormType = z.infer<typeof reviewEditSchema>
