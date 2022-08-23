import { useEffect } from "react";
import * as THREE from "three";
import { Clock } from "three";
import "./App.css";

export default function App() {
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const normalTexture = textureLoader.load("height2.jpg");

    let Scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    let renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("bg"),
      antialias: "true",
    });
    let Clock = new THREE.Clock();
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
      let time = Clock.getElapsedTime();
      moonNew.position.x = Math.cos(time) * 10;
      moonNew.position.y = Math.sin(time) * 10;
      moonNew.position.z = Math.tan(time) * 10;

      moon.rotation.y += 0.03;
      moonNew.rotation.y += 0.03;
      renderer.render(Scene, camera);
    }

    animate();

    THREE.LoopRepeat;
  });

  return (
    <div>
      <div id="nav">
        <h3>my work</h3>
      </div>
      <div id="bar">
        <h3>contact me</h3>
      </div>
      <div id="Header">
        <h2>Welcome to my website</h2>
      </div>
      <canvas id="bg"></canvas>
    </div>
  );
}
