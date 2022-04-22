import { Item } from './item';

export type List = {
	id: number;
    title: string;
	items: Item[];
};

export function List({title, id = Math.floor(Math.random() * 10000), items = []}: {title: string, id?: number, items?: Item[] }): List {
	return {
		id,
		title: title,
		items: items
	};
}
