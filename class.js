/*
https://striveschool-api.herokuapp.com/api/deezer/search?q={artist}
https://striveschool-api.herokuapp.com/api/deezer/album/{id}
https://striveschool-api.herokuapp.com/api/deezer/artist/{id}
*/

export class FetchAPI {
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

    async getAlbum(id) {
        return this.#fetchData(this.#ALBUM_URL, id);
    }

    async getArtist(id) {
        return this.#fetchData(this.#ARTIST_URL, id);
    }

}