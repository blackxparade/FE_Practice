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

export function Api() {
	function getAssets(getAssetParams: GetAssetsParams) {
		return /* return some assets  from 01_types */
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
const api = Api()

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

const { fetchStock } = randomModule({ api })

/* As a result, fetchedStock params should have a type of
{
	searchTerm: string,
	fetchData: true,
}
} */
/* With the returing value of Assets from 01_types */
const fetchedStock = fetchStock({ searchTerm: 'stockName1', fetchData: true})