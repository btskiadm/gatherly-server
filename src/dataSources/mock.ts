import { Category } from "../models/category.model";
import { City } from "../models/city.model";
import { Group } from "../models/group.model";
import { User } from "../models/user.model";

export const DBCities: City[] = [
  { value: "warsaw", label: "Warszawa" },
  { value: "krakow", label: "Kraków" },
  { value: "gdansk", label: "Gdańsk" },
  { value: "wroclaw", label: "Wrocław" },
  { value: "poznan", label: "Poznań" },
  { value: "lodz", label: "Łódź" },
  { value: "szczecin", label: "Szczecin" },
  { value: "lublin", label: "Lublin" },
  { value: "bydgoszcz", label: "Bydgoszcz" },
  { value: "katowice", label: "Katowice" },
  { value: "bialystok", label: "Białystok" },
  { value: "czestochowa", label: "Częstochowa" },
  { value: "radom", label: "Radom" },
  { value: "torun", label: "Toruń" },
  { value: "kielce", label: "Kielce" },
  { value: "gliwice", label: "Gliwice" },
  { value: "zabrze", label: "Zabrze" },
  { value: "olsztyn", label: "Olsztyn" },
  { value: "rzeszow", label: "Rzeszów" },
  { value: "zielona_gora", label: "Zielona Góra" },
  { value: "opole", label: "Opole" },
  { value: "gorzow_wielkopolski", label: "Gorzów Wielkopolski" },
  { value: "plock", label: "Płock" },
  { value: "bielsko_biala", label: "Bielsko-Biała" },
  { value: "walbrzych", label: "Wałbrzych" },
  { value: "legnica", label: "Legnica" },
  { value: "elblag", label: "Elbląg" },
  { value: "tarnow", label: "Tarnów" },
  { value: "chorzow", label: "Chorzów" },
  { value: "kalisz", label: "Kalisz" },
  { value: "gdynia", label: "Gdynia" },
  { value: "sosnowiec", label: "Sosnowiec" },
  { value: "ruda_slaska", label: "Ruda Śląska" },
  { value: "tychy", label: "Tychy" },
  { value: "dabrowa_gornicza", label: "Dąbrowa Górnicza" },
  { value: "pila", label: "Piła" },
  { value: "ostrow_wielkopolski", label: "Ostrów Wielkopolski" },
  { value: "konin", label: "Konin" },
  { value: "pabianice", label: "Pabianice" },
  { value: "suwalki", label: "Suwałki" },
  { value: "grudziadz", label: "Grudziądz" },
  { value: "wloclawek", label: "Włocławek" },
  { value: "lomza", label: "Łomża" },
  { value: "glogow", label: "Głogów" },
  { value: "zamosc", label: "Zamość" },
  { value: "jastrzebie_zdroj", label: "Jastrzębie-Zdrój" },
  { value: "mielec", label: "Mielec" },
  { value: "swidnica", label: "Świdnica" },
  { value: "stargard", label: "Stargard" },
  { value: "belchatow", label: "Bełchatów" },
  { value: "ciechanow", label: "Ciechanów" },
  { value: "krosno", label: "Krosno" },
  { value: "tczew", label: "Tczew" },
  { value: "malbork", label: "Malbork" },
  { value: "kwidzyn", label: "Kwidzyn" },
  { value: "nowy_sacz", label: "Nowy Sącz" },
  { value: "oswiecim", label: "Oświęcim" },
  { value: "przemysl", label: "Przemyśl" },
  { value: "zakopane", label: "Zakopane" },
  { value: "ostroleka", label: "Ostrołęka" },
];

export const DBCategories: Category[] = [
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

const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id metus rhoncus, lobortis justo id, tincidunt nibh. Ut ac nulla ut neque feugiat ultricies. Integer nisl ante, mollis non dapibus at, egestas sed magna. Aenean scelerisque feugiat magna, a tincidunt neque. Donec at nunc quis mi elementum elementum non non magna. Sed varius eros non libero convallis malesuada. Pellentesque congue aliquet tortor nec aliquet.
Nam neque tellus, fringilla id luctus sed, tempor efficitur ante. Ponsectetur adipiscing elit. Phasellus non ullamcorper risus, in bibendum lectus. Aliquam erat volutpat. Phasellus vel felis ac tortor tincidunt mattis sit amet nec quam. Etiam commodo est posuere dolor gravida, quis fermentum neque dapibus. Phasellus porta dignissim magna eget aliquet. Phasellus pulvinar porttitor lacus vitae fermentum. Integer mattis elit quam, non pulvinar mauris efficitur nec. Aenean et luctus lectus. Duis a aliquet dui. Nam sit amet velit ex. Maecenas fringilla, urna eget consequat fermentum, tellus leo dictum lacus, non fringilla neque metus nec ante.
Nam mattis ex nec luctus efficitur. Nunc convallis nulla diam, in pharetra diam tincidunt a. Nam faucibus eget libero sit amet tincidunt. Nullam sed nibh at sapien rhoncus efficitur. Curabitur accumsan tortor fermentum turpis faucibus luctus. Phasellus mattis magna elit, ac tristique libero dignissim in. Proin sapien neque, ultrices vitae augue ut, eleifend mattis libero. Integer viverra arcu id ligula auctor, sed vestibulum tortor aliquam. Morbi et odio et purus lacinia rhoncus. Sed id turpis tincidunt, consequat justo sed, laoreet ligula. Nulla in nisi enim. Donec mollis tortor id quam placerat iaculis. Donec semper nulla augue. Suspendisse laoreet enim volutpat neque iaculis, a euismod orci mollis. Nulla ac dignissim nulla.
In a ex convallis, dapibus ligula sed, viverra urna. Sed id arcu non augue feugiat porttitor. Aenean tempor purus in ligula rhoncus tempor. Sed non mauris auctor, sollicitudin lorem vitae, pulvinar risus. Praesent porttitor, tortor a volutpat fermentum, augue nibh maximus enim, nec posuere magna leo ac arcu. Mauris aliquet magna tellus, et lacinia nibh volutpat in. Aenean vulputate risus mauris, eget sagittis lacus tempus non. Vestibulum at diam et dui ornare congue ultricies sit amet purus. Integer et magna posuere, porta arcu vitae, ultrices purus. Vivamus eu odio nibh. In ut nisi tincidunt, posuere nulla non, bibendum magna. Proin et metus et ipsum venenatis mollis.
Nunc imperdiet congue nunc. Donec vestibulum erat quam, nec sollicitudin elit luctus a. Curabitur faucibus nisi vel sapien pulvinar venenatis. Nulla ac metus suscipit, placerat diam ut, congue risus. Quisque odio ex, aliquet ac gravida dignissim, tincidunt elementum mi. Maecenas fringilla accumsan orci, eget aliquam velit bibendum quis. Fusce tincidunt mauris eu maximus porttitor. Nam placerat ipsum at mauris fermentum placerat.
Maecenas semper consectetur libero, eget semper diam euismod eget. Suspendisse sollicitudin bibendum magna, eu dictum tortor. Nunc faucibus erat a sem tincidunt ultricies. Cras venenatis turpis sit amet tellus dignissim dictum. Praesent dictum, lorem eu volutpat sagittis, quam velit tristique risus, eu venenatis nisl eros non elit. Sed at nisl at nunc cursus sodales tincidunt vel augue. Morbi ac libero mollis, tempus justo nec, interdum tortor.
Curabitur ut erat eget ex posuere accumsan quis at lectus. Nam velit libero, lobortis nec odio pretium, ultrices fringilla purus. Donec hendrerit ultricies ultrices. Etiam gravida arcu id tempus suscipit. Vestibulum vel ante laoreet, aliquet est non, mattis tellus. In cursus tincidunt lectus, vel ultricies eros iaculis non. Morbi id maximus orci. Vivamus id suscipit dolor, eu venenatis purus. Aliquam at ligula posuere, luctus sapien in, commodo diam. Sed vel turpis quis elit faucibus ultrices.
Proin auctor eget leo at maximus. Nullam placerat ipsum ultrices, rutrum sem non, mattis tellus. Morbi ut hendrerit neque. Vivamus placerat quis arcu at mollis. Maecenas ornare cursus tortor vitae aliquet. Sed turpis dolor, blandit eu arcu vitae, gravida tempor sem. Ut aliquam pharetra sodales. Etiam quis lacus in ex tincidunt aliquet. Nunc sagittis maximus dolor, vitae condimentum ligula consectetur non. Etiam non metus eget massa pharetra pellentesque quis a lectus. Nam posuere nunc sed turpis tincidunt, eget aliquet augue sodales. Quisque iaculis consequat felis et iaculis. Maecenas placerat libero id iaculis auctor. Etiam quis sapien vel enim consectetur tempor. Aenean sed est semper, posuere enim nec, imperdiet nulla.
Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed vel vehicula enim. Sed eu aliquet mauris, a accumsan nisi. Etiam mauris quam, venenatis et nisl eu, vehicula convallis nibh. Integer orci ex, varius placerat quam at, dictum porttitor urna. Sed elit lacus, venenatis auctor risus vel, fringilla pretium ex. Suspendisse lacinia sagittis lacus, ut porta turpis venenatis non. Integer vitae facilisis nulla. Nulla facilisi. Aliquam eget maximus mi. Fusce id sem vitae justo lobortis rhoncus. Morbi ut vestibulum nunc. Donec ornare venenatis tellus, vel porta mauris tempor at.
Donec id ipsum non lorem congue suscipit. Integer imperdiet, sapien at auctor scelerisque, eros mi molestie nisl, et venenatis sapien tellus at mauris. Donec sollicitudin volutpat enim, ac posuere felis pretium non. Proin in metus tristique, maximus metus in, pellentesque tortor. Aliquam nec dolor non enim luctus ultrices. Suspendisse efficitur velit ex. Suspendisse hendrerit enim id consectetur consequat. Donec bibendum, lorem ac consequat rutrum, dui turpis euismod erat, sed egestas lectus ante ac leo. Donec sit amet ultricies erat. Sed varius ultricies libero, et interdum justo porttitor sit amet. Sed eget ligula eu justo vulputate auctor eget ac nunc. Vivamus consectetur, urna non posuere commodo, diam massa sollicitudin ex, ac ultricies lacus quam eu velit. Morbi turpis tortor, tincidunt at condimentum a, volutpat nec nisi.
Fusce sed dui volutpat, egestas enim blandit, ornare ante. Proin ac nisl facilisis, mollis elit quis, aliquet risus. Integer tempor in elit id semper. Vivamus id ligula et ex fringilla finibus. Donec gravida purus metus, in eleifend eros tincidunt non. Donec nisi tellus, aliquam sit amet ex eu, facilisis faucibus ipsum. Donec quis nibh arcu. Mauris consectetur ex in ultrices fringilla. Vivamus nec dui pellentesque, ornare tortor nec, bibendum arcu. Cras suscipit odio quis leo ullamcorper efficitur. Phasellus vel placerat dui. Nunc risus enim, dignissim vitae interdum at, maximus non lorem. Maecenas at ornare justo. Nulla molestie tortor id magna dictum vehicula. Nullam in purus dignissim, mollis ante nec, sagittis eros. Pellentesque arcu ipsum, rhoncus ut convallis sit amet, suscipit sed mi.
Phasellus at laoreet risus. Phasellus dictum gravida diam, quis interdum elit gravida vitae. Donec malesuada quam quis aliquam ultrices. Cras dapibus facilisis ipsum, pretium efficitur felis. Curabitur orci augue, pulvinar sit amet turpis sed, pellentesque laoreet ipsum. Nulla facilisi. Nam vel quam lectus. Quisque sodales est non leo venenatis, non tempus eros bibendum. Ut in enim arcu. Pellentesque fermentum ligula tortor, a eleifend augue ornare sed. Etiam sem nunc, auctor quis sapien non, ornare convallis nisi. Aliquam nisl diam, feugiat a tristique sed, tempor non diam. Mauris in rutrum felis. Sed quis dapibus est, eu finibus magna.
Quisque tempor felis ut nisl vehicula, ac tincidunt nibh varius. Duis eu purus et ipsum mattis viverra convallis vel neque. Maecenas ac efficitur nisi. Nullam hendrerit mollis turpis, nec bibendum ipsum dictum a. Integer posuere neque ac eros consectetur, eu pellentesque eros vehicula. In hac habitasse platea dictumst. Pellentesque sagittis placerat maximus. Ut venenatis ante tellus, sit amet vestibulum turpis dignissim eget. Aenean consequat leo a libero egestas volutpat. Cras faucibus, nunc at scelerisque mollis, enim metus venenatis orci, vel porttitor urna tellus eget nibh. Etiam pulvinar elit eget felis malesuada, finibus lobortis eros molestie. Sed vitae ornare metus. Fusce ut rutrum leo.
Phasellus pretium nisl consectetur, convallis est eget, congue magna. Nam tempor lacus vitae felis sodales ultricies. Nam sagittis magna vitae nulla feugiat pellentesque. Integer vestibulum, lectus sit amet ullamcorper condimentum, nisi nisi feugiat neque, nec accumsan tortor purus at purus. Sed eu rhoncus lacus. Nullam feugiat venenatis ex, eget vestibulum dui luctus scelerisque. Phasellus at elit magna.
Maecenas lacus ligula, hendrerit nec efficitur eget, commodo ac sapien. Proin quam ex, tempus vitae justo quis, facilisis mattis neque. Integer felis lorem, mollis eu justo sed, lobortis eleifend metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam magna neque, fermentum eget cursus id, feugiat ultrices nibh. Sed euismod pretium massa ac semper. Mauris fringilla augue nibh, ut ornare lacus ornare nec. Fusce a elit nec magna facilisis tristique. Nulla vehicula consectetur mi, ac viverra diam elementum et. Integer eleifend est purus, a suscipit eros sollicitudin vel. Integer lobortis congue tempus. In sed sem et urna rutrum finibus id vitae tortor.
Ut faucibus venenatis elit ac tristique. Sed eu euismod nibh, sit amet consectetur justo. In ultricies, est quis venenatis pretium, nibh turpis sagittis magna, congue consectetur est erat eget sapien. Cras tellus est, aliquam non turpis vel, pretium faucibus nisl. Vivamus erat arcu, ornare in malesuada sed, molestie nec nibh. Vestibulum at sapien purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse ullamcorper, velit quis aliquam varius, nunc quam accumsan justo, vulputate scelerisque augue mauris sed felis. Aliquam egestas lectus magna, sed porta nisl auctor sit amet. Aliquam id lacinia nibh, ut porttitor tortor. Praesent et pulvinar nulla. Fusce blandit elementum neque ut ullamcorper. In hac habitasse platea dictumst. Fusce commodo ligula ligula, sit amet volutpat erat lacinia quis.
Curabitur sed augue aliquet, tristique diam vulputate, consectetur nisl. Ut semper turpis vel sapien blandit, sit amet feugiat ante sodales. Vestibulum consectetur lacinia libero sed porta. Donec finibus convallis urna, at imperdiet ipsum dapibus ornare. Nullam ac libero a arcu eleifend ultricies eget eu risus. Ut malesuada risus sit amet risus dictum, ut dapibus libero dapibus. Nunc eget scelerisque quam. Ut scelerisque mauris dui, vel iaculis leo facilisis sit amet. Integer tempor sagittis augue, sit amet placerat nibh vestibulum at. Praesent suscipit velit ante, vitae mollis turpis sagittis vitae. Morbi sed volutpat metus.
Etiam ullamcorper quam tellus, sit amet pretium velit tincidunt a. Morbi molestie justo pulvinar cursus gravida. Proin pharetra metus sagittis velit vulputate, non imperdiet odio gravida. Cras ut odio eu purus eleifend lobortis. Nulla non neque rutrum, pulvinar dolor ut, consectetur neque. Nunc porta accumsan ligula, at mattis diam vehicula lobortis. Aenean tincidunt nulla nisi. Ut id ullamcorper magna.
Donec sed diam ut ligula vulputate vestibulum. Aliquam erat volutpat. Mauris euismod, ex ut varius feugiat, eros erat consectetur ex, sit amet eleifend ante turpis at tortor. Quisque efficitur dictum ipsum, eget iaculis arcu convallis nec. Etiam sed efficitur nibh. Nunc gravida hendrerit tellus, eu consectetur dui tempus sit amet. Integer gravida vestibulum condimentum. Mauris quis hendrerit tellus. Donec id odio at nibh pulvinar fermentum ut non ante. Phasellus quis neque maximus, facilisis neque a, consectetur turpis. Praesent eget diam eros. Aenean blandit et libero sed tincidunt.
Donec eget neque ac magna vestibulum venenatis eget gravida nisi. Ut facilisis nulla vel efficitur feugiat. Maecenas ut orci odio. Sed metus erat, tristique ac est at, accumsan semper justo. Integer mattis metus sit amet ex laoreet feugiat. Phasellus sit amet pellentesque odio, et lobortis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent blandit neque sit amet placerat iaculis. Etiam vel urna congue, iaculis leo quis, sagittis mi. Nunc odio felis, blandit pretium auctor at, dictum ac nunc. Etiam ullamcorper eros vel arcu pretium accumsan.
Vivamus tincidunt semper felis eget eleifend. Suspendisse potenti. Integer dignissim velit arcu, sodales tristique est interdum sed. Donec sodales aliquam purus, aliquam gravida turpis suscipit at. Vestibulum vehicula gravida rutrum. Ut facilisis semper arcu in dapibus. Aliquam semper nisl purus, sed varius erat varius in. Phasellus ac dictum turpis, non ornare purus.
Morbi semper mauris eget augue finibus posuere. Pellentesque vitae leo bibendum, lobortis nulla id, malesuada urna. Curabitur egestas vestibulum lacus, vel fringilla sem vulputate ac. Sed sed hendrerit est. Curabitur dignissim gravida volutpat. Aliquam et orci sit amet lacus pretium dapibus. Donec condimentum lacus interdum neque pellentesque lacinia. Nunc sed nisi eros. Vivamus euismod, diam et euismod faucibus, justo est pellentesque sapien, nec pretium arcu turpis nec nisi.
Phasellus fringilla ligula nec sem blandit convallis. Nulla fringilla in massa consectetur maximus. Curabitur odio magna, elementum sit amet nibh et, faucibus dignissim mauris. Maecenas ultricies pretium nulla, vel pharetra lacus ullamcorper in. In lobortis lacinia erat id imperdiet. Mauris non lacinia nulla, eu suscipit leo. Suspendisse sit amet orci vitae purus sagittis pharetra ut sed est. Integer vel orci ullamcorper, cursus dolor ut, convallis erat. Morbi massa risus, sagittis in orci at, pharetra porta lectus. Vivamus vel orci tristique, laoreet elit vitae, faucibus justo. Nam est est, dapibus in mattis et, tincidunt a tellus. Phasellus vitae nibh porttitor, lobortis massa eget, scelerisque lacus. Maecenas pretium sit amet mauris at finibus. Quisque laoreet, nisl ut egestas imperdiet, leo odio dapibus quam, non vestibulum urna erat eget risus.
Fusce vitae metus faucibus, laoreet eros vel, accumsan mi. Etiam faucibus diam ut eros dictum, at rutrum ex convallis. Quisque eget quam gravida, varius nunc eget, cursus ex. Fusce tristique dignissim fermentum. Nulla ac leo nec erat ultrices rutrum. Vivamus efficitur turpis arcu, non auctor purus ultricies sed. Phasellus a accumsan lorem. In dui erat, efficitur non lacus eu, consequat pulvinar lorem. Ut eget consequat magna.
Etiam sit amet nisl urna. Curabitur elit mi, consectetur at molestie vitae, rutrum vel nisl. Donec velit dolor, efficitur nec blandit vel, porttitor a enim. Cras turpis erat, pharetra hendrerit dolor eget, eleifend pharetra turpis. Aliquam eu enim turpis. Pellentesque aliquam fermentum volutpat. Duis vitae velit eget quam congue tincidunt in et urna.
Sed vitae metus non felis iaculis molestie sed eget est. Morbi ultrices risus venenatis euismod faucibus. Suspendisse potenti. Sed tincidunt facilisis dui, quis vehicula odio ullamcorper auctor. Etiam pharetra facilisis sem, nec fringilla nunc tincidunt ut. Nam dui elit, dictum vitae magna et, mattis scelerisque eros. Nam vehicula augue nec augue tempor vulputate. Donec iaculis ut elit id pulvinar. Morbi porttitor iaculis sem eu porta.
Mauris pretium enim nec vestibulum mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum condimentum pretium cursus. Aenean sollicitudin, lorem quis lacinia eleifend, est purus tincidunt erat, ut vulputate nisl dolor a ex. Nulla euismod iaculis justo, eget bibendum mi venenatis eget. In eget vulputate ante, at tristique mauris. Morbi convallis lacus sit amet felis molestie elementum. In pellentesque mauris nec mi vehicula facilisis. Integer vel faucibus arcu, ac eleifend lacus. Integer id laoreet libero. Nullam ac viverra tortor, nec aliquet turpis. Curabitur leo nulla, elementum eget finibus sit amet, dapibus sit amet nibh. Donec tristique consequat turpis, in porttitor felis finibus ut.
Aliquam mollis lectus nec nisi tincidunt, ut efficitur justo posuere. Nullam vehicula dolor at egestas auctor. Duis nec porta est, ornare rutrum ex. Sed eget sollicitudin velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer sit amet felis ac libero pulvinar sollicitudin id vel sapien. Etiam ac faucibus quam, a hendrerit libero. Aliquam ac pharetra nisl, vitae pharetra velit. Phasellus hendrerit libero a purus vehicula congue. Pellentesque et tellus finibus, tristique leo vel, feugiat ipsum.
Aenean blandit ligula eleifend diam aliquam dictum. Fusce sit amet ullamcorper sapien. Pellentesque in neque condimentum, lacinia purus quis, gravida massa. Ut sit amet tristique sem. Nunc ut commodo arcu. Quisque fringilla ligula nec felis facilisis semper. Integer eget laoreet leo, nec suscipit risus. Vestibulum sagittis ac nisl vel finibus. Fusce interdum porttitor lectus. Mauris dapibus mattis aliquam. Sed vehicula diam non ipsum facilisis rutrum. Morbi hendrerit nisl est, vitae consequat augue sollicitudin id. Proin sollicitudin finibus enim sed imperdiet. Aliquam erat volutpat. Suspendisse tristique massa quis felis vulputate fringilla.
Duis a libero eget felis porttitor ornare a nec metus. In consequat dui vel elit aliquet, sit amet facilisis nunc venenatis. Integer id gravida velit, at fringilla lacus. Nullam efficitur iaculis interdum. Nullam feugiat sapien felis, eget viverra nulla tristique sit amet. Sed varius molestie tellus id aliquet. Ut faucibus urna in orci condimentum congue. Vivamus id augue lacus. Donec cursus nisl non erat volutpat dictum. Vestibulum elit leo, pulvinar sagittis urna in, pretium ullamcorper risus.
Ipsum dolor sit amet, consectetur adipiscing elit. Nulla at lectus lectus. Suspendisse eget euismod odio. Donec sit amet massa interdum magna molestie tempus. Duis scelerisque id neque non pharetra. Duis faucibus et velit sit amet egestas. Phasellus faucibus, felis quis suscipit cursus, nisl nulla dictum purus, non scelerisque eros leo at justo. Nullam ac pharetra diam. Aliquam at rhoncus sapien. Nullam sollicitudin leo ac augue feugiat convallis. Praesent egestas dui a dolor vestibulum posuere.
Phasellus egestas dignissim arcu, non bibendum justo efficitur quis. Sed turpis eros, convallis at ipsum id, dignissim euismod mi. Duis ut vulputate enim. Sed vel mauris enim. Donec dui tortor, rutrum quis lorem non, interdum volutpat enim. Quisque vel est non nunc lacinia rutrum sit amet aliquam nibh. Vivamus eu condimentum nulla. Vivamus nec dolor elit. Nullam sit amet facilisis est. Vestibulum dictum odio nec sem convallis accumsan. Suspendisse vitae urna scelerisque, eleifend orci in, consectetur urna. In sodales condimentum mi eget condimentum. Praesent posuere mattis massa.
Quisque arcu arcu, aliquet eget neque vitae, cursus blandit justo. Sed tempor accumsan aliquet. Fusce quis nisl eget sem semper imperdiet ut a nunc. Nullam tincidunt dictum purus sit amet elementum. Vivamus ullamcorper ultrices augue at feugiat. Mauris volutpat vel mauris sit amet accumsan. In hac habitasse platea dictumst. Pellentesque gravida condimentum euismod. In hac habitasse platea dictumst. Curabitur aliquet feugiat mi, non tempor velit. Mauris pretium metus sit amet nisl cursus, sit amet ultricies enim cursus. Ut velit nisl, mattis in tellus id, pellentesque sodales ipsum. Cras interdum tincidunt ornare. Sed fringilla commodo nisl in gravida. Nullam nec mi ultrices, blandit diam eu, condimentum arcu. Nulla fermentum erat laoreet metus commodo, luctus congue nibh lobortis.
Curabitur a finibus purus. Etiam eget leo ac elit maximus auctor non sed purus. Nam et condimentum nibh. Praesent quis lacinia turpis. Ut finibus enim velit. Curabitur tincidunt massa magna, faucibus condimentum tellus vestibulum vitae. Fusce ut varius felis. Nullam est sem, pretium ut nulla vitae, elementum efficitur quam. Vestibulum sodales congue purus, quis gravida ligula lacinia ut.
Vestibulum sed libero rutrum, scelerisque risus ut, viverra neque. Proin bibendum turpis in egestas ornare. Nunc suscipit lectus quis sagittis dapibus. Nulla malesuada ac libero eu hendrerit. In hac habitasse platea dictumst. Vivamus nec vulputate nisl. Ut tempor, mi eget placerat sagittis, sem turpis condimentum ante, in volutpat nibh dui sit amet justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque mollis magna justo, nec porta risus aliquam pharetra. Maecenas a tellus sed odio rutrum finibus. Nam condimentum aliquet nisl, vitae convallis lacus hendrerit sit amet.
Cras id lectus vehicula, bibendum dui vel, lobortis ligula. Nam non vulputate nisi. Proin consequat sed urna et bibendum. Proin lacinia ex eu eros blandit fringilla. Donec rutrum tortor purus. Ut vulputate sit amet dui in tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut dictum sem ac mi tincidunt, ac scelerisque dolor placerat. Vestibulum ut nisl vel magna semper elementum vel in massa. Proin placerat dui lectus, hendrerit imperdiet ex rhoncus vitae. Mauris viverra mi mauris, sit amet semper nisl ultricies auctor. Nullam et dolor finibus, dapibus libero in, elementum quam. Cras urna eros, finibus et elit vel, hendrerit suscipit ante.
Nunc nec massa sem. Vestibulum arcu augue, laoreet vel metus ut, accumsan scelerisque ligula. Cras tincidunt ligula eget tortor aliquet, et accumsan felis ultrices. Aenean iaculis convallis sem nec pharetra. Fusce sit amet egestas elit. Etiam vel mauris a ante luctus sodales. Nam imperdiet tincidunt facilisis. Praesent facilisis tortor eget diam posuere, in tincidunt libero tristique. Nunc interdum lorem eget vehicula pharetra. Fusce aliquet enim turpis, in auctor odio condimentum at. Maecenas vulputate diam eu iaculis dictum. Quisque malesuada sit amet neque at congue. Fusce vitae auctor ex, in fringilla lacus.
In eleifend sit amet elit vitae lacinia. Pellentesque pulvinar metus vel quam sagittis ornare. Aliquam tempus, lacus vitae lacinia posuere, enim lacus rutrum orci, non tempus sapien justo a elit. Aliquam eget urna risus. Nulla tempus porttitor sollicitudin. Vivamus tellus urna, scelerisque in congue et, condimentum id dui. Nunc quis lobortis est. Fusce finibus efficitur ullamcorper. Proin quis odio augue. Maecenas accumsan orci a dolor interdum luctus vitae at lectus. Proin tincidunt nunc ut efficitur maximus. Donec pulvinar scelerisque augue, a bibendum nisi dictum sit amet. Pellentesque ut risus ut erat egestas viverra. Nulla fermentum purus in ante rhoncus, a consequat risus auctor. Vivamus turpis urna, elementum ac sollicitudin vel, malesuada non ligula. Quisque nec convallis tellus.
Vestibulum sit amet blandit erat. Praesent lobortis lorem est, vel imperdiet sem pulvinar vel. Dolor sit amet, consectetur adipiscing elit. Phasellus interdum neque est, nec efficitur nisi ultrices sed. Donec id hendrerit nunc, non rhoncus libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse ornare, ante eu rutrum elementum, nisl lectus tristique mauris, tempor gravida felis est ac urna. Nulla massa lorem, blandit quis molestie in, tempor at dui. Vestibulum mattis, lectus quis commodo venenatis, eros magna auctor eros, a ultricies sapien ligula non nunc. Nunc posuere mi fringilla nisl blandit, quis dignissim felis gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
Suspendisse tortor enim, elementum sed ligula et, bibendum scelerisque purus. Mauris diam odio, pharetra finibus erat ac, maximus dapibus eros. Donec tincidunt justo ac tellus tincidunt, nec molestie nisl euismod. Etiam et lorem eget ligula fringilla varius. Aliquam posuere eros accumsan lectus pellentesque, vitae rhoncus eros ornare. Curabitur eleifend iaculis neque, a dapibus libero feugiat sit amet. Vivamus sapien risus, placerat a erat in, viverra tristique arcu.
Suspendisse in pretium purus. Etiam velit neque, euismod nec erat non, interdum ornare nunc. Integer risus eros, ultricies sed massa eget, mattis commodo lacus. Nullam efficitur quam id ligula eleifend, eu mattis dolor convallis. In ac odio sem. Aenean vitae interdum nisi. Etiam in scelerisque magna. Integer vehicula vestibulum magna, quis convallis arcu facilisis sit amet. Phasellus at leo non purus rhoncus accumsan. Cras aliquam sagittis quam, aliquet accumsan elit fermentum sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas tellus orci, dictum ut mattis eget, scelerisque vel ex. Mauris vitae maximus orci.
Nullam nec tincidunt libero. Vestibulum varius sit amet felis vitae auctor. Vestibulum vehicula mi velit, vel cursus dolor vestibulum et. Sed suscipit sed quam eu tempor. Duis consectetur tincidunt consectetur. Quisque commodo orci vel neque sagittis interdum ullamcorper ac risus. Sed congue risus in urna mollis, ut congue mi laoreet.
Nullam lobortis posuere augue, at porta arcu sodales sed. Sed id lacinia purus. Donec sed sodales massa, non accumsan ex. Duis placerat eget felis at hendrerit. Integer vitae ullamcorper eros. In sit amet nisi dignissim risus pretium varius. Nunc ac suscipit augue, non cursus diam. Phasellus elementum egestas quam. Proin gravida arcu sagittis diam lobortis, viverra interdum dui consequat.
Nullam vel aliquam purus, et rutrum lorem. Aliquam iaculis maximus augue eu maximus. In at augue ac erat ullamcorper accumsan. Aliquam id metus quis mi mollis dictum. Mauris vestibulum mattis est, id vehicula nulla fringilla ut. Nam interdum eros tellus, nec tempus lectus cursus a. Maecenas dapibus velit sit amet leo volutpat interdum. In nec ex ut dui efficitur tristique sed et leo. Donec suscipit sagittis aliquet. In purus massa, eleifend commodo magna id, suscipit suscipit risus. Nulla justo lorem, porta ut nulla vitae, scelerisque pellentesque libero. Aenean laoreet feugiat hendrerit. Fusce eget mattis arcu. Praesent ac euismod mi. Nulla facilisi.
Sed interdum dapibus nulla, et lobortis massa blandit et. Donec quis magna suscipit, maximus eros id, vehicula odio. Nulla facilisi. Duis mi purus, malesuada in ex lacinia, ullamcorper dignissim felis. Vivamus eleifend sem vitae dolor vulputate rhoncus non at diam. Aliquam scelerisque ex massa, a varius ipsum lacinia ac. Aliquam at auctor massa, sed varius ligula. Vestibulum sollicitudin magna facilisis ligula lacinia, sit amet lacinia dolor tristique. Morbi venenatis ante tristique quam convallis egestas.
Nulla scelerisque metus eu nunc pulvinar porttitor. Curabitur varius volutpat justo, in dictum quam consequat vitae. Vivamus a arcu vel ligula blandit faucibus. Integer lectus erat, hendrerit at orci vel, elementum tempus lorem. Pellentesque euismod pretium orci, sed congue lacus blandit eget. Nulla condimentum consequat arcu non elementum. Suspendisse potenti. Etiam malesuada dolor lorem, vel porttitor risus luctus in. Cras erat turpis, hendrerit in iaculis quis, sollicitudin ac risus. Suspendisse tristique lectus in lorem consequat, a placerat arcu lacinia. Fusce nec feugiat turpis. Duis convallis magna eu ligula sagittis, fringilla vulputate neque tincidunt. Nulla porttitor, nibh et tincidunt convallis, mauris libero condimentum arcu, a sodales tellus massa sit amet nisi. Donec et gravida magna, a imperdiet arcu. Phasellus nec mi vitae dui vestibulum scelerisque nec in ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
Suspendisse laoreet a arcu sed interdum. Donec nec malesuada elit, vel imperdiet sem. Sed faucibus felis a mauris fringilla blandit. Sed eu dapibus libero, eu vulputate eros. Suspendisse vehicula sapien ut semper tempus. Aliquam facilisis fringilla felis, nec sagittis tellus semper sit amet. Phasellus ullamcorper ullamcorper lorem posuere tristique. Phasellus varius quis odio et suscipit. Consectetur adipiscing elit. Mauris eget nisi id justo posuere auctor a eget tortor. In pulvinar leo nec euismod dictum. Quisque consequat elementum erat, luctus ornare ipsum scelerisque a. Donec ac gravida nulla, non aliquam enim. Proin quis sapien id metus vehicula euismod.
Nunc mi nunc, accumsan sed lorem at, vehicula gravida nisi. Sed volutpat tincidunt sapien ut feugiat. In egestas dolor id neque placerat imperdiet. Sed at porta leo. Aenean posuere ex aliquam odio tincidunt cursus. Suspendisse eu condimentum magna. Maecenas risus ante, pellentesque sit amet bibendum sit amet, vulputate non risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam gravida turpis sodales, semper tortor nec, congue orci. Ut elit erat, rhoncus sit amet dolor eget, suscipit facilisis tortor. Morbi eu efficitur dolor. Etiam fringilla sem erat, quis luctus sapien auctor eget. Pellentesque erat lacus, malesuada sit amet varius non, faucibus a justo. Donec nec nunc sed velit vestibulum ultrices. Nullam placerat ullamcorper ante, eget fringilla purus fermentum sed. Nunc consectetur tortor non elementum dignissim.
Phasellus eget laoreet orci, nec pulvinar ligula. Quisque et varius arcu. Cras ut vehicula odio. Aliquam congue ac tellus quis interdum. Nulla vel tellus bibendum, dapibus ligula condimentum, faucibus leo. Duis eu orci vitae mi sagittis ultrices. Morbi pharetra auctor arcu, non maximus lorem malesuada eget. Morbi tristique urna sit amet lacus convallis dignissim. Vestibulum posuere nibh lorem, sit amet molestie neque varius sit amet. Curabitur nulla sapien, pharetra ultricies egestas sit amet, condimentum accumsan ipsum.
Sed pulvinar nisl tempor sem rutrum convallis id vitae sem. Vestibulum vel elit enim. Fusce aliquet nec tortor nec rhoncus. Quisque nec imperdiet ipsum, eget placerat nisl. Orem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque lectus, iaculis sed blandit quis, luctus in orci. Maecenas in erat sed felis aliquam dignissim a et ligula.
Praesent tristique libero vitae nunc mollis, sed facilisis eros faucibus. Cras id ligula tempus, condimentum sapien vitae, ultrices metus. Aliquam dignissim a lectus eget euismod. Nunc nec urna id sapien condimentum facilisis in vel ligula. Nulla tincidunt odio nisl, at sodales dolor facilisis ut. Nunc nec libero faucibus, dictum ligula vitae, mollis est. In sollicitudin mauris est, at condimentum elit dapibus sed. In hac habitasse platea dictumst. Donec imperdiet ipsum et tortor sagittis vehicula. Nam finibus vehicula neque, volutpat ultricies neque tempus eu. Vivamus maximus tempor arcu, vitae faucibus enim lobortis vitae. Suspendisse vitae risus felis.
Fusce vitae ante porta, porta velit at, ultrices tellus. Maecenas in nibh lacus. Vivamus bibendum a purus non tempor. In quam lorem, tincidunt sed urna varius, tincidunt maximus nunc. Vestibulum efficitur quam pellentesque mi consectetur laoreet. Proin lobortis suscipit neque in hendrerit. Duis ultricies lacus turpis, vitae vestibulum lorem faucibus vel. Nullam malesuada dapibus arcu, hendrerit faucibus purus tincidunt ut. Sed est augue, iaculis non faucibus id, semper mollis augue. Proin venenatis, nunc vestibulum malesuada varius, libero ipsum euismod mi, a placerat metus sapien at magna. Nam id justo sit amet tortor facilisis cursus a et erat. Nam ac tortor metus.
Suspendisse venenatis mauris egestas ipsum laoreet, congue facilisis nulla suscipit. Vivamus ut interdum urna. Vivamus mollis consequat pellentesque. Integer augue neque, efficitur eu condimentum nec, semper vitae odio. Fusce mauris lectus, pellentesque nec tincidunt eget, facilisis non mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut non cursus mi. Curabitur vel rhoncus risus, a tempus leo. Nam sit amet mauris congue, luctus neque vel, iaculis enim. In rhoncus ullamcorper arcu, sit amet vehicula diam vehicula in. Nam pretium mauris nec felis tristique, vitae convallis lectus rutrum. Ut lacus enim, mollis at elit non, rhoncus bibendum nibh. Pellentesque blandit lectus et arcu rutrum, sit amet dignissim nisi aliquet. Cras id varius neque. Suspendisse potenti. Fusce blandit quis justo a sodales.
Mauris gravida rutrum ullamcorper. Etiam massa tellus, rhoncus sit amet porttitor in, malesuada nec justo. Nullam sodales eros at est aliquet ultricies. Nulla sodales congue pulvinar. Suspendisse sollicitudin neque vel odio sagittis accumsan. Quisque eget fringilla arcu. Etiam eget massa accumsan, consequat sapien quis, mattis nunc. Vestibulum turpis lectus, imperdiet sit amet porttitor in, ultrices sed lacus. In sit amet nibh eget odio blandit pharetra. Proin urna massa, egestas in mattis ac, facilisis vitae dui. Quisque dapibus ut lacus non sollicitudin. Phasellus nec arcu et odio gravida tristique vel imperdiet ex. Nullam sed nulla semper, placerat risus vitae, ullamcorper leo.
Integer quam orci, rutrum in iaculis sed, ultricies a risus. Nunc ac justo sapien. Pellentesque congue dolor tellus, a maximus lectus accumsan ac. Etiam et ligula pharetra, luctus ex et, mattis nulla. Nulla nisl elit, hendrerit non dignissim eu, maximus ac est. Quisque ipsum sapien, condimentum non lacus et, commodo bibendum risus. Nam in risus congue, pharetra felis vitae, lobortis dolor. Nunc tortor nisl, tempor id arcu vitae, volutpat lobortis augue. Phasellus vitae nibh id lacus ornare posuere.
Donec vel ultrices mi. Vivamus bibendum purus sit amet facilisis scelerisque. Cras sed nisi accumsan leo tempor facilisis. Nulla sapien ipsum, tincidunt vel ante ac, vestibulum ultricies neque. Donec facilisis tellus nec mi tempor, non sagittis elit eleifend. Duis urna elit, pretium sed leo a, iaculis fringilla risus. Nunc fermentum aliquam venenatis.
Nam euismod, arcu et sodales porta, enim mi accumsan magna, sit amet tempor dolor tellus eu metus. Donec pharetra dignissim tellus, a porttitor nunc ultrices nec. Ut pulvinar, nisl quis suscipit tincidunt, eros est molestie lectus, at viverra tortor sapien id urna. Nam vitae cursus magna. Proin dapibus leo id lorem pellentesque tempor. Morbi venenatis metus a leo ullamcorper aliquam. Proin convallis erat sit amet augue ultrices dictum. Vestibulum et facilisis mauris. Curabitur bibendum nisl augue, convallis bibendum urna malesuada id. Nullam et diam vitae est dignissim mattis. Aenean molestie tellus nulla, eget congue lacus vehicula nec.
Pellentesque a lorem pharetra, pulvinar metus a, pretium ante. Donec placerat elementum purus a imperdiet. Vestibulum et dapibus mi, nec maximus lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras libero velit, faucibus id rutrum eget, consectetur vel mauris. Duis vel massa faucibus, scelerisque eros et, molestie enim. Nulla non ante et sem interdum semper. Proin in libero et felis pretium tristique vitae nec enim.
Donec rhoncus sollicitudin lorem eu auctor. Phasellus ac pharetra orci. Mauris placerat dolor at rhoncus fermentum. Fusce molestie odio id nisi varius, id blandit velit lobortis. Cras non magna auctor dolor interdum blandit. Praesent pellentesque, est nec feugiat aliquet, turpis urna venenatis sem, vel ultrices arcu orci eget dui. Donec facilisis sapien at congue accumsan. Pellentesque ultrices, neque a convallis rutrum, orci sem fringilla sem, eu laoreet tortor dolor a est. Suspendisse potenti. Sed vitae orci tellus. Aenean dignissim diam sed mauris consequat, nec sollicitudin magna gravida. Etiam fermentum, libero eget pulvinar cursus, neque orci facilisis felis, eu imperdiet nisi erat et purus. Integer consectetur lobortis erat quis dictum. Nam hendrerit porta convallis. Vivamus efficitur quis odio a tempor. Vestibulum ut ipsum sit amet lorem lacinia commodo sit amet sed nisl.
Pellentesque placerat purus at quam imperdiet, imperdiet laoreet urna condimentum. Curabitur ac ligula id mauris imperdiet interdum vitae ut orci. Aliquam scelerisque blandit mi, aliquet hendrerit arcu malesuada ut. Fusce interdum in arcu ornare venenatis. Vestibulum suscipit orci a faucibus finibus. Vestibulum quis lectus malesuada, venenatis ante id, tristique urna. Etiam et sem hendrerit, eleifend neque vitae, ullamcorper velit. Suspendisse eu nulla augue. Proin sollicitudin felis quis diam aliquet, vel dictum est dapibus. Nulla vestibulum semper consequat.
`;

const getLoremIpsumSentenses = (s: number, startAt: number = 0) => {
  let sentences = loremIpsum.split(".");

  return sentences
    .slice(startAt, startAt + s)
    .join(". ")
    .trim();
};

export const DBUsers: User[] = [
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    username: "seoquesto",
    thumbnail: { id: "thumbnail", thumb: "" },
    userDetails: {
      id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      description: getLoremIpsumSentenses(4, 1),
      city: DBCities[0],
    },
  },
  {
    id: "f27c9d4b-8c91-489f-a72a-ec1923f3f0b5",
    username: "techwizard",
    thumbnail: { id: "thumbnail", thumb: "" },
    verifiedAt: new Date("2020-10-10").toISOString(),
    userDetails: {
      id: "f27c9d4b-8c91-489f-a72a-ec1923f3f0b5",
      description: getLoremIpsumSentenses(4, 2),
      city: DBCities[1],
    },
  },
  {
    id: "b4f4bc78-e1c5-44b3-b4af-021aa9ed64b5",
    username: "marketingguru",
    thumbnail: { id: "thumbnail", thumb: "" },
    userDetails: {
      id: "b4f4bc78-e1c5-44b3-b4af-021aa9ed64b5",
      description: getLoremIpsumSentenses(4, 3),
      city: DBCities[2],
    },
  },
];

export const DBGroups: Group[] = [];

const numbOfGroups = 100;
const maxEventsPerGroup = 10;
const maxUserPerGroup = 10;
const maxCategoriesPerGroup = 5;
const maxCitiesPerGroup = 1;
const maxCommentsPerGroup = 20;

const iterate = (num: number, func: (index: number) => void) => {
  for (let i = 0; i < num; i++) {
    func(i);
  }
};

iterate(numbOfGroups, (groupIndex) => {
  const arrayable = (num: number) => Array(num).fill("");

  // const totalLogos = GroupLogo4x3.length;
  const totalUsers = DBUsers.length;
  const totalCities = DBCities.length;
  const totalCategories = DBCategories.length;

  // const groupLogoIndex = Math.floor(groupIndex * 1.51) % totalLogos || 1;
  const totalUsersCount = Math.floor(groupIndex * 1.33) % totalUsers || 1;
  const totalCitiesCount = Math.floor(groupIndex * 1.77) % maxCitiesPerGroup || 1;
  const totalCategoriesCount = Math.floor(groupIndex * 1.77) % maxCategoriesPerGroup || 1;
  const totalEventsCount = Math.floor(groupIndex * 1.91) % maxEventsPerGroup;
  const totalCommentsCount = Math.floor(groupIndex * 2.01) % maxCommentsPerGroup;

  const groupId = `group-${groupIndex}`;

  const groupCreatedAt = new Date();
  groupCreatedAt.setDate(groupCreatedAt.getDate() - groupIndex * 7);

  DBGroups.push({
    id: groupId,
    title: getLoremIpsumSentenses(1, groupIndex),
    description: getLoremIpsumSentenses(8, groupIndex + 1),
    createdAt: groupCreatedAt.toISOString(),
    thumbnail: {
      id: `${groupId}_thumbnailds`,
      // thumb: GroupLogo4x3[groupLogoIndex].src,
      thumb: "https://placehold.co/400x200",
    },
    cities: arrayable(totalCitiesCount).map((_, idx) => {
      const cityIndex = (groupIndex + idx) % totalCities;
      const city = DBCities[cityIndex];

      return {
        label: city.label,
        value: city.value,
      };
    }),
    categories: arrayable(totalCategoriesCount).map((_, idx) => {
      const categoryIndex = (groupIndex + idx) % totalCategories;
      const category = DBCategories[categoryIndex];

      return {
        label: category.label,
        value: category.value,
      };
    }),
    sponsored: {
      id: `${groupId}_sponsored`,
      value: groupIndex % 2 === 0,
    },
    verified: {
      id: `${groupId}_verified`,
      value: groupIndex % 3 === 0,
    },
    remote: {
      id: `${groupId}_remote`,
      value: groupIndex % 5 === 0,
    },
    events: arrayable(totalEventsCount).map((_, eventIdx) => {
      const eventId = `${groupId}_event-${eventIdx}`;
      const eventCreatedAt = new Date(groupCreatedAt);
      eventCreatedAt.setDate(eventCreatedAt.getDate() + eventIdx * 3);

      const startAt = new Date(eventCreatedAt);
      const endAt = new Date(eventCreatedAt);

      startAt.setHours(startAt.getHours());
      endAt.setHours(startAt.getHours() + (eventIdx || 1) * 1.1);

      const eventUsersCount = (eventIdx * 3) % totalUsersCount;

      return {
        id: eventId,
        title: getLoremIpsumSentenses(1, groupIndex + eventIdx),
        description: getLoremIpsumSentenses(2, groupIndex + eventIdx + 1),
        createdAt: eventCreatedAt.toISOString(),
        canceled: eventIdx % 2 === 0,
        date: {
          id: `${eventId}_date`,
          startAt: startAt.toISOString(),
          endAt: endAt.toISOString(),
        },
        cities: arrayable(totalCitiesCount).map((_, idx) => {
          const cityIndex = (groupIndex + idx) % totalCities;
          const city = DBCities[cityIndex];

          return {
            label: city.label,
            value: city.value,
          };
        }),
        sponsored: {
          id: `${eventId}_sponsored`,
          value: groupIndex % 2 === 0,
        },
        verified: {
          id: `${eventIdx}_verified`,
          value: groupIndex % 3 === 0,
        },
        remote: {
          id: `${eventIdx}_remote`,
          value: groupIndex % 5 === 0,
        },
        categories: arrayable(totalCategoriesCount).map((_, idx) => {
          const categoryIndex = (groupIndex + idx) % totalCategories;
          const category = DBCategories[categoryIndex];

          return {
            label: category.label,
            value: category.value,
          };
        }),
        users: Array(eventUsersCount)
          .fill("")
          .map((_, userIdx) => {
            const user = DBUsers[userIdx];
            return {
              id: "#",
              isHost: userIdx === 0,
              isModerator: userIdx === 1 || userIdx === 2,
              user: {
                id: user.id,
                username: user.username,
                // staticImageData: user.staticImageData,
                thumbnail: {
                  id: "thumbnail",
                  // thumb: user.staticImageData.src,
                  thumb: "",
                },
                userDetails: {
                  id: "#",
                  description: user.userDetails.description,
                  city: user.userDetails.city,
                },
              },
            };
          }),
      };
    }),
    users: arrayable(totalUsersCount).map((_, userIdx) => {
      const user = DBUsers[userIdx % totalUsersCount];

      return {
        id: "#",
        isHost: userIdx === 0,
        isModerator: userIdx === 1 || userIdx === 2,
        user: {
          verifiedAt: "",
          id: user.id,
          username: user.username,
          // staticImageData: user.staticImageData,
          // thumbnail: { id: "thumbnail", thumb: user.staticImageData.src },
          thumbnail: { id: "thumbnail", thumb: "" },
          userDetails: {
            id: "#",
            description: user.userDetails.description,
            city: user.userDetails.city,
          },
        },
      };
    }),
    comments: arrayable(totalCommentsCount)
      .map((_, commentIdx) => {
        const createdAt = new Date(groupCreatedAt);
        createdAt.setHours(createdAt.getHours() + commentIdx * 12);

        return {
          id: `${groupId}_comment-${commentIdx}`,
          content: getLoremIpsumSentenses(1, commentIdx),
          createdAt: createdAt.toISOString(),
          rate: commentIdx % 6 || 1,
          user: DBUsers[commentIdx % DBUsers.length],
        };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
  });
});
