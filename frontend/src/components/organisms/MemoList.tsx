// src/components/organisms/MemoList.tsx
import React from "react";
import styled from "styled-components";
import { MemoItem } from "../molecules/MemoItem";
import { Text } from "../atoms/Text";
import { Memo } from "../../types";

interface MemoListProps {
  memos: Memo[];
  onToggleMemo: (id: number) => void;
  onDeleteMemo: (id: number) => void;
  onEditMemo?: (id: number, memoData: Partial<Memo>) => void;
}

const StyledMemoList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #333;
`;

export const MemoList: React.FC<MemoListProps> = ({
  memos,
  onToggleMemo,
  onDeleteMemo,
  onEditMemo,
}) => {
  if (memos.length === 0) {
    return (
      <EmptyState>
        <Text variant="h4" align="center">
          今日は大丈夫？
        </Text>
        <Text variant="p" align="center">
          メモが何もありません。新しいメモを作成しましょう！
        </Text>
      </EmptyState>
    );
  }

  return (
    <StyledMemoList>
      {memos.map((memo) => (
        <MemoItem
          key={memo.id}
          memo={memo}
          onToggle={onToggleMemo}
          onDelete={onDeleteMemo}
          onEdit={onEditMemo}
        />
      ))}
    </StyledMemoList>
  );
};
