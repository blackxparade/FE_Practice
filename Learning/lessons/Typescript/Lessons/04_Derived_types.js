


/* export type GetAssetsParams = {
	searchTerm?: string,
	linkableToAsset?: string,
	linkableWithDirection?: string,
	linkableWithCapability?: string | null,
	linkedToAsset?: string,
	linkedWithDirection?: 'target' | 'source',
	linkedWithCapability?: string,
	limit?: number,
	$orderby?: string,
	lastSeenName?: string,
	lastSeenOrderbyValue?: string,
	fetchCount?: boolean,
	fetchData?: boolean
	resourceCategory?: 'stock' | 'asset',
}
 */


// Add types to the params in a way, that only the destructured values can be used for functions.

export function Api({ get }) {

	function getAssets(getAssetParams) {
		return get(getAssetParams);
	}

	function getStock({searchTerm, fetchData }) {
		return getAssets({ resourceCategory: 'stock', searchTerm, fetchData })
	}

	function getLinkableAssets({ linkableToAsset, linkableWithDirection, linkableWithCapability }) {
		return getAssets({resourceCategory: 'asset', linkableToAsset, linkableWithDirection, linkableWithCapability})
	}u

	function getLinkedAsset({ linkedToAsset, linkedWithCapability  }) {
		return getAssets({resourceCategory: 'asset', linkedToAsset, linkedWithCapability  } )
	}
}


/*  Create a derived type for the api, so when we modify later the api, we do not have to redeclare the types again */
const api = Api( { get: (params) => params })



/* Use the declared types here */
function randomModule({ api }) {

	const fetchStock = (params) => {
		return api.getStock(params);
	};

	return {
		fetchStock,
	}
}

const { fetchStock } = randomModule({ api })

/* As a result, fetchedStock should have a type of
{
	searchTerm: string,
	fetchData: true,
	resourceCategory: 'stock'  | 'asset'

}
} */
const fetchedStock = fetchStock({ searchTerm: 'stockName1', fetchData: true})