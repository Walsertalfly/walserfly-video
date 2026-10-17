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
(function(){
  const W = window.VOKABEL_WELT;

  const FORMEN = {
    inseln: 'M-34 6 q-6 -14 8 -18 q10 -14 26 -6 q16 -10 26 2 q14 2 10 16 q4 12 -12 14 q-22 8 -40 2 q-16 -2 -18 -10 Z',
    wald:   'M-30 10 q-10 -12 2 -20 q4 -16 22 -12 q14 -12 28 0 q16 4 10 18 q6 12 -10 16 q-26 8 -52 -2 Z',
    wueste: 'M-36 8 q-4 -16 14 -16 q12 -10 24 -2 q18 -6 24 6 q8 12 -8 16 q-28 10 -54 -4 Z',
    berg:   'M-34 12 L-12 -20 L0 -6 L14 -24 L36 12 Z',
    vulkan: 'M-30 12 L-7 -22 q7 -7 14 0 L30 12 Z',
    wolke:  'M-32 4 q-8 -12 6 -16 q6 -12 20 -6 q12 -10 22 2 q14 0 10 14 q-6 10 -26 10 q-22 4 -32 -4 Z'
  };

  function insel(x, y, gr, farbe, farbe2, form){
    const f = FORMEN[form] || FORMEN.inseln;
    return '<g transform="translate(' + x + ',' + y + ') scale(' + gr + ')">'
      + '<path d="' + f + '" fill="' + farbe2 + '" transform="translate(0,3)" opacity=".6"/>'
      + '<path d="' + f + '" fill="' + farbe + '"/>'
      + '</g>';
  }

  // offen: { inselId: true }. hier: auf welcher Insel man gerade steht.
  function svg(offen, hier){
    offen = offen || {};

    let weg = '';
    for(let i = 0; i < W.length - 1; i++){
      const a = W[i].pos, b = W[i+1].pos;
      const mx = (a[0] + b[0]) / 2 + (i % 2 ? -9 : 9);
      weg += 'M' + a[0] + ' ' + a[1] + ' Q' + mx + ' ' + ((a[1] + b[1]) / 2) + ' ' + b[0] + ' ' + b[1] + ' ';
    }

    const regionen = W.map((r) => {
      const frei = !!offen[r.id];
      const hierIst = r.id === hier;
      const x = r.pos[0], y = r.pos[1];
      const farbe  = frei ? r.farbe  : '#55657a';
      const farbe2 = frei ? r.farbe2 : '#3b4757';
      return '<g class="region' + (frei ? ' frei' : ' zu') + (hierIst ? ' hier' : '') + '" data-id="' + r.id + '">'
        + insel(x, y, 0.30, farbe, farbe2, r.form)
        + (hierIst ? '<circle cx="' + x + '" cy="' + (y - 1) + '" r="9" fill="none" stroke="#fff" '
            + 'stroke-width="1" stroke-dasharray="1.6 1.6" opacity=".95"/>' : '')
        + (frei ? '' : '<text x="' + x + '" y="' + (y + 1.5) + '" text-anchor="middle" font-size="5">🔒</text>')
        + '<text class="rname" x="' + x + '" y="' + (y + 9) + '" text-anchor="middle">' + r.name + '</text>'
        + '<text class="rstufe" x="' + x + '" y="' + (y + 12.6) + '" text-anchor="middle">' + r.stufe + '</text>'
        + '</g>';
    }).join('');

    const sterne = [[12,6],[86,12],[8,40],[92,52],[16,66],[82,76],[50,30],[38,20],[70,88],[30,96],[94,32],[6,22]]
      .map(s => '<circle cx="' + s[0] + '" cy="' + s[1] + '" r=".55" fill="#fff" opacity=".45"/>').join('');

    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="weltkarte">'
      + '<defs><radialGradient id="meer" cx="50%" cy="55%" r="72%">'
      + '<stop offset="0%" stop-color="#1d3a63"/><stop offset="100%" stop-color="#0a1626"/>'
      + '</radialGradient></defs>'
      + '<rect width="100" height="100" fill="url(#meer)"/>'
      + sterne
      + '<path d="' + weg + '" fill="none" stroke="#ffffff" stroke-width=".7" stroke-dasharray="1.8 2.2" opacity=".4"/>'
      + regionen
      + '</svg>';
  }

  window.WELTKARTE = { svg: svg, FORMEN: FORMEN };
})();
