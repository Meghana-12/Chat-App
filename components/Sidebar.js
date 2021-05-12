import styled from "styled-Components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
function Sidebar() {
	const createChat = () => {
		const input = prompt("Please enter the email you wanna chat with: ");
		if (!input) return null;
		if (EmailValidator.validate(input)) {
			// adding to db
		}
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
				</IconsContainer>
			</Header>
			<Search>
				<SearchIcon />
				<SearchInput />
				{/* add search button and on click gives searchbar (a lil animation) */}
			</Search>
			<StartButton>+ New Chat</StartButton>
			{/* Chats go below */}
		</Container>
	);
}

export default Sidebar;

const Container = styled.div``;
const Header = styled.div`
	position: sticky;
	top: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 3rem;
	z-index: 1;
	background-color: white;
	border-bottom: 1px solid whitesmoke;
	padding: 2rem 1rem;
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
		border-top: 1px solid whitesmoke;
		border-bottom: 1px solid whitesmoke;
	}
`;
/* &&& increases priority */
