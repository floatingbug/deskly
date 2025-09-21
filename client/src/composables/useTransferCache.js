let cache;


function setCache(data){
	cache = data;
}

async function getCache(){
	const tmpCache = cache;
	cache = null;
	return tmpCache;
}


export default function useTransferCache(){
	return {
		setCache,
		getCache,
	};
}
