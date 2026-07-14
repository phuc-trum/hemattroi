// js/orbit.js
import * as THREE from 'three';

export function createOrbitLine(scene, visualDistance) {
    const segments = 128; // Tăng segment để đường quỹ đạo tròn xoe, không bị răng cưa
    const material = new THREE.LineBasicMaterial({ 
        color: 0x444455, 
        transparent: true, 
        opacity: 0.4 
    });
    
    const points = [];
    const radius = visualDistance;
    
    for(let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = radius * Math.cos(theta);
        const z = radius * Math.sin(theta);
        points.push(new THREE.Vector3(x, 0, z));
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const orbitLine = new THREE.Line(geometry, material);
    
    scene.add(orbitLine);
    return orbitLine;
}