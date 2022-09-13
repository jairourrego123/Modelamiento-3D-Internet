
import { useRef,useEffect } from 'react';
import * as THREE  from 'three'
import { CapsuleGeometry } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
const Scene = () => {
    const mountRef = useRef(null)
    useEffect(()=>{
        const currentMount = mountRef.current

        // Scene

        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(
            25,
            currentMount.clientWidth / currentMount.clientHeight, //aspecto
            0.1, // que tan cerca 
            1000    
            )
            camera.position.z=20
            scene.add(camera)

            // Renderer

            const renderer = new THREE.WebGLRenderer()
            renderer.setSize(currentMount.clientWidth,currentMount.clientHeight)
            currentMount.appendChild(renderer.domElement)

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
            const geometry = new THREE.SphereGeometry( 0.8, 32, 16 );
            const material = new THREE.MeshBasicMaterial( { color: 0xfffA00 } );
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
            
            

            //render the scena
            const animate = ()=>{
                controls.update() 
                renderer.render(scene,camera)
                requestAnimationFrame(animate)
            }
           
            animate()

                // Clean up Scena
                return ()=>{
                    currentMount.removeChild(renderer.domElement)
                }

    },[])
  return (
    <div 
        className="Contenedor3D"
        ref={mountRef} // hacer un query
        style={{width:'100%',height:'100vh'}}
    >
       
        </div>
  )
}

export default Scene