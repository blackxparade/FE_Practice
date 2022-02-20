export type List = {
	id: number;
    title: string;
};

export function List(title: string ): List {
	return {
		id: Math.floor(Math.random() * 10000),
		title: title
	};
}