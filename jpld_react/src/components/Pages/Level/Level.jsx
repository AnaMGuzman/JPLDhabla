/*
 * © 2025 [Hannah Carolina Fabian Valensia, Paola Ortega Bravo, Martín García Torres, Carlos Jimenez Zepeda, Santiago Arreola Munguía, Demián Velasco Gómez Llanos, Andrés González Gómez, Rodrigo López Gómez, Ramón Alejandro Briseño Martínez, Nahui Metztli Dado Delgadillo, Ana Mariem Pérez Chacón, Karla Avila Navarro, Ana María Guzman Solís]
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



// src/pages/Level/Level.jsx
import React, { useState, useEffect } from "react";
import "./style.css";
import { LevelOverlay } from "../../Screens/LevelOverlay/LevelOverlay.jsx";
import { useAppContext } from "../../../context/DirectoryProvider.jsx";
import { Gear } from "../../Buttons/Gear/Gear.jsx";
import { InGameConfig } from "../../Screens/InGameConfig/InGameConfig.jsx";
import { Flechas } from "../../Frames/Flechas/Flechas.jsx";

// ==== BACKGROUNDS ====
import { ReactComponent as JungleBackground } from "../../../assets/jungle_back.svg";
import { ReactComponent as StadiumBackground } from "../../../assets/school_back.svg";
import { ReactComponent as BeachBackground } from "../../../assets/beach_back.svg";
import { ReactComponent as HouseBackground } from "../../../assets/house_back.svg";
import { ReactComponent as HygieneBackground } from "../../../assets/hygiene_back.svg";
import { ReactComponent as TransportBackground } from "../../../assets/transport_back.svg";
import { ReactComponent as ParkBackground } from "../../../assets/park_back.svg";

// ==== ANIMALS / ITEMS ====
import { ReactComponent as Lion } from "../../../assets/lion.svg";
import { ReactComponent as Monkey } from "../../../assets/monkey.svg";
import { ReactComponent as Elephant } from "../../../assets/elephant.svg";
import { ReactComponent as Pencil } from "../../../assets/pencil.svg";
import { ReactComponent as Backpack } from "../../../assets/backpack.svg";
import { ReactComponent as Ball } from "../../../assets/ball.svg";
import { ReactComponent as Apple } from "../../../assets/apple.svg";
import { ReactComponent as Bread } from "../../../assets/bread.svg";
import { ReactComponent as Fish } from "../../../assets/fish.svg";
import { ReactComponent as Mom } from "../../../assets/mom.svg";
import { ReactComponent as Bed } from "../../../assets/bed.svg";
import { ReactComponent as Dad } from "../../../assets/dad.svg";
import { ReactComponent as Hands } from "../../../assets/hands.svg";
import { ReactComponent as Toothbrush } from "../../../assets/toothbrush.svg";
import { ReactComponent as Feet } from "../../../assets/feet.svg";
import { ReactComponent as Airplane } from "../../../assets/airplane.svg";
import { ReactComponent as Bike } from "../../../assets/bike.svg";
import { ReactComponent as Boat } from "../../../assets/boat.svg";
import { ReactComponent as BallPlay } from "../../../assets/ball_play.svg";
import { ReactComponent as Swing } from "../../../assets/swing.svg";
import { ReactComponent as Slide } from "../../../assets/slide.svg";

export const Level = () => {
  const { state } = useAppContext();
  const { level = 0, difficulty = 1, scene = 0 } = state; // scene is 0-based

  const [showConfig, setShowConfig] = useState(false);
  const handleGearClick = () => setShowConfig((p) => !p);
  const [animateIntro, setAnimateIntro] = useState(true);

  // 🔤 PHRASES: [words, short sentences, long sentences] per level
  const phrases = {
    0: [
      ["MO-NO", "LE-ÓN", "E-LE-FAN-TE"],
      ["EL MO-NO SAL-TA.", "EL LE-ÓN RU-GE.", "EL E-LE-FAN-TE CA-MI-NA."],
      [
        "EL MO-NO SAL-TA DE RA-MA EN RA-MA MIENTRAS GRI-TA FUER-TE.",
        "EL LE-ÓN RU-GE EN ME-DIO DE LA SEL-VA CUAN-DO VE UNA PRE-SA.",
        "EL E-LE-FAN-TE CA-MI-NA LEN-TA-MEN-TE POR EL RÍ-O CON SU TROM-PA AL-ZA-DA.",
      ],
    ],
    1: [
      ["LÁ-PIZ", "MO-CHI-LA", "PE-LO-TA"],
      ["TEN-GO UN LÁ-PIZ A-MA-RI-LLO.", "LA MO-CHI-LA ES GRAN-DE.", "LA PE-LO-TA RU-E-DA."],
      [
        "EL NI-ÑO U-SA UN LÁ-PIZ A-MA-RI-LLO PA-RA ES-CRI-BIR SU NOM-BRE.",
        "MI MO-CHI-LA ES-TÁ LLE-NA DE LI-BROS Y CO-LO-RES.",
        "LA PE-LO-TA RU-E-DA RÁ-PI-DO POR EL CAM-PO Y CA-E EN LA POR-TE-RÍ-A.",
      ],
    ],
    2: [
      ["MA-NZA-NA", "PAN", "PEZ"],
      ["QUIE-RO UNA MA-NZA-NA.", "EL PAN ES-TÁ CA-LIEN-TE.", "EL PEZ NA-DA."],
      [
        "LA NI-ÑA CO-ME UNA MA-NZA-NA RO-JA POR-QUE TIE-NE HAM-BRE.",
        "EL PAN RE-CIÉN HOR-NEA-DO HUE-LE DE-LI-CIO-SO Y ES-TÁ SUA-VE.",
        "EL PEZ NA-DA RÁ-PI-DO EN EL MAR MIENTRAS ES-QUI-VA LAS O-LAS.",
      ],
    ],
    3: [
      ["MA-MÁ", "CA-MA", "PA-PÁ"],
      ["MA-MÁ CO-CI-NA.", "LA CA-MA ES-TÁ TEN-DI-DA.", "MI PA-PÁ DUER-ME."],
      [
        "MI MA-MÁ CO-CI-NA AR-ROZ MIENTRAS YO LA A-YU-DO.",
        "LA CA-MA TIE-NE UNA CO-BI-JA RO-JA Y MU-CHOS CO-JI-NES.",
        "MI PA-PÁ DUER-ME TRAN-QUI-LO EN SU CUAR-TO.",
      ],
    ],
    4: [
      ["MA-NOS", "CE-PI-LLO", "PI-ES"],
      ["LÁ-VA-TE LAS MA-NOS.", "U-SO EL CE-PI-LLO DE DIEN-TES.", "MIS PIES COR-REN."],
      [
        "DE-BE-MOS LA-VAR-NOS LAS MA-NOS AN-TES DE CO-MER PA-RA NO EN-FER-MAR-NOS.",
        "CA-DA MA-ÑA-NA U-SO MI CE-PI-LLO DE DIEN-TES CON PAS-TA DE MEN-TA.",
        "MIS PIES CO-RREN RÁ-PI-DO CUAN-DO JU-E-GO EN EL PAR-QUE.",
      ],
    ],
    5: [
      ["A-VIÓN", "BI-CI-CLE-TA", "BAR-CO"],
      ["EL A-VIÓN VUE-LA.", "LA BI-CI-CLE-TA ES A-ZUL.", "EL BAR-CO NA-VE-GA."],
      [
        "EL A-VIÓN DES-PE-GA DES-DE LA PIS-TA Y SU-BE EN-TRE LAS NU-BES.",
        "EL NI-ÑO MON-TA SU BI-CI-CLE-TA EN EL PAR-QUE CA-DA TAR-DE.",
        "EL BAR-CO NA-VE-GA LEN-TO POR EL MAR HAS-TA LLE-GAR A PUER-TO.",
      ],
    ],
    6: [
      ["PE-LO-TA", "CO-LUM-PIO", "RE-SBA-LA-DI-LLA"],
      ["LAN-ZA LA PE-LO-TA.", "ME SU-BO AL CO-LUM-PIO.", "BA-JA POR LA RE-SBA-LA-DI-LLA."],
      [
        "JU-GA-MOS CON LA PE-LO-TA Y CO-RRE-MOS TO-DOS JUNTOS.",
        "EL NI-ÑO SU-BE AL CO-LUM-PIO Y SE BA-LAN-CEA MUY A-LTO.",
        "LA NI-ÑA BA-JA POR LA RE-SBA-LA-DI-LLA Y RÍ-E CON A-LE-GRÍ-A.",
      ],
    ],
  };

  const animalSets = {
    0: [Monkey, Lion, Elephant],
    1: [Pencil, Backpack, Ball],
    2: [Apple, Bread, Fish],
    3: [Mom, Bed, Dad],
    4: [Hands, Toothbrush, Feet],
    5: [Airplane, Bike, Boat],
    6: [BallPlay, Swing, Slide],
  };

  const audioSets = {
    0: ["/sounds/monkey.mp3", "/sounds/lion.mp3", "/sounds/elephant.mp3"],
    1: ["/sounds/pencil.mp3", "/sounds/backpack.mp3", "/sounds/ball.mp3"],
    2: ["/sounds/apple.mp3", "/sounds/bread.mp3", "/sounds/fish.mp3"],
    3: ["/sounds/mom.mp3", "/sounds/bed.mp3", "/sounds/dad.mp3"],
    4: ["/sounds/hands.mp3", "/sounds/toothbrush.mp3", "/sounds/feet.mp3"],
    5: ["/sounds/airplane.mp3", "/sounds/bike.mp3", "/sounds/boat.mp3"],
    6: ["/sounds/ball_play.mp3", "/sounds/swing.mp3", "/sounds/slide.mp3"],
  };

  const backgrounds = {
    0: JungleBackground,
    1: StadiumBackground,
    2: BeachBackground,
    3: HouseBackground,
    4: HygieneBackground,
    5: TransportBackground,
    6: ParkBackground,
  };

  // Use scene (0,1,2) directly for indexing
  const currentPhrase =
    phrases[level]?.[difficulty - 1]?.[scene] || "FRA-SE NO DIS-PO-NI-BLE";

  const BackgroundSVG = backgrounds[level] || JungleBackground;
  const AnimalSVG = animalSets[level]?.[scene] || Lion;

  useEffect(() => {
    const soundPath = audioSets[level]?.[scene];
    if (soundPath) {
      const audio = new Audio(soundPath);
      audio.volume = state.settings.volume;
      audio.play().catch((err) =>
        console.error("Audio playback failed:", err)
      );
    }
  }, [level, scene]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIntro(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="level-container">
      <BackgroundSVG className="background-svg" />

      <div
        className={`level-animal ${animateIntro ? "intro" : ""}`}
        onAnimationEnd={() => setAnimateIntro(false)}
      >
        <AnimalSVG className="animal-svg" />
      </div>

      <div className={`level-overlay ${animateIntro ? "" : "show"}`}>
        <LevelOverlay text={currentPhrase} />
      </div>

      <div className="back-button">
        <Flechas direction="left" to="/level_selector" />
      </div>

    </div>
  );
};
