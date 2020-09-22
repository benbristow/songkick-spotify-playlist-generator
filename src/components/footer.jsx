import React from 'react';

export const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer__copyright">
        &copy; { new Date().getFullYear() } <a href="https://www.benbristow.co.uk" target="_blank" rel="noopener noreferrer" >Ben Bristow</a><br/>
        Not affiliated or associated with the fine folks over at <a href="https://www.songkick.com" target="_blank" rel="noopener noreferrer" >Songkick</a> or <a href="https://www.spotify.com" target="_blank" rel="noopener noreferrer" >Spotify</a>
      </div>

      <a className="footer__songkick" href="https://www.songkick.com" target="_blank" rel="noopener noreferrer">
        <img src="img/powered-by-songkick.svg" alt="Powered By Songkick" />
      </a>
    </div>
  </footer>
);