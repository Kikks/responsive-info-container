import { Add } from "iconsax-react";
import { useState } from "react";
import styled from "styled-components";
import {
	IAccordionChild,
	IAccordionItem,
	IAccordionNestedChild
} from "./Accordion.props";
import AccordionItem from "./AccordionItem";

const AccordionContainer = styled.div`
	width: 100%;
	max-width: 800px;
	margin: 0 auto;
	padding: 1rem;
	border: solid 1px #ccc;
	background-color: #f6f6f6;
	border-radius: 1rem;
`;

const EmptyContainer = styled.div`
	padding: 0.5rem 0;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const AddItemButton = styled.button`
	padding: 1rem 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;

	span {
		margin-left: 0.5rem;
		color: #018374;
	}
`;

const Accordion = () => {
	const [accordionItems, setAccordionItems] = useState<IAccordionItem[]>([]);

	const addItem = () => {
		if (accordionItems.length > 0) {
			if (accordionItems[accordionItems.length - 1].name === "") {
				return;
			}
		}
		setAccordionItems(prevState => [...prevState, { name: "", children: [] }]);
	};

	const handleUpdateItem = (item: IAccordionItem, index: number) => {
		const newAccordionItems = [...accordionItems];
		newAccordionItems[index] = item;
		setAccordionItems(newAccordionItems);
	};

	const handleDeleteItem = (index: number) => {
		const newAccordionItems = [...accordionItems];
		newAccordionItems.splice(index, 1);
		setAccordionItems(newAccordionItems);
	};

	const handleUpdateChild = (
		child: IAccordionChild,
		index: number,
		parentIndex: number
	) => {
		const newAccordionItems = [...accordionItems];
		if (!newAccordionItems?.[parentIndex]?.children) return;
		newAccordionItems[parentIndex].children[index] = child;
		setAccordionItems(newAccordionItems);
	};

	const handleDeleteChild = (index: number, parentIndex: number) => {
		const newAccordionItems = [...accordionItems];
		if (!newAccordionItems?.[parentIndex]?.children) return;
		newAccordionItems[parentIndex].children.splice(index, 1);
		setAccordionItems(newAccordionItems);
	};

	const handleAddChild = (parentIndex: number) => {
		const newAccordionItems = [...accordionItems];
		if (!newAccordionItems?.[parentIndex]?.children) return;
		newAccordionItems[parentIndex].children.push({
			name: "",
			children: []
		});
		setAccordionItems(newAccordionItems);
	};

	const handleUpdateNestedChild = (
		child: IAccordionNestedChild,
		index: number,
		parentIndex: number,
		nestedParentIndex: number
	) => {
		const newAccordionItems = [...accordionItems];
		if (!newAccordionItems?.[parentIndex]?.children?.[nestedParentIndex]) {
			return;
		}
		newAccordionItems[parentIndex].children[nestedParentIndex].children[index] =
			child;
		setAccordionItems(newAccordionItems);
	};

	const handleDeleteNestedChild = (
		index: number,
		parentIndex: number,
		nestedParentIndex: number
	) => {
		const newAccordionItems = [...accordionItems];
		if (
			!newAccordionItems?.[parentIndex]?.children?.[nestedParentIndex]?.children
		) {
			return;
		}
		newAccordionItems[parentIndex].children[nestedParentIndex].children.splice(
			index,
			1
		);
		setAccordionItems(newAccordionItems);
	};

	const handleAddNestedChild = (
		parentIndex: number,
		nestedParentIndex: number
	) => {
		const newAccordionItems = [...accordionItems];
		if (!newAccordionItems?.[parentIndex]?.children?.[nestedParentIndex]) {
			return;
		}
		newAccordionItems[parentIndex].children[nestedParentIndex].children.push({
			name: ""
		});
		setAccordionItems(newAccordionItems);
	};

	return (
		<AccordionContainer>
			{accordionItems.map((item, index) => (
				<AccordionItem
					key={index}
					name={item.name}
					children={item.children}
					updateAccordionItem={item => handleUpdateItem(item, index)}
					deleteAccordionItem={() => handleDeleteItem(index)}
					updateAccordionChild={(child, childIndex) =>
						handleUpdateChild(child, childIndex, index)
					}
					deleteAccordionChild={childIndex =>
						handleDeleteChild(childIndex, index)
					}
					addAccordionChild={() => handleAddChild(index)}
					updateAccordionNestedChild={(
						child,
						nestedChildIndex,
						nestedParentIndex
					) =>
						handleUpdateNestedChild(
							child,
							nestedChildIndex,
							index,
							nestedParentIndex
						)
					}
					deleteAccordionNestedChild={(nestedChildIndex, nestedParentIndex) =>
						handleDeleteNestedChild(nestedChildIndex, index, nestedParentIndex)
					}
					addAccordionNestedChild={nestedParentIndex =>
						handleAddNestedChild(index, nestedParentIndex)
					}
				/>
			))}

			<EmptyContainer>
				<AddItemButton onClick={addItem}>
					<Add size={24} color='#018374' />
					<span>Click to add item</span>
				</AddItemButton>
			</EmptyContainer>
		</AccordionContainer>
	);
};

export default Accordion;
