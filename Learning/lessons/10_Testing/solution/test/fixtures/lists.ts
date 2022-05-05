import { List } from 'src/domain'
import { selectableBoiler, selectableGuitar, selectableCar } from "./selectable-items";

export const testList1 = List({ 
    title: "list1", 
    id: 666, 
    items: [selectableBoiler, selectableCar] 
});
export const testList2 = List({ 
    title: "list1", 
    id: 420, 
    items: [selectableGuitar] 
});