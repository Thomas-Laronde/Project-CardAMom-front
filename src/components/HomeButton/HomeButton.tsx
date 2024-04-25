import { Link } from 'react-router-dom';
import './HomeButton.scss';
import React from 'react';
import Logo from '../../assets/HomeLogo.png';
function HomeButton() {
  return (
    <Link to="/" className="return-button">
      <img src={Logo} className="return-icone"></img>
    </Link>
  );
}
export default HomeButton;
