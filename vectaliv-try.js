// RENDERER SETUP
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.debug.checkShaderErrors = true
document.querySelector('.webGLContainer')
    .appendChild(renderer.domElement)

// SCENE SETUP
const scene = new THREE.Scene()

// CAMERA 
const camera = new THREE.PerspectiveCamera(30,
    window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 15)
camera.lookAt(0, 0, 0)

const clock = new THREE.Clock()

// CUBE GEOMETRY
const cubeGeom = new THREE.BoxGeometry(1, 9, 1);

// GROUP UNTUK SEMUA CUBE
const cubeGroup = new THREE.Group();
scene.add(cubeGroup);

// DUPLICATE CUBE 10x
for (let i = 0; i < 30; i++) {
    // buat material baru tiap cube
    const cubeMat = new THREE.ShaderMaterial({
    vertexShader: simpleVert,
    fragmentShader: simpleFrag,
    uniforms: {
        colorA: { value: new THREE.Color(0x0000ff) },
        colorB: { value: new THREE.Color(0x000000) },
        uTime: { value: 0 }
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending
});

    const cube = new THREE.Mesh(cubeGeom, cubeMat);

    // posisi cube
    cube.position.x = (i - 10) * 1.4; // spasi antar cube
    cube.position.y = 0;
    cube.position.z = 0;

    cubeGroup.add(cube);
}

// Tambahkan di atas render loop
const mouse = new THREE.Vector2(0, 0);

// Event listener untuk mouse move
const mouseOffset = new THREE.Vector2(0, 0);

window.addEventListener('mousemove', (event) => {
    mouseOffset.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseOffset.y = - (event.clientY / window.innerHeight) * 2 + 1;
});

// RENDER LOOP
function update() {
    const elapsed = clock.getElapsedTime();

    cubeGroup.children.forEach(cube => {
        // update uTime untuk gradient
        //cube.material.uniforms.uTime.value = elapsed;

        // subtle loop rotation
        cube.rotation.y += 0.001 + cube.position.x * 0.0005;
        //cube.rotation.x += 0.001 + cube.position.y * 0.0005;

        // mouse rotation offset
        const targetY = mouseOffset.x * Math.PI * 0.2;
        //const targetX = mouseOffset.y * Math.PI * 0.2;

        cube.rotation.y += (targetY) * 0.05; // tambah offset mouse
        //cube.rotation.x += (targetX) * 0.05;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(update);
}
// function update() {
//     const elapsed = clock.getElapsedTime();

//     cubeGroup.children.forEach(cube => {
//         // update uTime untuk gradient
//         //cube.material.uniforms.uTime.value = elapsed;

//         // rotasi tiap cube
//         cube.rotation.y += 0.005;
//     });

//     renderer.render(scene, camera);
//     requestAnimationFrame(update);
// }

update();