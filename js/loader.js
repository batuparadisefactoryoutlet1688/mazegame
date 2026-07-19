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

        console.error(`Failed : ${src}`);

    };

    img.src = src;

    ASSETS[group][key] = img;

}

//==========================================================
// LOAD AUDIO
//==========================================================

function loadSound(key, src) {

    totalAssets++;

    const audio = new Audio();

    audio.onloadeddata = () => {

        loadedAssets++;

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

        loadImage(
            `map${i}`,
            `assets/maps/map${i}/map${i}.png`,
            "maps"
        );

        loadImage(
            `map${i}_mask`,
            `assets/maps/map${i}/map${i}_mask.png`,
            "maps"
        );

        loadImage(
            `map${i}_object`,
            `assets/maps/map${i}/map${i}_object.png`,
            "maps"
        );

    }

}

//==========================================================
// LOAD SPRITE
//==========================================================

function loadSprites() {

    loadImage(
        "rocket",
        "assets/sprites/rocket.png",
        "sprites"
    );

    loadImage(
        "finish",
        "assets/sprites/finish.png",
        "sprites"
    );

}

//==========================================================
// LOAD UI
//==========================================================

function loadUI() {

    loadImage(
        "start",
        "assets/ui/ui_start.png",
        "ui"
    );

    loadImage(
        "win",
        "assets/ui/ui_win.png",
        "ui"
    );

    loadImage(
        "lose",
        "assets/ui/ui_lose.png",
        "ui"
    );

    loadImage(
        "up",
        "assets/ui/btn_up.png",
        "ui"
    );

    loadImage(
        "down",
        "assets/ui/btn_down.png",
        "ui"
    );

    loadImage(
        "left",
        "assets/ui/btn_left.png",
        "ui"
    );

    loadImage(
        "right",
        "assets/ui/btn_right.png",
        "ui"
    );

}

//==========================================================
// LOAD SOUND
//==========================================================

function loadSounds() {

    loadSound(
        "bgm",
        "assets/sound/bgm.mp3"
    );

    loadSound(
        "click",
        "assets/sound/click.mp3"
    );

    loadSound(
        "portal",
        "assets/sound/portal.mp3"
    );

    loadSound(
        "win",
        "assets/sound/win.mp3"
    );

    loadSound(
        "lose",
        "assets/sound/lose.mp3"
    );

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
//==========================================================

function isLoadingComplete() {

    return loadedAssets === totalAssets;

}