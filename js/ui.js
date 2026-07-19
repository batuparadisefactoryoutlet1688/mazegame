/*
==========================================================
SPACE MAZE ENGINE
Version : 1.0
File    : ui.js
==========================================================
*/

"use strict";

//==========================================================
// DRAW IMAGE CENTER
// (BUG FIX: sebelumnya fungsi ini tidak pernah didefinisikan
// di ui.js, padahal semua fungsi draw di bawah memakainya)
//==========================================================

function drawImageCenter(image, centerX, centerY, width, height) {

    if (!image) return;

    ENGINE.ctx.drawImage(
        image,
        centerX - (width / 2),
        centerY - (height / 2),
        width,
        height
    );

}

//==========================================================
// DRAW CURRENT MAP
// (BUG FIX: sebelumnya hilang dari ui.js)
//==========================================================

function drawMap() {

    // BUG FIX: map*.png sekarang full size (1238x2201), bukan
    // 1000x1000. Sebelumnya digambar dengan ukuran
    // CONFIG.maze.width/height, sehingga seluruh gambar
    // ter-squish ke kotak yang lebih kecil (background, header,
    // panel bawah, dsb ikut mengecil/bergeser). Sekarang
    // digambar 1:1 pakai CONFIG.map (bukan CONFIG.canvas), supaya
    // ukuran/posisi map tidak ikut berubah kalau canvas resize.

    const map = ASSETS.maps["map" + GAME_DATA.currentMap];

    if (!map) return;

    drawImageCenter(
        map,
        CONFIG.map.centerX,
        CONFIG.map.centerY,
        CONFIG.map.width,
        CONFIG.map.height
    );

}

//==========================================================
// ROCKET FACING ANGLE
// (FITUR BARU: rocket.png defaultnya menghadap KANAN, jadi
// "right" = 0 radian, arah lain dirotasi relatif dari situ)
//==========================================================

function getRocketAngle() {

    switch (GAME_DATA.rocket.facing) {

        case "up":
            return -Math.PI / 2;

        case "down":
            return Math.PI / 2;

        case "left":
            return Math.PI;

        case "right":
        default:
            return 0;

    }

}

//==========================================================
// DRAW ROCKET
// (BUG FIX: sebelumnya hilang dari ui.js)
// FITUR BARU: sprite dirotasi sesuai arah gerak rocket.
//==========================================================

function drawRocket() {

    if (!ASSETS.sprites.rocket) return;

    const angle = getRocketAngle();

    ENGINE.ctx.save();

    ENGINE.ctx.translate(GAME_DATA.rocket.x, GAME_DATA.rocket.y);
    ENGINE.ctx.rotate(angle);

    ENGINE.ctx.drawImage(
        ASSETS.sprites.rocket,
        -GAME_DATA.rocket.width / 2,
        -GAME_DATA.rocket.height / 2,
        GAME_DATA.rocket.width,
        GAME_DATA.rocket.height
    );

    ENGINE.ctx.restore();

}

//==========================================================
// DRAW FINISH
// (BUG FIX: sebelumnya hilang dari ui.js)
//==========================================================

function drawFinish() {

    drawImageCenter(
        ASSETS.sprites.finish,
        GAME_DATA.finish.x,
        GAME_DATA.finish.y,
        GAME_DATA.finish.width,
        GAME_DATA.finish.height
    );

}

//==========================================================
// DRAW BUTTONS
// (BUG FIX: sebelumnya hilang dari ui.js)
//==========================================================

function drawButtons() {

    drawImageCenter(
        ASSETS.ui.up,
        CONFIG.button.up.centerX,
        CONFIG.button.up.centerY,
        CONFIG.button.up.width,
        CONFIG.button.up.height
    );

    drawImageCenter(
        ASSETS.ui.down,
        CONFIG.button.down.centerX,
        CONFIG.button.down.centerY,
        CONFIG.button.down.width,
        CONFIG.button.down.height
    );

    drawImageCenter(
        ASSETS.ui.left,
        CONFIG.button.left.centerX,
        CONFIG.button.left.centerY,
        CONFIG.button.left.width,
        CONFIG.button.left.height
    );

    drawImageCenter(
        ASSETS.ui.right,
        CONFIG.button.right.centerX,
        CONFIG.button.right.centerY,
        CONFIG.button.right.width,
        CONFIG.button.right.height
    );

}

//==========================================================
// TIMER FONT
//==========================================================

function setupUIFont() {

    ENGINE.ctx.textAlign = "center";
    ENGINE.ctx.textBaseline = "middle";
    ENGINE.ctx.font = CONFIG.timer.fontSize + "px Orbitron";

}

//==========================================================
// DRAW TIMER
//==========================================================

function drawTimer() {

    setupUIFont();

    //------------------------------------------------------
    // Shadow
    //------------------------------------------------------

    ENGINE.ctx.shadowBlur = 20;
    ENGINE.ctx.shadowColor = "#FFFFFF";

    //------------------------------------------------------
    // Color
    //------------------------------------------------------

    ENGINE.ctx.fillStyle = "#FFFFFF";

    ENGINE.ctx.fillText(
        getTimerText(),
        CONFIG.timer.centerX,
        CONFIG.timer.centerY
    );

    ENGINE.ctx.shadowBlur = 0;

}

//==========================================================
// DRAW START
//==========================================================

function drawStartUI() {

    drawImageCenter(
        ASSETS.ui.start,
        CONFIG.startScreen.centerX,
        CONFIG.startScreen.centerY,
        CONFIG.startScreen.width,
        CONFIG.startScreen.height
    );

}

//==========================================================
// DRAW WIN
//==========================================================

function drawWinUI() {

    drawImageCenter(
        ASSETS.ui.win,
        CONFIG.winPopup.centerX,
        CONFIG.winPopup.centerY,
        CONFIG.winPopup.width,
        CONFIG.winPopup.height
    );

}

//==========================================================
// DRAW LOSE
//==========================================================

function drawLoseUI() {

    drawImageCenter(
        ASSETS.ui.lose,
        CONFIG.losePopup.centerX,
        CONFIG.losePopup.centerY,
        CONFIG.losePopup.width,
        CONFIG.losePopup.height
    );

}

//==========================================================
// DRAW GAME UI
//==========================================================

function drawGameUI() {

    drawButtons();
    drawTimer();

}
