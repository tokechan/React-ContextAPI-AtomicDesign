import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memoSchema, MemoFormData } from "../schemas/memoSchema";

/**
 * メモフォーム用のカスタムフック
 * @param initialData 初期データ（編集時に使用）
 * @returns React Hook Formのメソッド
 */
export const useMemoForm = (initialData?: Partial<MemoFormData>) => {
  const methods = useForm<MemoFormData>({
    resolver: zodResolver(memoSchema),
    defaultValues: {
      content: initialData?.content || "",
      creator: initialData?.creator || "夫",
      status: initialData?.status || "メモっとくね",
      completed: initialData?.completed || false,
    },
  });

  return methods;
};
