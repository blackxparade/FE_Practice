import { Asset } from './01_Types';

/* https://frontend.topdesk.com/home/guide/practices/domain-objects.html */

/*  From the declared type at 01_types, create a function that ensures
    - an asset has a random unid
    - by default the resourceCategory is 'asset'
    - by default the archived is 'false'
*/

/*  ok i have 0 idea if this works or not. :D
    my issue here was: how can i return an Asset object, filled with the unid, etc.
*/
function AssetFactory(asset?: Asset, {
	unid = Math.floor(Math.random() * 100),
	resourceCategory = 'asset',
	archived = 'false',
} = {}) {
	return { unid, resourceCategory, archived, ...asset };
}


/* Now we have a linkable assetItem, with all of the item properties and with these */
/*  Write a function to create a linkAbleAssetItem */
/*
    - linkable: boolean,
     capabilityId: 'STOCK_CAPABILITY | ASSET_CAPABILITY | LOCATION_CAPABILITY | PERSON_CAPABILITY',
*/
// most probably not correct solution, how to do this in TS?
function linkAbleAssetItem({ linkable: boolean, capabilityId: string, ...rest }) {
        let linkable: boolean = this.linkable;
        let capabilityId: 'STOCK_CAPABILITY' | 'ASSET_CAPABILITY' | 'LOCATION_CAPABILITY' | 'PERSON_CAPABILITY' = this.capabilityId;
	return { linkable, capabilityId, ...rest };
}


/* Now we have a linked assetItem, with all of the item properties and with these */
/*  Write a function to create a linkedAssetItem */
/*
    - linkedTo : string,
    - linkId: string,
    - linked: boolean,
    - capabilityId: 'STOCK_CAPABILITY | ASSET_CAPABILITY | LOCATION_CAPABILITY | PERSON_CAPABILITY',
*/

// no idea