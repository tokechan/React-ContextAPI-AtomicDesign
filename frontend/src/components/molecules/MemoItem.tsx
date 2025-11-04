// src/components/molecules/MemoItem.tsx
import React from "react";
import styled from "styled-components";
import { Checkbox } from "../atoms/Checkbox";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { Memo } from "../../types";

export interface MemoItemProps {
  memo: Memo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit?: (id: number, memoData: Partial<Memo>) => void;
}

const StyledMemoItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  margin-bottom: 12px;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const MemoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const MemoCreator = styled(Text)`
  font-weight: bold;
  color: #f39c12;
`;

const MemoStatus = styled(Text)<{ $completed: boolean }>`
  color: ${(props) => (props.$completed ? "#27ae60" : "#f39c12")};
  font-style: italic;
`;

const MemoContent = styled.div`
  flex: 1;
  margin: 8px 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const MemoText = styled(Text)<{ $completed: boolean }>`
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
  color: ${(props) => (props.$completed ? "#718096" : "#333")};
`;

const MemoFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const DeleteButton = styled(Button)`
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const EditButton = styled(Button)`
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const DateInfo = styled(Text)`
  font-size: 0.8rem;
  color: #718096;
`;

export const MemoItem: React.FC<MemoItemProps> = ({ memo, onToggle, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const { id, content, status, creator, completed, updated_at } = memo;

  const formattedDate = updated_at
    ? new Date(updated_at).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const handleToggle = () => {
    if (id) onToggle(id);
  };

  const handleDelete = () => {
    if (id) onDelete(id);
  };

  const handleEdit = () => {
    if (id) navigate(`/memo/${id}/edit`);
  };

  const handleTextClick = () => {
    if (id) navigate(`/memo/${id}`);
  };

  return (
    <StyledMemoItem>
      <MemoHeader>
        <MemoCreator variant="p">{creator}</MemoCreator>
        <MemoStatus variant="p" $completed={completed}>
          {completed ? "ちゃんとやった！" : status}
        </MemoStatus>
      </MemoHeader>

      <MemoContent onClick={handleTextClick}>
        <MemoText variant="p" $completed={completed}>
          {content}
        </MemoText>
      </MemoContent>

      <MemoFooter>
        <Checkbox
          checked={completed}
          onChange={handleToggle}
          aria-label={`Mark "${content}" as ${completed ? "incomplete" : "complete"}`}
        />

        <DateInfo variant="span">{formattedDate}</DateInfo>

        <ButtonsContainer>
          {onEdit && (
            <EditButton
              variant="secondary"
              size="small"
              onClick={handleEdit}
              aria-label={`Edit "${content}"`}
            >
              編集
            </EditButton>
          )}
          <DeleteButton
            variant="danger"
            size="small"
            onClick={handleDelete}
            aria-label={`Delete "${content}"`}
          >
            削除
          </DeleteButton>
        </ButtonsContainer>
      </MemoFooter>
    </StyledMemoItem>
  );
};
