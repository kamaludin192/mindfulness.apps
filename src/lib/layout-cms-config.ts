export interface LandingPageConfig {
  heroBadge: string
  heroTitlePrefix: string
  heroTitleHighlight: string
  heroDescription: string
  heroPrimaryBtnText: string
  heroPrimaryBtnHref: string
  heroSecondaryBtnText: string
  heroSecondaryBtnHref: string
  stat1Number: string
  stat1Label: string
  stat2Number: string
  stat2Label: string
  stat3Number: string
  stat3Label: string
  step1Title: string
  step1Desc: string
  step2Title: string
  step2Desc: string
  step3Title: string
  step3Desc: string
  
  // 4 Sessions Preview Section
  sessionsBadge: string
  sessionsTitle: string
  sessionsLinkText: string
  
  session1Title: string
  session1Desc: string
  session1Worksheet: string

  session2Title: string
  session2Desc: string
  session2Worksheet: string

  session3Title: string
  session3Desc: string
  session3Worksheet: string

  session4Title: string
  session4Desc: string
  session4Worksheet: string

  ctaTitle: string
  ctaSubtitle: string
  ctaButtonText: string
}

export interface ProgramPageConfig {
  badge: string
  title: string
  subtitle: string
  
  // Section: 4 Sesi Detail
  session1Title: string
  session1Desc: string
  session1Homework: string
  
  session2Title: string
  session2Desc: string
  session2Homework: string
  
  session3Title: string
  session3Desc: string
  session3Homework: string
  
  session4Title: string
  session4Desc: string
  session4Homework: string

  // Section: Pengalaman Pembelajaran
  learningTitle: string
  learningSubtitle: string
  learningFeature1: string
  learningFeature2: string
  learningFeature3: string

  methodologyHeading: string
  step1Title: string
  step1Desc: string
  step2Title: string
  step2Desc: string
  step3Title: string
  step3Desc: string

  counselingBannerTitle: string
  counselingBannerText: string
}

export interface TentangKamiPageConfig {
  badge: string
  titlePrefix: string
  titleHighlight: string
  description: string

  visiTitle: string
  visiText: string
  stampText: string

  misiTitle: string
  misi1Title: string
  misi1Text: string
  misi2Title: string
  misi2Text: string
  
  supportBadge: string
  supporter1: string
  supporter2: string

  teamBadge: string
  teamHeading: string
  teamSubtitle: string
  member1Name: string
  member1Role: string
  member1Bio: string
  member2Name: string
  member2Role: string
  member2Bio: string
  member3Name: string
  member3Role: string
  member3Bio: string
}

export interface AppLayoutConfig {
  landingPage: LandingPageConfig
  programPage: ProgramPageConfig
  tentangKamiPage: TentangKamiPageConfig
}

export const DEFAULT_LAYOUT_CONFIG: AppLayoutConfig = {
  landingPage: {
    heroBadge: "mindfulnessintervention.id • Ruang Aman & Terverifikasi Siswa",
    heroTitlePrefix: "Mindfulness-Based",
    heroTitleHighlight: "Intervention",
    heroDescription:
      "Mindfulness-Based Intervention adalah intervensi berbasis kesadaran yang melatih hadir secara utuh pada momen saat ini secara sengaja. Platform ini digunakan sebagai optimalisasi media layanan Bimbingan dan Konseling untuk memudahkan siswa SMA dalam memperoleh bantuan layanan.",
    heroPrimaryBtnText: "Mulai Sesi Pertama Sekarang",
    heroPrimaryBtnHref: "/login",
    heroSecondaryBtnText: "Jelajahi 4 Sesi Latihan",
    heroSecondaryBtnHref: "/program",
    stat1Number: "4 Sesi",
    stat1Label: "Video & Lembar Kerja",
    stat2Number: "1-on-1",
    stat2Label: "Jadwal Guru BK",
    stat3Number: "100%",
    stat3Label: "Privasi Terjaga",
    step1Title: "Asesmen",
    step1Desc:
      "Mengenali kondisi awal emosi dan pernapasan Anda untuk memastikan kesiapan dalam mengikuti latihan.",
    step2Title: "Latihan Rutin",
    step2Desc:
      "Mempraktikkan video mindfulness dan mengisi lembar kerja digital untuk mengintegrasikan pengalaman.",
    step3Title: "Evaluasi",
    step3Desc:
      "Memantau perkembangan diri dan berdiskusi online bersama Guru BK saat membutuhkan bimbingan mendalam.",
      
    sessionsBadge: "Latihan",
    sessionsTitle: "4 Sesi Mindfulness Interaktif",
    sessionsLinkText: "Lihat Detail Lengkap Modul",
    
    session1Title: "Mindful Breathing",
    session1Desc: "Mempelajari dasar pernapasan sadar dan melatih fokus pikiran.",
    session1Worksheet: "Worksheet Mindful Breathing",

    session2Title: "Mindful Sitting and Mindful Listening",
    session2Desc: "Melatih kesadaran saat duduk tenang dan mendengarkan dengan penuh perhatian tanpa menghakimi.",
    session2Worksheet: "Worksheet Experience Calendar",

    session3Title: "Body Scanning",
    session3Desc: "Mempelajari pemindaian sensasi tubuh secara menyeluruh untuk meredakan ketegangan fisik dan kecemasan.",
    session3Worksheet: "Worksheet Daily Thought Record",

    session4Title: "Gratitude and Loving in Kindness",
    session4Desc: "Menumbuhkan rasa syukur serta memupuk cinta kasih dan kebaikan hati terhadap diri sendiri dan orang lain.",
    session4Worksheet: "Worksheet Gratitude & Worksheet Letter for Myself",

    ctaTitle: "Siap Memulai Perjalanan Anda?",
    ctaSubtitle: "Ambil langkah pertama untuk memulai kesadaran.",
    ctaButtonText: "Daftar / Mulai Sekarang",
  },
  programPage: {
    badge: "MODUL PROGRAM",
    title: "Kurikulum Mindfulness Terpadu",
    subtitle:
      "Program ini dirancang khusus dengan pendekatan Mindfulness-Based Cognitive Therapy (MBCT) yang disesuaikan untuk pelajar.",
      
    // 4 Sesi Detail
    session1Title: "Mindful Breathing",
    session1Desc: "Latihan pernapasan sadar yang dilengkapi dengan materi psikoedukasi untuk melatih fokus dan ketenangan saat menghadapi situasi pemicu kecemasan.",
    session1Homework: "Tugas di rumah: berapa kali berlatih mindful breathing selama sehari.",

    session2Title: "Mindful Sitting and Mindful Listening",
    session2Desc: "Berlatih mengobservasi sekeliling dengan kesadaran penuh tanpa menghakimi saat duduk tenang dan mendengarkan dengan penuh perhatian.",
    session2Homework: "Penugasan worksheet experience calendar untuk dilakukan di rumah seharian apa yang dirasakan pada perasaan dan pikiran.",

    session3Title: "Body Scanning",
    session3Desc: "Kenali ketegangan fisik melalui teknik pemindaian sensasi tubuh secara menyeluruh untuk meredakan ketegangan fisik dan kecemasan.",
    session3Homework: "Penugasan worksheet daily thought record.",

    session4Title: "Gratitude and Loving in Kindness",
    session4Desc: "Tumbuhkan rasa syukur dan memupuk cinta kasih serta kebaikan hati terhadap diri sendiri maupun orang lain.",
    session4Homework: "Penugasan worksheet gratitude (menyebutkan hal yang disyukuri) dan worksheet letter for myself (menuliskan surat cinta untuk diri).",

    // Pengalaman Pembelajaran
    learningTitle: "Pengalaman Pembelajaran",
    learningSubtitle: "Sistem yang dirancang untuk mendukung fokus, kenyamanan, dan pelacakan progres secara aman.",
    learningFeature1: "Panduan Program Terstruktur",
    learningFeature2: "Pelacakan Mood Harian",
    learningFeature3: "Pelacakan Konsistensi",

    methodologyHeading: "Tiga Tahapan Kesadaran (Alur Program Siswa)",
    step1Title: "Persiapan & Pre-Test",
    step1Desc:
      "Pengenalan awal mengenai mindfulness dan asesmen untuk mengukur tingkat kecemasan awal siswa.",
    step2Title: "Implementasi 4 Sesi",
    step2Desc:
      "Mempraktikkan teknik-teknik mindfulness dengan panduan video secara berurutan.",
    step3Title: "Post-Test & Evaluasi",
    step3Desc:
      "Mengukur perubahan tingkat kecemasan setelah menyelesaikan seluruh modul.",

    counselingBannerTitle: "Syarat & Prosedur Konseling Online 1-on-1",
    counselingBannerText:
      "Setelah menuntaskan 4 sesi latihan dan mengisi worksheet, tombol Permohonan Konseling 1-on-1 akan terbuka secara otomatis untuk sesi pendalaman bersama Guru BK Anda.",
  },
  tentangKamiPage: {
    badge: "TENTANG PLATFORM",
    titlePrefix: "Menyertai Perjalanan",
    titleHighlight: "Kesehatan Mental Remaja",
    description:
      "Sebuah inisiatif riset untuk menghadirkan intervensi kecemasan akademik yang terukur dan mudah diakses oleh siswa di era digital.",

    visiTitle: "Visi Penelitian",
    visiText:
      "Mengurangi prevalensi kecemasan akademik pada siswa melalui pendekatan terapi kognitif berbasis mindfulness yang divalidasi secara ilmiah.",
    stampText: "EDUKATIF • TERUKUR • BERBASIS RISET •",

    misiTitle: "Misi Utama",
    misi1Title: "Digitalisasi Terapi",
    misi1Text:
      "Menerjemahkan teknik MBCT klinis ke dalam format digital yang ramah remaja.",
    misi2Title: "Bimbingan Terpadu",
    misi2Text:
      "Menyediakan ekosistem dimana konselor sekolah dapat memantau dan membimbing siswa.",

    supportBadge: "DIDUKUNG OLEH",
    supporter1: "Konseling MBCT",
    supporter2: "Klinik Psikologi Terapan",

    teamBadge: "TIM PENELITI",
    teamHeading: "Peneliti & Pengembang",
    teamSubtitle:
      "Orang-orang di balik perancangan modul, pengembangan aplikasi, dan pengujian efektivitas program.",
    member1Name: "Nabila Fuadina, M.Psi.",
    member1Role: "Akademisi & Pakar Inovasi Bimbingan",
    member1Bio:
      "Akademisi yang berfokus pada integrasi cybercounseling dan pengembangan media intervensi digital. Aktif merancang metode mindfulness untuk mengoptimalkan kesehatan mental (well-being) dan adaptasi sosial pada fase transisi remaja.",
    member2Name: "Riski Putra Ayu Distira, M.Pd",
    member2Role: "Praktisi Konseling & Akademisi",
    member2Bio:
      "Pakar bimbingan psikologis yang berfokus pada intervensi kelompok dan pendekatan Cognitive Behavior Therapy (CBT). Berpengalaman merancang modul pendampingan klinis untuk mereduksi kecemasan sosial dan mengatasi prokrastinasi akademik di kalangan pelajar.",
    member3Name: "Dr. Thrisia Febrianti, M.Pd",
    member3Role: "Pakar Psikologi Positif & Akademisi",
    member3Bio:
      "Doktor pendidikan yang memfokuskan risetnya pada inovasi Mindfulness-Based Cognitive Therapy (MBCT) dan psikologi positif. Memiliki kepakaran dalam merancang model intervensi klinis berbasis bukti guna mengoptimalkan psychological well-being.",
  },
}
