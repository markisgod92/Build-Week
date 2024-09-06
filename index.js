import { FetchAPI, Visualize } from "./class.js";
const fetchApi = new FetchAPI;
const visualizer = new Visualize(document.getElementById("cardContainer"), document.getElementById("playlistContainer"));

window.addEventListener("DOMContentLoaded", async () => {
    visualizer.startLoader();
    try {
        const response = await fetchApi.randomize(15);
        visualizer.stopLoader();
        response.forEach(song => visualizer.createSongCard(song));
    } catch (error) {
        visualizer.stopLoader();
        visualizer.showError();
    }

    try {
        const playlists = await fetchApi.randomize(6);
        playlists.forEach(playlist => visualizer.createPlaylistCard(playlist))
    } catch (error) {
        console.error(error)
    }
})