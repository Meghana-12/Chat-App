import styled from "styled-components";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { Message } from "./Message";
import { Avatar, IconButton } from "@material-ui/core";
import {
	AttachFile,
	InsertEmoticon,
	MoreVert,
	Search,
} from "@material-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import { colors } from "../utils/colors";

export const ChatScreen = ({ chat, messages }) => {
	const [user] = useAuthState(auth);
	const router = useRouter();
	const [messagesSnap] = useCollection(
		db
			.collection("chats")
			.doc(router.query.id)
			.collection("messages")
			.orderBy("timestamp", "asc")
	);
	const showMessages = () => {
		if (messagesSnap) {
			return messagesSnap.docs.map((message) => (
				<Message
					key={message.id}
					user={message.data().user}
					message={{
						...message.data(),
						timestamp: message.data().timestamp?.toDate().getTime(),
					}}
				/>
			));
		}
	};
	return (
		<Container>
			<Header>
				<UserProfile>
					<Avatar />
					<UserInfo>
						<h4 style={{ margin: 0 }}>Meghana</h4>
						<h6 style={{ margin: 0, color: "#CCC5C4" }}>seen 2 mins ago</h6>
					</UserInfo>
				</UserProfile>
				<IconsContainer>
					<IconButton>
						<Search style={{ color: "whitesmoke" }} size="large" />
					</IconButton>
					<IconButton>
						<MoreVert style={{ color: "whitesmoke" }} size="large" />
					</IconButton>
				</IconsContainer>
			</Header>
			<MessageContainer>
				{showMessages()}
				<Message />
				<Message />
				<Message />
				<EndOfMessage />
			</MessageContainer>
			<InputContainer>
				<IconButton>
					<InsertEmoticon style={{ color: "whitesmoke" }} size="large" />
				</IconButton>
				<IconButton>
					<AttachFile style={{ color: "whitesmoke" }} size="large" />
				</IconButton>
				<StyledInput />
			</InputContainer>
		</Container>
	);
};
const Container = styled.div`
	height: 100%;
	flex: 1;
	flex-grow: 1;
	overflow: hidden;
`;
const Header = styled.div`
	height: 4rem;
	border-bottom: 2px solid #161a1c;
	background-color: #292e33;
	width: 100%;
	color: whitesmoke;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2rem 1rem 2rem 2rem;
	z-index: 100;
	position: sticky;
	top: 0;
`;

const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	height: 3rem;
	padding-left: 1rem;
`;

const UserProfile = styled.div`
	display: flex;
	align-items: center;
`;
const IconsContainer = styled.div``;

const EndOfMessage = styled.div``;
const MessageContainer = styled.div`
	min-height: 100%;
`;
const InputContainer = styled.form`
	display: flex;
	align-items: center;
	height: 5rem;
	background-color: ${colors.midGray};
	position: sticky;
	bottom: 0px;
	width: 100%;
	padding: 1rem;

	z-index: 100;
`;
const StyledInput = styled.input`
	background-color: ${colors.lightGray};
	height: 3rem;
	border-radius: 3rem;
	outline: none;
	border: none;
	flex-grow: 1;
	flex: 1;
	padding: 0 1rem;
	font-size: 1.3rem;
`;
