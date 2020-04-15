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
    50,
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
  const geometry = new THREE.BoxGeometry(2,2,2);
  const material = new THREE.MeshPhongMaterial({color: 0x9e0018});
  cube = new THREE.Mesh(geometry, material);
  cube.position.y = 20;
  scene.add(cube);
  cube.castShadow = true;

  // Setup placeholder floor
  const floorGeometry = new THREE.BoxGeometry(50, 0.1, 50);
  const floorMaterial = new THREE.MeshLambertMaterial({color: 0x313a3b});
  floorCube = new THREE.Mesh(floorGeometry, floorMaterial);
  floorCube.position.y = -1;
  scene.add(floorCube);
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