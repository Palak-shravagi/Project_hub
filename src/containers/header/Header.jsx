import React from 'react';
import people from '../../assets/people.png';
import ai from '../../assets/illustration-intro.png';
import './header.css';

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Where Developers stores their projects</h1>
      <p>All the student developers and Teachers build,ship and maintain there projects on Project Hub. </p>

      <div className="gpt3__header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div>

      
    </div>

    <div className="gpt3__header-image">
      <img src={ai} />
    </div>
  </div>
);

export default Header;
