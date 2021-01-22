<template>
<body>
    <div class="top"></div>
    <div class="all">
        <div class="menu">
            <div class="link" @click="$router.push('/home')">Главная</div>
            <img class="blockator" src="@/assets/arrow.svg">
            <div>{{book.volumeInfo.title}}</div>
        </div>
        <div class="top-content">
            <img class="cover" v-if="book.volumeInfo.imageLinks" :src="book.volumeInfo.imageLinks.thumbnail"/>
            <img class="cover" v-else src="/src/assets/books.png">
            <div class="main-info">
                <h1 class="title">{{book.volumeInfo.title}}</h1>
                <h2 class="author" v-for="author in book.volumeInfo.authors" :key="author.id" >
                    {{author}}
                </h2>
                <div class="category" v-for="category in book.volumeInfo.categories" :key="category" >
                    Жанр: {{category}}</div>
                <div class="date">Год: {{book.volumeInfo.publishedDate}}</div>
                <div class="lng">Язык: {{book.volumeInfo.language}}</div>
                <div class="links">
                    <a :href="book.volumeInfo.infoLink" class="readLink" target="_blank">Читать</a>
                    <p class="favorite-button" @click.prevent="addToFavorite">Добавить в избранное</p>
                    <a v-if="book.accessInfo.acsTokenLink" :href="book.accessInfo.acsTokenLink" class="Скачать">Скачать</a>
                </div>
            </div>
        </div>
    <div v-if="book.volumeInfo.description" class="description">{{book.volumeInfo.description}}</div>
    <!-- <div v-else class="description">Описание отсутсвует</div> -->
    
    </div>
    <div class="comment-section">
        <div>
            <input class="comment-input" type="text" v-model="comment" placeholder="Введите комментарий">
            <button class="comment-button" @click="addComment">Добавить комментарий</button>
        </div>
        <div v-for="comment in comments" :key="comment.id">
            <div class="comment">
                <p>{{comment.username}}</p>
                <p>{{comment.value}}</p>
            </div>
        </div>
    </div>
</body>
</template>

<script>
export default {
    name: 'BookPage',
    props: ['book'],
    data: function() {
    return {
        comments: [],
        comment: ''
        }
    },
    async mounted(){
        try{
            let response = await this.$http.post(`/auth/${this.$route.path}`, {book: this.book} ,{headers: {'Authorization': `Bearer ${localStorage.getItem("jwt")}`}});
            response = await this.$http.get(`/auth/${this.$route.path}`, {headers: {'Authorization': `Bearer ${localStorage.getItem("jwt")}`}});
            this.comments = response.data.comments
            }catch(e){
                console.log(e.response.data);
            }
    },
    methods: {
         async addToFavorite(){
            try{
                let response = await this.$http.post('/auth/user', {book: this.book} ,{headers: {'Authorization': `Bearer ${localStorage.getItem("jwt")}`}});
                console.log(response.data);
            }catch(e){
                console.log(e.response.data);
            }
        },
        async addComment(){
            try{
                let response = await this.$http.post(`/auth/${this.$route.path}/comment`, {book: this.book, text: this.comment} ,{headers: {'Authorization': `Bearer ${localStorage.getItem("jwt")}`}});
                console.log(response.data);
                response = await this.$http.get(`/auth/${this.$route.path}`, {headers: {'Authorization': `Bearer ${localStorage.getItem("jwt")}`}});
                this.comments = response.data.comments
            }catch(e){
                console.log(e.response.data);
            }
        }
    }
}
</script>

<style scoped>
    body{
        background:rgb(235, 235, 235);
        height: 100%;
    }
    .top{
        background: rgb(235, 235, 235);
        height: 50px;
    }

    .link{
        padding-right: 5px;
        cursor: pointer;
    }
    .blockator{
        padding-right: 5px;
        margin-top: 4px;
        height: 10px;
        width: 10px;
    }
    .menu{
        height: 20px;
        text-align-last: left;
        padding: 20px;
        padding-bottom: 0px;
        display: flex;
        flex-direction: row;
        font: 15px/19px RbtRegular;
    }
    .all {
        box-shadow: 0 0 20px #aaa;
        background: white;
        margin-left: 150px;
        margin-right: 150px;
        border: 1px solid black;
    }
    .top-content{
        padding: 20px;
        
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        text-align: left;
    }
    .main-info{
        margin-top: 20px;
        font: 15px/19px RbtRegular;
        display: flex;
        flex-direction: column;
        margin-left: 50px;
        color: #606060;
    }
    .cover{
        border: 1px solid black;
        height: 385px;
        width: 250px;
    }
    .title{
        line-height: normal;
        width: 600px;
        margin-bottom: 10px;
        color: #181818;
        font-size: 28px;
        margin: 0 0 4px 0!important;
        text-transform: uppercase;
    }
    .author{
        padding-top: 10px;
        font-size: 1.5em;
        font-weight: bold;
        margin: 0 0 6px 0!important;
        text-transform: uppercase;
        color: #777;
    }
    .category{
        margin-top: 30px;
        margin-bottom: 7px;
    }
    .date{
        margin-bottom: 7px;
    }
    .lng{
        margin-bottom: 23px;
    }
    .readLink{
    display: inline-block;
    background: #717b87;
    color: #fff;
    padding: 1rem 1.5rem;
    text-decoration: none;
    border-radius: 3px;
    }
    .description{
        padding: 20px;
    }
    .comment-section{
        margin-left: 150px;
        margin-top: 70px;
        
    }
    .comment-input{
        width: 600px;
        margin-right: 10px;
    }
    .comment{
        background: white;
        width: 800px;
        border: 1px solid black;
        padding: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-top: 20px;
    }
    .favorite-button{
        display: inline-block;
        background: #717b87;
        color: #fff;
        padding: 1rem 1.5rem;
        text-decoration: none;
        border-radius: 3px;
        margin-left: 15px;
        cursor: pointer;
    }
</style>