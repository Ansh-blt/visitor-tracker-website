// Anime character names from popular series
const animeCharacters = [
  // One Piece
  'Luffy', 'Zoro', 'Nami', 'Sanji', 'Chopper', 'Robin', 'Franky', 'Brook',
  'Jinbe', 'Ace', 'Sabo', 'Shanks', 'Whitebeard', 'Kaido', 'BigMom', 'Doflamingo',
  'Crocodile', 'Mihawk', 'Buggy', 'Smoker', 'Tashigi', 'Coby', 'Helmeppo', 'Garp',
  'Sengoku', 'Aokiji', 'Akainu', 'Kizaru', 'Rayleigh', 'Hancock', 'Law', 'Kid',
  
  // Bleach
  'Ichigo', 'Rukia', 'Orihime', 'Chad', 'Uryu', 'Renji', 'Byakuya', 'Toshiro',
  'Kenpachi', 'Yachiru', 'Mayuri', 'Unohana', 'Kyoraku', 'Ukitake', 'Yamamoto',
  'Aizen', 'Gin', 'Tousen', 'Ulquiorra', 'Grimmjow', 'Stark', 'Barragan', 'Halibel',
  'Nelliel', 'Szayel', 'Aaroniero', 'Zommari', 'Yammy', 'Nnoitra', 'Kisuke', 'Yoruichi',
  
  // JoJo's Bizarre Adventure
  'Jonathan', 'Joseph', 'Jotaro', 'Josuke', 'Giorno', 'Jolyne', 'Johnny', 'Gappy',
  'Dio', 'Kars', 'Wamuu', 'Esidisi', 'Kira', 'Diavolo', 'Pucci', 'Valentine',
  'Kakyoin', 'Polnareff', 'Avdol', 'Iggy', 'Okuyasu', 'Koichi', 'Rohan', 'Yukako',
  'Bruno', 'Abbacchio', 'Mista', 'Narancia', 'Fugo', 'Trish', 'Doppio', 'Risotto',
  
  // Jujutsu Kaisen
  'Yuji', 'Megumi', 'Nobara', 'Gojo', 'Nanami', 'Maki', 'Toge', 'Panda',
  'Yuta', 'Sukuna', 'Mahito', 'Jogo', 'Hanami', 'Dagon', 'Choso', 'Kenjaku',
  'Toji', 'Geto', 'Shoko', 'Utahime', 'Miwa', 'Todo', 'Mai', 'Noritoshi',
  'Mechamaru', 'Momo', 'Kokichi', 'Junpei', 'Ino', 'Ijichi', 'Yaga', 'Tengen',
  
  // One Punch Man
  'Saitama', 'Genos', 'King', 'Tatsumaki', 'Fubuki', 'Bang', 'Atomic', 'Darkshine',
  'Watchdog', 'Flashy', 'Zombieman', 'Drive', 'Tanktop', 'Metal', 'Puri', 'Pig',
  'Garou', 'Sonic', 'Hammerhead', 'Carnage', 'Mosquito', 'Beast', 'Armored', 'Boros',
  'Melzargard', 'Groribas', 'Geryuganshoop', 'Vaccine', 'Marugori', 'Kombu', 'Crablante', 'Personification'
];

export const generateAnimeCode = (): string => {
  return animeCharacters[Math.floor(Math.random() * animeCharacters.length)];
};

export const isValidAnimeCode = (code: string): boolean => {
  if (!code || typeof code !== 'string') return false;
  return animeCharacters.some(character => 
    character.toLowerCase() === code.toLowerCase()
  );
};