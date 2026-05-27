import { memo, useState, useCallback, useRef, useEffect } from "react";
import BoxButton from "../components/Button/BoxButton";

// ─── Static data ──────────────────────────────────────────────────────────────

const STATS = [
  {
    icon: "☁️",
    label: "Cloud Uptime",
    value: "99.9%",
    sub: "SLA guaranteed",
    accent: true,
  },
  {
    icon: "🔒",
    label: "Cybersecurity Score",
    value: "AAA",
    sub: "Enterprise-grade protection on all deployments",
    accent: false,
  },
  {
    icon: "🤖",
    label: "AI Integration",
    value: "94.7%",
    sub: "Accuracy rate on ML model deployments",
    accent: true,
  },
  {
    icon: "⚡",
    label: "Performance",
    value: "3.2x",
    sub: "Average speed improvement",
    accent: false,
  },
];

const TICKER_ITEMS = [
  "AI & Machine Learning",
  "Digital Transformation",
  "Cloud Enablement",
  "Enterprise Software",
  "Mobile Applications",
  "Cybersecurity",
  "UI/UX Design",
  "QA & Testing",
  "Internationalisation",
];

const CORE_OFFERINGS = [
  {
    num: "01",
    title: "AI, Data & Analytics",
    desc: "Unleash the power of your data with bespoke AI & analytics solutions aligning with your strategic goals and industry needs.",
  },
  {
    num: "02",
    title: "Digital Product Development",
    desc: "Modern, scalable, and intuitive digital products built with the latest technologies to ensure long-term market competitiveness.",
  },
  {
    num: "03",
    title: "Enterprise Mobile Apps",
    desc: "Custom mobile experiences designed for scale, high performance, and seamless user engagement across all platforms.",
  },
  {
    num: "04",
    title: "Cybersecurity",
    desc: "Advanced security frameworks and continuous monitoring to protect your enterprise digital assets and customer data.",
  },
];

const WHO_STATS = [
  { value: "10+", label: "Decades of Industry Experience" },
  { value: "50+", label: "Passionate Designers & Devs" },
  { value: "200+", label: "Projects Delivered Successfully" },
];

const VALUES = [
  "Agile Development",
  "Global Delivery",
  "Human-Centered Design",
  "Quality First",
];

const WORKS = [
  {
    tag: "ENTERPRISE SYSTEM",
    title: "Workforce Management System",
    color: "from-blue-950 to-[#0a0a0a]",
    accent: "#3b82f6",
  },
  {
    tag: "FINTECH",
    title: "Business Management Software",
    color: "from-violet-950 to-[#0a0a0a]",
    accent: "#8b5cf6",
  },
  {
    tag: "MARKETING",
    title: "Digital Marketing Services",
    color: "from-emerald-950 to-[#0a0a0a]",
    accent: "#10b981",
  },
];

const OTHER_OFFERINGS = [
  {
    num: "01",
    title: "Enterprise Software Development",
    desc: "Unleash the power of your data with bespoke AI & analytics solutions aligning with your strategic goals and industry needs.",
  },
  {
    num: "02",
    title: "Internet of Things",
    desc: "Modern, scalable, and intuitive digital products built with the latest technologies to ensure long-term market competitiveness.",
  },
  {
    num: "03",
    title: "UI/UX Development",
    desc: "Custom mobile experiences designed for scale, high performance, and seamless user engagement across all platforms.",
  },
  {
    num: "04",
    title: "Hire Developers",
    desc: "Advanced security frameworks and continuous monitoring to protect your enterprise digital assets and customer data.",
  },
];

const PRODUCTS = [
  {
    title: "Workforce Pro",
    desc: "Next-gen HR and operations management suite with integrated biometric verification.",
    gradient: "from-orange-950/60 via-[#111] to-[#0d0d0d]",
  },
  {
    title: "Workforce Pro",
    desc: "Next-gen HR and operations management suite with integrated biometric verification.",
    gradient: "from-blue-950/60 via-[#111] to-[#0d0d0d]",
  },
  {
    title: "Workforce Pro",
    desc: "Next-gen HR and operations management suite with integrated biometric verification.",
    gradient: "from-purple-950/60 via-[#111] to-[#0d0d0d]",
  },
];

const TESTIMONIALS = [
  {
    name: "Rahul Menon",
    role: "Operations Manager",
    date: "1yr ago",
    title: "Professional team with excellent execution",
    text: "Ektova helped us streamline our internal operations with a custom business management platform. The entire process was smooth, and the final product exceeded expectations.",
  },
  {
    name: "Sarah Thomas",
    role: "Founder, Company",
    date: "1yr ago",
    title: "Reliable technology partner for our growth",
    text: "From UI/UX to development, the team delivered a premium experience with great attention to detail. Their support and communication were outstanding throughout the project.",
  },
  {
    name: "Naveen Kumar",
    role: "Product Lead",
    date: "1yr ago",
    title: "Modern solutions with enterprise quality",
    text: "The website and digital solutions developed by Ektova significantly improved our online presence and customer engagement. Highly professional approach.",
  },
];

const ARTICLES = [
  {
    month: "MAR 2024",
    tag: "INSIGHTS",
    title: "How to Build a High-Converting E-Commerce Website",
    desc: "In today's competitive digital landscape, building an e-commerce site that converts requires more than just great products.",
  },
  {
    month: "FEB 2024",
    tag: "TECHNOLOGY",
    title: "The Future of AI in Enterprise Software Systems",
    desc: "AI is no longer a buzzword; it's the core of modern enterprise architecture. Discover how to integrate it effectively.",
  },
  {
    month: "JAN 2024",
    tag: "STRATEGY",
    title: "Design Systems: Scaling Your Product Development",
    desc: "Consistency is key to global success. Learn how a robust design system can accelerate your development cycle.",
  },
];

const TICKER_LOOP = [...TICKER_ITEMS, ...TICKER_ITEMS];

// ─── Atoms ────────────────────────────────────────────────────────────────────

const OrangeDot = memo(() => (
  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E8830A] shrink-0" />
));
OrangeDot.displayName = "OrangeDot";

const StarRow = memo(({ size = "sm" }) => (
  <div className="flex gap-0.5">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg
        key={i}
        className={`${size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} fill-[#E8830A]`}
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ))}
  </div>
));
StarRow.displayName = "StarRow";

// ─── Hero ─────────────────────────────────────────────────────────────────────

const StatCard = memo(({ icon, label, value, sub, accent }) => (
  <div className="bg-white/[0.03] border border-white/[0.09] rounded-2xl p-5 backdrop-blur-sm transition-colors duration-200">
    <div className="w-8 h-8 bg-white/[0.06] border border-white/10 rounded-lg flex items-center justify-center text-sm mb-3.5">
      {icon}
    </div>
    <p className="text-[9px] text-gray-500 tracking-[0.18em] uppercase mb-1.5 leading-none">
      {label}
    </p>
    <p className="text-[30px] font-extrabold text-white leading-none mb-1.5 tracking-tight">
      {value}
    </p>
    {accent && <div className="w-9 h-0.5 bg-[#E8830A] rounded-sm mb-2" />}
    <p
      className={`text-[11px] text-gray-400 leading-relaxed ${accent ? "" : "mt-2"}`}
    >
      {sub}
    </p>
  </div>
));
StatCard.displayName = "StatCard";

// const HeroSection = memo(() => (
//   <section
//     aria-label="Hero"
//     className="relative min-h-screen bg-[#0a0a0a] flex items-center overflow-hidden font-sans"
//   >
//     {/* Dot-grid background */}
//     <div
//       className="absolute inset-0 opacity-[0.025] pointer-events-none"
//       style={{
//         backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
//         backgroundSize: "36px 36px",
//       }}
//     />

//     {/* Bottom-left orange glow */}
//     <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#E8830A]/[0.06] blur-[80px] pointer-events-none" />

//     {/* Content wrapper */}
//     <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-18 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
//       {/* LEFT COLUMN */}
//       <div>
//         <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white mb-6">
//           Future Begins
//           <br />
//           <span className="text-[#E8830A]">Today.</span>
//         </h1>

//         <p className="text-gray-400 text-[1.05rem] leading-[1.7] max-w-[420px] mb-10">
//           Venturing into new territories with cutting-edge technologies. We
//           build next-gen digital solutions that create lasting value for your
//           business.
//         </p>

//         <div className="flex flex-wrap gap-4">
//           <BoxButton href="#contact" variant="primary">
//             Get In Touch →
//           </BoxButton>
//           <BoxButton href="#services" variant="secondary">
//             Explore Services
//           </BoxButton>
//         </div>
//       </div>

//       {/* Mobile / tablet: simple 2×2 grid (hidden on lg+) */}
//       <div className="grid grid-cols-2 gap-3 lg:hidden mt-4">
//         {STATS.map((stat) => (
//           <StatCard key={stat.label} {...stat} />
//         ))}
//       </div>

//       {/* Desktop: original floating layout (hidden below lg) */}
//       <div className="relative h-[520px] hidden lg:block">
//         {/* SVG arc */}
//         <svg
//           className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
//           viewBox="0 0 500 520"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M 310 30 C 310 200, 80 200, 80 420"
//             fill="none"
//             stroke="rgba(232,131,10,0.35)"
//             strokeWidth="1"
//           />
//           <circle cx="310" cy="30" r="5" fill="#E8830A" />
//         </svg>

//         {/* Cloud Uptime — top-left */}
//         <div className="absolute top-[60px] left-5 w-[210px]">
//           <StatCard {...STATS[0]} />
//         </div>

//         {/* Cybersecurity — top-right */}
//         <div className="absolute top-0 right-0 w-[210px]">
//           <StatCard {...STATS[1]} />
//         </div>

//         {/* AI Integration — bottom-left */}
//         <div className="absolute top-[260px] left-5 w-[210px]">
//           <StatCard {...STATS[2]} />
//         </div>

//         {/* Performance — bottom-right */}
//         <div className="absolute top-[310px] right-0 w-[210px]">
//           <StatCard {...STATS[3]} />
//         </div>
//       </div>
//     </div>
//   </section>
// ));
const HeroSection = memo(() => (
  <section
    aria-label="Hero"
    className="relative bg-[#0a0a0a] overflow-hidden font-sans"
  >
    {/* Dot-grid background */}
    <div
      className="absolute inset-0 opacity-[0.025] pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }}
    />

    {/* Bottom-left orange glow */}
    <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#E8830A]/[0.06] blur-[80px] pointer-events-none" />

    {/* Content wrapper */}
    <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 lg:pt-8 lg:pb-14 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* LEFT COLUMN */}
      <div>
        <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white mb-6">
          {"Future Begins".split("").map((char, i) => (
            <span
              key={i}
              className="fall-char"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
          <br />
          <span className="text-[#E8830A]">
            {"Today.".split("").map((char, i) => (
              <span
                key={i}
                className="fall-char"
                style={{
                  animationDelay: `${("Future Begins".length + i) * 80}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        <p className="text-gray-400 text-[1.05rem] leading-[1.7] max-w-[420px] mb-10">
          Venturing into new territories with cutting-edge technologies. We
          build next-gen digital solutions that create lasting value for your
          business.
        </p>

        <div className="flex flex-wrap gap-4">
          <BoxButton href="#contact" variant="primary">
            Get In Touch →
          </BoxButton>
          <BoxButton href="#services" variant="secondary">
            Explore Services
          </BoxButton>
        </div>
      </div>

      {/* Mobile / tablet: simple 2×2 grid (hidden on lg+) */}
      <div className="grid grid-cols-2 gap-3 lg:hidden mt-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Desktop: original floating layout (hidden below lg) */}
      <div className="relative h-[520px] hidden lg:block">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 500 520"
          preserveAspectRatio="none"
        >
          {/* Outer orbit circle */}
          <circle
            cx="250"
            cy="260"
            r="175"
            fill="none"
            stroke="rgba(232,131,10,0.35)"
            strokeWidth="1"
          />

          {/* Inner orbit circle */}
          <circle
            cx="250"
            cy="260"
            r="110"
            fill="none"
            stroke="rgba(232,131,10,0.18)"
            strokeWidth="1"
          />

          {/* Motion path — outer */}
          <path
            id="orbitPath"
            d="M 425,260 A 175,175 0 1 1 424.9999,259.9"
            fill="none"
            stroke="none"
          />

          {/* Motion path — inner */}
          <path
            id="orbitPathInner"
            d="M 360,260 A 110,110 0 1 1 359.9999,259.9"
            fill="none"
            stroke="none"
          />

          {/* Dot on outer circle */}
          <circle r="5" fill="#E8830A">
            <animateMotion dur="6s" repeatCount="indefinite">
              <mpath href="#orbitPath" />
            </animateMotion>
          </circle>

          {/* Dot on inner circle */}
          <circle r="4" fill="#E8830A" opacity="0.6">
            <animateMotion dur="9s" repeatCount="indefinite">
              <mpath href="#orbitPathInner" />
            </animateMotion>
          </circle>
        </svg>

        {/* Cloud Uptime — top-left */}
        <div className="absolute top-[60px] left-5 w-[210px]">
          <StatCard {...STATS[0]} />
        </div>
        {/* Cybersecurity — top-right */}
        <div className="absolute top-0 right-0 w-[210px]">
          <StatCard {...STATS[1]} />
        </div>
        {/* AI Integration — bottom-left */}
        <div className="absolute top-[260px] left-5 w-[210px]">
          <StatCard {...STATS[2]} />
        </div>
        {/* Performance — bottom-right */}
        <div className="absolute top-[310px] right-0 w-[210px]">
          <StatCard {...STATS[3]} />
        </div>
      </div>
    </div>
  </section>
));
HeroSection.displayName = "HeroSection";

// ─── Ticker ───────────────────────────────────────────────────────────────────

const TickerSection = memo(() => (
  <div className="border-y border-white/[0.07] bg-[#0a0a0a] py-4 overflow-hidden select-none">
    <div className="ticker-track">
      {TICKER_LOOP.map((item, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-3 text-sm text-gray-400 shrink-0 px-6"
        >
          <OrangeDot />
          {item}
        </span>
      ))}
    </div>
  </div>
));
TickerSection.displayName = "TickerSection";

// ─── Core Offerings ───────────────────────────────────────────────────────────

const OfferingRow = memo(({ num, title, desc, active }) => (
  <div
    className={`
      py-7 border-b border-white/[0.08]
      pl-4 border-l-2
      transition-all duration-300 ease-in-out
      ${
        active
          ? "border-l-[#E8830A] opacity-100"
          : "border-l-transparent opacity-60 hover:opacity-80"
      }
    `}
  >
    <div className="flex items-start gap-5">
      <span className="text-[#E8830A] text-sm font-mono font-bold shrink-0 mt-0.5">
        {num}
      </span>
      <div>
        <h3
          className={`font-semibold text-base mb-2 transition-colors duration-300 ${
            active ? "text-[#E8830A]" : "text-white"
          }`}
        >
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  </div>
));
OfferingRow.displayName = "OfferingRow";

const CoreOfferingsSection = memo(() => {
  const [active, setActive] = useState(0);
  const rowRefs = useRef([]);
  const handleHover = useCallback((i) => setActive(i), []);

  useEffect(() => {
    const observers = rowRefs.current.map((ref, i) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { threshold: 0.6 },
      );
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <section
      id="services"
      className="bg-[#0a0a0a] py-16 lg:py-10"
      aria-label="Core Offerings"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        <div className="lg:sticky lg:top-28">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Core
            <br />
            Offerings
          </h2>
          <div className="mt-8 h-0.5 w-12 bg-[#E8830A]" />
        </div>

        <div>
          {CORE_OFFERINGS.map((item, i) => (
            <div
              key={item.num}
              ref={(el) => (rowRefs.current[i] = el)}
              onMouseEnter={() => handleHover(i)}
            >
              <OfferingRow {...item} active={i === active} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
CoreOfferingsSection.displayName = "CoreOfferingsSection";

// ─── Who We Are ───────────────────────────────────────────────────────────────

const WhoWeAreSection = memo(() => {
  const [activeValue, setActiveValue] = useState("Human-Centered Design");

  return (
    <section
      id="about"
      className="bg-white py-10 lg:py-18 border-t border-black/[0.06]"
      aria-label="Who We Are"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* LEFT: Stacked stat cards with giant ghost numbers behind */}
        <div className="relative overflow-hidden">
          {/* Giant ghost outline number — hidden on mobile to prevent overflow */}
          <div
            className="absolute -top-10 -left-6 text-[220px] font-extrabold leading-none select-none pointer-events-none hidden lg:block"
            style={{
              color: "transparent",
              WebkitTextStroke: "2px #E8830A",
              opacity: 0.15,
              zIndex: 0,
            }}
          >
            10
          </div>

          {/* Stat cards stacked */}
          <div className="relative z-10 flex flex-col gap-0">
            {WHO_STATS.map((s, i) => (
              <div
                key={s.value}
                className="bg-[#111] border border-white/[0.07] px-6 sm:px-8 py-7 flex items-center gap-6"
                style={{ marginTop: i === 0 ? "60px" : 0 }}
              >
                <p className="text-[#E8830A] text-3xl sm:text-4xl font-extrabold leading-none w-24 sm:w-28 shrink-0">
                  {s.value}
                </p>
                <p className="text-gray-300 text-sm leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Content */}
        <div>
          {/* "WHO WE ARE" label */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-0.5 bg-[#E8830A]" />
            <p className="text-[#E8830A] text-[11px] font-bold tracking-[0.22em] uppercase">
              Who We Are
            </p>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-black mb-6">
            Built on <span className="text-[#E8830A]">Trust,</span>
            <br />
            Driven by Results
          </h2>

          <p className="text-gray-500 leading-relaxed mb-8 text-base max-w-lg">
            We believe in doing the right thing with a human-centered,
            quality-first design and development strategy. Our experienced agile
            development team builds future-ready digital products and services
            that make a positive change.
          </p>

          {/* Value pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {VALUES.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setActiveValue(v)}
                className={`px-4 py-2 rounded text-sm font-medium border transition-all duration-200 ${
                  activeValue === v
                    ? "border-[#E8830A] text-[#E8830A] bg-[#E8830A]/5"
                    : "border-gray-300 text-gray-600 hover:border-[#E8830A]/50 hover:text-[#E8830A]"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <BoxButton href="#about" variant="primary">
            Learn About Us →
          </BoxButton>
        </div>
      </div>
    </section>
  );
});
WhoWeAreSection.displayName = "WhoWeAreSection";

// ─── Our Work ─────────────────────────────────────────────────────────────────

const WorkCard = memo(({ tag, title, color, accent }) => (
  <article className="group relative overflow-hidden rounded-xl bg-[#0d0d0d] border border-white/[0.08] hover:border-white/20 transition-all duration-300 cursor-pointer">
    <div className={`h-56 bg-gradient-to-b ${color} relative overflow-hidden`}>
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full space-y-2.5">
          <div className="flex gap-2 items-center mb-4">
            <div
              className="w-2 h-2 rounded-full opacity-70"
              style={{ background: accent }}
            />
            <div className="h-1.5 rounded-full bg-white/20 flex-1" />
          </div>
          <div className="h-1.5 rounded bg-white/20 w-full" />
          <div className="h-1.5 rounded bg-white/10 w-4/5" />
          <div className="h-1.5 rounded bg-white/10 w-3/5" />
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-14 rounded bg-white/[0.04] border"
                style={{ borderColor: `${accent}30` }}
              />
            ))}
          </div>
          <div className="h-1.5 rounded bg-white/10 w-2/3 mt-1" />
        </div>
      </div>
      <div
        className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
        style={{ background: accent }}
      />
    </div>

    <div className="p-6">
      <span className="text-[10px] font-bold tracking-[0.18em] text-[#E8830A] uppercase">
        {tag}
      </span>
      <h3 className="text-white font-bold text-xl mt-2 mb-4 leading-snug group-hover:text-[#E8830A] transition-colors duration-200">
        {title}
      </h3>
      <a
        href="#"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#E8830A] transition-colors duration-200 group-hover:gap-2.5"
      >
        View Case Study <span aria-hidden="true">→</span>
      </a>
    </div>
  </article>
));
WorkCard.displayName = "WorkCard";

const OurWorkSection = memo(() => (
  <section
    id="work"
    className="bg-[#0a0a0a] py-10 lg:py-18 border-t border-white/[0.05]"
    aria-label="Our Work"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-[#E8830A] text-[10px] font-bold tracking-[0.25em] uppercase mb-3">
        Success Stories
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10 lg:mb-14">
        Our Work
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {WORKS.map((w) => (
          <WorkCard key={w.title} {...w} />
        ))}
      </div>
    </div>
  </section>
));
OurWorkSection.displayName = "OurWorkSection";

// ─── Other Offerings ──────────────────────────────────────────────────────────

const OtherOfferingsSection = memo(() => {
  const [active, setActive] = useState(0);
  const handleHover = useCallback((i) => setActive(i), []);

  return (
    <section
      className="bg-white py-16 lg:py-20 border-t border-black/[0.06]"
      aria-label="Other Offerings"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        {/* LEFT: Giant gradient heading */}
        <div className="lg:sticky lg:top-28">
          <h2 className="text-black text-[clamp(2.5rem,7vw,6rem)] font-black leading-[1] tracking-[-0.03em]">
            Other
            <br />
            Offerings
          </h2>
        </div>

        {/* RIGHT: Offering rows */}
        <div>
          {OTHER_OFFERINGS.map((item, i) => (
            <div key={item.num} onMouseEnter={() => handleHover(i)}>
              <div
                className={`
                  py-7 border-b border-black/[0.08]
                  pl-4 border-l-2
                  transition-all duration-300 ease-in-out
                  ${i === 0 ? "border-t border-t-black/[0.08]" : ""}
                  ${
                    i === active
                      ? "border-l-[#E8830A] opacity-100"
                      : "border-l-transparent opacity-50 hover:opacity-75"
                  }
                `}
              >
                <div className="flex items-start gap-6">
                  <span
                    className={`text-sm font-mono font-semibold shrink-0 mt-1 transition-colors duration-300 ${
                      i === active ? "text-[#E8830A]" : "text-gray-300"
                    }`}
                  >
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-normal text-[1.35rem] text-gray-900 leading-snug mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
OtherOfferingsSection.displayName = "OtherOfferingsSection";

// ─── Our Products ─────────────────────────────────────────────────────────────

const ProductCard = memo(({ title, desc, gradient }) => (
  <article className="group relative overflow-hidden rounded-xl bg-[#0d0d0d] border border-white/[0.08] hover:border-[#E8830A]/30 transition-all duration-300 cursor-pointer">
    <div
      className={`h-52 bg-gradient-to-br ${gradient} relative overflow-hidden`}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border border-[#E8830A]/20 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-[#E8830A]/30 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-[#E8830A]/40" />
            </div>
          </div>
          <div className="absolute -inset-6 rounded-full border border-dashed border-[#E8830A]/10 group-hover:border-[#E8830A]/20 transition-colors duration-500" />
        </div>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-5">{desc}</p>
      <button
        type="button"
        className="text-[11px] font-bold tracking-[0.15em] text-white border border-white/15 px-5 py-2 rounded-md hover:border-[#E8830A] hover:text-[#E8830A] transition-all duration-200 uppercase"
      >
        Discover Product
      </button>
    </div>
  </article>
));
ProductCard.displayName = "ProductCard";

const OurProductsSection = memo(() => (
  <section
    id="products"
    className="bg-[#0a0a0a] py-10 lg:py-18 border-t border-white/[0.05]"
    aria-label="Our Products"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Our Products
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
          Our products are designed to deliver measurable value, efficiency, and
          growth for modern businesses.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {PRODUCTS.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
      <div className="text-center mt-12">
        <BoxButton href="#products" variant="primary">
          View All Products <span aria-hidden="true">→</span>
        </BoxButton>
      </div>
    </div>
  </section>
));
OurProductsSection.displayName = "OurProductsSection";

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TestimonialCard = memo(({ name, role, date, title, text }) => (
  <article className="bg-[#0d0d0d] border border-white/[0.08] rounded-xl p-6 hover:border-white/[0.16] transition-colors duration-300">
    <div className="flex items-center justify-between mb-1">
      <StarRow size="sm" />
      <span className="text-[11px] text-gray-500">{date}</span>
    </div>
    <h4 className="text-white font-semibold text-sm mt-4 mb-3">{title}</h4>
    <p className="text-gray-400 text-sm leading-relaxed mb-6">{text}</p>
    <div className="flex items-center gap-3 border-t border-white/[0.07] pt-4">
      <div className="w-9 h-9 rounded-full bg-[#E8830A]/15 border border-[#E8830A]/25 flex items-center justify-center shrink-0">
        <span className="text-[#E8830A] text-xs font-bold">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
      </div>
      <div>
        <p className="text-white text-sm font-semibold leading-none">{name}</p>
        <p className="text-gray-500 text-xs mt-1">{role}</p>
      </div>
    </div>
  </article>
));
TestimonialCard.displayName = "TestimonialCard";

const TestimonialsSection = memo(() => (
  <section
    className="bg-white py-10 lg:py-18 border-t border-white/[0.05]"
    aria-label="Testimonials"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 lg:mb-14">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3">
          Stories from Businesses We Empower
        </h2>
        <p className="text-gray-700 max-w-xl mx-auto text-sm leading-relaxed mb-5">
          Real experiences from clients who trusted Ektova to build scalable
          digital solutions and modern enterprise systems.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <StarRow size="md" />
          <span className="text-black font-bold">4.9</span>
          <span className="text-gray-700 text-sm">
            Trusted by 100+ businesses worldwide
          </span>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.name} {...t} />
        ))}
      </div>
    </div>
  </section>
));
TestimonialsSection.displayName = "TestimonialsSection";

// ─── Blog ─────────────────────────────────────────────────────────────────────

const ArticleCard = memo(({ month, tag, title, desc }) => (
  <article className="group border-t border-white/[0.08] pt-7 hover:border-[#E8830A]/40 transition-colors duration-300 cursor-pointer">
    <div className="flex items-center gap-3 mb-5">
      <span className="text-[10px] text-gray-500 tracking-wide">{month}</span>
      <span className="text-[10px] font-bold text-[#E8830A] uppercase tracking-[0.15em] bg-[#E8830A]/10 px-2.5 py-1 rounded-full">
        {tag}
      </span>
    </div>
    <h3 className="text-white font-bold text-xl leading-snug mb-3 group-hover:text-[#E8830A] transition-colors duration-200">
      {title}
    </h3>
    <p className="text-gray-400 text-sm leading-relaxed mb-6">{desc}</p>
    <a
      href="#"
      className="inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-[#E8830A] transition-colors duration-200 group-hover:gap-2.5"
    >
      Read Article <span aria-hidden="true">→</span>
    </a>
  </article>
));
ArticleCard.displayName = "ArticleCard";

const BlogSection = memo(() => (
  <section
    id="blog"
    className="bg-[#0d0d0d] py-10 lg:py-18 border-t border-white/[0.05]"
    aria-label="Latest Articles"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-0 mb-10 lg:mb-14">
        <div>
          <p className="text-[#E8830A] text-[10px] font-bold tracking-[0.25em] uppercase mb-3">
            Latest Articles
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Sharing <span className="text-[#E8830A]">Ideas</span>
          </h2>
        </div>
        <a
          href="#blog"
          className="text-sm text-gray-400 hover:text-white transition-colors duration-200 shrink-0"
        >
          All Articles →
        </a>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
        {ARTICLES.map((a) => (
          <ArticleCard key={a.title} {...a} />
        ))}
      </div>
    </div>
  </section>
));
BlogSection.displayName = "BlogSection";

// ─── CTA ──────────────────────────────────────────────────────────────────────

const CTASection = memo(() => (
  <section
    id="contact"
    className="relative bg-[#0a0a0a] py-10 lg:py-18 overflow-hidden border-t border-white/[0.05]"
    aria-label="Start a Project"
  >
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[700px] h-[400px] rounded-full bg-[#E8830A]/[0.05] blur-3xl" />
    </div>
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <p className="text-[#E8830A] text-[10px] font-bold tracking-[0.28em] uppercase mb-5">
        Start a Project
      </p>
      <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
        Ready to Build
        <br />
        Something <span className="text-[#E8830A]">Great?</span>
      </h2>
      <p className="text-gray-400 max-w-xl mx-auto leading-relaxed mb-10 lg:mb-12 text-base lg:text-lg">
        Let's talk about your next digital product. Our team is ready to help
        you innovate, transform, and lead.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-5">
        <BoxButton
          href="#about"
          variant="primary"
          className="inline-flex items-center gap-2 bg-[#E8830A] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#d4740a] transition-colors duration-200 text-sm"
        >
          Get In Touch <span aria-hidden="true">→</span>
        </BoxButton>
        <a
          href="tel:+919663157310"
          className="text-white font-semibold text-sm hover:text-[#E8830A] transition-colors duration-200"
        >
          +91 96631 57310
        </a>
      </div>
    </div>
  </section>
));
CTASection.displayName = "CTASection";

// ─── Global styles (ticker animation only) ───────────────────────────────────

const GlobalStyles = memo(() => (
  <style>{`
    @keyframes ticker {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    .ticker-track {
      display: inline-flex;
      width: max-content;
      animation: ticker 35s linear infinite;
      will-change: transform;
    }
    .ticker-track:hover { animation-play-state: paused; }
  `}</style>
));
GlobalStyles.displayName = "GlobalStyles";

// ─── Page ─────────────────────────────────────────────────────────────────────

const HomePage = () => (
  <>
    <GlobalStyles />
    <main className="bg-[#0a0a0a] text-white overflow-x-hidden">
      <HeroSection />
      <TickerSection />
      <CoreOfferingsSection />
      <WhoWeAreSection />
      <OurWorkSection />
      <OtherOfferingsSection />
      <OurProductsSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
    </main>
  </>
);

export default memo(HomePage);
