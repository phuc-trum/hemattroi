// js/camera.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from '@tweenjs/tween.js';

export function setupCamera(renderer) {
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    // Đặt góc máy ban đầu từ trên cao nhìn xuống cực đẹp, bao quát trọn vẹn hệ mặt trời mới
    camera.position.set(0, 180, 320); 
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 1500; // Giới hạn khoảng cách zoom vừa vặn với hệ mặt trời mới thu gọn
    controls.minDistance = 2;
    
    return { camera, controls };
}

// Hàm bay Camera (Fly-to) mượt mà tới hành tinh
export function focusOnPlanet(camera, controls, targetMesh, targetRadius, onComplete) {
    const targetPos = new THREE.Vector3();
    targetMesh.getWorldPosition(targetPos);

    const offset = targetRadius * 4;
    const targetCamPos = new THREE.Vector3(
        targetPos.x + offset,
        targetPos.y + offset / 2,
        targetPos.z + offset
    );
    
    // Xóa các hiệu ứng chuyển động cũ để không bị giật lag camera
    TWEEN.removeAll();

    // TWEEN di chuyển điểm nhìn của camera tới tâm hành tinh
    new TWEEN.Tween(controls.target)
        .to({ x: targetPos.x, y: targetPos.y, z: targetPos.z }, 1200)
        .easing(TWEEN.Easing.Cubic.InOut)
        .start();
        
    // TWEEN di chuyển vị trí thực tế của Camera tới gần hành tinh
    new TWEEN.Tween(camera.position)
        .to({ x: targetCamPos.x, y: targetCamPos.y, z: targetCamPos.z }, 1200)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onComplete(() => {
            if(onComplete) onComplete();
        })
        .start();
}