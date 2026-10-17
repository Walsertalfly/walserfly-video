// Vokabel-Land – Pablo, der Papagei. Maskottchen und Tamagotchi.
//
// Pablo ist ein Scharlachara: roter Körper, gelb-blauer Flügel, langer Schwanz,
// weißes Gesichtsfeld und der typische große Hakenschnabel.
// Er wird immer ganz gezeichnet, nicht nur der Kopf. Alles selbst gezeichnetes SVG.
//
// Drei Werte sinken mit der Zeit: Futter, Wasser und Laune. Gefüttert wird mit Sachen
// aus dem Shop, bezahlt mit den Münzen aus dem Spiel. Wer fünf Tage nicht vorbeischaut,
// findet ihn am Boden liegend, mit Federn in der Luft.
(function(){

  // Der Name des Papageis. Zum Umbenennen genuegt diese eine Zeile.
  const NAME = 'Pablo';

  const ROT = '#e8342a', ROT_D = '#c2281f', GELB = '#ffc61a', BLAU = '#1769d4', BLAU_D = '#0f4fa8';

  // ------------------------------------------------------------ Die zehn Papageien
  // Einer je Insel. Stufe 1 ist ein schlichter kleiner Sittich, Stufe 10 der
  // Himmelskoenig. Jeder traegt die Farben seiner Insel.
  // haube: Federhaube · kragen: Halskrause · schild: Brustschild · schweif: Prachtfedern
  // funken: Leuchtpunkte · krone: Krone · schwingen: ausgebreitete Fluegel · aura: Lichtkranz
  const ARTEN = [
    { stufe:1,  id:'sittich',    name:'Sittich',          haupt:'#4ec97a', dunkel:'#2a9a52', hell:'#b7f0cb', zier:'#ffe066', gross:0.82 },
    { stufe:2,  id:'muschel',    name:'Muschelsittich',   haupt:'#2ec4b6', dunkel:'#149c92', hell:'#aef1ea', zier:'#ffd166', gross:0.88, haube:1 },
    { stufe:3,  id:'sonnenara',  name:'Sonnenara',        haupt:'#ffc247', dunkel:'#e08a14', hell:'#fff0c2', zier:'#ff7a45', gross:0.94, haube:1 },
    { stufe:4,  id:'nachtara',   name:'Nachtara',         haupt:'#8b6cf0', dunkel:'#5633c0', hell:'#ded0ff', zier:'#ffd166', gross:1.00, haube:2, kragen:1 },
    { stufe:5,  id:'sandara',    name:'Wüstenara',        haupt:'#e8b06a', dunkel:'#b87c2e', hell:'#ffe9c9', zier:'#2ec4b6', gross:1.00, haube:2, kragen:1, schweif:1 },
    { stufe:6,  id:'korallara',  name:'Korallenara',      haupt:'#ff5fa2', dunkel:'#d62a75', hell:'#ffd3e6', zier:'#ffe066', gross:1.04, haube:2, kragen:1, schweif:1, schild:1 },
    { stufe:7,  id:'eisara',     name:'Eiskronen-Ara',    haupt:'#79d2ff', dunkel:'#2a86c4', hell:'#dff3ff', zier:'#ffffff', gross:1.06, haube:3, kragen:1, schweif:2, schild:1, funken:1 },
    { stufe:8,  id:'schattara',  name:'Schattenara',      haupt:'#6e4ad6', dunkel:'#38206e', hell:'#c9b3ff', zier:'#8ef0d4', gross:1.08, haube:3, kragen:2, schweif:2, schild:1, funken:1 },
    { stufe:9,  id:'feuerara',   name:'Drachenara',       haupt:'#ff6a2a', dunkel:'#b32a08', hell:'#ffd0a8', zier:'#ffe066', gross:1.10, haube:3, kragen:2, schweif:3, schild:2, funken:2, krone:1 },
    { stufe:10, id:'himmelsara', name:'Himmelskönig',     haupt:'#ffe9a8', dunkel:'#d4a311', hell:'#fffaf0', zier:'#79d2ff', gross:1.14, haube:3, kragen:2, schweif:3, schild:2, funken:3, krone:2, schwingen:1, aura:1 }
  ];
  function artVon(stufe){
    const i = Math.max(1, Math.min(ARTEN.length, stufe || 3)) - 1;
    return ARTEN[i];
  }

  // ---------------------------------------------------------------- Zustände
  function zustandVon(p){
    if(p.tageWeg >= 5) return 'amBoden';
    if(p.futter <= 10 || p.wasser <= 10) return 'schwach';
    if(p.laune >= 80 && p.futter >= 60 && p.wasser >= 60) return 'gluecklich';
    if(p.laune <= 30 || p.futter <= 35 || p.wasser <= 35) return 'traurig';
    return 'ok';
  }

  // ---------------------------------------------------------------- Kopf
  function kopfTeil(z, A){
    const liegt = z === 'amBoden';

    const auge =
      liegt ? '<path d="M74 52 l10 10 M84 52 l-10 10" stroke="#2b2b2b" stroke-width="3.4" stroke-linecap="round"/>' :
      z === 'schwach' ? '<path d="M71 56 q8 -6 16 0" stroke="#2b2b2b" stroke-width="3.4" fill="none" stroke-linecap="round"/>' :
      z === 'traurig' ? '<circle cx="79" cy="57" r="6.4" fill="#2b2b2b"/><circle cx="81.4" cy="54.6" r="2.1" fill="#fff"/>'
                      + '<path d="M70 46 q9 -5 18 1" stroke="#2b2b2b" stroke-width="2.6" fill="none" stroke-linecap="round"/>' :
      z === 'gluecklich' ? '<circle cx="79" cy="55" r="7.2" fill="#2b2b2b"/><circle cx="81.8" cy="52" r="2.7" fill="#fff"/>'
                      + '<path d="M69 43 q10 -6 20 1" stroke="#2b2b2b" stroke-width="2.2" fill="none" stroke-linecap="round"/>' :
                        '<circle cx="79" cy="56" r="6.8" fill="#2b2b2b"/><circle cx="81.5" cy="53.5" r="2.4" fill="#fff"/>';

    // Großer Hakenschnabel: heller Oberschnabel, dunkler Unterschnabel
    const offen = (z === 'gluecklich');
    const schnabel =
      '<path d="M63 44 q-24 -3 -29 15 q-3 14 9 22 q3 -16 11 -21 q7 -5 11 -7 Z" fill="#f7eedd" stroke="#cbb68c" stroke-width="2.2" stroke-linejoin="round"/>'
      + '<path d="M43 81 q-7 -8 -4 -17 q6 -2 8 4 q1 7 -4 13 Z" fill="#2e2721"/>'
      + (offen
          ? '<path d="M49 76 q12 11 22 5 q-10 -2 -15 -10 Z" fill="#2e2721"/><path d="M54 78 q8 5 14 3" stroke="#8d4e3a" stroke-width="2" fill="none"/>'
          : '<path d="M48 75 q12 7 21 2 q-11 -1 -16 -7 Z" fill="#2e2721"/>')
      + '<circle cx="55" cy="52" r="2.2" fill="#6b5b3e"/>';

    // Federhaube, Krone und Schmuck je nach Art
    const haube = !A.haube ? '' :
      A.haube === 1 ? '<path d="M70 22 q4 -14 14 -16 q-2 10 -4 16 Z" fill="' + A.dunkel + '"/>' :
      A.haube === 2 ? '<path d="M66 22 q0 -16 10 -20 q0 10 -2 18 Z M76 20 q6 -16 16 -16 q-4 12 -8 18 Z" fill="' + A.dunkel + '"/>' :
        '<path d="M62 24 q-4 -20 6 -26 q2 12 2 20 Z M72 19 q2 -22 12 -24 q0 14 -2 22 Z M84 20 q8 -18 18 -16 q-6 14 -12 20 Z" fill="' + A.dunkel + '"/>'
        + '<path d="M72 19 q2 -18 10 -21" stroke="' + A.zier + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    const krone = !A.krone ? '' :
      '<g transform="translate(74,14)"><path d="M-16 6 L-12 -10 L-5 0 L0 -14 L5 0 L12 -10 L16 6 Z" fill="' + A.zier + '" stroke="' + A.dunkel + '" stroke-width="1.6"/>'
      + (A.krone > 1 ? '<circle cx="0" cy="-10" r="3" fill="#fff"/><circle cx="-12" cy="-6" r="2" fill="#fff"/><circle cx="12" cy="-6" r="2" fill="#fff"/>' : '')
      + '</g>';
    const kragen = !A.kragen ? '' :
      '<path d="M54 74 q22 16 44 2 q-4 12 -22 14 q-18 -2 -22 -16 Z" fill="' + A.zier + '" opacity="' + (A.kragen > 1 ? '.95' : '.8') + '"/>'
      + (A.kragen > 1 ? '<path d="M58 80 q18 12 36 0" stroke="' + A.hell + '" stroke-width="2" fill="none"/>' : '');

    return haube + krone
      + '<circle cx="74" cy="52" r="31" fill="' + A.haupt + '"/>'
      + '<path d="M74 21 q22 2 29 22 q-14 -10 -29 -9 Z" fill="' + A.dunkel + '" opacity=".4"/>'
      + '<path d="M60 32 q18 -8 30 4 q-6 30 -24 40 q-16 -8 -16 -24 q0 -14 10 -20 Z" fill="#fdf6ee"/>'
      + '<path d="M62 36 q12 -3 20 3 M58 46 q14 -3 22 5 M57 56 q13 -2 19 6 M58 66 q11 -1 15 6" '
      + 'stroke="#f0cfc2" stroke-width="1.6" fill="none" stroke-linecap="round"/>'
      + auge + schnabel + kragen;
  }

  // ---------------------------------------------------------------- Ganzes Bild
  function svg(p, deko, stufe){
    const z = zustandVon(p);
    deko = deko || {};
    const A = artVon(stufe || (p && p.stufe) || 3);
    const liegt = z === 'amBoden';
    const neigung = z === 'traurig' ? 7 : z === 'schwach' ? 11 : z === 'gluecklich' ? -3 : 0;
    const huepf = z === 'gluecklich' ? 'pablo-huepf' : '';

    // ---- gekauftes Zubehör ----
    const kaefig = deko.kaefig
      ? '<g opacity=".45">'
      + '<path d="M10 198 H190" stroke="#607d8b" stroke-width="6" stroke-linecap="round"/>'
      + '<path d="M14 24 v174 M186 24 v174" stroke="#78909c" stroke-width="5" stroke-linecap="round"/>'
      + '<path d="M44 26 v172 M74 26 v172 M104 26 v172 M134 26 v172 M164 26 v172" stroke="#90a4ae" stroke-width="2.4"/>'
      + '<path d="M14 26 q86 -16 172 0" stroke="#607d8b" stroke-width="6" fill="none" stroke-linecap="round"/>'
      + '</g>' : '';
    const glocke = deko.glocke
      ? '<g class="pablo-glocke"><path d="M164 28 v20" stroke="#8d6e63" stroke-width="3"/>'
      + '<path d="M155 48 q9 -18 18 0 Z" fill="#ffd54f" stroke="#c9a200" stroke-width="2"/>'
      + '<circle cx="164" cy="52" r="3.6" fill="#c9a200"/></g>' : '';
    const leiter = deko.leiter
      ? '<g><path d="M150 114 v76 M172 114 v76" stroke="#a9702f" stroke-width="5" stroke-linecap="round"/>'
      + '<path d="M150 130 H172 M150 150 H172 M150 170 H172" stroke="#c98b4b" stroke-width="5" stroke-linecap="round"/></g>' : '';
    const spiegel = deko.spiegel
      ? '<g><path d="M30 28 v20" stroke="#8d6e63" stroke-width="3"/>'
      + '<circle cx="30" cy="62" r="15" fill="#cfe8f7" stroke="#90a4ae" stroke-width="4"/>'
      + '<path d="M23 55 q7 -6 13 -1" stroke="#fff" stroke-width="3.6" fill="none" stroke-linecap="round"/></g>' : '';

    // ---- Näpfe, immer unten am Boden ----
    const napf = '<g>'
      + '<path d="M106 232 q19 10 36 0 l-4 -14 H110 Z" fill="' + (p.futter > 15 ? '#e0a95f' : '#d7ded5') + '" stroke="#a9702f" stroke-width="2.4"/>'
      + (p.futter > 15
          ? '<ellipse cx="124" cy="219" rx="14" ry="4.4" fill="#c98b4b"/>'
          + '<circle cx="118" cy="217" r="2.3" fill="#8d6e3a"/><circle cx="126" cy="218" r="2.3" fill="#f0c674"/>'
          + '<circle cx="131" cy="216" r="2.1" fill="#8d6e3a"/>' : '')
      + '<path d="M46 232 q17 10 32 0 l-4 -14 H50 Z" fill="' + (p.wasser > 15 ? '#64b5f6' : '#d7ded5') + '" stroke="#1976d2" stroke-width="2.4"/>'
      + (p.wasser > 15 ? '<ellipse cx="62" cy="219" rx="12" ry="4" fill="#9fd1fb"/>' : '')
      + '</g>';

    const federn = liegt
      ? '<g class="pablo-federn">'
      + '<path d="M150 34 q11 11 2 22 q-10 -7 -2 -22 Z" fill="' + ROT + '" opacity=".85"/>'
      + '<path d="M44 24 q-11 10 -3 21 q10 -6 3 -21 Z" fill="' + BLAU + '" opacity=".85"/>'
      + '<path d="M110 14 q12 9 5 21 q-11 -5 -5 -21 Z" fill="' + GELB + '" opacity=".85"/>'
      + '</g>' : '';

    // ---- Pablo ----
    // Prachtfedern im Schwanz, je hoeher die Stufe desto mehr
    const prachtfedern = !A.schweif ? '' :
        '<path d="M120 140 q52 40 70 118 q-10 -2 -18 -10" fill="none" stroke="' + A.zier + '" stroke-width="5" stroke-linecap="round"/>'
      + (A.schweif > 1 ? '<path d="M126 150 q44 42 56 112" fill="none" stroke="' + A.hell + '" stroke-width="4" stroke-linecap="round" opacity=".9"/>' : '')
      + (A.schweif > 2 ? '<path d="M132 164 q38 44 44 106" fill="none" stroke="' + A.zier + '" stroke-width="3.4" stroke-linecap="round" opacity=".8"/>'
                       + '<circle cx="176" cy="258" r="5" fill="' + A.zier + '"/>' : '');
    const schild = !A.schild ? '' :
        '<path d="M62 96 q18 -8 34 2 q-2 26 -17 36 q-15 -10 -17 -38 Z" fill="' + A.zier + '" opacity=".9"/>'
      + (A.schild > 1 ? '<path d="M70 104 q10 -4 18 2 q-2 14 -9 20 q-7 -6 -9 -22 Z" fill="' + A.hell + '"/>' : '');
    const ausgebreitet = !A.schwingen ? '' :
        '<path d="M70 92 q-56 -16 -62 34 q28 10 44 -4 q10 -12 18 -30 Z" fill="' + A.dunkel + '"/>'
      + '<path d="M70 100 q-44 -8 -48 28 q22 6 34 -6 Z" fill="' + A.haupt + '"/>'
      + '<path d="M68 110 q-32 -2 -34 20 q16 2 24 -6 Z" fill="' + A.zier + '"/>';

    const pablo = ausgebreitet
      // langer Schwanz
      + '<path d="M104 118 q46 34 62 108 q-17 -5 -28 -19 q-4 15 -11 21 q-34 -48 -42 -100 Z" fill="' + A.dunkel + '"/>'
      + '<path d="M112 128 q40 36 50 96 q-13 -7 -20 -20 q-20 -34 -36 -70 Z" fill="' + A.haupt + '"/>'
      + '<path d="M126 158 q26 28 34 68 q-12 -8 -18 -20 q-9 -24 -20 -44 Z" fill="' + A.zier + '"/>'
      + prachtfedern
      // Körper
      + '<path d="M68 70 q-24 24 -20 58 q4 34 34 38 q32 4 42 -26 q10 -30 -6 -54 q-16 -24 -50 -16 Z" fill="' + A.haupt + '"/>'
      + '<path d="M96 78 q24 16 24 54 q0 26 -14 32 q-6 -40 -10 -86 Z" fill="' + A.dunkel + '" opacity=".3"/>'
      // angelegter Flügel in drei Farbbändern
      + '<path d="M92 86 q30 10 32 44 q2 28 -14 38 q-20 -4 -26 -34 q-6 -30 8 -48 Z" fill="' + A.dunkel + '"/>'
      + '<path d="M99 104 q22 10 21 36 q-1 20 -11 26 q-13 -8 -15 -30 q-2 -22 5 -32 Z" fill="' + A.zier + '"/>'
      + '<path d="M105 132 q14 11 12 32 q-2 13 -9 16 q-9 -10 -9 -26 q0 -13 6 -22 Z" fill="' + A.hell + '"/>'
      + '<path d="M103 152 q10 14 9 28" stroke="' + A.dunkel + '" stroke-width="3" fill="none" stroke-linecap="round"/>'
      // Hals
      + '<path d="M62 74 q-6 -18 8 -28 q16 -12 32 0 q12 10 6 30 Z" fill="' + A.haupt + '"/>'
      + schild
      + kopfTeil(z, A)
      // Beine und Krallen
      + (liegt
          ? '<path d="M72 176 q-6 16 2 24 M88 178 q-2 16 6 22" stroke="#8a8a8a" stroke-width="6" fill="none" stroke-linecap="round"/>'
          : '<path d="M76 166 v22 M96 166 v22" stroke="#9a9a9a" stroke-width="7.5" fill="none" stroke-linecap="round"/>'
          + '<path d="M66 190 q10 6 20 0 M86 190 q10 6 20 0" stroke="#8a8a8a" stroke-width="7" fill="none" stroke-linecap="round"/>');

    const gruppe = liegt
      ? '<g transform="translate(14,92) rotate(78 100 120) scale(' + (0.86 * A.gross) + ')">' + pablo + '</g>'
      : '<g class="' + huepf + '" transform="rotate(' + neigung + ' 92 150) translate(' + (100 - 100*A.gross) + ','
        + (150 - 150*A.gross) + ') scale(' + A.gross + ')">' + pablo + '</g>';

    // Leuchtpunkte und Lichtkranz der hohen Stufen
    const funken = (!A.funken || liegt) ? '' : '<g class="pablo-funken">'
      + [[34,60],[164,78],[28,128],[172,140],[48,36],[152,34],[18,96],[182,104]]
          .slice(0, A.funken * 3)
          .map(f => '<circle cx="' + f[0] + '" cy="' + f[1] + '" r="' + (1.8 + (f[0]%3)*0.5) + '" fill="' + A.zier + '"/>').join('')
      + '</g>';
    const aura = (!A.aura || liegt) ? '' :
      '<circle cx="96" cy="120" r="86" fill="none" stroke="' + A.zier + '" stroke-width="3" opacity=".35"/>'
      + '<circle cx="96" cy="120" r="74" fill="' + A.hell + '" opacity=".12"/>';

    const stange = liegt ? ''
      : '<path d="M26 192 H174" stroke="#a9702f" stroke-width="12" stroke-linecap="round"/>'
      + '<path d="M26 189 H174" stroke="#c98b4b" stroke-width="4.5" stroke-linecap="round"/>';

    return '<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">'
      + kaefig + spiegel + leiter + glocke
      + '<ellipse cx="100" cy="236" rx="78" ry="6" fill="#e3e8df"/>'
      + aura + stange + federn + gruppe + funken + napf
      + '</svg>';
  }

  // ---------------------------------------------------------------- Shop
  const SHOP = [
    { id:'koerner', name:'Körnermischung',   bild:'🌾', preis:3,  futter:35, wasser:0,  laune:4,
      satz:{ en:'Mmm, seeds!', de:'Mmh, Körner!' } },
    { id:'apfel',   name:'Stück Apfel',      bild:'🍎', preis:6,  futter:50, wasser:12, laune:12,
      satz:{ en:'An apple! My favourite.', de:'Ein Apfel! Sein Lieblingsessen.' } },
    { id:'wasser',  name:'Frisches Wasser',  bild:'💧', preis:2,  futter:0,  wasser:60, laune:4,
      satz:{ en:'Fresh water. Thank you!', de:'Frisches Wasser. Danke!' } },
    { id:'saft',    name:'Fruchtsaft',       bild:'🧃', preis:7,  futter:4,  wasser:65, laune:14,
      satz:{ en:'Juice? What a treat!', de:'Saft? Was für ein Fest!' } },
    { id:'nuss',    name:'Nuss zum Knabbern',bild:'🥜', preis:9,  futter:28, wasser:0,  laune:20,
      satz:{ en:'Crack! I love nuts.', de:'Knack! Ich liebe Nüsse.' } },
    // Zubehör bleibt dauerhaft im Käfig
    { id:'glocke',  name:'Glöckchen',        bild:'🔔', preis:18, deko:true, laune:25,
      satz:{ en:'A bell! Ring, ring, ring!', de:'Ein Glöckchen! Kling, kling, kling!' } },
    { id:'leiter',  name:'Kletterleiter',    bild:'🪜', preis:28, deko:true, laune:30,
      satz:{ en:'Now I can climb!', de:'Jetzt kann ich klettern!' } },
    { id:'spiegel', name:'Spiegel',          bild:'🪞', preis:35, deko:true, laune:35,
      satz:{ en:'Who is that handsome bird?', de:'Wer ist dieser hübsche Vogel?' } },
    { id:'kaefig',  name:'Großer Käfig',     bild:'🏠', preis:60, deko:true, laune:40,
      satz:{ en:'A real home. Thank you!', de:'Ein richtiges Zuhause. Danke!' } }
  ];

  // ---------------------------------------------------------------- Zeit
  // Futter, Wasser und Laune sinken, solange niemand da ist.
  const PRO_STUNDE = { futter: 4, wasser: 5, laune: 2.5 };
  function neuBerechnen(p, jetzt){
    p = Object.assign({ futter:70, wasser:70, laune:70, zuletzt:jetzt, deko:{} }, p || {});
    const stunden = Math.max(0, (jetzt - (p.zuletzt || jetzt)) / 3600000);
    // Zubehör macht ihn zufriedener, die Laune sinkt dann langsamer
    const anzahlDeko = Object.keys(p.deko || {}).length;
    const bremse = 1 - Math.min(0.5, anzahlDeko * 0.12);
    p.futter = Math.max(0, Math.round(p.futter - stunden * PRO_STUNDE.futter));
    p.wasser = Math.max(0, Math.round(p.wasser - stunden * PRO_STUNDE.wasser));
    p.laune  = Math.max(0, Math.round(p.laune  - stunden * PRO_STUNDE.laune * bremse));
    p.tageWeg = Math.floor(stunden / 24);
    p.zuletzt = jetzt;
    return p;
  }

  // ---------------------------------------------------------------- Sprüche
  // Immer zuerst Englisch. Das Deutsche erscheint erst beim Antippen – so lernt man mit.
  function spruch(p, name){
    const z = zustandVon(p);
    const du = name || 'you';
    if(z === 'amBoden'){
      const liste = [
        { en:'Where were you? I lost some feathers …', de:'Wo warst du? Ich habe Federn verloren …' },
        { en:'Hello? Anybody there? I waited ' + p.tageWeg + ' days!', de:'Hallo? Jemand da? Ich habe ' + p.tageWeg + ' Tage gewartet!' },
        { en:'Phew, ' + du + '. I thought you were gone for ever.', de:'Puh, ' + du + '. Ich dachte, du kommst nie wieder.' }
      ];
      return liste[p.tageWeg % 3];
    }
    if(z === 'schwach') return p.futter <= 10
      ? { en:"I'm hungry. Do you have some food?", de:'Ich habe Hunger. Hast du etwas zu essen?' }
      : { en:"My bowl is empty. I'm thirsty.",     de:'Mein Napf ist leer. Ich habe Durst.' };
    if(z === 'traurig')    return { en:"I'm bored. Let's practise!",        de:'Mir ist langweilig. Lass uns üben!' };
    if(z === 'gluecklich') return { en:'I feel great! Show me your words.', de:'Mir geht es prima! Zeig mir deine Wörter.' };
    return { en:'Hello ' + du + '! Nice to see you.', de:'Hallo ' + du + '! Schön, dich zu sehen.' };
  }

  window.PAPAGEI = { NAME: NAME, ARTEN: ARTEN, artVon: artVon, svg: svg, SHOP: SHOP, neuBerechnen: neuBerechnen,
                     zustandVon: zustandVon, spruch: spruch, PRO_STUNDE: PRO_STUNDE };
})();
