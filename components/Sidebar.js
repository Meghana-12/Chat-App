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
				<UserAvatar />
				<IconsContainer>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<ExitToAppIcon color="secondary" onClick={() => auth.signOut()} />
					</IconButton>
				</IconsContainer>
			</Header>
			<Search>
				<SearchIcon />
				<SearchInput />
				{/* add search button and on click gives searchbar (a lil animation) */}
			</Search>
			<StartButton onClick={createChat}>+ New Chat</StartButton>
			{/* Chats go below */}
			{chatsSnap?.docs.map((chat) => (
				<Chat key={chat.id} id={chat.id} user={chat.data().users} />
			))}
			{/* add delete , pin */}
		</Container>
	);
}

export default Sidebar;

const Container = styled.div`
	width: 25rem;
	border-right: 2px solid whitesmoke;
	height: 100vh;
`;
const Header = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid whitesmoke;
	padding: 8px;
`;
const UserAvatar = styled(Avatar)`
	cursor: pointer;
	:hover {
		opacity: 0.8;
	}
`;
const IconsContainer = styled.div``;
const Search = styled.div`
	display: flex;
	align-items: center;
	padding: 0.5rem;
`;
const SearchInput = styled.input`
	outline-width: 0;
	border: none;
	flex: 1;
`;

const StartButton = styled(Button)`
	width: 100%;
	&&& {
		border-top: 1px solid gray;
		border-bottom: 1px solid gray;
		color: #ffffff;
		background-color: #3cbc28;
	}
`;
/* &&& increases priority */
