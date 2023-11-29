export type IAccordionNestedChild = {
	name: string;
};

export type IAccordionChild = {
	name: string;
	children: IAccordionNestedChild[];
};

export type IAccordionItem = {
	name: string;
	children: IAccordionChild[];
};

export interface AccordionItemProps extends IAccordionItem {
	updateAccordionItem?: (accordionItem: IAccordionItem) => void;
	deleteAccordionItem?: (accordionItem: IAccordionItem) => void;
	updateAccordionChild?: (
		accordionChild: IAccordionChild,
		childIndex: number
	) => void;
	deleteAccordionChild?: (childIndex: number) => void;
	addAccordionChild?: () => void;
	updateAccordionNestedChild?: (
		accordionNestedChild: IAccordionNestedChild,
		nestedChildIndex: number,
		nestedParentIndex: number
	) => void;
	deleteAccordionNestedChild?: (
		nestedChildIndex: number,
		nestedParentIndex: number
	) => void;
	addAccordionNestedChild?: (nestedParentIndex: number) => void;
}

export interface AccordionChildProps extends IAccordionChild {
	updateAccordionChild?: (accordionChild: IAccordionChild) => void;
	deleteAccordionChild?: (accordionChild: IAccordionChild) => void;
	addAccordionNestedChild?: () => void;
	updateAccordionNestedChild?: (
		accordionNestedChild: IAccordionNestedChild,
		nestedChildIndex: number
	) => void;
	deleteAccordionNestedChild?: (nestedChildIndex: number) => void;
}

export interface AccordionNestedChildProps extends IAccordionNestedChild {
	updateAccordionNestedChild?: (
		accordionNestedChild: IAccordionNestedChild
	) => void;
	deleteAccordionNestedChild?: () => void;
}
