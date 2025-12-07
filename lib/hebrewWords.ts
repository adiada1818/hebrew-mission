export type VocabItem = {
  id: number;
  hebrew: string;
  translit: string;
  english: string;
  category: "core" | "base" | "food" | "commands";
};

/**
 * Core everyday words – greetings, pronouns, basic verbs.
 * These are ideal for your friend's first months.
 */
export const coreVocab: VocabItem[] = [
  // Greetings & basics
  { id: 1, hebrew: "שלום", translit: "shalom", english: "hello / peace", category: "core" },
  { id: 2, hebrew: "בוקר טוב", translit: "boker tov", english: "good morning", category: "core" },
  { id: 3, hebrew: "צהריים טובים", translit: "tzohorayim tovim", english: "good afternoon", category: "core" },
  { id: 4, hebrew: "ערב טוב", translit: "erev tov", english: "good evening", category: "core" },
  { id: 5, hebrew: "לילה טוב", translit: "layla tov", english: "good night", category: "core" },
  { id: 6, hebrew: "מה נשמע?", translit: "ma nishma?", english: "how's it going?", category: "core" },
  { id: 7, hebrew: "מה קורה?", translit: "ma kore?", english: "what's up?", category: "core" },
  { id: 8, hebrew: "הכול טוב", translit: "hakol tov", english: "everything's good", category: "core" },
  { id: 9, hebrew: "תודה", translit: "toda", english: "thank you", category: "core" },
  { id: 10, hebrew: "בבקשה", translit: "bevakasha", english: "please / you're welcome", category: "core" },
  { id: 11, hebrew: "סליחה", translit: "sliḥa", english: "sorry / excuse me", category: "core" },

  // Yes / no / maybe
  { id: 12, hebrew: "כן", translit: "ken", english: "yes", category: "core" },
  { id: 13, hebrew: "לא", translit: "lo", english: "no", category: "core" },
  { id: 14, hebrew: "אולי", translit: "ulay", english: "maybe", category: "core" },

  // Pronouns
  { id: 15, hebrew: "אני", translit: "ani", english: "I / me", category: "core" },
  { id: 16, hebrew: "אתה", translit: "ata", english: "you (m, singular)", category: "core" },
  { id: 17, hebrew: "את", translit: "at", english: "you (f, singular)", category: "core" },
  { id: 18, hebrew: "הוא", translit: "hu", english: "he", category: "core" },
  { id: 19, hebrew: "היא", translit: "hi", english: "she", category: "core" },
  { id: 20, hebrew: "אנחנו", translit: "anachnu", english: "we", category: "core" },
  { id: 21, hebrew: "אתם", translit: "atem", english: "you (m, plural)", category: "core" },
  { id: 22, hebrew: "אתן", translit: "aten", english: "you (f, plural)", category: "core" },
  { id: 23, hebrew: "הם", translit: "hem", english: "they (m)", category: "core" },
  { id: 24, hebrew: "הן", translit: "hen", english: "they (f)", category: "core" },

  // To be / to have (spoken)
  { id: 25, hebrew: "יש לי", translit: "yesh li", english: "I have", category: "core" },
  { id: 26, hebrew: "אין לי", translit: "eyn li", english: "I don't have", category: "core" },
  { id: 27, hebrew: "יש לך", translit: "yesh lecha / lach", english: "you have (m/f)", category: "core" },

  // Core verbs
  { id: 28, hebrew: "לאכול", translit: "le'echol", english: "to eat", category: "core" },
  { id: 29, hebrew: "לשתות", translit: "lishtot", english: "to drink", category: "core" },
  { id: 30, hebrew: "ללכת", translit: "lalechet", english: "to go / walk", category: "core" },
  { id: 31, hebrew: "לבוא", translit: "lavo", english: "to come", category: "core" },
  { id: 32, hebrew: "לעבוד", translit: "la'avod", english: "to work", category: "core" },
  { id: 33, hebrew: "לישון", translit: "lishon", english: "to sleep", category: "core" },
  { id: 34, hebrew: "לדבר", translit: "ledaber", english: "to speak", category: "core" },
  { id: 35, hebrew: "להבין", translit: "lehavin", english: "to understand", category: "core" },
  { id: 36, hebrew: "לדעת", translit: "lada'at", english: "to know", category: "core" },
  { id: 37, hebrew: "לרצות", translit: "lirtzot", english: "to want", category: "core" },
  { id: 38, hebrew: "לאהוב", translit: "le'ehov", english: "to love / like", category: "core" },
  { id: 39, hebrew: "לראות", translit: "lir'ot", english: "to see", category: "core" },
  { id: 40, hebrew: "לשמוע", translit: "lishmo'a", english: "to hear", category: "core" },

  // Time words
  { id: 41, hebrew: "היום", translit: "hayom", english: "today", category: "core" },
  { id: 42, hebrew: "מחר", translit: "machar", english: "tomorrow", category: "core" },
  { id: 43, hebrew: "אתמול", translit: "etmol", english: "yesterday", category: "core" },
  { id: 44, hebrew: "עכשיו", translit: "achshav", english: "now", category: "core" },
  { id: 45, hebrew: "אחרי", translit: "acharei", english: "after", category: "core" },
  { id: 46, hebrew: "לפני", translit: "lifnei", english: "before", category: "core" },
  { id: 47, hebrew: "בוקר", translit: "boker", english: "morning", category: "core" },
  { id: 48, hebrew: "צהריים", translit: "tzohorayim", english: "noon / midday", category: "core" },
  { id: 49, hebrew: "ערב", translit: "erev", english: "evening", category: "core" },
  { id: 50, hebrew: "לילה", translit: "layla", english: "night", category: "core" },

  // Places & basic nouns
  { id: 51, hebrew: "בית", translit: "bayit", english: "house / home", category: "core" },
  { id: 52, hebrew: "חדר", translit: "cheder", english: "room", category: "core" },
  { id: 53, hebrew: "עבודה", translit: "avoda", english: "work / job", category: "core" },
  { id: 54, hebrew: "בסיס", translit: "basis", english: "base (army)", category: "core" },
  { id: 55, hebrew: "שולחן", translit: "shulchan", english: "table", category: "core" },
  { id: 56, hebrew: "כיסא", translit: "kise", english: "chair", category: "core" },
  { id: 57, hebrew: "טלפון", translit: "telefon", english: "phone", category: "core" },
  { id: 58, hebrew: "מחשב", translit: "machshev", english: "computer", category: "core" },
  { id: 59, hebrew: "חבר", translit: "chaver", english: "friend (m)", category: "core" },
  { id: 60, hebrew: "חברה", translit: "chavera", english: "friend (f) / girlfriend", category: "core" },

  // Little helper words
  { id: 61, hebrew: "מאוד", translit: "me'od", english: "very", category: "core" },
  { id: 62, hebrew: "כמעט", translit: "kim'at", english: "almost", category: "core" },
  { id: 63, hebrew: "פשוט", translit: "pashut", english: "simple / just", category: "core" },
  { id: 64, hebrew: "קצת", translit: "kzat", english: "a little", category: "core" },
  { id: 65, hebrew: "הרבה", translit: "harbe", english: "a lot / many", category: "core" },
  { id: 66, hebrew: "טוב", translit: "tov", english: "good", category: "core" },
  { id: 67, hebrew: "לא טוב", translit: "lo tov", english: "not good", category: "core" },
];

/**
 * Base life vocab – housing, money, daily needs.
 */
export const baseVocab: VocabItem[] = [
  { id: 101, hebrew: "כסף", translit: "kesef", english: "money", category: "base" },
  { id: 102, hebrew: "כרטיס אשראי", translit: "kartis ashrai", english: "credit card", category: "base" },
  { id: 103, hebrew: "בנק", translit: "bank", english: "bank", category: "base" },
  { id: 104, hebrew: "חוזה", translit: "choze", english: "contract", category: "base" },
  { id: 105, hebrew: "שכירות", translit: "schirut", english: "rent", category: "base" },
  { id: 106, hebrew: "שוכר", translit: "socher", english: "tenant (m)", category: "base" },
  { id: 107, hebrew: "משכיר", translit: "maskir", english: "landlord", category: "base" },
  { id: 108, hebrew: "דירה", translit: "dira", english: "apartment", category: "base" },
  { id: 109, hebrew: "מטבח", translit: "mitbaḥ", english: "kitchen", category: "base" },
  { id: 110, hebrew: "מקלחת", translit: "miklaḥat", english: "shower", category: "base" },
  { id: 111, hebrew: "שירותים", translit: "sherutim", english: "toilet / bathroom", category: "base" },
  { id: 112, hebrew: "כביסה", translit: "kvisa", english: "laundry", category: "base" },
  { id: 113, hebrew: "סבון", translit: "sabon", english: "soap", category: "base" },
  { id: 114, hebrew: "מגבת", translit: "magevet", english: "towel", category: "base" },
  { id: 115, hebrew: "שמיכה", translit: "smicha", english: "blanket", category: "base" },
  { id: 116, hebrew: "כרית", translit: "karit", english: "pillow", category: "base" },
  { id: 117, hebrew: "מיטה", translit: "mita", english: "bed", category: "base" },
  { id: 118, hebrew: "מפתח", translit: "mafte'aḥ", english: "key", category: "base" },
  { id: 119, hebrew: "דלת", translit: "delet", english: "door", category: "base" },
];

/**
 * Food & drink – easy concrete words for practice.
 */
export const foodVocab: VocabItem[] = [
  { id: 201, hebrew: "אוכל", translit: "ochel", english: "food", category: "food" },
  { id: 202, hebrew: "מים", translit: "mayim", english: "water", category: "food" },
  { id: 203, hebrew: "קפה", translit: "kafe", english: "coffee", category: "food" },
  { id: 204, hebrew: "תה", translit: "te", english: "tea", category: "food" },
  { id: 205, hebrew: "לחם", translit: "lechem", english: "bread", category: "food" },
  { id: 206, hebrew: "גבינה", translit: "gvina", english: "cheese", category: "food" },
  { id: 207, hebrew: "חלב", translit: "chalav", english: "milk", category: "food" },
  { id: 208, hebrew: "ביצה", translit: "beitza", english: "egg", category: "food" },
  { id: 209, hebrew: "עוף", translit: "of", english: "chicken (meat)", category: "food" },
  { id: 210, hebrew: "בשר", translit: "basar", english: "meat", category: "food" },
  { id: 211, hebrew: "אורז", translit: "orez", english: "rice", category: "food" },
  { id: 212, hebrew: "ירקות", translit: "yerakot", english: "vegetables", category: "food" },
  { id: 213, hebrew: "פירות", translit: "peirot", english: "fruits", category: "food" },
  { id: 214, hebrew: "מלוח", translit: "malu'aḥ", english: "salty", category: "food" },
  { id: 215, hebrew: "מתוק", translit: "matok", english: "sweet", category: "food" },
  { id: 216, hebrew: "חריף", translit: "ḥarif", english: "spicy", category: "food" },
  { id: 217, hebrew: "ר鷍ב", translit: "rav / save'a", english: "hungry / full", category: "food" },
];

/**
 * Generic everyday commands – can be used in class, base, etc.
 */
export const commandsVocab: VocabItem[] = [
  { id: 301, hebrew: "תשב", translit: "teshev", english: "sit (m, command)", category: "commands" },
  { id: 302, hebrew: "תשבי", translit: "teshvi", english: "sit (f, command)", category: "commands" },
  { id: 303, hebrew: "תעמוד", translit: "ta'amod", english: "stand (m, command)", category: "commands" },
  { id: 304, hebrew: "תעמדי", translit: "ta'amdi", english: "stand (f, command)", category: "commands" },
  { id: 305, hebrew: "תבוא", translit: "tavo", english: "come (m)", category: "commands" },
  { id: 306, hebrew: "תבואי", translit: "tavoi", english: "come (f)", category: "commands" },
  { id: 307, hebrew: "תלך", translit: "telech", english: "go (m)", category: "commands" },
  { id: 308, hebrew: "תלכי", translit: "telchi", english: "go (f)", category: "commands" },
  { id: 309, hebrew: "תחכה", translit: "techake", english: "wait (m)", category: "commands" },
  { id: 310, hebrew: "תקשיב", translit: "takshiv", english: "listen (m)", category: "commands" },
  { id: 311, hebrew: "תדבר לאט", translit: "tedaber le'at", english: "speak slowly", category: "commands" },
  { id: 312, hebrew: "תגיד שוב", translit: "tagid shuv", english: "say again (m)", category: "commands" },
  { id: 313, hebrew: "תראה לי", translit: "tare li", english: "show me (m)", category: "commands" },
  { id: 314, hebrew: "תכתבו", translit: "tichtvu", english: "write (you all)", category: "commands" },
];

/**
 * Army-flavored basic vocab that will be useful for base life.
 * Still uses the same categories, mostly 'base' or 'commands'.
 */
export const armyVocab: VocabItem[] = [
  { id: 401, hebrew: "חייל", translit: "chayal", english: "soldier (m)", category: "base" },
  { id: 402, hebrew: "חיילת", translit: "chayelet", english: "soldier (f)", category: "base" },
  { id: 403, hebrew: "מפקד", translit: "mefaked", english: "commander (m)", category: "base" },
  { id: 404, hebrew: "מפקדת", translit: "mefakedet", english: "commander (f)", category: "base" },
  { id: 405, hebrew: "בסיס סגור", translit: "basis sagur", english: "closed base", category: "base" },
  { id: 406, hebrew: "בסיס פתוח", translit: "basis patu'aḥ", english: "open base", category: "base" },
  { id: 407, hebrew: "שיבוץ", translit: "shibutz", english: "placement / assignment", category: "base" },
  { id: 408, hebrew: "תורנות", translit: "toranut", english: "duty / rotation", category: "base" },
  { id: 409, hebrew: "שמירה", translit: "shmira", english: "guard duty", category: "base" },
  { id: 410, hebrew: "חדר אוכל", translit: "cheder ochel", english: "dining hall", category: "base" },
  { id: 411, hebrew: "מפקדה", translit: "mifkada", english: "HQ / command center", category: "base" },
  { id: 412, hebrew: "נשקייה", translit: "neshkiya", english: "armory", category: "base" },
  { id: 413, hebrew: "מסדר בוקר", translit: "misdar boker", english: "morning formation", category: "base" },
  { id: 414, hebrew: "פקודה", translit: "pkuda", english: "order / command", category: "base" },
];

/**
 * Convenience combined list – if you ever want to map over everything.
 */
export const allVocab: VocabItem[] = [
  ...coreVocab,
  ...baseVocab,
  ...foodVocab,
  ...commandsVocab,
  ...armyVocab,
];
