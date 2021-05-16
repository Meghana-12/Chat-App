import styled from "styled-components";

export const Message = ({ key, message, user }) => {
  return (
    <Container borderStyle="user">
      <div>{message?.message}</div>
    </Container>
  );
};

const Container = styled.div`
  background-color: #793d2b;
  max-width: 50%;
  height: 3rem;
  margin: 0.5rem 1rem;
  border-radius: ${(props) =>
    props.borderStyle === "user"
      ? "0 0.5rem 0.5rem 0.5rem"
      : " 0.5rem 0.5rem 0 0.5rem"};
  display: flex;
  align-items: center;
  padding: 1rem;
`;
