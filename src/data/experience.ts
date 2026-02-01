// src/data/experience.ts

export type Experience = {
  jobTitle: string;
  company: string;
  duration: string;
  description: string[];
};

export const experiences: { en: Experience[]; id: Experience[] } = {
  en: [
    {
      jobTitle: "Cloud Computing Cohort",
      company: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
      duration: "Sep 2024 - Dec 2024",
      description: [
        "Participated in an intensive cloud computing training program focused on Google Cloud Platform.",
        "Developing scalable and efficient cloud-based applications and infrastructure.",
        "Collaborated with cross-functional teams on capstone projects using modern web and cloud technologies.",
      ],
    },
    {
      jobTitle: "Website & Design Services",
      company: "KreativLabs.id",
      duration: "Nov 2025 - Present",
      description: [
        "Providing professional website development and design services for clients.",
        "Creating modern, responsive, and user-friendly web applications tailored to client needs.",
        "Delivering comprehensive design solutions including UI/UX design and branding materials.",
      ],
    },
    {
      jobTitle: "Head of Multimedia Division",
      company: "HMIF UNSRI",
      duration: "Jan 2024 - Dec 2024",
      description: [
        "Led multimedia division responsible for creating design templates and daily Instagram content.",
        "Managed publication and documentation teams for major events including Open Recruitment and Srifoton 2024.",
        "Collaborated with department heads to develop strategic multimedia programs and initiatives.",
      ],
    },
    {
      jobTitle: "Media and Creative Member",
      company: "Google Developer Student Clubs UNSRI",
      duration: "Oct 2023 - Aug 2024",
      description: [
        "Created Standard Operating Procedures for Instagram feed templates and infographic content.",
        "Led Media and Creative division for Computer Security event and participated in MERN Stack workshops.",
        "Documented onboarding events and created engaging visual content for tech community.",
      ],
    },
    {
      jobTitle: "Multimedia Staff",
      company: "FASCO UNSRI",
      duration: "Jan 2024 - Dec 2024",
      description: [
        "Designed daily Instagram feed content and created monthly design templates.",
        "Managed publication and documentation for Workshop Debat FASCO and FASCO Academy 2024.",
        "Collaborated with team members to maintain consistent visual branding across platforms.",
      ],
    },
    {
      jobTitle: "Multimedia Staff",
      company: "HMIF UNSRI",
      duration: "Feb 2023 - Dec 2023",
      description: [
        "Created Instagram feed design templates and served as video editor for major events.",
        "Led publication and documentation teams for Upgrading Staff and Srifoton 2023.",
        "Produced promotional video trailers for IF Fest and Srifoton events.",
      ],
    },
    {
      jobTitle: "Multimedia Staff",
      company: "WIFI UNSRI",
      duration: "Mar 2023 - Dec 2023",
      description: [
        "Managed daily multimedia tasks assigned by division head and created engaging visual content.",
        "Served as publication and documentation team member for PTQ WIFI 2023 and SQC Nadwah UNSRI 2023.",
        "Led publication and documentation responsibilities for Kajian Rutin LDF WIFI 2023 events.",
      ],
    },
  ],
  id: [
    {
      jobTitle: "Cloud Computing Cohort",
      company: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
      duration: "Sep 2024 - Des 2024",
      description: [
        "Berpartisipasi dalam program pelatihan cloud computing intensif yang berfokus pada Google Cloud Platform.",
        "Mengembangkan aplikasi dan infrastruktur berbasis cloud yang skalabel dan efisien.",
        "Berkolaborasi dengan tim lintas fungsi dalam proyek akhir (capstone project) menggunakan teknologi web dan cloud modern.",
      ],
    },
    {
      jobTitle: "Jasa Website & Desain",
      company: "KreativLabs.id",
      duration: "Nov 2025 - Sekarang",
      description: [
        "Menyediakan layanan pengembangan website dan desain profesional untuk klien.",
        "Membuat aplikasi web modern, responsif, dan user-friendly yang disesuaikan dengan kebutuhan klien.",
        "Memberikan solusi desain komprehensif termasuk desain UI/UX dan materi branding.",
      ],
    },
    {
      jobTitle: "Kepala Divisi Multimedia",
      company: "HMIF UNSRI",
      duration: "Jan 2024 - Des 2024",
      description: [
        "Memimpin divisi multimedia yang bertanggung jawab membuat template desain dan konten Instagram harian.",
        "Mengelola tim publikasi dan dokumentasi untuk acara besar termasuk Open Recruitment dan Srifoton 2024.",
        "Berkolaborasi dengan ketua departemen untuk mengembangkan program kerja multimedia strategis.",
      ],
    },
    {
      jobTitle: "Member Media and Creative",
      company: "Google Developer Student Clubs UNSRI",
      duration: "Okt 2023 - Ags 2024",
      description: [
        "Membuat Standard Operating Procedures untuk template Instagram feeds dan konten infografis.",
        "Memimpin divisi Media and Creative untuk acara Computer Security dan berpartisipasi dalam workshop MERN Stack.",
        "Mendokumentasi acara onboarding dan membuat konten visual menarik untuk komunitas teknologi.",
      ],
    },
    {
      jobTitle: "Staff Multimedia",
      company: "FASCO UNSRI",
      duration: "Jan 2024 - Des 2024",
      description: [
        "Merancang konten Instagram feed harian dan membuat template desain bulanan.",
        "Mengelola publikasi dan dokumentasi untuk Workshop Debat FASCO dan FASCO Academy 2024.",
        "Berkolaborasi dengan tim untuk mempertahankan konsistensi visual branding di berbagai platform.",
      ],
    },
    {
      jobTitle: "Staff Multimedia",
      company: "HMIF UNSRI",
      duration: "Feb 2023 - Des 2023",
      description: [
        "Membuat template desain Instagram feeds dan bertugas sebagai editor video untuk acara besar.",
        "Memimpin tim publikasi dan dokumentasi untuk Upgrading Staff dan Srifoton 2023.",
        "Memproduksi video trailer promosi untuk acara IF Fest dan Srifoton.",
      ],
    },
    {
      jobTitle: "Staff Multimedia",
      company: "WIFI UNSRI",
      duration: "Mar 2023 - Des 2023",
      description: [
        "Mengelola tugas multimedia harian yang diberikan ketua divisi dan membuat konten visual menarik.",
        "Bertugas sebagai anggota tim publikasi dan dokumentasi untuk PTQ WIFI 2023 dan SQC Nadwah UNSRI 2023.",
        "Memimpin tanggung jawab publikasi dan dokumentasi untuk acara Kajian Rutin LDF WIFI 2023.",
      ],
    },
  ],
};
