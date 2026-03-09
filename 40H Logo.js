//RENDERER SETUP
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.querySelector('.webGLContainer')
    .appendChild(renderer.domElement)

//SCENE SETUP
const scene = new THREE.Scene()

//CAMERA 
const camera = new THREE.PerspectiveCamera(100,
    window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(5, 0, 10)
camera.lookAt(0, 0, 0)

let FourtylogoMesh
const FourtyArmy = new THREE.Group()

const modelLoader = new THREE.GLTFLoader()
modelLoader.load('assets/40hlogo.glb', (glb)=> {
    console.log(glb)
    glb.scene.traverse(child=> {
        if(child instanceof THREE.Mesh) {
        FourtylogoMesh = child 
        FourtylogoMesh.material = new THREE.MeshNormalMaterial();
        }
    })

    // for (let i = 0; i < 10; i++) {
    //     const c = FourtylogoMesh.clone()
    //     c.rotation.y = Math.PI / 2
    //     c.scale.set(i, i, i)
    //     FourtyArmy.add(c)
    // }

    scene.add(FourtylogoMesh)
})


//RENDER LOOP
function update() {
    if (FourtylogoMesh != undefined){
        //CubeMesh.rotation.x += 0.01;
        FourtylogoMesh.rotation.y += -0.01;
        FourtylogoMesh.scale.y += 0.01;
         FourtylogoMesh.scale.x += 0.001;
    }



    renderer.render(scene, camera);
    requestAnimationFrame(update)
}

update()