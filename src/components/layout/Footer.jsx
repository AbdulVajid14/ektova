import { memo, useMemo } from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// ── Static data (defined outside component — never recreated on render) ──

const WHAT_WE_DO = [
  { label: "Digital Product Development", href: "#" },
  { label: "AI, Data & Analytics",        href: "#" },
  { label: "Enterprise Mobile Apps",      href: "#" },
  { label: "Cybersecurity",               href: "#" },
  { label: "Cloud Enablement",            href: "#" },
  { label: "QA & Testing",               href: "#" },
  { label: "Web Development",             href: "#" },
];

const COMPANY = [
  { label: "About Us",   href: "#" },
  { label: "How We Work",href: "#" },
  { label: "Portfolios", href: "#" },
  { label: "Blogs",      href: "#" },
  { label: "Careers",    href: "#" },
  { label: "Industries", href: "#" },
  { label: "Events",     href: "#" },
];

const LEGAL = [
  { label: "Privacy Policy",    href: "#" },
  { label: "Terms & Conditions",href: "#" },
  { label: "Pricing Policy",    href: "#" },
  { label: "Refund Policy",     href: "#" },
];

const SOCIAL = [
  { icon: FaFacebookF,  href: "#", label: "Facebook"  },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn"  },
  { icon: FaInstagram,  href: "#", label: "Instagram" },
  { icon: FaXTwitter,   href: "#", label: "X"         },
];

// ── Sub-components (all memo'd — no re-render unless props change) ──

const Logo = memo(() => (
  <a href="/" aria-label="Ektova Home" className="flex items-center select-none group shrink-0 mb-5">
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

// A single link item — memo prevents re-render when sibling links update
const FooterLink = memo(({ label, href }) => (
  <li>
    <a
      href={href}
      className="text-sm text-gray-400 hover:text-white
                 transition-colors duration-200 leading-relaxed"
    >
      {label}
    </a>
  </li>
));
FooterLink.displayName = "FooterLink";

// Column heading — pure text, never changes
const ColHeading = memo(({ children }) => (
  <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-white mb-5">
    {children}
  </h3>
));
ColHeading.displayName = "ColHeading";

// Link column — memo'd; only re-renders if `links` reference changes (it won't, they're constants)
const LinkColumn = memo(({ heading, links }) => (
  <div>
    <ColHeading>{heading}</ColHeading>
    <ul className="space-y-2.5">
      {links.map(({ label, href }) => (
        <FooterLink key={label} label={label} href={href} />
      ))}
    </ul>
  </div>
));
LinkColumn.displayName = "LinkColumn";

// Social icon button — memo'd; icon component reference is stable (module-level constant)
const SocialButton = memo(({ icon: Icon, href, label }) => (
  <a
    href={href}
    aria-label={label}
    className="flex items-center justify-center w-9 h-9
               border border-white/20 rounded
               text-gray-400 hover:text-white hover:border-white/50
               transition-colors duration-200"
  >
    <Icon size={15} aria-hidden="true" />
  </a>
));
SocialButton.displayName = "SocialButton";

// ── Main Footer ──
const Footer = () => {
  // useMemo is unnecessary here since WHAT_WE_DO / COMPANY / LEGAL are already module-level
  // constants, but kept as a pattern example for dynamic data scenarios.
  // For truly static data, you'd just reference the constants directly.

  return (
    <footer className="w-full bg-[#0d0d0d] border-t border-white/10">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1.5fr_1.5fr_1fr]">

          {/* Brand column */}
          <div>
            <Logo />
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              We build next-gen digital solutions which create value for your
              users and your business. Strategy, innovation, end-to-end design,
              development, and support.
            </p>

            <div className="mt-8 space-y-1">
              <p className="text-xs text-gray-500 leading-relaxed">
                1st Floor, Carnival Infopark Phase, Kakkanad, Kochi – 682 042
              </p>
              <a
                href="tel:+919663157310"
                className="block text-base font-bold text-white hover:text-[#E8830A]
                           transition-colors duration-200 mt-3"
              >
                +91 9663157310
              </a>
              <a
                href="mailto:info@ektova.com"
                className="block text-sm text-[#E8830A] hover:text-orange-400
                           transition-colors duration-200"
              >
                info@ektova.com
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <LinkColumn heading="What We Do" links={WHAT_WE_DO} />
          <LinkColumn heading="Company"    links={COMPANY}    />
          <LinkColumn heading="Legal"      links={LEGAL}      />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 order-2 sm:order-1">
            ©2026 Ektova Technologies Pvt. Ltd. All rights reserved.
          </p>

          {/* Social icons — rendered from stable SOCIAL constant */}
          <div className="flex items-center gap-2 order-1 sm:order-2">
            {SOCIAL.map(({ icon, href, label }) => (
              <SocialButton key={label} icon={icon} href={href} label={label} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);