/*
==========================================================
SPACE MAZE ENGINE
Version : 1.0
File    : object.js
==========================================================
*/

"use strict";

//==========================================================
// OBJECT COLOR
//==========================================================

function colorMatch(pixel, color){

    return (

        pixel[0] === color.r &&

        pixel[1] === color.g &&

        pixel[2] === color.b

    );

}

//==========================================================
// GET PIXEL
//==========================================================

function getPixel(x, y){

    return ENGINE.hiddenCtx.getImageData(

        x,

        y,

        1,

        1

    ).data;

}

//==========================================================
// LOAD OBJECT MAP
//==========================================================

function loadObjectMap(){

    const image =

        ASSETS.maps[

            "map" +

            GAME_DATA.currentMap +

            "_object"

        ];

    ENGINE.hiddenCtx.clearRect(

        0,

        0,

        ENGINE.hiddenCanvas.width,

        ENGINE.hiddenCanvas.height

    );

    ENGINE.hiddenCtx.drawImage(

        image,

        CONFIG.maze.centerX - (CONFIG.maze.width/2),

        CONFIG.maze.centerY - (CONFIG.maze.height/2),

        CONFIG.maze.width,

        CONFIG.maze.height

    );

}

//==========================================================
// FIND OBJECT
//==========================================================

function scanObjectMap(){

    const startColor = CONFIG.objectColor.start;

    const finishColor = CONFIG.objectColor.finish;

    const portalAColor = CONFIG.objectColor.portalA;

    const portalBColor = CONFIG.objectColor.portalB;

    const startX =

        CONFIG.maze.centerX -

        CONFIG.maze.width / 2;

    const startY =

        CONFIG.maze.centerY -

        CONFIG.maze.height / 2;

    const endX =

        startX +

        CONFIG.maze.width;

    const endY =

        startY +

        CONFIG.maze.height;

    for(let y = startY; y < endY; y++){

        for(let x = startX; x < endX; x++){

            const pixel = getPixel(x,y);

            //--------------------------------------------------
            // START
            //--------------------------------------------------

            if(colorMatch(pixel,startColor)){

                GAME_DATA.rocket.x = x;

                GAME_DATA.rocket.y = y;

            }

            //--------------------------------------------------
            // FINISH
            //--------------------------------------------------

            if(colorMatch(pixel,finishColor)){

                GAME_DATA.finish.x = x;

                GAME_DATA.finish.y = y;

            }

            //--------------------------------------------------
            // PORTAL A
            //--------------------------------------------------

            if(colorMatch(pixel,portalAColor)){

                GAME_DATA.portalA.x = x;

                GAME_DATA.portalA.y = y;

            }

            //--------------------------------------------------
            // PORTAL B
            //--------------------------------------------------

            if(colorMatch(pixel,portalBColor)){

                GAME_DATA.portalB.x = x;

                GAME_DATA.portalB.y = y;

            }

        }

    }

    console.log("START :",GAME_DATA.rocket);

    console.log("FINISH :",GAME_DATA.finish);

    console.log("PORTAL A :",GAME_DATA.portalA);

    console.log("PORTAL B :",GAME_DATA.portalB);

}

//==========================================================
// READ OBJECT
//==========================================================

function readObjectMap(){

    loadObjectMap();

    scanObjectMap();

    updateMask();

}


