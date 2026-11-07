/* =====================================================================
   syz — SITE CONTENT
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to change text, projects,
   prices, contact info and testimonials.

   Translations:
     Any text value can be either
       • a plain string           → same in both languages
       • { mn: "...", en: "..." } → Mongolian / English

   Highlight:
     Wrap a word in *asterisks* inside a headline to color it green.

   Images:
     Put your files in /assets/projects/ or /assets/img/ and update
     the paths below. Recommended project screenshot size: 1600×1000.
   ===================================================================== */

window.SITE = {
  brand: "syz",
  defaultLang: "mn", // "mn" or "en"

  // ── Contact ────────────────────────────────────────────────────────
  contact: {
    email: "syzbuilds@gmail.com",
    instagram: "syz.builds",            // username without @
    phone: "",                              // leave "" to hide
    telegram: "",                           // leave "" to hide
    // Optional: paste a Formspree (formspree.io) endpoint here to receive
    // form messages by email, e.g. "https://formspree.io/f/abcdwxyz".
    // Leave empty and the form opens the visitor's email app instead.
    formEndpoint: "https://formspree.io/f/mwlljokz",
  },

  // ── Navigation & shared labels ─────────────────────────────────────
  ui: {
    nav: {
      work:     { mn: "Ажлууд",      en: "Work" },
      services: { mn: "Үйлчилгээ",   en: "Services" },
      process:  { mn: "Явц",         en: "Process" },
      about:    { mn: "Миний тухай", en: "About" },
      contact:  { mn: "Холбогдох",   en: "Contact" },
    },
    navCta:     { mn: "Төсөл эхлүүлэх", en: "Start a project" },
    skip:       { mn: "Үндсэн агуулга руу шилжих", en: "Skip to content" },
    menu:       { mn: "Цэс", en: "Menu" },
    liveSite:   { mn: "Сайт үзэх", en: "Live site" },
    startingAt: { mn: "Эхлэх үнэ", en: "Starting from" },
    currency: "₮",
    backToTop:  { mn: "Дээш буцах", en: "Back to top" },
    madeIn:     { mn: "Улаанбаатарт гараар бүтээв.", en: "Hand-built in Ulaanbaatar." },
    rights:     { mn: "Бүх эрх хуулиар хамгаалагдсан.", en: "All rights reserved." },
  },

  // ── SEO (also edit the <head> of index.html for link previews) ─────
  seo: {
    title: {
      mn: "syz — Вэб хөгжүүлэгч · Улаанбаатар",
      en: "syz — Web Developer · Ulaanbaatar",
    },
    description: {
      mn: "Бизнесийн вэбсайт, landing page, онлайн дэлгүүр, вэб апп хийдэг Улаанбаатарын вэб хөгжүүлэгч.",
      en: "Freelance web developer in Ulaanbaatar building business websites, landing pages, online stores and web apps.",
    },
  },

  // ── 1. Hero ────────────────────────────────────────────────────────
  hero: {
    status:   { mn: "Шинэ төсөл авахад бэлэн", en: "Available for projects" },
    greeting: { mn: "сайн уу, би syz", en: "hi, i'm syz" },
    headline: {
      mn: "Таны бизнесийн төлөө *ажилладаг* вэбсайт бүтээнэ.",
      en: "I build websites that *work* for your business.",
    },
    sub: {
      mn: "Улаанбаатарт төвтэй вэб хөгжүүлэгч. Хурдан, цэвэрхэн, гар утсанд төгс харагдах вэбсайтаар зочдыг тань харилцагч болгоно.",
      en: "Web developer based in Ulaanbaatar. Fast, clean, mobile-first websites that turn your visitors into customers.",
    },
    primaryCta:   { mn: "Ажлуудыг үзэх", en: "See my work" },
    secondaryCta: { mn: "Холбогдох", en: "Contact me" },
    // Terminal window in the hero. "cmd" is typed, "out" appears after.
    terminal: [
      { cmd: "whoami", out: "syz" },
      { cmd: "cat role.txt", out: { mn: "Вэб хөгжүүлэгч · Улаанбаатар, MN", en: "Web developer · Ulaanbaatar, MN" } },
      { cmd: "ls services/", out: "landing/  business/  shop/  apps/" },
      { cmd: "./status", out: { mn: "● шинэ төсөлд нээлттэй", en: "● open for new projects" }, accent: true },
    ],
  },

  // ── 2. Selected work ───────────────────────────────────────────────
  work: {
    label: "selected_work",
    title: { mn: "Сонгомол ажлууд", en: "Selected work" },
    intro: {
      mn: "Миний сүүлд хийсэн ажил. Зураг дээр дарж бодит сайтыг нь үзээрэй.",
      en: "My latest project. Click through to see it live.",
    },
  },
  projects: [
    {
      name: "something-strange",
      category: { mn: "Онлайн дэлгүүр", en: "E-commerce" },
      year: "",
      description: {
        mn: "Чихмэл тоглоом, өхөөрдөм бэлгийн онлайн дэлгүүр. Ангиллаар шүүх, дуртай бараа хадгалах, сагстай, гар утсанд тохирсон дулаахан дизайнтай.",
        en: "An online store for plush toys and cute gifts, with category filters, a wishlist, a cart and a warm, mobile-friendly design.",
      },
      tags: ["Next.js", "Vercel"],
      image: "assets/projects/something-strange.jpg",
      alt: { mn: "something-strange онлайн дэлгүүрийн нүүр хуудас", en: "something-strange online store homepage" },
      url: "https://somethingg-strange.vercel.app",
    },
  ],

  // ── 3. Services ────────────────────────────────────────────────────
  servicesSection: {
    label: "services",
    title: { mn: "Танд юу хийж өгөх вэ", en: "What I can build for you" },
    intro: {
      mn: "Үнэ нь төслийн хэмжээнээс хамаарна. Тодорхой үнийн санал авахыг хүсвэл холбогдоорой.",
      en: "Final price depends on scope — get in touch for an exact quote.",
    },
  },
  services: [
    {
      code: "01",
      title: { mn: "Landing page", en: "Landing page" },
      description: {
        mn: "Нэг бүтээгдэхүүн, үйлчилгээ эсвэл аянд зориулсан, борлуулалтад чиглэсэн нэг хуудас сайт.",
        en: "One focused page for a product, service or campaign — built to convert visitors.",
      },
      points: [
        { mn: "Хувийн дизайн", en: "Custom design" },
        { mn: "Холбоо барих форм", en: "Contact / lead form" },
        { mn: "3–5 хоног", en: "3–5 days" },
      ],
      price: 250000,
    },
    {
      code: "02",
      title: { mn: "Бизнесийн вэбсайт", en: "Business website" },
      description: {
        mn: "Компанийн олон хуудастай сайт: үйлчилгээ, бидний тухай, мэдээ, холбоо барих.",
        en: "A multi-page company site: services, about, news and contact — easy for you to update.",
      },
      points: [
        { mn: "5–10 хуудас", en: "5–10 pages" },
        { mn: "Контент удирдах систем", en: "Editable content (CMS)" },
        { mn: "1–2 долоо хоног", en: "1–2 weeks" },
      ],
      price: 500000,
    },
    {
      code: "03",
      title: { mn: "Онлайн дэлгүүр", en: "E-commerce" },
      description: {
        mn: "Бүтээгдэхүүн, сагс, QPay / картын төлбөр, захиалга удирдах самбартай бүрэн дэлгүүр.",
        en: "A complete store with products, cart, QPay / card payments and an order dashboard.",
      },
      points: [
        { mn: "QPay холболт", en: "QPay integration" },
        { mn: "Захиалгын самбар", en: "Order dashboard" },
        { mn: "2–3 долоо хоног", en: "2–3 weeks" },
      ],
      price: 750000,
    },
    {
      code: "04",
      title: { mn: "Дахин дизайн", en: "Redesign" },
      description: {
        mn: "Хуучирсан, удаан сайтыг орчин үеийн, хурдан, гар утсанд тохирсон болгож шинэчилнэ.",
        en: "Turn an outdated, slow site into a modern, fast, mobile-friendly one.",
      },
      points: [
        { mn: "Хурдны сайжруулалт", en: "Speed optimization" },
        { mn: "Mobile-first дизайн", en: "Mobile-first design" },
        { mn: "1 долоо хоног", en: "1 week" },
      ],
      price: 500000,
    },
  ],

  // ── 4. Process ─────────────────────────────────────────────────────
  processSection: {
    label: "process",
    title: { mn: "Хэрхэн ажиллах вэ", en: "How we'll work" },
    intro: {
      mn: "Энгийн, ил тод дөрвөн алхам. Явц бүрт та юу болж байгааг харж байна.",
      en: "Four simple, transparent steps. You see progress at every stage.",
    },
  },
  process: [
    {
      cmd: "talk",
      title: { mn: "Ярилцах", en: "Talk" },
      description: {
        mn: "Таны бизнес, зорилго, хэрэгцээг сонсоод төслийн хүрээ, үнэ, хугацааг тохирно.",
        en: "We discuss your business and goals, then agree on scope, price and timeline.",
      },
      time: { mn: "1 хоног", en: "1 day" },
    },
    {
      cmd: "design",
      title: { mn: "Дизайн", en: "Design" },
      description: {
        mn: "Бүтэц, дизайныг Figma дээр гаргана. Та батлахаас өмнө код бичихгүй.",
        en: "I design the structure and look in Figma. No code until you approve it.",
      },
      time: { mn: "1–2 хоног", en: "1–2 days" },
    },
    {
      cmd: "build",
      title: { mn: "Хөгжүүлэх", en: "Build" },
      description: {
        mn: "Хурдан, SEO-д ээлтэй, бүх төхөөрөмжид тохирох кодоор бүтээнэ. Явцыг шууд линкээр харна.",
        en: "Fast, SEO-friendly, responsive code. You follow progress on a live preview link.",
      },
      time: { mn: "3 хоног – 3 долоо хоног", en: "3 days – 3 weeks" },
    },
    {
      cmd: "launch",
      title: { mn: "Нээлт", en: "Launch" },
      description: {
        mn: "Домэйн, хостинг, аналитик тохируулж нээнэ. Дараа нь 30 хоног үнэгүй дэмжлэг.",
        en: "Domain, hosting and analytics set up, then launch — plus 30 days of free support.",
      },
      time: { mn: "+30 хоног дэмжлэг", en: "+30 days support" },
    },
  ],

  // ── 5. About ───────────────────────────────────────────────────────
  about: {
    label: "about",
    title: { mn: "Миний тухай", en: "About me" },
    photo: "assets/img/portrait.svg", // TODO: replace with your photo (e.g. portrait.jpg, 4:5 ratio)
    photoAlt: { mn: "syz — вэб хөгжүүлэгчийн хөрөг зураг", en: "Portrait of syz, web developer" },
    bio: [
      {
        mn: "Би syz — Улаанбаатарт амьдардаг залуу вэб хөгжүүлэгч. Энэ салбарт хөл тавиад нэг жил болж байгаа ч шинэ зүйл сурах хүсэл, ажилдаа хандах хандлагаараа хэнээс ч дутахгүй гэж итгэдэг.",
        en: "I'm syz — a young web developer from Ulaanbaatar. I'm one year into this craft, and what I may lack in years I make up for in hunger to learn and in how seriously I take the work.",
      },
      {
        mn: "Одоогийн гол зорилго маань бодит төслүүд дээр ажиллаж, туршлага хуримтлуулах. Тиймээс төсөл бүрийг нэрийн хуудас шигээ үзэж, дизайнаас нээлт хүртэл бүх шатыг өөрөө хариуцан хурд, гар утасны туршлага, нарийн ширийн зүйл бүрд анхаарна.",
        en: "Right now my goal is to grow through real projects. That means I treat every site like my own business card, handling everything from design to launch and caring about speed, the mobile experience and every small detail.",
      },
    ],
    stats: [
      { value: "1",    label: { mn: "жилийн туршлага", en: "year of experience" } },
      { value: "2+",   label: { mn: "хийсэн төсөл",    en: "projects shipped" } },
      { value: "100%", label: { mn: "хугацаандаа",     en: "on-time delivery" } },
    ],
    stackTitle: { mn: "Ашигладаг технологи", en: "Tech stack" },
  },
  // Icons come from simpleicons.org — use the slug shown on that site.
  stack: [
    { name: "HTML",       icon: "html5" },
    { name: "CSS",        icon: "css3" },
    { name: "JavaScript", icon: "javascript" },
    { name: "TypeScript", icon: "typescript" },
    { name: "React",      icon: "react" },
    { name: "Next.js",    icon: "nextdotjs" },
    { name: "Tailwind",   icon: "tailwindcss" },
    { name: "Node.js",    icon: "nodedotjs" },
    { name: "Figma",      icon: "figma" },
    { name: "Git",        icon: "git" },
    { name: "Vercel",     icon: "vercel" },
    { name: "PostgreSQL", icon: "postgresql" },
  ],

  // ── 6. Testimonials ────────────────────────────────────────────────
  testimonialsSection: {
    label: "testimonials",
    title: { mn: "Харилцагчдын сэтгэгдэл", en: "Kind words from clients" },
  },
  // Leave this list empty to hide the whole section. Add real client quotes as:
  // { quote: { mn: "...", en: "..." }, name: "Нэр", role: { mn: "...", en: "..." } },
  testimonials: [],

  // ── 7. Contact ─────────────────────────────────────────────────────
  contactSection: {
    label: "contact",
    title: { mn: "Хамтдаа *бүтээе.*", en: "Let's build *something.*" },
    intro: {
      mn: "Санаагаа хуваалцаарай — 24 цагийн дотор хариу өгнө.",
      en: "Tell me about your project — I'll reply within 24 hours.",
    },
    form: {
      name:     { mn: "Нэр", en: "Name" },
      email:    { mn: "И-мэйл", en: "Email" },
      message:  { mn: "Төслийн тухай", en: "About your project" },
      namePh:   { mn: "Таны нэр", en: "Your name" },
      emailPh:  { mn: "you@example.com", en: "you@example.com" },
      messagePh:{ mn: "Ямар сайт хэрэгтэй байна, хэзээ гэх мэт...", en: "What do you need, and by when?" },
      submit:   { mn: "Илгээх", en: "Send message" },
      sending:  { mn: "Илгээж байна...", en: "Sending..." },
      success:  { mn: "Баярлалаа! Удахгүй хариу өгнө.", en: "Thanks! I'll get back to you soon." },
      error:    { mn: "Алдаа гарлаа. И-мэйлээр шууд бичнэ үү.", en: "Something went wrong. Please email me directly." },
      mailtoNote: { mn: "И-мэйл апп нээгдлээ — илгээх товчоо дарна уу.", en: "Your email app opened — just hit send." },
    },
    directTitle: { mn: "Эсвэл шууд", en: "Or reach me directly" },
  },
};
