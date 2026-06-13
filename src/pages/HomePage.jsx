import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from '../components/MobileMenu';
// import { Herobanner } from '../assets/banner.png'

// Icons
const SearchIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5 21 21" strokeLinecap="round" /></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>;
const MenuIcon = () => <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><line x1="0" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /><line x1="4" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /><line x1="8" y1="13" x2="18" y2="13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>;
const HelpIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none" /></svg>;
const LocationIcon = () => <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M5 0C2.79 0 1 1.79 1 4c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" fill="currentColor" /></svg>;
const ChevronRightIcon = () => <svg width="7" height="12" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const SparklesIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 2L15.5387 4.39157C15.9957 6.42015 17.5798 8.00431 19.6084 8.46127L22 9L19.6084 9.53873C17.5798 9.99569 15.9957 11.5798 15.5387 13.6084L15 16L14.4613 13.6084C14.0043 11.5798 12.4202 9.99569 10.3916 9.53873L8 9L10.3916 8.46127C12.4201 8.00431 14.0043 6.42015 14.4613 4.39158L15 2Z" strokeLinejoin="round" /><path d="M7 12L7.38481 13.7083C7.71121 15.1572 8.84275 16.2888 10.2917 16.6152L12 17L10.2917 17.3848C8.84275 17.7112 7.71121 18.8427 7.38481 20.2917L7 22L6.61519 20.2917C6.28879 18.8427 5.15725 17.7112 3.70827 17.3848L2 17L3.70827 16.6152C5.15725 16.2888 6.28879 15.1573 6.61519 13.7083L7 12Z" strokeLinejoin="round" /></svg>;
const MusicIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7 9.5C7 10.8807 5.88071 12 4.5 12C3.11929 12 2 10.8807 2 9.5C2 8.11929 3.11929 7 4.5 7C5.88071 7 7 8.11929 7 9.5ZM7 9.5V2C7.33333 2.5 7.6 4.6 10 5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10.5" cy="19.5" r="2.5" /><circle cx="20" cy="18" r="2" /><path d="M13 19.5L13 11C13 10.09 13 9.63502 13.2466 9.35248C13.4932 9.06993 13.9938 9.00163 14.9949 8.86504C18.0085 8.45385 20.2013 7.19797 21.3696 6.42937C21.6498 6.24509 21.7898 6.15295 21.8949 6.20961C22 6.26627 22 6.43179 22 6.76283V17.9259" strokeLinecap="round" strokeLinejoin="round" /><path d="M13 13C17.8 13 21 10.6667 22 10" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const ComedyIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 11C2.50421 5.94668 6.78892 2 12 2C17.2111 2 21.4958 5.94668 22 11M19 19.1752C17.1904 20.9235 14.7215 22 12 22C9.27848 22 6.80962 20.9235 5 19.1752" strokeLinecap="round" /><path d="M12 18C13.8962 18 15.4889 16.7202 15.9362 14.9899C16.1443 14.1848 15.8422 14 15.0461 14H8.95386C8.15776 14 7.8557 14.1848 8.0638 14.9899C8.51109 16.7202 10.1038 18 12 18Z" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 9.5C7 8.67157 7.67157 8 8.5 8C9.32843 8 10 8.67157 10 9.5M14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const CorporateIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22V6C12 4.11438 12 3.17157 11.4142 2.58579C10.8284 2 9.88562 2 8 2H6C4.11438 2 3.17157 2 2.58579 2.58579C2 3.17157 2 4.11438 2 6V18C2 19.8856 2 20.8284 2.58579 21.4142C3.17157 22 4.11438 22 6 22H12Z" /><path d="M12 22H18C19.8856 22 20.8284 22 21.4142 21.4142C22 20.8284 22 19.8856 22 18V12C22 10.1144 22 9.17157 21.4142 8.58579C20.8284 8 19.8856 8 18 8H12" /><path d="M18.5 16H15.5M18.5 12L15.5 12" strokeLinecap="round" /><path d="M8.5 14H5.5M8.5 10H5.5M8.5 6H5.5" strokeLinecap="round" /></svg>;
const PartiesIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5.65784 11.0022L4.18747 14.3105C2.3324 18.4844 1.40486 20.5713 2.41719 21.5837C3.42951 22.596 5.51646 21.6685 9.69037 19.8134L12.9987 18.343C15.5161 17.2242 16.7748 16.6647 16.9751 15.586C17.1754 14.5073 16.2014 13.5333 14.2535 11.5854L12.4155 9.7474C10.4675 7.79944 9.49353 6.82546 8.41482 7.02575C7.33611 7.22604 6.77669 8.48475 5.65784 11.0022Z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const OwambeIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 7V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z" /><path d="M17 7H14M17 11H14" strokeLinecap="round" /></svg>;
const SportsIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2L15 9L22 9L16.5 14L18.5 22L12 17.5L5.5 22L7.5 14L2 9L9 9L12 2Z" /></svg>;
const FashionIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 5H16M8 5L6 9H18L16 5M8 5L5 19H19L16 5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const LearningIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 10V16C22 18.2091 20.2091 20 18 20H6C3.79086 20 2 18.2091 2 16V10M2 10L12 5L22 10M2 10L12 15L22 10" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const FreeIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 17H8V15H12C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11H8V9H14M12 7H8V5H16" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const MusicIconLarge = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M7 9.5C7 10.8807 5.88071 12 4.5 12C3.11929 12 2 10.8807 2 9.5C2 8.11929 3.11929 7 4.5 7C5.88071 7 7 8.11929 7 9.5ZM7 9.5V2C7.33333 2.5 7.6 4.6 10 5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10.5" cy="19.5" r="2.5" /><circle cx="20" cy="18" r="2" /><path d="M13 19.5L13 11C13 10.09 13 9.63502 13.2466 9.35248C13.4932 9.06993 13.9938 9.00163 14.9949 8.86504C18.0085 8.45385 20.2013 7.19797 21.3696 6.42937C21.6498 6.24509 21.7898 6.15295 21.8949 6.20961C22 6.26627 22 6.43179 22 6.76283V17.9259" strokeLinecap="round" strokeLinejoin="round" /><path d="M13 13C17.8 13 21 10.6667 22 10" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const ComedyIconLarge = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M2 11C2.50421 5.94668 6.78892 2 12 2C17.2111 2 21.4958 5.94668 22 11M19 19.1752C17.1904 20.9235 14.7215 22 12 22C9.27848 22 6.80962 20.9235 5 19.1752" strokeLinecap="round" /><path d="M12 18C13.8962 18 15.4889 16.7202 15.9362 14.9899C16.1443 14.1848 15.8422 14 15.0461 14H8.95386C8.15776 14 7.8557 14.1848 8.0638 14.9899C8.51109 16.7202 10.1038 18 12 18Z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const CorporateIconLarge = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 22V6C12 4.11438 12 3.17157 11.4142 2.58579C10.8284 2 9.88562 2 8 2H6C4.11438 2 3.17157 2 2.58579 2.58579C2 3.17157 2 4.11438 2 6V18C2 19.8856 2 20.8284 2.58579 21.4142C3.17157 22 4.11438 22 6 22H12Z" /><path d="M12 22H18C19.8856 22 20.8284 22 21.4142 21.4142C22 20.8284 22 19.8856 22 18V12C22 10.1144 22 9.17157 21.4142 8.58579C20.8284 8 19.8856 8 18 8H12" /><path d="M18.5 16H15.5M18.5 12L15.5 12" strokeLinecap="round" /></svg>;
const PartiesIconLarge = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M5.65784 11.0022L4.18747 14.3105C2.3324 18.4844 1.40486 20.5713 2.41719 21.5837C3.42951 22.596 5.51646 21.6685 9.69037 19.8134L12.9987 18.343C15.5161 17.2242 16.7748 16.6647 16.9751 15.586C17.1754 14.5073 16.2014 13.5333 14.2535 11.5854L12.4155 9.7474C10.4675 7.79944 9.49353 6.82546 8.41482 7.02575C7.33611 7.22604 6.77669 8.48475 5.65784 11.0022Z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const SportsIconLarge = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 2L15 9L22 9L16.5 14L18.5 22L12 17.5L5.5 22L7.5 14L2 9L9 9L12 2Z" /></svg>;
const LearningIconLarge = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M22 10V16C22 18.2091 20.2091 20 18 20H6C3.79086 20 2 18.2091 2 16V10M2 10L12 5L22 10M2 10L12 15L22 10" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const FashionIconLarge = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M8 5H16M8 5L6 9H18L16 5M8 5L5 19H19L16 5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const FreeIconLarge = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 17H8V15H12C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11H8V9H14M12 7H8V5H16" strokeLinecap="round" strokeLinejoin="round" /></svg>;

// Mock event data
const eventsData = [
  { id: '1', title: 'Rev Battle 1.0', category: 'education', date: 'Sun, Jun 14', venue: 'Elekahia Stadium', location: 'Port Harcourt', price: 5000, image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop' },
  { id: '2', title: 'Vybz', category: 'corporate', date: 'Wed, Jun 17', venue: 'Julirose Hotel & Suites', location: 'Port Harcourt', price: 5000, image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=600&h=400&fit=crop' },
  { id: '3', title: 'Wiz Summer Fiesta 2026', category: 'education', date: 'Mon, Jun 29', venue: 'Landmark Event Centre', location: 'Lagos', price: 45000, image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop' },
  { id: '4', title: 'Jeriq Summer Fest', category: 'music', date: 'Wed, Jul 22', venue: 'Port Harcourt', location: 'Port Harcourt', price: 50000, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop' }
];

const freeLowCostEvents = [
  {
    id: 'cmqb8gw520001la04azxnfyi5',
    title: 'ByteTech Summit',
    date: 'Thu, Jun 25',
    venue: 'Autograph Event Center',
    price: 'FREE',
    category: 'fashion',
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmqarjccw0002l7055mcgb49j/drafts/7682124e-a1b5-42a6-b739-7b30e6617867.png',
  },
  {
    id: 'cmqb5c8os0001i8047mgm4cyr',
    title: 'Rev Battle 1.0',
    date: 'Sun, Jun 14',
    venue: 'Elekahia Stadium',
    price: '₦5,000',
    category: 'education',
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmqarjccw0002l7055mcgb49j/drafts/6489fae1-ec46-4010-9ccf-bb396922929f.jpg',
  },
];

const trendingEvents = [
  {
    id: 'cmqb5c8os0001i8047mgm4cyr',
    title: 'Rev Battle 1.0',
    date: 'Sun, Jun 14',
    location: 'Port Harcourt',
    price: 5000,
    priceLabel: 'From ₦5,000',
    isFree: false,
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmqarjccw0002l7055mcgb49j/drafts/6489fae1-ec46-4010-9ccf-bb396922929f.jpg',
  },
  {
    id: 'cmqazk8gl0001js04df6irrm1',
    title: 'Vybz',
    date: 'Wed, Jun 17',
    location: 'Port Harcourt',
    price: 5000,
    priceLabel: 'From ₦5,000',
    isFree: false,
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmqarjccw0002l7055mcgb49j/drafts/7c8925c1-a542-44c3-80d2-af6b445a9cf9.png',
  },
  {
    id: 'cmqb8gw520001la04azxnfyi5',
    title: 'ByteTech Summit',
    date: 'Thu, Jun 25',
    location: 'Port Harcourt',
    price: 0,
    priceLabel: 'FREE',
    isFree: true,
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmqarjccw0002l7055mcgb49j/drafts/7682124e-a1b5-42a6-b739-7b30e6617867.png',
  },
  {
    id: 'cmpbxnqt20002ujdkq2xqqbix',
    title: 'Wiz Summer Fiesta 2026',
    date: 'Mon, Jun 29',
    location: 'Lagos',
    price: 45000,
    priceLabel: 'From ₦45,000',
    isFree: false,
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmox7p0bh0000ujusmpkcbp53/cmpbxnqt20002ujdkq2xqqbix/2b4f5347-6c0e-4493-a1b6-1505c036373c.jpg',
  },
  {
    id: 'cmqb8os6v0001js04ksx6fcsq',
    title: 'Bole Outreach',
    date: 'Sat, Jul 4',
    location: 'Lagos',
    price: 7000,
    priceLabel: 'From ₦7,000',
    isFree: false,
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmqarjccw0002l7055mcgb49j/drafts/d3f6ef18-ef8c-448a-91da-97df1ecf54aa.jpg',
  },
  {
    id: 'cmpu876ed0004uj9w3h5wbll2',
    title: 'Jeriq Summer Fest',
    date: 'Wed, Jul 22',
    location: 'Port Harcourt',
    price: 50000,
    priceLabel: 'From ₦50,000',
    isFree: false,
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmox7p0bh0000ujusmpkcbp53/drafts/a84b48e3-4b20-4859-a49e-50e4eaa4dcd8.jpg',
  },
  {
    id: 'cmpu8742r0001uj9wq4tgaxya',
    title: 'Jeriq Summer Fest',
    date: 'Wed, Jul 22',
    location: 'Port Harcourt',
    price: 50000,
    priceLabel: 'From ₦50,000',
    isFree: false,
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmox7p0bh0000ujusmpkcbp53/drafts/a84b48e3-4b20-4859-a49e-50e4eaa4dcd8.jpg',
  },
  {
    id: 'cmqbfwe1v0001l5048wnqrlxb',
    title: 'Thrift the Drip',
    date: 'Thu, Aug 6',
    location: 'Lagos',
    price: 3000,
    priceLabel: 'From ₦3,000',
    isFree: false,
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmqarjccw0002l7055mcgb49j/drafts/e84385d1-0e88-4238-bcbf-cbf7c4c7e7cf.jpg',
  },
];

const filterOptions = ['Trending', 'Corporate', 'Concerts'];

const TrendingSection = () => {
  const [activeFilter, setActiveFilter] = useState('Trending');
  const displayedEvents = trendingEvents;
  return (
    <section className="py-8 bg-sky-50/30">
      <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
        <div className="px-5 mb-4 lg:px-0">
          <h2 className="font-heading font-normal text-[18px] tracking-wide text-zinc-900">TRENDING</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 mb-4 pb-0.5 lg:px-0 lg:flex-wrap lg:overflow-visible lg:pb-0">
          {filterOptions.map((filter) => (
            <button key={filter} onClick={() => setActiveFilter(filter)} className={`shrink-0 h-8 px-3.5 rounded-lg text-[12px] font-normal transition-all duration-150 ${activeFilter === filter ? 'bg-brand-accent text-white' : 'bg-zinc-100 text-zinc-500'}`}>
              {filter}
            </button>
          ))}
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pl-5 pr-5 pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pl-0 lg:pr-0 lg:pb-0 lg:mt-2">
          {displayedEvents.map((event) => (
            <Link key={event.id} className="shrink-0 w-[260px] lg:w-auto bg-white rounded-xl overflow-hidden block shadow-sm ring-1 ring-zinc-100 hover:shadow-md transition-shadow" to={`/events/${event.id}`}>
              <div className="relative h-[155px] lg:h-[170px] overflow-hidden">
                <img alt={event.title} loading="lazy" className="object-cover object-center w-full h-full" src={event.image} />
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/45 to-transparent pointer-events-none"></div>
                {event.isFree && <span className="absolute top-2.5 right-2.5 z-10 bg-amber-500 text-zinc-900 text-[9px] font-normal uppercase tracking-wider px-2 py-0.5 rounded-md pointer-events-none">FREE</span>}
              </div>
              <div className="px-3.5 py-3">
                <p className="text-[10px] font-normal text-zinc-500 uppercase tracking-wider mb-1.5">{event.date} · {event.location}</p>
                <h3 className="font-heading font-normal text-[16px] text-zinc-900 leading-snug line-clamp-1 mb-2">{event.title}</h3>
                <p className={`text-[15px] font-normal ${event.isFree ? 'text-amber-500' : 'text-zinc-900'}`}>{event.priceLabel}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const FreeLowCostSection = () => {
  return (
    <section className="py-8 bg-amber-50/35">
      <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between px-5 mb-1 lg:px-0">
          <h2 className="font-heading font-normal text-[18px] tracking-wide text-zinc-900">
            FREE &amp; LOW COST
          </h2>
          <Link
            className="text-[12px] font-normal text-brand-accent card-press"
            to="/discover?category=free"
          >
            More free events
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline align-middle shrink-0 ml-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
        <p className="text-[12px] text-zinc-400 px-5 mt-1 mb-4 lg:px-0">
          Great events, easy on the wallet
        </p>

        {/* Mobile layout (single column list) */}
        <div className="mx-5 bg-white rounded-xl overflow-hidden shadow-sm ring-1 ring-zinc-100 lg:hidden">
          {freeLowCostEvents.map((event) => (
            <Link
              key={event.id}
              className="card-press flex gap-3 px-4 py-3.5 border-t first:border-t-0 border-zinc-100"
              to={`/events/${event.id}`}
            >
              <div className="relative w-[72px] h-[72px] shrink-0 rounded-lg overflow-hidden">
                <img
                  alt={event.title}
                  loading="lazy"
                  className="object-cover object-center w-full h-full"
                  src={event.image}
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className="font-heading font-normal text-[15px] text-zinc-900 leading-snug line-clamp-2 mb-1">
                  {event.title}
                </h3>
                <p className="text-[11px] text-zinc-400 mb-2">
                  {event.date} · {event.venue}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-normal text-amber-500">
                    {event.price}
                  </p>
                  <span className="text-[10px] font-normal text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded capitalize">
                    {event.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center self-center ml-1">
                <svg
                  width="7"
                  height="12"
                  viewBox="0 0 8 14"
                  fill="none"
                  className="text-zinc-300"
                >
                  <path
                    d="M1 1l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop layout (2‑column grid) */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-3">
          {freeLowCostEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-sm ring-1 ring-zinc-100 hover:shadow-md transition-shadow">
              <Link
                className="card-press flex gap-3 px-4 py-3.5"
                to={`/events/${event.id}`}
              >
                <div className="relative w-[72px] h-[72px] shrink-0 rounded-lg overflow-hidden">
                  <img
                    alt={event.title}
                    loading="lazy"
                    className="object-cover object-center w-full h-full"
                    src={event.image}
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className="font-heading font-normal text-[15px] text-zinc-900 leading-snug line-clamp-2 mb-1">
                    {event.title}
                  </h3>
                  <p className="text-[11px] text-zinc-400 mb-2">
                    {event.date} · {event.venue}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-normal text-amber-500">
                      {event.price}
                    </p>
                    <span className="text-[10px] font-normal text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded capitalize">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center self-center ml-1">
                  <svg
                    width="7"
                    height="12"
                    viewBox="0 0 8 14"
                    fill="none"
                    className="text-zinc-300"
                  >
                    <path
                      d="M1 1l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const heroSlides = [
  { id: 1, title: 'Rev Battle 1.0', category: 'education', date: 'Mon, Jun 29', venue: 'Landmark Event Centre, Lagos', price: 45000, image: eventsData[0].image },
  { id: 2, title: 'Wiz Summer Fiesta 2026', category: 'education', date: 'Mon, Jun 29', venue: 'Landmark Event Centre, Lagos', price: 45000, image: eventsData[2].image },
  { id: 3, title: 'Jeriq Summer Fest', category: 'education', date: 'Wed, Jul 22', venue: 'Port Harcourt', price: 50000, image: eventsData[3].image }
];

const categories = [
  { id: 'all', label: 'All', icon: <SparklesIcon /> },
  { id: 'music', label: 'Music', icon: <MusicIcon /> },
  { id: 'comedy', label: 'Comedy', icon: <ComedyIcon /> },
  { id: 'corporate', label: 'Corporate', icon: <CorporateIcon /> },
  { id: 'parties', label: 'Parties', icon: <PartiesIcon /> },
  { id: 'owambe', label: 'Owambe', icon: <OwambeIcon /> },
  { id: 'sports', label: 'Sports', icon: <SportsIcon /> },
  { id: 'fashion', label: 'Fashion', icon: <FashionIcon /> },
  { id: 'learning', label: 'Learning', icon: <LearningIcon /> },
  { id: 'free', label: 'Free', icon: <FreeIcon /> }
];

const CategoryCard = ({ title, count, bgGradient, icon }) => (
  <Link to={`/discover?category=${title.toLowerCase()}`} className="relative flex items-center gap-3 h-[68px] lg:h-[80px] px-4 rounded-xl overflow-hidden" style={{ background: bgGradient }}>
    <span className="relative shrink-0 z-10">{icon}</span>
    <div className="relative z-10 flex flex-col items-start min-w-0">
      <span className="text-[13px] font-normal text-white leading-snug">{title}</span>
      <span className="text-[11px] text-white/50 font-normal">{count}</span>
    </div>
  </Link>
);

const FooterColumn = ({ title, links }) => (
  <div className="space-y-2 lg:space-y-4">
    <p className="text-[11px] font-normal text-zinc-400 uppercase tracking-widest mb-3">{title}</p>
    {links.map((link, idx) => (
      <Link key={idx} to={`/${link.toLowerCase().replace(/ /g, '-')}`} className="block text-[12px] text-zinc-500 text-left leading-tight hover:text-zinc-700 transition-colors lg:text-[13px]">{link}</Link>
    ))}
  </div>
);

const SocialIcon = ({ href, icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={icon} className="text-zinc-400 hover:text-zinc-700 transition-colors">
    {icon === 'x' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>}
    {icon === 'instagram' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" /></svg>}
    {icon === 'tiktok' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.89 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z" /></svg>}
  </a>
);

const BitbandyHomepage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredEvents = activeCategory === 'all'
    ? eventsData
    : eventsData.filter(event => event.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto px-5 lg:px-8 pt-4 pb-4 sticky top-0 bg-white z-50">
        <div className="flex items-center justify-between">
          <Link to="/" className="shrink-0">
            <img alt="Bitbandy" className="h-10" src="https://bitbandy.com/_next/image?url=%2Fimages%2Fbitbandy.png&w=256&q=75" />
          </Link>

          <nav className="hidden lg:flex items-center gap-7 shrink-0">
            <Link to="/" className="text-[14px] font-normal text-purple-600">Home</Link>
            <Link to="/discover" className="text-[14px] font-normal text-zinc-400 hover:text-zinc-700">Discover</Link>
            <Link to="/for-organizers" className="text-[14px] font-normal text-zinc-400 hover:text-zinc-700">For Organizers</Link>
          </nav>

          <form className="hidden lg:flex flex-1 max-w-[380px] items-center gap-2.5 h-10 rounded-lg px-3 bg-zinc-100 ml-8">
            <button type="submit" aria-label="Search" className="shrink-0 text-zinc-400">
              <SearchIcon />
            </button>
            <input
              type="search"
              placeholder="Search events, artists, venues…"
              className="flex-1 bg-transparent text-[13px] text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Original Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="pb-12">
        {/* Hero Section */}
        <section className="px-5 pt-5 lg:px-0">
          <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8 lg:pt-8">
            <div className="relative rounded-3xl bg-gradient-to-br from-purple-50 to-orange-50 ring-1 ring-purple-100 overflow-hidden">
              <div className="relative px-6 pt-8 pb-8 lg:grid lg:grid-cols-2 lg:gap-6 lg:items-center lg:px-12 lg:pt-12 lg:pb-12">
                <div>
                  <p className="text-[10px] font-normal text-zinc-500 uppercase tracking-[0.2em] mb-4 lg:text-[11px]">Lagos · Port Harcourt · Abuja · Nigeria</p>
                  <h1 className="font-heading font-normal text-[30px] leading-[1.05] tracking-wide text-zinc-900 mb-4 lg:text-[60px] lg:mb-6">
                    DISCOVER<br />EVENTS<br />AROUND YOU<br />WITH <span className="text-brand-accent">Bitbandy!</span>
                  </h1>
                  <p className="text-[13px] text-zinc-500 leading-relaxed max-w-[270px] mb-5 lg:text-[15px] lg:max-w-[360px]">Music, comedy, corporate, sports, everything happening near you, all in one place.</p>
                  <div className="flex items-center gap-3">
                    <Link to="/discover" className="bg-brand-accent text-white font-normal text-[13px] px-5 py-2.5 rounded-xl whitespace-nowrap lg:text-[15px] lg:px-7 lg:py-3 hover:bg-brand-accent-hover transition-colors">Browse Events</Link>
                    <Link to="/host" className="text-[13px] font-normal text-zinc-500 hover:text-zinc-700 transition-colors">Host an event <ArrowRightIcon /></Link>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <img src='https://twintix.vercel.app/_next/image?url=%2Fillustrations%2Fhero.png&w=828&q=75' alt="Event discovery banner" className="w-full h-auto drop-shadow-2xl" />
                </div>
              </div>
              {/* Mobile banner */}
              <div className="lg:hidden px-6 pb-6">
                <img src='https://twintix.vercel.app/_next/image?url=%2Fillustrations%2Fhero.png&w=828&q=75' alt="Event discovery banner" className="w-full h-auto drop-shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Hero Carousel */}
        <section className="px-5 pt-10 lg:px-0">
          <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8 lg:py-8">
            <div className="bg-zinc-50 rounded-3xl overflow-hidden lg:flex lg:h-[420px]">
              <div className="relative h-[200px] lg:h-full lg:flex-1 shrink-0 overflow-hidden">
                {heroSlides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`hero-slide absolute inset-0 transition-opacity duration-500 ${activeSlide === idx ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <img src={slide.image} alt={slide.title} className="object-cover w-full h-full" />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-block bg-black/50 backdrop-blur-sm text-white text-[10px] font-normal uppercase tracking-widest px-2.5 py-1 rounded-md">{slide.category}</span>
                    </div>
                  </div>
                ))}
                <div className="absolute bottom-0 inset-x-0 h-[3px] bg-white/10 z-10">
                  <div className="h-full bg-brand-accent transition-all duration-500" style={{ width: `${((activeSlide + 1) / heroSlides.length) * 100}%` }}></div>
                </div>
              </div>
              <div className="px-4 pt-4 pb-5 lg:w-[340px] lg:shrink-0 lg:flex lg:flex-col lg:justify-between lg:p-10">
                <div>
                  <p className="text-[10px] font-normal text-zinc-400 uppercase tracking-widest mb-1 lg:text-[11px]">{heroSlides[activeSlide].category} · {heroSlides[activeSlide].date}</p>
                  <h2 className="font-heading text-[22px] lg:text-[30px] text-zinc-900 leading-[1.1] mb-1">{heroSlides[activeSlide].title}</h2>
                  <p className="text-[12px] lg:text-[13px] text-zinc-500 mb-5 lg:mb-0">{heroSlides[activeSlide].venue} · 1:00 AM</p>
                </div>
                <div className="flex items-end justify-between lg:flex-col lg:items-start lg:gap-6">
                  <div>
                    <p className="text-[10px] text-zinc-400 mb-0.5 uppercase tracking-wide">From</p>
                    <p className="text-[22px] lg:text-[32px] font-normal text-zinc-900 leading-none">₦{heroSlides[activeSlide].price.toLocaleString()}</p>
                  </div>
                  <button className="bg-brand-accent text-white font-normal text-[14px] px-6 py-2.5 rounded-lg lg:w-full lg:text-center lg:py-3.5 hover:bg-brand-accent-hover transition-colors">Buy Tickets</button>
                </div>
              </div>
            </div>
            <div className="lg:hidden flex justify-center gap-1.5 mt-3">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`rounded-full transition-all duration-300 ${activeSlide === idx ? 'w-6 h-1.5 bg-brand-accent' : 'w-1.5 h-1.5 bg-zinc-300'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <div className="mt-10 mb-8">
          <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 pb-0.5 lg:px-0 lg:flex-wrap lg:overflow-visible">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 flex items-center gap-1.5 h-10 px-4 rounded-xl text-[12px] font-normal transition-all duration-150 ${activeCategory === cat.id ? 'bg-brand-accent text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Section */}
        <TrendingSection />

        {/* For You Section */}
        <section className="py-8 bg-purple-50/40">
          <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
            <div className="flex items-center justify-between px-5 lg:px-0 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-[3px] h-[18px] bg-brand-accent rounded-full"></div>
                <h2 className="font-heading font-normal text-[18px] tracking-wide text-zinc-900">FOR YOU</h2>
              </div>
              <Link to="/discover" className="text-[12px] font-normal text-brand-accent">Browse all <ArrowRightIcon /></Link>
            </div>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pl-5 pr-5 pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible">
              {filteredEvents.map((event) => (
                <Link key={event.id} to={`/events/${event.id}`} className="shrink-0 w-[240px] lg:w-auto bg-white rounded-xl overflow-hidden block hover:shadow-lg transition-shadow">
                  <div className="relative h-[140px] lg:h-[170px] overflow-hidden">
                    <img src={event.image} alt={event.title} className="object-cover w-full h-full" />
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                  <div className="px-4 py-4">
                    <p className="text-[10px] font-normal text-zinc-400 uppercase tracking-wider mb-1.5">{event.date} · {event.location}</p>
                    <h3 className="font-heading font-normal text-[16px] text-zinc-900 leading-snug mb-3">{event.title}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-[15px] font-normal text-zinc-900">₦{event.price.toLocaleString()}</p>
                      <span className="h-7 px-3 rounded-md text-[11px] font-normal text-white bg-brand-accent inline-flex items-center">Buy</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Near You Section */}
        <section className="mt-10 px-3 lg:px-0">
          <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
            <div className="px-5 py-4 rounded-3xl bg-blue-50/30 ring-1 ring-blue-100/70 lg:px-8 lg:py-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-normal text-[16px] lg:text-[18px] text-zinc-900 tracking-wide">NEAR YOU</h2>
                <Link to="/discover" className="text-[12px] font-normal text-zinc-400">See all</Link>
              </div>
              <p className="text-[12px] text-zinc-400 -mt-2 mb-4">Port Harcourt · 4 nearby</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {eventsData.slice(0, 4).map((event) => (
                  <Link key={event.id} to={`/events/${event.id}`} className="bg-white rounded-xl overflow-hidden block hover:shadow-lg transition-shadow">
                    <div className="relative h-[100px] lg:h-[150px] overflow-hidden">
                      <img src={event.image} alt={event.title} className="object-cover w-full h-full" />
                      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                    <div className="px-3 py-2.5">
                      <h3 className="font-heading font-normal text-[15px] text-zinc-900 leading-snug mb-1">{event.title}</h3>
                      <p className="text-[10px] text-zinc-400 mb-2 flex items-center gap-1">
                        <LocationIcon /> {event.date} · Nearby
                      </p>
                      <p className="text-[13px] font-normal text-zinc-900">₦{event.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Free & Low Cost Section */}
        <FreeLowCostSection />

        {/* Browse Categories Grid */}
        <section className="py-12 px-5 lg:px-0">
          <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="font-heading font-normal text-[18px] tracking-wide text-zinc-900">BROWSE</h2>
              <Link to="/discover" className="text-[12px] font-normal text-brand-accent">All categories <ArrowRightIcon /></Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              <CategoryCard title="Music" count="48 events" bgGradient="linear-gradient(135deg, rgb(59, 7, 100) 0%, rgb(109, 40, 217) 100%)" icon={<MusicIconLarge />} />
              <CategoryCard title="Comedy" count="19 events" bgGradient="linear-gradient(135deg, rgb(120, 53, 15) 0%, rgb(217, 119, 6) 100%)" icon={<ComedyIconLarge />} />
              <CategoryCard title="Corporate" count="34 events" bgGradient="linear-gradient(135deg, rgb(30, 58, 95) 0%, rgb(29, 78, 216) 100%)" icon={<CorporateIconLarge />} />
              <CategoryCard title="Parties" count="27 events" bgGradient="linear-gradient(135deg, rgb(80, 7, 36) 0%, rgb(190, 24, 93) 100%)" icon={<PartiesIconLarge />} />
              <CategoryCard title="Sports" count="15 events" bgGradient="linear-gradient(135deg, rgb(20, 83, 45) 0%, rgb(22, 163, 74) 100%)" icon={<SportsIconLarge />} />
              <CategoryCard title="Learning" count="22 events" bgGradient="linear-gradient(135deg, rgb(12, 74, 110) 0%, rgb(2, 132, 199) 100%)" icon={<LearningIconLarge />} />
              <CategoryCard title="Fashion" count="11 events" bgGradient="linear-gradient(135deg, rgb(74, 4, 78) 0%, rgb(219, 39, 119) 100%)" icon={<FashionIconLarge />} />
              <CategoryCard title="Free Events" count="36 events" bgGradient="linear-gradient(135deg, rgb(69, 26, 3) 0%, rgb(180, 83, 9) 100%)" icon={<FreeIconLarge />} />
            </div>
          </div>
        </section>

        {/* CTA for Organizers */}
        <section className="px-5 mt-4 lg:px-0 lg:mt-8">
          <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
            <div className="rounded-3xl px-6 py-8 relative overflow-hidden lg:px-16 lg:py-14 lg:flex lg:items-center lg:justify-between" style={{ background: 'linear-gradient(135deg, rgb(59, 7, 100) 0%, rgb(76, 29, 149) 45%, rgb(30, 27, 75) 100%)' }}>
              <div className="relative">
                <p className="text-[10px] font-normal text-purple-300/70 uppercase tracking-[0.2em] mb-4 lg:text-[11px]">For Organizers</p>
                <h2
                  className="font-heading font-[400] text-[30px] leading-[30px] tracking-wide text-white mb-4 lg:text-[42px] lg:leading-[42px]"
                >
                  HOST YOUR<br />
                  NEXT EVENT<br />
                  <span className="text-green-500">WITH US.</span>
                </h2>                <p className="text-[13px] text-purple-200/60 leading-relaxed mb-7 max-w-[240px] lg:text-[15px] lg:max-w-[360px] lg:mb-0">Simple setup, fraud-proof tickets, and instant payouts.</p>
              </div>
              <div className="relative flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3 lg:shrink-0">
                <Link to="/host" className="bg-green-500 text-zinc-900 font-normal text-[14px] px-6 py-3 rounded-xl lg:text-[15px] lg:px-8 lg:py-4 lg:w-full hover:bg-green-600 transition-colors">Create an Event</Link>
                <Link to="/for-organizers" className="text-[13px] font-normal text-purple-300/70 lg:text-[14px] hover:text-purple-200 transition-colors">Learn more <ArrowRightIcon /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-zinc-200">
          <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
            <div className="px-5 lg:px-0 pt-10 pb-8 lg:flex lg:gap-16">
              <div className="mb-8 lg:mb-0 lg:shrink-0 lg:w-52">
                <img src="https://bitbandy.com/_next/image?url=%2Fimages%2Fbitbandy.png&w=256&q=75" alt="Bitbandy" className="h-10 mb-2" />
                <p className="text-[12px] text-zinc-400 leading-relaxed">Discover and host events across Nigeria.</p>
                <div className="flex items-center gap-4 mt-5">
                  <SocialIcon href="#" icon="x" />
                  <SocialIcon href="#" icon="instagram" />
                  <SocialIcon href="#" icon="tiktok" />
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:gap-x-8">
                <FooterColumn title="Platform" links={['Browse Events', 'For Organizers', 'Host an Event', 'My Tickets']} />
                <FooterColumn title="Company" links={['About Bitbandy', 'Sign up', 'Sign in']} />
                <FooterColumn title="Support" links={['Help Centre', 'Contact us', 'Common issues']} />
                <FooterColumn title="Legal" links={['Terms', 'Privacy', 'Cookies']} />
              </div>
            </div>
            <div className="px-5 lg:px-0 pb-8 border-t border-zinc-100 pt-5 flex items-center justify-between">
              <p className="text-[11px] text-zinc-400">© 2026 Bitbandy. All rights reserved.</p>
              <span className="text-[10px] font-normal text-green-600 uppercase tracking-widest">NG</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default BitbandyHomepage;
