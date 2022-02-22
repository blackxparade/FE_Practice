export type List = {
	id: number;
    title: string;
};

export function List({title, id = Math.floor(Math.random() * 10000)}: {title: string, id?: number }): List {
	return {
		id,
		title: title
	};
}
