import React from "react";
import Tilt from "react-parallax-tilt";
import brain from '../assets/brain.png';

export default function Logo() {
  return <Tilt className="Tilt parallax-effect-glare-scale ml3">
    <img src={brain} alt="logo" />
  </Tilt>
}