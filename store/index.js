import Vuex from 'vuex'


const  createStore = () => {
    return new Vuex.Store({
        state:{
            loadedPosts:[]
        },
        mutations:{
            setPosts(state,posts){
                state.loadedPosts = posts
            }
        },
        actions:{
            nuxtServerInit(vuexContext,context){
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        vuexContext.commit('setPosts',[
                                {id:"1",title:'FirstPost',previewText:'This is our first post!',thumbnail:'https://www.articlesplanet.info/wp-content/uploads/2018/05/Tech-sector.jpg'},
                                {id:"2",title:'SecondPost',previewText:'This is our second post!',thumbnail:'https://www.articlesplanet.info/wp-content/uploads/2018/05/Tech-sector.jpg'},
                                {id:"3",title:'ThirdPost',previewText:'This is our third post!',thumbnail:'https://www.articlesplanet.info/wp-content/uploads/2018/05/Tech-sector.jpg'},
                            ])
                    },1500)
                })
            },
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