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

    const mapName =

        "map" +

        GAME_DATA.currentMap +

        "_object";

    const image =

        ASSETS.maps[

            mapName

        ];

    ENGINE.hiddenCtx.clearRect(

        0,

        0,

        ENGINE.hiddenCanvas.width,

        ENGINE.hiddenCanvas.height

    );

    ENGINE.hiddenCtx.drawImage(

        image,

        0,

        0,

        CONFIG.map.width,

        CONFIG.map.height

    );

}

//==========================================================
// FIND OBJECT
//==========================================================
// Scan SELURUH gambar (0,0 sampai CONFIG.map.width/height),
// tidak lagi dibatasi kotak maze -> marker boleh diletakkan di
// mana saja dan ukuran berapa saja.
//
// Posisi tiap marker dihitung pakai CENTROID (rata-rata semua
// pixel yang cocok warnanya), lalu dibulatkan (Math.round) supaya
// hasilnya selalu integer, konsisten dengan koordinat pixel lain.
//==========================================================

function scanObjectMap(){

    const startColor = CONFIG.objectColor.start;

    const finishColor = CONFIG.objectColor.finish;

    const portalAColor = CONFIG.objectColor.portalA;

    const portalBColor = CONFIG.objectColor.portalB;

    const startX = 0;

    const startY = 0;

    const endX = CONFIG.map.width;

    const endY = CONFIG.map.height;

    //------------------------------------------------------
    // ACCUMULATOR (buat hitung centroid tiap marker)
    //------------------------------------------------------

    const acc = {

        start:   { sumX: 0, sumY: 0, count: 0 },

        finish:  { sumX: 0, sumY: 0, count: 0 },

        portalA: { sumX: 0, sumY: 0, count: 0 },

        portalB: { sumX: 0, sumY: 0, count: 0 }

    };

    for(let y = startY; y < endY; y++){

        for(let x = startX; x < endX; x++){

            const pixel = getPixel(x,y);

            //--------------------------------------------------
            // START
            //--------------------------------------------------

            if(colorMatch(pixel,startColor)){

                acc.start.sumX += x;

                acc.start.sumY += y;

                acc.start.count++;

            }

            //--------------------------------------------------
            // FINISH
            //--------------------------------------------------

            if(colorMatch(pixel,finishColor)){

                acc.finish.sumX += x;

                acc.finish.sumY += y;

                acc.finish.count++;

            }

            //--------------------------------------------------
            // PORTAL A
            //--------------------------------------------------

            if(colorMatch(pixel,portalAColor)){

                acc.portalA.sumX += x;

                acc.portalA.sumY += y;

                acc.portalA.count++;

            }

            //--------------------------------------------------
            // PORTAL B
            //--------------------------------------------------

            if(colorMatch(pixel,portalBColor)){

                acc.portalB.sumX += x;

                acc.portalB.sumY += y;

                acc.portalB.count++;

            }

        }

    }

    //------------------------------------------------------
    // HITUNG CENTROID (dibulatkan) DAN SIMPAN
    //------------------------------------------------------

    if(acc.start.count > 0){

        GAME_DATA.rocket.x = Math.round(acc.start.sumX / acc.start.count);

        GAME_DATA.rocket.y = Math.round(acc.start.sumY / acc.start.count);

    } else {

        console.warn("START tidak ditemukan di map ini!");

    }

    if(acc.finish.count > 0){

        GAME_DATA.finish.x = Math.round(acc.finish.sumX / acc.finish.count);

        GAME_DATA.finish.y = Math.round(acc.finish.sumY / acc.finish.count);

    } else {

        console.warn("FINISH tidak ditemukan di map ini!");

    }

    if(acc.portalA.count > 0){

        GAME_DATA.portalA.x = Math.round(acc.portalA.sumX / acc.portalA.count);

        GAME_DATA.portalA.y = Math.round(acc.portalA.sumY / acc.portalA.count);

    } else {

        console.warn("PORTAL A tidak ditemukan di map ini!");

    }

    if(acc.portalB.count > 0){

        GAME_DATA.portalB.x = Math.round(acc.portalB.sumX / acc.portalB.count);

        GAME_DATA.portalB.y = Math.round(acc.portalB.sumY / acc.portalB.count);

    } else {

        console.warn("PORTAL B tidak ditemukan di map ini!");

    }

}

//==========================================================
// READ OBJECT
//==========================================================

function readObjectMap(){

    loadObjectMap();

    scanObjectMap();

    updateMask();

}
