import { ArrowUp2, Location, SearchNormal1 } from "iconsax-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { continentsList } from "./data";
import useDebounce from "../../hooks/useDebounce";
import {
	Continent as IContinent,
	TransformedContinent
} from "./CountrySearch.props";
import CheckboxTree from "react-checkbox-tree";

const transformContinents: (
	continents: IContinent[]
) => TransformedContinent[] = continents => {
	const transformedContinents = [];

	for (let i = 0; i < continents.length; i++) {
		const continent = continents[i];
		const { name, countries } = continent;
		const transformedCountries = [];

		for (let j = 0; j < countries.length; j++) {
			const country = countries[j];
			const { name, cities } = country;
			const transformedCities = [];

			for (let k = 0; k < cities.length; k++) {
				const city = cities[k];
				const { name } = city;
				transformedCities.push({
					value: name,
					label: name,
					className: "checkbox-tree__city"
				});
			}

			transformedCountries.push({
				value: name,
				label: name,
				children: transformedCities,
				className: "checkbox-tree__country"
			});
		}

		transformedContinents.push({
			value: name,
			label: name,
			children: transformedCountries,
			className: "checkbox-tree__continent"
		});
	}

	return transformedContinents;
};

const filterContents = (contents: TransformedContinent[], search: string) => {
	const filteredContents = [];

	for (let i = 0; i < contents.length; i++) {
		const content = contents[i];
		const { label, children = [] } = content;

		if (label.toLowerCase().includes(search.toLowerCase())) {
			filteredContents.push(content);
			continue;
		}

		const filteredChildren = [];

		for (let j = 0; j < children.length || 0; j++) {
			const child = children[j];
			const { label: label2, children: cildren2 = [] } = child;
			const filteredGrandChildren = [];

			if (label2.toLowerCase().includes(search.toLowerCase())) {
				filteredChildren.push(child);
				continue;
			}

			for (let k = 0; k < cildren2.length; k++) {
				const grandChild = cildren2[k];
				const { label: label3 } = grandChild;

				if (label3.toLowerCase().includes(search.toLowerCase())) {
					filteredGrandChildren.push(grandChild);
				}
			}

			if (filteredGrandChildren.length > 0) {
				filteredChildren.push({
					...child,
					children: filteredGrandChildren
				});
			}
		}

		if (filteredChildren.length > 0) {
			filteredContents.push({
				...content,
				children: filteredChildren
			});
		}
	}

	return filteredContents;
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
	const [continents, setContinents] = useState<TransformedContinent[]>([]);
	const [filteredContinents, setFilteredContinents] = useState<
		TransformedContinent[]
	>([]);
	const [expanded, setExpanded] = useState<string[]>([]);
	const [checked, setChecked] = useState<string[]>([]);

	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search, 500);

	useEffect(() => {
		if (debouncedSearch === "") {
			setFilteredContinents([
				{
					label: "Remote",
					value: "Remote",
					className: "checkbox-tree__remote"
				},
				...continents
			]);
			return;
		}

		const filteredItems = filterContents(continents, debouncedSearch);
		setFilteredContinents(filteredItems);
	}, [debouncedSearch, continents]);

	useEffect(() => {
		setContinents(transformContinents(continentsList));
		setFilteredContinents(transformContinents(continentsList));
	}, []);

	console.log({
		checked,
		expanded
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
					<CheckboxTree
						nodes={filteredContinents}
						onClick={() => {}}
						checked={checked}
						expanded={expanded}
						onCheck={setChecked}
						onExpand={setExpanded}
						expandOnClick
						icons={{
							expandAll: <></>,
							collapseAll: <></>,
							parentClose: <></>,
							parentOpen: <></>,
							leaf: <></>
						}}
					/>
				)}
			</SeachBody>
		</SearchContainer>
	);
};

export default CountrySearch;
