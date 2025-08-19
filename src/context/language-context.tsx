
"use client";

import React, { useState, createContext, useContext } from 'react';

export interface Translation {
  en: {
    nav_work: string;
    nav_about: string;
    nav_contact: string;
    hero_subtitle: string;
    hero_rotating_1: string;
    hero_rotating_2: string;
    hero_rotating_3: string;
    hero_rotating_4: string;
    hero_tagline: string;
    hero_cta: string;
    projects_title: string;
    projects_subtitle: string;
    projects_view_more: string;
    projects_show_less: string;
    about_title: string;
    about_p1: string;
    about_p2: string;
    about_cta: string;
    contact_title: string;
    contact_subtitle: string;
    contact_form_name: string;
    contact_form_name_placeholder: string;
    contact_form_email: string;
    contact_form_email_placeholder: string;
    contact_form_message: string;
    contact_form_message_placeholder: string;
    contact_form_submit: string;
    skills_title: string;
    skills_subtitle: string;
    footer_text: string;
  };
  id: {
    nav_work: string;
    nav_about: string;
    nav_contact: string;
    hero_subtitle: string;
    hero_rotating_1: string;
    hero_rotating_2: string;
    hero_rotating_3: string;
    hero_rotating_4: string;
    hero_tagline: string;
    hero_cta: string;
    projects_title: string;
    projects_subtitle: string;
    projects_view_more: string;
    projects_show_less: string;
    about_title: string;
    about_p1: string;
    about_p2: string;
    about_cta: string;
    contact_title: string;
    contact_subtitle: string;
    contact_form_name: string;
    contact_form_name_placeholder: string;
    contact_form_email: string;
    contact_form_email_placeholder: string;
    contact_form_message: string;
    contact_form_message_placeholder: string;
    contact_form_submit: string;
    skills_title: string;
    skills_subtitle: string;
    footer_text: string;
  };
}

const translations: Translation = {
  en: {
    nav_work: "Work",
    nav_about: "About",
    nav_contact: "Contact",
    hero_subtitle: "Hi, I'm a Developer & Designer",
    hero_rotating_1: "I",
    hero_rotating_2: "design",
    hero_rotating_3: "build",
    hero_rotating_4: "make",
    hero_tagline: "I specialize in creating modern, intuitive, and beautiful web applications that users love.",
    hero_cta: "See My Work",
    projects_title: "Featured Work",
    projects_subtitle: "Here's a selection of projects I've worked on. Each one was a unique challenge and a learning opportunity.",
    projects_view_more: "View More",
    projects_show_less: "Show Less",
    about_title: "About Me",
    about_p1: "Hello I'm Mohammad Fahrezi,I'm a passionate student at Sriwijaya University with a strong interest in Front-End Development and UI/UX Design. I believe in the power of technology to transform ideas into impactful digital solutions.",
    about_p2: "Currently, I'm actively participating in development programs and continuously exploring various cutting-edge technologies. When I'm not coding, you can find me experimenting with new frameworks, contributing to open-source projects, or diving deep into cloud architecture.",
    about_cta: "Get In Touch",
    contact_title: "Get in Touch",
    contact_subtitle: "Have a project in mind or just want to say hello? I'd love to hear from you.",
    contact_form_name: "Name",
    contact_form_name_placeholder: "Your Name",
    contact_form_email: "Email",
    contact_form_email_placeholder: "your.email@example.com",
    contact_form_message: "Message",
    contact_form_message_placeholder: "Tell me how I can help.",
    contact_form_submit: "Send Message",
    skills_title: "Technologies & Skills",
    skills_subtitle: "A look at the tools and technologies I use to bring ideas to life.",
    footer_text: "Handcrafted by me.",
  },
  id: {
    nav_work: "Karya",
    nav_about: "Tentang",
    nav_contact: "Kontak",
    hero_subtitle: "Hai, saya seorang Developer & Desainer",
    hero_rotating_1: "Saya",
    hero_rotating_2: "merancang",
    hero_rotating_3: "membangun",
    hero_rotating_4: "membuat",
    hero_tagline: "Saya berspesialisasi dalam menciptakan aplikasi web modern, intuitif, dan indah yang disukai pengguna.",
    hero_cta: "Lihat Karya Saya",
    projects_title: "Karya Unggulan",
    projects_subtitle: "Berikut adalah pilihan proyek yang pernah saya kerjakan. Masing-masing merupakan tantangan unik dan kesempatan belajar.",
    projects_view_more: "Lihat Lebih Banyak",
    projects_show_less: "Tampilkan Sedikit",
    about_title: "Tentang Saya",
    about_p1: "Halo nama saya Mohammad Fahrezi Saya mahasiswa Universitas Sriwijaya dengan minat besar pada Front-End Development dan UI/UX Design. Saya percaya pada kekuatan teknologi untuk mengubah ide menjadi solusi digital yang berdampak.",
    about_p2: "Saat ini sedang mengikuti program pengembangan dan terus eksplorasi berbagai teknologi terkini. Ketika tidak sedang coding, Anda dapat menemukan saya bereksperimen dengan framework baru, berkontribusi pada proyek open-source, atau mendalami arsitektur cloud.",
    about_cta: "Hubungi Saya",
    contact_title: "Hubungi Saya",
    contact_subtitle: "Punya proyek atau hanya ingin menyapa? Saya ingin sekali mendengar dari Anda.",
    contact_form_name: "Nama",
    contact_form_name_placeholder: "Nama Anda",
    contact_form_email: "Email",
    contact_form_email_placeholder: "email.anda@contoh.com",
    contact_form_message: "Pesan",
    contact_form_message_placeholder: "Beri tahu saya bagaimana saya dapat membantu.",
    contact_form_submit: "Kirim Pesan",
    skills_title: "Teknologi & Keahlian",
    skills_subtitle: "Lihat alat dan teknologi yang saya gunakan untuk mewujudkan ide menjadi kenyataan.",
    footer_text: "Dibuat dengan tangan oleh saya.",
  },
};

type Language = 'en' | 'id';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation['en'] | Translation['id'];
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
