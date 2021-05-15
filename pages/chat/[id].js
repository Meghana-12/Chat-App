import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import { db } from "../../firebase";

const Chat = ({ chat, messages }) => {
	return (
		<Container>
			<Head>
				<title>Chat</title>
			</Head>
			<Sidebar />

			<ChatContainer>
				<Header> This is a header</Header>
				This is chat container
			</ChatContainer>
		</Container>
	);
};

export default Chat;

// before the user sees the page , few props are fetched from the server
// context helps you access things like params of url, rooturl
// all happens server side
export async function getServerSideProps(context) {
	const ref = db.collection("chats").doc(context.query.id);
	console.log("ref", ref);
	// preping messages on the server
	const messagesRes = await ref
		.collection("messages")
		.orderBy("timestamp", "asc")
		.get();
	// console.log(messagesRes);
	const messages = messagesRes.docs
		.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		.map((messages) => ({
			...messages,
			timestamp: messages.timestamp.toDate().getTime(),
			// when you stringyfy timestamp to send from backend to frontend, we lose the timestamp datatype
			// unless we are using some firebase stuff,
		}));

	//prep the chats
	const chatResponse = await ref.get();

	const chat = {
		id: chatResponse.id,
		...chatResponse.data(),
	};
	console.log(chat, messages);
	return {
		props: {
			messages: JSON.stringify(messages),
			chat: JSON.parse(JSON.stringify(chat)),
			// chat is kinda simple so no need to stringyfy
			// https://github.com/vercel/next.js/issues/11993
		},
	};
}

const Container = styled.div`
	display: flex;
	background-color: #202529;
`;

const Header = styled.div`
	height: 4rem;
	border-bottom: 2px solid #161a1c;
	padding: 1rem;
	background-color: #292e33;
	width: 100%;
	color: whitesmoke;
	display: flex;
	align-items: center;
`;

const ChatContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const ChatScreen = styled.div``;
