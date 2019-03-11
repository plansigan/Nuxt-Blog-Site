<template>
    <div class="posts-page">
            <PostList :posts="loadedPosts"/>
    </div>
</template>

<script>
import PostList from '@/components/posts/PostList'
    export default {
        components:{
            PostList
        },
        asyncData(context,callback){
            setTimeout(()=>{
                callback(null,{
                    loadedPosts:[
                        {id:1,title:'FirstPost',previewText:'This is our first post!',thumbnail:'https://www.articlesplanet.info/wp-content/uploads/2018/05/Tech-sector.jpg'},
                        {id:2,title:'SecondPost',previewText:'This is our second post!',thumbnail:'https://www.articlesplanet.info/wp-content/uploads/2018/05/Tech-sector.jpg'},
                        {id:3,title:'ThirdPost',previewText:'This is our third post!',thumbnail:'https://www.articlesplanet.info/wp-content/uploads/2018/05/Tech-sector.jpg'},
                    ]
                })
            },1500)
        }   
    }
</script>



<style scoped>
    .posts-page{
        display:flex;
        justify-content: center;
        align-items: center;
    }
</style>
