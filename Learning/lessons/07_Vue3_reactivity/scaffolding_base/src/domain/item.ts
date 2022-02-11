type OptionalProps<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

export type Item = {
	id: number;
    name: string;
	summary: string;
};

export function Item({ name, summary, ...rest }: OptionalProps<Item, 'id'> ): Item {
	return {
		id: Math.floor(Math.random() * 100),
		name,
		summary,
		...rest,
	};
}
