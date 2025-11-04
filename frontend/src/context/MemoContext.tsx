import { createContext, ReactNode, useContext } from "react";
import { useMemos } from "../hooks/useMemos";
import { Memo } from "../types";

// Contextの型
type MemoContextType = {
  memos: Memo[];
  loading: boolean;
  error: string | null;
  fetchMemos: () => Promise<void>;
  addMemo: (content: string, creator: string) => Promise<Memo>;
  updateMemoItem: (id: number, memoData: Partial<Memo>) => Promise<Memo>;
  deleteMemoItem: (id: number) => Promise<void>;
  toggleMemoCompletion: (id: number) => Promise<Memo>;
};

// default value
const MemoContext = createContext<MemoContextType>({
  memos: [],
  loading: false,
  error: null,
  fetchMemos: async () => {},
  addMemo: async () => ({ content: "", status: "", creator: "", completed: false }),
  updateMemoItem: async () => ({ content: "", status: "", creator: "", completed: false }),
  deleteMemoItem: async () => {},
  toggleMemoCompletion: async () => ({ content: "", status: "", creator: "", completed: false }),
});

type MemoProviderProps = {
  children: ReactNode;
};

// Provider コンポーネント
export const MemoProvider = ({ children }: MemoProviderProps) => {
  // useMemos フックを使用してメモ関連のロジックを取得
  const {
    memos,
    loading,
    error,
    fetchMemos,
    addMemo,
    updateMemoItem,
    deleteMemoItem,
    toggleMemoCompletion,
  } = useMemos();

  return (
    <MemoContext.Provider
      value={{
        memos,
        loading,
        error,
        fetchMemos,
        addMemo,
        updateMemoItem,
        deleteMemoItem,
        toggleMemoCompletion,
      }}
    >
      {children}
    </MemoContext.Provider>
  );
};

// Contextを簡単に使うためのcustomhook
// eslint-disable-next-line react-refresh/only-export-components
export const useMemoContext = () => {
  const context = useContext(MemoContext);
  if (context === undefined) {
    throw new Error("useMemoContext must be used within a MemoProvider");
  }
  return context;
};
