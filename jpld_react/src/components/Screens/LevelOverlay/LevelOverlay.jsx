/*
 * © 2025 [Hannah Carolina Fabian Valensia, Paola Ortega Bravo, Martín García Torres, Carlos Jimenez Zepeda, Santiago Arreola Munguía, Demián Velasco Gómez Llanos, Andrés González Gómez, Rodrigo López Gómez, Nahui Metztli Dado Delgadillo, Ana Mariem Pérez Chacón, Karla Avila Navarro, Ana María Guzman Solís]
 * Licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
 * 
 * Contributors must be credited when using or modifying this file.
 * Commercial use or redistribution without permission is prohibited.
 * 
 * Asset Attributions:
 * - Some SVG icons provided by Vecteezy (https://www.vecteezy.com)
 *   License: Free for personal and commercial use with attribution
 * 
 * Full license text: https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
 */


// src/Screens/LevelOverlay/LevelOverlay.jsx
import React, { useRef, useEffect } from "react";
import "./style.css";
import { IconButton } from "../../Buttons/IconButton/IconButton.jsx";
import { ReactComponent as Microphone } from "../../../assets/microphone.svg";
import { ReactComponent as Next } from "../../../assets/next.svg";
import { ReactComponent as Repeat } from "../../../assets/repeat.svg";

import { useAppContext, setScene } from "../../../context/DirectoryProvider.jsx";

// Audio files from public folder
 const audioSets = {
    0: ["/sounds/monkey.mp3", "/sounds/lion.mp3", "/sounds/elephant.mp3"],
    1: ["/sounds/pencil.mp3", "/sounds/backpack.mp3", "/sounds/ball.mp3"],
    2: ["/sounds/apple.mp3", "/sounds/bread.mp3", "/sounds/fish.mp3"],
    3: ["/sounds/mom.mp3", "/sounds/bed.mp3", "/sounds/dad.mp3"],
    4: ["/sounds/hands.mp3", "/sounds/toothbrush.mp3", "/sounds/feet.mp3"],
    5: ["/sounds/airplane.mp3", "/sounds/bike.mp3", "/sounds/boat.mp3"],
    6: ["/sounds/ball_play.mp3", "/sounds/swing.mp3", "/sounds/slide.mp3"],
  };

export const LevelOverlay = ({ text }) => {
  const preloadedAudiosRef = useRef([]);
  const { state, dispatch } = useAppContext();

  // Play audio when Repeat button is clicked
  const handleRepeatClick = () => {
    const currentLevel = state.level; // grab current level from context
    const src = audioSets[currentLevel]?.[state.scene];

    const audio = new Audio(src);
    audio.volume = state.settings.volume;
    audio.currentTime = 0;

    audio
      .play()
      .then(() => console.log("Audio playing:", src))
      .catch((err) => console.error("Audio playback failed:", err));
  };

  // Move to next sublevel
  const handleNextClick = async () => {
    const nextScene = state.scene < 2? state.scene+1 : 0;

    try {
      await setScene(dispatch, nextScene);
      console.log(`Sublevel changed to: ${state.scene}`);
    } catch (error) {
      console.error("Failed to change sublevel:", error);
    }
  };

  return (
    <div className="overlay-container">
      <p className="overlay-text">{text}</p>
      <div className="overlay-buttons">
        <IconButton icon={Microphone} to="/game" className="btn-overlay" />
        <IconButton
          icon={Repeat}
          onClick={handleRepeatClick}
          className="btn-overlay"
        />
        <IconButton
          icon={Next}
          onClick={handleNextClick}
          className="btn-overlay"
        />
      </div>
    </div>
  );
};
