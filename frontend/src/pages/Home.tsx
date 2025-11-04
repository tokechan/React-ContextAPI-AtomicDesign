// src/pages/Home.tsx
import styled from "styled-components";
import { Text } from "../components/atoms/Text";
import { MemoList } from "../components/organisms/MemoList";
import { useMemoContext } from "../context/MemoContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/atoms";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
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

const HeaderActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const MemoListWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

export const Home = () => {
  const {
    memos,
    loading,
    error,
    fetchMemos,
    toggleMemoCompletion,
    deleteMemoItem,
    updateMemoItem,
  } = useMemoContext();
  const navigate = useNavigate();

  // コンポーネントマウント時に一度だけメモを取得
  useEffect(() => {
    fetchMemos();
  }, [fetchMemos]);

  const handleCreateNew = () => {
    navigate("/memo/new");
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

  if (error) {
    return (
      <Container>
        <Text variant="h4" align="center">
          エラーが発生しました
        </Text>
        <Text variant="p" align="center">
          {error}
        </Text>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Text variant="h1">夫婦の共有</Text>
        <Text variant="p">いつものこと💁🏼メモっとくねー📝</Text>
        <HeaderActions>
          <Button variant="primary" size="medium" onClick={handleCreateNew}>
            共有するべし⚠️
          </Button>
        </HeaderActions>
      </Header>

      <MemoListWrapper>
        <MemoList
          memos={memos}
          onToggleMemo={toggleMemoCompletion}
          onEditMemo={updateMemoItem}
          onDeleteMemo={deleteMemoItem}
        />
      </MemoListWrapper>
    </Container>
  );
};

export default Home;
