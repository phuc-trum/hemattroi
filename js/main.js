// js/main.js
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

import { SOLAR_SYSTEM_DATA } from './data.js'; 
import { setupCamera } from './camera.js';
import { setupLighting } from './lighting.js';
import { createPlanet } from './planet.js';
import { createOrbitLine } from './orbit.js';
import { setupControls } from './controls.js';
import { setupAudio } from './audio.js'; // IMPORT MODULE NHẠC MỚI

const timeManager = { timeDays: 0, speed: 1, isPaused: false };

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
document.body.appendChild(renderer.domElement);

const { camera, controls } = setupCamera(renderer);

const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0.35;
bloomPass.strength = 0.16; 
bloomPass.radius = 0.4;

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

function createStars() {
    const starGeo = new THREE.BufferGeometry();
    const starCount = 12000; 
    const posArray = new Float32Array(starCount * 3);
    for(let i = 0; i < starCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 3000; 
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.4, transparent: true, opacity: 0.85 });
    const starMesh = new THREE.Points(starGeo, starMat);
    scene.add(starMesh);
}
createStars();

const loadingManager = new THREE.LoadingManager();
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
    const progress = (itemsLoaded / itemsTotal) * 100;
    const progressBar = document.getElementById('progress-bar');
    const loadingText = document.getElementById('loading-text');
    if (progressBar) progressBar.style.width = progress + '%';
    if (loadingText) loadingText.innerText = `Đang tải mô phỏng hệ mặt trời... (${Math.round(progress)}%)`;
};
loadingManager.onLoad = () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => { loadingScreen.style.display = 'none'; }, 1000);
    }
};

const textureLoader = new THREE.TextureLoader(loadingManager);
setupLighting(scene, textureLoader);

// KÍCH HOẠT HỆ THỐNG NHẠC NỀN
setupAudio();

const planets = [];
for (const key in SOLAR_SYSTEM_DATA) {
    const data = SOLAR_SYSTEM_DATA[key];
    const planetObj = createPlanet(data, textureLoader, scene);
    
    if (data.id !== 'sun') {
        createOrbitLine(scene, data.visualDistance);
    }
    planets.push(planetObj);
}

const systemControls = setupControls(camera, scene, renderer, controls, timeManager);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    
    if (typeof TWEEN !== 'undefined') TWEEN.update();
    if (controls) controls.update(); 
    
    if (!timeManager.isPaused) {
        timeManager.timeDays += delta * timeManager.speed * 15; 
    }
    
    const focusedPlanetMesh = (systemControls && typeof systemControls.getFocusedPlanet === 'function') 
        ? systemControls.getFocusedPlanet() 
        : null;

    planets.forEach(p => {
        const moveTarget = p.group; 
        
        if (p.data && p.data.rotationPeriod !== 0 && !timeManager.isPaused) {
            const rotationSpeed = (2 * Math.PI) / (p.data.rotationPeriod * 10); 
            if (p.mesh) p.mesh.rotation.y += rotationSpeed * timeManager.speed * delta;
            if (p.cloudsMesh) p.cloudsMesh.rotation.y += rotationSpeed * 1.25 * timeManager.speed * delta;
        }
        
        if (p.data && p.data.id !== 'sun' && moveTarget) {
            const period = p.data.orbitalPeriod || 365;
            const orbitSpeed = (2 * Math.PI) / period;
            const currentAngle = timeManager.timeDays * orbitSpeed;
            
            const dist = p.data.visualDistance;
            moveTarget.position.set(Math.cos(currentAngle) * dist, 0, Math.sin(currentAngle) * dist);
        }
        
        if (p.moons && p.moons.length > 0 && !timeManager.isPaused) {
            p.moons.forEach(m => {
                m.angle += m.data.speed * timeManager.speed * delta * 5;
                
                if (m.mesh) {
                    m.mesh.position.set(
                        Math.cos(m.angle) * m.data.distance, 
                        0, 
                        Math.sin(m.angle) * m.data.distance
                    );
                    m.mesh.rotation.y += 0.01 * timeManager.speed;
                }
            });
        }
        
        if (focusedPlanetMesh && focusedPlanetMesh === p.mesh && moveTarget) {
            const targetPos = new THREE.Vector3();
            p.mesh.getWorldPosition(targetPos);
            controls.target.copy(targetPos); 
        }
    });
    
    if (composer) composer.render();
    else renderer.render(scene, camera);
}
animate();
