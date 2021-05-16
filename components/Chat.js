import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { auth, db } from "../firebase";
import { getRecipientEmail } from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

export const Chat = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(user, users);
  const [recipientSnap] = useCollection(
    db.collection("users").where("email", "==", recipientEmail)
  );
  const recipient = recipientSnap?.docs?.[0]?.data();

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };
  // console.log(user, users, recipientEmail);
  return (
    <Container onClick={enterChat}>
      <UserDetails>
        {recipient ? <UserAvatar src={recipient?.photoURL} /> : <UserAvatar />}

        <div>{recipientEmail}</div>
      </UserDetails>
      <DeleteForeverIcon color="secondary" />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  color: whitesmoke;
  border-bottom: 1px solid #39393d;
  cursor: pointer;
  :hover {
    background-color: #39393d;
  }
`;
const UserAvatar = styled(Avatar)`
  height: 2.5rem;
  width: 2.5rem;
  margin-right: 1rem;
`;
const UserDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
