import dayjs from 'dayjs'
import z from 'zod'

export const schema = z.object({
  musicalId: z.number(),

  /**
   * 관람좌석
   */
  floor: z.string().min(1),
  area: z.string().min(1),
  row: z.string().min(1),
  seatNumber: z.string().min(1),

  /**
   * 관람 일정
   */
  viewedDate: z.string().refine((date) => dayjs(date).isValid()),

  /**
   * 공연 회차
   */
  showTime: z.object({
    hour: z.string().min(1),
    minute: z.string().min(1),
  }),

  /**
   * 공연장
   */
  hall: z.string().min(1),

  actors: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      imageUrl: z.string(),
    }),
  ),
  ticketImageUrl: z.string().optional(),
  noTicketUpload: z.boolean(),
})

export type FormType = z.infer<typeof schema>
