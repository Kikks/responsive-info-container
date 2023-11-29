import { Add, ArrowUp2, Menu, Trash } from "iconsax-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import styled from "styled-components";
import { AccordionChildProps, IAccordionChild } from "./Accordion.props";
import trimString from "../../utils/trimString";
import IconButton from "../IconButton";
import AccordionNestedChild from "./AccordionNestedChild";

const ChildContainer = styled.div`
	width: 100%;
	margin-bottom: 0.5rem;
`;

const ChildHeader = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	border-style: solid;
	border-width: 2px;
	border-color: #018374;
	transition: all 0.3s ease-in-out;
	margin-bottom: 0.25rem;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;

	.title {
		display: flex;
		align-items: center;
		justify-content: start;
	}

	.actions {
		display: flex;
		align-items: center;
	}

	span {
		margin: 0 1rem;
		font-size: 1rem;
		color: #018374;
		font-weight: 600;
		max-width: 200px;
		cursor: pointer;
	}
`;

const Input = styled.input`
	width: 100%;
	max-width: 200px;
	height: 100%;
	padding: 0.5rem 1rem;
	border: none;
	background-color: transparent;
	color: #018374;
	font-size: 1rem;
	font-weight: 600;
	margin: 0 1rem;
	outline: solid 1px #018374;
	border-radius: 0.5rem;

	&::placeholder {
		color: #44a79b;
	}
`;

const AnimatedArrow2 = styled(ArrowUp2)<{ $isExpanded?: boolean }>`
	transform: ${props =>
		props.$isExpanded ? "rotate(0deg)" : "rotate(180deg)"};
	transition: all 0.3s ease-in-out;
`;

const NestedChildrenContainer = styled.div`
	width: 100%;
	width: 100%;
	padding: 0.5rem 0;
	padding-left: 2rem;
`;

const AccordionChild: FC<AccordionChildProps> = ({
	children,
	name,
	updateAccordionChild,
	deleteAccordionChild,
	addAccordionNestedChild,
	deleteAccordionNestedChild,
	updateAccordionNestedChild
}) => {
	const [child, setChild] = useState<IAccordionChild>({
		name: "",
		children: []
	});
	const [isExpanded, setIsExpanded] = useState(false);
	const [isEditting, setIsEditting] = useState(false);

	const handleEditName = (e: ChangeEvent<HTMLInputElement>) => {
		setChild(prev => ({ ...prev, name: e?.target?.value || "" }));
	};

	const handleEditChild = () => {
		if (child.name.trim() === "") return;
		setIsEditting(false);
		updateAccordionChild && updateAccordionChild(child);
	};

	const handleDeleteChild = () => {
		deleteAccordionChild && deleteAccordionChild(child);
	};

	const handleAddNestedChild = () => {
		if (child.name.trim() === "") return;
		if (child.children?.[child.children.length - 1]?.name === "") return;
		setIsExpanded(true);
		addAccordionNestedChild && addAccordionNestedChild();
	};

	useEffect(() => {
		setChild({ name, children });
		if (name.trim() === "") {
			setIsEditting(true);
		}
	}, [name, children]);

	return (
		<ChildContainer>
			<ChildHeader>
				<div className='title'>
					<Menu size={24} color='#018374' variant='Bold' />
					{isEditting ? (
						<Input
							type='text'
							value={child.name}
							onChange={handleEditName}
							placeholder='Enter title'
							onBlur={handleEditChild}
							onKeyPress={e => {
								if (e.key === "Enter") {
									handleEditChild();
								}
							}}
						/>
					) : (
						<span onClick={() => setIsEditting(true)}>
							{trimString(name, 20)}
						</span>
					)}
					<IconButton onClick={() => setIsExpanded(prev => !prev)}>
						<AnimatedArrow2
							size={24}
							color='#018374'
							$isExpanded={isExpanded}
						/>
					</IconButton>
				</div>

				<div className='actions'>
					<IconButton onClick={handleAddNestedChild}>
						<Add size={24} color='#018374' />
					</IconButton>

					<IconButton onClick={handleDeleteChild}>
						<Trash size={24} color='#018374' />
					</IconButton>
				</div>
			</ChildHeader>

			{isExpanded && (
				<NestedChildrenContainer>
					{child.children.map((child, index) => (
						<AccordionNestedChild
							key={index}
							name={child.name}
							deleteAccordionNestedChild={() =>
								deleteAccordionNestedChild && deleteAccordionNestedChild(index)
							}
							updateAccordionNestedChild={nestedChild =>
								updateAccordionNestedChild &&
								updateAccordionNestedChild(nestedChild, index)
							}
						/>
					))}
				</NestedChildrenContainer>
			)}
		</ChildContainer>
	);
};

export default AccordionChild;
