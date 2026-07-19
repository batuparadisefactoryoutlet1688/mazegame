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

    ENGINE.hiddenCtx = ENGINE.hiddenCanvas.getContext("2d");

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
// FITUR BARU: sebelumnya tidak ada fungsi untuk memulai game dari
// layar menu. Dipanggil dari input.js saat pemain tap layar MENU.
//==========================================================

function startGame() {

    randomMap();
    readObjectMap();
    startGameData();

    changeState(GAME_STATE.PLAYING);

}

//==========================================================
// RESTART GAME
// FITUR BARU: dipanggil dari input.js saat pemain tap layar
// WIN / LOSE. Untuk saat ini perilakunya sama seperti startGame()
// (map baru dipilih random lagi setiap kali main).
//==========================================================

function restartGame() {

    startGame();

}

//==========================================================
// RESET GAME (kembali ke menu tanpa langsung main)
//==========================================================

function resetGame() {

    resetGameData();
    changeState(GAME_STATE.MENU);

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
            drawMap();
            drawButtons();
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
            drawGameUI();
            drawWinUI();
            break;

        case GAME_STATE.LOSE:
            drawMap();
            drawFinish();
            drawRocket();
            drawGameUI();
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