/*
==========================================================
SPACE MAZE ENGINE
Version : 1.0
File    : loader.js
==========================================================
*/

const ASSETS = {

    maps: {},
    sprites: {},
    ui: {},
    sound: {}

};

let totalAssets = 0;
let loadedAssets = 0;

//==========================================================
// LOAD IMAGE
//==========================================================

function loadImage(key, src, group) {

    totalAssets++;

    const img = new Image();

    img.onload = () => {
        loadedAssets++;
        console.log(`Loaded : ${src}`);
    };

    img.onerror = () => {
        // BUG FIX: sebelumnya kalau 1 gambar gagal load, loadedAssets
        // tidak pernah nyampe totalAssets -> loading nyangkut selamanya
        // (layar hitam permanen). Sekarang tetap dihitung "selesai"
        // supaya game tidak macet, error-nya cukup dilaporkan di console.
        loadedAssets++;
        console.error(`Failed : ${src}`);
    };

    img.src = src;

    ASSETS[group][key] = img;

}

//==========================================================
// LOAD AUDIO
//==========================================================
// BUG FIX PENTING (penyebab layar hitam permanen di HP):
// Di banyak browser mobile (terutama iOS Safari), elemen <audio>
// TIDAK akan mulai memuat data sebelum ada interaksi user (kebijakan
// autoplay), sehingga event "loadeddata" bisa jadi tidak pernah
// terpanggil. Kalau loading audio ikut jadi syarat isLoadingComplete(),
// game akan macet selamanya di layar LOADING (hitam) di HP walaupun
// aman-aman saja di desktop.
//
// Solusinya: audio TIDAK lagi dihitung sebagai bagian dari
// totalAssets/loadedAssets. Audio tetap dimuat di background, tapi
// tidak menghalangi game untuk lanjut ke MENU.
//==========================================================

function loadSound(key, src) {

    const audio = new Audio();

    audio.preload = "auto";

    audio.oncanplaythrough = () => {
        console.log(`Loaded : ${src}`);
    };

    audio.onerror = () => {
        console.error(`Failed : ${src}`);
    };

    audio.src = src;

    ASSETS.sound[key] = audio;

}

//==========================================================
// LOAD MAP
//==========================================================

function loadMaps() {

    for (let i = 1; i <= CONFIG.game.totalMaps; i++) {

        loadImage(`map${i}`, `assets/maps/map${i}/map${i}.png`, "maps");
        loadImage(`map${i}_mask`, `assets/maps/map${i}/map${i}_mask.png`, "maps");
        loadImage(`map${i}_object`, `assets/maps/map${i}/map${i}_object.png`, "maps");

    }

}

//==========================================================
// LOAD SPRITE
//==========================================================

function loadSprites() {

    loadImage("rocket", "assets/sprites/rocket.png", "sprites");
    loadImage("finish", "assets/sprites/finish.png", "sprites");

}

//==========================================================
// LOAD UI
//==========================================================

function loadUI() {

    loadImage("start", "assets/ui/ui_start.png", "ui");
    loadImage("win", "assets/ui/ui_win.png", "ui");
    loadImage("lose", "assets/ui/ui_lose.png", "ui");
    loadImage("up", "assets/ui/btn_up.png", "ui");
    loadImage("down", "assets/ui/btn_down.png", "ui");
    loadImage("left", "assets/ui/btn_left.png", "ui");
    loadImage("right", "assets/ui/btn_right.png", "ui");

}

//==========================================================
// LOAD SOUND
//==========================================================

function loadSounds() {

    loadSound("bgm", "assets/sound/bgm.mp3");
    loadSound("click", "assets/sound/click.mp3");
    loadSound("portal", "assets/sound/portal.mp3");
    loadSound("win", "assets/sound/win.mp3");
    loadSound("lose", "assets/sound/lose.mp3");

}

//==========================================================
// LOAD ALL
//==========================================================

function loadAssets() {

    loadMaps();
    loadSprites();
    loadUI();
    loadSounds();

}

//==========================================================
// LOADING STATUS
// (sekarang hanya menunggu gambar, tidak menunggu audio)
//==========================================================

function isLoadingComplete() {

    return loadedAssets === totalAssets;

}
