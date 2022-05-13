import style from 'styled-components';

interface ErrorResponseProps {
  errorMessage: string;
}

const ErrorResponse = ({ errorMessage }: ErrorResponseProps) => {
  return (
    <ErrorResponseContainer>
      <ErrorResponseText>데이터 요청에 실패 하였습니다.</ErrorResponseText>
      <ErrorResponseSubText>에러 내용 : {errorMessage}</ErrorResponseSubText>
    </ErrorResponseContainer>
  );
};

const ErrorResponseContainer = style.div`
  width: 100%;
  height: calc(100vh - 305px);
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const ErrorResponseText = style.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #333333;
`;

const ErrorResponseSubText = style.h3`
  font-size: 1.313rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);

`;

export default ErrorResponse;
