import { boiler, car, guitar } from "./item"

export const selectableBoiler = { ...boiler, selected: false }
export const selectableCar = { ...car, selected: false }
export const selectableGuitar = { ...guitar, selected: false }
export const selectableItems = [ selectableBoiler, selectableCar ];

