import { useEffect, useRef, useState } from "react";
import styles from "./Select.module.css";
type SelectOptionsProps = {
	label: string;
	value: number | string;
};

type MultielectProps = {
	multiple: true;
	value: SelectOptionsProps[];
	//onChange is function which has arg value which can be undefined
	onChange: (value: SelectOptionsProps[]) => void;
};
type SingleSelectProps = {
	multiple?: false;
	//? might be undefined or has type SelectOptionsType
	// same as value: SelectOptionsProps | undefined
	value?: SelectOptionsProps;
	//onChange is function which has arg value which can be undefined
	onChange: (value: SelectOptionsProps | undefined) => void;
};
type SelectProps = {
	options: SelectOptionsProps[];
} & (SingleSelectProps | MultielectProps); //if multiple is false/null then single else use multi

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(0);

	const containerRef = useRef<HTMLDivElement>(null);
	const optionsContainerRef = useRef<HTMLUListElement>(null);

	//whenever the list opens the top item should be highlighted
	useEffect(() => {
		if (isOpen) setHighlightedIndex(0);
	}, [isOpen]);

	useEffect(
		() => {
			const handler = (e: KeyboardEvent) => {
				//triggers when keyboard event is done on select box
				if (e.target != containerRef.current) return;
				switch (e.code) {
					//triggers only with enter and space btn
					case "Enter":
					case "Space":
						setIsOpen((prev) => !prev);
						if (isOpen) {
							//when open select option thats highlighted
							selectOption(options[highlightedIndex]);
						}
						break;
					case "ArrowUp":
					case "ArrowDown": {
						if (!isOpen) {
							setIsOpen(true);
							break;
						}
						//moves the highlightedIndex with arrowkey
						let newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
						//if arrow goes above or below given list
						if (newValue < 0) {
							newValue = options.length - 1;
							//scrolls to bottom of list
							optionsContainerRef.current?.scrollTo(0, options.length * 32);
						} else if (newValue === options.length) {
							newValue = 0;
							//scrolls to top of list
							optionsContainerRef.current?.scrollTo(0, 0);
						}
						if (e.code === "ArrowDown" && newValue > 4) {
							//scrolls on arrowdown event
							optionsContainerRef.current?.scrollBy(0, 32);
						} else if (e.code === "ArrowUp" && newValue < options.length - 5) {
							//scrolls on arrowup event
							optionsContainerRef.current?.scrollBy(0, -32);
						}
						setHighlightedIndex(newValue);
						break;
					}
					case "Escape":
						setIsOpen(false);
						break;
				}
			};
			containerRef.current?.addEventListener("keydown", handler);
			return () => {
				containerRef.current?.removeEventListener("keydown", handler);
			};
		},
		//runs when isopen,hightlighted and options gets changed
		[isOpen, highlightedIndex, options]
	);

	function isOptionSelected(option: SelectOptionsProps) {
		//highlights on all the option selected in multiselct
		return multiple ? value.includes(option) : option === value;
	}

	function clearOptions() {
		//when multiple is true
		multiple
			? onChange([])
			: onChange({
					label: "Select Option",
					value: "",
			  });
	}

	function selectOption(option: SelectOptionsProps) {
		if (multiple) {
			//for multiple
			//if input already includes the option then its removed
			if (value.includes(option)) {
				onChange(value.filter((o) => o !== option));
			} else {
				onChange([...value, option]);
			}
		}
		//for single
		else if (option !== value) onChange(option);
	}

	return (
		<>
			{/* using css modules by creating seperate css files
		accessing css modules by importing it as styles */}
			{/* tabindex means the element can be focus on clicking via mouse or tab button starts from 0 order*/}
			<div
				//useRef for adding keydown event to it
				ref={containerRef}
				//onclick on any place will trigger it
				onBlur={() => setIsOpen(false)}
				//calling  previous value and changing it
				onClick={() => setIsOpen((prevValue) => !prevValue)}
				tabIndex={0}
				className={styles.container}
			>
				<span className={styles.value}>
					{multiple
						? value.map((v) => (
								<button
									key={v.value}
									onClick={(e) => {
										e.stopPropagation();
										// removes the selected option
										selectOption(v);
									}}
									className={styles["option-badge"]}
								>
									{v?.label}
									<span className={styles["remove-btn"]}>&times;</span>
								</button>
						  ))
						: value?.label}
				</span>
				{/* as using css modules styles.clr-btn is not accepted so using quotes */}

				{/* //the value of onChange passed in props is changed */}
				{/* e.stopPropagation stops any event present in parent element to trigger here its Onclick present in container */}
				<button
					onClick={(e) => {
						e.stopPropagation();
						clearOptions();
					}}
					className={styles["clear-btn"]}
				>
					&times;
				</button>

				<div className={styles.divider}></div>
				<div className={styles.caret}></div>
				<ul
					className={`${styles.options} ${isOpen ? styles.show : ""}`}
					ref={optionsContainerRef}
				>
					{options.map((option, index) => (
						//circular bracket automatically returns without specifying it
						<li
							onClick={(e) => {
								e.stopPropagation();
								setIsOpen(false);
								//changes the value in the input box
								selectOption(option);
							}}
							key={option.label}
							className={`${styles.option} 
							//when the option is already selected
							${isOptionSelected(option) ? styles.selected : ""}
							 //when the current li gets highlighted
							 ${index === highlightedIndex ? styles.highlighted : ""}`}
							//when the mouse hovers over that list
							onMouseEnter={() => setHighlightedIndex(index)}
						>
							{option.label}
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default Select;
