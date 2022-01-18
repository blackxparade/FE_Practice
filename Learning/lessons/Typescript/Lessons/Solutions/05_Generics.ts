/*  Add generic to is, so you can use this function with any type, which has a selected property */

interface Archivable {
    archived: boolean;
  }

function getArchivedItems<T extends Archivable>(items: T[]) {
    return items.filter((item) => item.archived)

}

/* Should be able to tell dynamically the type of the returned list */
//const archivedAssetItems = getArchivedItems(assetItems);


/* Declare a random type and use that here */
//const archivedAnything = getArchivedItems(assetItems);
