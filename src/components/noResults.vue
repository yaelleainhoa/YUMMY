<template>
  <div id="noResults">
  </div>
</template>

<script>

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default {
  name: "Scene",
  data() {
    return {
      scene: undefined,
      camera: undefined,
      renderer: undefined
    };
  },
  props: {
    containerId: {
      type: String,
      required: true
    }
    // modelSettings: {
    //   type: Object,
    //   required: true
    // }
  },
  created: function(){
      this.scene = new THREE.Scene();
            const geometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
      const mesh = new THREE.Mesh( geometry, material );
      this.scene.add( mesh );
  },
  methods: {
    init() {
        console.log("yoyo")
      // this.scene = new THREE.Scene();
      this.scene.background = null;
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      const container = document.getElementById(this.containerId);
      this.renderer.setSize(container.offsetWidth, container.offsetHeight);
      container.appendChild(this.renderer.domElement);
      // START: Adding camera
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.offsetWidth / container.offsetHeight,
        0.25,
        20
      );
    // this.camera.position.set(this.modelSettings.cameraPosition[0], this.modelSettings.cameraPosition[1], this.modelSettings.cameraPosition[2]);
      // END: Adding camera
      // START: Adding controls
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.minDistance = 2;
      controls.maxDistance = 5;
      // controls.enablePan = false;
      controls.target.set(0, 0, 0);
      controls.addEventListener("change", this.renderScene); // use if there is no animation loop
      // END: Adding controls
      // START: Adding light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(0, 1, 0);
      directionalLight.castShadow = true;
      this.scene.add(directionalLight);
      const light = new THREE.PointLight(0xffffcc, 1);
      light.position.set(0, 600, 1000);
      this.scene.add(light);
      const light2 = new THREE.PointLight(0xe6f7ff, 1);
      light2.position.set(1000, 200, 0);
      this.scene.add(light2);
      const light3 = new THREE.PointLight(0xfff2e6, 1);
      light3.position.set(0, 200, -1000);
      this.scene.add(light3);
      const light4 = new THREE.PointLight(0xc4c400, 1);
      light4.position.set(-1000, 600, 1000);
      this.scene.add(light4);

      // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
      // const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
      // const mesh = new THREE.Mesh( geometry, material );
      // this.scene.add( mesh );

      // END: Adding light
      // START: Adding gtlf model

      // const loader = new GLTFLoader();

      // loader.load( './assets/gltf/scene.gltf', function ( gltf ) {
      //   this.scene.add( gltf.scene );
      // },
      // undefined, function ( error ) {
      //   console.log("ERROR", error);
      // });

    },
    renderScene() {
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.init();
  }
};

</script>

<style scoped>
#noResults{
    background-color: blue;
    width:500px;
    height: 500px;
}
</style>