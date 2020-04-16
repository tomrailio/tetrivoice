/* eslint-disable require-jsdoc */
const gridSize = 4;
let scene;
let camera;
let renderer;
// let cube;
let floorCube;
let longPiece;
// Cube animation vars
let dxPerFrameX = 0;
let dxPerFrameY = 1;
let dxPerFrameZ = 0;

// Spawn cube function
// Expand to handle all blocks.
// function spawnCube() {
//   const geometry = new THREE.BoxGeometry(gridSize, gridSize, gridSize);
//   const material = new THREE.MeshPhongMaterial({color: 0x9e0018});
//   cube = new THREE.Mesh(geometry, material);

//   let ballGeo = new THREE.SphereGeometry(4,4,4);

//   cube.updateMatrix();
//   ballGeo.merge(cube.geometry, cube.matrix);

//   let ballcube = new THREE.Mesh(ballGeo, material)
//   scene.add(ballcube)

//   cube.position.y = 20;
//   cube.position.z = -3;
//   cube.position.x = -2;
//   cube.castShadow = true;
//   cube.receiveShadow = true;
//   //scene.add(cube);
// };

function spawnPiece() {
  const geometry = new THREE.BoxGeometry(gridSize, gridSize, gridSize);
  const material = new THREE.MeshToonMaterial({color: 0x9e0018});
  let cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 0, -4);
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.updateMatrix();

  let cube2 = new THREE.Mesh(geometry, material);
  cube2.position.set(0, 0, -8);
  cube2.castShadow = true;
  cube2.receiveShadow = true;
  cube2.updateMatrix();

  let cube3 = new THREE.Mesh(geometry, material);
  cube3.position.set(0, 0, -12);
  cube3.castShadow = true;
  cube3.receiveShadow = true;
  cube3.updateMatrix();

  let cube4 = new THREE.BoxGeometry(gridSize, gridSize, gridSize);
  cube4.merge(cube.geometry, cube.matrix)
  cube4.merge(cube2.geometry, cube2.matrix)
  cube4.merge(cube3.geometry, cube3.matrix)

  longPiece = new THREE.Mesh(cube4, material)
  longPiece.castShadow = true;
  longPiece.receiveShadow = true;
  scene.add(longPiece);
  longPiece.position.set(-2, 20, 1);
}

// Singular function to initialize scene + rendering
function init() {
  // Initialize scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xcce0ff );

  // Add Fog
  // scene.fog = new THREE.Fog( 0xcce0ff, 10, 10000 );

  // Lights
  scene.add( new THREE.AmbientLight ( 0x666666 ));
  let light = new THREE.DirectionalLight (0xdfebff, 1);
  light.position.set(0,50,0);
  light.position.multiplyScalar(1.3);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  let distance = 300;
  light.shadow.camera.left = - distance;
  light.shadow.camera.right = distance;
  light.shadow.camera.top = distance;
  light.shadow.camera.bottom = -distance;
  light.shadow.camera.far = 1000;

  scene.add(light);

  // Setup perspective cameras
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 50;
  camera.position.y = 100;
  camera.position.x = 0;

  // Setup renderer
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.shadowMap.enabled = true; // Enable shadows
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Spawn initial cube
  //spawnCube();
  spawnPiece();

  // Setup placeholder floor
  const floorGeometry = new THREE.BoxGeometry(100, 0.1, 100);
  const floorMaterial = new THREE.MeshPhongMaterial({color: 0x313a3b});
  floorCube = new THREE.Mesh(floorGeometry, floorMaterial);
  floorCube.receiveShadow = true;
  floorCube.position.y = -1;
  scene.add(floorCube);

  // Draw floor grid
  const lineMaterial = new THREE.MeshPhongMaterial({
    color: 0x000000,
    opacity: 1,
    transparent: true,
  });

  // Draws a straight line with two sets of given vector coordinates
  // Ex.: drawLine([,,], [,,]);
  function drawLine() {
    let points = [];
    points.push(new THREE.Vector3(arguments[0][0], arguments[0][1], arguments[0][2]));
    points.push(new THREE.Vector3(arguments[1][0], arguments[1][1], arguments[1][2]));
    // console.log(points);
    let line = new THREE.BufferGeometry().setFromPoints(points);
    let newline = new THREE.Line(line, lineMaterial);
    scene.add(newline);
  }

  // Draws a specified set of horizontal lines at a given start and unit step.
  // Ex.: horizontalLines([St,ar,t], Step, Total)
  function horizontalLines() {
    let start = arguments[0][2];
    for (let i = 0; i < arguments[2]; i += 1) {
      drawLine([arguments[0][0], arguments[0][1], start], [-arguments[0][0], arguments[0][1], start]);
      start += arguments[1];
    }
  }
  horizontalLines([-20, 0, -21], gridSize, 11);

  // Draws a specified set of vertical lines at a given start and unit step.
  // Ex.: verticalLines([St,ar,t], Step, Total)
  function verticalLines() {
    let start = arguments[0][0];
    for (let i = 0; i < arguments[2]; i += 1) {
      drawLine([start, arguments[0][1], arguments[0][2]], [start, arguments[0][1], -arguments[0][2]]);
      start += arguments[1];
    }
  }
  verticalLines([-20, 0, 21], gridSize, 11);

  // Setup placeholder walls
  const sideWallGeometry = new THREE.BoxGeometry(0.1, 50, 40);
  const poleWallGeometry = new THREE.BoxGeometry(40, 50, 0.1);
  const wallMaterial = new THREE.MeshLambertMaterial({
    color: 0x9e0018,
    opacity: 0.1,
    transparent: true,
  });
  // Left
  leftWallCube = new THREE.Mesh(sideWallGeometry, wallMaterial);
  leftWallCube.position.x = -20;
  leftWallCube.position.y = 23;
  leftWallCube.position.z = -1;
  scene.add(leftWallCube);
  // Right
  rightWallCube = new THREE.Mesh(sideWallGeometry, wallMaterial);
  rightWallCube.position.x = 20;
  rightWallCube.position.y = 23;
  rightWallCube.position.z = -1;
  scene.add(rightWallCube);
  // south
  northWallCube = new THREE.Mesh(poleWallGeometry, wallMaterial);
  northWallCube.position.x = 0;
  northWallCube.position.y = 23;
  northWallCube.position.z = 19;
  scene.add(northWallCube);
  // north
  southWallCube = new THREE.Mesh(poleWallGeometry, wallMaterial);
  southWallCube.position.x = 0;
  southWallCube.position.y = 23;
  southWallCube.position.z = -21;
  scene.add(southWallCube);
}

// Animate scene
function animate() {
  requestAnimationFrame(animate);

  // Move cube
  longPiece.position.x += dxPerFrameX;
  longPiece.position.y += dxPerFrameY;
  longPiece.position.z += dxPerFrameZ;

  // If cube hits ground, stop
  if(longPiece.position.y > 20) {
    dxPerFrameY = -0.05;
  }
  if(longPiece.position.y <= 0) {
    dxPerFrameY = 0;
    spawnPiece();
    dxPerFrameY = -0.05;
  }

  // Render
  renderer.render(scene, camera);
}

// Ensure scene view resizes with window
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Listen for window resize event
window.addEventListener('resize', onWindowResize, false);

// Listen for keyboard input
document.addEventListener('keydown', onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  let keyCode = event.which;
  if (keyCode == 32) {
    // Move cube faster if spacebar held down
    if(longPiece.position.y <= 0) {
      dxPerFrameY = 0;
    } else {
      dxPerFrameY = -0.2;
    }
    console.log("space down")
  }
  else if (keyCode == 68) {
    if(longPiece.position.x <= 16 && dxPerFrameY < 0) {
      longPiece.position.x += gridSize
    } else {
      dxPerFrameX = 0;
    }
    console.log("d down")
  }
  else if (keyCode == 65) {
    if(longPiece.position.x >= -16 && dxPerFrameY < 0) {
      longPiece.position.x -= gridSize
    } else {
      dxPerFrameX = 0;
    }
    console.log("a down")
  }
  else if (keyCode == 87) {
    if(longPiece.position.z >= -16 && dxPerFrameY < 0) {
      longPiece.position.z -= gridSize
    } else {
      dxPerFrameZ = 0;
    }
    console.log("w down")
  }
  else if (keyCode == 83) {
    if(longPiece.position.z <= 16 && dxPerFrameY < 0) {
      longPiece.position.z += gridSize
    } else {
      dxPerFrameZ = 0;
    }
    console.log("s down");
  }
  else if (keyCode == 82) {
    longPiece.position.y = 20;
    dxPerFrameY = -0.05;
    console.log("r down")
  }
};

document.addEventListener('keyup', onDocumentKeyUp, false);
function onDocumentKeyUp(event) {
  let keyCode = event.which;
  if (keyCode == 32) {
    if (longPiece.position.y <= 0) {
      dxPerFrameY = 0;
    } else {
      dxPerFrameY = -0.05;
    }
    console.log("space up");
  }
  else if (keyCode == 68) {
    dxPerFrameX = 0;
    console.log("d up");
  }
  else if (keyCode == 65) {
    dxPerFrameX = 0;
    console.log("a up");
  }
  else if (keyCode == 87) {
    dxPerFrameZ = 0;
    console.log("w up");
  }
  else if (keyCode == 83) {
    dxPerFrameZ = 0;
    console.log("s up");
  }
};

init();
animate();
