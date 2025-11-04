import { renderHook, act } from "@testing-library/react";
import { useMemos } from "./useMemos";
import { describe, it, expect, vi } from "vitest";
import * as memoApi from "../api/memoApi";

// APIモックの作成
vi.mock("../api/memoApi", () => ({
  getMemos: vi.fn(),
  createMemo: vi.fn(),
  updateMemo: vi.fn(),
  deleteMemo: vi.fn(),
}));

describe("useMemos", () => {
  // テスト用のモックデータ
  const mockMemos = [
    {
      id: 1,
      content: "メモ1",
      status: "メモっとくね",
      creator: "夫",
      completed: false,
      created_at: "2025-03-19T00:00:00.000Z",
      updated_at: "2025-03-19T00:00:00.000Z",
    },
    {
      id: 2,
      content: "メモ2",
      status: "メモっとくね",
      creator: "妻",
      completed: false,
      created_at: "2025-03-19T00:00:00.000Z",
      updated_at: "2025-03-19T00:00:00.000Z",
    },
    {
      id: 3,
      content: "メモ3",
      status: "ちゃんとやった？",
      creator: "夫",
      completed: true,
      created_at: "2025-03-19T00:00:00.000Z",
      updated_at: "2025-03-19T00:00:00.000Z",
    },
  ];

  beforeEach(() => {
    // 各テスト前にモックをリセット
    vi.resetAllMocks();

    // デフォルトのモック実装を設定
    vi.mocked(memoApi.getMemos).mockResolvedValue(mockMemos);
    vi.mocked(memoApi.createMemo).mockImplementation(async (memo) => ({
      ...memo,
      id: 4,
      created_at: "2025-03-19T00:00:00.000Z",
      updated_at: "2025-03-19T00:00:00.000Z",
    }));
    vi.mocked(memoApi.updateMemo).mockImplementation(async (id, memo) => ({
      ...memo,
      id,
      updated_at: "2025-03-19T01:00:00.000Z",
    }));
    vi.mocked(memoApi.deleteMemo).mockResolvedValue(undefined);
  });

  it("初期状態でメモ一覧を取得する", async () => {
    const { result } = renderHook(() => useMemos());

    // 初期状態ではローディング中
    expect(result.current.loading).toBe(true);

    // APIが呼び出されるのを待つ
    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // メモ一覧が取得できていることを確認
    expect(result.current.memos).toHaveLength(3);
    expect(result.current.memos[0].content).toBe("メモ1");
    expect(memoApi.getMemos).toHaveBeenCalledTimes(1);
  });

  it("addMemo: 新しいメモを追加する", async () => {
    const { result } = renderHook(() => useMemos());

    // ローディング完了を待つ
    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // 新しいメモを追加
    await act(async () => {
      await result.current.addMemo("新しいメモ", "妻");
    });

    // メモが追加されていることを確認
    expect(result.current.memos).toHaveLength(4);
    expect(result.current.memos[3].content).toBe("新しいメモ");
    expect(result.current.memos[3].creator).toBe("妻");
    expect(result.current.memos[3].completed).toBe(false);
    expect(result.current.memos[3].status).toBe("メモっとくね");
    expect(memoApi.createMemo).toHaveBeenCalledTimes(1);
  });

  it("updateMemoItem: 既存のメモを更新する", async () => {
    const { result } = renderHook(() => useMemos());

    // ローディング完了を待つ
    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // メモを更新
    await act(async () => {
      await result.current.updateMemoItem(1, { content: "更新されたメモ" });
    });

    // メモが更新されていることを確認
    expect(result.current.memos[0].content).toBe("更新されたメモ");
    expect(memoApi.updateMemo).toHaveBeenCalledTimes(1);
  });

  it("deleteMemoItem: 既存のメモを削除する", async () => {
    const { result } = renderHook(() => useMemos());

    // ローディング完了を待つ
    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // メモを削除
    await act(async () => {
      await result.current.deleteMemoItem(2);
    });

    // メモが削除されていることを確認
    expect(result.current.memos).toHaveLength(2);
    expect(result.current.memos.find((memo) => memo.id === 2)).toBeUndefined();
    expect(memoApi.deleteMemo).toHaveBeenCalledTimes(1);
    expect(memoApi.deleteMemo).toHaveBeenCalledWith(2);
  });

  it("toggleMemoCompletion: メモの完了状態を切り替える", async () => {
    const { result } = renderHook(() => useMemos());

    // ローディング完了を待つ
    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // メモ1の完了状態を切り替え（falseからtrueへ）
    await act(async () => {
      await result.current.toggleMemoCompletion(1);
    });

    // 完了状態とステータスが変更されていることを確認
    expect(result.current.memos[0].completed).toBe(true);
    expect(result.current.memos[0].status).toBe("ちゃんとやった？");
    expect(memoApi.updateMemo).toHaveBeenCalledTimes(1);

    // メモ3の完了状態を切り替え（trueからfalseへ）
    await act(async () => {
      await result.current.toggleMemoCompletion(3);
    });

    // 完了状態とステータスが変更されていることを確認
    expect(result.current.memos[2].completed).toBe(false);
    expect(result.current.memos[2].status).toBe("メモっとくね");
    expect(memoApi.updateMemo).toHaveBeenCalledTimes(2);
  });
});
