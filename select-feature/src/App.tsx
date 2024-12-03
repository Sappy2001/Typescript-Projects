import Select from "./Select";
import "./App.css";
import { useState } from "react";

const options = [
	{ label: "First", value: 1 },
	{ label: "Second", value: 2 },
	{ label: "Third", value: 3 },
	{ label: "Fourth", value: 4 },
	{ label: "Fifth", value: 5 },
	{ label: "First", value: 1 },
	{ label: "Second", value: 2 },
	{ label: "Third", value: 3 },
	{ label: "Fourth", value: 4 },
	{ label: "Fifth", value: 5 },
	{ label: "First", value: 1 },
	{ label: "Second", value: 2 },
	{ label: "Third", value: 3 },
	{ label: "Fourth", value: 4 },
	{ label: "Fifth", value: 5 },
];
function App() {
	interface SelectOptionsProps {
		label: string;
		value: number | string;
	}

	const [value1, setValue1] = useState<SelectOptionsProps[]>([options[0]]);

	const [value2, setValue2] = useState<SelectOptionsProps | undefined>({
		label: "Select Option",
		value: "",
	});
	return (
		<>
			<Select
				multiple
				options={options}
				value={value1}
				onChange={(e) => setValue1(e)}
			/>
			<Select options={options} value={value2} onChange={(e) => setValue2(e)} />
		</>
	);
}

export default App;
