import { selectableBoiler, selectableCar, selectableGuitar } from "test/fixtures/selectable-items";
import { ref } from "vue";
import { setupDeleteItemModalStore } from "./modal-deleteItem.store";

test('Should list item info correctly', () => {
	const { store, getEverySelected } = setup()
	const testItem = getEverySelected.value[0];
	expect(store.listItemInfo(testItem)).toEqual(`${testItem.id} - ${testItem.name}, ${testItem.summary}`)
});


function setup() {
	const deleteItems = jest.fn();
	const getEverySelected = ref([selectableBoiler, selectableCar, selectableGuitar])

	const store =  setupDeleteItemModalStore({
		deleteItems,
		getEverySelected,
	});

	return { store, deleteItems, getEverySelected };
}

