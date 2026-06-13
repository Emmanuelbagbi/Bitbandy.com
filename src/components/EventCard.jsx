import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import './EventCard.css';
import { IoPerson } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const EventCard = ({ event, isPast }) => {
  const isFree = event.price === 'FREE';
  
  return (
    <div className="event-card-container">
      <div className="event-card-corner-bottom-left"></div>
      <div className="event-card-corner-bottom-right"></div>
      
      <div className="event-card-header">
        <div className="event-card-date">
          <span className="icon-circle icon-circle-dark">
            <Calendar size={14} />
          </span>
          <span>{event.date}</span>
        </div>
        <div className="event-card-countdown">
          <span className="icon-circle icon-circle-dark-small">
            <Clock size={12} />
          </span>
          <span className="whitespace-nowrap">{event.countdown || "Soon"}</span>
        </div>
      </div>
      
      <div className="event-card-image-link">
        <img alt={event.title} loading="lazy" className="event-card-img" src={event.image} />
        <div className="event-card-image-gradient"></div>
        <div className="event-card-type-badge">
          <span className="type-badge-dot"></span>
          <span>{event.category}</span>
        </div>
        {isFree && (
          <div className="absolute top-0.5 right-0.5 inline-flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            FREE
          </div>
        )}
        <div className="event-card-organizer-info">
          <span className="organizer-icon-circle">
            <IoPerson size={14} />
          </span>
          <span className="organizer-name">{event.organizer || "Organizer"}</span>
        </div>
      </div>
      
      <div className="event-card-body">
        <div className="event-card-details">
          <div className="event-card-title-link">
            <h2 className="event-card-title">{event.title}</h2>
          </div>
          <div className="event-card-location-wrapper">
            <div className="event-card-location-inner">
              <span className="location-icon-circle">
                <FaLocationDot  size={16} color="#9139f6" />
              </span>
              <span className="location-text">{event.location}</span>
            </div>
          </div>
        </div>
        <div className="event-card-action-link">
          <button className={`event-card-button ${isPast ? 'event-card-button-gray' : ''}`}>
            Attend Event <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
