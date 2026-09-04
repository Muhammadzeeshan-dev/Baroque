import React from 'react';

const AnnouncementBar = () => {
  return (
    <div className="announcement-bar">
      <div className="ticker-wrapper">
        <span className="ticker-item">FOR INTERNATIONAL WEBSITE VISIT WWW.BAROQUE.COM.PK</span>
        <span className="ticker-item">•</span>
        <span className="ticker-item">SALE UPTO 50% OFF IS LIVE NOW! SHOP BEFORE STOCK LASTS!</span>
        <span className="ticker-item">•</span>
        <span className="ticker-item">CALL US AT: UAN 111-303-303</span>
        <span className="ticker-item">•</span>
        {/* Repeat for continuous smooth scrolling */}
        <span className="ticker-item">FOR INTERNATIONAL WEBSITE VISIT WWW.BAROQUE.COM.PK</span>
        <span className="ticker-item">•</span>
        <span className="ticker-item">SALE UPTO 50% OFF IS LIVE NOW! SHOP BEFORE STOCK LASTS!</span>
        <span className="ticker-item">•</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;