import React,{useState, useCallback, useReducer } from 'react';

const PostContext = React.createContext({});

export default PostContext;

function postReducer(state, action){
    switch(action.type){
        case 'addPosts':{
            const newPosts =[...state];
            action.posts.forEach((post)=>{
                const exists = newPosts.find((p)=>p._id === post._id);
                if(!exists){
                    newPosts.push(post);
                }
            })

            return newPosts;
        }
        case 'deletePost':{
            const newPosts =[];
           
            state.forEach((post)=>{
                if(post._id !== action.postId){
                    newPosts.push(post);
                }
            })
            return newPosts;
        }
        default:
            return state;
    }
}

export const PostProvider =({children})=>{
    const [posts, dispatch]= useReducer(postReducer, []);
    const [noMorePosts, setNoMorePost] = useState(false);

    const deletePost = useCallback((postId)=>{
        dispatch({
            type:'deletePost',
            postId
        })
    },[])

    const setPostsFromSSR = useCallback((postsFromSSR =[])=>{
        dispatch({
            type:'addPosts',
            posts:postsFromSSR
        })
    },[])

    const getPosts = useCallback(async ({lastPostDate, getNewerPosts =false})=>{
        const result = await fetch('/api/getPosts',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({lastPostDate, getNewerPosts})
        })

        const json = await result.json();
        const postsResult = json.posts ||[];
    

        if(postsResult.length <5){
            setNoMorePost(true);
        }

        dispatch({
            type:'addPosts',
            posts:postsResult
        })
    },[])


    const getPublishedPosts = useCallback(async ({lastPostDate, getNewerPosts =false})=>{
        const result = await fetch('/api/getPublishedPosts',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({lastPostDate, getNewerPosts})
        })

        const json = await result.json();
        const postsResult = json.posts ||[];
    

        if(postsResult.length <5){
            setNoMorePost(true);
        }

        dispatch({
            type:'addPosts',
            posts:postsResult
        })
    },[])

    const addViewCount  = useCallback(async ({postId})=>{
        try{
            const response = await fetch('/api/addView',{
              method:'POST',
              headers:{
                'content-type':'application/json'
              },
              body: JSON.stringify({postId})
            })
      
            await response.json();
      
          
          }catch(e){
            console.log("add view count error",e);
          }
    },[])


    return (<PostContext.Provider value={{posts, 
    setPostsFromSSR, getPosts, 
    noMorePosts, deletePost,
     getPublishedPosts,
     addViewCount}}>
        {children}
    </PostContext.Provider>)
}