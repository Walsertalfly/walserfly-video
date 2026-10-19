// Vokabel-Land – die Weltkarte.
//
// Zehn Inseln, von unten nach oben. Unten fängt man an, oben im Himmelsschloss ist das Ziel.
// Je höher, desto mehr Wörter pro Level und desto schneller wird buchstabiert.
// Zu jeder Insel gehört ein Papagei (Stufe 1 bis 10), der ihre Farben trägt.
// Freigeschaltete Papageien stehen in der Sammlung.
window.VOKABEL_WELT = [
  { id:'smaragd',  name:'Smaragd-Inseln',    stufe:'1. und 2. Klasse', pos:[22,90], form:'inseln',
    farbe:'#4ec97a', farbe2:'#2a9a52', papagei:1,  tempoStufe:0, proLevel:6,
    was:'Die allerersten Wörter: Farben, Zahlen, Tiere' },

  { id:'muschel',  name:'Muschelbucht',      stufe:'3. und 4. Klasse', pos:[58,82], form:'inseln',
    farbe:'#2ec4b6', farbe2:'#149c92', papagei:2,  tempoStufe:1, proLevel:8,
    was:'Familie, Essen, mein Zimmer' },

  { id:'sonnen',   name:'Sonnenbucht',       stufe:'5. Klasse',        pos:[26,71], form:'inseln',
    farbe:'#ffc247', farbe2:'#e08a14', papagei:3,  tempoStufe:2, proLevel:10,
    was:'Tierpark, Orte, Wo ist was' },

  { id:'nachtwald',name:'Nachtwald',         stufe:'6. Klasse',        pos:[64,62], form:'wald',
    farbe:'#8b6cf0', farbe2:'#5633c0', papagei:4,  tempoStufe:3, proLevel:10,
    was:'Schule, mein Tag, Hobbys' },

  { id:'sandmeer', name:'Sandmeer',          stufe:'7. Klasse',        pos:[24,53], form:'wueste',
    farbe:'#e8b06a', farbe2:'#b87c2e', papagei:5,  tempoStufe:4, proLevel:12,
    was:'Reisen, Einkaufen, früher' },

  { id:'korallen', name:'Korallenriff',      stufe:'8. Klasse',        pos:[66,44], form:'inseln',
    farbe:'#ff5fa2', farbe2:'#d62a75', papagei:6,  tempoStufe:5, proLevel:12,
    was:'Freunde, Gefühle, erzählen' },

  { id:'eiskrone', name:'Eiskronen-Gebirge', stufe:'9. Klasse',        pos:[26,34], form:'berg',
    farbe:'#79d2ff', farbe2:'#2a86c4', papagei:7,  tempoStufe:6, proLevel:14,
    was:'Wetter, Technik, berichten' },

  { id:'schatten', name:'Schattenfelder',    stufe:'10. Klasse',       pos:[66,26], form:'wald',
    farbe:'#6e4ad6', farbe2:'#38206e', papagei:8,  tempoStufe:7, proLevel:14,
    was:'Arbeit, Zukunft, Meinungen' },

  { id:'drakon',   name:'Drakonspitze',      stufe:'Meisterprüfung',   pos:[30,16], form:'vulkan',
    farbe:'#ff6a2a', farbe2:'#b32a08', papagei:9,  tempoStufe:8, proLevel:16,
    was:'Alle schweren Wörter auf einmal' },

  { id:'himmel',   name:'Himmelsschloss',    stufe:'Das Ziel',         pos:[64,8],  form:'wolke',
    farbe:'#ffe9a8', farbe2:'#d4a311', papagei:10, tempoStufe:9, proLevel:16,
    was:'Wer hier ankommt, kann alles' }
];

// ---------------------------------------------------------------- Weltkarte zeichnen
// Stil „Fantasy-Reich": dunkler Sternenhimmel, jede Insel in ihrer eigenen Gestalt.
(function(){
  const W = window.VOKABEL_WELT;

  // Die Gestalt jeder Insel. x,y ist ihr Mittelpunkt, f die helle und d die dunkle Farbe.
  function gestalt(r, x, y, f, d){
    switch(r.form){
      case 'berg':   // vereiste Gipfel
        return '<path d="M' + (x-9) + ' ' + (y+3) + ' L' + (x-3) + ' ' + (y-6)
             + ' L' + x + ' ' + (y-1) + ' L' + (x+4) + ' ' + (y-7) + ' L' + (x+9) + ' ' + (y+3) + ' Z" fill="' + d + '"/>'
             + '<path d="M' + (x-3) + ' ' + (y-6) + ' L' + (x-1) + ' ' + (y-3) + ' L' + (x+1) + ' ' + (y-5)
             + ' L' + (x+4) + ' ' + (y-7) + ' L' + (x+2) + ' ' + (y-2) + ' Z" fill="#ffffff" opacity=".85"/>'
             + '<path d="M' + (x-9) + ' ' + (y+3) + ' L' + (x-3) + ' ' + (y-6) + ' L' + x + ' ' + (y-1) + ' Z" fill="' + f + '" opacity=".6"/>';
      case 'vulkan': // glühender Krater
        return '<path d="M' + (x-9) + ' ' + (y+3) + ' L' + (x-1) + ' ' + (y-8)
             + ' q1 -1 2 0 L' + (x+9) + ' ' + (y+3) + ' Z" fill="' + d + '"/>'
             + '<path d="M' + (x-3) + ' ' + (y-2) + ' q3 -5 6 0 q-3 3 -6 0 Z" fill="' + f + '"/>'
             + '<circle cx="' + x + '" cy="' + (y-7) + '" r="1.6" fill="#ffd98a" opacity=".75"/>'
             + '<circle cx="' + (x+2.6) + '" cy="' + (y-9.6) + '" r="1" fill="#ffd98a" opacity=".5"/>';
      case 'wald':   // dunkle Baumwipfel
        return '<path d="M' + (x-9) + ' ' + (y+3) + ' q-2 -4 2 -6 q2 -5 7 -4 q5 -3 8 2 q4 2 1 8 Z" fill="' + d + '"/>'
             + [-5,0,5].map(o =>
                 '<path d="M' + (x+o) + ' ' + (y+2) + ' l-2.2 -3 h1.2 l-1.6 -2.4 h1.2 l-1 -2 l2.4 0 l-1 2 h1.2 l-1.6 2.4 h1.2 Z" fill="' + f + '"/>'
               ).join('');
      case 'wueste': // Dünen
        return '<path d="M' + (x-10) + ' ' + (y+2) + ' q-1 -5 4 -5 q4 -4 8 -1 q6 -2 8 3 q2 4 -3 5 Z" fill="' + f + '"/>'
             + '<path d="M' + (x-5) + ' ' + (y+1) + ' q3 -3 6 0 M' + (x+2) + ' ' + (y-1) + ' q2 -2 4 0" stroke="' + d + '" stroke-width=".5" fill="none"/>';
      case 'wolke':  // Wolkenschloss
        return '<path d="M' + (x-10) + ' ' + (y+2) + ' q-2 -5 3 -5 q2 -5 7 -3 q4 -4 8 1 q5 0 3 6 Z" fill="' + f + '"/>'
             + '<path d="M' + (x-3) + ' ' + (y+1) + ' v-6 l3 -4 l3 4 v6 Z" fill="#fff6d8"/>'
             + '<path d="M' + (x-1) + ' ' + (y-9) + ' l1 -3 l1 3 Z" fill="' + d + '"/>';
      default:       // schwebende Insel
        return '<ellipse cx="' + x + '" cy="' + y + '" rx="9.5" ry="5.5" fill="' + d + '"/>'
             + '<ellipse cx="' + x + '" cy="' + (y-1) + '" rx="9" ry="5" fill="' + f + '"/>'
             + '<circle cx="' + (x-3) + '" cy="' + (y-2) + '" r="1.6" fill="#ffffff" opacity=".3"/>';
    }
  }

  // offen: { inselId: true }. hier: auf welcher Insel man gerade steht.
  function svg(offen, hier){
    offen = offen || {};

    // Weg von Insel zu Insel, leicht geschwungen
    let weg = '';
    for(let i = 0; i < W.length - 1; i++){
      const a = W[i].pos, b = W[i+1].pos;
      const mx = (a[0] + b[0]) / 2 + (i % 2 ? -6 : 6);
      weg += 'M' + a[0] + ' ' + a[1] + ' Q' + mx + ' ' + ((a[1] + b[1]) / 2) + ' ' + b[0] + ' ' + b[1] + ' ';
    }

    const sterne = [[10,8],[88,16],[30,5],[74,30],[6,46],[94,56],[48,22],[18,66],[82,78],[40,92],
                    [62,70],[26,38],[52,50],[70,88],[14,24],[96,36],[36,76],[58,12],[8,84],[86,48]]
      .map(p => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r=".5" fill="#fff" opacity=".55"/>').join('');

    const regionen = W.map((r, i) => {
      const frei = !!offen[r.id];
      const hierIst = r.id === hier;
      const x = r.pos[0], y = r.pos[1];
      const f = frei ? r.farbe  : '#55657a';
      const d = frei ? r.farbe2 : '#3b4757';
      return '<g class="region' + (frei ? ' frei' : ' zu') + (hierIst ? ' hier' : '') + '" data-id="' + r.id + '">'
        + '<ellipse cx="' + x + '" cy="' + (y+1) + '" rx="13" ry="8" fill="' + f + '" opacity="' + (frei ? '.16' : '.07') + '"/>'
        + gestalt(r, x, y, f, d)
        + (hierIst ? '<circle cx="' + x + '" cy="' + y + '" r="12" fill="none" stroke="#ffd98a" '
            + 'stroke-width=".7" stroke-dasharray="1.5 1.5"/>' : '')
        + (frei ? '' : '<text x="' + x + '" y="' + (y+1.4) + '" text-anchor="middle" font-size="5">🔒</text>')
        + '<text class="rname" x="' + x + '" y="' + (y+9) + '" text-anchor="middle">' + r.name + '</text>'
        + '<text class="rstufe" x="' + x + '" y="' + (y+12.4) + '" text-anchor="middle">' + r.stufe + '</text>'
        + '</g>';
    }).join('');

    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="weltkarte">'
      + '<defs><radialGradient id="weltHimmel" cx="50%" cy="40%" r="75%">'
      + '<stop offset="0%" stop-color="#2a4e86"/><stop offset="60%" stop-color="#16305c"/>'
      + '<stop offset="100%" stop-color="#070e1d"/></radialGradient></defs>'
      + '<rect width="100" height="100" fill="url(#weltHimmel)"/>'
      + sterne
      // Nebelschwaden zwischen den Inseln
      + '<ellipse cx="30" cy="48" rx="34" ry="12" fill="#3a6aa8" opacity=".14"/>'
      + '<ellipse cx="72" cy="30" rx="28" ry="10" fill="#4a7ab8" opacity=".12"/>'
      + '<path d="' + weg + '" fill="none" stroke="#ffd98a" stroke-width=".7" '
      + 'stroke-dasharray="1.6 2" opacity=".6"/>'
      + regionen
      + '<text x="50" y="5.5" text-anchor="middle" font-size="4.4" font-weight="800" '
      + 'fill="#ffd98a" letter-spacing=".5">VOKABEL-LAND</text>'
      + '</svg>';
  }

  window.WELTKARTE = { svg: svg };
})();
