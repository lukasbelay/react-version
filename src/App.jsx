import { useEffect } from "react";
import * as THREE from "three";
import { Clock } from "three";
import "./App.css";

export default function App() {
  //useEffect because all this comes after canvas loads
  useEffect(() => {
    //setting up texture loader for future use
    const textureLoader = new THREE.TextureLoader();
    const normalTexture = textureLoader.load("height2.jpg");
    //setting up scene , camera and renderer
    let Scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    //appending renderer to canvas
    let renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("bg"),
      antialias: "true",
    });
    //initializing clock for later
    let Clock = new THREE.Clock();
    //initializing renderer and camera
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    camera.position.setX(-3);
    renderer.render(Scene, camera);
    //setting up lighting
    const pointLight = new THREE.AmbientLight(0xffffff);
    pointLight.position.set(0, 0, 0);

    Scene.add(pointLight);
    //using texture loader
    const spaceTexture = new THREE.TextureLoader().load("space.jpg");
    Scene.background = spaceTexture;

    const moonTexture = new THREE.TextureLoader().load("moon.jpg");
    //initializing thigs as objects
    let moon = new THREE.Mesh(
      new THREE.SphereGeometry(7, 64, 32),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
      })
    );

    let moonNew = new THREE.Mesh(
      new THREE.SphereGeometry(7, 64, 32),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
      })
    );
    //adding objects
    Scene.add(moon, moonNew);
    //setting locations
    moon.position.x = 27;
    moon.position.z = -5;
    moonNew.position.x = -30;
    moonNew.position.z = -5;

    function rotate() {
      requestAnimationFrame(rotate);
      renderer.render(Scene, camera);
    }

    rotate();
    //this updates the renderer when the browser changes
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", () => onWindowResize(), false);
    //this loops the rendering
    function animate() {
      requestAnimationFrame(animate);
      let time = Clock.getElapsedTime();
      moonNew.position.x = Math.cos(time) * 10;
      moonNew.position.y = Math.sin(time) * 10;
      moonNew.position.z = Math.tan(time) * 10;

      moon.rotation.y += 0.03;
      moonNew.rotation.y += 0.03;
      renderer.render(Scene, camera);
    }

    animate();
    //this loops everything
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
