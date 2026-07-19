/*
==========================================================
SPACE MAZE ENGINE
Version : 1.0
File    : movement.js
==========================================================
*/

"use strict";

//==========================================================
// MOVE UP.
//==========================================================

function moveUp() {

    const nextX = GAME_DATA.rocket.x;
    const nextY = GAME_DATA.rocket.y - GAME_DATA.rocket.speed;

    if (!isInsideMaze(nextX, nextY)) return;
    if (!checkCollision(nextX, nextY)) return;

    GAME_DATA.rocket.y = nextY;

}

//==========================================================
// MOVE DOWN
//==========================================================

function moveDown() {

    const nextX = GAME_DATA.rocket.x;
    const nextY = GAME_DATA.rocket.y + GAME_DATA.rocket.speed;

    if (!isInsideMaze(nextX, nextY)) return;
    if (!checkCollision(nextX, nextY)) return;

    GAME_DATA.rocket.y = nextY;

}

//==========================================================
// MOVE LEFT
//==========================================================

function moveLeft() {

    const nextX = GAME_DATA.rocket.x - GAME_DATA.rocket.speed;
    const nextY = GAME_DATA.rocket.y;

    if (!isInsideMaze(nextX, nextY)) return;
    if (!checkCollision(nextX, nextY)) return;

    GAME_DATA.rocket.x = nextX;

}

//==========================================================
// MOVE RIGHT
//==========================================================

function moveRight() {

    const nextX = GAME_DATA.rocket.x + GAME_DATA.rocket.speed;
    const nextY = GAME_DATA.rocket.y;

    if (!isInsideMaze(nextX, nextY)) return;
    if (!checkCollision(nextX, nextY)) return;

    GAME_DATA.rocket.x = nextX;

}

//==========================================================
// UPDATE MOVEMENT
//==========================================================

function updateMovement() {

    if (!GAME_DATA.game.playing) return;

    // FITUR BARU: update arah hadap rocket SEBELUM cek collision,
    // supaya rocket langsung menghadap arah tombol yang ditekan
    // meskipun sedang mentok tembok (bukan cuma saat berhasil gerak).

    if (INPUT.up) GAME_DATA.rocket.facing = "up";
    if (INPUT.down) GAME_DATA.rocket.facing = "down";
    if (INPUT.left) GAME_DATA.rocket.facing = "left";
    if (INPUT.right) GAME_DATA.rocket.facing = "right";

    if (INPUT.up) moveUp();
    if (INPUT.down) moveDown();
    if (INPUT.left) moveLeft();
    if (INPUT.right) moveRight();

}

//==========================================================
// UPDATE PLAYER
//==========================================================
// BUG FIX: sebelumnya ada fungsi checkGameEvent() di sini yang
// isinya duplikat 100% dari updateGameEvent() di event.js, tapi
// tidak pernah dipanggil (dead code) karena updatePlayer() sudah
// memanggil updateGameEvent() dari event.js. Dihapus supaya tidak
// ada dua sumber logic yang bisa saling berbeda di kemudian hari.
//==========================================================

function updatePlayer() {

    updateMovement();
    updateGameEvent();

}
