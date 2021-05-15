import styled from "styled-components";

export const Message = ({ key, message, user }) => {
	return (
		<Container>
			<div>{message}</div>
		</Container>
	);
};

const Container = styled.div`
	background-color: #793d2b;
	max-width: 50%;
	height: 3rem;
	margin: 0.5rem 1rem;
	border-radius: 0.5rem;
`;
