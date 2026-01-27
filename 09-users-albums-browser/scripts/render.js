import { usersEl, albumsEl } from "./const.js";
import { createWithText, wrapper } from "./helper.js";


export function renderUsers(users) {
    usersEl.innerHTML = "Users";

    users.forEach((user) => {
        const a = createWithText("a", user.name);
        a.href = `#users/${user.id}/albums`;
        a.addEventListener("click", () => {
            showUserAlbums(user.id, users);
        });
        const div = wrapper(a);
        
        usersEl.appendChild(div);
    });
}

function showUserAlbums(userId, users) {
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .then((r) => r.json())
        .then((albums) => {
            usersEl.innerHTML = "Albums";
            const aButtonUsers = createWithText("a", "Back to users");
            aButtonUsers.href = "#users";
            aButtonUsers.addEventListener("click", () => {
                albumsEl.innerHTML = "";
                renderUsers(users);
            });

            const div = document.createElement("div");
            div.appendChild(aButtonUsers);

            albums.forEach((album) => {
                const a = createWithText("a", album.title);
                a.href = `#users/${userId}/albums/${album.id}`;
                a.addEventListener("click", () => {
                    showUserPhotos(userId, album.id, users);
                });

                div.appendChild(a);
                albumsEl.appendChild(div);
            });
        });
}

function showUserPhotos(userId, albumId, users) {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        .then((r) => r.json())
        .then((photos) => {
            usersEl.innerHTML = "Photos";
            albumsEl.innerHTML = "";

            const photosEl = document.querySelector("#photos");
            photosEl.innerHTML = "";

            const aButtonUsers = createWithText("a", "Back to users\n");
            aButtonUsers.href = "#users";
            aButtonUsers.addEventListener("click", () => {
                albumsEl.innerHTML = "";
                photosEl.innerHTML = "";
                renderUsers(users);
            });

            const aButtonAlbums = createWithText("a", "Back to albums");
            aButtonAlbums.href = `#users/${userId}/albums`;
            aButtonAlbums.addEventListener("click", () => {
                photosEl.innerHTML = "";
                albumsEl.innerHTML = "";
                showUserAlbums(userId, users);
            });

            const div = document.createElement("div");
            div.appendChild(aButtonUsers);
            div.appendChild(aButtonAlbums);

            photos.forEach((photo) => {
                const h2 = createWithText("h2", photo.id);

                const img = document.createElement("img");
                img.src = photo.url;

                div.appendChild(h2);
                div.appendChild(img);

                photosEl.appendChild(div);
            });
        });
}



