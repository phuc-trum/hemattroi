// js/audio.js
export function setupAudio() {
    // Khởi tạo đối tượng nhạc HTML5
    const bgm = new Audio();
    
    // Đường dẫn trỏ tới file nhạc anh vừa chuẩn bị ở Bước 1
    bgm.src = './audio/bgm.mp3'; 
    bgm.loop = true; // Tự động lặp lại khi hết bài
    bgm.volume = 0.35; // Âm lượng dịu nhẹ, vừa phải (tối đa là 1.0)

    // TỰ ĐỘNG TẠO NÚT ĐIỀU KHIỂN NHẠC (NASA Style)
    const muteBtn = document.createElement('button');
    muteBtn.id = 'audio-toggle-btn';
    muteBtn.innerHTML = '🔊 Mute'; 
    
    // Style cho nút phát sáng cực đẹp góc trên bên phải
    Object.assign(muteBtn.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '1000',
        padding: '10px 16px',
        backgroundColor: 'rgba(10, 25, 50, 0.85)',
        border: '1px solid rgba(0, 150, 255, 0.4)',
        color: '#00f0ff',
        fontFamily: 'monospace',
        fontSize: '11px',
        letterSpacing: '1px',
        borderRadius: '4px',
        cursor: 'pointer',
        textShadow: '0 0 5px #00f0ff',
        boxShadow: '0 0 10px rgba(0, 150, 255, 0.15)',
        transition: 'all 0.3s ease'
    });

    // Hiệu ứng hover di chuột vào nút
    muteBtn.addEventListener('mouseenter', () => {
        muteBtn.style.backgroundColor = 'rgba(0, 150, 255, 0.2)';
        muteBtn.style.boxShadow = '0 0 15px rgba(0, 150, 255, 0.4)';
    });
    muteBtn.addEventListener('mouseleave', () => {
        muteBtn.style.backgroundColor = 'rgba(10, 25, 50, 0.85)';
        muteBtn.style.boxShadow = '0 0 10px rgba(0, 150, 255, 0.15)';
    });

    document.body.appendChild(muteBtn);

    let isMuted = false;

    // Hàm bật / tắt âm thanh
    function toggleAudio() {
        if (isMuted) {
            bgm.muted = false;
            muteBtn.innerHTML = '🔊 Mute';
            muteBtn.style.color = '#00f0ff';
            muteBtn.style.borderColor = 'rgba(0, 150, 255, 0.4)';
            muteBtn.style.textShadow = '0 0 5px #00f0ff';
            isMuted = false;
        } else {
            bgm.muted = true;
            muteBtn.innerHTML = '🔇 Unmute';
            muteBtn.style.color = '#ff4444';
            muteBtn.style.borderColor = 'rgba(255, 68, 68, 0.4)';
            muteBtn.style.textShadow = '0 0 5px #ff4444';
            isMuted = true;
        }
    }

    // Sự kiện khi click nút nhạc
    muteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Tránh xung đột double click ngoài màn hình
        toggleAudio();
        if (bgm.paused) {
            bgm.play().catch(() => {});
        }
    });

    // Lách luật trình duyệt: Tự động chạy nhạc ngay khi người dùng click chuột lần đầu tiên vào màn hình
    const startAudioOnInteraction = () => {
        bgm.play().then(() => {
            // Khi đã chạy được nhạc thành công thì gỡ bỏ sự kiện lắng nghe click này
            document.removeEventListener('click', startAudioOnInteraction);
        }).catch(() => {
            // Trình duyệt chặn thì đợi lần click tiếp theo
        });
    };
    document.addEventListener('click', startAudioOnInteraction);

    return {
        play: () => bgm.play(),
        pause: () => bgm.pause()
    };
}