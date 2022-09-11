import { useEffect, useRef, useState } from "react";

function App() {
	const [left, setLeft] = useState(1000);
	const [used, setUsed] = useState(0);
	const barRef = useRef(0);
	const inputRef = useRef(null);

	const changeHandler = (e) => {
		e.preventDefault();
		const input = e.target.children[0].value;
		const value = Number(input) || 0;
		calculation(value);
	};
	const calculation = (val) => {
		setUsed((prev) => (prev += val));
		setLeft((prev) => (prev -= val));
		if (used >= 1000 && left <= 0) {
			setUsed(1000);
			setLeft(0);
		}
	};

	const reset = () => {
		inputRef.current.value = "";
		setUsed(0);
		setLeft(1000);
	};
	useEffect(() => {
		barRef.current.style.width = `${(used / 1000) * 100}%`;
	}, [used]);

	return (
		<div className="App">
			<div className="storage">
				<form action="" onSubmit={(e) => changeHandler(e)}>
					<input type="text" id="amount" ref={inputRef} />
					<div className="buttons">
						<button type="submit">Go!</button>
						<button type="submit" onClick={() => reset()}>
							reset
						</button>
					</div>
				</form>
				<div className="container">
					<div className="left">
						<div className="images">
							<img src="./images/logo.svg" alt="" />
						</div>
						<div className="icons">
							<img src="./images/icon-document.svg" alt="" />
							<img src="./images/icon-folder.svg" alt="" />
							<img src="./images/icon-upload.svg" alt="" />
						</div>
					</div>
					<div className="right">
						<p>
							You’ve used <span> {used} GB </span> of your storage
						</p>
						<div className="slider-wrapper" data-value={`${left} GB`}>
							<div className="slider">
								<span className="bar" ref={barRef}></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
