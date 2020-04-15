/* eslint-disable require-jsdoc */
let scene;
let camera;
let renderer;
let cube;
let floorCube;

// Singular function to initialize scene + rendering
function init() {
  // Initialize scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xcce0ff );
  // Add Fog
  scene.fog = new THREE.Fog( 0xcce0ff, 10, 10000 );

  // Lights
  scene.add( new THREE.AmbientLight ( 0x666666 ));
  let light = new THREE.DirectionalLight (0xdfebff, 1);
  light.position.set(0,50,0);
  light.position.multiplyScalar(1.3);

  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;

  // Bad var name
  let d = 300;

  light.shadow.camera.left = - d;
  light.shadow.camera.right = d;
  light.shadow.camera.top = d;
  light.shadow.camera.bottom = -d;
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
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Setup placeholder cube
  const geometry = new THREE.BoxGeometry(4, 4, 4);
  const material = new THREE.MeshPhongMaterial({color: 0x9e0018});
  cube = new THREE.Mesh(geometry, material);
  cube.position.y = 20;
  cube.position.z = -3;
  cube.position.x = -2;
  scene.add(cube);
  cube.castShadow = true;

  // Setup placeholder floor
  const floorGeometry = new THREE.BoxGeometry(100, 0.1, 100);
  const floorMaterial = new THREE.MeshLambertMaterial({color: 0x313a3b});
  floorCube = new THREE.Mesh(floorGeometry, floorMaterial);
  floorCube.position.y = -1;
  scene.add(floorCube);
  // DUMB Floor Grid
  const lineMaterial = new THREE.MeshLambertMaterial({
    color: 0x000000,
    opacity: 1,
    transparent: true,
  });
  let points = [];
  points.push(new THREE.Vector3(0, 0, -21));
  points.push(new THREE.Vector3(-20, 0, -21));
  points.push(new THREE.Vector3(20, 0, -21));
  let line = new THREE.BufferGeometry().setFromPoints(points);
  let newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(-20, 0, -17));
  points.push(new THREE.Vector3(20, 0, -17));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(-20, 0, -13));
  points.push(new THREE.Vector3(20, 0, -13));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(-20, 0, -9));
  points.push(new THREE.Vector3(20, 0, -9));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(-20, 0, -5));
  points.push(new THREE.Vector3(20, 0, -5));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(-20, 0, -1));
  points.push(new THREE.Vector3(20, 0, -1));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(-20, 0, 3));
  points.push(new THREE.Vector3(20, 0, 3));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(-20, 0, 7));
  points.push(new THREE.Vector3(20, 0, 7));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(-20, 0, 11));
  points.push(new THREE.Vector3(20, 0, 11));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(-20, 0, 15));
  points.push(new THREE.Vector3(20, 0, 15));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(-20, 0, 19));
  points.push(new THREE.Vector3(20, 0, 19));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  // vertical lines
  points = [];
  points.push(new THREE.Vector3(0, -1, 21));
  points.push(new THREE.Vector3(0, 0, -21));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(4, -1, 21));
  points.push(new THREE.Vector3(4, 0, -21));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(-4, -1, 21));
  points.push(new THREE.Vector3(-4, 0, -21));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(-8, -1, 21));
  points.push(new THREE.Vector3(-8, 0, -21));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(8, -1, 21));
  points.push(new THREE.Vector3(8, 0, -21));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(12, -1, 21));
  points.push(new THREE.Vector3(12, 0, -21));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(-12, -1, 21));
  points.push(new THREE.Vector3(-12, 0, -21));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(16, -1, 21));
  points.push(new THREE.Vector3(16, 0, -21));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(-16, -1, 21));
  points.push(new THREE.Vector3(-16, 0, -21));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(20, -1, 21));
  points.push(new THREE.Vector3(20, 0, -21));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  points = [];
  points.push(new THREE.Vector3(-20, -1, 21));
  points.push(new THREE.Vector3(-20, 0, -21));
  line = new THREE.BufferGeometry().setFromPoints(points);
  newline = new THREE.Line(line, lineMaterial);
  scene.add(newline);

  // function makeLine(array) {
  //   let points = [];
  //   console.log(array[0]);
  //   console.log(array[0], array[1], array[2]);
  //   points.push(new THREE.Vector3(array[0], array[1], array[2]));
  //   console.log(points[0]);
  //   let line = new THREE.BufferGeometry().setFromPoints(points[0]);
  //   let newline = new THREE.Line(line, lineMaterial);
  //   scene.add(newline);
  // }

  // makeLine([-21, 21, 0]);

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

// Setup cube animation vars
let dxPerFrameX = 0;
let dxPerFrameY = 1;
let dxPerFrameZ = 0;

// Animate scene
function animate() {
  requestAnimationFrame(animate);

  // Move cube
  cube.position.x += dxPerFrameX;
  cube.position.y += dxPerFrameY;
  cube.position.z += dxPerFrameZ;

  // If cube hits ground, stop
  if(cube.position.y > 20) dxPerFrameY = -0.05;
  if(cube.position.y <= 0) dxPerFrameY = 0;

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
    if(cube.position.y <= 0) {
      dxPerFrameY = 0;
    } else {
      dxPerFrameY = -0.2;
    }
    console.log("space down")
  }
  else if (keyCode == 68) {
    if(cube.position.x <= 20 && dxPerFrameY < 0) {
      dxPerFrameX = 0.1;
    } else {
      dxPerFrameX = 0;
    }
    console.log("d down")
  }
  else if (keyCode == 65) {
    if(cube.position.x >= -20 && dxPerFrameY < 0) {
      dxPerFrameX = -0.1;
    } else {
      dxPerFrameX = 0;
    }
    console.log("a down")
  }
  else if (keyCode == 87) {
    if(cube.position.z >= -20 && dxPerFrameY < 0) {
      dxPerFrameZ = -0.1
    } else {
      dxPerFrameZ = 0;
    }
    console.log("w down")
  }
  else if (keyCode == 83) {
    if(cube.position.z <= 20 && dxPerFrameY < 0) {
      dxPerFrameZ = 0.1;
    } else {
      dxPerFrameZ = 0;
    }
    console.log("s down");
  }
  else if (keyCode == 82) {
    cube.position.y = 20;
    dxPerFrameY = -0.05;
    console.log("r down")
  }
};

document.addEventListener('keyup', onDocumentKeyUp, false);
function onDocumentKeyUp(event) {
  let keyCode = event.which;
  if (keyCode == 32) {
    if (cube.position.y <= 0) {
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
