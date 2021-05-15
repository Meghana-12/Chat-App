import { FoldingCube } from "better-react-spinkit";

export const Loading = () => {
	return (
		<center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
			<div>
				{/* for server style rendering there is additional step to use sytled componentns so inline is simpler */}
				<FoldingCube color="#eaae06" size={60} />
			</div>
		</center>
	);
};
