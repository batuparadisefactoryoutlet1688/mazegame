/*
==========================================================
SPACE MAZE ENGINE
Version : 1.0
File    : event.js
==========================================================
*/

"use strict";

//==========================================================
// PORTAL EVENT
//==========================================================

function updatePortalEvent(){

    if(GAME_DATA.portalUsed){

        return;

    }

    if(!checkPortal()){

        return;

    }

    teleportRocket();

    GAME_DATA.portalUsed = true;

    if(ASSETS.sound.portal){

        ASSETS.sound.portal.currentTime = 0;

        ASSETS.sound.portal.play();

    }

}

//==========================================================
// FINISH EVENT
//==========================================================

function updateFinishEvent(){

    if(!checkFinish()){

        return;

    }

    stopTimer();

    winGame();

    changeState(GAME_STATE.WIN);

    if(ASSETS.sound.win){

        ASSETS.sound.win.currentTime = 0;

        ASSETS.sound.win.play();

    }

}

//==========================================================
// GAME EVENT
//==========================================================

function updateGameEvent(){

    if(!GAME_DATA.game.playing){

        return;

    }

    updatePortalEvent();

    updateFinishEvent();

}