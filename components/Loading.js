import PhoneIcon from "@material-ui/icons/Phone";
import { Circle } from "better-react-spinkit";

function Loading() {
	return (
		<center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
			<div>
				{/* for server style rendering there is additional step to use sytled componentns so inline is simpler */}
				<PhoneIcon fontSize="large" />
				<Circle color="#3cbc28" size={60} />
			</div>
		</center>
	);
}

export default Loading;
