/*
https://striveschool-api.herokuapp.com/api/deezer/search?q={artist}
https://striveschool-api.herokuapp.com/api/deezer/album/{id}
https://striveschool-api.herokuapp.com/api/deezer/artist/{id}
*/

class FetchAPI {
    #homeArtists = ["queen", "metallica"];
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

const fetchAPI = new FetchAPI;
console.log(fetchAPI.randomize(5))