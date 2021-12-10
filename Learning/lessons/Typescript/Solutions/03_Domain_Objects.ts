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

function AssetFactory({
	unid = Math.floor(Math.random() * 100),
	resourceCategory = 'asset',
	archived = false,
    ...rest
} = {}) {
	return { unid, resourceCategory, archived, ...rest };
}

export type OptionalProps<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

const Asset = ({
    unid = Math.random().toString(),
    resourceCategory = 'asset',
    archived = false ,
    ...rest
}: OptionalProps<Asset, 'unid' | 'resourceCategory' | 'archived'>) : Asset => {
    return {
        unid,
        resourceCategory,
        archived: archived ,
        ...rest,
    };
};

export const asset1 = Asset({
    name: 'Racing car2',
    icon: 'car-32',
    status: "Impacted",
    type: 'car',
})
console.log(asset1.unid);


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