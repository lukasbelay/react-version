import { useEffect } from "react";
import * as THREE from "three";
import "./App.css";

export default function App() {
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const normalTexture = textureLoader.load("height2.jpg");

    const Scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("bg"),
      antialias: "true",
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    camera.position.setX(-3);
    renderer.render(Scene, camera);

    const pointLight = new THREE.AmbientLight(0xffffff);
    pointLight.position.set(0, 0, 0);

    Scene.add(pointLight);

    const spaceTexture = new THREE.TextureLoader().load("space.jpg");
    Scene.background = spaceTexture;

    const moonTexture = new THREE.TextureLoader().load("moon.jpg");

    let moon = new THREE.Mesh(
      new THREE.SphereGeometry(7, 64, 32),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
        /*metalness: 0.2,
      roughness: 0.9,
      */
      })
    );

    let moonNew = new THREE.Mesh(
      new THREE.SphereGeometry(7, 64, 32),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
        /*metalness: 0.2,
        roughness: 0.9,
        */
      })
    );

    Scene.add(moon, moonNew);

    moon.position.x = 27;
    moon.position.z = -5;
    moonNew.position.x = -30;
    moonNew.position.z = -5;

    function rotate() {
      requestAnimationFrame(rotate);

      //controls.update();
      renderer.render(Scene, camera);
      //stats.update();
    }

    rotate();
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", () => onWindowResize(), false);

    function animate() {
      requestAnimationFrame(animate);

      //torus.rotation.x += 6.5;
      //torus.rotation.y += 6;
      //torus.rotation.z += 6;
      moon.rotation.y += 0.03;
      moonNew.rotation.y += 0.03;
      renderer.render(Scene, camera);
    }

    animate();

    THREE.LoopRepeat;
  });

  return (
    <div>
      <div id="Header">
        <h3>Home</h3>
        <h3>Our Services</h3>
        <h3>Subscribe</h3>
        <h2>We do Websites Right</h2>
      </div>
      <canvas id="bg"></canvas>
    </div>
  );
}
