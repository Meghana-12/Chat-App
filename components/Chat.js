import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

function Chat({ id, users }) {
	return (
		<Container>
			<UserDetails>
				<UserAvatar />
				<div>recipient</div>
			</UserDetails>
			<DeleteForeverIcon color="secondary" />
		</Container>
	);
}

export default Chat;

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 1rem;
	align-items: center;
`;
const UserAvatar = styled(Avatar)`
	border-radius: 1rem;
	height: 3rem;
`;
const UserDetails = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 35%;
`;
