import Vuex from 'vuex'


const  createStore = () => {
    return new Vuex.Store({
        state:{
            loadedPosts:[],
            token:null
        },
        mutations:{
            setPosts(state,posts){
                state.loadedPosts = posts
            },
            addPost(state,post){
                state.loadedPosts.push(post)
            },
            editPost(state,editedPost){
               const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)
               ;
               state.loadedPosts[postIndex] = editedPost 
            },
            setToken(state,token){
                state.token = token
            },
            clearToken(state){
                state.token = null
            }
        },
        actions:{
            nuxtServerInit(vuexContext,context){
                return  context.app.$axios
                        .$get(`/posts.json`)
                        .then(data =>{
                            const postsArray = []
                            for(const key in data){
                                postsArray.push({...data[key],id:key})
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
                const createdPost = {
                    ...post,
                    updatedDate:new Date()
                }
                return this.$axios
                        .$post(`/posts.json`,createdPost)
                        .then(data => {
                            vuexContext.commit('addPost',{...createdPost,id:data.name})
                        })
                        .catch(e => {console.log(e)})
            },
            editPost(vuexContext,editedPost){
                return this.$axios
                    .$put(`/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`,editedPost)
                    .then(data => {
                        vuexContext.commit('editPost',editedPost)
                    })
                    .catch(e => {console.log(e)})
            },
            setPosts(vuexContext,posts){
                vuexContext.commit('setPosts',posts);
            },
            authenticateUser(vuexContext,authData){
                let authUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.fbAPIKey}` 
                
                if(!authData.isLogin) {
                    authUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.fbAPIKey}`    
                }
                
                this.$axios.$post(authUrl,{
                    email:authData.email,
                    password:authData.password,
                    returnSecureToken: true
                    }).then(result => {
                            //store the token to state.token
                            vuexContext.commit('setToken',result.idToken);
                            localStorage.setItem('token',result.idToken);
                            localStorage.setItem('tokenExpiration',new Date().getTime()  + result.expiresIn * 1000);
                            vuexContext.dispatch('setLogOutTimer',result.expiresIn * 1000);
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            setLogout(vuexContext,duration){
                setTimeout(()=>{
                    vuexContext.commit('clearToken')
                },duration)
            },
            initAuth(vuexContext){
                const token = localStorage.getItem('token')
                const expirationDate = localStorage.getItem('tokenExpiration');

                if(newDate().getTime() > +expirationDate || !token){
                    return;
                }

                vuexContext.dispatch('setLogoutTimer',+expirationDate - new Date().getTime())
                vuexContext.commit('setToken',token);
            }
        },
        getters:{
            loadedPosts(state){
                return state.loadedPosts
            },
            isAuthenticated(state){
                return state.token != null
            }
        }
    });
}

export default createStore