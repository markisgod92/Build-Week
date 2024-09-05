import { FetchAPI, Visualize } from "./class.js";
const fetchApi = new FetchAPI;
const visualizer = new Visualize(document.getElementById("cardContainer"));

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
})