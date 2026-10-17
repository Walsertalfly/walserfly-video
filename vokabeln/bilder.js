// Vokabel-Land – gezeichnete Bilder zur Lösung (Karikatur-Stil, alles selbst gezeichnetes SVG).
// Nichts wird aus dem Internet geladen.
//
// Schlüssel = das englische Wort, genau so wie in vokabeln.js (klein, ohne Satzzeichen).
// Gibt es kein Bild, zeigt die App einfach keines. Lieber keins als ein schlechtes.
//
// Alle Bilder haben viewBox 0 0 100 100, damit sie gleich groß wirken.
(function(){
  const S = (inhalt) => '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' + inhalt + '</svg>';

  // Bausteine für die Präpositionen: immer dieselbe Katze und derselbe Korb,
  // nur die Stellung ändert sich – genau wie im Schulbuch.
  const korb = (x,y,gr) => `<g transform="translate(${x},${y}) scale(${gr})">
      <ellipse cx="0" cy="-16" rx="22" ry="7" fill="#c98b4b"/>
      <path d="M-22 -16 L-16 10 Q0 16 16 10 L22 -16 Z" fill="#e0a95f" stroke="#a9702f" stroke-width="2.5"/>
      <path d="M-19 -6 H19 M-17 2 H17" stroke="#a9702f" stroke-width="2" fill="none"/>
      <ellipse cx="0" cy="-16" rx="22" ry="7" fill="none" stroke="#a9702f" stroke-width="2.5"/>
    </g>`;
  // Sitzende Katze von der Seite. (x,y) ist ihr Standpunkt am Boden.
  // nurKopf=true zeichnet nur Kopf und Vorderpfoten – fuer "in", wo der Korb den Rest verdeckt.
  const katze = (x,y,gr,spiegel,nurKopf) => `<g transform="translate(${x},${y}) scale(${(spiegel?-gr:gr)},${gr})">
      ${nurKopf ? '' : `
      <path d="M13 -4 Q26 -6 26 -20 Q26 -30 19 -30" stroke="#e8a33d" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M-14 0 Q-16 -26 0 -28 Q16 -26 14 0 Z" fill="#f0b354"/>
      <ellipse cx="0" cy="0" rx="15" ry="4" fill="#e8a33d"/>
      <ellipse cx="-8" cy="-1" rx="6" ry="3.5" fill="#f7cb87"/>
      <ellipse cx="8" cy="-1" rx="6" ry="3.5" fill="#f7cb87"/>`}
      <circle cx="0" cy="-38" r="14" fill="#f0b354"/>
      <path d="M-13 -46 L-16 -60 L-3 -51 Z M13 -46 L16 -60 L3 -51 Z" fill="#f0b354"/>
      <path d="M-11 -47 L-13 -56 L-5 -50 Z M11 -47 L13 -56 L5 -50 Z" fill="#f2a9a0"/>
      <circle cx="-5" cy="-40" r="2.3" fill="#333"/><circle cx="5" cy="-40" r="2.3" fill="#333"/>
      <circle cx="-4.3" cy="-40.8" r="0.8" fill="#fff"/><circle cx="5.7" cy="-40.8" r="0.8" fill="#fff"/>
      <path d="M0 -34 l-3 -2.5 h6 Z" fill="#d9746b"/>
      <path d="M0 -32 v2 M0 -30 q-4 3 -7 0 M0 -30 q4 3 7 0" stroke="#b5673f" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <path d="M-13 -37 h-9 M-13 -33 h-9 M13 -37 h9 M13 -33 h9" stroke="#8a6a44" stroke-width="1.1" fill="none"/>
    </g>`;

  window.VOKABEL_BILD = {

    // ---------- Level 1: Im Tierpark ----------
    "tree": S(`
      <rect x="44" y="55" width="12" height="35" rx="3" fill="#8b5a2b"/>
      <path d="M50 58 L50 72 M50 64 L40 56 M50 68 L61 60" stroke="#6b4423" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="50" cy="38" r="24" fill="#4caf50"/>
      <circle cx="33" cy="48" r="15" fill="#5cbf60"/>
      <circle cx="67" cy="48" r="15" fill="#43a047"/>
      <circle cx="42" cy="28" r="11" fill="#66bb6a"/>
      <ellipse cx="50" cy="92" rx="26" ry="4" fill="#cfe8c4"/>`),

    "monkey": S(`
      <circle cx="22" cy="44" r="11" fill="#a9703f"/><circle cx="78" cy="44" r="11" fill="#a9703f"/>
      <circle cx="22" cy="44" r="6" fill="#d9a87a"/><circle cx="78" cy="44" r="6" fill="#d9a87a"/>
      <circle cx="50" cy="46" r="29" fill="#8d5a2b"/>
      <ellipse cx="50" cy="56" rx="21" ry="18" fill="#e3b98c"/>
      <circle cx="40" cy="42" r="4.5" fill="#fff"/><circle cx="60" cy="42" r="4.5" fill="#fff"/>
      <circle cx="40" cy="43" r="2.4" fill="#2b2b2b"/><circle cx="60" cy="43" r="2.4" fill="#2b2b2b"/>
      <ellipse cx="45" cy="55" rx="2" ry="2.6" fill="#7a4a24"/><ellipse cx="55" cy="55" rx="2" ry="2.6" fill="#7a4a24"/>
      <path d="M40 63 Q50 72 60 63" stroke="#7a4a24" stroke-width="3" fill="none" stroke-linecap="round"/>`),

    "parrot": S(`
      <path d="M46 36 Q22 44 26 68 Q30 88 52 86 Q72 84 70 60 Q68 40 46 36 Z" fill="#e53935"/>
      <path d="M62 52 Q84 54 86 72 Q88 88 70 84 Q60 78 62 52 Z" fill="#1e88e5"/>
      <path d="M66 56 Q84 60 84 74" stroke="#fdd835" stroke-width="7" fill="none" stroke-linecap="round"/>
      <circle cx="44" cy="30" r="17" fill="#e53935"/>
      <circle cx="39" cy="26" r="4.5" fill="#fff"/><circle cx="38" cy="26" r="2.4" fill="#222"/>
      <path d="M30 30 Q16 34 28 44 Q34 42 34 34 Z" fill="#fdd835" stroke="#c9a200" stroke-width="1.5"/>
      <path d="M48 86 l-4 10 M58 85 l3 10" stroke="#c9a200" stroke-width="4" stroke-linecap="round"/>`),

    "giraffe": S(`
      <rect x="44" y="40" width="15" height="48" fill="#f0b64a"/>
      <ellipse cx="52" cy="88" rx="17" ry="9" fill="#f0b64a"/>
      <circle cx="47" cy="50" r="4" fill="#9a5b1c"/><circle cx="55" cy="62" r="4" fill="#9a5b1c"/>
      <circle cx="47" cy="74" r="4.5" fill="#9a5b1c"/><circle cx="58" cy="84" r="4" fill="#9a5b1c"/>
      <ellipse cx="42" cy="28" rx="19" ry="13" transform="rotate(-18 42 28)" fill="#f5c463"/>
      <ellipse cx="27" cy="26" rx="8" ry="6.5" fill="#e8a33d"/>
      <circle cx="24" cy="25" r="1.6" fill="#5a3310"/><circle cx="30" cy="23" r="1.6" fill="#5a3310"/>
      <circle cx="45" cy="19" r="4" fill="#f5c463"/><circle cx="45" cy="19" r="2" fill="#9a5b1c"/>
      <path d="M52 16 l3 -8 M44 13 l1 -8" stroke="#9a5b1c" stroke-width="3" stroke-linecap="round"/>
      <circle cx="40" cy="22" r="3.4" fill="#fff"/><circle cx="40" cy="22" r="1.9" fill="#222"/>`),

    "train": S(`
      <rect x="8" y="84" width="84" height="5" rx="2" fill="#8d6e63"/>
      <rect x="46" y="40" width="40" height="36" rx="5" fill="#1e88e5"/>
      <rect x="12" y="52" width="36" height="24" rx="5" fill="#e53935"/>
      <rect x="54" y="46" width="16" height="13" rx="2" fill="#bbdefb"/>
      <rect x="18" y="22" width="12" height="32" rx="3" fill="#424242"/>
      <rect x="15" y="18" width="18" height="7" rx="3" fill="#424242"/>
      <circle cx="24" cy="12" r="6" fill="#eceff1" opacity=".9"/>
      <circle cx="34" cy="7" r="4.5" fill="#eceff1" opacity=".75"/>
      <circle cx="26" cy="80" r="9" fill="#37474f"/><circle cx="26" cy="80" r="3.5" fill="#cfd8dc"/>
      <circle cx="58" cy="80" r="9" fill="#37474f"/><circle cx="58" cy="80" r="3.5" fill="#cfd8dc"/>
      <circle cx="80" cy="80" r="9" fill="#37474f"/><circle cx="80" cy="80" r="3.5" fill="#cfd8dc"/>`),

    "penguin": S(`
      <ellipse cx="50" cy="92" rx="24" ry="5" fill="#cfe8f5"/>
      <ellipse cx="50" cy="56" rx="26" ry="33" fill="#2b2b2b"/>
      <ellipse cx="50" cy="60" rx="17" ry="26" fill="#fff"/>
      <circle cx="50" cy="28" r="19" fill="#2b2b2b"/>
      <path d="M36 30 Q50 16 64 30 Q50 42 36 30 Z" fill="#fff"/>
      <circle cx="43" cy="27" r="3.4" fill="#fff"/><circle cx="57" cy="27" r="3.4" fill="#fff"/>
      <circle cx="43" cy="27" r="1.9" fill="#222"/><circle cx="57" cy="27" r="1.9" fill="#222"/>
      <path d="M44 34 L50 41 L56 34 Z" fill="#f9a825"/>
      <ellipse cx="22" cy="58" rx="7" ry="18" transform="rotate(14 22 58)" fill="#2b2b2b"/>
      <ellipse cx="78" cy="58" rx="7" ry="18" transform="rotate(-14 78 58)" fill="#2b2b2b"/>
      <path d="M40 88 l-9 4 h13 Z M60 88 l9 4 h-13 Z" fill="#f9a825"/>`),

    "lion": S(`
      <circle cx="50" cy="50" r="38" fill="#c87e2a"/>
      <circle cx="50" cy="50" r="31" fill="#e09a3e"/>
      <circle cx="50" cy="52" r="24" fill="#f3c178"/>
      <circle cx="33" cy="36" r="7" fill="#e09a3e"/><circle cx="67" cy="36" r="7" fill="#e09a3e"/>
      <circle cx="42" cy="47" r="4.2" fill="#fff"/><circle cx="58" cy="47" r="4.2" fill="#fff"/>
      <circle cx="42" cy="48" r="2.3" fill="#2b2b2b"/><circle cx="58" cy="48" r="2.3" fill="#2b2b2b"/>
      <path d="M50 56 l-5 4 h10 Z" fill="#8d4e1a"/>
      <path d="M50 60 v4 M50 64 Q42 70 37 63 M50 64 Q58 70 63 63" stroke="#8d4e1a" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M30 56 h-9 M30 60 h-9 M70 56 h9 M70 60 h9" stroke="#8d4e1a" stroke-width="1.6"/>`),

    "guide": S(`
      <ellipse cx="50" cy="93" rx="22" ry="4" fill="#cfe8c4"/>
      <path d="M34 92 V62 Q34 50 50 50 Q66 50 66 62 V92 Z" fill="#5d9c59"/>
      <rect x="42" y="74" width="16" height="7" rx="2" fill="#3f6e3c"/>
      <path d="M66 64 L86 46" stroke="#c98b63" stroke-width="7" stroke-linecap="round"/>
      <circle cx="88" cy="44" r="5" fill="#c98b63"/>
      <path d="M34 64 L24 80" stroke="#c98b63" stroke-width="7" stroke-linecap="round"/>
      <circle cx="50" cy="34" r="15" fill="#c98b63"/>
      <circle cx="45" cy="33" r="1.9" fill="#3b2a1a"/><circle cx="55" cy="33" r="1.9" fill="#3b2a1a"/>
      <path d="M45 40 Q50 44 55 40" stroke="#3b2a1a" stroke-width="2" fill="none" stroke-linecap="round"/>
      <ellipse cx="50" cy="22" rx="26" ry="5" fill="#8d6e3a"/>
      <path d="M36 23 Q38 10 50 10 Q62 10 64 23 Z" fill="#a9823f"/>`),

    // ---------- Level 2: Wo ist die Katze? ----------
    // Katze NEBEN dem Korb, beide ganz zu sehen
    "next to": S(`<ellipse cx="50" cy="88" rx="44" ry="5" fill="#e3e8df"/>`
      + korb(72,78,1.05) + katze(28,88,1,false)),

    // Katze IM Korb: nur der Kopf schaut ueber den Rand, Korb davor
    "in": S(`<ellipse cx="50" cy="88" rx="38" ry="5" fill="#e3e8df"/>
      <ellipse cx="50" cy="56" rx="26" ry="8" fill="#c98b4b"/>`
      + katze(50,88,1.05,false,true) + `
      <path d="M-26 0 L-19 26 Q0 34 19 26 L26 0 Z" transform="translate(50,56)" fill="#e0a95f" stroke="#a9702f" stroke-width="3"/>
      <path d="M-23 12 H23 M-21 22 H21" transform="translate(50,56)" stroke="#a9702f" stroke-width="2.2" fill="none"/>
      <path d="M38 54 q4 -6 9 -1 M62 54 q-4 -6 -9 -1" stroke="#e8a33d" stroke-width="5" fill="none" stroke-linecap="round"/>`),

    // Katze HINTER dem Korb: steht erhoeht dahinter, der Korb verdeckt nur ihre Beine
    "behind": S(`<ellipse cx="50" cy="90" rx="44" ry="5" fill="#e3e8df"/>`
      + katze(62,76,0.95,false) + `
      <g transform="translate(50,88)">
        <ellipse cx="0" cy="-17" rx="23" ry="7" fill="#c98b4b"/>
        <path d="M-23 -17 L-17 10 Q0 17 17 10 L23 -17 Z" fill="#e0a95f" stroke="#a9702f" stroke-width="3"/>
        <path d="M-20 -6 H20 M-18 3 H18" stroke="#a9702f" stroke-width="2.2" fill="none"/>
      </g>`),

    // Katze UNTER dem Korb: Korb steht auf Beinen, Katze liegt darunter
    "under": S(`<ellipse cx="50" cy="92" rx="40" ry="5" fill="#e3e8df"/>
      <g transform="translate(50,34)">
        <ellipse cx="0" cy="-14" rx="24" ry="7" fill="#c98b4b"/>
        <path d="M-24 -14 L-18 8 Q0 15 18 8 L24 -14 Z" fill="#e0a95f" stroke="#a9702f" stroke-width="3"/>
        <path d="M-21 -4 H21" stroke="#a9702f" stroke-width="2.2" fill="none"/>
      </g>
      <path d="M34 42 v16 M66 42 v16" stroke="#a9702f" stroke-width="4.5" stroke-linecap="round"/>`
      + katze(50,92,0.86,false)),

    // Katze AUF dem Korb
    "on": S(`<ellipse cx="50" cy="92" rx="36" ry="5" fill="#e3e8df"/>`
      + katze(50,54,0.92,false) + `
      <g transform="translate(50,76)">
        <ellipse cx="0" cy="-16" rx="24" ry="7" fill="#d59a56"/>
        <path d="M-24 -16 L-18 10 Q0 17 18 10 L24 -16 Z" fill="#e0a95f" stroke="#a9702f" stroke-width="3"/>
        <path d="M-21 -5 H21 M-19 4 H19" stroke="#a9702f" stroke-width="2.2" fill="none"/>
      </g>`),

    // Katze VOR dem Korb: sitzt davor und verdeckt ein Stueck des Korbs
    "in front of": S(`<ellipse cx="50" cy="92" rx="44" ry="5" fill="#e3e8df"/>`
      + korb(46,70,1.05) + katze(56,92,1,false)),

    // ---------- Level 3 ----------
    "zoo": S(`
      <rect x="10" y="20" width="80" height="66" rx="4" fill="#cfe8c4"/>
      <circle cx="38" cy="58" r="14" fill="#e09a3e"/>
      <circle cx="33" cy="54" r="2" fill="#5a3310"/><circle cx="43" cy="54" r="2" fill="#5a3310"/>
      <path d="M33 64 Q38 68 43 64" stroke="#8d4e1a" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="29" cy="46" r="5" fill="#c87e2a"/><circle cx="47" cy="46" r="5" fill="#c87e2a"/>
      <circle cx="70" cy="66" r="9" fill="#78909c"/><circle cx="70" cy="52" r="6" fill="#78909c"/>
      <path d="M18 14 v78 M34 14 v78 M50 14 v78 M66 14 v78 M82 14 v78" stroke="#607d8b" stroke-width="5" stroke-linecap="round"/>
      <path d="M8 16 h84" stroke="#455a64" stroke-width="6" stroke-linecap="round"/>`),

    "big": S(`
      <ellipse cx="50" cy="90" rx="38" ry="4" fill="#e3e8df"/>
      <circle cx="50" cy="52" r="36" fill="#42a5f5"/>
      <circle cx="50" cy="52" r="36" fill="none" stroke="#1565c0" stroke-width="3"/>
      <path d="M20 86 l-8 0 M80 86 l8 0" stroke="#1565c0" stroke-width="3" stroke-linecap="round"/>
      <path d="M14 82 v8 M86 82 v8" stroke="#1565c0" stroke-width="3" stroke-linecap="round"/>
      <path d="M14 86 h72" stroke="#1565c0" stroke-width="2" stroke-dasharray="4 3"/>`),

    "small": S(`
      <ellipse cx="50" cy="90" rx="38" ry="4" fill="#e3e8df"/>
      <circle cx="50" cy="74" r="13" fill="#42a5f5"/>
      <circle cx="50" cy="74" r="13" fill="none" stroke="#1565c0" stroke-width="3"/>
      <circle cx="50" cy="40" r="33" fill="none" stroke="#b0bec5" stroke-width="2" stroke-dasharray="5 4"/>
      <path d="M37 88 v4 M63 88 v4 M37 90 h26" stroke="#1565c0" stroke-width="2.5" stroke-linecap="round"/>`)
  };
})();
