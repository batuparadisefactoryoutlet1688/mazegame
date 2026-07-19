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

function colorMatch(r, g, b, color){

    return (

        r === color.r &&

        g === color.g &&

        b === color.b

    );

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
// PERFORMANCE FIX (penyebab delay 5-10 detik / bahkan 1 menit
// saat klik Start): sebelumnya getImageData() dipanggil TERPISAH
// untuk setiap pixel (~2.7 juta kali untuk gambar 1238x2201).
// Setiap panggilan getImageData() punya overhead transfer data
// GPU -> CPU, jadi kalau dipanggil jutaan kali, sangat lambat.
//
// FIX: getImageData() dipanggil SEKALI SAJA untuk seluruh gambar,
// hasilnya berupa array pixel besar (data), lalu kita cukup
// loop & baca array itu di memori (jauh lebih cepat, harusnya
// selesai dalam hitungan milidetik, bukan detik/menit).
//==========================================================

function scanObjectMap(){

    const startColor = CONFIG.objectColor.start;

    const finishColor = CONFIG.objectColor.finish;

    const portalAColor = CONFIG.objectColor.portalA;

    const portalBColor = CONFIG.objectColor.portalB;

    const width = CONFIG.map.width;

    const height = CONFIG.map.height;

    //------------------------------------------------------
    // AMBIL SEMUA PIXEL SEKALI SAJA
    //------------------------------------------------------

    const imageData =

        ENGINE.hiddenCtx.getImageData(

            0,

            0,

            width,

            height

        );

    const data = imageData.data;

    //------------------------------------------------------
    // ACCUMULATOR (buat hitung centroid tiap marker)
    //------------------------------------------------------

    const acc = {

        start:   { sumX: 0, sumY: 0, count: 0 },

        finish:  { sumX: 0, sumY: 0, count: 0 },

        portalA: { sumX: 0, sumY: 0, count: 0 },

        portalB: { sumX: 0, sumY: 0, count: 0 }

    };

    for(let y = 0; y < height; y++){

        for(let x = 0; x < width; x++){

            const i = (y * width + x) * 4;

            const r = data[i];

            const g = data[i + 1];

            const b = data[i + 2];

            //--------------------------------------------------
            // START
            //--------------------------------------------------

            if(colorMatch(r,g,b,startColor)){

                acc.start.sumX += x;

                acc.start.sumY += y;

                acc.start.count++;

            }

            //--------------------------------------------------
            // FINISH
            //--------------------------------------------------

            if(colorMatch(r,g,b,finishColor)){

                acc.finish.sumX += x;

                acc.finish.sumY += y;

                acc.finish.count++;

            }

            //--------------------------------------------------
            // PORTAL A
            //--------------------------------------------------

            if(colorMatch(r,g,b,portalAColor)){

                acc.portalA.sumX += x;

                acc.portalA.sumY += y;

                acc.portalA.count++;

            }

            //--------------------------------------------------
            // PORTAL B
            //--------------------------------------------------

            if(colorMatch(r,g,b,portalBColor)){

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
