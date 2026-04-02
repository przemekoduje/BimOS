import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2 className="footer-slogan">Więcej inżynierii,<br/>mniej biurokracji.</h2>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>BimOS</h4>
            <a href="#">Platforma</a>
            <a href="#">cKOB</a>
            <a href="#">Aktualności</a>
            <a href="#">Kalkulatory</a>
          </div>
          <div className="footer-column">
            <h4>Zasoby</h4>
            <a href="#">Baza Wiedzy</a>
            <a href="#">Dokumentacja</a>
            <a href="#">Prawo Budowlane</a>
            <a href="#">FAQ</a>
          </div>
          <div className="footer-column">
            <h4>Firma</h4>
            <a href="#">O nas</a>
            <a href="#">Kontakt</a>
            <a href="#">Zgłoś błąd</a>
            <a href="#">Regulamin</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
