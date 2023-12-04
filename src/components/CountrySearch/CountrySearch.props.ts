type City = {
	id: number;
	name: string;
};

type Country = {
	id: number;
	name: string;
	cities: City[];
};

export type Continent = {
	id: number;
	name: string;
	countries: Country[];
};

export interface ContinentProps extends Continent {
	isChecked: boolean;
	onContinentChecked: (id: number) => void;
	onCountryChecked: (continentId: number, countryId: number) => void;
	onCityChecked: (
		continentId: number,
		countryId: number,
		cityId: number
	) => void;
	cityIsChecked: (countryId: number, cityId: number) => boolean;
	countryIsChecked: (countryId: number) => boolean;
}
export interface CountryProps extends Country {
	isChecked: boolean;
	onCountryChecked: (countryId: number) => void;
	onCityChecked: (countryId: number, cityId: number) => void;
	cityIsChecked: (cityId: number) => boolean;
}

export interface CityProps extends City {
	isChecked: boolean;
	onCityChecked: (cityId: number) => void;
}

export type TransformedContinent = {
	value: string;
	label: string;
	children?: TransformedContinent[];
	className?: string;
};
