// Vokabel-Land – Wortlisten (aus dem Workbook, Unit 2: At the wildlife park)
//
// Pro Level: name, woerter[]. Jedes Wort: de (wird gezeigt), en (muss getippt werden),
// warum (kurze Erklaerung zur Schreibweise), esel (Eselsbruecke).
// en darf auch eine Liste sein, z.B. ["there is","there's"] – dann gilt jede Schreibweise.
// Gross/klein, Punkt und Fragezeichen sind egal.
//
// REGEL FUER ESELSBRUECKEN: nur wenn sie auf etwas Echtem beruht, das ein 10-jaehriges Kind
// sofort versteht – ein bekanntes Wort steckt drin (pen in penguin, on in lion, here in where),
// ein Reim mit einem Wort, das es kennt (small/ball), ein Vergleich mit dem deutschen Wort
// (under/unter) oder eine echte Regel (Fragewoerter mit wh).
// BANAL IST GUT: wenn ein kleines bekanntes Wort im grossen steckt, gehoert es rein, auch wenn
// es albern klingt – genau das merkt sich ein Kind.
// Faellt trotzdem nichts Echtes ein: "esel" einfach weglassen. Keine ausgedachten Geschichten
// und keine Hilfswoerter, die das Kind selbst nicht kennt.
window.VOKABEL_LEVEL = [
  {
    name: "Level 1 · Im Tierpark",
    woerter: [
      { de: "Baum",     en: "tree",    warum: "Doppel-e am Ende, das klingt wie „ie“.",
                                       esel: "Nimm three (drei) und streich das h weg: tree." },
      { de: "Affe",     en: "monkey",  warum: "Hinten steht „key“ – wie der Schlüssel.",
                                       esel: "In monkey steckt key (Schlüssel): mon-key." },
      { de: "Papagei",  en: "parrot",  warum: "Doppel-r in der Mitte, ein „t“ am Ende.",
                                       esel: "Schreibt sich wie carrot (Karotte), nur mit p vorne." },
      { de: "Giraffe",  en: "giraffe", warum: "Buchstabe für Buchstabe wie im Deutschen, nur klein geschrieben.",
                                       esel: "Giraffe bleibt Giraffe – nichts ändert sich." },
      { de: "Zug",      en: "train",   warum: "„ai“ in der Mitte klingt wie „ei“.",
                                       esel: "train reimt sich auf rain (Regen). Beide mit ai." },
      { de: "Pinguin",  en: "penguin", warum: "Vorne „pen“, nicht „pin“. Danach „guin“.",
                                       esel: "In penguin steckt pen (Stift): pen-guin." },
      { de: "Führer (im Tierpark)", en: "guide", warum: "„ui“ in der Mitte, am Ende ein stummes „e“.",
                                       esel: "guide und penguin haben beide „gui“ drin." },
      { de: "Löwe",     en: "lion",    warum: "Vier Buchstaben: l-i-o-n.",
                                       esel: "Hinten steckt on (auf): li-on." }
    ]
  },
  {
    name: "Level 2 · Wo ist die Katze?",
    woerter: [
      { de: "neben",    en: "next to",     warum: "Zwei getrennte Wörter: next + to." },
      { de: "in",       en: "in",          warum: "Genau wie im Deutschen." },
      { de: "hinter",   en: "behind",      warum: "Ein Wort: be + hind. Mit „i“, nicht „ei“.",
                                           esel: "In hinter und in behind steckt „hin“." },
      { de: "unter",    en: "under",       warum: "Fast wie im Deutschen, aber mit „d“.",
                                           esel: "unter mit d statt t = under." },
      { de: "auf",      en: "on",          warum: "Nur zwei Buchstaben." },
      { de: "vor",      en: "in front of", warum: "Drei Wörter: in + front + of.",
                                           esel: "In der Mitte steht front – das heißt vorne." }
    ]
  },
  {
    name: "Level 3 · Mehr Wörter",
    woerter: [
      { de: "Zoo",             en: "zoo",       warum: "Wie im Deutschen, nur klein geschrieben." },
      { de: "schön, hübsch",   en: "beautiful", warum: "Der schwierige Teil ist vorne: b-e-a-u. Hinten nur ein „l“.",
                                                esel: "Big Elephants Are Ugly – große Elefanten sind hässlich. Die ersten Buchstaben: b-e-a-u." },
      { de: "groß",            en: "big",       warum: "Drei Buchstaben, kurzes „i“.",
                                                esel: "big wie Big Ben – die große Uhr in London." },
      { de: "jetzt",           en: "now",       warum: "„ow“ klingt wie „au“.",
                                                esel: "now reimt sich auf how. Beide mit ow." },
      { de: "es gibt, da ist (Einzahl)", en: ["there is", "there's"], warum: "there + is. Kurz: there's.",
                                                esel: "EIN Ding: there is. Bei there's steht das Zeichen ’ für das weggelassene i." },
      { de: "es gibt, da sind (Mehrzahl)", en: "there are", warum: "there + are. Bei mehreren Dingen nie „is“.",
                                                esel: "MEHRERE Dinge: there are." },
      { de: "Was ist los?",    en: ["What is it?", "What's it?"], warum: "what + is + it, am Ende ein Fragezeichen.",
                                                esel: "Alle Fragewörter fangen mit wh an: what, where, when, who." },
      { de: "wo",              en: "where",     warum: "Fängt mit „wh“ an, endet auf „ere“.",
                                                esel: "In where steckt here (hier): w + here." },
      { de: "klein",           en: "small",     warum: "Doppel-l am Ende, „a“ klingt wie „o“.",
                                                esel: "small reimt sich auf ball. Beide mit zwei l." }
    ]
  }
];
