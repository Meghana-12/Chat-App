import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function Sidebar() {
	const [user] = useAuthState(auth);
	console.log("user", user);
	const userChats = db
		.collection("chats")
		.where("users", "array-contains", user.email);
	const [chatsSnap] = useCollection(userChats);
	console.log("hey:", chatsSnap, userChats);
	const createChat = () => {
		const input = prompt("Please enter the email address");
		if (!input) return null;
		if (
			EmailValidator.validate(input) &&
			input !== user.email &&
			!duplicateCheck(input)
		) {
			// console.log("works!");
			db.collection("chats").add({ users: [user.email, input] });
		}
	};
	const duplicateCheck = (recipient) => {
		!!chatsSnap?.docs.find((chat) => {
			chat.data().users.find((user) => user === recipient)?.length > 0;
			// go through the chats that exist
			// either return val or null /undefined
			// !! : if value is truthy returns true
			// if falsey / emoty string / undefied : returns false
		});
	};

	return (
		<Container>
			<Header>
				<UserAvatar src={user?.photoURL} />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<h3>{user.displayName}</h3>
					{user.email}
				</div>
				<IconsContainer>
					<IconButton>
						<ChatIcon
							size="large"
							style={{ color: "#eaae06" }}
							onClick={createChat}
						/>
					</IconButton>
					<IconButton>
						<ExitToAppIcon
							color="secondary"
							size="large"
							onClick={() => auth.signOut()}
						/>
					</IconButton>
				</IconsContainer>

				<Search>
					<SearchIcon />
					<SearchInput />
					{/* add search button and on click gives searchbar (a lil animation) */}
				</Search>
			</Header>
			{/* <StartButton onClick={createChat}>+ New Chat</StartButton> */}
			{/* Chats go below */}
			{chatsSnap?.docs.map((chat) => (
				<Chat key={chat.id} id={chat.id} users={chat.data().users} />
			))}
			{/* add delete , pin */}
		</Container>
	);
}

export default Sidebar;

const Container = styled.div`
	width: 25rem;
	border-right: 1px solid #7a7c7e;
	height: 100vh;
	background-color: #202529;
`;
const Header = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-bottom: 1px solid #7a7c7e;
	padding: 1rem;
	background-color: #39393d;
	color: #ccc5c4;
`;
const UserAvatar = styled(Avatar)`
	cursor: pointer;
	height: 8rem;
	width: 8rem;
	:hover {
		opacity: 0.8;
	}
`;
const IconsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Search = styled.div`
	display: flex;
	align-items: center;
	padding: 0.5rem;
	background-color: #3f454d;
	border-radius: 2rem;
`;
const SearchInput = styled.input`
	outline-width: 0;
	border: none;
	flex: 1;
	background-color: transparent;
	width: 12rem;
	color: whitesmoke;
`;

const StartButton = styled(Button)`
	width: 100%;
	&&& {
		/* border-top: 1px solid gray; */
		/* border-bottom: 1px solid gray; */
		color: #eaae06;
		/* background-color: #eaae06; */
		border-radius: 0;
	}
`;
/* &&& increases priority */
