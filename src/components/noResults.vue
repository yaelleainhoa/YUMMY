<template>
  <div id="noResults">
  </div>
</template>

<script>

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

export default {
  name: "Scene",
  data() {
    return {
      scene: undefined,
      camera: undefined,
      renderer: undefined,
      container: undefined
    };
  },
  props: {
    containerId: {
      type: String,
      required: true
    }
  },
  mounted: 
  async function(){
    this.init();
    this.renderScene();
  },
  methods: {
    async init() {
      console.log("INIT")
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color('salmon');
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.container = document.getElementById(this.containerId);
      this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
      this.container.appendChild(this.renderer.domElement);
      this.camera = new THREE.PerspectiveCamera(
        45,
        this.container.offsetWidth / this.container.offsetHeight,
        0.25,
        20
      );
      this.camera.position.set(0, 10,0);
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
     controls.minDistance = 2;
     controls.maxDistance = 10;
      controls.enablePan = false;
      controls.target.set(0, 0, 0);
      controls.addEventListener("change", this.renderScene); 
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(0, 1, 0);
      directionalLight.castShadow = true;
      this.scene.add(directionalLight);
      const lightpoint = new THREE.PointLight(0xff0000, 1);
      lightpoint.position.set(0, 600, 1000);
      this.scene.add(lightpoint);

      var light = new THREE.HemisphereLight(0xf6e86d, 0x404040, 0.5);
      light.position.set(0, 1, 0);
      this.scene.add(light);

      const geometry = new THREE.SphereGeometry( 0.5, 32, 16 );
      const material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
      const sphere = new THREE.Mesh( geometry, material );
      sphere.position.set(0,0,1);
      this.scene.add( sphere );

      const loader = new GLTFLoader();
      loader.crossOrigin = false;
      let me = this;
      let path = "../assets/fridge.glb"

      //https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/ladybug.gltf

      loader.load(path,
      function(gltf){
        if(gltf){
          let object = gltf.scene;
          object.position.set(0,0,0);
          me.scene.add(object);
        }
      })
      
    },

    renderScene() {
      this.renderer.render(this.scene, this.camera);
    },

  }
};

</script>

<style scoped>
#noResults{
    width:500px;
    height: 500px;
}
</style>