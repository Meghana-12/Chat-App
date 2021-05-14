import Head from "next/head";
import styled from "styled-components";
import PhoneIcon from "@material-ui/icons/Phone";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

function Login() {
	const handleSignIn = () => {
		auth.signInWithPopup(provider).catch(alert);
	};
	return (
		<Container>
			<Head>
				<title>Login Page</title>
			</Head>
			<LoginContainer>
				<IconContainer>
					<PhoneIcon fontSize="large" />
				</IconContainer>
				<Button onClick={handleSignIn} variant="outlined">
					Sign in with Google
				</Button>
			</LoginContainer>
		</Container>
	);
}

export default Login;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: whitesmoke;
`;
const LoginContainer = styled.div`
	height: 13rem;
	width: 30rem;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
`;
const IconContainer = styled.div`
	border: 4px solid #3cbc28;
	border-radius: 4rem;
	padding: 8px;
`;
