/*
==========================================================
SPACE MAZE ENGINE
Version : 1.0
File    : main.js
==========================================================
*/

"use strict";

//==========================================================
// INIT
//==========================================================

function init() {

    console.log("==============================");
    console.log("SPACE MAZE ENGINE");
    console.log("Version 1.0");
    console.log("==============================");

    createCanvas();
    createHiddenCanvas();
    registerInput();
    startEngine();

    requestAnimationFrame(gameLoop);

}

//==========================================================
// START
//==========================================================

window.onload = init;