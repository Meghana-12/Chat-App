import Head from "next/head";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { Message } from "@material-ui/icons";
import { colors } from "../utils/colors";
import GithubRibbon from "react-github-ribbon";

const Login = () => {
	const handleSignIn = () => {
		auth.signInWithPopup(provider).catch(alert);
	};
	return (
		<Container>
			<Head>
				<title>Login Page</title>
			</Head>
			<GithubRibbon
				user="meghana-12"
				repo="Whatsapp-clone"
				fill="whitesmoke"
				color="black"
			/>
			<LoginContainer>
				<IconContainer>
					<Message
						fontSize="large"
						style={{ color: colors.yellow }}
						size="large"
					/>
				</IconContainer>
				<Button
					onClick={handleSignIn}
					variant="outlined"
					style={{ color: "whitesmoke" }}>
					Sign in with Google
				</Button>
			</LoginContainer>
		</Container>
	);
};
export default Login;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: #292e33;
`;
const LoginContainer = styled.div`
	height: 13rem;
	width: 30rem;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	background-color: #292e33;
	color: whitesmoke;
`;
const IconContainer = styled.div`
	border: 4px solid ${colors.darkRed};
	border-radius: 100%;
	padding: 1.5rem;
`;
