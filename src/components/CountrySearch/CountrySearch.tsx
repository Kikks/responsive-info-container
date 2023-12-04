import { ArrowUp2, Location, SearchNormal1 } from "iconsax-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { continentsList } from "./data";
import Continent from "./Continent";
import useDebounce from "../../hooks/useDebounce";
import { Continent as IContinent } from "./CountrySearch.props";

const filterContents = (contents: IContinent[], search: string) => {
	const filteredItems = [];

	for (let i = 0; i < contents.length; i++) {
		const continent = contents[i];

		if (continent.name.toLowerCase().includes(search.toLowerCase())) {
			filteredItems.push(continent);
			continue;
		}

		const countries = continent.countries.filter(country => {
			const { name, cities } = country;
			const filteredCities = cities.filter(city => {
				const { name } = city;
				return name.toLowerCase().includes(search.toLowerCase());
			});
			return (
				name.toLowerCase().includes(search.toLowerCase()) ||
				filteredCities.length > 0
			);
		});
		if (countries.length > 0) {
			filteredItems.push({ ...continent, countries });
		}
	}

	return filteredItems;
};

const SearchContainer = styled.div`
	width: 100%;
	max-width: 500px;
	margin: 0 auto;
	border: solid 2px #018374;
	border-radius: 0.5rem;
	overflow: hidden;
`;

const SeachHeader = styled.button<{ $isExpanded?: boolean }>`
	width: 100%;
	padding: 1rem;
	background-color: #fff;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	border-radius: 0;
	border: none;
	outline: none;

	&:hover,
	&:focus,
	&:active {
		outline: none;
		border: none;
	}
`;

const AnimatedArrow2 = styled(ArrowUp2)<{ $isExpanded?: boolean }>`
	transform: ${props =>
		props.$isExpanded ? "rotate(0deg)" : "rotate(180deg)"};
	transition: all 0.3s ease-in-out;
	margin-left: auto;
`;

const SeachBody = styled.div<{ $isExpanded: boolean }>`
	width: 100%;
	background-color: #fff;
	border-radius: 0.5rem;
	height: ${props => (props.$isExpanded ? "auto" : "0")};
	transition: all 0.3s ease-in-out;
	max-height: 600px;
	overflow-y: auto;
`;

const InputContainer = styled.div`
	width: 95%;
	display: flex;
	align-items: center;
	border: dotted 1px #018734;
	padding: 0 0.5rem;
	margin: 0.5rem auto;
`;

const Input = styled.input`
	width: 100%;
	padding: 0.75rem 0rem;
	background-color: transparent;
	color: #018734;
	font-size: 1rem;
	font-weight: 600;
	border-radius: 0.5rem;
	outline: none;
	border: none;

	&::placeholder {
		color: #44a79b;
	}
`;

const Label = styled.label`
	display: block;
	font-size: 0.75rem;
	font-weight: 600;
	color: #666666;
	margin-top: 1.5rem;
	margin-bottom: 0.5rem;
	margin-left: 0.75rem;
`;

const EmptyContainer = styled.div`
	padding: 2rem 0;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	& span {
		color: #018374;
		font-weight: 600;
		text-align: center;
	}
`;

const CountrySearch = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [continents] = useState<IContinent[]>(continentsList);
	const [filteredContinents, setFilteredContinents] = useState<IContinent[]>(
		[]
	);
	const [selectedContinents, setSelectedContinents] = useState<IContinent[]>(
		[]
	);
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search, 500);

	const handleContinentSelect = (id: number) => {
		const continent = continents.find(continent => continent.id === id);
		if (!continent) return;

		const continentIndex = selectedContinents?.findIndex(
			continent => continent.id === id
		);

		if (continentIndex === -1) {
			setSelectedContinents(prev => [...prev, continent]);
			return;
		}

		const newSelectedContinents = selectedContinents?.filter(
			continent => continent.id !== id
		);
		setSelectedContinents(newSelectedContinents);
	};

	const handleCountrySelect = (continentId: number, countryId: number) => {
		const continentIndex = (selectedContinents || [])?.findIndex(
			continent => continent.id === continentId
		);

		if (continentIndex === -1) {
			const newContinent = continents.find(
				continent => continent.id === continentId
			);

			if (!newContinent) {
				return;
			}

			const newCountry = newContinent.countries.find(
				country => country.id === countryId
			);
			if (!newCountry) return;

			const newSelectedContinents = selectedContinents;
			newSelectedContinents.push({
				...newContinent,
				countries: [newCountry]
			});
			setSelectedContinents(newSelectedContinents);
			return;
		}

		if (!selectedContinents?.[continentIndex]) {
			return;
		}

		const continent = selectedContinents[continentIndex];
		const countryIndex = continent.countries.findIndex(
			country => country.id === countryId
		);

		if (countryIndex === -1) {
			const newCountry = continents[continentIndex].countries.find(
				country => country.id === countryId
			);
			if (!newCountry) return;

			const newSelectedContinents = selectedContinents;
			newSelectedContinents[continentIndex].countries.push(newCountry);
			setSelectedContinents(newSelectedContinents);
			return;
		}

		const newSelectedContinents = selectedContinents;
		newSelectedContinents[continentIndex].countries.splice(countryIndex, 1);
		setSelectedContinents(newSelectedContinents);
	};

	const handleCitySelect = (
		continentId: number,
		countryId: number,
		cityId: number
	) => {
		const continentIndex = (selectedContinents || [])?.findIndex(
			continent => continent.id === continentId
		);

		if (continentIndex === -1) {
			const newContinent = continents.find(
				continent => continent.id === continentId
			);

			if (!newContinent) {
				return;
			}

			const newCountry = newContinent.countries.find(
				country => country.id === countryId
			);
			if (!newCountry) return;

			const newCity = newCountry.cities.find(city => city.id === cityId);
			if (!newCity) return;

			const newSelectedContinents = selectedContinents;
			newSelectedContinents.push({
				...newContinent,
				countries: [
					{
						...newCountry,
						cities: [newCity]
					}
				]
			});
			setSelectedContinents(newSelectedContinents);
			return;
		}

		if (!selectedContinents?.[continentIndex]) {
			return;
		}

		const continent = selectedContinents[continentIndex];
		const countryIndex = continent.countries.findIndex(
			country => country.id === countryId
		);

		if (countryIndex === -1) {
			const newCountry = continents[continentIndex].countries.find(
				country => country.id === countryId
			);
			if (!newCountry) return;

			const newCity = newCountry.cities.find(city => city.id === cityId);
			if (!newCity) return;

			const newSelectedContinents = selectedContinents;
			newSelectedContinents[continentIndex].countries.push({
				...newCountry,
				cities: [newCity]
			});
			setSelectedContinents(newSelectedContinents);
			return;
		}

		const country = continent.countries[countryIndex];
		const cityIndex = country.cities.findIndex(city => city.id === cityId);

		if (cityIndex === -1) {
			const newCity = continents[continentIndex].countries[
				countryIndex
			].cities.find(city => city.id === cityId);
			if (!newCity) return;

			const newSelectedContinents = selectedContinents;
			newSelectedContinents[continentIndex].countries[countryIndex].cities.push(
				newCity
			);
			setSelectedContinents(newSelectedContinents);
			return;
		}

		const newSelectedContinents = selectedContinents;
		newSelectedContinents[continentIndex].countries[countryIndex].cities.splice(
			cityIndex,
			1
		);
		setSelectedContinents(newSelectedContinents);
	};

	const continentIsChecked = (id: number) => {
		const continentIndex = selectedContinents?.findIndex(
			continent => continent.id === id
		);

		if (continentIndex === -1) return false;

		if (!selectedContinents?.[continentIndex]) {
			return false;
		}

		const continent = selectedContinents[continentIndex];
		const countries = continents[continentIndex].countries;

		if (continent.countries.length !== countries.length) {
			return false;
		}

		return true;
	};

	const cityIsChecked = (
		continentId: number,
		countryId: number,
		cityId: number
	) => {
		const continentIndex = (selectedContinents || [])?.findIndex(
			continent => continent.id === continentId
		);

		if (continentIndex === -1) return false;

		if (!selectedContinents?.[continentIndex]) {
			return false;
		}

		const continent = selectedContinents[continentIndex];
		const countryIndex = continent.countries.findIndex(
			country => country.id === countryId
		);

		if (countryIndex === -1) return false;

		const country = continent.countries[countryIndex];
		const cityIndex = country.cities.findIndex(city => city.id === cityId);

		if (cityIndex === -1) return false;

		return true;
	};

	const countryIsChecked = (continentId: number, countryId: number) => {
		const indexInSelectedContinents = selectedContinents.findIndex(
			continent => continent.id === continentId
		);

		if (indexInSelectedContinents === -1) return false;

		if (!selectedContinents?.[indexInSelectedContinents]) {
			return false;
		}

		const continent = selectedContinents[indexInSelectedContinents];
		const countryIndex = continent.countries.findIndex(
			country => country.id === countryId
		);

		if (countryIndex === -1) return false;

		const country = continent.countries[countryIndex];

		if (country.cities.length === 0) {
			return false;
		}

		const indexInContinents = continents.findIndex(
			continent => continent.id === continentId
		);
		const countryIndexInContinents = continents[
			indexInContinents
		].countries.findIndex(country => country.id === countryId);

		const cities =
			continents?.[indexInContinents]?.countries?.[countryIndexInContinents]
				?.cities;
		const selectedCities = country.cities;

		if (selectedCities.length !== cities?.length) {
			return false;
		}

		return true;
	};

	useEffect(() => {
		if (debouncedSearch === "") {
			setFilteredContinents(continentsList);
			return;
		}

		const filteredItems = filterContents(continents, debouncedSearch);
		setFilteredContinents(filteredItems);
	}, [debouncedSearch, continents]);

	console.log({
		selectedContinents
	});

	return (
		<SearchContainer>
			<SeachHeader
				$isExpanded={isExpanded}
				onClick={() => setIsExpanded(prev => !prev)}
			>
				<Location color='#018374' />
				<span>Location</span>
				<AnimatedArrow2 $isExpanded={isExpanded} color='#018374' />
			</SeachHeader>

			<SeachBody $isExpanded={isExpanded}>
				<InputContainer>
					<Input
						placeholder='Search'
						value={search}
						onChange={e => setSearch(e?.target?.value)}
					/>
					<SearchNormal1 color='#018374' />
				</InputContainer>

				<Label>Select a Location</Label>

				{filteredContinents.length === 0 ? (
					<EmptyContainer>
						<span>No results found</span>
					</EmptyContainer>
				) : (
					filteredContinents.map((continent, index) => (
						<Continent
							key={index}
							isChecked={continentIsChecked(continent.id)}
							{...continent}
							onCityChecked={handleCitySelect}
							onCountryChecked={handleCountrySelect}
							onContinentChecked={handleContinentSelect}
							countryIsChecked={countryId =>
								countryIsChecked(continent.id, countryId)
							}
							cityIsChecked={(countryId, cityId) =>
								cityIsChecked(continent.id, countryId, cityId)
							}
						/>
					))
				)}
			</SeachBody>
		</SearchContainer>
	);
};

export default CountrySearch;
