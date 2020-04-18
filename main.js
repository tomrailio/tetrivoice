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
let floorCube;
let currentPiece;
let pieceCollision;
let collidableMeshList = [];
let hitCounter = 0;

// voice Recognition
const voiceCommands = [
  'rotate',
  'move',
  'drop',
  'swap',
  'spawn'
];

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

  // Attempt at handling collisions
  currentPiece.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
    // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`
    // console.log(other_object);
    // console.log(relative_rotation);
    // console.log(relative_velocity);
    // console.log(contact_normal);
  });

  currentPiece.updateMatrix();
}

// Spawn arena floor
function setupGround() {
  // Setup placeholder floor
  const floorGeometry = new THREE.BoxGeometry(100, 0.1, 100);
  const floorMaterial = new THREE.MeshPhongMaterial({color: 0x313a3b});
  floorCube = new Physijs.BoxMesh(floorGeometry, floorMaterial, 0);
  floorCube.receiveShadow = true;
  floorCube.position.y = -1;
  scene.add(floorCube);
  floorCube.name = "ground"
  collidableMeshList.push(floorCube);

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
  //collidableMeshList.push(leftWallCube);
  // Right
  rightWallCube = new Physijs.BoxMesh(sideWallGeometry, wallMaterial, 0);
  rightWallCube.position.x = 20;
  rightWallCube.position.y = 23;
  rightWallCube.position.z = -1;
  scene.add(rightWallCube);
  rightWallCube.name = "rightWall"
  //collidableMeshList.push(rightWallCube);
  // south
  northWallCube = new Physijs.BoxMesh(poleWallGeometry, wallMaterial, 0);
  northWallCube.position.x = 0;
  northWallCube.position.y = 23;
  northWallCube.position.z = 19;
  scene.add(northWallCube);
  northWallCube.name = "northWall"
  //collidableMeshList.push(northWallCube);
  // north
  southWallCube = new Physijs.BoxMesh(poleWallGeometry, wallMaterial, 0);
  southWallCube.position.x = 0;
  southWallCube.position.y = 23;
  southWallCube.position.z = -21;
  scene.add(southWallCube);
  southWallCube.name = "southWall"
  //collidableMeshList.push(southWallCube);
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

  // Setup renderer
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.shadowMap.enabled = true; // Enable shadows
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Setup controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enabled = false;

  // Spawn arena geometry
  setupGround();
  setupWalls();
  // Spawn initial piece
  spawnPiece();
}

// Animate scene
function animate() {
  requestAnimationFrame(animate);

  currentPiece.__dirtyRotation = true;
  currentPiece.__dirtyPosition = true;

  // Attempt at handling collisions
  var originPoint = currentPiece.position.clone();
  for (var vertexIndex = 0; vertexIndex < currentPiece.geometry.vertices.length; vertexIndex++) {		
		var localVertex = currentPiece.geometry.vertices[vertexIndex].clone();
		var globalVertex = localVertex.applyMatrix4( currentPiece.matrix );
		var directionVector = globalVertex.sub( currentPiece.position );
		
		var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
		var collisionResults = ray.intersectObjects( collidableMeshList );
		if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
      hitCounter += 1
      console.log(" Hit ");
      if (hitCounter > 6) {
        pieceCollision = true;
        hitCounter = 0;
        //collidableMeshList.push(currentPiece);
        spawnPiece();
      }
    } else {
      pieceCollision = false;
    };
  };

  // Render
  scene.simulate();
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
  const keyCode = event.which;
  // Movement
  if (keyCode == 32) {
    let oldVector = currentPiece.getLinearVelocity();
    let playerVec3 = new THREE.Vector3(oldVector.x, oldVector.y + 1.5 * -10, oldVector.z);
    currentPiece.setLinearVelocity(playerVec3);
    // console.log(floorCube._physijs.id)
    // console.log(currentPiece._physijs.touches.indexOf(floorCube._physijs.id))
    // if (currentPiece._physijs.touches.indexOf(floorCube._physijs.id) == 0) {
    //   console.log("ground hit");
    // }
    console.log('space down');
  } else if (keyCode == 68) {
      if (currentPiece.position.x < 12) {
        currentPiece.position.set(currentPiece.position.x + 4, currentPiece.position.y, currentPiece.position.z);
      } else {
        let oldVector = currentPiece.getLinearVelocity();
        let playerVec3 = new THREE.Vector3(oldVector.x + 1.5 * 1, oldVector.y, oldVector.z);
        currentPiece.setLinearVelocity(playerVec3)
      }
      // console.log(leftWallCube._physijs.id)
      // console.log(currentPiece._physijs.touches)
      console.log('d down');
  } else if (keyCode == 65) {
      if (currentPiece.position.x > -12) {
        currentPiece.position.set(currentPiece.position.x - 4, currentPiece.position.y, currentPiece.position.z);
      } else {
        let oldVector = currentPiece.getLinearVelocity();
        let playerVec3 = new THREE.Vector3(oldVector.x + 1.5 * -1, oldVector.y, oldVector.z);
        currentPiece.setLinearVelocity(playerVec3)
      }
      console.log('a down');
  } else if (keyCode == 87) {
    if (currentPiece.position.z > -4) {
      currentPiece.position.set(currentPiece.position.x, currentPiece.position.y, currentPiece.position.z - 4);
    } else {
      let oldVector = currentPiece.getLinearVelocity();
      let playerVec3 = new THREE.Vector3(oldVector.x, oldVector.y, oldVector.z + 1.5 * -1);
      currentPiece.setLinearVelocity(playerVec3)
    }
    console.log('w down');
  } else if (keyCode == 83) {
    if (currentPiece.position.z < 12) {
      currentPiece.position.set(currentPiece.position.x, currentPiece.position.y, currentPiece.position.z + 4);
    } else {
      let oldVector = currentPiece.getLinearVelocity();
      let playerVec3 = new THREE.Vector3(oldVector.x, oldVector.y, oldVector.z + 1.5 * 1);
      currentPiece.setLinearVelocity(playerVec3)
    }
    console.log('s down');
    console.log(currentPiece.position)
  } else if (keyCode == 82) {
    currentPiece.position.set(-2, 20, 1);
    console.log('r down');
  }
  // Rotation
  else if (keyCode == 81) {
    currentPiece.rotation.y += Math.PI / -2;
    console.log('q down');
  }
  else if (keyCode == 69) {
    currentPiece.rotation.y += Math.PI / 2;
    console.log('e down');
  } else if (keyCode == 84) {
    spawnPiece();
  };
};

document.addEventListener('keyup', onDocumentKeyUp, false);
function onDocumentKeyUp(event) {
  const keyCode = event.which;
  if (keyCode == 32) {
    let oldVector = currentPiece.getLinearVelocity();
    let playerVec3 = new THREE.Vector3(oldVector.x, oldVector.y + -oldVector.y, oldVector.z);
    currentPiece.setLinearVelocity(playerVec3);
    console.log('space up');
  }
  else if (keyCode == 68) {
    let oldVector = currentPiece.getLinearVelocity();
    let playerVec3 = new THREE.Vector3(oldVector.x + -oldVector.x, oldVector.y, oldVector.z);
    currentPiece.setLinearVelocity(playerVec3)
    console.log('d up');
  }
  else if (keyCode == 65) {
    let oldVector = currentPiece.getLinearVelocity();
    let playerVec3 = new THREE.Vector3(oldVector.x + -oldVector.x, oldVector.y, oldVector.z);
    currentPiece.setLinearVelocity(playerVec3)
    console.log('a up');
  }
  else if (keyCode == 87) {
    let oldVector = currentPiece.getLinearVelocity();
    let playerVec3 = new THREE.Vector3(oldVector.x, oldVector.y, oldVector.z + -oldVector.z);
    currentPiece.setLinearVelocity(playerVec3)
    console.log('w up');
  }
  else if (keyCode == 83) {
    let oldVector = currentPiece.getLinearVelocity();
    let playerVec3 = new THREE.Vector3(oldVector.x, oldVector.y, oldVector.z + -oldVector.z);
    currentPiece.setLinearVelocity(playerVec3)
    console.log('s up');
  }
};

// Handle microphone input
window.addEventListener('DOMContentLoaded', () => {
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
      init();
      animate();
    };

    const onResult = (event) => {
      for (const res of event.results) {
        // Try to filter rapid voice results
        if (res.isFinal) {
          speechSynthesis.pause();
          console.log(res);
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
            console.log(countsArr);
            for (let arr in countsArr) {
              if (countsArr[arr][1] > newBig) {
                newBig = arr;
              }
            }
            console.log('the final word is ' + countsArr[newBig][0])
            // Set most used word to matchedWord
            matchedWord = countsArr[newBig][0];
          }

          console.log(matchedWord);
          if (matchedWord == voiceCommands[0]) {
            console.log("matched " + voiceCommands[0]);
            currentPiece.rotation.y += Math.PI / 2;
            console.log('rotated piece')
          } else if (matchedWord == voiceCommands[1]) {
            console.log("matched " + voiceCommands[1])
            let oldVector = currentPiece.getLinearVelocity();
            let playerVec3 = new THREE.Vector3(oldVector.x + 1.5 * 1, oldVector.y, oldVector.z);
            currentPiece.setLinearVelocity(playerVec3)
          } else if (matchedWord == voiceCommands[2]) {
            console.log("matched " + voiceCommands[2])
            let oldVector = currentPiece.getLinearVelocity();
            let playerVec3 = new THREE.Vector3(oldVector.x, oldVector.y + 1.5 * -10, oldVector.z);
            currentPiece.setLinearVelocity(playerVec3);
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
