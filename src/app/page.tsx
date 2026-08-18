import Link from 'next/link'
import {
  Brain,
  Leaf,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  User,
  Headphones,
  Smile,
  Award,
  Eye,
  Flag,
} from 'lucide-react'


// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  darkGreen: '#3f5726',
  midGreen:  '#5a7a35',
  lightGreen:'#c2db8f',
  sage:      '#f3f6e8',
  lightSage: '#e8ece1',
  muted:     '#6b7a5e',
  text:      '#1e2a14',
}

const cardBase = 'rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md'
const sectionPad = 'py-20 md:py-28'
const container = 'max-w-6xl mx-auto px-4 md:px-8'

export default function Home() {
  return (
    <main
      className="overflow-x-hidden"
      style={{ color: C.text, fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
    >
      {/* ─────────────────────────── STICKY NAV ─────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{ background: 'rgba(243,246,232,0.92)', borderColor: '#d5dcc4' }}
      >
        <div className={`${container} flex items-center justify-between h-16`}>
          <Link href="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: C.darkGreen }}>
            <Leaf className="w-5 h-5" />
            <span>mindfulness.id</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: C.muted }}>
            <Link href="#metodologi" className="hover:opacity-70 transition-opacity">Metodologi</Link>
            <Link href="#sesi"        className="hover:opacity-70 transition-opacity">Sesi</Link>
            <Link href="#tentang"     className="hover:opacity-70 transition-opacity">Tentang</Link>
            <Link href="#tim"         className="hover:opacity-70 transition-opacity">Tim</Link>
          </div>
          <Link
            href="/login"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg cursor-pointer"
            style={{ background: C.darkGreen }}
          >
            Mulai Sekarang <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* ─────────────────────────── HERO ───────────────────────────────────── */}
      <section id="hero" className={`${sectionPad} text-center relative`} style={{ background: C.sage }}>
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: C.lightGreen, transform: 'translate(-40%, -40%)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: C.lightGreen, transform: 'translate(40%, 40%)' }} />

        <div className={`${container} relative z-10`}>
          {/* Eyebrow */}
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-8"
            style={{ background: C.lightGreen, color: C.darkGreen }}
          >
            <Leaf className="w-3 h-3" /> Platform Kesehatan Mental Pelajar
          </span>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ color: C.text, fontFamily: 'Georgia, serif', maxWidth: '860px', margin: '0 auto 1.5rem' }}
          >
            Mindfulness-Based Intervention (MBI) untuk Siswa
          </h1>

          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: C.muted, maxWidth: '640px', margin: '0 auto 2.5rem' }}
          >
            Intervensi berbasis kesadaran yang melatih Anda untuk hadir secara utuh pada momen saat ini.
            Platform ini dirancang khusus untuk memudahkan siswa dalam memperoleh bantuan layanan konseling secara optimal.
          </p>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-xl cursor-pointer"
            style={{ background: C.darkGreen, minHeight: '52px' }}
          >
            Mulai Sesi Pertama <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16">
            {[
              { value: '4',    label: 'Sesi Terstruktur' },
              { value: '3',    label: 'Peneliti Klinis' },
              { value: '100%', label: 'Berbasis Bukti' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold" style={{ color: C.darkGreen }}>{stat.value}</p>
                <p className="text-sm mt-1"       style={{ color: C.muted }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── METODOLOGI ─────────────────────────────── */}
      <section id="metodologi" className={`${sectionPad} bg-white`}>
        <div className={`${container} grid md:grid-cols-2 gap-12 lg:gap-20 items-start`}>
          {/* Left */}
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ background: C.lightSage, color: C.muted }}
            >
              Metodologi
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug"
              style={{ fontFamily: 'Georgia, serif', color: C.text }}
            >
              Kami Merancang Metodologi Untuk Membangun Kesadaran Secara Bertahap
            </h2>
          </div>

          {/* Right – steps */}
          <div className="flex flex-col gap-8">
            {[
              { num: '1', bg: C.lightGreen, color: C.darkGreen, title: 'Asesmen Awal',
                desc: 'Mengidentifikasi kondisi awal Anda untuk memastikan kesesuaian layanan pendampingan yang akan diberikan.' },
              { num: '2', bg: C.darkGreen,  color: '#ffffff',    title: 'Latihan Rutin',
                desc: 'Menumbuhkan kebiasaan baru agar praktik mindfulness dapat Anda terapkan secara konsisten dalam kehidupan sehari-hari.' },
              { num: '3', bg: C.midGreen,   color: '#ffffff',    title: 'Evaluasi Progress',
                desc: 'Memantau perkembangan diri secara berkala dan melihat sejauh mana efektivitas latihan yang telah dilakukan.' },
            ].map((step) => (
              <div key={step.num} className="flex gap-5 items-start">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm"
                  style={{ background: step.bg, color: step.color }}
                >
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1" style={{ color: C.text }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed"  style={{ color: C.muted }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── 4 SESI ─────────────────────────────────── */}
      <section id="sesi" className={sectionPad} style={{ background: C.sage }}>
        <div className={container}>
          <div className="text-center mb-14">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: C.lightGreen, color: C.darkGreen }}
            >
              Program
            </span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Georgia, serif', color: C.text }}>
              4 Sesi Mindfulness
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Sesi 1 – White */}
            <div className={`${cardBase} bg-white`} style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: C.lightSage, color: C.darkGreen }}>01</span>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: C.muted }}>Sesi 1</span>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: C.text }}>Mindful Breathing</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                Latihan pernapasan sadar yang dilengkapi dengan materi psikoedukasi. Sesi ini mencakup
                penugasan praktik mandiri di rumah untuk melatih fokus dan ketenangan.
              </p>
            </div>

            {/* Sesi 2 – Dark Green */}
            <div className={cardBase} style={{ background: C.darkGreen, boxShadow: '0 8px 32px rgba(63,87,38,0.25)' }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff' }}>02</span>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.6)' }}>Sesi 2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Mindful Sitting &amp; Listening</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Berlatih mengobservasi sekeliling dengan kesadaran penuh. Dilengkapi worksheet experience
                calendar untuk mencatat dinamika pikiran dan perasaanmu.
              </p>
            </div>

            {/* Sesi 3 – Light Sage */}
            <div className={cardBase} style={{ background: C.lightSage, boxShadow: '0 8px 32px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: C.lightGreen, color: C.darkGreen }}>03</span>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: C.muted }}>Sesi 3</span>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: C.text }}>Body Scanning</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                Kenali ketegangan fisikmu melalui pemindaian tubuh. Sesi ini menyertakan worksheet daily
                thought record untuk membantumu merespons beban pikiran secara lebih bijak.
              </p>
            </div>

            {/* Sesi 4 – White */}
            <div className={`${cardBase} bg-white`} style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: C.lightSage, color: C.darkGreen }}>04</span>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: C.muted }}>Sesi 4</span>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: C.text }}>Gratitude &amp; Loving Kindness</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                Tumbuhkan rasa syukur dan welas asih. Selesaikan sesi ini dengan penugasan gratitude
                journal, mencatat hal-hal baik, dan mensyukuri apresiasi untuk dirimu sendiri.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── PENGALAMAN PEMBELAJARAN ─────────────────── */}
      <section id="pembelajaran" className={sectionPad} style={{ background: C.lightSage }}>
        <div className={container}>
          <div className="text-center mb-14">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'white', color: C.muted }}
            >
              Fitur
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: C.text }}>
              Pengalaman Pembelajaran
            </h2>
            <p className="text-base leading-relaxed" style={{ color: C.muted, maxWidth: '520px', margin: '0 auto' }}>
              Sistem yang dirancang untuk mendukung fokus, kenyamanan, dan pelacakan progres secara aman.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { Icon: Headphones, title: 'Panduan Program Terstruktur',
                desc: 'Akses materi psikoedukasi dan instruksi latihan langkah demi langkah yang disusun khusus untuk mendukung fase perkembangan mentalmu.' },
              { Icon: Smile,      title: 'Pelacakan Mood Harian',
                desc: 'Catat fluktuasi emosimu setiap hari. Fitur ini juga membantu fasilitator pendidikan memantau kesejahteraan mentalmu secara berkala.' },
              { Icon: Award,      title: 'Pelacakan Konsistensi',
                desc: 'Pantau rekam jejak dan perkembanganmu. Dokumentasi progres ini dirancang untuk memotivasimu membangun rutinitas positif yang berkelanjutan.' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className={`${cardBase} bg-white flex flex-col`} style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 flex-shrink-0" style={{ background: C.sage }}>
                  <Icon className="w-6 h-6" style={{ color: C.darkGreen }} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: C.text }}>{title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: C.muted }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── TENTANG KAMI ───────────────────────────── */}
      <section id="tentang" className={`${sectionPad} bg-white`}>
        <div className={container}>
          {/* Centered header */}
          <div className="text-center mb-14">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ background: C.lightSage, color: C.muted }}
            >
              Tentang Kami
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-snug"
              style={{ fontFamily: 'Georgia, serif', color: C.text, maxWidth: '700px', margin: '0 auto 1.5rem' }}
            >
              Membangun Resiliensi Digital Pelajar Melalui Intervensi Klinis
            </h2>
            <p className="text-base leading-relaxed" style={{ color: C.muted, maxWidth: '600px', margin: '0 auto' }}>
              Kami hadir sebagai ruang aman bagi remaja untuk mengelola stres, kecemasan, dan tekanan
              akademik melalui pendekatan kesadaran penuh (mindfulness) berbasis praktik yang tervalidasi.
            </p>
          </div>

          {/* 2-column: Visi | Misi */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left – Visi + circular SVG badge */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.sage }}>
                  <Eye className="w-5 h-5" style={{ color: C.darkGreen }} />
                </div>
                <h3 className="font-bold text-lg" style={{ color: C.text }}>Visi Kami</h3>
              </div>
              <p className="text-sm leading-relaxed mb-10" style={{ color: C.muted }}>
                Menjadi platform pendampingan mental terdepan di Indonesia yang menjembatani layanan
                bimbingan sekolah dengan inovasi digital, menciptakan ruang singgah psikologis yang aman
                bagi pelajar di fase transisi.
              </p>

              {/* Decorative circular SVG badge */}
              <div className="flex justify-center md:justify-start">
                <svg
                  viewBox="0 0 160 160"
                  className="w-40 h-40"
                  aria-label="Badge: Klinis, Terukur, Berbasis Bukti"
                  role="img"
                >
                  <circle cx="80" cy="80" r="75" fill="none" stroke="#3f5726" strokeWidth="2" strokeDasharray="5 3" />
                  <circle cx="80" cy="80" r="62" fill="#f3f6e8" />
                  <defs>
                    <path id="badgeCircle" d="M 80,80 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0" />
                  </defs>
                  <text fontSize="9" fontWeight="700" letterSpacing="2.2" fill="#3f5726">
                    <textPath href="#badgeCircle" startOffset="0%">KLINIS • TERUKUR • BERBASIS BUKTI • </textPath>
                  </text>
                  <circle cx="80" cy="80" r="24" fill="#3f5726" />
                  <path d="M80 60 C90 60 96 70 96 80 C96 90 90 96 80 96 C76 88 76 68 80 60Z" fill="#c2db8f" opacity="0.9" />
                  <circle cx="80" cy="80" r="5" fill="white" />
                </svg>
              </div>
            </div>

            {/* Right – Misi */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.sage }}>
                  <Flag className="w-5 h-5" style={{ color: C.darkGreen }} />
                </div>
                <h3 className="font-bold text-lg" style={{ color: C.text }}>Misi Kami</h3>
              </div>
              <div className="flex flex-col gap-5">
                {[
                  'Menyediakan program intervensi berbasis kesadaran yang tervalidasi untuk mendukung regulasi emosi usia muda.',
                  'Memfasilitasi akses bimbingan psikologis yang terintegrasi langsung dengan fasilitator pendidikan.',
                  'Mengembangkan instrumen digital untuk membantu evaluasi dan pemantauan kesejahteraan mental secara berkala.',
                ].map((item) => (
                  <div key={item} className="flex gap-4 items-start">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: C.darkGreen }} />
                    <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Didukung Oleh */}
          <div className="mt-20 pt-10 border-t" style={{ borderColor: C.lightSage }}>
            <p className="text-center text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: C.muted }}>
              Didukung Oleh
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: 'Konseling MBCT',          Icon: Brain },
                { label: 'Klinik Psikologi Terapan', Icon: ShieldCheck },
              ].map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl border"
                  style={{ background: C.sage, borderColor: '#d5dcc4' }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.darkGreen }}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-sm" style={{ color: C.text }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── TIM PENELITI ───────────────────────────── */}
      <section id="tim" className={sectionPad} style={{ background: C.sage }}>
        <div className={container}>
          <div className="text-center mb-14">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: C.lightGreen, color: C.darkGreen }}
            >
              Tim Peneliti
            </span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Georgia, serif', color: C.text }}>
              Di Balik Layar
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Nabila Fuadina, M.Psi.',
                role: 'Akademisi & Pakar Inovasi Bimbingan',
                bio:  'Akademisi yang berfokus pada integrasi cybercounseling dan pengembangan media intervensi digital. Aktif merancang metode mindfulness untuk mengoptimalkan kesehatan mental (well-being) dan adaptasi sosial pada fase transisi remaja. Memiliki rekam jejak yang kuat dalam merumuskan strategi pendampingan psikologis dan kesiapan karier bagi generasi muda.',
              },
              {
                name: 'Riski Putra Ayu Distira, M.Pd',
                role: 'Praktisi Konseling & Akademisi',
                bio:  'Pakar bimbingan psikologis yang berfokus pada intervensi kelompok dan pendekatan Cognitive Behavior Therapy (CBT). Berpengalaman merancang modul pendampingan klinis untuk mereduksi kecemasan sosial dan mengatasi prokrastinasi akademik di kalangan pelajar fase remaja.',
              },
              {
                name: 'Dr. Thrisia Febrianti, M.Pd',
                role: 'Pakar Psikologi Positif & Akademisi',
                bio:  'Doktor pendidikan yang memfokuskan risetnya pada inovasi Mindfulness-Based Cognitive Therapy (MBCT) dan psikologi positif. Memiliki kepakaran dalam merancang model intervensi klinis berbasis bukti (evidence-based) guna mengoptimalkan psychological well-being generasi muda. Turut aktif memberdayakan para fasilitator pendidikan melalui program pendampingan kesehatan mental terpadu.',
              },
            ].map((person) => (
              <div
                key={person.name}
                className={`${cardBase} bg-white flex flex-col items-center text-center`}
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5 flex-shrink-0" style={{ background: C.lightSage }}>
                  <User className="w-10 h-10" style={{ color: C.muted }} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-base mb-1" style={{ color: C.text }}>{person.name}</h3>
                <p className="text-xs font-semibold mb-4"  style={{ color: C.darkGreen }}>{person.role}</p>
                <p className="text-sm leading-relaxed"      style={{ color: C.muted }}>{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── BOTTOM CTA ─────────────────────────────── */}
      <section id="cta" className={`${sectionPad} bg-white`}>
        <div className={container}>
          <div
            className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
            style={{ background: C.darkGreen }}
          >
            {/* Glow blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
              style={{ background: C.lightGreen, transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
              style={{ background: C.lightGreen, transform: 'translate(-30%, 30%)' }} />

            <div className="relative z-10">
              <Leaf className="w-10 h-10 mx-auto mb-6 text-white opacity-60" aria-hidden="true" />
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-4 leading-snug"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Siap Memulai Perjalanan Anda?
              </h2>
              <p className="text-base mb-10" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '400px', margin: '0 auto 2.5rem' }}>
                Ambil langkah pertama untuk merawat kesejahteraan mentalmu hari ini
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:opacity-90 hover:shadow-xl cursor-pointer"
                style={{ background: 'white', color: C.darkGreen, minHeight: '52px' }}
              >
                Daftar Sekarang <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── FOOTER ─────────────────────────────────── */}
      <footer className="py-10 border-t" style={{ borderColor: C.lightSage, background: 'white' }}>
        <div className={`${container} flex flex-col md:flex-row items-center justify-between gap-4`}>
          <Link href="/" className="flex items-center gap-2 font-bold" style={{ color: C.darkGreen }}>
            <Leaf className="w-4 h-4" aria-hidden="true" />
            <span>mindfulness.id</span>
          </Link>
          <p className="text-xs text-center" style={{ color: C.muted }}>
            &copy; {new Date().getFullYear()} Mindfulness.id &mdash; Platform Kesehatan Mental Pelajar Indonesia
          </p>
          <div className="flex gap-6 text-xs" style={{ color: C.muted }}>
            <Link href="/login" className="hover:opacity-70 transition-opacity">Masuk</Link>
            <Link href="#"      className="hover:opacity-70 transition-opacity">Kebijakan Privasi</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
