/*
==========================================================
SPACE MAZE ENGINE
Version : 1.0
File    : config.js
==========================================================
*/

const CONFIG = {

    //======================================================
    // CANVAS
    //======================================================
    canvas: {
        width: 1238,
        height: 2201,
        background: "#000000"
    },

    //======================================================
    // MAP
    // Ukuran & posisi gambar map/mask/object (1238x2201).
    // Sengaja dipisah dari CONFIG.canvas supaya map tidak ikut.
    // bergeser kalau suatu saat ukuran canvas berubah.
    //======================================================
    map: {
        width: 1238,
        height: 2201,
        centerX: 619,
        centerY: 1101
    },

    //======================================================
    // MAZE
    // areaWidth/areaHeight = luas AREA labirin di dalam map
    // (dipakai isInsideMaze() & scanObjectMap() sebagai batas),
    // BUKAN ukuran gambar. Jangan dipakai untuk render/drawImage.
    //======================================================
    maze: {
        areaWidth: 1000,
        areaHeight: 1000,
        centerX: 615.5,
        centerY: 1080.5
    },

    //======================================================
    // GAME
    //======================================================
    game: {
        totalMaps: 5,
        randomMap: true
    },

    //======================================================
    // TIMER
    //======================================================
    timer: {
        startTime: 300, // 5 menit

        // BUG FIX: posisi timer dikonfirmasi sesuai desain terbaru.
        fontSize: 80,
        centerX: 898,
        centerY: 1786
    },

    //======================================================
    // ROCKET
    //======================================================
    rocket: {
        width: 93,
        height: 93
    },

    //======================================================
    // FINISH
    //======================================================
    finish: {
        width: 93,
        height: 93
    },

    //======================================================
    // BUTTON
    //======================================================
    button: {

        up: {
            width: 163,
            height: 129,
            centerX: 337.5,
            centerY: 1784.5
        },

        down: {
            width: 163,
            height: 129,
            centerX: 331.5,
            centerY: 2097.5
        },

        left: {
            width: 129,
            height: 163,
            centerX: 171.5,
            centerY: 1930.5
        },

        right: {
            width: 129,
            height: 163,
            centerX: 498.5,
            centerY: 1945.5
        }

    },

    //======================================================
    // START SCREEN
    //======================================================
    startScreen: {
        width: 1238,
        height: 2201,
        centerX: 619,
        centerY: 1101
    },

    //======================================================
    // WIN POPUP
    //======================================================
    winPopup: {
        width: 1178,
        height: 634,
        centerX: 619,
        centerY: 1101
    },

    //======================================================
    // LOSE POPUP
    //======================================================
    losePopup: {
        width: 1178,
        height: 634,
        centerX: 619,
        centerY: 1101
    },

    //======================================================
    // OBJECT COLOR
    //======================================================
    objectColor: {

        start: {
            r: 0,
            g: 255,
            b: 0
        },

        finish: {
            r: 0,
            g: 0,
            b: 255
        },

        portalA: {
            r: 255,
            g: 0,
            b: 0
        },

        portalB: {
            r: 255,
            g: 128,
            b: 0
        }

    }

};
