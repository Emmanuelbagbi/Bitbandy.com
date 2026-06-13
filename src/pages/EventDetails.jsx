import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5 21 21" strokeLinecap="round" /></svg>;
const MenuIcon = () => <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><line x1="0" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /><line x1="4" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /><line x1="8" y1="13" x2="18" y2="13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>;
const HelpIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none" /></svg>;

// Mock event data (replace with real data from your API/props)
const eventData = {
  id: 'cmqazk8gl0001js04df6irrm1',
  title: 'Vybz',
  category: 'corporate',
  organizer: {
    name: 'Jacob Salem',
    avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Jacob%20Salem',
    slug: 'cmqarjccw0002l7055mcgb49j',
  },
  date: 'Wed, Jun 17',
  time: '5:00 PM',
  venue: 'Julirose Hotel & Suites',
  venueAddress: 'Julirose Hotel & Suites, Port Harcourt',
  description: 'a good time to be happy',
  priceMin: 5000,
  priceMax: 300000,
  ticketsLeft: 1500,
  coverImage: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmqarjccw0002l7055mcgb49j/drafts/7c8925c1-a542-44c3-80d2-af6b445a9cf9.png',
  tags: ['#corporate', '#Port Harcourt', '#twintix'],
  goingCount: 1,
  viewCount: 6000,
  mapEmbedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=3.4099,6.4161,3.4339,6.440099999999999&layer=mapnik&marker=6.4281,3.4219',
};

// Mock related events
const relatedEvents = [
  {
    id: 'cmqb5c8os0001i8047mgm4cyr',
    title: 'Rev Battle 1.0',
    date: 'Sun, Jun 14',
    price: 5000,
    isHot: true,
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmqarjccw0002l7055mcgb49j/drafts/6489fae1-ec46-4010-9ccf-bb396922929f.jpg',
  },
  {
    id: 'cmqb8gw520001la04azxnfyi5',
    title: 'ByteTech Summit',
    date: 'Thu, Jun 25',
    price: 0,
    isHot: false,
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmqarjccw0002l7055mcgb49j/drafts/7682124e-a1b5-42a6-b739-7b30e6617867.png',
  },
  {
    id: 'cmpbxnqt20002ujdkq2xqqbix',
    title: 'Wiz Summer Fiesta 2026',
    date: 'Mon, Jun 29',
    price: 45000,
    isHot: true,
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmox7p0bh0000ujusmpkcbp53/cmpbxnqt20002ujdkq2xqqbix/2b4f5347-6c0e-4493-a1b6-1505c036373c.jpg',
  },
  {
    id: 'cmqb8os6v0001js04ksx6fcsq',
    title: 'Bole Outreach',
    date: 'Sat, Jul 4',
    price: 7000,
    isHot: true,
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmqarjccw0002l7055mcgb49j/drafts/d3f6ef18-ef8c-448a-91da-97df1ecf54aa.jpg',
  },
];

const EventDetailPage = () => {
  const [expanded, setExpanded] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleShare = () => {
    navigator.share?.({ title: eventData.title, url: window.location.href })
      .catch(() => setShowShareTooltip(true));
    setTimeout(() => setShowShareTooltip(false), 2000);
  };

  return (
    <div className="min-h-screen bg-vibe-page">
      {/* Header */}
      <header className="container mx-auto px-5 lg:px-8 pt-4 pb-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="shrink-0">
            <img alt="Bitbandy" className="h-10" src="https://bitbandy.com/_next/image?url=%2Fimages%2Fbitbandy.png&w=256&q=75" />
          </Link>

          <nav className="hidden lg:flex items-center gap-7 shrink-0">
            <Link to="/" className="text-[14px] font-normal text-zinc-400 hover:text-zinc-700">Home</Link>
            <Link to="/discover" className="text-[14px] font-normal text-zinc-400 hover:text-zinc-700">Discover</Link>
            <Link to="/for-organizers" className="text-[14px] font-normal text-zinc-400 hover:text-zinc-700">For Organizers</Link>
          </nav>

          <form className="hidden lg:flex flex-1 max-w-[380px] items-center gap-2.5 h-10 rounded-lg px-3 bg-zinc-100 ml-8">
            <button type="button" aria-label="Search" className="shrink-0 text-zinc-400">
              <SearchIcon />
            </button>
            <input
              type="search"
              placeholder="Search events, artists, venues…"
              className="flex-1 bg-transparent text-[13px] text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
            />
          </form>

          <div className="flex items-center gap-2 shrink-0">
            <button className="hidden lg:flex items-center h-9 px-3 rounded-lg text-[13px] font-normal text-zinc-600 hover:bg-zinc-100 transition-colors">
              <HelpIcon />
            </button>
            <Link to="/login" className="hidden lg:flex items-center h-9 px-4 rounded-lg text-[13px] font-normal text-zinc-600 hover:bg-zinc-100 transition-colors">Log in</Link>
            <Link to="/signup" className="hidden lg:flex items-center h-9 px-4 rounded-lg text-[13px] font-normal bg-brand-accent text-white hover:bg-brand-accent-hover transition-colors">Sign up</Link>
            <button
              type="button"
              aria-label="Open menu"
              className="lg:hidden relative z-70 w-11 h-11 flex items-center justify-center ml-1 text-zinc-600"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-5 lg:px-8 py-8">
        <div className="flex gap-10 items-start flex-col lg:flex-row">
          {/* Left column: main content */}

      <div className="flex-1 min-w-0 w-full">
        {/* Hero image with overlay */}
        <div className="rounded-2xl overflow-hidden mb-6">
          <div className="relative h-[300px] lg:h-[480px] bg-zinc-900 overflow-hidden">
            <img
              alt={eventData.title}
              className="object-cover object-center w-full h-full"
              src={eventData.coverImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30"></div>

            {/* Back button (top left) */}
            <div className="absolute top-0 inset-x-0 pt-12 px-4 flex items-center z-10">
              <button
                className="size-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center card-press"
                aria-label="Go back"
                onClick={() => window.history.back()}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Bottom badges */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-amber-500 text-white text-[11px] font-normal px-2.5 py-1 rounded-full">
                <span className="size-1.5 rounded-full bg-white animate-pulse"></span>
                Only {eventData.ticketsLeft} tickets left
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-normal uppercase tracking-widest px-2 py-0.5 rounded bg-blue-500/80 text-white">
                  {eventData.category}
                </span>
                <span className="bg-brand-accent text-zinc-900 text-[9px] font-normal px-1.5 py-0.5 rounded">
                  ✓ VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Event info card */}
        <div className="bg-vibe-card rounded-2xl overflow-hidden">
          {/* Header & title */}
          <div className="px-5 pt-5 pb-4">
            <h1 className="font-heading font-normal text-[26px] text-zinc-900 leading-[1.1] mb-4">
              {eventData.title}
            </h1>
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-1.5 bg-vibe-elevated rounded-full px-3 py-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-brand-accent">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-[12px] font-normal text-zinc-700">
                  {eventData.date}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-vibe-elevated rounded-full px-3 py-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-zinc-400">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[12px] font-normal text-zinc-700">
                  {eventData.time}
                </span>
              </div>
            </div>

            {/* Organizer row */}
            <div className="flex items-center justify-between mb-5">
              <a className="flex items-center gap-2.5 group" href={`/organizers/${eventData.organizer.slug}`}>
                <div className="size-10 rounded-full overflow-hidden shrink-0">
                  <img alt={eventData.organizer.name} className="w-full h-full object-cover" src={eventData.organizer.avatar} />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wide">Organised by</p>
                  <p className="text-[13px] font-normal text-zinc-900 group-hover:text-brand-accent transition-colors">
                    {eventData.organizer.name}
                  </p>
                </div>
              </a>
              <a
                className="text-[12px] font-normal text-brand-accent border border-brand-accent/50 px-3.5 py-1.5 rounded-full card-press shrink-0"
                href={`/organizers/${eventData.organizer.slug}`}
              >
                View profile <ArrowRightIcon />
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 pt-3 border-t border-vibe-border">
              <div className="flex -space-x-2.5">
                {/* You can add attendee avatars here */}
              </div>
              <p className="text-[13px] text-zinc-500">
                <span className="font-normal text-zinc-900">{eventData.goingCount}</span> going
              </p>
              <div className="ml-auto flex items-center gap-1 text-zinc-400">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <span className="text-[11px]">{eventData.viewCount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Share button */}
          <div className="flex items-center gap-2 px-5 pb-4 relative">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-[13px] font-normal text-zinc-600 bg-vibe-elevated border border-vibe-border rounded-full px-4 py-2 card-press"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="16 6 12 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Share Event
            </button>
            {showShareTooltip && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Share link copied!
              </div>
            )}
          </div>

          <div className="h-px bg-vibe-border mx-5"></div>

          {/* About section */}
          <div className="px-5 py-5">
            <h2 className="text-[11px] font-normal text-zinc-400 uppercase tracking-widest mb-3">About</h2>
            <div className={`relative overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[1000px]' : 'max-h-[150px]'}`}>
              <div>
                <p className="text-[13px] leading-relaxed mb-2 last:mb-0 text-zinc-600">
                  {eventData.description}
                </p>
              </div>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[12px] font-normal text-brand-accent mt-2 card-press"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {eventData.tags.map((tag) => (
                <span key={tag} className="text-[11px] font-normal text-zinc-500 bg-vibe-elevated px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="h-px bg-vibe-border mx-5"></div>

          {/* Venue section */}
          <div className="px-5 py-5">
            <h2 className="text-[11px] font-normal text-zinc-400 uppercase tracking-widest mb-3">Venue</h2>
            <div className="flex items-start gap-3 mb-4">
              <div className="size-9 rounded-lg bg-vibe-elevated flex items-center justify-center shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-brand-accent">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] font-normal text-zinc-900 leading-snug">{eventData.venue}</p>
                <p className="text-[12px] text-zinc-400 mt-0.5">{eventData.venueAddress}</p>
              </div>
            </div>

            {/* Map iframe */}
            <div className="rounded-xl overflow-hidden border border-vibe-border mb-3" style={{ height: 180 }}>
              <iframe
                src={eventData.mapEmbedUrl}
                width="100%"
                height="180"
                loading="lazy"
                title="Map showing venue location"
                allowFullScreen
                style={{ border: 0, display: 'block' }}
              />
            </div>

            {/* Transport buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                className="flex items-center justify-center gap-2 font-normal text-[13px] py-3 rounded-xl card-press text-white"
                style={{ backgroundColor: '#34D186' }}
                aria-label="Open venue in Bolt for a ride"
                onClick={() => window.open('https://bolt.eu/en-ng/')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z" />
                </svg>
                Open on Bolt
              </button>
              <button
                className="flex items-center justify-center gap-2 border border-vibe-border bg-vibe-card text-zinc-700 font-normal text-[13px] py-3 rounded-xl card-press"
                aria-label="Open in Google Maps"
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(eventData.venueAddress)}`)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-brand-accent">
                  <path d="M1 6l7-4 8 4 7-4v16l-7 4-8-4-7 4V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 2v16M16 6v16" stroke="currentColor" strokeWidth="2" />
                </svg>
                View on Map
              </button>
            </div>
          </div>
        </div>

        {/* You May Also Like section */}
        <div className="mt-8">
          <div className="py-5">
            <div className="flex items-center justify-between px-5 mb-4">
              <h2 className="text-[11px] font-normal text-zinc-400 uppercase tracking-widest">You May Also Like</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-1">
              {relatedEvents.map((event) => (
                <a key={event.id} className="block shrink-0 w-[160px] card-press" href={`/events/${event.id}`}>
                  <div className="bg-vibe-card rounded-xl overflow-hidden border border-vibe-border">
                    <div className="relative h-[90px]">
                      <img alt={event.title} className="object-cover w-full h-full" src={event.image} />
                      {event.isHot && (
                        <div className="absolute top-2 left-2 bg-amber-500 text-white text-[9px] font-normal px-1.5 py-0.5 rounded-full">
                          HOT
                        </div>
                      )}
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="font-heading font-normal text-[14px] text-zinc-900 line-clamp-2 leading-snug mb-1">
                        {event.title}
                      </p>
                      <p className="text-[10px] text-zinc-400 mb-1.5">{event.date}</p>
                      <p className="text-[13px] font-normal text-zinc-900">
                        {event.price === 0 ? 'FREE' : `₦${event.price.toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right column: Sticky ticket sidebar (desktop only) */}
      <div className="w-full lg:w-[380px] shrink-0 sticky top-20 lg:block hidden">
        <div className="bg-vibe-card rounded-2xl border border-vibe-border overflow-hidden">
          <div className="px-5 pt-5 pb-4 border-b border-vibe-border">
            <div className="inline-flex items-center gap-1.5 bg-amber-500 text-white text-[11px] font-normal px-2.5 py-1 rounded-full mb-3">
              <span className="size-1.5 rounded-full bg-white animate-pulse"></span>
              Only {eventData.ticketsLeft} tickets left
            </div>
            <h2 className="font-heading text-[16px] tracking-wide text-zinc-900 leading-snug mb-3 line-clamp-2">
              {eventData.title}
            </h2>
            <div className="flex items-center gap-1.5 text-[12px] text-zinc-600 mb-4">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0 text-brand-accent">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>{eventData.date} · {eventData.time} · {eventData.venue}</span>
            </div>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wide mb-0.5">Tickets from</p>
            <p className="text-[28px] font-normal text-zinc-900 leading-none">₦{eventData.priceMin.toLocaleString()}</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">up to ₦{eventData.priceMax.toLocaleString()}</p>
          </div>
          <div className="px-5 pb-5 pt-1">
            <button className="w-full bg-brand-accent text-zinc-900 font-normal text-[15px] py-3.5 rounded-xl card-press">
              Buy Tickets
            </button>
            <p className="text-center text-[11px] text-zinc-500 mt-3">Secure checkout · Instant delivery</p>
          </div>
        </div>
        </div>
        </div>
      </main>
    </div>
  );
};

// Helper icon components
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline align-middle shrink-0">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default EventDetailPage;