import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
 
const MobileMenu = ({ isOpen, onClose }) => {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
 
  if (!isOpen) return null;
 
  return (
    <div className="fixed inset-0" style={{ zIndex: 1200 }}>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close navigation menu"
        className="absolute inset-0 bg-black/25"
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        id="home-nav-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        className="relative h-full flex flex-col bg-white/90 backdrop-blur-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 shrink-0">
          <img
            alt="Bitbandy"
            width="160"
            height="32"
            className="w-auto"
            src="https://bitbandy.com/_next/image?url=%2Fimages%2Fbitbandy.png&w=256&q=75"
            style={{ height: '32px' }}
          />
          <button
            type="button"
            aria-label="Close menu"
            className="w-11 h-11 flex items-center justify-center text-zinc-600 card-press"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mx-5 h-px bg-zinc-200 shrink-0" />

        {/* Navigation links */}
        <nav className="flex-1 px-5 pt-8 flex flex-col">
          <Link
            to="/"
            className="font-heading text-[28px] leading-[1.15] tracking-wide text-left py-2 text-zinc-900"
            style={{ animation: '0.4s ease-out 0ms 1 normal both running nav-item-in' }}
            onClick={onClose}
          >
            HOME
          </Link>
          <Link
            to="/Events"
            className="font-heading text-[28px] leading-[1.15] tracking-wide text-left py-2 text-zinc-900"
            style={{ animation: '0.4s ease-out 60ms 1 normal both running nav-item-in' }}
            onClick={onClose}
          >
            Events
          </Link>
          <Link
            to="/tickets"
            className="font-heading text-[28px] leading-[1.15] tracking-wide text-left py-2 text-zinc-900"
            style={{ animation: '0.4s ease-out 120ms 1 normal both running nav-item-in' }}
            onClick={onClose}
          >
            MY TICKETS
          </Link>
          <Link
            to="/for-organizers"
            className="font-heading text-[28px] leading-[1.15] tracking-wide text-left py-2 whitespace-nowrap"
            style={{ 
              color: '#9139f6', 
              animation: '0.4s ease-out 180ms 1 normal both running nav-item-in' 
            }}
            onClick={onClose}
          >
            HOST AN EVENT
          </Link>
          <Link
            to="/about"
            className="font-heading text-[28px] leading-[1.15] tracking-wide text-left py-2 text-zinc-900"
            style={{ animation: '0.4s ease-out 240ms 1 normal both running nav-item-in' }}
            onClick={onClose}
          >
            ABOUT
          </Link>
          <Link
            to="/how-it-works"
            className="font-heading text-[28px] leading-[1.15] tracking-wide text-left py-2 text-zinc-900"
            style={{ animation: '0.4s ease-out 300ms 1 normal both running nav-item-in' }}
            onClick={onClose}
          >
            HOW IT WORKS
          </Link>
        </nav>

        {/* Auth buttons */}
        <div
          className="px-5 pb-5 shrink-0 space-y-2.5"
          style={{ animation: '0.4s ease-out 380ms 1 normal both running nav-item-in' }}
        >
          <Link
            to="/signup"
            className="block w-full py-3.5 rounded-lg text-white text-[14px] font-normal tracking-[0.03em] text-center card-press"
            style={{ backgroundColor: '#9139f6' }}
            onClick={onClose}
          >
            Create account
          </Link>
          <Link
            to="/login"
            className="block w-full py-3 rounded-lg bg-transparent border-2 border-zinc-900 text-zinc-900 text-[13px] font-normal tracking-[0.02em] text-center card-press hover:text-zinc-800 hover:border-zinc-800 transition-colors"
            onClick={onClose}
          >
            Sign in
          </Link>
        </div>

        {/* Footer with social icons and copyright */}
        <div className="px-5 pb-10 shrink-0">
          <div className="h-px bg-zinc-200 mb-6" />
          <div className="flex items-center gap-5 mb-5">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="text-zinc-600 hover:text-zinc-800 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-zinc-600 hover:text-zinc-800 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-zinc-600 hover:text-zinc-800 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-zinc-600 hover:text-zinc-800 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C7.031 3 3 7.031 3 12c0 1.891.594 3.641 1.609 5.109L3 22l4.969-1.344C9.359 21.172 10.656 21.5 12 21.5c4.969 0 9-4.031 9-9S16.969 3 12 3zm4.281 12.219c-.156.438-.891.844-1.25.891-.328.047-.75.063-1.203-.078-.281-.094-.641-.188-1.094-.375-1.922-.813-3.172-2.672-3.266-2.797-.094-.125-.781-1.078-.781-2.063 0-.984.5-1.453.672-1.656.172-.203.375-.25.5-.25.125 0 .25 0 .359.016.125.016.297-.047.469.344.188.438.641 1.516.703 1.625.063.109.109.234.016.375-.094.141-.141.234-.281.359-.141.125-.297.266-.422.359-.141.109-.047.25.078.391.141.172.625 1.031 1.344 1.672.922.828 1.688 1.078 1.922 1.188.234.109.375.094.516-.063.141-.156.594-.688.75-.922.156-.234.313-.2.547-.122.234.078 1.484.703 1.734.828.25.125.422.188.484.297.063.109.063.641-.094 1.078z"/>
              </svg>
            </a>
          </div>
          <p className="text-[11px] text-zinc-500">© 2026 Bitbandy. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
 
export default MobileMenu;
