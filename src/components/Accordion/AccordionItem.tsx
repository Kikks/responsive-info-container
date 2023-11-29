import { ChangeEvent, FC, useEffect, useState } from "react";
import styled from "styled-components";
import {
	AccordionItemProps,
	IAccordionItem,
	IAccordionChild
} from "./Accordion.props";
import { Add, ArrowUp2, Menu, Trash } from "iconsax-react";
import IconButton from "../IconButton";
import trimString from "../../utils/trimString";
import AccordionChild from "./AccordionChild";

const ItemContainer = styled.div`
	width: 100%;
	margin-bottom: 1.5rem;
`;

const ItemHeader = styled.div<{ $isExpanded?: boolean }>`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${props => (props.$isExpanded ? "#004e45" : "#018374")};
	transition: all 0.3s ease-in-out;
	margin-bottom: 0.5rem;
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
		color: #fff;
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
	color: #fff;
	font-size: 1rem;
	font-weight: 600;
	margin: 0 1rem;
	outline: solid 1px #fff;
	border-radius: 0.5rem;

	&::placeholder {
		color: #ccc;
	}
`;

const AnimatedArrow2 = styled(ArrowUp2)<{ $isExpanded?: boolean }>`
	transform: ${props =>
		props.$isExpanded ? "rotate(0deg)" : "rotate(180deg)"};
	transition: all 0.3s ease-in-out;
`;

const ChildrenContainer = styled.div`
	width: 100%;
	padding: 0.5rem 0;
	padding-left: 2rem;
`;

const AccordionItem: FC<AccordionItemProps> = ({
	name,
	children,
	updateAccordionItem,
	deleteAccordionItem,
	addAccordionChild,
	addAccordionNestedChild,
	deleteAccordionChild,
	deleteAccordionNestedChild,
	updateAccordionChild,
	updateAccordionNestedChild
}) => {
	const [item, setItem] = useState<IAccordionItem>({ name: "", children: [] });
	const [isExpanded, setIsExpanded] = useState(false);
	const [isEditting, setIsEditting] = useState(true);

	const handleEditName = (e: ChangeEvent<HTMLInputElement>) => {
		setItem(prev => ({ ...prev, name: e?.target?.value || "" }));
	};

	const handleEditItem = () => {
		if (item.name.trim() === "") return;
		setIsEditting(false);
		updateAccordionItem && updateAccordionItem(item);
	};

	const handleDeleteItem = () => {
		deleteAccordionItem && deleteAccordionItem(item);
	};

	const handleAddChild = () => {
		setIsExpanded(true);
		addAccordionChild && addAccordionChild();
	};

	const handleUpdateChild = (child: IAccordionChild, index: number) => {
		updateAccordionChild && updateAccordionChild(child, index);
	};

	const handleDeleteChild = (index: number) => {
		deleteAccordionChild && deleteAccordionChild(index);
	};

	useEffect(() => {
		setItem({ name, children });
	}, [name, children]);

	return (
		<ItemContainer>
			<ItemHeader $isExpanded={isExpanded}>
				<div className='title'>
					<Menu size={24} color='#fff' variant='Bold' />
					{isEditting ? (
						<Input
							type='text'
							value={item.name}
							onChange={handleEditName}
							placeholder='Enter title'
							onBlur={handleEditItem}
							onKeyPress={e => {
								if (e.key === "Enter") {
									handleEditItem();
								}
							}}
						/>
					) : (
						<span onClick={() => setIsEditting(true)}>
							{trimString(name, 20)}
						</span>
					)}
					<IconButton onClick={() => setIsExpanded(prev => !prev)}>
						<AnimatedArrow2 size={24} color='#fff' $isExpanded={isExpanded} />
					</IconButton>
				</div>

				<div className='actions'>
					<IconButton onClick={handleAddChild}>
						<Add size={24} color='#fff' />
					</IconButton>

					<IconButton onClick={handleDeleteItem}>
						<Trash size={24} color='#fff' />
					</IconButton>
				</div>
			</ItemHeader>

			{isExpanded && (
				<ChildrenContainer>
					{item.children.map((child, index) => (
						<AccordionChild
							key={index}
							name={child.name}
							children={child.children}
							updateAccordionChild={child => handleUpdateChild(child, index)}
							deleteAccordionChild={() => handleDeleteChild(index)}
							addAccordionNestedChild={() =>
								addAccordionNestedChild && addAccordionNestedChild(index)
							}
							deleteAccordionNestedChild={nestedChildIndex =>
								deleteAccordionNestedChild &&
								deleteAccordionNestedChild(nestedChildIndex, index)
							}
							updateAccordionNestedChild={(child, nestedChildIndex) =>
								updateAccordionNestedChild &&
								updateAccordionNestedChild(child, nestedChildIndex, index)
							}
						/>
					))}
				</ChildrenContainer>
			)}
		</ItemContainer>
	);
};

export default AccordionItem;
