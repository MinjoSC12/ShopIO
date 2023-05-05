import "./socialBar.scss"
import "../../../src/assets/fontello-1944d49c/css/fontello.css"
import React from 'react';

const socialBar = () => {
  return (
    <div className="container-bar">
	<input type="checkbox" id="btn-social" />
	<label for="btn-social" className="fa fa-play"></label>
		<div className="icon-social">
			<a href="https://facebook.com" target="_blank" className="icon-facebook">
				<span id="title">Facebook</span>
			</a>
			<a href="https://youtube.com" target="_blank" className="icon-youtube-play">
				<span id="title">Youtube</span>
			</a>
			<a href="https://twitter.com" target="_blank" className="icon-twitter">
				<span id="title">Twitter</span>
			</a>
			<a href="https://pinterest.es" target="_blank" className="icon-pinterest">
				<span id="title">Pinterest</span>
			</a>
		</div>
	</div>
  );
};

export default socialBar;