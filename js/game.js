/*
==========================================================
SPACE MAZE ENGINE
Version : 1.0
File    : game.js
==========================================================
*/

"use strict";

//==========================================================
// GAME STATE
//==========================================================

const GAME_STATE = {

    LOADING: "loading",
    MENU: "menu",
    PLAYING: "playing",
    WIN: "win",
    LOSE: "lose"

};

//==========================================================
// ENGINE
//==========================================================

const ENGINE = {

    canvas: null,
    ctx: null,

    hiddenCanvas: null,
    hiddenCtx: null,

    state: GAME_STATE.LOADING,

    running: false,

    lastTime: 0,
    deltaTime: 0,

    fps: 60

};

//==========================================================
// CREATE MAIN CANVAS
//==========================================================

function createCanvas() {

    ENGINE.canvas = document.createElement("canvas");
    ENGINE.canvas.width = CONFIG.canvas.width;
    ENGINE.canvas.height = CONFIG.canvas.height;

    document.body.appendChild(ENGINE.canvas);

    ENGINE.ctx = ENGINE.canvas.getContext("2d");

}

//==========================================================
// CREATE HIDDEN CANVAS
//==========================================================

function createHiddenCanvas() {

    ENGINE.hiddenCanvas = document.createElement("canvas");
    ENGINE.hiddenCanvas.width = CONFIG.canvas.width;
    ENGINE.hiddenCanvas.height = CONFIG.canvas.height;

    // PERFORMANCE FIX: willReadFrequently:true memberi tahu browser
    // dari awal bahwa canvas ini akan sering dibaca pixel-nya
    // (getImageData), sehingga browser bisa pakai jalur render yang
    // lebih cepat untuk itu (menghilangkan warning di console juga).
    ENGINE.hiddenCtx = ENGINE.hiddenCanvas.getContext("2d", { willReadFrequently: true });

}

//==========================================================
// CLEAR SCREEN
//==========================================================

function clearScreen() {

    ENGINE.ctx.fillStyle = CONFIG.canvas.background;

    ENGINE.ctx.fillRect(
        0,
        0,
        CONFIG.canvas.width,
        CONFIG.canvas.height
    );

}

//==========================================================
// CHANGE GAME STATE
//==========================================================

function changeState(newState) {

    ENGINE.state = newState;
    console.log("STATE :", ENGINE.state);

}

//==========================================================
// START ENGINE (dipanggil sekali saat aplikasi pertama load)
//==========================================================

function startEngine() {

    ENGINE.running = true;
    loadAssets();

}

//==========================================================
// CHECK LOADING
//==========================================================
// BUG FIX: sebelumnya fungsi ini juga memanggil randomMap() dan
// readObjectMap() di sini, padahal itu seharusnya terjadi setiap
// game DIMULAI (termasuk saat restart), bukan cuma sekali saat
// loading pertama. Logic itu dipindah ke startGame().
//==========================================================

function updateLoading() {

    if (isLoadingComplete()) {
        changeState(GAME_STATE.MENU);
    }

}

//==========================================================
// START GAME
// FITUR BARU: dipanggil dari input.js saat pemain tap layar MENU.
//
// BUG FIX PENTING: sebelumnya urutannya randomMap() -> readObjectMap()
// -> startGameData(). Padahal startGameData() (di gameData.js) DI
// DALAMNYA juga memanggil resetGameData() + randomMap() lagi -> posisi
// rocket & finish yang baru saja dibaca readObjectMap() jadi ketimpa
// balik ke (0,0), sehingga jarak rocket-ke-finish langsung 0 dan
// checkFinish() otomatis true -> auto "menang" begitu game dimulai.
//
// Urutan yang benar: reset & pilih map dulu (lewat startGameData()),
// BARU baca posisi start/finish/portal untuk map yang sudah fix itu.
//==========================================================

function startGame() {

    startGameData();
    readObjectMap();

    changeState(GAME_STATE.PLAYING);

}

//==========================================================
// RESET GAME (kembali ke menu, layar start.png)
//==========================================================

function resetGame() {

    resetGameData();
    changeState(GAME_STATE.MENU);

}

//==========================================================
// RESTART GAME
// Dipanggil dari input.js saat pemain tap layar WIN / LOSE.
// Sesuai request: setelah menang/kalah, tap popup -> KEMBALI KE
// START SCREEN dulu (bukan langsung main lagi). Untuk main lagi,
// pemain tap start screen seperti biasa (memanggil startGame()).
//==========================================================

function restartGame() {

    resetGame();

}

//==========================================================
// UPDATE
//==========================================================

function update() {

    switch (ENGINE.state) {

        case GAME_STATE.LOADING:
            updateLoading();
            break;

        case GAME_STATE.MENU:
            break;

        case GAME_STATE.PLAYING:
            updatePlayer();
            updateTimer(ENGINE.deltaTime);
            break;

        case GAME_STATE.WIN:
            break;

        case GAME_STATE.LOSE:
            break;

    }

}

//==========================================================
// DRAW
//==========================================================

function draw() {

    clearScreen();

    switch (ENGINE.state) {

        case GAME_STATE.LOADING:
            break;

        case GAME_STATE.MENU:
            drawStartUI();
            break;

        case GAME_STATE.PLAYING:
            drawMap();
            drawFinish();
            drawRocket();
            drawGameUI();
            break;

        case GAME_STATE.WIN:
            drawMap();
            drawFinish();
            drawRocket();
            drawTimer();
            drawWinUI();
            break;

        case GAME_STATE.LOSE:
            drawMap();
            drawFinish();
            drawRocket();
            drawTimer();
            drawLoseUI();
            break;

    }

}

//==========================================================
// GAME LOOP
//==========================================================

function gameLoop(time) {

    if (!ENGINE.running) return;

    ENGINE.deltaTime = time - ENGINE.lastTime;
    ENGINE.lastTime = time;

    update();
    draw();

    requestAnimationFrame(gameLoop);

}
