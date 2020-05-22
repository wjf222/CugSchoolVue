const Util = {
    searchAPI(router,searchText){
        if(searchText!==""){
            router.push(`/search/search_ans/${searchText}`)
        }
    }
}

export default Util;