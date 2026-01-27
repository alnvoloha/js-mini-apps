const postsContainer = document.querySelector("#postsContainer");

export function renderHTML(posts){
    if(posts.length == 0){
        postsContainer.innerHTML = "Не найдено!";
    }else{
        postsContainer.innerHTML = "";
        posts.forEach((post, i) => {
            const postE = document.createElement("div");
            const title = document.createElement("div");
            const body = document.createElement("div");
    
            postE.classList = i+1 == posts.length ? "post" : "post _hr";
            title.classList = "postTitle";
            body.classList = "postBody";

    
            title.innerText = post.title;
            body.innerText = post.body;
    
            postE.appendChild(title);
            postE.appendChild(body);
    
            postsContainer.appendChild(postE);
        }) 
    }

}