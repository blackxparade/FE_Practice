import { asset1 } from './03_Domain_Objects';

/*  Add generic to is, so you can use this function with any type, which has a selected property */

interface Archivable {
    archived: boolean;
  }

function getArchivedItems<T extends Archivable>(items: T[]) {
    return items.filter((item) => item.archived)

}

// Should be able to tell dynamically the type of the returned list
const assetItems = [ asset1, asset1 ];

function Location({ unid = '1', archived = false, ...rest  }) {
  return {
    unid,
    archived,
    ...rest
  }
}
const archivedAssetItems = getArchivedItems<Asset>(assetItems);

const locations = [Location({name: 'budapest'}), Location({name: 'Tata'})]

type Location = ReturnType<typeof Location>;
/* Declare a random type and use that here */

const archivedLocations = getArchivedItems<Location>(locations);
