<template>
  <div class="search-page">
    <SearchResultToolBar v-model="search"/>
    <div v-for="info in searchResultList" :key="info.id">
      <SearchResultItem :info="info"/>
    </div>
  </div>
</template>

<script>
import SearchResultToolBar from "./components/SearchResultToolBar.vue"
import SearchResultItem from "./components/SearchResultItem.vue"

const DB = require("./data/search.json")

export default {
  components:{
    SearchResultToolBar,
    SearchResultItem
  },
  data(){
    return {
      searchResultList:[],
    }
  },
  computed:{
    search(){
      return this.$route.params.searchText
    }
  },
  created(){
    this.doSearchResult()
  },
  beforeRouteUpdate(to, from, next){
    next()
    this.doSearchResult();
  },
  methods:{
    doSearchResult(){
      const { searchText } = this.$route.params;
      if(DB.hasOwnProperty(searchText)){
        this.searchResultList = DB[searchText]
      }else{
        this.searchResultList = []
      }
      console.log(searchText,this.searchResultList)
    }
  },
}
</script>
