import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";

export default function Home() {
	return (
		<Container>
			<Head>
				<title>Whats app clone 🚀 </title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Sidebar />
		</Container>
	);
}

const Container = styled.div`
	background-color: #202529;
`;
