import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from '../components/MobileMenu';
import EventCard from '../components/EventCard';
import { Calendar, Clock } from 'lucide-react';
import { IoPerson } from "react-icons/io5";
import heroBackground from '../assets/Hero-background-img.png';
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
const FreeIconLarge = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 12 12 12ZM12 17H8V15H12C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11H8V9H14M12 7H8V5H16" strokeLinecap="round" strokeLinejoin="round" /></svg>;

// New category icons matching the image
const NewMusicIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>;
const NewComedyIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>;
const NewCorporateIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9V3H3v18h18V7z"></path><path d="M14 3v4"></path><path d="M8 13v2"></path><path d="M12 13v2"></path><path d="M16 13v2"></path><path d="M8 19v2"></path><path d="M12 19v2"></path><path d="M16 19v2"></path></svg>;
const NewPartiesIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const NewSportsIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;
const NewLearningIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><path d="M8 7h8"></path><path d="M8 11h8"></path><path d="M8 15h6"></path></svg>;
const NewFashionIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>;
const NewFreeIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5v2"></path><path d="M15 17v2"></path><path d="M3 11V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v4"></path><path d="M21 13v4a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2"></path><path d="M12 5a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3h-2z"></path></svg>;

// Mock event data
const eventsData = [
  { id: '1', title: 'Rev Battle 1.0', category: 'education', date: 'Sun, Jun 14', venue: 'Elekahia Stadium', location: 'Port Harcourt', price: 5000, organizer: 'Tech Events NG', countdown: '2 days', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop' },
  { id: '2', title: 'Vybz', category: 'corporate', date: 'Wed, Jun 17', venue: 'Julirose Hotel & Suites', location: 'Port Harcourt', price: 5000, organizer: 'Julirose Events', countdown: '5 days', image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=600&h=400&fit=crop' },
  { id: '3', title: 'Wiz Summer Fiesta 2026', category: 'education', date: 'Mon, Jun 29', venue: 'Landmark Event Centre', location: 'Lagos', price: 45000, organizer: 'Wiz Events', countdown: '17 days', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop' },
  { id: '4', title: 'Jeriq Summer Fest', category: 'music', date: 'Wed, Jul 22', venue: 'Port Harcourt', location: 'Port Harcourt', price: 50000, organizer: 'Jeriq Music', countdown: '39 days', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop' }
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
    category: 'education',
    date: 'Sun, Jun 14',
    location: 'Port Harcourt',
    price: 5000,
    priceLabel: 'From ₦5,000',
    isFree: false,
    organizer: 'Tech Events NG',
    countdown: '2 days',
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmqarjccw0002l7055mcgb49j/drafts/6489fae1-ec46-4010-9ccf-bb396922929f.jpg',
  },
  {
    id: 'cmqazk8gl0001js04df6irrm1',
    title: 'Vybz',
    category: 'corporate',
    date: 'Wed, Jun 17',
    location: 'Port Harcourt',
    price: 5000,
    priceLabel: 'From ₦5,000',
    isFree: false,
    organizer: 'Julirose Events',
    countdown: '5 days',
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmqarjccw0002l7055mcgb49j/drafts/7c8925c1-a542-44c3-80d2-af6b445a9cf9.png',
  },
  {
    id: 'cmqb8gw520001la04azxnfyi5',
    title: 'ByteTech Summit',
    category: 'fashion',
    date: 'Thu, Jun 25',
    location: 'Port Harcourt',
    price: 0,
    priceLabel: 'FREE',
    isFree: true,
    organizer: 'ByteTech Team',
    countdown: '13 days',
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmqarjccw0002l7055mcgb49j/drafts/7682124e-a1b5-42a6-b739-7b30e6617867.png',
  },
  {
    id: 'cmpbxnqt20002ujdkq2xqqbix',
    title: 'Wiz Summer Fiesta 2026',
    category: 'music',
    date: 'Mon, Jun 29',
    location: 'Lagos',
    price: 45000,
    priceLabel: 'From ₦45,000',
    isFree: false,
    organizer: 'Wiz Events',
    countdown: '17 days',
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmox7p0bh0000ujusmpkcbp53/cmpbxnqt20002ujdkq2xqqbix/2b4f5347-6c0e-4493-a1b6-1505c036373c.jpg',
  },
  {
    id: 'cmqb8os6v0001js04ksx6fcsq',
    title: 'Bole Outreach',
    category: 'parties',
    date: 'Sat, Jul 4',
    location: 'Lagos',
    price: 7000,
    priceLabel: 'From ₦7,000',
    isFree: false,
    organizer: 'Food Fest NG',
    countdown: '22 days',
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmqarjccw0002l7055mcgb49j/drafts/d3f6ef18-ef8c-448a-91da-97df1ecf54aa.jpg',
  },
  {
    id: 'cmpu876ed0004uj9w3h5wbll2',
    title: 'Jeriq Summer Fest',
    category: 'music',
    date: 'Wed, Jul 22',
    location: 'Port Harcourt',
    price: 50000,
    priceLabel: 'From ₦50,000',
    isFree: false,
    organizer: 'Jeriq Music',
    countdown: '39 days',
    image: 'https://huhnbrdgiwntdaayfakl.supabase.co/storage/v1/object/public/event-covers/cmox7p0bh0000ujusmpkcbp53/drafts/a84b48e3-4b20-4859-a49e-50e4eaa4dcd8.jpg',
  },
  {
    id: 'cmpu8742r0001uj9wq4tgaxya',
    title: 'Jeriq Summer Fest',
    category: 'music',
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
  const displayedEvents = trendingEvents;
  return (
    <section className="py-8">
      <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
        <div className="px-5 lg:px-0 mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path>
                </svg>
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-zinc-900">TRENDING</h2>
                <p className="text-zinc-500 text-xs">Top events everyone's talking about</p>
              </div>
            </div>
            <Link to="/discover" className="bg-purple-100 text-purple-700 font-semibold px-3 py-1.5 rounded-md hover:bg-purple-200 transition-colors text-xs">Browse all</Link>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pl-5 pr-5 pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {displayedEvents.map((event) => (
            <Link key={event.id} to={`/events/${event.id}`} className="shrink-0 w-[260px] lg:w-auto">
              <EventCard event={event} />
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
  { id: 1, title: 'Rev Battle 1.0', category: 'Education', date: 'Mon, Jun 29', venue: 'Landmark Event Centre, Lagos', price: 45000, image: eventsData[0].image, organizer: eventsData[0].organizer, countdown: eventsData[0].countdown },
  { id: 2, title: 'Wiz Summer Fiesta 2026', category: 'Corporate', date: 'Mon, Jun 29', venue: 'Landmark Event Centre, Lagos', price: 45000, image: eventsData[2].image, organizer: eventsData[2].organizer, countdown: eventsData[2].countdown },
  { id: 3, title: 'Jeriq Summer Fest', category: 'Music', date: 'Wed, Jul 22', venue: 'Port Harcourt', price: 50000, image: eventsData[3].image, organizer: eventsData[3].organizer, countdown: eventsData[3].countdown }
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

const CategoryCard = ({ title, count, iconGradient, icon, rightShape }) => (
  <Link to={`/discover?category=${title.toLowerCase()}`} className="relative bg-white rounded-2xl p-5 shadow-sm border border-zinc-100 hover:shadow-md transition-all duration-200 overflow-hidden flex items-center gap-4">
    {/* Icon */}
    <div 
      className="relative w-14 h-14 rounded-full flex items-center justify-center shrink-0"
      style={{ background: iconGradient }}
    >
      {icon}
    </div>
    
    {/* Content */}
    <div className="relative z-10 flex-1">
      <h3 className="font-heading font-semibold text-[18px] text-zinc-900 leading-tight">{title}</h3>
      <p className="text-[14px] text-zinc-600 font-normal">{count}</p>
    </div>
    
    {/* Right shape */}
    <div className="absolute right-0 top-0 bottom-0 w-24 opacity-70" dangerouslySetInnerHTML={{ __html: rightShape }}></div>
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
            <Link to="/events" className="text-[14px] font-normal text-purple-600">Events</Link>
            <Link to="/about" className="text-[14px] font-normal text-zinc-400 hover:text-zinc-700">About</Link>
            <Link to="/contact-us" className="text-[14px] font-normal text-zinc-400 hover:text-zinc-700">Contact</Link>
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
            <div 
              className="relative rounded-3xl overflow-hidden bg-cover bg-center bg-no-repeat" 
              style={{ 
                backgroundImage: `url(${heroBackground})`,
                backgroundColor: '#f3e8ff'
              }}
            >
              <div className="relative px-6 pt-8 pb-8 lg:px-12 lg:pt-12 lg:pb-12">
                <div className="relative z-10">
                  <p className="text-[10px] font-normal text-zinc-600 uppercase tracking-[0.2em] mb-4 lg:text-[11px]">Lagos · Port Harcourt · Abuja · Nigeria</p>
                  <h1 className="font-heading font-bold text-[40px] leading-[1.1] tracking-tight text-zinc-900 mb-4 lg:text-[64px] lg:mb-6">
                    DISCOVER<br />EVENTS<br />AROUND YOU<br />WITH <span className="text-brand-accent">Bitbandy!</span>
                  </h1>
                  <p className="text-[14px] text-zinc-700 leading-relaxed max-w-[320px] mb-6 lg:text-[16px] lg:max-w-[380px]">Music, comedy, corporate, sports, everything happening near you, all in one place.</p>
                  <div className="flex items-center gap-4">
                    <Link to="/discover" className="bg-brand-accent text-white font-semibold text-[14px] px-7 py-3.5 rounded-xl whitespace-nowrap lg:text-[15px] hover:bg-brand-accent-hover transition-colors">Browse Events</Link>
                    <Link to="/host" className="text-[14px] font-semibold text-zinc-800 hover:text-zinc-900 transition-colors flex items-center gap-1">Host an event <ArrowRightIcon /></Link>
                  </div>
                </div>
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
                    {/* Header with date and countdown */}
                    <div className="absolute top-0 left-0 right-0 z-10 bg-zinc-900/90 backdrop-blur-sm px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 w-7 h-7">
                          <Calendar size={13} color="white" />
                        </div>
                        <span className="text-white text-xs font-normal">{slide.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 w-6 h-6">
                          <Clock size={11} color="white" />
                        </div>
                        <span className="text-zinc-200 text-xs font-normal whitespace-nowrap">{slide.countdown}</span>
                      </div>
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-black/75 to-transparent"></div>
                    {/* Category badge */}
                    <div className="absolute top-14 left-3 z-10">
                      <div className="inline-flex items-center gap-1.5 bg-black/75 backdrop-blur-md text-white text-[10px] font-normal uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#9139f6' }}></span>
                        <span>{slide.category}</span>
                      </div>
                    </div>
                    {/* Organizer info */}
                    <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
                      <div className="inline-flex items-center justify-center min-w-8 min-h-8 rounded-full bg-black/80 border border-white/15">
                        <IoPerson size={14} color="white" />
                      </div>
                      <span className="text-white text-sm font-normal">{slide.organizer}</span>
                    </div>
                  </div>
                ))}
                {/* Progress bar */}
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



        {/* Trending Section */}
        <TrendingSection />

        {/* For You Section */}
        <section className="py-8">
          <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
            <div className="px-5 lg:px-0 mb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-xl text-zinc-900">FOR YOU</h2>
                    <p className="text-zinc-500 text-xs">Events we think you'll love</p>
                  </div>
                </div>
                <Link to="/discover" className="bg-purple-100 text-purple-700 font-semibold px-3 py-1.5 rounded-md hover:bg-purple-200 transition-colors text-xs">Browse all</Link>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pl-5 pr-5 pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible">
              {filteredEvents.map((event) => (
                <Link key={event.id} to={`/events/${event.id}`} className="shrink-0 w-[260px] lg:w-auto">
                  <EventCard event={event} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Near You Section */}
        <section className="py-8">
          <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
            <div className="px-5 lg:px-0 mb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-xl text-zinc-900">NEAR YOU</h2>
                    <p className="text-zinc-500 text-xs">Port Harcourt · 4 nearby events</p>
                  </div>
                </div>
                <Link to="/discover" className="bg-purple-100 text-purple-700 font-semibold px-3 py-1.5 rounded-md hover:bg-purple-200 transition-colors text-xs">Browse all</Link>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pl-5 pr-5 pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible">
              {eventsData.slice(0, 4).map((event) => (
                <Link key={event.id} to={`/events/${event.id}`} className="shrink-0 w-[260px] lg:w-auto">
                  <EventCard event={event} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Free & Low Cost Section */}
        <FreeLowCostSection />

        {/* Browse Categories Grid */}
        <section className="py-12 px-0 lg:px-0">
          <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
            {/* Background container */}
            <div className="relative bg-gradient-to-br from-white to-[#f8f0ff] lg:rounded-3xl p-4 sm:p-8 lg:p-12 overflow-hidden">
              {/* Decorative elements - top right dots */}
              <div className="absolute top-0 right-0 w-48 h-48 opacity-40">
                <svg viewBox="0 0 100 100" fill="none">
                  <circle cx="10" cy="10" r="3" fill="#9139f6" />
                  <circle cx="26" cy="10" r="3" fill="#9139f6" />
                  <circle cx="42" cy="10" r="3" fill="#9139f6" />
                  <circle cx="58" cy="10" r="3" fill="#9139f6" />
                  <circle cx="74" cy="10" r="3" fill="#9139f6" />
                  <circle cx="90" cy="10" r="3" fill="#9139f6" />
                  <circle cx="10" cy="26" r="3" fill="#9139f6" />
                  <circle cx="26" cy="26" r="3" fill="#9139f6" />
                  <circle cx="42" cy="26" r="3" fill="#9139f6" />
                  <circle cx="58" cy="26" r="3" fill="#9139f6" />
                  <circle cx="74" cy="26" r="3" fill="#9139f6" />
                  <circle cx="90" cy="26" r="3" fill="#9139f6" />
                  <circle cx="10" cy="42" r="3" fill="#9139f6" />
                  <circle cx="26" cy="42" r="3" fill="#9139f6" />
                  <circle cx="42" cy="42" r="3" fill="#9139f6" />
                  <circle cx="58" cy="42" r="3" fill="#9139f6" />
                  <circle cx="74" cy="42" r="3" fill="#9139f6" />
                  <circle cx="90" cy="42" r="3" fill="#9139f6" />
                  <circle cx="10" cy="58" r="3" fill="#9139f6" />
                  <circle cx="26" cy="58" r="3" fill="#9139f6" />
                  <circle cx="42" cy="58" r="3" fill="#9139f6" />
                  <circle cx="58" cy="58" r="3" fill="#9139f6" />
                  <circle cx="74" cy="58" r="3" fill="#9139f6" />
                  <circle cx="90" cy="58" r="3" fill="#9139f6" />
                </svg>
              </div>
              
              {/* Decorative elements - bottom left circles */}
              <div className="absolute bottom-0 left-0 w-64 h-48 opacity-20">
                <svg viewBox="0 0 200 100" fill="none">
                  <circle cx="50" cy="80" r="40" stroke="#9139f6" strokeWidth="2" />
                  <circle cx="120" cy="90" r="60" stroke="#9139f6" strokeWidth="1" />
                </svg>
              </div>
              
              {/* Header */}
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10">
                <div>
                  <div className="relative inline-block mb-4">
                    <h3 className="text-[#9139f6] text-[12px] font-semibold tracking-widest uppercase">BROWSE</h3>
                    <div className="absolute bottom-[-8px] left-0 w-8 h-1 bg-[#9139f6] rounded-full"></div>
                  </div>
                  <h2 className="font-heading font-bold text-[36px] lg:text-[42px] text-zinc-900 leading-tight mb-2">
                    Explore events<br />by category
                  </h2>
                  <p className="text-[14px] text-zinc-600">Find exactly what you're into.</p>
                </div>
                <Link to="/discover" className="hidden lg:inline-flex items-center gap-2 text-[14px] font-medium text-[#9139f6] bg-white px-5 py-2.5 rounded-full border border-[#9139f6]/30 hover:bg-[#9139f6] hover:text-white transition-all duration-200 mt-4 lg:mt-0">
                  All categories
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              {/* Categories grid */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
                <CategoryCard 
                  title="Music" 
                  count="48 events" 
                  iconGradient="linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)" 
                  icon={<NewMusicIcon />} 
                  rightShape={`
                    <svg viewBox="0 0 100 100" fill="none">
                      <path d="M0 100 Q50 0 100 100 Z" fill="#d8b4fe" />
                    </svg>
                  `}
                />
                <CategoryCard 
                  title="Comedy" 
                  count="19 events" 
                  iconGradient="linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)" 
                  icon={<NewComedyIcon />} 
                  rightShape={`
                    <svg viewBox="0 0 100 100" fill="none">
                      <path d="M0 0 Q50 100 100 0 Z" fill="#fde68a" />
                      <path d="M20 100 Q60 0 100 100 Z" fill="#fed7aa" />
                    </svg>
                  `}
                />
                <CategoryCard 
                  title="Corporate" 
                  count="34 events" 
                  iconGradient="linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)" 
                  icon={<NewCorporateIcon />} 
                  rightShape={`
                    <svg viewBox="0 0 100 100" fill="none">
                      <path d="M0 0 L60 0 L100 100 L0 100 Z" fill="#bfdbfe" />
                      <line x1="10" y1="30" x2="70" y2="30" stroke="#93c5fd" strokeWidth="3" />
                      <line x1="20" y1="50" x2="80" y2="50" stroke="#93c5fd" strokeWidth="3" />
                      <line x1="30" y1="70" x2="90" y2="70" stroke="#93c5fd" strokeWidth="3" />
                    </svg>
                  `}
                />
                <CategoryCard 
                  title="Parties" 
                  count="27 events" 
                  iconGradient="linear-gradient(135deg, #be185d 0%, #ec4899 100%)" 
                  icon={<NewPartiesIcon />} 
                  rightShape={`
                    <svg viewBox="0 0 100 100" fill="none">
                      <path d="M0 0 L100 0 L100 100 Q50 50 0 100 Z" fill="#fbcfe8" />
                      <polygon points="70,70 75,80 85,80 77,87 80,97 70,90 60,97 63,87 55,80 65,80" fill="#fdf4ff" />
                      <polygon points="80,60 83,67 90,67 85,71 87,78 80,74 73,78 75,71 70,67 77,67" fill="#fdf4ff" />
                    </svg>
                  `}
                />
                <CategoryCard 
                  title="Sports" 
                  count="15 events" 
                  iconGradient="linear-gradient(135deg, #15803d 0%, #22c55e 100%)" 
                  icon={<NewSportsIcon />} 
                  rightShape={`<svg viewBox="0 0 100 100" fill="none"><path d="M0 0 L40 0 L100 100 L0 100 Z" fill="#dcfce7" /><circle cx="20" cy="30" r="4" fill="#86efac" /><circle cx="35" cy="30" r="4" fill="#86efac" /><circle cx="50" cy="30" r="4" fill="#86efac" /><circle cx="65" cy="30" r="4" fill="#86efac" /><circle cx="80" cy="30" r="4" fill="#86efac" /><circle cx="20" cy="45" r="4" fill="#86efac" /><circle cx="35" cy="45" r="4" fill="#86efac" /><circle cx="50" cy="45" r="4" fill="#86efac" /><circle cx="65" cy="45" r="4" fill="#86efac" /><circle cx="80" cy="45" r="4" fill="#86efac" /><circle cx="20" cy="60" r="4" fill="#86efac" /><circle cx="35" cy="60" r="4" fill="#86efac" /><circle cx="50" cy="60" r="4" fill="#86efac" /><circle cx="65" cy="60" r="4" fill="#86efac" /><circle cx="80" cy="60" r="4" fill="#86efac" /></svg>`}
                />
                <CategoryCard 
                  title="Learning" 
                  count="22 events" 
                  iconGradient="linear-gradient(135deg, #0e7490 0%, #06b6d4 100%)" 
                  icon={<NewLearningIcon />} 
                  rightShape={`<svg viewBox="0 0 100 100" fill="none"><path d="M0 0 Q30 50 0 100 L100 100 L100 0 Z" fill="#a5f3fc" /></svg>`}
                />
                <CategoryCard 
                  title="Fashion" 
                  count="11 events" 
                  iconGradient="linear-gradient(135deg, #db2777 0%, #f43f5e 100%)" 
                  icon={<NewFashionIcon />} 
                  rightShape={`<svg viewBox="0 0 100 100" fill="none"><path d="M0 0 L100 0 L100 100 Z" fill="#fecdd3" /><path d="M-10 80 Q45 40 100 80" stroke="#fda4af" strokeWidth="5" fill="none" /><path d="M-10 90 Q45 50 100 90" stroke="#fda4af" strokeWidth="5" fill="none" /></svg>`}
                />
                <CategoryCard 
                  title="Free Events" 
                  count="36 events" 
                  iconGradient="linear-gradient(135deg, #ea580c 0%, #f97316 100%)" 
                  icon={<NewFreeIcon />} 
                  rightShape={`<svg viewBox="0 0 100 100" fill="none"><path d="M0 0 Q50 100 100 0 L100 100 L0 100 Z" fill="#fed7aa" /><rect x="15" y="20" width="8" height="8" rx="2" fill="#fdba74" /><rect x="33" y="20" width="8" height="8" rx="2" fill="#fdba74" /><rect x="51" y="20" width="8" height="8" rx="2" fill="#fdba74" /><rect x="69" y="20" width="8" height="8" rx="2" fill="#fdba74" /><rect x="15" y="38" width="8" height="8" rx="2" fill="#fdba74" /><rect x="33" y="38" width="8" height="8" rx="2" fill="#fdba74" /><rect x="51" y="38" width="8" height="8" rx="2" fill="#fdba74" /><rect x="69" y="38" width="8" height="8" rx="2" fill="#fdba74" /><rect x="15" y="56" width="8" height="8" rx="2" fill="#fdba74" /><rect x="33" y="56" width="8" height="8" rx="2" fill="#fdba74" /><rect x="51" y="56" width="8" height="8" rx="2" fill="#fdba74" /><rect x="69" y="56" width="8" height="8" rx="2" fill="#fdba74" /></svg>`}
                />
              </div>
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
                  <span style={{ color: '#c084fc' }}>WITH US.</span>
                </h2>                <p className="text-[13px] text-purple-200/60 leading-relaxed mb-7 max-w-[240px] lg:text-[15px] lg:max-w-[360px] lg:mb-0">Simple setup, fraud-proof tickets, and instant payouts.</p>
              </div>
              <div className="relative flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3 lg:shrink-0">
                <Link to="/host" className="text-zinc-900 font-normal text-[14px] px-6 py-3 rounded-xl lg:text-[15px] lg:px-8 lg:py-4 lg:w-full transition-colors" style={{ backgroundColor: '#c084fc' }}>Create an Event</Link>
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
