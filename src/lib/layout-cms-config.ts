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
  ctaTitle: string
  ctaSubtitle: string
  ctaButtonText: string
}

export interface ProgramPageConfig {
  badge: string
  title: string
  subtitle: string
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
  misiTitle: string
  misi1Title: string
  misi1Text: string
  misi2Title: string
  misi2Text: string
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

export interface StudentPortalConfig {
  welcomeTitle: string
  welcomeSubtitle: string
  announcementActive: boolean
  announcementTitle: string
  announcementText: string
  guidelineTitle: string
  guidelineText: string
}

export interface TeacherPortalConfig {
  portalTitle: string
  portalSubtitle: string
  bannerNotice: string
  counselorGuidelines: string
}

export interface AppLayoutConfig {
  landingPage: LandingPageConfig
  programPage: ProgramPageConfig
  tentangKamiPage: TentangKamiPageConfig
  studentPortal: StudentPortalConfig
  teacherPortal: TeacherPortalConfig
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
    ctaTitle: "Siap Memulai Perjalanan Anda?",
    ctaSubtitle: "Ambil langkah pertama untuk memulai kesadaran.",
    ctaButtonText: "Daftar / Mulai Sekarang",
  },
  programPage: {
    badge: "Latihan Terstruktur",
    title: "Program 4 Sesi Interaktif",
    subtitle:
      "Platform bimbingan dan konseling digital yang mengintegrasikan video panduan mindfulness, lembar kerja refleksi interaktif, serta sesi konseling online bersama Guru BK sekolah Anda.",
    methodologyHeading: "Tahapan Membangun Kesadaran",
    step1Title: "Asesmen",
    step1Desc:
      "Mengenali kondisi awal emosi dan pernapasan Anda untuk memastikan kesiapan dalam mengikuti latihan.",
    step2Title: "Latihan Rutin",
    step2Desc:
      "Mempraktikkan video mindfulness dan mengisi lembar kerja digital untuk mengintegrasikan pengalaman.",
    step3Title: "Evaluasi",
    step3Desc:
      "Memantau perkembangan diri dan berdiskusi online bersama Guru BK saat membutuhkan bimbingan mendalam.",
    counselingBannerTitle: "Syarat & Prosedur Konseling Online 1-on-1",
    counselingBannerText:
      "Setelah menuntaskan 4 sesi latihan dan mengisi worksheet, tombol Permohonan Konseling 1-on-1 akan terbuka secara otomatis untuk sesi pendalaman bersama Guru BK Anda.",
  },
  tentangKamiPage: {
    badge: "mindfulnessintervention.id • Ruang Aman & Terverifikasi Siswa",
    titlePrefix: "Mindfulness-Based",
    titleHighlight: "Intervention",
    description:
      "Mindfulness-Based Intervention adalah intervensi berbasis kesadaran yang melatih hadir secara utuh pada momen saat ini secara sengaja. Platform ini digunakan sebagai optimalisasi media layanan Bimbingan dan Konseling untuk memudahkan siswa SMA dalam memperoleh bantuan layanan.",
    visiTitle: "Visi Kami",
    visiText:
      "Menjadi platform pendampingan mental terdepan di Indonesia yang menjembatani layanan bimbingan sekolah dengan inovasi digital, menciptakan ruang singgah psikologis yang aman bagi pelajar di fase transisi.",
    misiTitle: "Misi Kami",
    misi1Title: "Akses Terintegrasi",
    misi1Text:
      "Memfasilitasi akses bimbingan psikologis yang terintegrasi langsung dengan Guru BK.",
    misi2Title: "Evaluasi Digital",
    misi2Text:
      "Mengembangkan instrumen digital untuk membantu evaluasi dan pemantauan kesejahteraan mental secara berkala.",
    teamHeading: "Di Balik Layar",
    teamSubtitle:
      "Para akademisi dan praktisi bimbingan konseling yang merumuskan kurikulum serta intervensi digital ini.",
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
  studentPortal: {
    welcomeTitle: "Selamat Datang di Ruang Sadar Siswa",
    welcomeSubtitle:
      "Langkah demi langkah melatih kesadaran penuh, mengelola kecemasan belajar, dan menjaga kesejahteraan diri.",
    announcementActive: true,
    announcementTitle: "Tips Mindfulness Hari Ini",
    announcementText:
      "Ambil jeda sejenak 3 menit, rasakan hembusan napas Anda, dan sadari momen saat ini sebelum melanjutkan aktivitas belajar.",
    guidelineTitle: "Panduan Menjalani 4 Sesi",
    guidelineText:
      "Tuntaskan setiap sesi secara berurutan dan isi lembar kerja refleksi untuk membuka akses permohonan bimbingan konseling bersama Guru BK.",
  },
  teacherPortal: {
    portalTitle: "Portal Manajemen Guru BK",
    portalSubtitle:
      "Pantau perkembangan afektif siswa, evaluasi catatan refleksi, dan kelola jadwal permohonan konseling siswa secara terstruktur.",
    bannerNotice:
      "Daftar siswa di bawah ini diperbarui secara otomatis berdasarkan progres latihan 4 sesi dan respons catatan refleksi harian.",
    counselorGuidelines:
      "Gunakan catatan refleksi siswa sebagai bahan telaah awal sebelum menyetujui dan melaksanakan sesi konseling.",
  },
}
