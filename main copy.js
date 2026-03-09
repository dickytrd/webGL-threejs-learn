//RENDERER SETUP
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.querySelector('.webGLContainer')
    .appendChild(renderer.domElement)

//SCENE SETUP
const scene = new THREE.Scene()

//CAMERA 
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 5, 10)
camera.lookAt(0, 0, 0)

const cubeGeom = new THREE.BoxGeometry(1, 1, 9);
const cubeMat = new THREE.MeshNormalMaterial();
const cubMesh = new THREE.Mesh(cubeGeom, cubeMat);
scene.add(cubMesh)

const modelLoader = new THREE.GLTFLoader()
modelLoader.load('assets/40hlogo.glb', (glb)=> {
    console.log(glb)
    scene.add(glb.scene)
    glb.scene.traverse(child=> {
    if(child.name == 'Cube')
        //console.log(child)
    child.material = new THREE.MeshNormalMaterial();
    })
})


//RENDER LOOP
function update() {

    cubMesh.rotation.x += 0.01;
    cubMesh.rotation.y += 0.01;
    cubMesh.scale.y += 0.1;

    renderer.render(scene, camera);
    requestAnimationFrame(update)
}

update()

// For Duplicated
    // for (let i = 0; i < 10; i++) {
    //     const c = FourtylogoMesh.clone()
    //     c.rotation.y = Math.PI / 2
    //     c.scale.set(i, i, i)
    //     FourtyArmy.add(c)
    // }