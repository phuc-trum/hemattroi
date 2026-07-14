// js/controls.js
import * as THREE from 'three';
import { focusOnPlanet } from './camera.js';
import { SOLAR_SYSTEM_DATA } from './data.js';
import * as TWEEN from '@tweenjs/tween.js'; 

export function setupControls(camera, scene, renderer, controls, timeManager) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const infoPanel = document.getElementById('info-panel');
    const backBtn = document.getElementById('back-btn');
    const timeSlider = document.getElementById('time-slider');
    const speedDisplay = document.getElementById('speed-display');
    let currentFocusedPlanet = null;
    
    let currentEvent = null;
    let eventEffectsGroup = new THREE.Group();
    scene.add(eventEffectsGroup);
    let cometProgress = 0; 

    // BỘ TỪ ĐIỂN TRI THỨC 10 SỰ KIỆN THIÊN VĂN
    const EVENT_KNOWLEDGE_BASE = {
        'solar': {
            name: "NHẬT THỰC TOÀN PHẦN", type: "Hệ mặt trời đứng im (PAUSED)",
            desc: "Hiện tượng xảy ra khi Mặt Trăng đi vào giữa Trái Đất và Mặt Trời, che khuất một phần hoặc toàn bộ đĩa Mặt Trời khi nhìn từ mặt đất. Bầu trời ban ngày sẽ đột ngột tối sầm lại trong vài phút ngắn ngủi.",
            details: {"Tần suất xuất hiện": "2 - 5 lần mỗi năm trên thế giới", "Thời gian toàn phần tối đa": "Khoảng 7.5 phút", "Vùng quan sát lý tưởng": "Dải hẹp của bóng tối lõi (Umbra)"},
            context: {"Hiện tượng đi kèm": "Vòng nhẫn kim cương & Chuỗi hạt Baily", "Lưu ý an toàn": "Phải dùng kính bảo vệ mắt chuyên dụng"}
        },
        'lunar': {
            name: "NGUYỆT THỰC (TRĂNG MÁU)", type: "Hệ mặt trời đứng im (PAUSED)",
            desc: "Xảy ra khi Trái Đất nằm chính giữa đường nối Mặt Trời và Mặt Trăng, chặn toàn bộ ánh nắng trực tiếp. Tuy nhiên, bầu khí quyển Trái Đất bẻ cong ánh sáng đỏ chiếu lên Mặt Trăng, khiến nó có màu đỏ gạch kỳ bí.",
            details: {"Tần suất xuất hiện": "Khoảng 2 - 4 lần mỗi năm", "Thời gian kéo dài trung bình": "Từ vài chục phút đến vài giờ", "Tên gọi dân gian": "Hiện tượng Trăng Máu (Blood Moon)"},
            context: {"Cơ chế quang học": "Tán xạ Rayleigh từ khí quyển Trái Đất", "Cách thưởng thức": "Hoàn toàn an toàn bằng mắt thường"}
        },
        'transit-mercury': {
            name: "QUÁ CẢNH SAO THỦY", type: "Thời gian đang chạy (0.02x)",
            desc: "Sao Thủy đi qua khoảng không nằm chính giữa Trái Đất và Mặt Trời. Nhìn từ Trái Đất, Sao Thủy chỉ là một đốm đen siêu nhỏ di chuyển thong thả cắt ngang qua đĩa Mặt Trời khổng lồ rực rỡ.",
            details: {"Tần suất xuất hiện": "13 - 14 lần mỗi thế kỷ", "Lần xuất hiện gần nhất": "Tháng 11 năm 2019", "Lần kế tiếp xảy ra": "Tháng 11 năm 2032"},
            context: {"Trạng thái mô phỏng": "Thời gian mở khóa tốc độ chậm", "Thiết bị hỗ trợ": "Cần kính thiên văn có phim lọc Mặt Trời"}
        },
        'transit-venus': {
            name: "QUÁ CẢNH SAO KIM", type: "Thời gian đang chạy (0.03x)",
            desc: "Tương tự Sao Thủy nhưng hiếm hơn rất nhiều do độ nghiêng quỹ đạo lớn. Khi xảy ra, đĩa tối của Sao Kim to hơn hẳn và có thể quan sát dễ dàng hơn qua các lớp phim lọc chuyên dụng.",
            details: {"Chu kỳ xuất hiện": "Cặp hiện tượng cách nhau 8 năm, sau đó cách 105 hoặc 121 năm", "Lần xuất hiện gần nhất": "Năm 2004 và 2012", "Lần tiếp theo dự kiến": "Năm 2117 và 2125"},
            context: {"Trạng thái mô phỏng": "Thời gian mở khóa tốc độ chậm", "Ý nghĩa khoa học": "Giúp đo đạc khoảng cách chính xác trong vũ trụ"}
        },
        'retrograde': {
            name: "HÀNH TINH NGHỊCH HÀNH", type: "Thời gian đang chạy (0.60x)",
            desc: "Hiện tượng một hành tinh dường như đi giật lùi trên bầu trời đêm. Thực chất đây chỉ là ảo giác phối cảnh xảy ra khi Trái Đất (chạy ở quỹ đạo trong với vận tốc nhanh hơn) tăng tốc vượt qua hành tinh đó.",
            details: {"Hành tinh phổ biến nhất": "Sao Hỏa nghịch hành (Mars Retrograde)", "Chu kỳ của Sao Hỏa": "Mỗi 26 tháng một lần", "Thời gian kéo dài": "Khoảng 2 tháng liên tục"},
            context: {"Bản chất vật lý": "Hiệu ứng vượt xe tương đối trong chuyển động quỹ đạo", "Hình dáng quỹ đạo": "Tạo ra một vòng lặp thắt nút trên bầu trời"}
        },
        'conjunction': {
            name: "GIAO HỘI HÀNH TINH", type: "Hệ mặt trời đứng im (PAUSED)",
            desc: "Khoảnh khắc hai hoặc nhiều hành tinh xuất hiện rất sát nhau trên bầu trời đêm từ góc nhìn Trái Đất. Dù thực tế ngoài không gian không gian sâu chúng cách nhau hàng trăm triệu cây số.",
            details: {"Sự kiện kinh điển": "Đại giao hội Sao Mộc & Sao Thổ", "Chu kỳ Đại giao hội": "Khoảng 20 năm một lần", "Lần gần nhất": "Tháng 12 năm 2020 (Khoảng cách cực cận)"},
            context: {"Ý nghĩa thị giác": "Tạo thành một 'ngôi sao đôi' rực rỡ đột biến", "Góc quan sát": "Tầm nhìn tuyến tính chéo từ Trái Đất"}
        },
        'parade': {
            name: "DIỄU HÀNH HÀNH TINH", type: "Hệ mặt trời đứng im (PAUSED)",
            desc: "Cơ chế sắp xếp hình học đặc biệt khi nhiều hành tinh trong Hệ Mặt Trời cùng di chuyển hội tụ về một phía của Mặt Trời và tạo thành một đường thẳng tương đối trên mặt phẳng hoàng đạo.",
            details: {"Hội tụ nhỏ (3-4 hành tinh)": "Diễn ra đều đặn hàng năm", "Hội tụ lớn (5-6 hành tinh)": "Vài năm mới xuất hiện một lần", "Hội tụ toàn phần (8 hành tinh)": "Hàng nghìn năm một lần (Siêu hiếm)"},
            context: {"Trạng thái mô phỏng": "Tất cả hành tinh khóa cứng ở Ngày 0 gốc", "Lực hấp dẫn tổng hợp": "Không đáng kể, không gây thiên tai"}
        },
        'comet': {
            name: "SAO CHỔI ĐỊNH KỲ", type: "Hiệu ứng động liên tục",
            desc: "Các khối băng đá, bụi từ vùng biên giới lạnh giá lao vào gần Mặt Trời theo quỹ đạo Elip cực dẹt. Sức nóng làm băng bốc hơi dữ dội, tạo ra cái đuôi khí phát sáng dài hàng triệu km luôn hướng ngược phía Mặt Trời.",
            details: {"Sao chổi biểu tượng": "Sao chổi Halley (1P/Halley)", "Chu kỳ quay quanh Mặt Trời": "Khoảng 75 - 76 năm", "Lần xuất hiện tiếp theo": "Năm 2061"},
            context: {"Cấu trúc đuôi sáng": "Gồm đuôi ion (xanh lam) và đuôi bụi (trắng mờ)", "Hiệu ứng đang chạy": "Vòng lặp elip dẹt chuyển động liên tục"}
        },
        'meteors': {
            name: "MƯA SAO BĂNG", type: "Hiệu ứng động liên tục",
            desc: "Xảy ra khi Trái Đất lao vào dải tàn dư bụi, mảnh vụn do các sao chổi bỏ lại. Các hạt bụi này ma sát cực mạnh với bầu khí quyển ở tốc độ cao và bốc cháy thành hàng ngàn vệt sáng lung linh.",
            details: {"Trận mưa lớn nhất năm": "Perseids (Tháng 8) và Geminids (Tháng 12)", "Tốc độ quét khí quyển": "30 - 70 km/giây", "Kích thước thiên thạch": "Chỉ nhỏ bằng hạt cát đến hạt đậu"},
            context: {"Hiệu ứng đang chạy": "Mưa vệt sáng rơi tự do quanh camera Trái Đất", "Cách quan sát lý tưởng": "Nơi thoáng đãng, trời tối, không mây"}
        },
        'zodiacal': {
            name: "ÁNH SÁNG HOÀNG ĐẠO", type: "Hệ mặt trời đứng im (PAUSED)",
            desc: "Dải sáng mờ hình tam giác nón mọc lên từ chân trời trước bình minh hoặc sau hoàng hôn. Ánh sáng này sinh ra do ánh nắng Mặt Trời phản chiếu trực tiếp vào đám bụi vũ trụ tập trung dày đặc trên mặt phẳng hoàng đạo.",
            details: {"Thời điểm ngắm tốt nhất": "Mùa xuân (sau hoàng hôn) / Mùa thu (trước bình minh)", "Nguồn gốc thảm bụi": "Mảnh vỡ từ va chạm tiểu hành tinh cổ đại", "Độ sáng đặc trưng": "Rất mờ dịu, dễ nhầm lẫn với dải Ngân Hà"},
            context: {"Phạm vi phân bố": "Trải dọc khắp đường đi của Mặt Trời và các hành tinh", "Trạng thái mô phỏng": "Hiển thị thảm đĩa bụi phát sáng mờ"}
        }
    };

    // Hàm tiện ích: Tìm chính xác tọa độ thực tế của hành tinh trong không gian 3D tại thời điểm bấm nút
    function getPlanetRealPosition(name) {
        let targetPos = new THREE.Vector3(0, 0, 0);
        scene.traverse((child) => {
            if (child.isMesh && child.name && child.name.toLowerCase() === name.toLowerCase()) {
                child.getWorldPosition(targetPos);
            }
        });
        return targetPos;
    }

    // HÀM TWEEN CAMERA MƯỢT MÀ VÀ MỞ KHÓA TƯƠNG TÁC TỰ DO
    function animateCameraToTarget(endCamPos, endTargetPos) {
        controls.enabled = false; // Tạm khóa trong lúc di chuyển để tránh xung đột chuột
        
        const startCam = camera.position.clone();
        const startTarget = controls.target.clone();

        new TWEEN.Tween({ t: 0 })
            .to({ t: 1 }, 2000)
            .easing(TWEEN.Easing.Cubic.Out)
            .onUpdate((obj) => {
                camera.position.lerpVectors(startCam, endCamPos, obj.t);
                controls.target.lerpVectors(startTarget, endTargetPos, obj.t);
                controls.update();
            })
            .onComplete(() => {
                controls.enabled = true; // MỞ KHÓA HOÀN TOÀN: Cho phép người dùng tự do zoom, xoay kéo thoải mái!
            })
            .start();
    }

    // ==========================================
    // 1. ĐỒNG HỒ THỜI GIAN VÀ VÒNG LẶP HIỆU ỨNG ĐỘNG
    // ==========================================
    const dateText = document.getElementById('date-text');
    const timeText = document.getElementById('time-text');
    
    function updateClock() {
        requestAnimationFrame(updateClock);
        
        let totalDays = Math.floor(timeManager.timeDays);
        if (totalDays < 0) totalDays = 0;
        const years = Math.floor(totalDays / 365);
        const dayOfYear = totalDays % 365;
        const months = Math.floor(dayOfYear / 30) + 1;
        const days = (dayOfYear % 30) + 1;
        const fractionalDay = timeManager.timeDays - totalDays;
        const hours = Math.floor(fractionalDay * 24);
        const minutes = Math.floor((fractionalDay * 24 - hours) * 60);
        
        if (dateText) dateText.innerText = `Năm ${years} | Tháng ${months} | Ngày ${days}`;
        if (timeText) {
            if (timeManager.isPaused) {
                timeText.style.color = '#ff3366';
                timeText.innerText = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')} (PAUSED)`;
            } else if (timeManager.speed <= 0.1) {
                timeText.style.color = '#00f0ff';
                timeText.innerText = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`;
            } else {
                timeText.style.color = '#ffaa00';
                timeText.innerText = `▶▶ TUA NHANH`;
            }
        }

        // Cập nhật hiệu ứng động liên tục
        if (currentEvent === 'meteors') {
            const earthPos = getPlanetRealPosition('earth');
            eventEffectsGroup.children.forEach(meteor => {
                meteor.position.y -= 2.5; 
                meteor.position.x -= 1.2;
                if (meteor.position.y < earthPos.y - 30) {
                    meteor.position.set(
                        earthPos.x + (Math.random() - 0.5) * 60,
                        earthPos.y + 50 + Math.random() * 30,
                        earthPos.z + (Math.random() - 0.5) * 60
                    );
                }
            });
        } 
        else if (currentEvent === 'comet') {
            cometProgress += 0.003; 
            if (cometProgress > 1) cometProgress = 0;
            const u = cometProgress * Math.PI * 2;
            const cx = 320 * Math.cos(u) - 100;
            const cz = 140 * Math.sin(u);
            const cy = 30 * Math.cos(u);

            const cometHead = eventEffectsGroup.getObjectByName('comet-head');
            if (cometHead) {
                cometHead.position.set(cx, cy, cz);
                // CAMERA GHIM THẲNG THEO BƯỚC ĐI CỦA SAO CHỔI
                controls.target.copy(cometHead.position);

                const cometTail = eventEffectsGroup.getObjectByName('comet-tail');
                if (cometTail) {
                    cometTail.position.set(cx, cy, cz);
                    const dir = new THREE.Vector3(cx, cy, cz).normalize();
                    cometTail.lookAt(new THREE.Vector3(cx, cy, cz).add(dir));
                }
            }
        }
    }
    updateClock();

    // ==========================================
    // 2. KÍCH HOẠT SỰ KIỆN - CHUYỂN CAMERA THEO HÀNH TINH ĐỘNG
    // ==========================================
    let savedTimeState = { timeDays: 0, speed: 1, wasPaused: false };
    const eventBtns = document.querySelectorAll('.event-btn');
    const exitEventBtn = document.getElementById('exit-event-btn');

    eventBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            clearEventEffects();
            
            savedTimeState.timeDays = timeManager.timeDays;
            savedTimeState.wasPaused = timeManager.isPaused;
            savedTimeState.speed = timeManager.speed;
            
            const type = e.target.getAttribute('data-event');
            currentEvent = type;

            let targetCenter = new THREE.Vector3(0, 0, 0);
            let cameraOffset = new THREE.Vector3(0, 300, 500);

            // XỬ LÝ GÓC NHÌN ĐỘNG PHÙ HỢP CHO TỪNG HIỆN TƯỢNG
            if (type === 'solar') {
                timeManager.isPaused = true;
                targetCenter = getPlanetRealPosition('earth');
                // Nhìn cận cảnh từ phía sau Trái Đất hướng về phía Mặt Trời
                cameraOffset.set(20, 8, 20); 
            }
            else if (type === 'lunar') {
                timeManager.isPaused = true;
                targetCenter = getPlanetRealPosition('earth');
                // Góc chếch nghiêng để thấy rõ bóng tối Trái Đất đổ lên Mặt Trăng
                cameraOffset.set(-25, 12, -25);
            }
            else if (type === 'transit-mercury') {
                timeManager.isPaused = false; 
                timeManager.speed = 0.02;
                targetCenter = getPlanetRealPosition('mercury');
                // Bám sát vào Sao Thủy để thấy rõ đốm đen cắt ngang đĩa Mặt Trời
                cameraOffset.set(0, 5, 12);
            } 
            else if (type === 'transit-venus') {
                timeManager.isPaused = false;
                timeManager.speed = 0.03;
                targetCenter = getPlanetRealPosition('venus');
                cameraOffset.set(0, 8, 18);
            } 
            else if (type === 'retrograde') {
                timeManager.isPaused = false;
                timeManager.speed = 0.60;
                targetCenter = getPlanetRealPosition('mars');
                // Ghim tâm vào Sao Hỏa, để góc rộng quan sát Trái Đất vượt qua
                cameraOffset.set(30, 15, 45);
            } 
            else if (type === 'conjunction') {
                timeManager.isPaused = true;
                targetCenter = getPlanetRealPosition('jupiter');
                // ĐÃ SỬA LỖI: Ghim chặt chuột vào Sao Mộc, zoom ra vào cực mượt
                cameraOffset.set(40, 15, 60);
            }
            else if (type === 'parade') {
                timeManager.isPaused = true; 
                timeManager.timeDays = 0; // Reset về ngày thẳng hàng gốc
                targetCenter.set(0, 0, 0); // Tâm là Mặt Trời
                cameraOffset.set(450, 600, 550); // Thu nhỏ góc rộng nhìn toàn cảnh hàng dọc
            } 
            else if (type === 'comet') {
                timeManager.isPaused = true; 
                cometProgress = 0;
                
                // Dựng mô hình 3D Sao Chổi
                const headGeo = new THREE.SphereGeometry(2.5, 16, 16);
                const headMat = new THREE.MeshBasicMaterial({ color: 0x00aaff, wireframe: true });
                const cometHead = new THREE.Mesh(headGeo, headMat);
                cometHead.name = 'comet-head';
                cometHead.position.set(-220, 30, 0);
                eventEffectsGroup.add(cometHead);

                const tailGeo = new THREE.ConeGeometry(3.5, 45, 16);
                tailGeo.rotateX(Math.PI / 2);
                const tailMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.4, side: THREE.DoubleSide });
                const cometTail = new THREE.Mesh(tailGeo, tailMat);
                cometTail.name = 'comet-tail';
                eventEffectsGroup.add(cometTail);

                targetCenter.copy(cometHead.position);
                cameraOffset.set(-80, 40, 100);
            } 
            else if (type === 'meteors') {
                timeManager.isPaused = true; 
                targetCenter = getPlanetRealPosition('earth');
                cameraOffset.set(15, 12, 15);

                // Khởi tạo mưa vệt sáng quanh Trái Đất
                for(let i = 0; i < 40; i++) {
                    const points = [new THREE.Vector3(0,0,0), new THREE.Vector3(2, 5, -1)];
                    const meteorGeo = new THREE.BufferGeometry().setFromPoints(points);
                    const meteorMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: Math.random() * 0.7 + 0.3 });
                    const meteorLine = new THREE.Line(meteorGeo, meteorMat);
                    
                    meteorLine.position.set(
                        targetCenter.x + (Math.random() - 0.5) * 70,
                        targetCenter.y + 40 + Math.random() * 60,
                        targetCenter.z + (Math.random() - 0.5) * 70
                    );
                    eventEffectsGroup.add(meteorLine);
                }
            } 
            else if (type === 'zodiacal') {
                timeManager.isPaused = true;
                targetCenter.set(0, 0, 0);
                cameraOffset.set(180, 60, 220);

                const dustGeo = new THREE.RingGeometry(15, 150, 32);
                const dustMat = new THREE.MeshBasicMaterial({ color: 0xffcc44, transparent: true, opacity: 0.14, side: THREE.DoubleSide });
                const zodiacGlow = new THREE.Mesh(dustGeo, dustMat);
                zodiacGlow.rotateX(Math.PI / 2);
                eventEffectsGroup.add(zodiacGlow);
            }

            // Thực thi bay camera thông minh
            const finalCamPos = targetCenter.clone().add(cameraOffset);
            animateCameraToTarget(finalCamPos, targetCenter);

            // ĐẨY DỮ LIỆU KHOA HỌC SANG BẢNG BÊN TRÁI
            const data = EVENT_KNOWLEDGE_BASE[type];
            if (data && infoPanel) {
                infoPanel.classList.remove('hidden');
                if (backBtn) backBtn.classList.add('hidden'); 
                
                document.getElementById('info-name').innerText = data.name;
                document.getElementById('info-type').innerText = data.type.toUpperCase();
                document.getElementById('info-desc').innerText = data.desc;
                
                const infoImg = document.getElementById('info-img');
                if (infoImg) infoImg.style.display = 'none';
                
                const ul1 = document.getElementById('info-physics');
                if (ul1) {
                    ul1.innerHTML = '';
                    for (let k in data.details) ul1.innerHTML += `<li><span>${k}</span><strong>${data.details[k]}</strong></li>`;
                }
                
                const ul2 = document.getElementById('info-orbit');
                if (ul2) {
                    ul2.innerHTML = '';
                    for (let k in data.context) ul2.innerHTML += `<li><span>${k}</span><strong>${data.context[k]}</strong></li>`;
                }
            }

            eventBtns.forEach(b => b.classList.add('hidden'));
            if (exitEventBtn) exitEventBtn.classList.remove('hidden');
        });
    });

    function clearEventEffects() {
        while(eventEffectsGroup.children.length > 0){ 
            const obj = eventEffectsGroup.children[0];
            eventEffectsGroup.remove(obj); 
        }
    }

    if (exitEventBtn) {
        exitEventBtn.addEventListener('click', () => {
            clearEventEffects();
            currentEvent = null;

            timeManager.isPaused = savedTimeState.wasPaused;
            timeManager.timeDays = savedTimeState.timeDays;
            timeManager.speed = savedTimeState.speed;
            
            if (speedDisplay) {
                speedDisplay.innerText = timeManager.speed < 1 ? timeManager.speed.toFixed(2) + 'x' : Math.round(timeManager.speed) + 'x';
            }
            
            exitEventBtn.classList.add('hidden');
            eventBtns.forEach(b => b.classList.remove('hidden'));
            if (infoPanel) infoPanel.classList.add('hidden');
            
            // Trả camera về không gian hệ mặt trời tổng quan
            animateCameraToTarget(new THREE.Vector3(0, 300, 500), new THREE.Vector3(0, 0, 0));
        });
    }

    // ==========================================
    // 3. XỬ LÝ CLICK HÀNH TINH BAN ĐẦU (GIỮ NGUYÊN)
    // ==========================================
    const eventsPanel = document.getElementById('special-events-panel');
    const btnToggleEvents = document.getElementById('toggle-events-btn');
    if (btnToggleEvents && eventsPanel) {
        btnToggleEvents.addEventListener('click', () => {
            eventsPanel.classList.toggle('collapsed');
            btnToggleEvents.innerText = eventsPanel.classList.contains('collapsed') ? '◀ SỰ KIỆN' : '▶ ĐÓNG LẠI';
        });
    }

    window.addEventListener('dblclick', (event) => {
        if (!exitEventBtn.classList.contains('hidden')) return; 
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        
        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            let object = intersects[0].object;
            while (object && !SOLAR_SYSTEM_DATA[object.name]) {
                if(!object.parent) break;
                object = object.parent;
            }
            const planetData = SOLAR_SYSTEM_DATA[object.name];
            if (planetData) {
                currentFocusedPlanet = object;
                const radius = planetData.visualRadius || 5; 
                focusOnPlanet(camera, controls, object, radius, () => showInfoPanel(planetData));
            }
        }
    });
    
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            currentFocusedPlanet = null;
            if (infoPanel) infoPanel.classList.add('hidden'); 
            backBtn.classList.add('hidden');
            TWEEN.removeAll();
            animateCameraToTarget(new THREE.Vector3(0, 300, 500), new THREE.Vector3(0, 0, 0));
        });
    }
    
    if (timeSlider) {
        timeSlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            const speed = val >= 0 ? Math.pow(2.5, val) : 1 / Math.pow(2.5, Math.abs(val));
            timeManager.speed = speed;
            if (speedDisplay) {
                speedDisplay.innerText = speed < 1 ? speed.toFixed(2) + 'x' : Math.round(speed) + 'x';
            }
        });
    }
    
    if (document.getElementById('btn-play')) document.getElementById('btn-play').addEventListener('click', () => timeManager.isPaused = false);
    if (document.getElementById('btn-pause')) document.getElementById('btn-pause').addEventListener('click', () => timeManager.isPaused = true);
    if (document.getElementById('btn-reset')) {
        document.getElementById('btn-reset').addEventListener('click', () => {
            timeManager.timeDays = 0;
            if (timeSlider) timeSlider.value = 0;
            timeManager.speed = 1;
            if (speedDisplay) speedDisplay.innerText = '1x';
        });
    }
    
    function showInfoPanel(data) {
        if (!infoPanel) return;
        infoPanel.classList.remove('hidden'); 
        if (backBtn) backBtn.classList.remove('hidden');
        
        document.getElementById('info-name').innerText = data.englishName.toUpperCase();
        document.getElementById('info-type').innerText = `${data.name} — ${data.type}`;
        document.getElementById('info-desc').innerText = data.description;
        
        const infoImg = document.getElementById('info-img');
        if (infoImg && data.image) {
            infoImg.onload = () => infoImg.style.display = 'block';
            infoImg.onerror = () => infoImg.style.display = 'none';
            infoImg.src = data.image;
        } else if (infoImg) {
            infoImg.style.display = 'none';
        }
        
        const ul1 = document.getElementById('info-physics');
        if (ul1) {
            ul1.innerHTML = '';
            for (let k in data.physics) ul1.innerHTML += `<li><span>${k}</span><strong>${data.physics[k]}</strong></li>`;
        }
        
        const ul2 = document.getElementById('info-orbit');
        if (ul2) {
            ul2.innerHTML = '';
            for (let k in data.orbitAtmosphere) ul2.innerHTML += `<li><span>${k}</span><strong>${data.orbitAtmosphere[k]}</strong></li>`;
        }
    }
    
    return { getFocusedPlanet: () => currentFocusedPlanet };
}
