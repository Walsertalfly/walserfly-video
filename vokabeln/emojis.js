// Vokabel-Land – Bilder für neue Wörter, ohne Aufwand und ohne Kosten.
//
// Die Emojis stecken schon in jedem Handy, Tablet und PC. Sie sind gezeichnete Figuren,
// kosten nichts, brauchen kein Internet und müssen nicht heruntergeladen werden.
// Für ein neues Wort genügt eine Zeile hier: "word": "🖼".
// Gibt es kein passendes Emoji, bleibt das Wort einfach ohne Bild.
//
// Gezeichnete Bilder (bilder.js) haben Vorrang. Die braucht es nur dort, wo es kein
// Emoji gibt – zum Beispiel bei den Präpositionen mit Katze und Korb.
window.VOKABEL_EMOJI = {

  // ---- Tiere ----
  "dog":"🐶", "cat":"🐱", "horse":"🐴", "cow":"🐮", "pig":"🐷", "sheep":"🐑", "goat":"🐐",
  "rabbit":"🐰", "mouse":"🐭", "bird":"🐦", "fish":"🐟", "bear":"🐻", "elephant":"🐘",
  "tiger":"🐯", "snake":"🐍", "frog":"🐸", "duck":"🦆", "chicken":"🐔", "hen":"🐔",
  "owl":"🦉", "bee":"🐝", "butterfly":"🦋", "spider":"🕷", "ant":"🐜", "wolf":"🐺",
  "fox":"🦊", "deer":"🦌", "camel":"🐪", "whale":"🐳", "dolphin":"🐬", "shark":"🦈",
  "crocodile":"🐊", "turtle":"🐢", "zebra":"🦓", "monkey":"🐵", "lion":"🦁", "penguin":"🐧",
  "giraffe":"🦒", "parrot":"🦜", "snail":"🐌", "worm":"🪱", "horse riding":"🏇",

  // ---- Essen und Trinken ----
  "apple":"🍎", "banana":"🍌", "orange":"🍊", "lemon":"🍋", "carrot":"🥕", "bread":"🍞",
  "cheese":"🧀", "milk":"🥛", "water":"💧", "egg":"🥚", "cake":"🍰", "ice cream":"🍦",
  "pizza":"🍕", "soup":"🍲", "tea":"🍵", "coffee":"☕", "juice":"🧃", "chocolate":"🍫",
  "potato":"🥔", "tomato":"🍅", "strawberry":"🍓", "meat":"🍖", "rice":"🍚", "salad":"🥗",
  "breakfast":"🥐", "lunch":"🍽", "dinner":"🍽", "sweets":"🍬", "honey":"🍯",

  // ---- Haus und Dinge ----
  "house":"🏠", "home":"🏠", "door":"🚪", "window":"🪟", "chair":"🪑", "table":"🧾",
  "bed":"🛏", "lamp":"💡", "light":"💡", "key":"🔑", "clock":"🕐", "watch":"⌚",
  "telephone":"📞", "phone":"📱", "computer":"💻", "television":"📺", "tv":"📺",
  "book":"📖", "pen":"🖊", "pencil":"✏", "bag":"🎒", "box":"📦", "ball":"⚽",
  "toy":"🧸", "picture":"🖼", "mirror":"🪞", "basket":"🧺", "garden":"🏡", "kitchen":"🍳",
  "bathroom":"🛁", "room":"🛋", "school":"🏫", "umbrella":"☂", "candle":"🕯", "bottle":"🍾",
  "cup":"🥤", "plate":"🍽", "knife":"🔪", "spoon":"🥄", "fork":"🍴", "camera":"📷",

  // ---- Natur und Wetter ----
  "tree":"🌳", "sun":"☀", "moon":"🌙", "star":"⭐", "cloud":"☁", "rain":"🌧",
  "snow":"❄", "wind":"💨", "storm":"⛈", "fire":"🔥", "flower":"🌼", "grass":"🌿",
  "mountain":"⛰", "sea":"🌊", "river":"🏞", "lake":"🏞", "beach":"🏖", "forest":"🌲",
  "leaf":"🍂", "stone":"🪨", "sky":"🌇", "rainbow":"🌈", "island":"🏝", "field":"🌾",

  // ---- Verkehr ----
  "car":"🚗", "bus":"🚌", "bike":"🚲", "bicycle":"🚲", "plane":"✈", "ship":"🚢",
  "boat":"⛵", "taxi":"🚕", "lorry":"🚚", "truck":"🚚", "train":"🚂", "street":"🛣",
  "road":"🛣", "bridge":"🌉", "station":"🚉", "airport":"🛫", "ticket":"🎫",

  // ---- Menschen und Körper ----
  "man":"👨", "woman":"👩", "boy":"👦", "girl":"👧", "baby":"👶", "family":"👪",
  "friend":"👥", "teacher":"🧑‍🏫", "doctor":"👨‍⚕", "hand":"✋", "eye":"👁", "ear":"👂",
  "nose":"👃", "mouth":"👄", "foot":"🦶", "leg":"🦵", "arm":"💪", "heart":"❤", "tooth":"🦷",

  // ---- Kleidung ----
  "shirt":"👕", "t-shirt":"👕", "trousers":"👖", "shoes":"👟", "hat":"👒", "cap":"🧢",
  "jacket":"🧥", "dress":"👗", "sock":"🧦", "socks":"🧦", "glasses":"👓", "scarf":"🧣",

  // ---- Schule und Zeit ----
  "homework":"📝", "exercise book":"📓", "ruler":"📏", "scissors":"✂", "map":"🗺",
  "board":"📋", "test":"📄", "pencil case":"✏", "rubber":"🧽",
  "day":"🌅", "night":"🌃", "morning":"🌄", "evening":"🌆", "now":"⏰", "today":"📅",
  "week":"📅", "month":"🗓", "year":"🎉", "birthday":"🎂", "time":"⏳",

  // ---- Freizeit ----
  "music":"🎵", "song":"🎤", "film":"🎬", "game":"🎮", "sport":"🏃", "football":"⚽",
  "swimming":"🏊", "party":"🎉", "holiday":"🏖", "present":"🎁", "dance":"💃", "ski":"⛷",

  // ---- Orte und Allerlei ----
  "zoo":"🦁", "where":"📍", "money":"💶", "shop":"🏪", "hospital":"🏥", "police":"🚓",
  "farm":"🚜", "city":"🏙", "village":"🏘", "church":"⛪", "castle":"🏰", "museum":"🏛",
  "letter":"✉", "question":"❓", "answer":"💬", "work":"🛠", "job":"🛠",

  // ---- Gefühle ----
  "happy":"😀", "sad":"😢", "cold":"🥶", "hot":"🥵", "tired":"😴", "hungry":"🤤",
  "angry":"😠", "afraid":"😨", "funny":"😂", "nice":"🙂", "beautiful":"🌸", "strong":"💪"
};
