import { useState, useCallback, memo, useEffect } from "react";

const NAV_LINKS = [
  { label: "Who We Are", href: "#who-we-are" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Events", href: "#events" },
  { label: "Products", href: "#products" },
  { label: "Careers", href: "#careers" },
];

const Logo = memo(() => (
  <a
    href="/"
    aria-label="Ektova Home"
    className="flex items-center select-none group shrink-0"
  >
    <span
      className="relative inline-flex items-center justify-center
                 w-8 h-8 border-2 border-[#E8830A] text-[#E8830A]
                 font-bold text-lg leading-none mr-[2px]
                 transition-colors duration-200
                 group-hover:bg-[#E8830A] group-hover:text-black"
      aria-hidden="true"
    >
      E
    </span>
    <span className="text-white font-semibold text-xl tracking-wide">
      ktova
    </span>
  </a>
));
Logo.displayName = "Logo";

const NavLink = memo(({ label, href }) => (
  <a
    href={href}
    className="relative text-sm text-gray-300 hover:text-white
               transition-colors duration-200 whitespace-nowrap
               after:absolute after:left-0 after:-bottom-1
               after:h-[1.5px] after:w-0 after:bg-[#E8830A]
               after:transition-all after:duration-200
               hover:after:w-full"
  >
    {label}
  </a>
));
NavLink.displayName = "NavLink";

const ContactButton = memo(() => (
  <a
    href="#contact"
    className="shrink-0 px-4 py-1.5 text-sm text-[#E8830A]
               border border-[#E8830A] rounded
               hover:bg-[#E8830A] hover:text-black
               transition-colors duration-200 whitespace-nowrap"
  >
    Contact Us
  </a>
));
ContactButton.displayName = "ContactButton";

const HamburgerIcon = memo(({ open }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    aria-hidden="true"
    className="transition-transform duration-200"
  >
    {open ? (
      <>
        <line
          x1="3"
          y1="3"
          x2="19"
          y2="19"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="19"
          y1="3"
          x2="3"
          y2="19"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ) : (
      <>
        <line
          x1="3"
          y1="5"
          x2="19"
          y2="5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="11"
          x2="19"
          y2="11"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="17"
          x2="19"
          y2="17"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
));
HamburgerIcon.displayName = "HamburgerIcon";

// Backdrop overlay behind the drawer
const Backdrop = memo(({ open, onClick }) => (
  <div
    aria-hidden="true"
    onClick={onClick}
    className={`
      md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40
      transition-opacity duration-300
      ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
    `}
  />
));
Backdrop.displayName = "Backdrop";

// Right-to-left slide drawer for mobile
const MobileDrawer = memo(({ open, onClose }) => (
  <div
    role="dialog"
    aria-modal="true"
    aria-label="Mobile navigation"
    id="mobile-menu"
    className={`
      md:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw]
      bg-[#0d0d0d] border-l border-white/10 z-50
      flex flex-col
      transition-transform duration-300 ease-in-out
      ${open ? "translate-x-0" : "translate-x-full"}
    `}
  >
    {/* Drawer header */}
    <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 shrink-0">
      <Logo />
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="p-1 rounded text-gray-400 hover:text-white
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8830A]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <line
            x1="3"
            y1="3"
            x2="17"
            y2="17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="17"
            y1="3"
            x2="3"
            y2="17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>

    {/* Nav links */}
    <nav className="flex flex-col px-6 py-6 gap-1 flex-1 overflow-y-auto">
      {NAV_LINKS.map(({ label, href }, i) => (
        <a
          key={href}
          href={href}
          onClick={onClose}
          style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
          className={`
            text-gray-300 hover:text-white text-sm font-medium
            py-3 border-b border-white/5 last:border-0
            transition-all duration-200
            hover:pl-1 hover:text-[#E8830A]
          `}
        >
          {label}
        </a>
      ))}
    </nav>

    {/* Contact button at bottom */}
    <div className="px-6 py-6 border-t border-white/10 shrink-0">
      <a
        href="#contact"
        onClick={onClose}
        className="block w-full text-center px-4 py-2.5 text-sm text-[#E8830A]
                   border border-[#E8830A] rounded
                   hover:bg-[#E8830A] hover:text-black
                   transition-colors duration-200"
      >
        Contact Us
      </a>
    </div>
  </div>
));
MobileDrawer.displayName = "MobileDrawer";

// ── Main Header ──
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Add shadow on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 8);
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Sticky Header ── */}
      <header
        className={`
          sticky top-0 left-0 right-0 z-30
          relative w-full bg-[#0d0d0d]
          transition-shadow duration-300
          ${scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.5)]" : ""}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-6">
            {/* Logo */}
            <Logo />

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-8 flex-1 justify-center"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <NavLink key={href} label={label} href={href} />
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="hidden md:block">
                <ContactButton />
              </div>

              {/* Hamburger — mobile only */}
              <button
                className="md:hidden p-1 rounded focus:outline-none
                           focus-visible:ring-2 focus-visible:ring-[#E8830A]"
                onClick={toggleMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                <HamburgerIcon open={menuOpen} />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10">
          <div
            className="h-full bg-[#E8830A]"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </header>

      {/* ── Mobile Drawer + Backdrop (rendered outside header to cover full screen) ── */}
      <Backdrop open={menuOpen} onClick={closeMenu} />
      <MobileDrawer open={menuOpen} onClose={closeMenu} />
    </>
  );
};

export default memo(Header);
