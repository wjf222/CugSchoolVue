const Util = {
    searchAPI(router, params) {
        if (params.searchText !== "") {
            router.push({ path: `/search_ans`,query: params})
        }
    }
}

export default Util;