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


require('dotenv').config(); // Load environment variables from .env file

//import gTTS from 'gtts';
//import fs from 'fs';

const fs = require('fs');
const path = require('path');
const gTTS = require('gtts');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // Allow all origins (for development)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// Server Environment variables
const PORT = 5000;


app.route('/logIn')
    .post((req, res) =>{
        console.log("LOGGED IN!!!!!!!");
    });

app.route("/tts").post(async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Missing text" });

    const filename = `tts_${Date.now()}.mp3`;
    const filepath = path.join("./audios", filename);

    const speech = new gTTS(text, "es");
    speech.save(filepath, (err) => {
      if (err) {
        console.error("Error generating TTS:", err);
        return res.status(500).json({ error: "TTS generation failed" });
      }
      console.log(`✅ Audio saved as ${filename}`);
      res.json({ path: filepath });
    });
  } catch (error) {
    console.error("Error in /tts route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


async function generateSpeech(outputFolder = "./audios") {
  if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder, { recursive: true });

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

  for (const levelKey of Object.keys(phrases)) {
    const sublevels = phrases[levelKey];

    for (let subIndex = 0; subIndex < sublevels.length; subIndex++) {
      const group = sublevels[subIndex];

      for (let wordIndex = 0; wordIndex < group.length; wordIndex++) {
        const phrase = group[wordIndex];
        const syllables = phrase.split("-");

        for (let i = 0; i < syllables.length; i++) {
          const text = syllables[i];
          const filename = `lvl${levelKey}_sub${subIndex}_w${wordIndex}_s${i}.mp3`;
          const filepath = path.join(outputFolder, filename);

          try {
            const speech = new gTTS(text, "es");
            await new Promise((resolve, reject) => {
              speech.save(filepath, (err) => {
                if (err) reject(err);
                else resolve();
              });
            });
            console.log(`✅ Saved: ${filepath}`);
          } catch (error) {
            console.error("❌ Error generating:", text, error);
          }
        }
      }
    }
  }
}



app.listen(PORT, () => {
    //generateSpeech();
    console.log(`<|Berkeley listening port ${PORT}|>`); // Log server start and port information
});