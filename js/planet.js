// js/planet.js
import * as THREE from 'three';

const TEXTURES = {
    sun: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg', 
    mercury: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/moon_1024.jpg',
    venus: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    earth: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    mars: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg', 
    jupiter: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg',
    saturn: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg',
    uranus: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg',
    neptune: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg',
    earthClouds: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
    venusClouds: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png' 
};

export function createPlanet(planetData, textureLoader, scene) {
    const isSun = planetData.id === 'sun';
    const renderRadius = planetData.visualRadius;
    
    // Tạo Group tổng để quản lý toàn bộ hệ hành tinh + mặt trăng cùng di chuyển trên quỹ đạo
    const planetGroup = new THREE.Group();
    planetGroup.name = planetData.id + "_group";
    scene.add(planetGroup);

    // Tạo khối cầu hành tinh chính
    const segments = isSun || planetData.id === 'earth' || planetData.id === 'jupiter' ? 64 : 32;
    const geometry = new THREE.SphereGeometry(renderRadius, segments, segments);
    
    let material;
    let mesh;
    
    const texture = textureLoader.load(TEXTURES[planetData.id]);
    texture.colorSpace = THREE.SRGBColorSpace;
    
    if (isSun) {
        material = new THREE.MeshBasicMaterial({ 
            map: texture,
            color: 0xffffff
        });
        mesh = new THREE.Mesh(geometry, material);
    } else {
        material = new THREE.MeshStandardMaterial({
            map: texture,
            color: planetData.color, 
            roughness: 0.7,
            metalness: 0.1
        });
        mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
    }
    mesh.name = planetData.id;
    planetGroup.add(mesh);

    // --- CHI TIẾT 1: LỚP MÂY XOAY (Earth & Venus) ---
    let cloudsMesh = null;
    if (planetData.hasClouds) {
        const cloudGeo = new THREE.SphereGeometry(renderRadius * 1.015, 64, 64);
        let cloudTex;
        let cloudMat;
        
        if (planetData.id === 'earth') {
            cloudTex = textureLoader.load(TEXTURES.earthClouds);
            cloudMat = new THREE.MeshStandardMaterial({
                map: cloudTex,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
        } else if (planetData.id === 'venus') {
            cloudTex = textureLoader.load(TEXTURES.venusClouds);
            cloudMat = new THREE.MeshStandardMaterial({
                map: cloudTex,
                color: 0xffd580, // Sắc vàng cam nhạt phủ mây Sao Kim cực dày
                transparent: true,
                opacity: 0.5,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
        }
        
        cloudsMesh = new THREE.Mesh(cloudGeo, cloudMat);
        mesh.add(cloudsMesh); // Add thẳng vào mesh hành tinh để tự động xoay cùng trục quay
    }

    // --- CHI TIẾT 2: VÀNH ĐAI HÀNH TINH (Saturn & Uranus) ---
    if (planetData.hasRings) {
        // Vành đai Sao Thổ (Nằm ngang)
        const ringGeo = new THREE.RingGeometry(renderRadius * 1.4, renderRadius * 2.3, 64);
        const ringMat = new THREE.MeshStandardMaterial({
            color: 0xc1aa82,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2; 
        ringMesh.castShadow = true;
        ringMesh.receiveShadow = true;
        mesh.add(ringMesh);
    }

    if (planetData.hasVerticalRings) {
        // Vành đai nghiêng dốc đứng độc quyền của Sao Thiên Vương (~97.7 độ)
        const ringGeo = new THREE.RingGeometry(renderRadius * 1.3, renderRadius * 1.6, 64);
        const ringMat = new THREE.MeshStandardMaterial({
            color: 0x88aaff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        
        // Tạo góc nghiêng thẳng đứng chuẩn NASA cho Uranus
        ringMesh.rotation.x = (97.7 * Math.PI) / 180; 
        ringMesh.rotation.y = (15 * Math.PI) / 180;
        
        ringMesh.castShadow = true;
        ringMesh.receiveShadow = true;
        mesh.add(ringMesh);
    }

    // --- CHI TIẾT 3: KHỞI TẠO HỆ THỐNG MẶT TRĂNG VỆ TINH ---
    const createdMoons = [];
    if (planetData.moons && planetData.moons.length > 0) {
        planetData.moons.forEach(m => {
            const moonGeo = new THREE.SphereGeometry(m.radius, 16, 16);
            const moonMat = new THREE.MeshStandardMaterial({
                color: m.color,
                roughness: 0.9,
                metalness: 0.0
            });
            const moonMesh = new THREE.Mesh(moonGeo, moonMat);
            moonMesh.castShadow = true;
            moonMesh.receiveShadow = true;
            
            // Set khoảng cách vệ tinh so với hành tinh mẹ
            moonMesh.position.set(m.distance, 0, 0);
            
            // Thêm trực tiếp vào Group tổng của hành tinh để chuyển động đồng bộ
            planetGroup.add(moonMesh);
            
            createdMoons.push({
                mesh: moonMesh,
                data: m,
                angle: Math.random() * Math.PI * 2 // Góc bắt đầu ngẫu nhiên để các trăng không trùng vạch
            });
        });
    }

    return {
        id: planetData.id,
        group: planetGroup, 
        mesh: mesh,
        cloudsMesh: cloudsMesh,
        data: planetData,
        renderRadius: renderRadius,
        moons: createdMoons
    };
}
