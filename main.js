/* eslint-disable indent */
/* eslint-disable prefer-rest-params */
/* eslint-disable brace-style */
/* eslint-disable require-jsdoc */

Physijs.scripts.worker = './js/physijs_worker.js';
Physijs.scripts.ammo = './ammo.js';

let scene;
let camera;
let renderer;

const spawnCord = new THREE.Vector3(-2, 40, 1);
const gridSize = 4;
const defaultCubeSpeed = 2.5;
let cubeSpeed = defaultCubeSpeed;

const voiceCommands = [
  'rotate',
  'move',
  'drop',
  'swap',
  'spawn'
];

let currentPiece;
let currRotY = 0;
let currPosX = spawnCord.x;
let currPosZ = spawnCord.z;
let floorCube;
let leftWallCube;
let rightWallCube;
let northWallCube;
let southWallCube;

let floorBox = new THREE.Box3();
let leftWallBox = new THREE.Box3();
let rightWallBox = new THREE.Box3();
let southWallBox = new THREE.Box3();
let northWallBox = new THREE.Box3();

let hittingWall = false;
let leftWallHit = false;
let rightWallHit = false;
let northWallHit = false;
let southWallHit = false;

let leftDown = false;
let rightDown = false;
let northDown = false;
let southDown = false;

// Load title font
let tetrominoes_font = new FontFace('Tetrominoes Regular', 'url(./misc/fonts/tetrominoes.woff2)');
tetrominoes_font.load().then(function(loaded_face) {
  // loaded_face holds the loaded FontFace
  document.fonts.add(loaded_face);
  document.body.style.fontFamily = '"Tetrominoes Regular", Arial';
}).catch(function(error) {
  console.log('Couldn\'t load "Tetrominoes" font. https://www.dafont.com/tetrominoes.font');
});

// Spawn tetrominoes
// TODO: simplify functions/autogenerate pieces
function spawnPiece() {
  function spawnIPiece() {
    const geometry = new THREE.BoxGeometry(gridSize, gridSize, gridSize);
    const material = new THREE.MeshToonMaterial({color: 0x00eaff});
    const cube = new Physijs.BoxMesh(geometry, material);
    cube.position.set(0, 0, -4);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.updateMatrix();

    const cube2 = new Physijs.BoxMesh(geometry, material);
    cube2.position.set(0, 0, -8);
    cube2.castShadow = true;
    cube2.receiveShadow = true;
    cube2.updateMatrix();

    const cube3 = new Physijs.BoxMesh(geometry, material);
    cube3.position.set(0, 0, -12);
    cube3.castShadow = true;
    cube3.receiveShadow = true;
    cube3.updateMatrix();

    currentPiece = new Physijs.BoxMesh(geometry, material);
    currentPiece.add(cube, cube2, cube3)
    currentPiece.updateMatrix();
    currentPiece.castShadow = true;
    currentPiece.receiveShadow = true;
    currentPiece.position.set(spawnCord.x, spawnCord.y, spawnCord.z);
    scene.add(currentPiece);
  }

  function spawnOPiece() {
    const geometry = new THREE.BoxGeometry(gridSize, gridSize, gridSize);
    const material = new THREE.MeshToonMaterial({color: 0xffe100});
    const cube = new Physijs.BoxMesh(geometry, material);
    cube.position.set(0, 0, -4);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.updateMatrix();

    const cube2 = new Physijs.BoxMesh(geometry, material);
    cube2.position.set(-4, 0, -4);
    cube2.castShadow = true;
    cube2.receiveShadow = true;
    cube2.updateMatrix();

    const cube3 = new Physijs.BoxMesh(geometry, material);
    cube3.position.set(-4, 0, 0);
    cube3.castShadow = true;
    cube3.receiveShadow = true;
    cube3.updateMatrix();

    // For making cube...unsure about keeping
    const cube4 = new Physijs.BoxMesh(geometry, material);
    cube4.position.set(0, 4, -4);
    cube4.castShadow = true;
    cube4.receiveShadow = true;
    cube4.updateMatrix();

    const cube5 = new Physijs.BoxMesh(geometry, material);
    cube5.position.set(-4, 4, 0);
    cube5.updateMatrix();

    const cube6 = new Physijs.BoxMesh(geometry, material);
    cube6.position.set(-4, 4, -4);
    cube6.castShadow = true;
    cube6.receiveShadow = true;
    cube6.updateMatrix();

    const cube7 = new Physijs.BoxMesh(geometry, material);
    cube7.position.set(0, 4, 0);
    cube7.castShadow = true;
    cube7.receiveShadow = true;
    cube7.updateMatrix();

    currentPiece = new Physijs.BoxMesh(geometry, material);
    currentPiece.add(cube, cube2, cube3, cube4, cube5, cube6, cube7);
    currentPiece.castShadow = true;
    currentPiece.receiveShadow = true;
    currentPiece.position.set(spawnCord.x, spawnCord.y, spawnCord.z);
    scene.add(currentPiece);
  }

  function spawnTPiece() {
    const geometry = new THREE.BoxGeometry(gridSize, gridSize, gridSize);
    const material = new THREE.MeshToonMaterial({color: 0x6d2e8c});
    const cube = new Physijs.BoxMesh(geometry, material);
    cube.position.set(0, 0, -4);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.updateMatrix();

    const cube2 = new Physijs.BoxMesh(geometry, material);
    cube2.position.set(0, 0, -8);
    cube2.castShadow = true;
    cube2.receiveShadow = true;
    cube2.updateMatrix();

    const cube3 = new Physijs.BoxMesh(geometry, material);
    cube3.position.set(4, 0, -4);
    cube3.castShadow = true;
    cube3.receiveShadow = true;
    cube3.updateMatrix();

    currentPiece = new Physijs.BoxMesh(geometry, material);
    currentPiece.add(cube, cube2, cube3);
    currentPiece.castShadow = true;
    currentPiece.receiveShadow = true;
    currentPiece.position.set(spawnCord.x, spawnCord.y, spawnCord.z);
    scene.add(currentPiece);
  }

  function spawnSPiece() {
    const geometry = new THREE.BoxGeometry(gridSize, gridSize, gridSize);
    const material = new THREE.MeshToonMaterial({color: 0x37b027});
    const cube = new Physijs.BoxMesh(geometry, material);
    cube.position.set(-4, 0, 0);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.updateMatrix();

    const cube2 = new Physijs.BoxMesh(geometry, material);
    cube2.position.set(0, 0, 4);
    cube2.castShadow = true;
    cube2.receiveShadow = true;
    cube2.updateMatrix();

    const cube3 = new Physijs.BoxMesh(geometry, material);
    cube3.position.set(-4, 0, -4);
    cube3.castShadow = true;
    cube3.receiveShadow = true;
    cube3.updateMatrix();

    currentPiece = new Physijs.BoxMesh(geometry, material);
    currentPiece.add(cube, cube2, cube3);
    currentPiece.castShadow = true;
    currentPiece.receiveShadow = true;
    currentPiece.position.set(spawnCord.x, spawnCord.y, spawnCord.z);
    scene.add(currentPiece);
  }

  function spawnZPiece() {
    const geometry = new THREE.BoxGeometry(gridSize, gridSize, gridSize);
    const material = new THREE.MeshToonMaterial({color: 0xc71414});
    const cube = new Physijs.BoxMesh(geometry, material);
    cube.position.set(4, 0, 0);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.updateMatrix();

    const cube2 = new Physijs.BoxMesh(geometry, material);
    cube2.position.set(0, 0, 4);
    cube2.castShadow = true;
    cube2.receiveShadow = true;
    cube2.updateMatrix();

    const cube3 = new Physijs.BoxMesh(geometry, material);
    cube3.position.set(4, 0, -4);
    cube3.castShadow = true;
    cube3.receiveShadow = true;
    cube3.updateMatrix();

    currentPiece = new Physijs.BoxMesh(geometry, material);
    currentPiece.add(cube, cube2, cube3);
    currentPiece.castShadow = true;
    currentPiece.receiveShadow = true;
    currentPiece.position.set(spawnCord.x, spawnCord.y, spawnCord.z);
    scene.add(currentPiece);
  }

  function spawnJPiece() {
    const geometry = new THREE.BoxGeometry(gridSize, gridSize, gridSize);
    const material = new THREE.MeshToonMaterial({color: 0x19308c});
    const cube = new Physijs.BoxMesh(geometry, material);
    cube.position.set(0, 0, -4);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.updateMatrix();

    const cube2 = new Physijs.BoxMesh(geometry, material);
    cube2.position.set(0, 0, -8);
    cube2.castShadow = true;
    cube2.receiveShadow = true;
    cube2.updateMatrix();

    const cube3 = new Physijs.BoxMesh(geometry, material);
    cube3.position.set(4, 0, -8);
    cube3.castShadow = true;
    cube3.receiveShadow = true;
    cube3.updateMatrix();

    currentPiece = new Physijs.BoxMesh(geometry, material);
    currentPiece.add(cube, cube2, cube3);
    currentPiece.castShadow = true;
    currentPiece.receiveShadow = true;
    currentPiece.collisions = 0;
    currentPiece.position.set(spawnCord.x, spawnCord.y, spawnCord.z);
    scene.add(currentPiece);
  }

  function spawnLPiece() {
    const geometry = new THREE.BoxGeometry(gridSize, gridSize, gridSize);
    const material = new THREE.MeshToonMaterial({color: 0xde7a10});
    const cube = new Physijs.BoxMesh(geometry, material);
    cube.position.set(0, 0, -4);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.updateMatrix();

    const cube2 = new Physijs.BoxMesh(geometry, material);
    cube2.position.set(0, 0, -8);
    cube2.castShadow = true;
    cube2.receiveShadow = true;
    cube2.updateMatrix();

    const cube3 = new Physijs.BoxMesh(geometry, material);
    cube3.position.set(4, 0, 0);
    cube3.castShadow = true;
    cube3.receiveShadow = true;
    cube3.updateMatrix();

    currentPiece = new Physijs.BoxMesh(geometry, material);
    currentPiece.add(cube, cube2, cube3);
    currentPiece.castShadow = true;
    currentPiece.receiveShadow = true;
    currentPiece.position.set(spawnCord.x, spawnCord.y, spawnCord.z);
    scene.add(currentPiece);
  }

  // Spawn pieces randomly
  const pieces = [
    spawnIPiece,
    spawnOPiece,
    spawnTPiece,
    spawnSPiece,
    spawnZPiece,
    spawnJPiece,
    spawnLPiece,
  ];
  pieces[Math.floor((Math.random() * pieces.length))]();

  currentPiece.updateMatrix();
  currentPiece.updateMatrixWorld();
  currentPiece.updateWorldMatrix(true, true);
  currPosX = spawnCord.x;
  currPosZ = spawnCord.z;
  currentPiece.setCcdSweptSphereRadius(0.8);
}

// Spawn arena floor
function setupGround() {
  // Setup placeholder floor
  const floorGeometry = new THREE.BoxGeometry(50, 0.1, 50);
  const floorMaterial = new THREE.MeshPhongMaterial({color: 0x313a3b});
  floorCube = new Physijs.BoxMesh(floorGeometry, floorMaterial, 0);
  floorCube.receiveShadow = true;
  floorCube.position.y = -1;
  scene.add(floorCube);
  floorCube.name = "ground"

  // Draw floor grid
  const lineMaterial = new THREE.MeshPhongMaterial({
    color: 0x000000,
    opacity: 1,
    transparent: true,
  });

  // Draws a straight line with two sets of given vector coordinates
  // Ex.: drawLine([,,], [,,]);
  function drawLine() {
    const points = [];
    points.push(new THREE.Vector3(
      arguments[0][0],
      arguments[0][1],
      arguments[0][2],
    ));
    points.push(new THREE.Vector3(
      arguments[1][0],
      arguments[1][1],
      arguments[1][2],
    ));
    const line = new THREE.BufferGeometry().setFromPoints(points);
    const newline = new THREE.Line(line, lineMaterial);
    scene.add(newline);
  }

  // Draws a specified set of horizontal lines at a given start and unit step.
  // Ex.: horizontalLines([St,ar,t], Step, Total)
  function horizontalLines() {
    let start = arguments[0][2];
    for (let i = 0; i < arguments[2]; i += 1) {
      drawLine(
        [arguments[0][0], arguments[0][1], start],
        [-arguments[0][0], arguments[0][1], start],
      );
      start += arguments[1];
    }
  }
  horizontalLines([-20, 0, -21], gridSize, 11);

  // Draws a specified set of vertical lines at a given start and unit step.
  // Ex.: verticalLines([St,ar,t], Step, Total)
  function verticalLines() {
    let start = arguments[0][0];
    for (let i = 0; i < arguments[2]; i += 1) {
      drawLine(
        [start, arguments[0][1], arguments[0][2]],
        [start, arguments[0][1], -arguments[0][2]],
      );
      start += arguments[1];
    }
  }
  verticalLines([-20, 0, 21], gridSize, 11);
}

// Spawn grid walls
function setupWalls() {
  // Setup placeholder walls
  const sideWallGeometry = new THREE.BoxGeometry(0.1, 50, 40);
  const poleWallGeometry = new THREE.BoxGeometry(40, 50, 0.1);
  const wallMaterial = new THREE.MeshLambertMaterial({
    color: 0x9e0018,
    opacity: 0.1,
    transparent: true,
  });
  // Left
  leftWallCube = new Physijs.BoxMesh(sideWallGeometry, wallMaterial, 0);
  leftWallCube.position.x = -20;
  leftWallCube.position.y = 23;
  leftWallCube.position.z = -1;
  scene.add(leftWallCube);
  leftWallCube.name = "leftWall"
  leftWallCube.geometry.computeBoundingBox();
  // Right
  rightWallCube = new Physijs.BoxMesh(sideWallGeometry, wallMaterial, 0);
  rightWallCube.position.x = 20;
  rightWallCube.position.y = 23;
  rightWallCube.position.z = -1;
  scene.add(rightWallCube);
  rightWallCube.name = "rightWall"
  rightWallCube.geometry.computeBoundingBox();
  // south
  southWallCube = new Physijs.BoxMesh(poleWallGeometry, wallMaterial, 0);
  southWallCube.position.x = 0;
  southWallCube.position.y = 23;
  southWallCube.position.z = 19;
  scene.add(southWallCube);
  southWallCube.name = "southWall"
  southWallCube.geometry.computeBoundingBox();
  // north
  northWallCube = new Physijs.BoxMesh(poleWallGeometry, wallMaterial, 0);
  northWallCube.position.x = 0;
  northWallCube.position.y = 23;
  northWallCube.position.z = -21;
  scene.add(northWallCube);
  northWallCube.name = "northWall"
  northWallCube.geometry.computeBoundingBox();
}

// Singular function to initialize scene + rendering
function init() {
  // Initialize scene
  scene = new Physijs.Scene();
  scene.background = new THREE.Color( 0xcce0ff );

  // Lights
  scene.add( new THREE.AmbientLight( 0x666666 ));
  const light = new THREE.DirectionalLight(0xdfebff, 1);
  light.position.set(0, 50, 0);
  light.position.multiplyScalar(1.3);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  const distance = 300;
  light.shadow.camera.left = - distance;
  light.shadow.camera.right = distance;
  light.shadow.camera.top = distance;
  light.shadow.camera.bottom = -distance;
  light.shadow.camera.far = 1000;
  scene.add(light);

  // Setup perspective camera
  camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
  );
  camera.position.z = 50;
  camera.position.y = 100;
  camera.position.x = 0;

  camera.translateY(10);

  // Setup renderer
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.shadowMap.enabled = true; // Enable shadows
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Setup controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enabled = true;

  // Spawn arena geometry
  setupGround();
  setupWalls();
  // Spawn initial piece
  spawnPiece();
}

// Control animation FPS
// https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe/19772220#19772220
let stop = false;
let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;

// Initialize the timer variables and start the animation
function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  // console.log('start time: ' + startTime);
  animate();
}

// Animate scene
function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    // Get ready for next frame by setting then=now, but...
    // Also, adjust for fpsInterval not being multiple of 16.67
    then = now - (elapsed % fpsInterval);

    // Control block falling speed
    let oldVector = currentPiece.getLinearVelocity();
    let playerVec3 = new THREE.Vector3(oldVector.x, oldVector.y + (-oldVector.y - cubeSpeed), oldVector.z);
    currentPiece.setLinearVelocity(playerVec3);

    currentPiece.__dirtyRotation = true;
    currentPiece.__dirtyPosition = true;

    currentPiece.rotation.y = currRotY;
    currentPiece.rotation.z = 0;
    currentPiece.rotation.x = 0;

    currentPiece.position.z = currPosZ;
    currentPiece.position.x = currPosX;

    // Tetromino
    var boxHelper = new THREE.BoxHelper(currentPiece, 0xff0000);
    boxHelper.update();
    var box = new THREE.Box3();
    currentPiece.geometry.computeBoundingBox();
    box.setFromObject(boxHelper)
    boxHelper.visible = true;
    // If you want a visible bounding box
    // scene.add(boxHelper);
    // console.log(helper) // Logs coordinates

    // Ground
    let floorBoxHelper = new THREE.BoxHelper(floorCube, 0xff0000);
    floorBoxHelper.update();
    let floorBox = new THREE.Box3();
    floorCube.geometry.computeBoundingBox();
    floorBox.setFromObject(floorBoxHelper);

    // Walls
    let leftWallBoxHelper = new THREE.BoxHelper(leftWallCube, 0xff0000);
    leftWallBoxHelper.update();
    let leftWallBox = new THREE.Box3();
    leftWallCube.geometry.computeBoundingBox();
    leftWallBox.setFromObject(leftWallBoxHelper);

    let rightWallBoxHelper = new THREE.BoxHelper(rightWallCube, 0xff0000);
    rightWallBoxHelper.update();
    let rightWallBox = new THREE.Box3();
    rightWallCube.geometry.computeBoundingBox();
    rightWallBox.setFromObject(rightWallBoxHelper);

    let northWallBoxHelper = new THREE.BoxHelper(northWallCube, 0xff0000);
    northWallBoxHelper.update();
    let northWallBox = new THREE.Box3();
    northWallCube.geometry.computeBoundingBox();
    northWallBox.setFromObject(northWallBoxHelper);

    let southWallBoxHelper = new THREE.BoxHelper(southWallCube, 0xff0000);
    southWallBoxHelper.update();
    let southWallBox = new THREE.Box3();
    southWallCube.geometry.computeBoundingBox();
    southWallBox.setFromObject(southWallBoxHelper);

    // Detect piece collisions
    if (box.intersectsBox(floorBox)) {
      console.log('hit ground')
      spawnPiece();
    }
    if (box.intersectsBox(leftWallBox)) {
      leftWallHit = true;
      console.log('hit left wall');
    } else {
      leftWallHit = false;
    }
    if (box.intersectsBox(rightWallBox)) {
      rightWallHit = true;
      console.log('hit right wall');
    } else {
      rightWallHit = false;
    }
    if (box.intersectsBox(southWallBox)) {
      southWallHit = true;
      console.log('hit south wall');
    } else {
      southWallHit = false;
    }
    if (box.intersectsBox(northWallBox)) {
      northWallHit = true;
      console.log('hit north wall');
    } else {
      northWallHit = false;
    }

    // Render
    scene.simulate(); // run physics
    renderer.render(scene, camera);
  }
}

// Ensure scene view resizes with window
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Listen for window resize event
window.addEventListener('resize', onWindowResize, false);

// Handle movement
function movePiece(dir) {
  let num = 1;
  if (dir == 'left' || dir == 'north') {
    num = -1
  };
  if (dir == 'left' || dir == 'right') {
    currPosX += (4 * num);
  } else {
    currPosZ += (4 * num);
  }
};

function rotatePiece(dir) {
  let num = -2;
  if (dir == 'left') {
    num = 2
  };
  currRotY += Math.PI / num;
}

// Listen for keyboard input
document.addEventListener('keydown', onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  const keyCode = event.which;
  // Movement
  if (keyCode == 32) {
    cubeSpeed = 20;
    console.log('space down');
  } else if (keyCode == 68) {
    if (rightWallHit) {
      console.log('hitting right wall, not moving');
    } else {
      //movePiece('right');
    };
    document.getElementById('voiceComs').style.backgroundColor = '#ebe834';
    rightDown = true;
    console.log('d down');
  } else if (keyCode == 65) {
    if (leftWallHit) {
      console.log('hitting left wall, not moving');
    } else {
      //movePiece('left');
    };
    document.getElementById('keyBinds').style.backgroundColor = '#ebe834';
    leftDown = true;
    console.log('a down');
  } else if (keyCode == 87) {
    if (northWallHit) {
      console.log('hitting north wall, not moving');
    } else {
      movePiece('north');
    };
    northDown = true;
    console.log('w down');
  } else if (keyCode == 83) {
    if (southWallHit) {
      console.log('hitting south wall, not moving');
    } else {
      movePiece('south');
    };
    southDown = true;
    console.log('s down');
  } else if (keyCode == 82) {
    currentPiece.position.set(-2, 40, 1);
    console.log('r down');
  }
  // Rotation
  else if (keyCode == 81) {
    if (!hittingWall) {
      // Attempt at cloning piece to test collision...
      // let testpiece = currentPiece.clone();
      // testpiece.rotation.y = Math.PI / -2;
      // testpiece.transparent = true;
      // console.log(testpiece)
      // scene.add(testpiece)
      //   testpiece.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
      //     if (other_object.name == 'leftWall') {
      //       console.log('testpiece hit wall, deleting piece and not rotating');
      //       scene.remove(testpiece)
      //     } else {
      //       scene.remove(testpiece)
      //       rotatePiece('left');
      //     }
      //     // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`
      // });
      // rotatePiece('left');
    };
    leftDown = true;
    console.log('q down');
  }
  else if (keyCode == 69) {
    if (!hittingWall) {
      // rotatePiece('right');
    };
    rightDown = true;
    console.log('e down');
  } else if (keyCode == 84) {
    spawnPiece();
  };
};

document.addEventListener('keyup', onDocumentKeyUp, false);
function onDocumentKeyUp(event) {
  const keyCode = event.which;
  if (keyCode == 32) {
    cubeSpeed = defaultCubeSpeed;
    console.log('space up');
  }
  else if (keyCode == 68) {
    document.getElementById('voiceComs').style.backgroundColor = 'transparent';
    console.log('d up');
    rightDown = false;
  }
  else if (keyCode == 65) {
    document.getElementById('keyBinds').style.backgroundColor = 'transparent';
    console.log('a up');
    leftDown = false;
  }
  else if (keyCode == 87) {
    console.log('w up');
    northDown = false;
  }
  else if (keyCode == 83) {
    console.log('s up');
    southDown = false;
  }
};

// Handle microphone input
window.addEventListener('DOMContentLoaded', () => {
  // Initialize music player controls
  var music = document.getElementById('soundtrack');
  music.volume = 0.05;
  music.controls = true;

  const button = document.getElementById("button");
  const main = document.getElementsByTagName("main")[0];
  let listening = false;
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (typeof SpeechRecognition !== "undefined") {
    const recognition = new SpeechRecognition();

    const stop = () => {
      main.classList.remove("speaking");
      recognition.stop();
      button.textContent = "Start playing";
    };

    const start = () => {
      main.classList.add("speaking");
      recognition.start();
      button.textContent = "Stop listening";
      button.hidden = true;
      music.play();
      init();
      startAnimating(60);
    };

    const onResult = (event) => {
      for (const res of event.results) {
        // Try to filter rapid voice results
        if (res.isFinal) {
          speechSynthesis.pause();
          // console.log(res);
          let matchedWord = res[0].transcript.trim().split(' ');
          if (matchedWord.length != 0) {
            matchedWord = matchedWord.sort();
            // Find most used word
            let counts = {};
            let countsArr = [];
            for (let i = 0; i < matchedWord.length; i++) {
              counts[matchedWord[i]] = 1 + (counts[matchedWord[i]] || 0);
            }
            for (let command in counts) {
              countsArr.push([command, counts[command]]);
          }
          let newBig = 0;
          countsArr.sort(function(a, b) {
              return a[1] - b[1];
          });          
            // console.log(countsArr);
            for (let arr in countsArr) {
              if (countsArr[arr][1] > newBig) {
                newBig = arr;
              }
            }
            console.log('the final word is ' + countsArr[newBig][0])
            // Set most used word to matchedWord
            matchedWord = countsArr[newBig][0];
          }

          // console.log(matchedWord);
          if (matchedWord == voiceCommands[0]) {
            console.log("matched " + voiceCommands[0]);
            if (rightDown) {
              rotatePiece('right');
            } else if (leftDown) {
              rotatePiece('left');
            } else if (northDown) {
              rotatePiece('north');
            } else if (southDown) {
              rotatePiece('south');
            } else {
              console.log('no direction specified');
            }
          } else if (matchedWord == voiceCommands[1]) {
            console.log("matched " + voiceCommands[1])
            if (rightDown) {
              movePiece('right');
            } else if (leftDown) {
              movePiece('left');
            } else if (northDown) {
              movePiece('north');
            } else if (southDown) {
              movePiece('south');
            } else {
              console.log('no direction specified');
            }
          } else if (matchedWord == voiceCommands[2]) {
            console.log("matched " + voiceCommands[2])
            // TODO: Ensure pieces drop at same place as they land 'naturally'
            currentPiece.position.set(currentPiece.position.x, 0.6, currentPiece.position.z);
          } else if (matchedWord == voiceCommands[3]) {
            console.log("matched " + voiceCommands[3]);
          } else if (matchedWord == voiceCommands[4]) {
            spawnPiece();
            console.log("matched " + voiceCommands[4]);
          } else {
            console.log('No voice commands recognized');
          };
          speechSynthesis.cancel();
          speechSynthesis.resume();
        }
      }
    };
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.addEventListener("result", onResult);
    button.addEventListener("click", event => {
      listening ? stop() : start();
      listening = !listening;
    });
  } else {
    button.remove();
    const message = document.getElementById("message");
    message.removeAttribute("hidden");
    message.setAttribute("aria-hidden", "false");
  }
});
