// Vokabel-Land – der Belohnungsstern nach einem geschafften Level.
//
// Ein großer goldener Stern fliegt herein, rüttelt dreimal immer stärker,
// zerspringt und gibt frei, was darin war. Alles selbst gezeichnet.
window.BELOHNUNG = (function(){

  // ---------------------------------------------------------------- Der Stern
  // Fünfzackig, mit Glanzkanten und einem Lichtkranz. Zerspringt in fünf Zacken.
  function zacke(nr, farbe, dunkel){
    // Fünf Dreiecke, die zusammen den Stern ergeben. Jedes kann einzeln wegfliegen.
    const ecken = [];
    for(let i = 0; i < 10; i++){
      const w = (Math.PI / 5) * i - Math.PI / 2;
      const r = i % 2 === 0 ? 92 : 38;
      ecken.push([100 + Math.cos(w) * r, 100 + Math.sin(w) * r]);
    }
    const a = ecken[(nr * 2) % 10];
    const spitze = ecken[(nr * 2 + 1) % 10];
    const b = ecken[(nr * 2 + 2) % 10];
    return '<g class="zacke zacke' + nr + '">'
      + '<path d="M100 100 L' + a[0].toFixed(1) + ' ' + a[1].toFixed(1)
      + ' L' + spitze[0].toFixed(1) + ' ' + spitze[1].toFixed(1)
      + ' L' + b[0].toFixed(1) + ' ' + b[1].toFixed(1) + ' Z" fill="' + farbe + '"/>'
      + '<path d="M100 100 L' + spitze[0].toFixed(1) + ' ' + spitze[1].toFixed(1)
      + ' L' + b[0].toFixed(1) + ' ' + b[1].toFixed(1) + ' Z" fill="' + dunkel + '" opacity=".35"/>'
      + '</g>';
  }

  function svg(){
    const GOLD = '#ffd54a', DUNKEL = '#e09a14';
    let zacken = '';
    for(let i = 0; i < 5; i++) zacken += zacke(i, GOLD, DUNKEL);
    return '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="stern-bild">'
      + '<defs>'
      + '<radialGradient id="sternGlanz" cx="40%" cy="32%" r="72%">'
      + '<stop offset="0%" stop-color="#fffbe6"/><stop offset="50%" stop-color="#ffd54a"/>'
      + '<stop offset="100%" stop-color="#e8920c"/></radialGradient>'
      + '<radialGradient id="sternAura" cx="50%" cy="50%" r="50%">'
      + '<stop offset="0%" stop-color="#fff6c9" stop-opacity=".55"/>'
      + '<stop offset="70%" stop-color="#ffd54a" stop-opacity=".18"/>'
      + '<stop offset="100%" stop-color="#ffd54a" stop-opacity="0"/></radialGradient>'
      + '</defs>'
      // Lichtkranz und Strahlen
      + '<g class="sternkranz">'
      + '<circle cx="100" cy="100" r="98" fill="url(#sternAura)"/>'
      + [0,45,90,135,180,225,270,315].map(w =>
          '<path d="M100 100 L96 2 L104 2 Z" fill="#fff6c9" opacity=".30" transform="rotate('
          + w + ' 100 100)"/>').join('')
      + '</g>'
      + '<g class="sternkoerper">'
      + zacken
      + '<circle cx="100" cy="100" r="44" fill="url(#sternGlanz)"/>'
      // Gesicht
      + '<g class="sterngesicht">'
      + '<g class="sternaugen">'
      + '<ellipse cx="86" cy="94" rx="7" ry="9" fill="#5a3b06"/>'
      + '<ellipse cx="114" cy="94" rx="7" ry="9" fill="#5a3b06"/>'
      + '<circle cx="88.5" cy="90.5" r="2.6" fill="#fff"/>'
      + '<circle cx="116.5" cy="90.5" r="2.6" fill="#fff"/>'
      + '</g>'
      + '<g class="sternzu"><path d="M79 95 q7 -7 14 0 M107 95 q7 -7 14 0" stroke="#5a3b06" '
      + 'stroke-width="3.4" fill="none" stroke-linecap="round"/></g>'
      + '<path class="sternmund" d="M86 110 q14 14 28 0 q-14 8 -28 0 Z" fill="#8a5a0a"/>'
      + '<ellipse cx="74" cy="108" rx="7" ry="5" fill="#ff8f7a" opacity=".55"/>'
      + '<ellipse cx="126" cy="108" rx="7" ry="5" fill="#ff8f7a" opacity=".55"/>'
      + '</g>'
      // Glanzlichter
      + '<path d="M76 76 q18 -14 38 -5 q-20 2 -33 15 Z" fill="#fffdf2" opacity=".8"/>'
      + '<circle cx="84" cy="86" r="5" fill="#ffffff" opacity=".5"/>'
      + '</g>'
      + '</svg>';
  }

  // ---------------------------------------------------------------- Was drin ist
  // chance = Gewicht, je höher desto häufiger.
  const INHALT = [
    { art:'muenzen', chance:26, menge:15, bild:'🪙', titel:'Ein Beutel Münzen',
      text:'15 Münzen für den Futternapf.' },
    { art:'muenzen', chance:17, menge:30, bild:'💰', titel:'Ein großer Beutel',
      text:'30 Münzen! Davon gibt es ein Steak.' },
    { art:'sterne',  chance:16, menge:40, bild:'✨', titel:'Sternenstaub',
      text:'40 Sterne zum Ausgeben.' },
    { art:'sterne',  chance:9,  menge:90, bild:'🌟', titel:'Ein Sternenregen',
      text:'90 Sterne! Dafür gibt es schon etwas zum Anziehen.' },
    { art:'futter',  chance:14, bild:'🍎', titel:'Ein Festmahl',
      text:'Satt, getränkt und bester Laune.' },
    { art:'kleidung',chance:12, bild:'🎁', titel:'Etwas zum Anziehen',
      text:'Sofort anprobiert!' },
    { art:'feder',   chance:6,  bild:'🪶', titel:'Eine goldene Feder',
      text:'Die gibt es ganz selten. Sammle sie!' }
  ];

  function ziehen(){
    const gesamt = INHALT.reduce((a, b) => a + b.chance, 0);
    let w = Math.random() * gesamt;
    for(const e of INHALT){
      w -= e.chance;
      if(w <= 0) return e;
    }
    return INHALT[0];
  }

  return { svg: svg, INHALT: INHALT, ziehen: ziehen };
})();
