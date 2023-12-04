import { FC, useState } from "react";
import { ContinentProps } from "./CountrySearch.props";
import { ArrowUp2 } from "iconsax-react";
import styled from "styled-components";
import Country from "./Country";

const ContinentContainer = styled.div`
	width: 100%;
	margin-bottom: 0.5rem;
`;

const ContinentHeader = styled.div`
	width: 100%;
	display: flex;
	gap: 0.5rem;
	transition: all 0.3s ease-in-out;
	background-color: transparent;
	padding: 0 0.5rem;

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

const ContinentBody = styled.div<{ $isExpanded: boolean }>`
	width: 100%;
	background-color: #fff;
	display: ${props => (props.$isExpanded ? "block" : "none")};
	transition: all 0.3s ease-in-out;
`;

const Continent: FC<ContinentProps> = ({
	id,
	name,
	countries,
	isChecked,
	onCityChecked,
	onContinentChecked,
	onCountryChecked,
	cityIsChecked,
	countryIsChecked
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<ContinentContainer>
			<ContinentHeader>
				<Checkbox
					checked={isChecked}
					onChange={() => {
						onContinentChecked(id);
					}}
				/>
				<ToggleButton onClick={() => setIsExpanded(prevState => !prevState)}>
					<span>{name}</span>
					<AnimatedArrow2 $isExpanded={isExpanded} />
				</ToggleButton>
			</ContinentHeader>

			<ContinentBody $isExpanded={isExpanded}>
				{countries.map((country, index) => (
					<Country
						key={index}
						{...country}
						isChecked={countryIsChecked(country.id)}
						cityIsChecked={cityId => cityIsChecked(country.id, cityId)}
						onCityChecked={(countryId, cityId) => {
							onCityChecked(id, countryId, cityId);
						}}
						onCountryChecked={countryId => {
							onCountryChecked(id, countryId);
						}}
					/>
				))}
			</ContinentBody>
		</ContinentContainer>
	);
};

export default Continent;
