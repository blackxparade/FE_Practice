export type GetAssetsParams = {
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

// Add types to the params in a way, that only the destructured values can be used for functions.

export function Api({ get }) {
	function getAssets(getAssetParams: GetAssetsParams) {
		return get(getAssetParams);
	};

	return {
		getStock({searchTerm, fetchData }:
			Pick<GetAssetsParams,"searchTerm" | "fetchData">) {
			return getAssets({ resourceCategory: 'stock', searchTerm, fetchData })
		},
		getLinkableAssets({ linkableToAsset, linkableWithDirection, linkableWithCapability }:
			Pick<GetAssetsParams,"linkableToAsset" | "linkableWithDirection" | "linkableWithCapability">) {
			return getAssets({resourceCategory: 'asset', linkableToAsset, linkableWithDirection, linkableWithCapability})
		},
		getLinkedAsset({ linkedToAsset, linkedWithCapability }:
			Pick<GetAssetsParams, "linkedToAsset" | "linkedWithCapability">) {
			return getAssets({resourceCategory: 'asset', linkedToAsset, linkedWithCapability  } )
		},

	}
}

// i dont understand the task here, example?
/*  Create a derived type for the api, so when we modify later the api, we do not have to redeclare the types again */
const api = Api( { get: (params) => params })

type Api = ReturnType<typeof Api>;

/* Use the declared types here */
function randomModule({ api }) {

	const fetchStock = (params) => {
		return api.getStock(params);
	};

	return {
		fetchStock,
	}
}
//
/* As a result, fetchedStock should have a type of
{
	searchTerm: string,
	fetchData: true,
	resourceCategory: 'stock'  | 'asset'

}
} */
const fetchedStock = fetchStock({ searchTerm: 'stockName1', fetchData: true})