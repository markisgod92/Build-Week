/*
https://striveschool-api.herokuapp.com/api/deezer/search?q={artist}
https://striveschool-api.herokuapp.com/api/deezer/album/{id}
https://striveschool-api.herokuapp.com/api/deezer/artist/{id}
*/

export class FetchAPI {
    #ALBUM_URL = `https://striveschool-api.herokuapp.com/api/deezer/album/`;

    async getAlbum(id) {
        try {
            const response = await fetch(this.#ALBUM_URL + id)
            if (!response.ok) {
                throw new Error(`Fetch error`)
            }
            return response.json();
        } catch (error) {
            throw error;
        }
    }
}