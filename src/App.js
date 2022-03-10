import Main from "./layout/Main";
import CustomNav from "./layout/CustomNav";
import Box from "@mui/material/Box";

function App() {
	return (
		<div className="App">
			<CustomNav />
			<Box sx={{p: 5}}>
				<Main />
			</Box>
		</div>
	);
}

export default App;
