import { FetchAPI, Visualize } from "./class.js";
const fetchApi = new FetchAPI;
const cardContainer = document.getElementById("cardContainer");
const playlistContainer = document.getElementById("playlistContainer");
const songVisualizer = new Visualize(cardContainer);
const playlistVisualizer = new Visualize(playlistContainer);
const heroImg = document.getElementById("heroImg");
const heroSection = document.getElementById("heroSection");
const player = document.querySelector("audio");
const playerImg = document.getElementById("playerImg");
const playerData = document.getElementById("playerData");
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("progress-bar");
let isPlaying = false;

window.addEventListener("DOMContentLoaded", async () => {
    await Promise.all([fillSongs(), fillsPlaylists(), fillHero()])
    
})

const fillSongs = async () => {
    songVisualizer.startLoader(cardContainer)
    try {

            const response = await fetchApi.randomize(16);
        songVisualizer.stopLoader(cardContainer);
        response.forEach(song => songVisualizer.createSongCard(song));      
    } catch (error) {
        console.log(error)
        songVisualizer.stopLoader(cardContainer);
        songVisualizer.showError(cardContainer);
    }
}

const fillsPlaylists = async () => {
    playlistVisualizer.startLoader(playlistContainer)
    try {
        const response = await fetchApi.randomize(6);
        playlistVisualizer.stopLoader(playlistContainer);
        response.forEach(playlist => playlistVisualizer.createPlaylistCard(playlist));
    } catch (error) {
        playlistVisualizer.stopLoader(playlistContainer);
        playlistVisualizer.showError(playlistContainer);
    }
}

const fillHero = async () => {
    try {
        const response = await fetchApi.randomize(1);
        writeHero(response[0])
    } catch (error) {
        console.error(error)
    }
}

const writeHero = (data) => {
    heroImg.src = data.album.cover;
    heroImg.alt = data.album.title;

    heroSection.querySelector("h5").innerText = data.album.title;
    heroSection.querySelector("h1").innerText = data.title;
    heroSection.querySelector("h3").innerText = data.artist.name;
    heroSection.querySelector("p").innerText = `Ascolta il nuovo singolo di ${data.artist.name}!`;
    
    
    player.src = data.preview;
    playerImg.src = data.album.cover;
    playerImg.alt = data.album.title;

    playerData.querySelector("h5").innerText = data.title;
    playerData.querySelector("h6").innerText = data.artist.name;

    heroSection.querySelector("div > button:first-of-type").addEventListener("click", () => {
        player.play();
        isPlaying = true;
    })
}

playBtn.addEventListener("click", () => {
    isPlaying ? player.pause() : player.play()
    isPlaying = !isPlaying;
})

player.addEventListener("timeupdate", () => {
    const currentTime = player.currentTime;
    const duration = player.duration;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);

    /* currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`; */

    const progress = (currentTime / duration) * 100;
    progressBar.style.width = `${progress}%`;
});