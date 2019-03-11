<template>
    <section class="post-list">
        <PostPreview
            v-for="post in posts"
            :key="post.id"
            :is-admin="isAdmin"
            :id="post.id"
            :thumbnail="post.thumbnail"
            :title="post.title"
            :PreviewText="post.previewText"/>
    </section>
</template>
<!-- https://www.articlesplanet.info/wp-content/uploads/2018/05/Tech-sector.jpg-->
<script>
import PostPreview from '@/components/posts/PostPreview'
    export default {
        components:{
            PostPreview
        },
        props:{
            isAdmin:{
                type:Boolean,
                default:false
            },
            posts:{
                type:Array,
                required:true
            }
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
