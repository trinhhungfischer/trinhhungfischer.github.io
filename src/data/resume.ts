// Nội dung trang Hồ sơ, đồng bộ với public/cv/Trinh_Quang_Hung_CV_{EN,VI}.pdf
export interface ResumeEntry {
  role: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface ResumeProject {
  title: string;
  slug?: string;
  org: string;
  period: string;
  meta: string;
  bullets: string[];
  stats?: string;
}

export interface ResumeData {
  name: string;
  headline: string;
  summary: string;
  highlights: { value: string; label: string }[];
  labels: {
    summary: string;
    experience: string;
    projects: string;
    skills: string;
    education: string;
    activities: string;
    downloadCv: string;
    viewProject: string;
  };
  experience: ResumeEntry[];
  projects: ResumeProject[];
  skills: { group: string; items: string[]; note?: string }[];
  education: ResumeEntry[];
  activities: { title: string; detail: string }[];
}

const resumeEn: ResumeData = {
  name: 'Trinh Quang Hung',
  headline: 'Senior Game Designer · Hanoi, Vietnam',
  summary:
    'Game Designer with 4 years of experience designing Midcore and Casual mobile games. Core strengths in core loop design, meta-game systems, progression and balance for products serving millions of players. Strong technical foundation with effective application of AI tools in the design workflow.',
  highlights: [
    { value: '4+', label: 'Years in game design' },
    { value: '1M+', label: 'Downloads on Guardian War' },
    { value: '+30%', label: 'Revenue on Galaxy War after rebalance' },
    { value: '100 / 2d', label: 'Levels produced with automated pipeline' },
  ],
  labels: {
    summary: 'Summary',
    experience: 'Experience',
    projects: 'Notable Projects',
    skills: 'Skills',
    education: 'Education',
    activities: 'Activities & Awards',
    downloadCv: 'Download CV (PDF)',
    viewProject: 'View project',
  },
  experience: [
    {
      role: 'Senior Game Designer',
      org: 'Falcon Games',
      location: 'Hanoi, Vietnam',
      period: 'Aug 2026 – present',
      bullets: [
        'Lead designer of the in-game economy and live events for Hungry Bees™ (3D color-sort puzzle)',
        'Designed the level blocker system that drives puzzle variety and difficulty',
      ],
    },
    {
      role: 'Game Designer',
      org: 'Zitga',
      location: 'Hanoi, Vietnam',
      period: 'Feb 2023 – Aug 2026',
      bullets: [
        'Led design of midcore game Guardian War (Squad RPG) and served as Lead Designer for Stickman Defense: Survival TD, Pixel Squad, and several Puzzle titles',
        'Built and maintained comprehensive Game Design Documents: core loop, meta-game, progression system, and economy',
        'Focused on Level, Progression, Economy Design and Game Balancing: increased revenue of Galaxy War by 30% through balance redesign and player experience loop optimization',
        'Proficient in Figma and Photoshop for in-game UX flow design and wireframing',
        'Applied AI tools (Claude, Gemini) to system and level design workflows, significantly boosting production speed',
        'Led sprint planning and backlog grooming under Agile methodology; coordinated cross-functional team (Dev, Art, QA) to ensure on-time milestone delivery',
      ],
    },
    {
      role: 'Game Developer (Internship)',
      org: 'Zingplay Studio - VNG',
      location: 'Hanoi, Vietnam',
      period: 'May 2022 – Aug 2022',
      bullets: [
        'Developed a Casual Tower Defense prototype Sinh Tu Mon ZingPlay using Cocos2D (client) and Bitzero (server)',
      ],
    },
    {
      role: 'Data Scientist (Internship)',
      org: 'ToVChain',
      location: 'Hanoi, Vietnam',
      period: 'Nov 2021 – May 2022',
      bullets: [
        'Analyzed user behavior and contributed to developing investment recommendation features on Trava Finance',
      ],
    },
  ],
  projects: [
    {
      title: 'Hungry Bees™: Color Sort Puzzle',
      slug: 'hungry-bees',
      org: 'Falcon Games',
      period: 'Aug 2026 – present',
      meta: 'Casual Puzzle · Mobile · Unity',
      bullets: [
        'Core loop: tap to send pixel bees to matching colored blocks and clear the board',
        'Lead designer of the in-game economy and live events',
        'Designed the level blocker system',
      ],
      stats: '100K+ downloads · Rating 4.9★',
    },
    {
      title: 'Stickman Defense: Survival TD',
      slug: 'stickman-defense',
      org: 'Zitga',
      period: 'Jan 2026 – Aug 2026',
      meta: 'Midcore Strategy/RPG · Mobile · Unity',
      bullets: [
        'Core loop: defend the base, eliminate attacking monsters, take rogue-like upgrades and defeat Bosses for rewards; strengthen characters via equipment, pets and meta systems',
        'Built and owned the entire game metrics system — progression curve, balance sheet and power scaling — as the foundation for all content and meta systems',
        'Lead Game Designer: character systems, progression, economy, guild, events and the full in-game UX flow',
      ],
      stats: '300K+ downloads · 7K DAU · Rating 4.7★',
    },
    {
      title: 'Guardian War: RPG Pixel Hero',
      slug: 'guardian-war',
      org: 'Zitga',
      period: 'Feb 2023 – Feb 2024',
      meta: 'Midcore Strategy/RPG · Mobile · Unity',
      bullets: [
        'Core loop: collect and upgrade heroes to conquer dungeons, defeat bosses and explore new lands chapter by chapter',
        'Built the core metrics framework and user progression system (early/mid/late game), a standardized blueprint for supplementary gameplay systems',
        'Designed and balanced hero stats, progression, economy, PvP/PvE and seasonal events',
        'Designed world map, characters and enemy scaling across content zones',
      ],
      stats: '1M+ downloads · 29K DAU · Rating 4.6★',
    },
    {
      title: 'Block Jam Away: Color Slide',
      slug: 'block-jam',
      org: 'Zitga',
      period: 'Jun 2025 – Aug 2025',
      meta: 'Casual Puzzle · Mobile · Unity',
      bullets: [
        'Core loop: slide and match colored blocks to solve puzzles level by level',
        'Lead Game Designer: progression system, level design and economy',
        'Automated the level design workflow (100 levels / 2 days) and built an automated difficulty testing tool',
      ],
      stats: '100K+ downloads · 5K DAU · Rating 4.4★',
    },
    {
      title: 'Sinh Tu Mon ZingPlay',
      slug: 'sinh-tu-mon',
      org: 'Zingplay Studio - VNG',
      period: 'May 2022 – Aug 2022',
      meta: 'Casual Tower Defense · Mobile · Cocos2D',
      bullets: [
        'Programmed client UI, gameplay mechanics and several server systems synchronized with the client',
      ],
    },
  ],
  skills: [
    {
      group: 'Game Design',
      items: ['GDD', 'Core Loop Design', 'Meta-game System', 'Progression & Economy Design', 'Game Balancing', 'Level Design', 'PvP/PvE Design', 'Event Design', 'Monetization (IAP/IAA)'],
    },
    {
      group: 'Analytics & Optimization',
      items: ['Data-driven Design', 'A/B Testing', 'Metrics Analysis (Retention/DAU/Conversion)', 'Player Behavior Analysis'],
    },
    {
      group: 'Tools & AI',
      items: ['Unity', 'Cocos2D', 'Machination', 'Figma', 'Photoshop', 'Claude', 'Gemini'],
    },
    {
      group: 'Programming',
      items: ['C#', 'Python'],
      note: 'Able to read and understand code; collaborate effectively with the Dev team',
    },
    {
      group: 'Language',
      items: ['English'],
      note: 'Proficient in reading technical documentation and GDD',
    },
  ],
  education: [
    {
      role: 'BS in Computer Science (Talented Program)',
      org: 'Hanoi University of Science and Technology (HUST)',
      location: 'Hanoi, Vietnam',
      period: 'Aug 2019 – Feb 2025',
      bullets: ['GPA: 3.57 / 4.0'],
    },
  ],
  activities: [
    {
      title: 'Honor Award — Axie Game Hackathon 2022',
      detail: 'Team UDestiny (4 members) achieved Top 4 — Honor Prize with a card game set in the Axie Infinity universe, with mechanics inspired by Rock-Paper-Scissors.',
    },
    {
      title: 'Third Prize — Vietnam Mathematics Olympiad 2019 (VMO)',
      detail: 'Third Prize in the national mathematics olympiad for outstanding high school students.',
    },
  ],
};

const resumeVi: ResumeData = {
  name: 'Trịnh Quang Hùng',
  headline: 'Senior Game Designer · Hà Nội, Việt Nam',
  summary:
    'Game Designer với 4 năm kinh nghiệm thiết kế game mobile Midcore và Casual. Thế mạnh về core loop design, meta-game system, progression và balance cho sản phẩm quy mô hàng triệu người chơi. Có nền tảng kỹ thuật vững chắc và ứng dụng AI hiệu quả trong quy trình thiết kế.',
  highlights: [
    { value: '4+', label: 'Năm làm game design' },
    { value: '1M+', label: 'Lượt tải Guardian War' },
    { value: '+30%', label: 'Doanh thu Galaxy War sau tái cân bằng' },
    { value: '100 / 2 ngày', label: 'Level nhờ quy trình tự động hóa' },
  ],
  labels: {
    summary: 'Tóm tắt',
    experience: 'Kinh nghiệm',
    projects: 'Dự án nổi bật',
    skills: 'Kỹ năng',
    education: 'Học vấn',
    activities: 'Hoạt động & Giải thưởng',
    downloadCv: 'Tải CV (PDF)',
    viewProject: 'Xem dự án',
  },
  experience: [
    {
      role: 'Senior Game Designer',
      org: 'Falcon Games',
      location: 'Hà Nội',
      period: '08/2026 – nay',
      bullets: [
        'Thiết kế chính hệ thống kinh tế (economy) và các sự kiện (live events) cho Hungry Bees™ (puzzle xếp màu 3D)',
        'Thiết kế hệ thống blocker cho level, tạo sự đa dạng và kiểm soát độ khó của màn chơi',
      ],
    },
    {
      role: 'Game Designer',
      org: 'Zitga',
      location: 'Hà Nội',
      period: '02/2023 – 08/2026',
      bullets: [
        'Phụ trách thiết kế game midcore Guardian War và Lead Designer cho Stickman Defense: Survival TD, Pixel Squad và một số game Puzzle',
        'Xây dựng và duy trì Game Design Document toàn diện: core loop, meta-game, progression system và economy',
        'Tập trung về Level, Progression, Economy Design và Game Balancing: tăng 30% doanh thu game Galaxy War thông qua tái thiết kế balance và tối ưu vòng lặp trải nghiệm người chơi',
        'Sử dụng thành thạo Figma và Photoshop để thiết kế UX flow và wireframe trong game',
        'Ứng dụng các công cụ AI (Claude, Gemini) vào quy trình thiết kế hệ thống và level, tăng đáng kể tốc độ sản xuất',
        'Chủ trì sprint planning và backlog grooming theo quy trình Agile; phối hợp cross-functional team (Dev, Art, QA) đảm bảo milestone đúng tiến độ',
      ],
    },
    {
      role: 'Game Developer (Thực tập)',
      org: 'Zingplay Studio - VNG',
      location: 'Hà Nội',
      period: '05/2022 – 08/2022',
      bullets: [
        'Phát triển prototype game Casual Tower Defense Sinh Tử Môn ZingPlay bằng Cocos2D (client) và Bitzero (server)',
      ],
    },
    {
      role: 'Data Scientist (Thực tập)',
      org: 'ToVChain',
      location: 'Hà Nội',
      period: '11/2021 – 05/2022',
      bullets: [
        'Phân tích hành vi người dùng và tham gia phát triển tính năng gợi ý đầu tư trên nền tảng Trava Finance',
      ],
    },
  ],
  projects: [
    {
      title: 'Hungry Bees™: Color Sort Puzzle',
      slug: 'hungry-bees',
      org: 'Falcon Games',
      period: '08/2026 – nay',
      meta: 'Casual Puzzle · Mobile · Unity',
      bullets: [
        'Core loop: chạm để đưa đàn ong pixel tới đúng khối cùng màu và dọn sạch màn chơi',
        'Thiết kế chính hệ thống kinh tế (economy) và các sự kiện (live events)',
        'Thiết kế hệ thống blocker cho level',
      ],
      stats: '100K+ lượt tải · Rating 4.9★',
    },
    {
      title: 'Stickman Defense: Survival TD',
      slug: 'stickman-defense',
      org: 'Zitga',
      period: '01/2026 – 08/2026',
      meta: 'Midcore Strategy/RPG · Mobile · Unity',
      bullets: [
        'Core loop: phòng thủ căn cứ, tiêu diệt quái vật, nhận nâng cấp rogue-like và hạ Boss để nhận thưởng; nâng sức mạnh qua trang bị, pet và nhiều hệ thống meta',
        'Xây dựng và sở hữu toàn bộ hệ thống chỉ số game — progression curve, balance sheet đến power scaling — làm nền tảng cho các hệ thống content và meta',
        'Lead Game Designer: hệ thống nhân vật, progression, economy, guild, event và toàn bộ UX flow trong game',
      ],
      stats: '300K+ lượt tải · 7K DAU · Rating 4.7★',
    },
    {
      title: 'Guardian War: RPG Pixel Hero',
      slug: 'guardian-war',
      org: 'Zitga',
      period: '02/2023 – 02/2024',
      meta: 'Midcore Strategy/RPG · Mobile · Unity',
      bullets: [
        'Core loop: sưu tầm và nâng cấp anh hùng để chinh phục dungeon, đánh boss và khám phá vùng đất mới theo từng chương',
        'Xây dựng core metrics framework và user progression system (early/mid/late game), tạo blueprint chuẩn hóa cho các hệ thống gameplay bổ sung',
        'Thiết kế và cân bằng hero stats, progression, economy, PvP/PvE và seasonal event',
        'Thiết kế world map, nhân vật và enemy scaling theo từng vùng nội dung',
      ],
      stats: '1M+ lượt tải · 29K DAU · Rating 4.6★',
    },
    {
      title: 'Block Jam Away: Color Slide',
      slug: 'block-jam',
      org: 'Zitga',
      period: '06/2025 – 08/2025',
      meta: 'Casual Puzzle · Mobile · Unity',
      bullets: [
        'Core loop: trượt và ghép các khối màu để giải câu đố theo từng màn chơi',
        'Lead Game Designer: hệ thống progression, level design và economy',
        'Tự động hóa quy trình thiết kế màn chơi (100 level / 2 ngày) và xây dựng công cụ kiểm thử độ khó tự động',
      ],
      stats: '100K+ lượt tải · 5K DAU · Rating 4.4★',
    },
    {
      title: 'Sinh Tử Môn ZingPlay',
      slug: 'sinh-tu-mon',
      org: 'Zingplay Studio - VNG',
      period: '05/2022 – 08/2022',
      meta: 'Casual Tower Defense · Mobile · Cocos2D',
      bullets: [
        'Lập trình giao diện client, các cơ chế gameplay và một số hệ thống server đồng bộ với client',
      ],
    },
  ],
  skills: [
    {
      group: 'Game Design',
      items: ['GDD', 'Core Loop Design', 'Meta-game System', 'Progression & Economy Design', 'Game Balancing', 'Level Design', 'PvP/PvE Design', 'Event Design', 'Monetization (IAP/IAA)'],
    },
    {
      group: 'Phân tích & Tối ưu',
      items: ['Data-driven Design', 'A/B Testing', 'Metrics Analysis (Retention/DAU/Conversion)', 'Player Behavior Analysis'],
    },
    {
      group: 'Công cụ & AI',
      items: ['Unity', 'Cocos2D', 'Machination', 'Figma', 'Photoshop', 'Claude', 'Gemini'],
    },
    {
      group: 'Lập trình',
      items: ['C#', 'Python'],
      note: 'Có khả năng đọc hiểu code và phối hợp hiệu quả với đội Dev',
    },
    {
      group: 'Ngoại ngữ',
      items: ['Tiếng Anh'],
      note: 'Đọc hiểu tài liệu kỹ thuật và GDD',
    },
  ],
  education: [
    {
      role: 'Cử nhân Khoa học Máy tính (Chương trình Tài năng)',
      org: 'Đại học Bách khoa Hà Nội',
      location: 'Hà Nội',
      period: '08/2019 – 02/2025',
      bullets: ['GPA: 3.57 / 4.0'],
    },
  ],
  activities: [
    {
      title: 'Giải Danh Dự — Axie Game Hackathon 2022',
      detail: 'Đội UDestiny (4 thành viên) đạt Top 4 — Honor Prize với game bài trong vũ trụ Axie Infinity, cơ chế lấy cảm hứng từ Oẳn Tù Tì.',
    },
    {
      title: 'Giải Ba — Olympic Toán học Việt Nam 2019 (VMO)',
      detail: 'Đạt giải Ba kỳ thi Olympic Toán quốc gia dành cho học sinh trung học phổ thông.',
    },
  ],
};

export const resume = { en: resumeEn, vi: resumeVi };
