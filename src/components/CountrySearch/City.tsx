import { FC } from "react";
import styled from "styled-components";
import { CityProps } from "./CountrySearch.props";

const Checkbox = styled.input.attrs({ type: "checkbox" })``;

const CityContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem 0;
	padding-left: 4rem;
`;

const City: FC<CityProps> = ({ id, name, onCityChecked, isChecked }) => {
	return (
		<CityContainer key={name}>
			<Checkbox
				checked={isChecked}
				onChange={() => {
					onCityChecked(id);
				}}
			/>
			<span>{name}</span>
		</CityContainer>
	);
};

export default City;
