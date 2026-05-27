import { useState, useCallback, memo, useEffect, useRef } from "react";

const WHAT_WE_DO = [
  { label: "Digital Product Development", href: "#" },
  { label: "AI, Data & Analytics",        href: "#" },
  { label: "Enterprise Mobile Apps",      href: "#" },
  { label: "Cybersecurity",               href: "#" },
  { label: "Cloud Enablement",            href: "#" },
  { label: "QA & Testing",               href: "#" },
  { label: "Web Development",             href: "#" },
];

const NAV_LINKS = [
  { label: "Who We Are",  href: "#who-we-are" },
  { label: "What We Do",  href: "#what-we-do", dropdown: WHAT_WE_DO },
  { label: "Events",      href: "#events" },
  { label: "Products",    href: "#products" },
  { label: "Careers",     href: "#careers" },
];

/* ── Logo ── */
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
    <span className="text-white font-semibold text-xl tracking-wide">ktova</span>
  </a>
));
Logo.displayName = "Logo";

/* ── Chevron icon ── */
const ChevronDown = memo(({ open }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    className={`ml-1 inline-block transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <polyline
      points="2,4 6,8 10,4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
ChevronDown.displayName = "ChevronDown";

/* ── Desktop dropdown panel ── */
const DesktopDropdown = memo(({ items, open }) => (
  <div
    role="menu"
    aria-hidden={!open}
    className={`
      absolute top-full left-1/2 -translate-x-1/2 mt-3
      w-64 bg-[#111] border border-white/10 rounded-md shadow-2xl
      z-50 overflow-hidden origin-top
      transition-all duration-200
      ${open
        ? "opacity-100 scale-y-100 pointer-events-auto translate-y-0"
        : "opacity-0 scale-y-95 pointer-events-none -translate-y-1"
      }
    `}
  >
    {/* orange top bar */}
    <div className="h-[2px] w-full bg-[#E8830A]" />

    <ul className="py-1.5">
      {items.map(({ label, href }) => (
        <li key={label} role="none">
          <a
            href={href}
            role="menuitem"
            className="
              flex items-center gap-2.5 px-4 py-2.5
              text-sm text-gray-300 hover:text-[#E8830A]
              hover:bg-white/5 transition-colors duration-150
              group
            "
          >
            <span
              className="w-[3px] h-[3px] rounded-full bg-[#E8830A] opacity-0
                         group-hover:opacity-100 transition-opacity duration-150 shrink-0"
              aria-hidden="true"
            />
            {label}
          </a>
        </li>
      ))}
    </ul>
  </div>
));
DesktopDropdown.displayName = "DesktopDropdown";

/* ── Desktop NavLink (with optional dropdown) ── */
const NavLink = memo(({ label, href, dropdown }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timerRef = useRef(null);

  const openMenu  = () => { clearTimeout(timerRef.current); setOpen(true);  };
  const closeMenu = () => { timerRef.current = setTimeout(() => setOpen(false), 120); };

  // Close on outside click / Escape
  useEffect(() => {
    if (!dropdown) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dropdown]);

  if (!dropdown) {
    return (
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
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <button
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
        className="relative flex items-center text-sm text-gray-300 hover:text-white
                   transition-colors duration-200 whitespace-nowrap cursor-pointer
                   after:absolute after:left-0 after:-bottom-1
                   after:h-[1.5px] after:w-0 after:bg-[#E8830A]
                   after:transition-all after:duration-200
                   hover:after:w-full focus:outline-none"
      >
        {label}
      </button>
      <DesktopDropdown items={dropdown} open={open} />
    </div>
  );
});
NavLink.displayName = "NavLink";

/* ── Contact Button ── */
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

/* ── Hamburger icon ── */
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
        <line x1="3" y1="3" x2="19" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="3" x2="3" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </>
    ) : (
      <>
        <line x1="3" y1="5"  x2="19" y2="5"  stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="11" x2="19" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="17" x2="19" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
  </svg>
));
HamburgerIcon.displayName = "HamburgerIcon";

/* ── Backdrop ── */
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

/* ── Mobile accordion item (for "What We Do") ── */
const MobileAccordionLink = memo(({ label, href, dropdown, onClose }) => {
  const [open, setOpen] = useState(false);

  if (!dropdown) {
    return (
      <a
        href={href}
        onClick={onClose}
        className="flex items-center text-gray-300 hover:text-[#E8830A] text-sm font-medium
                   py-3 border-b border-white/5
                   transition-colors duration-200"
      >
        {label}
      </a>
    );
  }

  return (
    <div className="border-b border-white/5">
      {/* accordion trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        className="flex items-center justify-between w-full
                   text-gray-300 hover:text-[#E8830A] text-sm font-medium
                   py-3 transition-colors duration-200 focus:outline-none"
      >
        {label}
        <ChevronDown open={open} />
      </button>

      {/* accordion body */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="pb-2 pl-3 border-l border-[#E8830A]/30 ml-1 space-y-0.5">
          {dropdown.map(({ label: sublabel, href: subhref }) => (
            <li key={sublabel}>
              <a
                href={subhref}
                onClick={onClose}
                className="flex items-center gap-2 py-2 text-sm text-gray-400
                           hover:text-[#E8830A] transition-colors duration-150"
              >
                <span
                  className="w-[3px] h-[3px] rounded-full bg-[#E8830A] shrink-0"
                  aria-hidden="true"
                />
                {sublabel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
MobileAccordionLink.displayName = "MobileAccordionLink";

/* ── Mobile Drawer ── */
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
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="17" y1="3" x2="3"  y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>

    {/* Nav links */}
    <nav className="flex flex-col px-6 py-4 flex-1 overflow-y-auto" aria-label="Mobile navigation">
      {NAV_LINKS.map(({ label, href, dropdown }) => (
        <MobileAccordionLink
          key={href}
          label={label}
          href={href}
          dropdown={dropdown}
          onClose={onClose}
        />
      ))}
    </nav>

    {/* Contact button */}
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

/* ── Main Header ── */
const Header = () => {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu  = useCallback(() => setMenuOpen(false), []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Shadow + scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
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
          w-full bg-[#0d0d0d]
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
              {NAV_LINKS.map(({ label, href, dropdown }) => (
                <NavLink key={href} label={label} href={href} dropdown={dropdown} />
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

        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10">
          <div
            className="h-full bg-[#E8830A] transition-[width] duration-75"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </header>

      {/* ── Mobile Drawer + Backdrop ── */}
      <Backdrop open={menuOpen} onClick={closeMenu} />
      <MobileDrawer open={menuOpen} onClose={closeMenu} />
    </>
  );
};

export default memo(Header);