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
camera.position.set(0, 0, 10)
camera.lookAt(0, 0, 0)

let FourtylogoMesh
const FourtyArmy = new THREE.Group()
const uniforms = {
       colorA: {
        value: new THREE.Color(0x000000)
    },
    colorB: {
        value: new THREE.Color(0x0000FF)
    }
}

// Pemanggil Object blender
const modelLoader = new THREE.GLTFLoader()
modelLoader.load('assets/squareRing.glb', (glb)=> {
    console.log(glb)
    glb.scene.traverse(child=> {
        if(child instanceof THREE.Mesh) {
        FourtylogoMesh = child 
        FourtylogoMesh.material = new THREE.ShaderMaterial({ //ganti jenis sama warna material
                vertexShader: simpleVert,
                fragmentShader: simpleFrag,
                uniforms: uniforms,
                transparent: true,
                depthWrite: false,
                blending: THREE.NormalBlending
                
            // color: 0x0000ff,
            // metalness: 0.6,
            // roughness: 0.1,
        });
        }
    })
 


        //ini buat ngeduplicate
    for (let i = 0; i < 30; i++) {
        const c = FourtylogoMesh.clone()
        c.rotation.y = Math.PI / 3
        c.scale.set(i, i, i)
        FourtyArmy.add(c)
    }

    scene.add(FourtyArmy)
})


//RENDER LOOP
function update() {


      let i = 0;
      while (i <FourtyArmy.children.length) {
        FourtyArmy.children[i].rotation.y += 0.001 + i *-0.0001
        FourtyArmy.children[i].rotation.y += 0.001 + i *-0.0001
        i++;
      }



    renderer.render(scene, camera);
    requestAnimationFrame(update)
}

update()