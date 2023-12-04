import { FC, useState } from "react";
import { CountryProps } from "./CountrySearch.props";
import { ArrowUp2 } from "iconsax-react";
import styled from "styled-components";
import City from "./City";

const CountryContainer = styled.div`
	width: 100%;
	margin-bottom: 0.25rem;
`;

const CountryHeader = styled.div`
	width: 100%;
	display: flex;
	gap: 0.5rem;
	transition: all 0.3s ease-in-out;
	background-color: transparent;
	padding: 0 0.5rem;
	padding-left: 2rem;

	&:hover {
		background-color: #eee;
	}
`;

const AnimatedArrow2 = styled(ArrowUp2)<{ $isExpanded?: boolean }>`
	transform: ${props =>
		props.$isExpanded ? "rotate(0deg)" : "rotate(180deg)"};
	transition: all 0.3s ease-in-out;
	margin-left: auto;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })``;

const ToggleButton = styled.button`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	outline: none;
	border: none;
	flex: 1;
	background-color: transparent;
	padding: 1rem;
	padding-left: 0;

	&:hover,
	&:focus {
		outline: none;
		border: none;
	}
`;

const CountryBody = styled.div<{ $isExpanded: boolean }>`
	width: 100%;
	background-color: #fff;
	display: ${props => (props.$isExpanded ? "block" : "none")};
	transition: all 0.3s ease-in-out;
`;

const Country: FC<CountryProps> = ({
	name,
	cities,
	cityIsChecked,
	isChecked,
	id,
	onCityChecked,
	onCountryChecked
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<CountryContainer>
			<CountryHeader>
				<Checkbox
					checked={isChecked}
					onChange={() => {
						onCountryChecked(id);
					}}
				/>
				<ToggleButton onClick={() => setIsExpanded(prevState => !prevState)}>
					<span>{name}</span>
					<AnimatedArrow2 $isExpanded={isExpanded} />
				</ToggleButton>
			</CountryHeader>

			<CountryBody $isExpanded={isExpanded}>
				{cities.map(city => (
					<City
						{...city}
						isChecked={cityIsChecked(city.id)}
						key={city.id}
						onCityChecked={cityId => {
							onCityChecked(id, cityId);
						}}
					/>
				))}
			</CountryBody>
		</CountryContainer>
	);
};

export default Country;
