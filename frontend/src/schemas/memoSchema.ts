import { z } from "zod";

// メモフォームのバリデーションスキーマ
export const memoSchema = z.object({
  content: z.string().min(1, { message: "メモの内容は必須です" }),
  creator: z.enum(["夫", "妻"], {
    required_error: "作成者を選択してください",
    invalid_type_error: "作成者は「夫」または「妻」を選択してください",
  }),
  status: z.string().default("メモっとくね"),
  completed: z.boolean().default(false),
});

// 型定義の自動生成
export type MemoFormData = z.infer<typeof memoSchema>;
