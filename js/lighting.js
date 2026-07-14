// js/lighting.js
import * as THREE from 'three';
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';

export function setupLighting(scene, textureLoader) {
    // Ánh sáng môi trường dịu nhẹ giúp các vùng tối trên hành tinh vẫn nhìn rõ chi tiết
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    // Giảm cường độ PointLight từ 5000 xuống 1200 để bớt chói lóa
    const sunLight = new THREE.PointLight(0xffffff, 1200, 0, 0);
    sunLight.position.set(0, 0, 0);
    sunLight.castShadow = true;
    
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 3000; 
    sunLight.shadow.bias = -0.0005;

    const textureFlare0 = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/lensflare/lensflare0.png');
    const textureFlare3 = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/lensflare/lensflare3.png');
    
    const lensflare = new Lensflare();
    // THAY ĐỔI LỚN: Thu nhỏ kích thước vòng sáng chính từ 700 xuống 220 để không che mất hành tinh
    lensflare.addElement(new LensflareElement(textureFlare0, 220, 0, sunLight.color));
    lensflare.addElement(new LensflareElement(textureFlare3, 30, 0.6));
    lensflare.addElement(new LensflareElement(textureFlare3, 40, 0.7));
    lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.9));
    lensflare.addElement(new LensflareElement(textureFlare3, 30, 1));
    
    sunLight.add(lensflare);
    scene.add(sunLight);
    
    return sunLight;
}
