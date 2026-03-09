//RENDERER SETUP
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.debug.checkShaderErrors = true
document.querySelector('.webGLContainer')
    .appendChild(renderer.domElement)

//SCENE SETUP
const scene = new THREE.Scene()

//CAMERA 
const camera = new THREE.PerspectiveCamera(30,
    window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 10)
camera.lookAt(0, 0, 0)

const clock = new THREE.Clock()

const uniforms = {
    colorA: {
        value: new THREE.Color(0x00000)
    },
    colorB: {
        value: new THREE.Color(0x0000FF)
    },
    uTime: { value: 0 }
}

const cubeGeom = new THREE.BoxGeometry(1, 4, 1,);
const cubeMat = new THREE.ShaderMaterial({
    vertexShader: simpleVert,
    fragmentShader: simpleFrag,
    uniforms: uniforms,
});
const cubMesh = new THREE.Mesh(cubeGeom, cubeMat);
scene.add(cubMesh)



//RENDER LOOP
function update() {

uniforms.uTime.value = clock.getElapsedTime()

    //cubMesh.rotation.x += 0.01;
    cubMesh.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(update)
}

update()