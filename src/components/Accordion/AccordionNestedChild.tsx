import { ChangeEvent, FC, useEffect, useState } from "react";
import {
	AccordionNestedChildProps,
	IAccordionNestedChild
} from "./Accordion.props";
import styled from "styled-components";
import { Menu, Trash } from "iconsax-react";
import trimString from "../../utils/trimString";
import IconButton from "../IconButton";

const NestedChildContainer = styled.div`
	width: 100%;
`;

const NestedChildHeader = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	border-style: solid;
	border-width: 1px;
	border-color: #ccc;
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
		color: #555;
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
	color: #555;
	font-size: 1rem;
	font-weight: 600;
	margin: 0 1rem;
	outline: solid 1px #018374;
	border-radius: 0.5rem;

	&::placeholder {
		color: #aaa;
	}
`;

const AccordionNestedChild: FC<AccordionNestedChildProps> = ({
	name,
	deleteAccordionNestedChild,
	updateAccordionNestedChild
}) => {
	const [nestedChild, setNestedChild] = useState<IAccordionNestedChild>({
		name: ""
	});
	const [isEditting, setIsEditting] = useState(false);

	const handleEditName = (e: ChangeEvent<HTMLInputElement>) => {
		setNestedChild(prev => ({ ...prev, name: e?.target?.value || "" }));
	};

	const handleEditChild = () => {
		if (nestedChild.name.trim() === "") return;
		setIsEditting(false);
		updateAccordionNestedChild && updateAccordionNestedChild(nestedChild);
	};

	const handleDeleteChild = () => {
		deleteAccordionNestedChild && deleteAccordionNestedChild();
	};

	useEffect(() => {
		setNestedChild({ name });
		if (name.trim() === "") {
			setIsEditting(true);
		}
	}, [name]);

	return (
		<NestedChildContainer>
			<NestedChildHeader>
				<div className='title'>
					<Menu size={24} color='#555' variant='Bold' />
					{isEditting ? (
						<Input
							type='text'
							value={nestedChild.name}
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
				</div>

				<div className='actions'>
					<IconButton onClick={handleDeleteChild}>
						<Trash size={24} color='#018374' />
					</IconButton>
				</div>
			</NestedChildHeader>
		</NestedChildContainer>
	);
};

export default AccordionNestedChild;
