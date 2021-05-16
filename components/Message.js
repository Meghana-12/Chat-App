import styled from "styled-components";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { colors } from "../utils/colors";
import moment from "moment";

export const Message = ({ key, message, user }) => {
  const [userLoggedIn] = useAuthState(auth);
  console.log("user:", userLoggedIn);
  return (
    <Container>
      <StyledMessage borderStyle={user === userLoggedIn.email ? "user" : ""}>
        {message?.message}
        <p>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </p>
      </StyledMessage>
    </Container>
  );
};

const Container = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledMessage = styled.div`
  background-color: ${(props) =>
    props.borderStyle === "user" ? colors.darkRed : colors.lightGray};
  max-width: 50%;
  margin: 0.5rem 1rem;
  border-radius: ${(props) =>
    props.borderStyle === "user"
      ? " 0.5rem 0.5rem 0 0.5rem"
      : "0 0.5rem 0.5rem 0.5rem"};
  align-self: ${(props) =>
    props.borderStyle === "user" ? "flex-end" : "flex-start"};
  padding: 1rem 0.5rem 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  > p {
    font-size: 0.6rem;
    margin: 0.1rem 0.5rem;
    align-self: "flex-end";
  }
`;
