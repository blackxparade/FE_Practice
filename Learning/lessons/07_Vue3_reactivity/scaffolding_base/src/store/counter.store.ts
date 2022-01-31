import { toRefs, reactive, provide, inject, InjectionKey, computed } from 'vue';
type CounterStore = ReturnType<typeof setupCounterStore>
export const CounterStoreSymbol: InjectionKey<CounterStore> = Symbol('counterStore');

type CounterState = {
    counter: number;
}

export const setupCounterStore = () => {

	/* State */
	const state = reactive<CounterState>({
		counter: 1,
	});

	/* Getters */
	const doubleCount = computed(() => {
		return state.counter + 1;
	});

	const doublePlusOne = computed(() => {
		return state.counter * 2 + 1;
	});

	/* Actions */
	const increment = () => {
		state.counter = state.counter + 1;
	};
	const decrement = () => {
		state.counter = state.counter - 1;
	};
	const randomizeCounter = () => {
		state.counter = Math.round(100 * Math.random());
	};

	return {
		...toRefs(state),
		doubleCount,
		doublePlusOne,
		increment,
		decrement,
		randomizeCounter,
	};

};

export const provideCounterStore = () => {
	const counterStore = setupCounterStore();
	provide(CounterStoreSymbol, counterStore);
	return counterStore;
};

export const useCounterStore = () => {
	return inject(CounterStoreSymbol)!;
};
