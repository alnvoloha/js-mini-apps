import { renderPosts, debounce } from "./posts.js";

const findInput = document.querySelector("#find");
const debounceMS = 500;
const dRenderPosts = debounce(function(){
    renderPosts(encodeURIComponent(findInput.value));
}, debounceMS);

main();

function main(){
    renderPosts();

    findInput.addEventListener("input", function(){
        dRenderPosts();
    })

}