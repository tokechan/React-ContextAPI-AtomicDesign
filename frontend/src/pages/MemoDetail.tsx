import { useNavigate, useParams } from "react-router-dom";
import { Text } from "../components/atoms";
import { Button } from "../components/atoms";
import styled from "styled-components";
import { useMemoContext } from "../context/MemoContext";
import { useEffect, useState } from "react";
import { Memo } from "../types";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const Header = styled.div`
  margin-bottom: 32px;
  text-align: center;
  padding: 24px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
`;

const DetailContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`;

const DetailItem = styled.div`
  margin-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 16px;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const Label = styled(Text)`
  font-weight: bold;
  margin-bottom: 8px;
  color: #f39c12;
`;

const Content = styled(Text)`
  font-size: 18px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const StatusBadge = styled.span<{ $completed: boolean }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: bold;
  background-color: ${(props) => (props.$completed ? "#4caf50" : "#f39c12")};
  color: white;
  margin-left: 8px;
`;

const CreatorBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: bold;
  background-color: #3498db;
  color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
`;

// 標準のDateオブジェクトを使用した日付フォーマット関数
const formatDate = (dateString: string | undefined) => {
  try {
    if (!dateString) return "日付不明";

    const date = new Date(dateString);

    // 年、月、日、時、分を取得
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // 日本語形式でフォーマット
    return `${year}年${month}月${day}日 ${hours}:${minutes}`;
  } catch {
    return "日付不明";
  }
};

const MemoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { memos, deleteMemoItem } = useMemoContext();
  const [loading, setLoading] = useState(true);
  const [memo, setMemo] = useState<Memo | null>(null);

  // メモデータの取得
  useEffect(() => {
    if (id && memos.length > 0) {
      const foundMemo = memos.find((m) => m.id === Number(id));
      if (foundMemo) {
        setMemo(foundMemo);
      }
      setLoading(false);
    }
  }, [id, memos]);

  const handleEdit = () => {
    if (id) {
      navigate(`/memo/${id}/edit`);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm("このメモを削除してもよろしいですか？")) return;

    try {
      await deleteMemoItem(Number(id));
      navigate("/");
    } catch (error) {
      console.error("メモの削除に失敗しました:", error);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <Container>
        <Text variant="h4" align="center">
          読み込み中...
        </Text>
      </Container>
    );
  }

  if (!memo) {
    return (
      <Container>
        <Text variant="h4" align="center">
          メモが見つかりませんでした
        </Text>
        <Button variant="primary" size="medium" onClick={handleBack}>
          ホームに戻る
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Text variant="h1">夫婦の共有</Text>
        <Text variant="p">メモの詳細</Text>
      </Header>

      <DetailContainer>
        <DetailItem>
          <Label variant="label">メモの内容</Label>
          <Content variant="p">{memo.content}</Content>
        </DetailItem>

        <DetailItem>
          <Label variant="label">ステータス</Label>
          <Content variant="p">
            {memo.status}
            <StatusBadge $completed={memo.completed}>
              {memo.completed ? "ちゃんとやった" : "メモっとくね"}
            </StatusBadge>
          </Content>
        </DetailItem>

        <DetailItem>
          <Label variant="label">作成者</Label>
          <Content variant="p">
            <CreatorBadge>{memo.creator}</CreatorBadge>
          </Content>
        </DetailItem>

        <DetailItem>
          <Label variant="label">作成日時</Label>
          <Content variant="p">{formatDate(memo.created_at)}</Content>
        </DetailItem>

        <DetailItem>
          <Label variant="label">更新日時</Label>
          <Content variant="p">{formatDate(memo.updated_at)}</Content>
        </DetailItem>

        <ButtonGroup>
          <Button variant="primary" size="medium" onClick={handleEdit}>
            編集する
          </Button>
          <Button variant="danger" size="medium" onClick={handleDelete}>
            削除する
          </Button>
          <Button variant="secondary" size="medium" onClick={handleBack}>
            戻る
          </Button>
        </ButtonGroup>
      </DetailContainer>
    </Container>
  );
};

export default MemoDetail;
