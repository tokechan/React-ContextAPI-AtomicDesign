import { useState, useEffect, useCallback } from "react";
import { Memo } from "../types";
import { getMemos, createMemo, updateMemo, deleteMemo } from "../api/memoApi";

/**
 * メモ管理のためのカスタムフック
 * メモの一覧取得、追加、編集、削除
 */
export const useMemos = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // メモ一覧の取得
  const fetchMemos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMemos();
      setMemos(data);
      setError(null);
    } catch (err) {
      console.error("メモの取得に失敗しました", err);
      setError("メモの取得に失敗しました。後でもう一度お試しください。");
    } finally {
      setLoading(false);
    }
  }, []);

  // 初回レンダリング時にメモ一覧を取得
  useEffect(() => {
    fetchMemos();
  }, [fetchMemos]);

  /**
   * メモを追加
   * @param content メモの内容
   * @param creator 作成者（夫/妻）
   */
  const addMemo = async (content: string, creator: string) => {
    try {
      const newMemo: Memo = {
        content,
        status: "メモっとくね",
        creator,
        completed: false,
      };

      const createdMemo = await createMemo(newMemo);
      setMemos((prev) => [...prev, createdMemo]);
      return createdMemo;
    } catch (err) {
      console.error("メモの作成に失敗しました", err);
      setError("メモの作成に失敗しました。後でもう一度お試しください。");
      throw err;
    }
  };

  /**
   * メモを編集
   * @param id 更新対象のID
   * @param memoData 更新するメモデータ
   */
  const updateMemoItem = async (id: number, memoData: Partial<Memo>) => {
    try {
      const currentMemo = memos.find((memo) => memo.id === id);
      if (!currentMemo) {
        throw new Error("メモが見つかりません");
      }

      const updatedMemo = await updateMemo(id, { ...currentMemo, ...memoData });
      setMemos((prev) => prev.map((memo) => (memo.id === id ? updatedMemo : memo)));
      return updatedMemo;
    } catch (err) {
      console.error("メモの更新に失敗しました", err);
      setError("メモの更新に失敗しました。後でもう一度お試しください。");
      throw err;
    }
  };

  /**
   * メモを削除
   * @param id 削除対象のID
   */
  const deleteMemoItem = async (id: number) => {
    try {
      await deleteMemo(id);
      setMemos((prev) => prev.filter((memo) => memo.id !== id));
    } catch (err) {
      console.error("メモの削除に失敗しました", err);
      setError("メモの削除に失敗しました。後でもう一度お試しください。");
      throw err;
    }
  };

  /**
   * メモの完了状態を切り替え
   * @param id メモのID
   */
  const toggleMemoCompletion = async (id: number) => {
    try {
      const memo = memos.find((m) => m.id === id);
      if (!memo) {
        throw new Error("メモが見つかりません");
      }

      const updatedMemo = await updateMemo(id, {
        ...memo,
        completed: !memo.completed,
        status: !memo.completed ? "ちゃんとやった？" : "メモっとくね",
      });

      setMemos((prev) => prev.map((m) => (m.id === id ? updatedMemo : m)));
      return updatedMemo;
    } catch (err) {
      console.error("メモの状態変更に失敗しました", err);
      setError("メモの状態変更に失敗しました。後でもう一度お試しください。");
      throw err;
    }
  };

  return {
    memos,
    loading,
    error,
    fetchMemos,
    addMemo,
    updateMemoItem,
    deleteMemoItem,
    toggleMemoCompletion,
  };
};
