// js/data.js
export const SCALES = {
    TIME: 1
};

export const SOLAR_SYSTEM_DATA = {
    sun: {
        id: "sun",
        name: "Mặt Trời",
        englishName: "Sun",
        type: "Ngôi sao dải chính (G-Type)",
        visualRadius: 10,
        description: "Ngôi sao ở trung tâm Hệ Mặt Trời. Khối lượng của nó chiếm khoảng 99.86% tổng khối lượng của toàn Hệ.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/320px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg",
        physics: {
            "Đường kính": "1,392,700 km",
            "Khối lượng": "1.989 × 10^30 kg (gấp 330,000 lần Trái Đất)",
            "Trọng lực bề mặt": "274 m/s² (gấp 28 lần Trái Đất)",
            "Nhiệt độ vùng lõi": "~15,000,000 °C",
            "Nhiệt độ bề mặt": "5,500 °C"
        },
        orbitAtmosphere: {
            "Chu kỳ tự quay": "25 ngày (ở xích đạo) - 35 ngày (ở cực)",
            "Tốc độ quỹ đạo": "220 km/s (quanh trung tâm Ngân Hà)",
            "Thành phần chính": "73% Hydro, 25% Heli, 2% các nguyên tố nặng",
            "Loại quang phổ": "G2V (Sao lùn vàng)"
        },
        historyMissions: {
            "Tuổi thọ hiện tại": "Khoảng 4.6 tỷ năm",
            "Trạng thái vòng đời": "Đang ở dải chính (còn ~5 tỷ năm nữa trước khi thành khổng lồ đỏ)",
            "Nhiệm vụ nổi bật": "SOHO, Parker Solar Probe, Solar Orbiter"
        }
    },
    mercury: {
        id: "mercury", name: "Sao Thủy", englishName: "Mercury", type: "Hành tinh đá",
        visualRadius: 1.0, color: 0x888888, visualDistance: 20,
        orbitalPeriod: 88, rotationPeriod: 58.6,
        description: "Hành tinh nhỏ nhất và gần Mặt Trời nhất. Ban ngày cực nóng nhưng ban đêm lạnh đóng băng do không có khí quyển giữ nhiệt.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/320px-Mercury_in_true_color.jpg",
        physics: {
            "Đường kính": "4,879 km",
            "Khối lượng": "3.30 × 10^23 kg (0.055 lần Trái Đất)",
            "Trọng lực": "3.7 m/s² (0.38g)",
            "Nhiệt độ bề mặt": "-173°C đến 427°C",
            "Mật độ trung bình": "5.43 g/cm³"
        },
        orbitAtmosphere: {
            "Khoảng cách Mặt Trời": "57.9 triệu km (0.39 AU)",
            "Chu kỳ quỹ đạo": "88 ngày Trái Đất",
            "Vận tốc quỹ đạo": "47.4 km/s",
            "Khí quyển": "Hầu như không có (chỉ có lượng nhỏ Heli, Natri, Oxy)"
        },
        historyMissions: {
            "Người phát hiện": "Người Sumer cổ đại (từ thiên niên kỷ thứ 3 TCN)",
            "Nguồn gốc tên gọi": "Đặt theo tên vị thần liên lạc và sứ giả La Mã",
            "Nhiệm vụ nổi bật": "Mariner 10 (1974), MESSENGER (2008), BepiColombo (hiện tại)"
        }
    },
    venus: {
        id: "venus", name: "Sao Kim", englishName: "Venus", type: "Hành tinh đá",
        visualRadius: 1.8, color: 0xe3bb76, visualDistance: 32,
        orbitalPeriod: 224.7, rotationPeriod: -243, hasClouds: true,
        description: "Hành tinh nóng nhất Hệ Mặt Trời với hiệu ứng nhà kính mất kiểm soát. Áp suất khí quyển ở đây có thể đè bẹp tàu vũ trụ thép.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/320px-Venus-real_color.jpg",
        physics: {
            "Đường kính": "12,104 km (gần bằng Trái Đất)",
            "Khối lượng": "4.87 × 10^24 kg (0.815 lần Trái Đất)",
            "Trọng lực": "8.87 m/s² (0.9g)",
            "Nhiệt độ bề mặt": "462°C (đủ nóng để nung chảy chì)",
            "Chu kỳ tự quay": "243 ngày (quay ngược chiều kim đồng hồ)"
        },
        orbitAtmosphere: {
            "Khoảng cách Mặt Trời": "108.2 triệu km (0.72 AU)",
            "Chu kỳ quỹ đạo": "224.7 ngày Trái Đất",
            "Áp suất khí quyển": "92 bar (gấp 92 lần Trái Đất)",
            "Thành phần khí quyển": "96.5% Cacbon đioxit (CO2), 3.5% Nitơ, mây axit sunfuric"
        },
        historyMissions: {
            "Biệt danh": "Hành tinh sinh đôi của Trái Đất / Sao Hôm / Sao Mai",
            "Người phát hiện": "Được quan sát từ thời tiền sử",
            "Nhiệm vụ nổi bật": "Venera 7 (Liên Xô - hạ cánh năm 1970), Magellan (NASA - 1990), Akatsuki (JAXA)"
        }
    },
    earth: {
        id: "earth", name: "Trái Đất", englishName: "Earth", type: "Hành tinh đá",
        visualRadius: 2.0, color: 0x2b82c9, visualDistance: 46,
        orbitalPeriod: 365.25, rotationPeriod: 0.99, hasClouds: true,
        moons: [
            { name: "Mặt Trăng", englishName: "Moon", radius: 0.4, distance: 4.5, speed: 0.05, color: 0x888888 }
        ],
        description: "Hành tinh duy nhất trong vũ trụ được xác nhận là có sự sống phát triển. Sở hữu lớp nước lỏng bao phủ 71% bề mặt.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered_w_resolution%29.jpg/320px-The_Blue_Marble_%28remastered_w_resolution%29.jpg",
        physics: {
            "Đường kính": "12,742 km",
            "Khối lượng": "5.97 × 10^24 kg",
            "Trọng lực": "9.81 m/s² (1.0g)",
            "Nhiệt độ trung bình": "15°C (-89°C đến 58°C)",
            "Chu kỳ tự quay": "23 giờ 56 phút 4 giây"
        },
        orbitAtmosphere: {
            "Khoảng cách Mặt Trời": "149.6 triệu km (1.0 AU)",
            "Chu kỳ quỹ đạo": "365.25 ngày",
            "Độ nghiêng trục tự quay": "23.44 độ (tạo ra các mùa trong năm)",
            "Thành phần khí quyển": "78% Nitơ, 21% Oxy, 1% Argon và hơi nước"
        },
        historyMissions: {
            "Vệ tinh tự nhiên": "1 (Mặt Trăng / Luna)",
            "Tuổi đời ước tính": "4.54 tỷ năm",
            "Dự án tiêu biểu": "Hệ thống vệ tinh khí hậu Copernicus, Trạm vũ trụ quốc tế ISS, Kính viễn vọng James Webb"
        }
    },
    mars: {
        id: "mars", name: "Sao Hỏa", englishName: "Mars", type: "Hành tinh đá",
        visualRadius: 1.4, color: 0xc1440e, visualDistance: 60,
        orbitalPeriod: 687, rotationPeriod: 1.03,
        moons: [
            { name: "Phobos", englishName: "Phobos", radius: 0.2, distance: 2.6, speed: 0.09, color: 0x555555 },
            { name: "Deimos", englishName: "Deimos", radius: 0.15, distance: 3.5, speed: 0.06, color: 0x666666 }
        ],
        description: "Hành tinh Đỏ. Nơi có hẻm núi lớn nhất hệ mặt trời (Valles Marineris) và siêu núi lửa tắt Olympus Mons cao gấp 3 lần đỉnh Everest.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/320px-OSIRIS_Mars_true_color.jpg",
        physics: {
            "Đường kính": "6,779 km",
            "Khối lượng": "0.642 × 10^24 kg (0.107 lần Trái Đất)",
            "Trọng lực": "3.71 m/s² (0.38g)",
            "Nhiệt độ bề mặt": "-143°C đến 35°C (trung bình -63°C)",
            "Màu sắc đặc trưng": "Đỏ rỉ sét (do hàm lượng Sắt Oxit dồi dào trên bề mặt)"
        },
        orbitAtmosphere: {
            "Khoảng cách Mặt Trời": "227.9 triệu km (1.52 AU)",
            "Chu kỳ quỹ đạo": "687 ngày Trái Đất",
            "Áp suất khí quyển": "Cực mỏng (chỉ bằng 0.6% áp suất Trái Đất)",
            "Thành phần khí quyển": "95% CO2, 2.8% Nitơ, 2% Argon"
        },
        historyMissions: {
            "Vệ tinh tự nhiên": "2 (Phobos và Deimos - thực chất là hai tiểu hành tinh bị bắt giữ)",
            "Mục tiêu khoa học": "Tìm kiếm dấu vết nước lỏng cổ đại và sự sống vi sinh",
            "Nhiệm vụ nổi bật": "Tàu tự hành Curiosity (2012), Perseverance (2021), trực thăng Ingenuity"
        }
    },
    jupiter: {
        id: "jupiter", name: "Sao Mộc", englishName: "Jupiter", type: "Hành tinh khí khổng lồ",
        visualRadius: 4.2, color: 0xd8ca9d, visualDistance: 82,
        orbitalPeriod: 4331, rotationPeriod: 0.41,
        moons: [
            { name: "Io", englishName: "Io", radius: 0.25, distance: 6.0, speed: 0.08, color: 0xf3a35c },
            { name: "Europa", englishName: "Europa", radius: 0.22, distance: 7.2, speed: 0.06, color: 0xdcdcdc },
            { name: "Ganymede", englishName: "Ganymede", radius: 0.3, distance: 8.5, speed: 0.04, color: 0xb0c4de },
            { name: "Callisto", englishName: "Callisto", radius: 0.28, distance: 10.0, speed: 0.03, color: 0x8fbc8f }
        ],
        description: "Hành tinh lớn nhất trong Hệ Mặt Trời. Có khối lượng gấp 2.5 lần tổng tất cả các hành tinh khác cộng lại. Nổi tiếng với siêu bão Vết Đỏ Lớn.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/320px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
        physics: {
            "Đường kính": "139,820 km (gấp 11 lần Trái Đất)",
            "Khối lượng": "1,898 × 10^24 kg (318 lần Trái Đất)",
            "Trọng lực": "24.79 m/s² (gấp 2.5 lần Trái Đất)",
            "Tốc độ tự quay": "Cực nhanh (chỉ mất 9 giờ 55 phút cho một vòng)",
            "Đặc điểm lõi": "Lõi đá cô đặc bao quanh bởi Hydro kim loại lỏng"
        },
        orbitAtmosphere: {
            "Khoảng cách Mặt Trời": "778.5 triệu km (5.20 AU)",
            "Chu kỳ quỹ đạo": "11.86 năm Trái Đất",
            "Từ trường": "Mạnh khủng khiếp (gấp 14 lần Trái Đất)",
            "Thành phần khí quyển": "89.8% Hydro, 10.2% Heli"
        },
        historyMissions: {
            "Hệ thống vệ tinh": "95 Mặt Trăng được xác nhận (nổi tiếng nhất là 4 mặt trăng Galileo)",
            "Vòng nhẫn": "Có hệ thống nhẫn bụi mờ nhạt bao quanh",
            "Nhiệm vụ nổi bật": "Voyager 1 & 2 (1979), tàu Galileo (1995), tàu Juno (2016 - nay)"
        }
    },
    saturn: {
        id: "saturn", name: "Sao Thổ", englishName: "Saturn", type: "Hành tinh khí khổng lồ",
        visualRadius: 3.6, color: 0xead6b8, visualDistance: 112,
        orbitalPeriod: 10747, rotationPeriod: 0.45, hasRings: true,
        moons: [
            { name: "Titan", englishName: "Titan", radius: 0.32, distance: 7.5, speed: 0.04, color: 0xe2ba6e }
        ],
        description: "Hành tinh có tỷ trọng nhẹ nhất (nhẹ hơn nước). Nổi bật với hệ thống vành đai tráng lệ làm từ hàng tỷ mảnh vụn băng đá và bụi.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/320px-Saturn_during_Equinox.jpg",
        physics: {
            "Đường kính": "116,460 km (chưa tính vành đai)",
            "Khối lượng": "568 × 10^24 kg (gấp 95 lần Trái Đất)",
            "Trọng lực": "10.44 m/s² (1.06g)",
            "Khối lượng riêng": "0.69 g/cm³ (thả vào bể nước khổng lồ hành tinh này sẽ nổi)",
            "Độ rộng vành đai": "Rộng tới 282,000 km nhưng độ dày chỉ khoảng 10 mét!"
        },
        orbitAtmosphere: {
            "Khoảng cách Mặt Trời": "1.43 tỷ km (9.58 AU)",
            "Chu kỳ quỹ đạo": "29.45 năm Trái Đất",
            "Sức gió khí quyển": "Lên tới 1,800 km/h (nhanh hơn tốc độ âm thanh)",
            "Thành phần khí quyển": "96.3% Hydro, 3.2% Heli, một lượng nhỏ Mêtan"
        },
        historyMissions: {
            "Hệ thống vệ tinh": "146 Mặt Trăng (nổi bật là Titan có bầu khí quyển dày và hồ mêtan lỏng)",
            "Người đầu tiên quan sát": "Galileo Galilei bằng kính viễn vọng sơ khai (năm 1610)",
            "Nhiệm vụ nổi bật": "Pioneer 11, Voyager 1, Tàu Cassini-Huygens (quay quanh từ 2004 - 2017)"
        }
    },
    uranus: {
        id: "uranus", name: "Sao Thiên Vương", englishName: "Uranus", type: "Hành tinh băng khổng lồ",
        visualRadius: 2.6, color: 0x88ccee, visualDistance: 140,
        orbitalPeriod: 30589, rotationPeriod: -0.72, hasVerticalRings: true,
        moons: [
            { name: "Titania", englishName: "Titania", radius: 0.22, distance: 5.0, speed: 0.05, color: 0xaaaaaa }
        ],
        description: "Hành tinh độc đáo tự quay theo chiều nằm ngang (trục nghiêng 97.7 độ), khiến nó giống như một quả bóng lăn tròn trên quỹ đạo quanh Mặt Trời.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/320px-Uranus2.jpg",
        physics: {
            "Đường kính": "50,724 km",
            "Khối lượng": "86.8 × 10^24 kg (gấp 14.5 lần Trái Đất)",
            "Trọng lực": "8.69 m/s² (0.89g)",
            "Nhiệt độ tối thiểu": "-224°C (Nơi lạnh nhất trong Hệ Mặt Trời)",
            "Màu sắc đặc trưng": "Xanh lục nhạt (do khí mêtan hấp thụ ánh sáng đỏ)"
        },
        orbitAtmosphere: {
            "Khoảng cách Mặt Trời": "2.87 tỷ km (19.2 AU)",
            "Chu kỳ quỹ đạo": "84 năm Trái Đất",
            "Độ nghiêng trục quay": "97.77 độ (độc nhất vô nhị)",
            "Thành phần khí quyển": "83% Hydro, 15% Heli, 2.3% Mêtan, có nhiều băng nước và amoniac"
        },
        historyMissions: {
            "Người phát hiện": "Nhà thiên văn William Herschel (phát hiện bằng kính viễn vọng năm 1781)",
            "Ý nghĩa tên gọi": "Hành tinh duy nhất đặt tên theo một vị thần bầu trời Hy Lạp (Ouranos)",
            "Nhiệm vụ nổi bật": "Chỉ duy nhất tàu Voyager 2 bay qua tiếp cận ở cự ly gần vào năm 1986"
        }
    },
    neptune: {
        id: "neptune", name: "Sao Hải Vương", englishName: "Neptune", type: "Hành tinh băng khổng lồ",
        visualRadius: 2.5, color: 0x274687, visualDistance: 168,
        orbitalPeriod: 59800, rotationPeriod: 0.67,
        moons: [
            { name: "Triton", englishName: "Triton", radius: 0.24, distance: 4.8, speed: -0.06, color: 0xadd8e6 }
        ],
        description: "Hành tinh xa nhất tính từ Mặt Trời. Có bầu khí quyển năng động với những siêu bão khổng lồ và sức gió mạnh nhất hệ mặt trời.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_2019_color_restore.jpg/320px-Neptune_-_Voyager_2_2019_color_restore.jpg",
        physics: {
            "Đường kính": "49,244 km",
            "Khối lượng": "102 × 10^24 kg (gấp 17 lần Trái Đất)",
            "Trọng lực": "11.15 m/s² (1.14g)",
            "Nhiệt độ trung bình": "-214°C",
            "Màu sắc đặc trưng": "Xanh biển đậm rực rỡ"
        },
        orbitAtmosphere: {
            "Khoảng cách Mặt Trời": "4.50 tỷ km (30.1 AU)",
            "Chu kỳ quỹ đạo": "164.8 năm Trái Đất (từ lúc phát hiện mới chỉ quay được 1 vòng rưỡi)",
            "Tốc độ gió tối đa": "Hơn 2,100 km/h",
            "Thành phần khí quyển": "80% Hydro, 19% Heli, 1.5% Mêtan"
        },
        historyMissions: {
            "Người phát hiện": "Urbain Le Verrier & Johann Galle (phát hiện bằng toán học năm 1846)",
            "Vệ tinh nổi tiếng": "Mặt Trăng Triton quay ngược chiều tự quay của hành tinh mẹ (Quỹ đạo nghịch hành)",
            "Nhiệm vụ nổi bật": "Voyager 2 tiếp cận thành công năm 1989"
        }
    }
};
