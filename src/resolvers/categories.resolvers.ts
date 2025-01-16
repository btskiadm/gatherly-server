import { Category } from "../models/models";

const ALL_CATEGORIES: Category[] = [
  { value: "football", label: "Piłka nożna" },
  { value: "chess", label: "Szachy" },
  { value: "walking", label: "Spacer" },
  { value: "gym", label: "Siłownia" },
  { value: "running", label: "Bieganie" },
  { value: "swimming", label: "Pływanie" },
  { value: "cycling", label: "Jazda na rowerze" },
  { value: "hiking", label: "Wędrówki" },
  { value: "yoga", label: "Joga" },
  { value: "dancing", label: "Taniec" },
  { value: "basketball", label: "Koszykówka" },
  { value: "tennis", label: "Tenis" },
  { value: "skiing", label: "Narciarstwo" },
  { value: "climbing", label: "Wspinaczka" },
  { value: "kayaking", label: "Kajakarstwo" },
  { value: "badminton", label: "Badminton" },
  { value: "table_tennis", label: "Tenis stołowy" },
  { value: "golf", label: "Golf" },
  { value: "horse_riding", label: "Jazda konna" },
  { value: "skating", label: "Łyżwiarstwo" },
  { value: "surfing", label: "Surfing" },
  { value: "fishing", label: "Wędkarstwo" },
  { value: "volleyball", label: "Siatkówka" },
  { value: "handball", label: "Piłka ręczna" },
  { value: "archery", label: "Łucznictwo" },
  { value: "boxing", label: "Boks" },
  { value: "fencing", label: "Szermierka" },
  { value: "triathlon", label: "Triathlon" },
  { value: "snowboarding", label: "Snowboarding" },
  { value: "crossfit", label: "Crossfit" },
  { value: "pilates", label: "Pilates" },
  { value: "rowing", label: "Wioślarstwo" },
  { value: "rock_climbing", label: "Wspinaczka skalna" },
  { value: "skateboarding", label: "Jazda na deskorolce" },
  { value: "kickboxing", label: "Kickboxing" },
  { value: "judo", label: "Judo" },
  { value: "karate", label: "Karate" },
  { value: "taekwondo", label: "Taekwondo" },
  { value: "mma", label: "MMA" },
  { value: "cricket", label: "Krykiet" },
  { value: "baseball", label: "Baseball" },
  { value: "softball", label: "Softball" },
  { value: "sailing", label: "Żeglarstwo" },
  { value: "scuba_diving", label: "Nurkowanie" },
  { value: "paragliding", label: "Paralotniarstwo" },
  { value: "skydiving", label: "Skoki spadochronowe" },
  { value: "bungee_jumping", label: "Skoki na bungee" },
  { value: "parkour", label: "Parkour" },
  { value: "mountaineering", label: "Alpinizm" },
  { value: "snorkeling", label: "Snurkowanie" },
  { value: "canoeing", label: "Kajakarstwo górskie" },
  { value: "darts", label: "Rzutki" },
  { value: "bowling", label: "Kręgle" },
  { value: "equestrian", label: "Sporty jeździeckie" },
  { value: "ice_hockey", label: "Hokej na lodzie" },
  { value: "figure_skating", label: "Łyżwiarstwo figurowe" },
  { value: "rugby", label: "Rugby" },
  { value: "american_football", label: "Futbol amerykański" },
  { value: "paddleboarding", label: "Stand-up paddleboarding" },
  { value: "windsurfing", label: "Windsurfing" },
  { value: "kitesurfing", label: "Kitesurfing" },
  { value: "trampoline", label: "Skakanie na trampolinie" },
  { value: "orienteering", label: "Biegi na orientację" },
  { value: "biathlon", label: "Biathlon" },
  { value: "powerlifting", label: "Trójbój siłowy" },
  { value: "bodybuilding", label: "Kulturystyka" },
  { value: "capoeira", label: "Capoeira" },
  { value: "kung_fu", label: "Kung Fu" },
  { value: "sambo", label: "Sambo" },
  { value: "sumo", label: "Sumo" },
  { value: "motocross", label: "Motocross" },
  { value: "kart_racing", label: "Karting" },
  { value: "futsal", label: "Futsal" },
  { value: "lacrosse", label: "Lacrosse" },
  { value: "polo", label: "Polo" },
  { value: "dragon_boat_racing", label: "Wyścigi łodzi smoczych" },
  { value: "curling", label: "Curling" },
  { value: "bobsleigh", label: "Bobsleje" },
  { value: "skeleton", label: "Skeleton" },
  { value: "luge", label: "Saneczkarstwo" },
  { value: "speed_skating", label: "Łyżwiarstwo szybkie" },
  { value: "sled_dog_racing", label: "Wyścigi psich zaprzęgów" },
  { value: "freestyle_skiing", label: "Narciarstwo dowolne" },
  { value: "snowshoeing", label: "Rakiety śnieżne" },
  { value: "paintball", label: "Paintball" },
  { value: "airsoft", label: "Airsoft" },
  { value: "disc_golf", label: "Disc Golf" },
  { value: "ultimate_frisbee", label: "Ultimate Frisbee" },
  { value: "water_polo", label: "Piłka wodna" },
  { value: "synchronized_swimming", label: "Pływanie synchroniczne" },
  { value: "cliff_diving", label: "Skoki do wody z klifu" },
  { value: "high_jump", label: "Skok wzwyż" },
  { value: "long_jump", label: "Skok w dal" },
  { value: "triple_jump", label: "Trójskok" },
  { value: "pole_vault", label: "Skok o tyczce" },
  { value: "hammer_throw", label: "Rzut młotem" },
  { value: "discus_throw", label: "Rzut dyskiem" },
  { value: "javelin_throw", label: "Rzut oszczepem" },
  { value: "shot_put", label: "Pchnięcie kulą" },
  { value: "pentathlon", label: "Pięciobój" },
  { value: "decathlon", label: "Dziesięciobój" },
  { value: "e_sports", label: "E-sport" },
  { value: "speedcubing", label: "Speedcubing" },
  { value: "strongman", label: "Strongman" },
  { value: "cheerleading", label: "Cheerleading" },
  { value: "kite_flying", label: "Latanie latawcem" },
  { value: "bocce", label: "Bule (Bocce)" },
  { value: "pétanque", label: "Pétanque" },
  { value: "croquet", label: "Krokiet" },
  { value: "shuffleboard", label: "Shuffleboard" },
  { value: "tug_of_war", label: "Przeciąganie liny" },
  { value: "tetherball", label: "Tetherball" },
  { value: "quiddich", label: "Quidditch" },
  { value: "robot_wars", label: "Wojny robotów" },
  { value: "drone_racing", label: "Wyścigi dronów" },
  { value: "rock_paper_scissors", label: "Kamień, papier, nożyce" },
  { value: "arm_wrestling", label: "Siłowanie na rękę" },
  { value: "cornhole", label: "Cornhole" },
  { value: "dodgeball", label: "Dwa ognie" },
  { value: "kickball", label: "Kickball" },
  { value: "gaelic_football", label: "Futbol gaelicki" },
  { value: "hurling", label: "Hurling" },
  { value: "paddle_tennis", label: "Paddle Tennis" },
  { value: "pickleball", label: "Pickleball" },
  { value: "street_hockey", label: "Hokej uliczny" },
  { value: "floorball", label: "Unihokej" },
  { value: "sepaktakraw", label: "Sepak Takraw" },
  { value: "kabaddi", label: "Kabaddi" },
  { value: "underwater_rugby", label: "Podwodne rugby" },
  { value: "underwater_hockey", label: "Podwodny hokej" },
  { value: "footvolley", label: "Footvolley" },
  { value: "bossaball", label: "Bossaball" },
  { value: "teqball", label: "Teqball" },
  { value: "slacklining", label: "Slacklining" },
  { value: "kite_surfing", label: "Kite Surfing" },
  { value: "zorbing", label: "Zorbing" },
  { value: "snowkiting", label: "Snowkiting" },
  { value: "speed_skiing", label: "Narciarstwo szybkie" },
  { value: "sandboarding", label: "Sandboarding" },
  { value: "ice_climbing", label: "Wspinaczka lodowa" },
  { value: "gliding", label: "Szybownictwo" },
  { value: "parachuting", label: "Spadochroniarstwo" },
  { value: "base_jumping", label: "BASE jumping" },
  { value: "wingsuit_flying", label: "Latanie w wingsuit" },
  { value: "park_golf", label: "Park Golf" },
  { value: "footgolf", label: "Footgolf" },
  { value: "swamp_football", label: "Błotna piłka nożna" },
  { value: "roller_derby", label: "Roller Derby" },
  { value: "underwater_basket_weaving", label: "Podwodne plecenie koszy" },
  { value: "soapbox_racing", label: "Wyścigi mydelniczek" },
  { value: "chessboxing", label: "Chessboxing" },
  { value: "gaga_ball", label: "Gaga Ball" },
  { value: "spikeball", label: "Spikeball" },
  { value: "freediving", label: "Freediving" },
  { value: "bog_snorkeling", label: "Nurkowanie w bagnie" },
  { value: "log_rolling", label: "Toczenie kłody" },
  { value: "roller_skiing", label: "Narciarstwo na rolkach" },
  { value: "handcycle_racing", label: "Wyścigi rowerów ręcznych" },
  { value: "canoe_polo", label: "Kajak polo" },
  { value: "slalom_skiing", label: "Narciarski slalom" },
  { value: "tower_running", label: "Bieganie po schodach" },
  { value: "stair_climbing", label: "Wspinaczka po schodach" },
  { value: "swimming_with_dolphins", label: "Pływanie z delfinami" },
  { value: "virtual_reality_sports", label: "Sporty wirtualnej rzeczywistości" },
  { value: "bouldering", label: "Buldering" },
  { value: "outrigger_canoeing", label: "Outrigger Canoeing" },
  { value: "canoe_sprinting", label: "Kajakarstwo sprinterskie" },
  { value: "flatwater_kayaking", label: "Kajakarstwo na płaskich wodach" },
];

export default {
  Query: {
    getAllCategories: () => {
      return Promise.resolve(ALL_CATEGORIES);
    },
    getUsedCategories: () => {
      return Promise.resolve(ALL_CATEGORIES.slice(0, Math.floor(ALL_CATEGORIES.length / 2)));
    },
  },
};
