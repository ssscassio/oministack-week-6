import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  form {
    width: 300px;
    display: flex;
    flex-direction: column;
    input {
      height: 48px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
      padding: 0 20px;
      margin-top: 30px;
    }
  }
`;

export const SubmitButton = styled.button`
  height: 48px;
  background: ${props => props.color || '#7159c1'};
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  font-size: 16px;
  padding: 0 20px;
  margin-top: 10px;
  border: 0;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
