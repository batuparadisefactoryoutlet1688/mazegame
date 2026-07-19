/*
==========================================================
SPACE MAZE ENGINE
Version : 1.0
File    : timer.js
==========================================================
*/

"use strict";

//==========================================================
// START TIMER
//==========================================================

function startTimer(){

    GAME_DATA.timer.current = CONFIG.timer.startTime;

    GAME_DATA.timer.running = true;

}

//==========================================================
// STOP TIMER
//==========================================================

function stopTimer(){

    GAME_DATA.timer.running = false;

}

//==========================================================
// RESET TIMER
//==========================================================

function resetTimer(){

    GAME_DATA.timer.current = CONFIG.timer.startTime;

}

//==========================================================
// UPDATE TIMER
//==========================================================

function updateTimer(deltaTime){

    if(!GAME_DATA.timer.running){

        return;

    }

    GAME_DATA.timer.current -= deltaTime / 1000;

    if(GAME_DATA.timer.current <= 0){

        GAME_DATA.timer.current = 0;

        GAME_DATA.timer.running = false;

        loseGame();

        changeState(GAME_STATE.LOSE);

        if(ASSETS.sound.lose){

            ASSETS.sound.lose.currentTime = 0;

            ASSETS.sound.lose.play();

        }

    }

}

//==========================================================
// GET MINUTE
//==========================================================

function getMinute(){

    return Math.floor(

        GAME_DATA.timer.current / 60

    );

}

//==========================================================
// GET SECOND
//==========================================================

function getSecond(){

    return Math.floor(

        GAME_DATA.timer.current % 60

    );

}

//==========================================================
// FORMAT TIME
//==========================================================

function getTimerText(){

    const m =

        String(

            getMinute()

        ).padStart(2,"0");

    const s =

        String(

            getSecond()

        ).padStart(2,"0");

    return m + ":" + s;

}