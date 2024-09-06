/*
https://striveschool-api.herokuapp.com/api/deezer/search?q={artist}
https://striveschool-api.herokuapp.com/api/deezer/album/{id}
https://striveschool-api.herokuapp.com/api/deezer/artist/{id}
*/

export class FetchAPI {
    #homeArtists = ["queen", "metallica", "led zeppelin", "iron maiden", "black sabbath", "tool"];
    #SEARCH_URL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`;
    #ALBUM_URL = `https://striveschool-api.herokuapp.com/api/deezer/album/`;
    #ARTIST_URL = `https://striveschool-api.herokuapp.com/api/deezer/artist/`;

    async #fetchData(url, query) {
        try {
            const response = await fetch(url + query)
            if (!response.ok) {
                throw new Error(`Fetch error`)
            }
            return response.json();
        } catch (error) {
            throw error;
        }
    }

    async #fetchAll() {
        const promises = this.#homeArtists.map(artist => this.#fetchData(this.#SEARCH_URL, artist).catch(error => null));
        const data = await Promise.all(promises);
        const results =  data.flatMap(item => item.data);
        return results;
    }

    #shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const x = Math.floor(Math.random() * (i + 1));
            [array[i], array[x]] = [array[x], array[i]];
        }
        return array;
    }

    async getAlbum(id) {
        return this.#fetchData(this.#ALBUM_URL, id);
    }

    async getArtist(id) {
        return this.#fetchData(this.#ARTIST_URL, id);
    }

    async randomize(qty) {
        // ritorna X brani degli artisti preferiti in ordine casuale
        const data = await this.#fetchAll();
        return this.#shuffleArray(data).slice(0, qty)
    }
}

export class Visualize {
    constructor(cardContainer, playlistContainer) {
        this.cardContainer = cardContainer;
        this.playlistContainer = playlistContainer;
    }

    startLoader() {
        this.cardContainer.replaceChildren();

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "loader h-100 w-100 d-flex justify-content-center align-items-center");

        const spinner = document.createElement("div");
        spinner.setAttribute("class", "spinner-border");
        spinner.role = "status";

        const span = document.createElement("span");
        span.setAttribute("class", "visually-hidden");
        span.innerText = "Loading..."

        spinner.appendChild(span);
        wrapper.appendChild(spinner);
        this.cardContainer.appendChild(wrapper);
    }

    stopLoader() {
        document.querySelector(".loader").remove();
    }

    showError() {
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "h-100 w-100 d-flex justify-content-center align-items-center");

        const div = document.createElement("div");
        div.setAttribute("class", "d-flex flex-column align-items-center");

        const icon = document.createElement("i");
        icon.setAttribute("class", "bi bi-bug fs-1");

        const span = document.createElement("span");
        span.innerText = "Error, try to refresh page."

        div.append(icon, span);
        wrapper.appendChild(div);
        this.cardContainer.appendChild(wrapper);
    }

    createSongCard(data) {
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "col")

        const card = document.createElement("div");
        card.setAttribute("class", "card h-100 bg-dark text-light rounded rounded-4 p-3");

        const img = document.createElement("img");
        img.setAttribute("class", "card-img-top object-fit-cover rounded rounded-4");
        img.src = data.album.cover;
        img.alt = data.album.title;

        const cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body d-flex flex-column justify-content-between gap-2");

        const title = document.createElement("h5");
        title.setAttribute("class", "card-title");
        title.innerText = data.title;

        const artist = document.createElement("h6");
        artist.setAttribute("class", "card-subtitle");
        artist.innerText = data.artist.name;

        const album = document.createElement("a");
        album.setAttribute("class", "card-text");
        album.innerText = data.album.title;
        album.href = `./album.html?id=${data.album.id}`

        cardBody.append(title, artist, album);
        card.append(img, cardBody);
        wrapper.appendChild(card);
        this.cardContainer.appendChild(wrapper);
    }

    createPlaylistCard(data) {
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "col-12 col-md-6")

        const card = document.createElement("div");
        card.setAttribute("class", "bg-dark text-light row g-0");

        const imgDiv = document.createElement("div");
        imgDiv.setAttribute("class", "col-4");

        const img = document.createElement("img");
        img.setAttribute("class", "img-fluid object-fit-cover");
        img.src = data.album.cover;
        img.alt = data.album.title;

        const cardBody = document.createElement("div");
        cardBody.setAttribute("class", "col-8 d-flex flex-column justify-content-center");

        const title = document.createElement("h5");
        title.setAttribute("class", "card-title");
        title.innerText = data.title;

        imgDiv.appendChild(img);
        cardBody.appendChild(title);
        card.append(imgDiv, cardBody);
        wrapper.append(card);
        this.playlistContainer.appendChild(wrapper);
    }
}




/*
{
    "id": 568121032,
    "readable": true,
    "title": "Another One Bites The Dust",
    "title_short": "Another One Bites The Dust",
    "title_version": "",
    "link": "https://www.deezer.com/track/568121032",
    "duration": 217,
    "rank": 693636,
    "explicit_lyrics": false,
    "explicit_content_lyrics": 0,
    "explicit_content_cover": 0,
    "preview": "https://cdn-preview-9.dzcdn.net/stream/c-9cf374f319133b4d8aa8c6a2cb2394cf-8.mp3",
    "md5_image": "8b8fc5d117f9357b79f0a0a410a170e8",
    "artist": {
        "id": 412,
        "name": "Queen",
        "link": "https://www.deezer.com/artist/412",
        "picture": "https://api.deezer.com/artist/412/image",
        "picture_small": "https://e-cdns-images.dzcdn.net/images/artist/5d9c00d0f36a4a68550d153d7dbf0b93/56x56-000000-80-0-0.jpg",
        "picture_medium": "https://e-cdns-images.dzcdn.net/images/artist/5d9c00d0f36a4a68550d153d7dbf0b93/250x250-000000-80-0-0.jpg",
        "picture_big": "https://e-cdns-images.dzcdn.net/images/artist/5d9c00d0f36a4a68550d153d7dbf0b93/500x500-000000-80-0-0.jpg",
        "picture_xl": "https://e-cdns-images.dzcdn.net/images/artist/5d9c00d0f36a4a68550d153d7dbf0b93/1000x1000-000000-80-0-0.jpg",
        "tracklist": "https://striveschool-api.herokuapp.com/api/deezer/artist/412/top?limit=50",
        "type": "artist"
    },
    "album": {
        "id": 75621062,
        "title": "Bohemian Rhapsody (The Original Soundtrack)",
        "cover": "https://api.deezer.com/album/75621062/image",
        "cover_small": "https://e-cdns-images.dzcdn.net/images/cover/8b8fc5d117f9357b79f0a0a410a170e8/56x56-000000-80-0-0.jpg",
        "cover_medium": "https://e-cdns-images.dzcdn.net/images/cover/8b8fc5d117f9357b79f0a0a410a170e8/250x250-000000-80-0-0.jpg",
        "cover_big": "https://e-cdns-images.dzcdn.net/images/cover/8b8fc5d117f9357b79f0a0a410a170e8/500x500-000000-80-0-0.jpg",
        "cover_xl": "https://e-cdns-images.dzcdn.net/images/cover/8b8fc5d117f9357b79f0a0a410a170e8/1000x1000-000000-80-0-0.jpg",
        "md5_image": "8b8fc5d117f9357b79f0a0a410a170e8",
        "tracklist": "https://api.deezer.com/album/75621062/tracks",
        "type": "album"
    },
    "type": "track"
}
*/