<template>
  <body>
    <div class="header">
      <router-link tag="a" class="link" :to="{name: 'main'}">Home</router-link>
    </div>
    <book-results :books="favorite"
        @remove="remove"
    ></book-results>
  </body>
</template>

<script>
import BookResults from '@/components/BookResults'
export default {
  props:['fbook'],
  components: {
    'book-results': BookResults,
    },
  data() {
    return {
      book: {},
      user: {},
      favorite: [],
    };
  },
  async mounted(){
      try{
            let response = await this.$http.get('/auth/user',{headers: {'Authorization': `Bearer ${localStorage.getItem("jwt")}`}});
            response.data.books.forEach((book) => this.favorite.push(book.value))
        }catch(e){
            console.log(e.response.data);
        }
  },
  methods:{
      async remove(book){
            try{
                let response = await this.$http.post('/auth/favorite',{book: book},{headers: {'Authorization': `Bearer ${localStorage.getItem("jwt")}`}});
                response = await this.$http.get('/auth/user',{headers: {'Authorization': `Bearer ${localStorage.getItem("jwt")}`}});
                this.favorite.splice(0, this.favorite.length)
                response.data.books.forEach((bbook) => this.favorite.push(bbook.value))
            }catch(e){
                console.log(e.response.data);
        }
      }
  }
};
</script>

<style scoped>
  body{
    background: rgb(236, 236, 236);
    height: 100%
  }
  .header{
    height: 130px;
    background: #717b87;
    display: flex;
    justify-content: center;
  }
  .link{
    display: flex;
    align-items: center;
    color: rgb(236, 236, 236);
    cursor: pointer;
  }
</style>