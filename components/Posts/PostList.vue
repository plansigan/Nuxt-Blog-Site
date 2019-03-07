<template>
    <section class="post-list">
        <PostPreview
            id="1"
            thumbnail="https://www.articlesplanet.info/wp-content/uploads/2018/05/Tech-sector.jpg"
            title="Hello There!"
            PreviewText="This is my first post!"
        />
        <PostPreview
            id="2"
            thumbnail="https://www.articlesplanet.info/wp-content/uploads/2018/05/Tech-sector.jpg"
            title="wazzup!"
            PreviewText="This is my second post!"
        />
        <PostPreview
            id="3"
            thumbnail="https://www.articlesplanet.info/wp-content/uploads/2018/05/Tech-sector.jpg"
            title="Great News!!"
            PreviewText="This is my third post!"
        />
    </section>
</template>

<script>
import PostPreview from '@/components/posts/PostPreview'
    export default {
        components:{
            PostPreview
        }   
    }
</script>

<style scoped>
    .post-list {
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
</style>
