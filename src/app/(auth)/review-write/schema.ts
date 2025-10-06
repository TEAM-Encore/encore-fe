import z from "zod";

export const reviewWriteSchema = z.object({
    /**
     * 후기글 제목 (Step 2)
     */
    title: z.string().min(1, "제목을 입력해주세요.").max(30, "30자 이내로 작성해주세요."),

    // TODO: Step 3~6 추가 예정
});

export type ReviewWriteFormType = z.infer<typeof reviewWriteSchema>;
