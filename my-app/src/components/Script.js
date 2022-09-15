import * as THREE  from 'three'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
let  currentMount = null

// Scene

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    25,
    100/100, //aspecto
    0.1, // que tan cerca 
    1000    
    )
    camera.position.z=20
    scene.add(camera)

    // Renderer

    const renderer = new THREE.WebGLRenderer()
    // renderer.setSize(currentMount.clientWidth,currentMount.clientHeight)
    
    //// loader

    // const gltfLoader = new GLTFLoader()
    // gltfLoader.load('./model/adamHead.gltf',

    // (gltf)=>{
    //     scene.add(gltf.scene)
    // },
    // ()=>{},
    // ()=>{})

    // resize ajustarr el tamaño de la ventana

    const resize = () => {
        renderer.setSize(currentMount.clientWidth,currentMount.clientHeight)
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight // mantiene el aspecto
        camera.updateProjectionMatrix()
    }
    window.addEventListener('resize',resize)
    //controls

    const controls = new OrbitControls(camera,renderer.domElement)
   // controls.target = new THREE.Vector3(3,3,3) // punto de ancla donde arranca
    controls.enableDamping = true //tarda un momento en detenerse  

    //Cube

    const cube = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1,1,1),
        new THREE.MeshBasicMaterial({
            color:0xff0000,
            transparent:true,
            opacity:0.1,
            wireframe:true // como se distribuye la geometria
        })
        )
        scene.add(cube)


    //Sphere
    const textureLoader = new THREE.TextureLoader()
    const matcap = textureLoader.load('./texturas/matcap.png')
    const geometry = new THREE.SphereGeometry( 0.8, 32, 16 );
    const material = new THREE.MeshMatcapMaterial( {matcap:matcap} );
    const sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    //sphere.position.set(2,0.5,0) // posicion del objeto en todas las direcciones
    sphere.position.y=1.5
    

    //Torus
    const geometry1 = new THREE.TorusKnotGeometry( 0.3, 0.1, 100, 16 );
    const material1 = new THREE.MeshNormalMaterial( {   flatShading:true } );
    const torusKnot = new THREE.Mesh( geometry1, material1 );

    scene.add( torusKnot );
    torusKnot.position.y=- 1.5
    

    // texturas

    const map = textureLoader.load('./bricks/Brick_Wall_016_basecolor.jpg')
    const ambiental=textureLoader.load('./bricks/Brick_Wall_016_ambientOcclusion.jpg')
    const roughnessMap=textureLoader.load('./bricks/Brick_Wall_016_roughness.jpg')
    const normalMap=textureLoader.load('./bricks/Brick_Wall_016_normal.jpg')
    const HeightMap = textureLoader.load('./bricks/Brick_Wall_016_height.png')
     //Cube

     const cube2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1,1,1,150,150,150),
        new THREE.MeshStandardMaterial({
            map:map,
            aoMap:ambiental,
            roughnessMap:roughnessMap,
            normalMap:normalMap,
            displacementMap:HeightMap,
            displacementScale:0.05
        


            
        })
        )
        scene.add(cube2)
        cube2.position.x=2

    // luz 
    const A0 = new THREE.AmbientLight(0xffffff,0.5)
    //scene.add(A0)
    const pointLight = new THREE.PointLight(0xff0000,0.5)
    pointLight.position.x=2
    pointLight.position.z=2
    scene.add(pointLight)
    const direccionalLight = new THREE.DirectionalLight(0xffffff,1.3)
    direccionalLight.position.set(5,5,5)
    scene.add(direccionalLight)

    const enviromentMap = new THREE.CubeTextureLoader()
    const envMap=enviromentMap.load([
        './envmap/px.png',
        './envmap/nx.png',
        './envmap/py.png',
        './envmap/ny.png',
        './envmap/pz.png',
        './envmap/nz.png',
    
    ])
    scene.environment = envMap
    scene.background=envMap


    //render the scena
    const animate = ()=>{
        controls.update() 
        renderer.render(scene,camera)
        requestAnimationFrame(animate)
    }
   
    animate()

    // montar la escena 

    export const mountScene = (mountRef) =>{
        currentMount = mountRef.current
        resize()
        currentMount.appendChild(renderer.domElement)
    }

    // clean up scene
    export const cleanUpScene = () => {
        scene.dospose()
        currentMount.removeChild(renderer.domElement)
    }
    