import { List } from 'src/domain'
import { selectableBoiler, selectableGuitar, selectableCar } from "./selectable-items";

export const Household = List({
    title: "list1",
    id: 666,
    items: [selectableBoiler, selectableCar]
});
export const Hobby = List({
    title: "list2",
    id: 420,
    items: [selectableGuitar]
});
