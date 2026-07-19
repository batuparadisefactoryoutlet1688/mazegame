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

    console.log(

        "LOAD OBJECT MAP :",

        mapName

    );

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
// BUG FIX: sebelumnya setiap pixel yang cocok warnanya LANGSUNG
// menimpa GAME_DATA.xxx.x/y. Karena marker di Photoshop itu
// gumpalan warna (bukan 1 pixel), scan (kiri->kanan, atas->bawah)
// bakal berkali-kali "menimpa", dan yang akhirnya kesimpen adalah
// pixel PALING KANAN-BAWAH dari gumpalan itu -> makanya posisi
// selalu geser ke kanan-bawah dari titik tengah yang kamu pilih
// di Photoshop.
//
// FIX: kumpulkan semua pixel yang cocok (sumX, sumY, count),
// lalu di akhir dibagi rata -> hasilnya CENTROID (titik tengah)
// gumpalan itu, otomatis sama persis dengan reference point
// tengah yang kamu pakai di Photoshop, berapa pun ukuran
// gumpalannya.
//==========================================================

function scanObjectMap(){

    const startColor = CONFIG.objectColor.start;

    const finishColor = CONFIG.objectColor.finish;

    const portalAColor = CONFIG.objectColor.portalA;

    const portalBColor = CONFIG.objectColor.portalB;

    const startX =

        CONFIG.maze.centerX -

        CONFIG.maze.areaWidth / 2;

    const startY =

        CONFIG.maze.centerY -

        CONFIG.maze.areaHeight / 2;

    const endX =

        startX +

        CONFIG.maze.areaWidth;

    const endY =

        startY +

        CONFIG.maze.areaHeight;

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
    // HITUNG CENTROID (rata-rata) DAN SIMPAN
    //------------------------------------------------------

    if(acc.start.count > 0){

        GAME_DATA.rocket.x = acc.start.sumX / acc.start.count;

        GAME_DATA.rocket.y = acc.start.sumY / acc.start.count;

    } else {

        console.warn("START tidak ditemukan di map ini!");

    }

    if(acc.finish.count > 0){

        GAME_DATA.finish.x = acc.finish.sumX / acc.finish.count;

        GAME_DATA.finish.y = acc.finish.sumY / acc.finish.count;

    } else {

        console.warn("FINISH tidak ditemukan di map ini!");

    }

    if(acc.portalA.count > 0){

        GAME_DATA.portalA.x = acc.portalA.sumX / acc.portalA.count;

        GAME_DATA.portalA.y = acc.portalA.sumY / acc.portalA.count;

    } else {

        console.warn("PORTAL A tidak ditemukan di map ini!");

    }

    if(acc.portalB.count > 0){

        GAME_DATA.portalB.x = acc.portalB.sumX / acc.portalB.count;

        GAME_DATA.portalB.y = acc.portalB.sumY / acc.portalB.count;

    } else {

        console.warn("PORTAL B tidak ditemukan di map ini!");

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
