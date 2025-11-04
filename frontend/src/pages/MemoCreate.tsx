// src/pages/MemoCreate.tsx
import { useNavigate } from "react-router-dom";
import { Text } from "../components/atoms";
import { Input } from "../components/atoms";
import { Button } from "../components/atoms";
import styled from "styled-components";
import { useMemoContext } from "../context/MemoContext";
import { useMemoForm } from "../hooks/useMemoForm";
import { MemoFormData } from "../schemas/memoSchema";

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

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const StyledInput = styled(Input)<{ $fullWidth?: boolean }>`
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 14px;
  margin-top: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const MemoCreate = () => {
  const navigate = useNavigate();
  const { addMemo } = useMemoContext();

  // React Hook Formの設定
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useMemoForm({
    status: "メモっとくね",
    creator: "夫", // デフォルト値
  });

  const onSubmit = async (data: MemoFormData) => {
    try {
      await addMemo(data.content, data.creator);
      reset();
      navigate("/");
    } catch (error) {
      console.error("メモの作成に失敗しました:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Container>
      <Header>
        <Text variant="h1">夫婦の共有</Text>
        <Text variant="p">新しいメモを作成します</Text>
      </Header>

      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Text variant="label">メモの内容</Text>
            <StyledInput
              $inputSize="large"
              $fullWidth
              placeholder="メモの内容を入力してください"
              {...register("content")}
              autoFocus
            />
            {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Text variant="label">作成者</Text>
            <RadioGroup>
              <RadioLabel>
                <input type="radio" value="夫" {...register("creator")} />
                <Text variant="p">夫</Text>
              </RadioLabel>
              <RadioLabel>
                <input type="radio" value="妻" {...register("creator")} />
                <Text variant="p">妻</Text>
              </RadioLabel>
            </RadioGroup>
            {errors.creator && <ErrorMessage>{errors.creator.message}</ErrorMessage>}
          </FormGroup>

          <ButtonGroup>
            <Button
              variant="primary"
              size="medium"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              メモを共有する
            </Button>
            <Button variant="secondary" size="medium" type="button" onClick={handleCancel}>
              キャンセル
            </Button>
          </ButtonGroup>
        </form>
      </FormContainer>
    </Container>
  );
};

export default MemoCreate;
