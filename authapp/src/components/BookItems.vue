<template>
    <div class = "card">
        <div class="cover">
            <img v-if="book.volumeInfo.imageLinks" :src="book.volumeInfo.imageLinks.thumbnail"/>
            <img v-else src="/src/assets/books.png">
        </div>
        <div class="links">
        <a :href="book.volumeInfo.infoLink" class="bigLink">Читать</a>
        <router-link tag="a" class="link" :to="{name: `book`, params: {book: book, bookName: book.volumeInfo.title}}">Описание</router-link>
        <div v-if="favorite()">
            <div @click="delteFromFavorite">
                <div class="workWithFavorite" @click="$emit('delete-favorite', book)">Удалить из избранного</div>
            </div>
        </div>
        </div>
        <div class = "description">
            <p class="title">{{book.volumeInfo.title}}</p>
            <hr class="line">
        <div class="author" v-for="author in book.volumeInfo.authors" :key="author.id" >
            {{author}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        book: {
            type: Object,
            required: true
        },
        data() {
            return{
                updated: false
            }
        }
    },
    methods:{
        favorite: function() {
            return this.$route.path.indexOf('/favorite') === 0
        },
        delteFromFavorite(){
            const newBook = this.book
            this.$emit('delete-favorite', newBook)
        },
}
}
</script>
<style scoped>
.card {
    font-family: "Abril Fatface", serif;
    background: rgb(235, 235, 235);
    width: 330px;
    height: 390px;
    box-shadow: 0 0 20px #aaa;
    margin: 25px;
    padding: 10px 10px 0 10px;
    transition: height 1s;
}


.cover {
    border: 2px solid gray;
    height: 60%;
    overflow: hidden;
}
.description{
    margin-top: 5px;
    height: 30%;
    text-align: center;
    text-overflow: ellipsis;
    overflow: auto;
}
.links{
    display:flex;
    flex-direction: row;
}
.bigLink{
    font-size: 13px;
    margin-right: 5px;
    color: rgb(100, 100, 100);
    text-decoration: none;
}
.bigLink:visited{
    color: rgb(100, 100, 100);
}
.link{
    font-size: 13px;
    padding-left: 5px;
    margin-right: 5px;
    border-left: 1px solid black;
    color: rgb(100, 100, 100);
    text-decoration: none;
}
.link:visited{
    color: rgb(100, 100, 100);
}
.workWithFavorite{
    font-size: 13px;
    padding-left: 5px;
    border-left: 1px solid black;
    color: rgb(100, 100, 100);
    text-decoration: none;
    cursor: pointer;
}
.cover img {
    width: 100%;
}
.line{
    border: none;
    height: 1px;
    width: 30%;
    background-color: rgb(194, 194, 194);
}
.title{
    font-size: 18px;
}
.author{
    margin-top: 10px;
    font-size: 15px;
}
</style>