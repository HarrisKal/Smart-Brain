import React from "react";

const FaceRecognition = ({ imageUrl, box }) => {
  return <div className="center ma">
    <div className="absolute mt2">
      <div className="relative">
        <img id="input-image" src={imageUrl} alt="" width='auto' height='350px' />
        <div className="bounding-box" style={{
          left: box.leftCol,
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow
        }}></div>
      </div>
    </div>
  </div>

}

export default FaceRecognition;