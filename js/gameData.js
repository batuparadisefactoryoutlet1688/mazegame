/*
==========================================================
SPACE MAZE ENGINE
Version : 1.0
File    : gameData.js
==========================================================
*/

"use strict";

//==========================================================
// GAME DATA
//==========================================================

const GAME_DATA = {

    //------------------------------------------------------
    // MAP
    //------------------------------------------------------

    currentMap: 1,

    //------------------------------------------------------
    // ROCKET
    //------------------------------------------------------

    rocket: {

        x: 0,
        y: 0,

        width: CONFIG.rocket.width,
        height: CONFIG.rocket.height,

        speed: 3,

        moving: false

    },

    //------------------------------------------------------
    // FINISH
    //------------------------------------------------------

    finish: {

        x: 0,
        y: 0,

        width: CONFIG.finish.width,
        height: CONFIG.finish.height

    },

    //------------------------------------------------------
    // PORTAL
    //------------------------------------------------------

    portalA: {

        x: 0,
        y: 0,

        active: false

    },

    portalB: {

        x: 0,
        y: 0,

        active: false

    },

    portalUsed: false,

    //------------------------------------------------------
    // TIMER
    //------------------------------------------------------

    timer: {

        start: CONFIG.timer.startTime,

        current: CONFIG.timer.startTime,

        running: false

    },

    //------------------------------------------------------
    // GAME STATUS
    //------------------------------------------------------

    game: {

        playing: false,

        win: false,

        lose: false

    }

};

//==========================================================
// RESET GAME
//==========================================================

function resetGameData() {

    GAME_DATA.rocket.x = 0;
    GAME_DATA.rocket.y = 0;
    GAME_DATA.rocket.moving = false;

    GAME_DATA.finish.x = 0;
    GAME_DATA.finish.y = 0;

    GAME_DATA.portalA.x = 0;
    GAME_DATA.portalA.y = 0;
    GAME_DATA.portalA.active = false;

    GAME_DATA.portalB.x = 0;
    GAME_DATA.portalB.y = 0;
    GAME_DATA.portalB.active = false;

    GAME_DATA.portalUsed = false;

    GAME_DATA.timer.current = CONFIG.timer.startTime;
    GAME_DATA.timer.running = false;

    GAME_DATA.game.playing = false;
    GAME_DATA.game.win = false;
    GAME_DATA.game.lose = false;

}

//==========================================================
// RANDOM MAP
//==========================================================

function randomMap() {

    GAME_DATA.currentMap =

        Math.floor(

            Math.random() * CONFIG.game.totalMaps

        ) + 1;

}

//==========================================================
// START GAME
//==========================================================

function startGameData() {

    resetGameData();

    randomMap();

    GAME_DATA.timer.running = true;

    GAME_DATA.game.playing = true;

}

//==========================================================
// WIN GAME
//==========================================================

function winGame() {

    GAME_DATA.game.playing = false;

    GAME_DATA.game.win = true;

    GAME_DATA.timer.running = false;

}

//==========================================================
// LOSE GAME
//==========================================================

function loseGame() {

    GAME_DATA.game.playing = false;

    GAME_DATA.game.lose = true;

    GAME_DATA.timer.running = false;

}