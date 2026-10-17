// Vokabel-Land – die Abzeichen der ersten drei Plätze.
// Alles Tiere, alles selbst gezeichnet.
//   Platz 1: Feuerdrache
//   Platz 2: Wasserwal
//   Platz 3: Windadler
window.ABZEICHEN = (function(){

  const drache =
      '<defs><radialGradient id="azFeuer" cx="50%" cy="60%" r="60%">'
    + '<stop offset="0%" stop-color="#ffd24a"/><stop offset="60%" stop-color="#ff6a2a"/>'
    + '<stop offset="100%" stop-color="#c0260a"/></radialGradient></defs>'
    + '<circle cx="50" cy="50" r="46" fill="url(#azFeuer)"/>'
    + '<circle cx="50" cy="50" r="46" fill="none" stroke="#8c1a05" stroke-width="3"/>'
    // Flammenkranz
    + '<path d="M50 6 q7 10 2 16 q9 -4 10 4 q-5 10 -14 8 q-12 -2 -10 -14 q2 -10 12 -14 Z" fill="#ffe08a" opacity=".9"/>'
    // Flügel
    + '<path d="M28 44 q-16 -10 -18 6 q14 4 18 12 Z" fill="#8c1a05"/>'
    + '<path d="M72 44 q16 -10 18 6 q-14 4 -18 12 Z" fill="#8c1a05"/>'
    // Körper und Hals
    + '<path d="M40 74 q-4 -18 8 -26 q-10 -10 -2 -18 q10 -8 18 2 q8 10 0 18 q10 10 6 24 Z" fill="#b62208"/>'
    // Kopf
    + '<path d="M38 44 q-2 -14 12 -16 q16 -2 18 12 q2 12 -12 14 q-16 2 -18 -10 Z" fill="#e8441a"/>'
    // Hörner
    + '<path d="M40 30 l-8 -12 l12 6 Z M62 30 l9 -12 l-12 6 Z" fill="#ffd24a"/>'
    // Auge und Maul
    + '<circle cx="46" cy="42" r="4.2" fill="#fff"/><circle cx="47" cy="42" r="2.2" fill="#2b1206"/>'
    + '<circle cx="62" cy="42" r="4.2" fill="#fff"/><circle cx="61" cy="42" r="2.2" fill="#2b1206"/>'
    + '<path d="M44 54 q10 7 20 0 q-8 10 -20 0 Z" fill="#6b1304"/>'
    + '<path d="M46 55 l3 4 M54 57 l2 4 M60 55 l3 4" stroke="#fff" stroke-width="2" stroke-linecap="round"/>';

  const wal =
      '<defs><radialGradient id="azWasser" cx="50%" cy="40%" r="65%">'
    + '<stop offset="0%" stop-color="#9fe3ff"/><stop offset="60%" stop-color="#3aa0e0"/>'
    + '<stop offset="100%" stop-color="#11487e"/></radialGradient></defs>'
    + '<circle cx="50" cy="50" r="46" fill="url(#azWasser)"/>'
    + '<circle cx="50" cy="50" r="46" fill="none" stroke="#0b3560" stroke-width="3"/>'
    // Wellen unten
    + '<path d="M6 70 q12 -8 22 0 q12 8 22 0 q12 -8 22 0 q10 7 20 1 l0 30 H6 Z" fill="#1d6fb0" opacity=".65"/>'
    + '<path d="M6 78 q12 -8 22 0 q12 8 22 0 q12 -8 22 0 q10 7 20 1 l0 22 H6 Z" fill="#0f4f88" opacity=".6"/>'
    // Fontäne
    + '<path d="M54 22 q-3 -12 4 -16 q-2 9 2 14 Z" fill="#dff3ff"/>'
    + '<circle cx="62" cy="12" r="3.4" fill="#dff3ff"/><circle cx="52" cy="10" r="2.4" fill="#dff3ff"/>'
    // Walkörper
    + '<path d="M22 56 q10 -22 34 -20 q24 2 26 18 q-10 16 -32 16 q-22 0 -28 -14 Z" fill="#153a66"/>'
    + '<path d="M26 58 q10 -14 30 -13 q18 1 24 12 q-12 10 -28 10 q-18 0 -26 -9 Z" fill="#2a6fae"/>'
    // Bauchfurchen und Flosse
    + '<path d="M34 62 q12 7 28 4 M36 67 q11 5 24 2" stroke="#9fe3ff" stroke-width="2" fill="none" stroke-linecap="round"/>'
    + '<path d="M22 56 q-14 -10 -18 2 q10 8 18 6 Z" fill="#153a66"/>'
    + '<circle cx="66" cy="46" r="4" fill="#fff"/><circle cx="67" cy="46" r="2.1" fill="#0b2a4a"/>'
    + '<path d="M72 54 q8 3 10 8" stroke="#0b2a4a" stroke-width="2.4" fill="none" stroke-linecap="round"/>';

  const adler =
      '<defs><radialGradient id="azWind" cx="50%" cy="40%" r="65%">'
    + '<stop offset="0%" stop-color="#f2fbff"/><stop offset="60%" stop-color="#9ec9de"/>'
    + '<stop offset="100%" stop-color="#4b7f99"/></radialGradient></defs>'
    + '<circle cx="50" cy="50" r="46" fill="url(#azWind)"/>'
    + '<circle cx="50" cy="50" r="46" fill="none" stroke="#2f5c70" stroke-width="3"/>'
    // Windlinien
    + '<path d="M10 30 q18 -6 30 0 M8 42 q14 -5 24 0 M12 66 q18 6 30 0 M60 72 q16 5 28 0" '
    + 'stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".75"/>'
    // ausgebreitete Schwingen
    + '<path d="M50 48 q-26 -22 -44 -6 q16 4 22 12 q-14 0 -18 8 q20 6 40 -2 Z" fill="#5c6f7a"/>'
    + '<path d="M50 48 q26 -22 44 -6 q-16 4 -22 12 q14 0 18 8 q-20 6 -40 -2 Z" fill="#48606d"/>'
    + '<path d="M50 50 q-18 -12 -30 -6 q12 2 18 8 Z" fill="#7d909b"/>'
    + '<path d="M50 50 q18 -12 30 -6 q-12 2 -18 8 Z" fill="#6b808c"/>'
    // Körper und Schwanz
    + '<path d="M44 46 q6 -6 12 0 q6 12 2 26 q-8 6 -16 0 q-4 -14 2 -26 Z" fill="#6b808c"/>'
    + '<path d="M44 72 q6 10 12 0 q-2 12 -6 14 q-4 -2 -6 -14 Z" fill="#48606d"/>'
    // Kopf
    + '<circle cx="50" cy="38" r="15" fill="#fdfdfd"/>'
    + '<path d="M50 23 q13 1 15 13 q-9 -6 -15 -5 Z" fill="#e8eef1"/>'
    + '<circle cx="45" cy="36" r="3.6" fill="#2b2b2b"/><circle cx="46" cy="35" r="1.3" fill="#fff"/>'
    + '<circle cx="56" cy="36" r="3.6" fill="#2b2b2b"/><circle cx="57" cy="35" r="1.3" fill="#fff"/>'
    + '<path d="M36 34 q10 -6 16 -1 M64 34 q-10 -6 -16 -1" stroke="#c9d6dc" stroke-width="2" fill="none" stroke-linecap="round"/>'
    // Schnabel
    + '<path d="M46 44 q4 -3 8 0 q0 8 -4 11 q-4 -3 -4 -11 Z" fill="#f4b73f"/>'
    + '<path d="M48 52 q2 4 2 7 q-3 -2 -2 -7 Z" fill="#d49321"/>';

  const INHALT = { 1: drache, 2: wal, 3: adler };
  const TITEL  = { 1: 'Feuerdrache', 2: 'Wasserwal', 3: 'Windadler' };

  function svg(platz){
    const inhalt = INHALT[platz];
    if(!inhalt) return '';
    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="abzeichen abzeichen-'
      + platz + '"><title>' + TITEL[platz] + '</title>' + inhalt + '</svg>';
  }

  return { svg: svg, TITEL: TITEL };
})();
