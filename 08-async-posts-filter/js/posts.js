import { renderHTML } from "./postsRender.js";

const postsUrl = "https://jsonplaceholder.typicode.com/posts";


export function renderPosts(filter = null){
    getPosts(filter).then(posts => {
        try{
            renderHTML(posts);
        }catch(e){
            throw new Error(e);
        }
    });
    
}

async function getPosts(filter){
   let url = postsUrl;
   if(filter != null) {url = url + "?title_like=" + filter}
    return fetchData(url);
}

async function fetchData(url){
    return fetch(url).then(response => response.json());
}


export function debounce(callback, delay) {
    let timer
    return function() {
      clearTimeout(timer)
      timer = setTimeout(() => {
        callback();
      }, delay)
    }
  }