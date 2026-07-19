# SPACE MAZE

Version : 0.1

---------------------------------------
CANVAS
---------------------------------------

Canvas Width  : 1238 px

Canvas Height : 2201 px

Background : Black

Orientation : Portrait

---------------------------------------
MAZE
---------------------------------------

Maze Size

Width  : 1000 px

Height : 1000 px

Center Position

X : 615.50 px

Y : 1080.50 px

Maze terdiri dari 5 map.

Map dipilih secara random saat game dimulai.

---------------------------------------
MAP FILE
---------------------------------------

Setiap map memiliki 3 file.

map1.png

Visual maze yang dilihat pemain.

map1_mask.png

Collision.

Hitam = Tidak bisa dilewati

Putih = Bisa dilewati

map1_object.png

Object game.

Hijau = Start

Biru = Finish

Merah = Portal A

Orange = Portal B

---------------------------------------
ROCKET
---------------------------------------

File

rocket.png

Size

93 x 93 px

Posisi

Dibaca otomatis dari warna Hijau
pada map_object.

---------------------------------------
FINISH
---------------------------------------

File

finish.png

Size

93 x 93 px

Posisi

Dibaca otomatis dari warna Biru
pada map_object.

---------------------------------------
PORTAL
---------------------------------------

Merah

↓

Teleport

↓

Orange

Portal hanya bisa digunakan
1 kali setiap permainan.

---------------------------------------
BUTTON
---------------------------------------

UP

File

btn_up.png

Size

163 x 129 px

Center

X = 337.50

Y = 1784.50

---------------------------------------

DOWN

File

btn_down.png

Size

163 x 129 px

Center

X = 331.50

Y = 2097.50

---------------------------------------

LEFT

File

btn_left.png

Size

129 x 163 px

Center

X = 171.50

Y = 1930.50

---------------------------------------

RIGHT

File

btn_right.png

Size

129 x 163 px

Center

X = 498.50

Y = 1945.50

---------------------------------------
START SCREEN
---------------------------------------

File

ui_start.png

Size

1238 x 2201 px

Center

X = 619.00

Y = 1101.00

---------------------------------------
WIN POPUP
---------------------------------------

File

ui_win.png

Size

1178 x 634 px

Center

X = 619.00

Y = 1101.00

---------------------------------------
LOSE POPUP
---------------------------------------

File

ui_lose.png

Size

1178 x 634 px

Center

X = 619.00

Y = 1101.00

---------------------------------------
TIMER
---------------------------------------

Time

05:00

Countdown

05:00

↓

00:00

Jika habis

Game Over

---------------------------------------
AUDIO
---------------------------------------

bgm.mp3

Background Music

click.mp3

Tombol

portal.mp3

Teleport

win.mp3

Menang

lose.mp3

Kalah

---------------------------------------
GAME FLOW
---------------------------------------

Start

↓

Random Map

↓

Rocket Spawn

↓

Player Move

↓

Portal (Optional)

↓

Finish

↓

Win

atau

Timer Habis

↓

Lose

---------------------------------------
VERSION
---------------------------------------

v0.1

Canvas

v0.2

Load Asset

v0.3

Rocket Spawn

v0.4

Movement

v0.5

Collision

v0.6

Portal

v0.7

Timer

v1.0

Release