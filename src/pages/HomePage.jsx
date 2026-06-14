import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from '../components/MobileMenu';
import EventCard from '../components/EventCard';
import { Calendar, Clock } from 'lucide-react';
import { IoPerson } from "react-icons/io5";
import heroBackground from '../assets/Hero-background-img.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, A11y } from 'swiper/modules';
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
    title: 'Urban Plant Care 101',
    date: 'Sat, Jun 21',
    venue: 'Co-Create Hub',
    location: 'Lagos',
    price: 'FREE',
    category: 'Lifestyle',
    organizer: 'Green Thumb Events',
    countdown: '8 days',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=400&fit=crop',
  },
  {
    id: 'cmqb5c8os0001i8047mgm4cyr',
    title: 'Sunset Film Screening',
    date: 'Fri, Jun 27',
    venue: 'Freedom Park',
    location: 'Abuja',
    price: 'FREE',
    category: 'Entertainment',
    organizer: 'Lagos Film Club',
    countdown: '14 days',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop',
  },
  {
    id: 'cmqb9xyz00001abcdefghijk',
    title: 'Yoga in the Park',
    date: 'Sun, Jun 22',
    venue: 'Port Harcourt Gardens',
    location: 'Port Harcourt',
    price: '₦1,000',
    category: 'Health',
    organizer: 'Yoga Flow',
    countdown: '9 days',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
  },
  {
    id: 'cmqb10abc1234defghijklmn',
    title: 'Community Book Swap',
    date: 'Sat, Jun 29',
    venue: 'Ikeja City Mall',
    location: 'Lagos',
    price: 'FREE',
    category: 'Lifestyle',
    organizer: 'Book Lovers NG',
    countdown: '16 days',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?w=600&h=400&fit=crop',
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
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  
  // Category options for the buttons
  const categories = ['All Events', 'Music', 'Corporate', 'Sports', 'Comedy', 'Fashion', 'Education'];
  
  return (
    <section className="py-12">
      <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
        <div className="px-5 lg:px-0 mb-8">
          <div className="flex items-start justify-between gap-6 flex-col lg:flex-row">
            <div className="flex items-start gap-3 min-w-0">
              <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2L13.5 8.5L20 9L15 13L16.5 20L12 17.77L7.5 20L9 13L4 9L10.5 8.5L12 2z"></path>
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-normal text-purple-600 uppercase tracking-[0.15em] mb-1">TRENDING NEAR YOU</p>
                <h2 className="font-heading font-bold text-[24px] text-zinc-900">Top events everyone's talking about</h2>
                <p className="text-zinc-500 text-[14px] mt-2">Find the hottest concerts, festivals, sports and more happening near you.</p>
              </div>
            </div>
            <Link to="/discover" className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 border border-purple-200 text-purple-700 font-medium rounded-xl hover:bg-purple-50 transition-colors whitespace-nowrap">
              Browse all events
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {/* Category buttons */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide mt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white text-zinc-700 border border-zinc-200 hover:border-purple-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Events grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-5 lg:px-0">
          {trendingEvents.map((event) => (
            <Link key={event.id} to={`/events/${event.id}`} className="group">
              <EventCard event={event} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const FreeLowCostSection = () => {
  const swiperRef = React.useRef(null);

  return (
    <section className="py-8 bg-white">
      <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
        {/* Container with rounded corners and light background */}
        <div className="mx-5 lg:mx-0 rounded-3xl bg-purple-50/40 p-6 lg:p-8 relative overflow-hidden">
          {/* Decorative elements (curly line and star) */}
          <div className="absolute -right-4 top-10 w-32 h-24 text-purple-300 opacity-50">
            <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 30 Q 30 10, 50 30 T 90 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <div className="absolute -right-1 top-28 w-6 h-6 text-purple-400">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.5 8.5L20 9L15 13L16.5 20L12 16L7.5 20L9 13L4 9L10.5 8.5L12 2Z"/>
            </svg>
          </div>
          
          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-4 min-w-0">
              <div className="hidden lg:flex shrink-0 h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2Z"></path>
                  <path d="M7 10h.01"></path>
                  <path d="M10 10h4"></path>
                </svg>
              </div>
              <div className="min-w-0">
                <h2 className="font-heading font-bold text-xl text-gray-900">Budget Friendly Picks</h2>
                <p className="text-gray-500 text-sm">Handpicked events that are fun and easy on your wallet.</p>
              </div>
            </div>
            <Link to="/discover?category=free" className="hidden lg:flex items-center gap-2 text-purple-600 font-semibold text-sm hover:text-purple-700 transition-colors shrink-0">
              See more free events
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Event Cards */}
          <div className="pb-4">
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={16}
              slidesPerView={1}
              pagination={{ 
                clickable: true,
                el: '.custom-swiper-pagination',
                bulletClass: 'swiper-pagination-bullet w-2 h-2 rounded-full bg-purple-300',
                bulletActiveClass: 'swiper-pagination-bullet-active w-8 h-2 rounded-full bg-purple-600',
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
              }}
              className="w-full"
            >
              {freeLowCostEvents.map((event) => (
                <SwiperSlide key={event.id}>
                  <Link to={`/events/${event.id}`} className="block">
                    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col lg:flex-row">
                      {/* Image */}
                      <div className="relative w-full lg:w-2/5 shrink-0">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-48 lg:h-full object-cover rounded-t-3xl lg:rounded-tl-3xl lg:rounded-tr-none"
                        />
                        {event.price === 'FREE' ? (
                          <div className="absolute top-4 left-4 bg-green-100 text-green-700 px-3 py-1.5 rounded-xl font-semibold text-xs">
                            FREE
                          </div>
                        ) : (
                          <div className="absolute top-4 left-4 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-xl font-semibold text-xs">
                            {event.price}
                          </div>
                        )}
                      </div>
                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                              {event.category === 'Lifestyle' && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                              )}
                              {event.category === 'Entertainment' && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </svg>
                              )}
                              {event.category === 'Health' && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                </svg>
                              )}
                            </div>
                            <span className="text-purple-600 font-semibold text-sm capitalize">{event.category}</span>
                          </div>
                          <h3 className="font-heading font-bold text-2xl text-gray-900 mb-6">{event.title}</h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                              <span className="font-medium">{event.date} • 10:00 AM</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                              </svg>
                              <span className="font-medium">{event.venue}, {event.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm mt-8">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </div>
                          View details
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          {/* Pagination */}
          <div className="custom-swiper-pagination flex justify-center gap-2 mt-4"></div>
        </div>
      </div>
    </section>
  );
};

// Category data: name, link, gradient, SVG icon, event count
const categoriesBrowse = [
  {
    name: 'Music',
    href: '/discover?category=music',
    gradient: 'linear-gradient(135deg, #3b0764 0%, #6d28d9 100%)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 18 C8 10 24 10 24 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <rect x="4.5" y="17" width="6" height="9" rx="3" fill="rgba(167,139,250,0.35)" stroke="white" strokeWidth="1.8" />
        <rect x="21.5" y="17" width="6" height="9" rx="3" fill="rgba(167,139,250,0.35)" stroke="white" strokeWidth="1.8" />
      </svg>
    ),
    eventCount: 48,
  },
  {
    name: 'Comedy',
    href: '/discover?category=comedy',
    gradient: 'linear-gradient(135deg, #78350f 0%, #d97706 100%)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" stroke="white" strokeWidth="1.8" fill="rgba(251,191,36,0.1)" />
        <circle cx="12" cy="13" r="1.8" fill="white" />
        <circle cx="20" cy="13" r="1.8" fill="white" />
        <path d="M10 18 Q16 27 22 18" stroke="white" strokeWidth="1.8" fill="rgba(251,191,36,0.25)" strokeLinecap="round" />
        <circle cx="9.5" cy="18" r="2" fill="rgba(251,191,36,0.45)" />
        <circle cx="22.5" cy="18" r="2" fill="rgba(251,191,36,0.45)" />
      </svg>
    ),
    eventCount: 19,
  },
  {
    name: 'Corporate',
    href: '/discover?category=corporate',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="5" y="13" width="22" height="15" rx="3" stroke="white" strokeWidth="1.8" fill="rgba(56,189,248,0.12)" />
        <path d="M12 13 V10 Q12 7.5 14 7.5 H18 Q20 7.5 20 10 V13" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <line x1="5" y1="20.5" x2="27" y2="20.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="14" y="18.5" width="4" height="4" rx="1.2" stroke="white" strokeWidth="1.5" fill="rgba(56,189,248,0.4)" />
      </svg>
    ),
    eventCount: 34,
  },
  {
    name: 'Parties',
    href: '/discover?category=parties',
    gradient: 'linear-gradient(135deg, #500724 0%, #be185d 100%)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M5 27 L17 12 L21 16 Z" stroke="white" strokeWidth="1.8" fill="rgba(251,113,133,0.2)" strokeLinejoin="round" strokeLinejoin="round" />
        <circle cx="21" cy="9" r="3" fill="rgba(251,191,36,0.85)" />
        <circle cx="26" cy="15" r="2.2" fill="rgba(251,113,133,0.8)" />
        <circle cx="18" cy="5" r="1.8" fill="rgba(167,139,250,0.85)" />
        <circle cx="27" cy="7.5" r="1.5" fill="rgba(132,204,22,0.85)" />
        <path d="M19 13 Q23 10 25 13 Q27 16 23 18" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
    eventCount: 27,
  },
  {
    name: 'Sports',
    href: '/discover?category=sports',
    gradient: 'linear-gradient(135deg, #14532d 0%, #16a34a 100%)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M20 3 L11 17 H17.5 L13 29 L23 14 H16.5 Z" stroke="white" strokeWidth="1.8" fill="rgba(132,204,22,0.25)" strokeLinejoin="round" strokeLinejoin="round" />
      </svg>
    ),
    eventCount: 15,
  },
  {
    name: 'Learning',
    href: '/discover?category=education',
    gradient: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 8 Q11 7 5 9 L5 24 Q11 22 16 24 Z" stroke="white" strokeWidth="1.8" fill="rgba(56,189,248,0.15)" strokeLinejoin="round" />
        <path d="M16 8 Q21 7 27 9 L27 24 Q21 22 16 24 Z" stroke="white" strokeWidth="1.8" fill="rgba(56,189,248,0.08)" strokeLinejoin="round" />
        <line x1="16" y1="8" x2="16" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="13.5" x2="13.5" y2="13" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="8" y1="17" x2="13.5" y2="16.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="18.5" y1="13.5" x2="24" y2="13" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="18.5" y1="17" x2="24" y2="16.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    eventCount: 22,
  },
  {
    name: 'Fashion',
    href: '/discover?category=fashion',
    gradient: 'linear-gradient(135deg, #4a044e 0%, #db2777 100%)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 5 Q20 5 20 9 Q20 12 16 12" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M16 12 L5 22 Q4 24 5.5 25 H26.5 Q28 24 27 22 L16 12" stroke="white" strokeWidth="1.8" fill="rgba(236,72,153,0.18)" strokeLinejoin="round" />
      </svg>
    ),
    eventCount: 11,
  },
  {
    name: 'Free Events',
    href: '/discover?category=free',
    gradient: 'linear-gradient(135deg, #451a03 0%, #b45309 100%)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4 L18.8 12 H27 L20.6 16.8 L23 25 L16 20.5 L9 25 L11.4 16.8 L5 12 H13.2 Z" stroke="white" strokeWidth="1.8" fill="rgba(251,191,36,0.22)" strokeLinejoin="round" />
        <circle cx="25" cy="5.5" r="1.8" fill="rgba(251,191,36,0.75)" />
        <circle cx="7.5" cy="7" r="1.2" fill="rgba(251,191,36,0.6)" />
        <circle cx="27" cy="23" r="1" fill="rgba(251,191,36,0.5)" />
      </svg>
    ),
    eventCount: 36,
  },
];

const BrowseCategories = () => {
  return (
    <section className="py-12 px-0 lg:px-0">
      <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-5 mx-5 lg:mx-0">
          <h2 className="font-heading text-[18px] tracking-wide text-zinc-900 dark:text-zinc-50">
            BROWSE
          </h2>
          <Link
            className="text-[12px] font-semibold text-brand-accent card-press flex items-center gap-1"
            to="/discover"
          >
            All categories
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
              className="inline align-middle shrink-0"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-3 mx-5 lg:mx-0">
          {categoriesBrowse.map((category) => (
            <Link
              key={category.name}
              className="card-press relative flex items-center gap-3 h-[68px] lg:h-[80px] px-4 rounded-xl overflow-hidden"
              style={{ background: category.gradient }}
              to={category.href}
            >
              {/* Noise overlay */}
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: '120px',
                }}
                aria-hidden="true"
              />
              {/* Icon */}
              <span className="relative shrink-0 z-10">{category.icon}</span>
              {/* Text */}
              <div className="relative z-10 flex flex-col items-start min-w-0">
                <span className="text-[13px] font-semibold text-white leading-snug">
                  {category.name}
                </span>
                <span className="text-[11px] text-white/50 font-medium">
                  {category.eventCount} events
                </span>
              </div>
            </Link>
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
      <header className="container mx-auto px-5 lg:px-8 py-4 sticky top-0 bg-white/80 backdrop-blur-xl z-50 border-b border-zinc-100">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="shrink-0">
            <img alt="Bitbandy" className="h-10" src="https://bitbandy.com/_next/image?url=%2Fimages%2Fbitbandy.png&w=256&q=75" />
          </Link>

          <nav className="hidden lg:flex items-center gap-6 shrink-0">
            <Link to="/events" className="text-[14px] font-medium text-purple-700 bg-purple-50 px-4 py-2 rounded-xl">Events</Link>
            <Link to="/about" className="text-[14px] font-medium text-zinc-600 hover:text-zinc-900">About Us</Link>
            <Link to="/contact" className="text-[14px] font-medium text-zinc-600 hover:text-zinc-900">Contact</Link>
            <Link to="/how-it-works" className="text-[14px] font-medium text-zinc-600 hover:text-zinc-900">How it works</Link>
          </nav>

          <form className="hidden lg:flex flex-1 max-w-[420px] items-center gap-3 h-11 rounded-full px-4 bg-zinc-50 border border-zinc-200 ml-8">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search events, artists, venues..."
              className="flex-1 bg-transparent text-[14px] text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/login" className="hidden lg:flex items-center gap-2 h-11 px-4 rounded-xl text-[14px] font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Log In
            </Link>
            <Link to="/signup" className="hidden lg:flex items-center gap-2 h-11 px-6 rounded-xl text-[14px] font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors">
              Sign Up
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              className="lg:hidden relative z-70 w-10 h-10 flex items-center justify-center text-zinc-600"
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
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-8 h-8 rounded-full bg-orange-400"></div>
              <div className="absolute top-16 right-4 w-16 h-24 opacity-30">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 50 Q 25 25 50 50 T 100 50" stroke="#9139f6" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M0 65 Q 25 40 50 65 T 100 65" stroke="#9139f6" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M0 80 Q 25 55 50 80 T 100 80" stroke="#9139f6" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </div>
              
              <div className="relative px-6 pt-8 pb-8 lg:px-12 lg:pt-12 lg:pb-12">
                <div className="relative z-10">
                  <p className="text-[11px] font-normal text-purple-600 uppercase tracking-[0.2em] mb-4">ACCRA · KUMASI · TAMALE · GHANA</p>
                  <h1 className="font-heading font-bold text-[42px] leading-[1.05] tracking-tight text-zinc-900 mb-4 lg:text-[60px]">
                    <br /><br />AROUND YOU<br />WITH <span className="text-purple-600">Bitbandy!</span>
                  </h1>
                  <p className="text-[15px] text-zinc-700 leading-relaxed max-w-md mb-7 lg:text-[16px]">Music, comedy, corporate, sports, everything happening near you, all in one place.</p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                    <Link to="/discover" className="bg-purple-600 text-white font-semibold text-[15px] px-8 py-3.5 rounded-xl hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-lg shadow-purple-200">
                      Browse Events
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                    <Link to="/host" className="text-[15px] font-semibold text-zinc-800 bg-white border border-zinc-200 px-6 py-3.5 rounded-xl hover:bg-zinc-50 transition-colors flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
                      </svg>
                      Create an Event
                    </Link>
                  </div>
                  
                  {/* Social proof */}
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" alt="User" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-zinc-800">50K+ people discovering events</p>
                      <p className="text-[12px] text-zinc-500">across Nigeria and beyond</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>





        {/* Trending Section */}
        <TrendingSection />

        {/* For You Section */}
        <section className="py-8">
          <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
            <div className="px-5 lg:px-0 mb-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-heading font-bold text-lg text-zinc-900">FOR YOU</h2>
                    <p className="text-zinc-500 text-xs">Events we think you'll love</p>
                  </div>
                </div>
                <Link to="/discover" className="shrink-0 bg-purple-100 text-purple-700 font-semibold px-3 py-1.5 rounded-md hover:bg-purple-200 transition-colors text-xs whitespace-nowrap">Browse all</Link>
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
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-heading font-bold text-lg text-zinc-900">NEAR YOU</h2>
                    <p className="text-zinc-500 text-xs">Port Harcourt · 4 nearby events</p>
                  </div>
                </div>
                <Link to="/discover" className="shrink-0 bg-purple-100 text-purple-700 font-semibold px-3 py-1.5 rounded-md hover:bg-purple-200 transition-colors text-xs whitespace-nowrap">Browse all</Link>
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

        {/* <BrowseCategories /> */}

        {/* For Organizers Section */}
        <section className="px-5 lg:px-0">
          <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4a1d96] to-[#1e1b4b] px-6 py-10 lg:px-12 lg:py-12">
              {/* Decorative background elements */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 1000 400" className="w-full h-full">
                  <circle cx="100" cy="200" r="200" fill="white" opacity="0.1"/>
                  <circle cx="800" cy="100" r="150" fill="white" opacity="0.08"/>
                </svg>
              </div>
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Left content */}
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-purple-300 uppercase tracking-[0.2em] mb-4">FOR ORGANIZERS</p>
                  <h2 className="font-heading font-bold text-[28px] lg:text-[40px] text-white mb-4">Become an Organizer</h2>
                  <p className="text-[14px] text-purple-200/90 max-w-md mb-6">Create events, sell tickets, manage attendees and grow your community with BitBandy.</p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Link to="/host" className="bg-purple-600 text-white font-semibold text-[15px] px-8 py-3.5 rounded-xl hover:bg-purple-500 transition-colors flex items-center gap-2 shadow-lg shadow-purple-900/30">
                      Create an Event
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                    <Link to="/for-organizers" className="text-[14px] font-semibold text-purple-200 hover:text-white transition-colors flex items-center gap-2">
                      Learn more about organizing
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                {/* Right stats and phone mockup (desktop only) */}
                <div className="flex items-start gap-8 lg:flex-1 lg:justify-end">
                  {/* Stats grid */}
                  <div className="hidden lg:grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <p className="text-[24px] font-bold text-white mt-2">50K+</p>
                      <p className="text-[12px] text-purple-200">Tickets Sold</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <p className="text-[24px] font-bold text-white mt-2">1K+</p>
                      <p className="text-[12px] text-purple-200">Events Hosted</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                      <p className="text-[24px] font-bold text-white mt-2">₦20M+</p>
                      <p className="text-[12px] text-purple-200">Revenue Generated</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                      </svg>
                      <p className="text-[24px] font-bold text-white mt-2">99.9%</p>
                      <p className="text-[12px] text-purple-200">Uptime & Support</p>
                    </div>
                  </div>
                  
                  {/* Phone mockup */}
                  <div className="hidden lg:block relative w-[240px] h-[380px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-700 rounded-[32px] p-2 shadow-2xl">
                      <div className="w-full h-full bg-black rounded-[28px] overflow-hidden flex flex-col">
                        <div className="bg-zinc-900 p-4 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                          </div>
                          <div className="text-white text-xs font-medium">Your Event</div>
                        </div>
                        <div className="flex-1 bg-gradient-to-br from-zinc-800 to-zinc-900 p-4">
                          <div className="text-white text-xs mb-2">Sales Overview</div>
                          <div className="text-white text-2xl font-bold mb-1">₦2,560,000</div>
                          <div className="text-green-400 text-xs mb-4">+32.5% vs last month</div>
                          <div className="h-20 flex items-end gap-1">
                            <div className="flex-1 bg-purple-500/50 rounded-t-md" style={{ height: '40%' }}></div>
                            <div className="flex-1 bg-purple-500/50 rounded-t-md" style={{ height: '60%' }}></div>
                            <div className="flex-1 bg-purple-500 rounded-t-md" style={{ height: '85%' }}></div>
                            <div className="flex-1 bg-purple-500/50 rounded-t-md" style={{ height: '50%' }}></div>
                            <div className="flex-1 bg-purple-500/50 rounded-t-md" style={{ height: '70%' }}></div>
                          </div>
                          <div className="mt-6 flex items-center justify-between">
                            <div>
                              <div className="text-white text-xs">Tickets Sold</div>
                              <div className="text-white text-lg font-bold">1,250</div>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center">
                              <div className="w-8 h-8 rounded-full border-4 border-purple-600 border-l-transparent rotate-45"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section><br /> <br />



        {/* Footer */}
        <footer className="bg-zinc-50 pt-12 pb-8">
          <div className="lg:max-w-[1280px] lg:mx-auto lg:px-8">
            <div className="px-5 lg:px-0 mb-10 grid grid-cols-1 lg:grid-cols-6 gap-10">
              {/* Brand */}
              <div className="lg:col-span-2">
                <Link to="/" className="shrink-0 inline-block mb-4">
                  <img alt="Bitbandy" className="h-10" src="https://bitbandy.com/_next/image?url=%2Fimages%2Fbitbandy.png&w=256&q=75" />
                </Link>
                <p className="text-[13px] text-zinc-600 leading-relaxed mb-5">The easiest way to discover and book amazing events across Nigeria and beyond.</p>
                <div className="flex items-center gap-4">
                  <SocialIcon href="#" icon="instagram" />
                  <SocialIcon href="#" icon="x" />
                  <SocialIcon href="#" icon="tiktok" />
                  <a href="#" className="w-8 h-8 rounded-lg bg-zinc-200 flex items-center justify-center hover:bg-zinc-300 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Platform */}
              <div>
                <h4 className="text-[11px] font-semibold text-purple-600 uppercase tracking-[0.15em] mb-4">Platform</h4>
                <ul className="space-y-3">
                  {['Browse Events', 'Categories', 'For Organizers', 'Create an Event', 'My Tickets', 'Pricing'].map((link) => (
                    <li key={link}>
                      <Link to="#" className="text-[13px] text-zinc-600 hover:text-zinc-900 transition-colors">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-[11px] font-semibold text-purple-600 uppercase tracking-[0.15em] mb-4">Company</h4>
                <ul className="space-y-3">
                  {['About BitBandy', 'Careers', 'Blog', 'Contact Us', 'Partners', 'Press Kit'].map((link) => (
                    <li key={link}>
                      <Link to="#" className="text-[13px] text-zinc-600 hover:text-zinc-900 transition-colors">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-[11px] font-semibold text-purple-600 uppercase tracking-[0.15em] mb-4">Resources</h4>
                <ul className="space-y-3">
                  {['Help Centre', 'Event Tips', 'Community', 'Support', 'FAQs'].map((link) => (
                    <li key={link}>
                      <Link to="#" className="text-[13px] text-zinc-600 hover:text-zinc-900 transition-colors">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal + Newsletter */}
              <div>
                <div className="mb-8">
                  <h4 className="text-[11px] font-semibold text-purple-600 uppercase tracking-[0.15em] mb-4">Legal</h4>
                  <ul className="space-y-3">
                    {['Terms of Service', 'Privacy Policy', 'Cookies Policy', 'Refund Policy'].map((link) => (
                      <li key={link}>
                        <Link to="#" className="text-[13px] text-zinc-600 hover:text-zinc-900 transition-colors">{link}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold text-purple-600 uppercase tracking-[0.15em] mb-4">Stay in the Loop</h4>
                  <p className="text-[12px] text-zinc-600 mb-3">Get the best events, updates and exclusive offers in your inbox.</p>
                  <div className="space-y-2">
                    <input type="email" placeholder="Enter your email" className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 text-[13px] focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-white" />
                    <button className="w-full bg-purple-600 text-white text-[13px] font-semibold py-2.5 rounded-lg hover:bg-purple-700 transition-colors">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 lg:px-0 border-t border-zinc-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-[12px] text-zinc-500">© 2026 BitBand. All rights reserved.</p>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-zinc-500">Made with</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#a855f7" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="text-[12px] text-zinc-500">in Nigeria</span>
                <span className="text-[12px] text-zinc-500">🇳🇬</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="10" r="8" />
                  <path d="m12 18 4 4" />
                  <path d="M8 22l4-4" />
                </svg>
                <span>NG</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default BitbandyHomepage;
