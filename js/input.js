/*
==========================================================
SPACE MAZE ENGINE
Version : 1.0
File    : input.js
==========================================================
*/

"use strict";

//==========================================================
// INPUT STATE
//==========================================================

const INPUT = {

    up: false,

    down: false,

    left: false,

    right: false

};

//==========================================================
// BUTTON AREA
//==========================================================

const BUTTON = {

    up: {
        x: CONFIG.button.up.centerX - (CONFIG.button.up.width / 2),
        y: CONFIG.button.up.centerY - (CONFIG.button.up.height / 2),
        width: CONFIG.button.up.width,
        height: CONFIG.button.up.height
    },

    down: {
        x: CONFIG.button.down.centerX - (CONFIG.button.down.width / 2),
        y: CONFIG.button.down.centerY - (CONFIG.button.down.height / 2),
        width: CONFIG.button.down.width,
        height: CONFIG.button.down.height
    },

    left: {
        x: CONFIG.button.left.centerX - (CONFIG.button.left.width / 2),
        y: CONFIG.button.left.centerY - (CONFIG.button.left.height / 2),
        width: CONFIG.button.left.width,
        height: CONFIG.button.left.height
    },

    right: {
        x: CONFIG.button.right.centerX - (CONFIG.button.right.width / 2),
        y: CONFIG.button.right.centerY - (CONFIG.button.right.height / 2),
        width: CONFIG.button.right.width,
        height: CONFIG.button.right.height
    }

};

//==========================================================
// RESET INPUT
//==========================================================

function resetInput() {

    INPUT.up = false;
    INPUT.down = false;
    INPUT.left = false;
    INPUT.right = false;

}

//==========================================================
// CHECK AREA
//==========================================================

function insideButton(px, py, button) {

    return (
        px >= button.x &&
        px <= button.x + button.width &&
        py >= button.y &&
        py <= button.y + button.height
    );

}

//==========================================================
// TOUCH POSITION
//==========================================================

function getTouchPosition(event) {

    // BUG FIX: sebelumnya pakai variabel global "canvas" yang
    // tidak pernah didefinisikan -> ReferenceError saat disentuh.
    const rect = ENGINE.canvas.getBoundingClientRect();

    const scaleX = ENGINE.canvas.width / rect.width;
    const scaleY = ENGINE.canvas.height / rect.height;

    const touch = event.touches[0];

    return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
    };

}

//==========================================================
// MOUSE POSITION
//==========================================================

function getMousePosition(event) {

    // BUG FIX: sama seperti getTouchPosition(), pakai ENGINE.canvas.
    const rect = ENGINE.canvas.getBoundingClientRect();

    const scaleX = ENGINE.canvas.width / rect.width;
    const scaleY = ENGINE.canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };

}

//==========================================================
// HANDLE TAP ON NON-PLAYING SCREEN
// (FITUR BARU: sebelumnya tidak ada cara untuk mulai/restart game)
//==========================================================

function handleScreenTap() {

    if (ENGINE.state === GAME_STATE.MENU) {
        startGame();
        return true;
    }

    if (ENGINE.state === GAME_STATE.WIN || ENGINE.state === GAME_STATE.LOSE) {
        restartGame();
        return true;
    }

    return false;

}

//==========================================================
// TOUCH START
//==========================================================

function touchStart(event) {

    event.preventDefault();
    resetInput();

    if (handleScreenTap()) return;

    const pos = getTouchPosition(event);

    if (insideButton(pos.x, pos.y, BUTTON.up)) INPUT.up = true;
    if (insideButton(pos.x, pos.y, BUTTON.down)) INPUT.down = true;
    if (insideButton(pos.x, pos.y, BUTTON.left)) INPUT.left = true;
    if (insideButton(pos.x, pos.y, BUTTON.right)) INPUT.right = true;

}

//==========================================================
// TOUCH MOVE
//==========================================================

function touchMove(event) {

    event.preventDefault();

    if (ENGINE.state !== GAME_STATE.PLAYING) return;

    resetInput();

    const pos = getTouchPosition(event);

    if (insideButton(pos.x, pos.y, BUTTON.up)) INPUT.up = true;
    if (insideButton(pos.x, pos.y, BUTTON.down)) INPUT.down = true;
    if (insideButton(pos.x, pos.y, BUTTON.left)) INPUT.left = true;
    if (insideButton(pos.x, pos.y, BUTTON.right)) INPUT.right = true;

}

//==========================================================
// TOUCH END
//==========================================================

function touchEnd(event) {

    event.preventDefault();
    resetInput();

}

//==========================================================
// MOUSE DOWN
//==========================================================

function mouseDown(event) {

    resetInput();

    if (handleScreenTap()) return;

    const pos = getMousePosition(event);

    if (insideButton(pos.x, pos.y, BUTTON.up)) INPUT.up = true;
    if (insideButton(pos.x, pos.y, BUTTON.down)) INPUT.down = true;
    if (insideButton(pos.x, pos.y, BUTTON.left)) INPUT.left = true;
    if (insideButton(pos.x, pos.y, BUTTON.right)) INPUT.right = true;

}

//==========================================================
// MOUSE MOVE
//==========================================================

function mouseMove(event) {

    if (event.buttons !== 1 || ENGINE.state !== GAME_STATE.PLAYING) {
        resetInput();
        return;
    }

    const pos = getMousePosition(event);

    resetInput();

    if (insideButton(pos.x, pos.y, BUTTON.up)) INPUT.up = true;
    if (insideButton(pos.x, pos.y, BUTTON.down)) INPUT.down = true;
    if (insideButton(pos.x, pos.y, BUTTON.left)) INPUT.left = true;
    if (insideButton(pos.x, pos.y, BUTTON.right)) INPUT.right = true;

}

//==========================================================
// MOUSE UP
//==========================================================

function mouseUp() {

    resetInput();

}

//==========================================================
// REGISTER INPUT
//==========================================================

function registerInput() {

    //------------------------------------------------------
    // TOUCH
    //------------------------------------------------------

    ENGINE.canvas.addEventListener("touchstart", touchStart, { passive: false });
    ENGINE.canvas.addEventListener("touchmove", touchMove, { passive: false });
    ENGINE.canvas.addEventListener("touchend", touchEnd, { passive: false });

    //------------------------------------------------------
    // MOUSE
    //------------------------------------------------------

    ENGINE.canvas.addEventListener("mousedown", mouseDown);
    ENGINE.canvas.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);

}