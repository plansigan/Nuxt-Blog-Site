import Vuex from 'vuex'
import axios from 'axios'


const  createStore = () => {
    return new Vuex.Store({
        state:{
            loadedPosts:[]
        },
        mutations:{
            setPosts(state,posts){
                state.loadedPosts = posts
            },
            addPost(state,post){
                state.loadedPosts.push(post)
            },
            editPost(state,editedPost){
               const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost)
               ;
               state.loadedPosts[postIndex] = editedPost 
            }
        },
        actions:{
            nuxtServerInit(vuexContext,context){
                return axios.get('https://nuxt-blog-2affd.firebaseio.com/posts.json')
                        .then(res=>{
                            const postsArray = []
                            for(const key in res.data){
                                postsArray.push({...res.data[key],id:key})
                            }
                            vuexContext.commit('setPosts',postsArray)
                        })
                        .catch(e=>{context.error(e)})
                            // return new Promise((resolve,reject)=>{
                            //     setTimeout(()=>{
                            //         vuexContext.commit('setPosts',[
                            //                 {id:"1",title:'FirstPost',previewText:'This is our first post!',thumbnail:'https://www.articlesplanet.info/wp-content/uploads/2018/05/Tech-sector.jpg'},
                            //                 {id:"2",title:'SecondPost',previewText:'This is our second post!',thumbnail:'https://www.articlesplanet.info/wp-content/uploads/2018/05/Tech-sector.jpg'},
                            //                 {id:"3",title:'ThirdPost',previewText:'This is our third post!',thumbnail:'https://www.articlesplanet.info/wp-content/uploads/2018/05/Tech-sector.jpg'},
                            //             ])
                            //             resolve()
                            //     },1500)
                            // })
            },
            addPost(vuexContext,post){
                const createPost = {
                    ...post,
                    updatedDate:new Date()
                }
                return axios.post('https://nuxt-blog-2affd.firebaseio.com/posts.json',createPost)
                    .then(res => {
                        vuexContext.commmit('addPost',{...createdPost,id:res.data.name})
                    })
                    .catch(e => {console.log(e)})
            },
            editPost(vuexContext,editedPost){},
            setPosts(vuexContext,posts){
                vuexContext.commit('setPosts',posts);
            }
        },
        getters:{
            loadedPosts(state){
                return state.loadedPosts
            }
        }
    });
}

export default createStore