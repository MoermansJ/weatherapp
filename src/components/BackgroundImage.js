import React from 'react';
import "./BackgroundImage.css";

function BackgroundImage({ image }) {
	console.log(image)

	return (
		<div>
			<img src={image.photos[0].src.landscape} alt={image.photos[0].alt} photographer_url={image.photos[0].photographer_url} className="background" />

		</div>
	)
}

export default BackgroundImage