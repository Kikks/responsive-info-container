import { FC } from "react";
import { IconButtonProps } from "./IconButton.props";
import styled from "styled-components";

const IconBtn = styled.button`
	height: 3rem;
	width: 3rem;
	display: grid;
	place-items: center;
	background-color: transparent;
	border: 0 !important;
	padding: 0 !important;

	&:disabled,
	&::disabled {
		cursor: not-allowed !important;
	}
`;

const IconButton: FC<IconButtonProps> = ({ children, ...rest }) => {
	return <IconBtn {...rest}>{children}</IconBtn>;
};

export default IconButton;
