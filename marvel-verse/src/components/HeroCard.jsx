import React from 'react';
import './HeroCard.css';

const HeroCard = ({ image, name, description }) => {
  return (
    <div className="hero-card">
      <div className="hero-image-container">
        <img src={image} alt={name} className="hero-image" />
      </div>
      <div className='red-line'></div>
      <div className="hero-info">
        <h2 className="hero-name">{name}</h2>
        <p className="hero-description">{}</p>
      </div>
    </div>
  );
};

export default HeroCard;
