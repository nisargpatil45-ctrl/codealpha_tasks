const songs = [
    { title: "Song One", artist: "Artist A", src: "song1.mp3" },
    { title: "Song Two", artist: "Artist B", src: "song2.mp3" },
    { title: "Song Three", artist: "Artist C", src: "song3.mp3" }
];

let index = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

// Load song
function loadSong(i) {
    const song = songs[i];
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
    highlightPlaylist(i);
}

// Play/Pause
function playMusic() {
    audio.play();
    isPlaying = true;
    playBtn.innerText = "⏸️";
}

function pauseMusic() {
    audio.pause();
    isPlaying = false;
    playBtn.innerText = "▶️";
}

playBtn.addEventListener("click", () => {
    isPlaying ? pauseMusic() : playMusic();
});

// Next / Previous
nextBtn.addEventListener("click", () => {
    index = (index + 1) % songs.length;
    loadSong(index);
    playMusic();
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    playMusic();
});

// Progress bar update
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;

    let curMin = Math.floor(audio.currentTime / 60);
    let curSec = Math.floor(audio.currentTime % 60);
    if (curSec < 10) curSec = "0" + curSec;
    current.innerText = `${curMin}:${curSec}`;
});

// Seeking
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value * audio.duration) / 100;
});

// Duration display
audio.addEventListener("loadedmetadata", () => {
    let durMin = Math.floor(audio.duration / 60);
    let durSec = Math.floor(audio.duration % 60);
    if (durSec < 10) durSec = "0" + durSec;
    duration.innerText = `${durMin}:${durSec}`;
});

// Volume
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Autoplay next song
audio.addEventListener("ended", () => {
    nextBtn.click();
});

// Playlist creation
songs.forEach((song, i) => {
    let li = document.createElement("li");
    li.innerText = song.title + " - " + song.artist;
    li.addEventListener("click", () => {
        index = i;
        loadSong(index);
        playMusic();
    });
    playlist.appendChild(li);
});

// Highlight playing song
function highlightPlaylist(i) {
    [...playlist.children].forEach((li, idx) => {
        li.style.background = idx === i ? "#5c5c60" : "#3b3b3f";
    });
}

// Load first song
loadSong(index);
