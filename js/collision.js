/*
==========================================================
SPACE MAZE ENGINE
Version : 1.0
File    : collision.js
==========================================================
*/

"use strict";

//==========================================================
// LOAD MASK
//==========================================================

function loadMaskMap(){

    const image =

        ASSETS.maps[

            "map" +

            GAME_DATA.currentMap +

            "_mask"

        ];

    ENGINE.hiddenCtx.clearRect(

        0,

        0,

        ENGINE.hiddenCanvas.width,

        ENGINE.hiddenCanvas.height

    );

    // BUG FIX: map*_mask.png sekarang full size (1238x2201),
    // bukan 1000x1000. Sebelumnya digambar dengan ukuran
    // CONFIG.maze.centerX/width, sehingga mask ter-squish ke
    // kotak yang lebih kecil -> pixel yang dibaca isWalkable()
    // jadi tidak sesuai posisi rocket yang sebenarnya (collision
    // ikut bergeser). Sekarang digambar 1:1 pakai CONFIG.map
    // (bukan CONFIG.canvas), konsisten dengan object.js & ui.js.

    ENGINE.hiddenCtx.drawImage(

        image,

        0,

        0,

        CONFIG.map.width,

        CONFIG.map.height

    );

}

//==========================================================
// GET MASK PIXEL
//==========================================================

function getMaskPixel(x,y){

    return ENGINE.hiddenCtx.getImageData(

        Math.round(x),

        Math.round(y),

        1,

        1

    ).data;

}

//==========================================================
// IS WALKABLE
//==========================================================

function isWalkable(x,y){

    //======================================================
    // AREA MAZE CHECK
    //======================================================

    if(!isInsideMaze(x,y)){

        console.log(
            "OUTSIDE MAZE",
            Math.round(x),
            Math.round(y)
        );

        return false;

    }

    //======================================================
    // READ MASK PIXEL
    //======================================================

    const pixel = getMaskPixel(x,y);

    console.log(
        "MASK",
        Math.round(x),
        Math.round(y),
        pixel[0],
        pixel[1],
        pixel[2]
    );

    //======================================================
    // WALKABLE
    //======================================================

    return (

        pixel[0] > 250 &&

        pixel[1] > 250 &&

        pixel[2] > 250

    );

}
//==========================================================
// CHECK COLLISION
//==========================================================

function checkCollision(nextX,nextY){

    console.log(
        "CHECK COLLISION =>",
        "nextX:", nextX,
        "nextY:", nextY
    );

    const halfW =
        GAME_DATA.rocket.width / 2;

    const halfH =
        GAME_DATA.rocket.height / 2;

    //------------------------------------------------------
    // TOP
    //------------------------------------------------------

    if(
        !isWalkable(
            nextX,
            nextY-halfH
        )
    ){

        console.log("BLOCK : TOP");

        return false;

    }

    //------------------------------------------------------
    // BOTTOM
    //------------------------------------------------------

    if(
        !isWalkable(
            nextX,
            nextY+halfH
        )
    ){

        console.log("BLOCK : BOTTOM");

        return false;

    }

    //------------------------------------------------------
    // LEFT
    //------------------------------------------------------

    if(
        !isWalkable(
            nextX-halfW,
            nextY
        )
    ){

        console.log("BLOCK : LEFT");

        return false;

    }

    //------------------------------------------------------
    // RIGHT
    //------------------------------------------------------

    if(
        !isWalkable(
            nextX+halfW,
            nextY
        )
    ){

        console.log("BLOCK : RIGHT");

        return false;

    }

    console.log("COLLISION OK");

    return true;

}

//==========================================================
// UPDATE MASK
//==========================================================

function updateMask(){

    loadMaskMap();

}

//==========================================================
// DISTANCE
//==========================================================

function distance(x1, y1, x2, y2){

    const dx = x2 - x1;

    const dy = y2 - y1;

    return Math.sqrt(

        dx * dx +

        dy * dy

    );

}

//==========================================================
// INSIDE MAZE
//==========================================================

function isInsideMaze(x, y){

    const left =

        CONFIG.maze.centerX -

        CONFIG.maze.areaWidth / 2;

    const right =

        CONFIG.maze.centerX +

        CONFIG.maze.areaWidth / 2;

    const top =

        CONFIG.maze.centerY -

        CONFIG.maze.areaHeight / 2;

    const bottom =

        CONFIG.maze.centerY +

        CONFIG.maze.areaHeight / 2;

    return (

        x >= left &&

        x <= right &&

        y >= top &&

        y <= bottom

    );

}

//==========================================================
// CHECK FINISH
//==========================================================

function checkFinish(){

    const d = distance(

        GAME_DATA.rocket.x,

        GAME_DATA.rocket.y,

        GAME_DATA.finish.x,

        GAME_DATA.finish.y

    );

    return (

        d <=

        GAME_DATA.rocket.width / 2

    );

}

//==========================================================
// CHECK PORTAL
//==========================================================

function checkPortal(){

    if(GAME_DATA.portalUsed){

        return false;

    }

    const d = distance(

        GAME_DATA.rocket.x,

        GAME_DATA.rocket.y,

        GAME_DATA.portalA.x,

        GAME_DATA.portalA.y

    );

    return (

        d <=

        GAME_DATA.rocket.width / 2

    );

}

//==========================================================
// TELEPORT
//==========================================================

function teleportRocket(){

    GAME_DATA.rocket.x =

        GAME_DATA.portalB.x;

    GAME_DATA.rocket.y =

        GAME_DATA.portalB.y;

    GAME_DATA.portalUsed = true;

}

//==========================================================
// RESET PORTAL
//==========================================================

function resetPortal(){

    GAME_DATA.portalUsed = false;

}
