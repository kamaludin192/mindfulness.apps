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
