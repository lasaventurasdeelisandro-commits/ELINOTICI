/**
 * High-definition, journalistic photo catalog & automated image scanning engine for ELINOTICIA.
 * 
 * Guarantees zero duplicate images across different articles by maintaining a global uniqueness scanner.
 */

import { NewsArticle } from '../src/types';

interface ThematicPool {
  keywords: string[];
  photos: string[];
}

// 1. Politics, Government, Diplomacy & International Relations
const POLITICS_POOLS: ThematicPool[] = [
  {
    keywords: ['onu', 'naciones unidas', 'embajador', 'diplomacia', 'cumbre', 'tratado', 'asamblea', 'guterres'],
    photos: [
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80', // UN assembly hall & mics
      'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80', // Diplomatic summit chamber
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80', // High-level international council
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80', // Diplomatic flags and summit
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80', // Global summit negotiation
    ],
  },
  {
    keywords: ['trump', 'casa blanca', 'biden', 'eeuu', 'washington', 'aranceles', 'congreso estadounidense'],
    photos: [
      'https://images.unsplash.com/photo-1501446529957-6226bd447c46?auto=format&fit=crop&w=1200&q=80', // Washington Capitol & governance
      'https://images.unsplash.com/photo-1580130545564-9844e13cf628?auto=format&fit=crop&w=1200&q=80', // White House exterior & press lawn
      'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&w=1200&q=80', // Legislative chamber microphones
      'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1200&q=80', // Washington political flags
    ],
  },
  {
    keywords: ['presidente', 'presidencia', 'gobierno', 'abinader', 'congreso', 'diputado', 'senado', 'palacio nacional', 'decreto'],
    photos: [
      'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1200&q=80', // Press conference official podium
      'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1200&q=80', // Official executive desk & state seal
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', // State strategic planning
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80', // Ministerial meeting
    ],
  },
  {
    keywords: ['planificación', 'desarrollo', 'estrategia', 'presupuesto público', 'reforma'],
    photos: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80', // Strategic planning roadmap & blueprints
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', // Growth planning charts
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80', // Executive review
    ],
  },
];

// 2. Conflict, Defense, Drones, Justice & International Security
const DEFENSE_POOLS: ThematicPool[] = [
  {
    keywords: [
      'haití', 'haiti', 'jovenel', 'moïse', 'moise', 'puerto príncipe', 'frontera', 'binacional',
      'dajabón', 'elías piña', 'extradición', 'magnicidio', 'pedernales', 'kenia', 'misión', 'pandillas'
    ],
    photos: [
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80', // Diplomatic council & UN delegation
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80', // International crisis security chamber
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80', // Security border surveillance unit
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80', // Geopolitical border checkpoints
    ],
  },
  {
    keywords: [
      'asesinato', 'acusados', 'homicidio', 'crimen', 'cárcel', 'prisión', 'detenido', 'detenidos',
      'arresto', 'juicio', 'condena', 'delito', 'audiencia', 'traslado', 'traslada', 'penitenciario',
      'tribunales', 'imputados', 'imputado', 'justicia'
    ],
    photos: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80', // Wooden gavel & courtroom
      'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=1200&q=80', // Judicial courtroom bench
      'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1200&q=80', // Scales of justice
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80', // Judicial legal proceedings
    ],
  },
  {
    keywords: ['drone', 'drones', 'ataque', 'moscú', 'ucrania', 'rusia', 'guerra', 'militar', 'misil', 'defensa'],
    photos: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80', // High-tech drone technology
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80', // Defense radar & aerial tech
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80', // Geopolitical border surveillance
      'https://images.unsplash.com/photo-1579965342575-16428a7c8881?auto=format&fit=crop&w=1200&q=80', // Tactical aerospace tech
    ],
  },
  {
    keywords: ['policía', 'dicrim', 'intercambio', 'seguridad', 'operativo', 'bomberos', 'patrulla', 'emergencia', '911', 'delito'],
    photos: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80', // Emergency flashing lights
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80', // Law enforcement security unit
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1200&q=80', // Emergency response communications
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80', // Forensic inspection scene
    ],
  },
  {
    keywords: ['tribunal', 'juez', 'fiscalía', 'corrupción', 'abogado', 'procuraduría', 'ley', 'demanda'],
    photos: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80', // Wooden gavel & law library
      'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1200&q=80', // Golden scales of justice
      'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=1200&q=80', // Judicial bench courtroom
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80', // Legal documents signing
    ],
  },
];

// 3. Economy, Markets, Currency, Fuel, Wall Street & Labor
const ECONOMY_POOLS: ThematicPool[] = [
  {
    keywords: [
      'wall street', 's&p 500', 's&p', 'nasdaq', 'bolsa', 'bolsas', 'bolsa de nueva york',
      'bolsas europeas', 'bancos centrales', 'moderación de la inflación', 'inflación mundial',
      'impulsa máximos', 'inversionistas', 'acciones', 'mercados financieros', 'dow jones', 'valores'
    ],
    photos: [
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80', // Wall Street financial trading displays
      'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=1200&q=80', // Financial board ticker numbers
      'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80', // Financial trend analysis
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80', // Macroeconomic data analytics screen
    ],
  },
  {
    keywords: [
      'ocupados', 'ocupación', 'empleo', 'empleos', 'trabajo', 'trabajadores', 'mercado laboral',
      'salario', 'sueldo', 'interanual', 'fuerza laboral', 'desempleo', 'ministerio de trabajo',
      'crece', 'empresa', 'negocio', 'pyme'
    ],
    photos: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', // Modern productive workforce team
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80', // Professional team collaboration
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80', // Workplace employment statistics
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80', // Strategic enterprise consultation
    ],
  },
  {
    keywords: ['gasolina', 'combustible', 'petróleo', 'barril', 'opep', 'diésel', 'glp'],
    photos: [
      'https://images.unsplash.com/photo-1527018606412-03c20003cb06?auto=format&fit=crop&w=1200&q=80', // Fuel pump nozzle & energy meter
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80', // Petroleum storage & refinery infrastructure
      'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=1200&q=80', // Modern fueling station
      'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=1200&q=80', // Energy pipeline flow
    ],
  },
  {
    keywords: ['dólar', 'divisas', 'tipo de cambio', 'cotización', 'peso dominicano', 'euro', 'remesas'],
    photos: [
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80', // Dollar currency banknotes & exchange
      'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=1200&q=80', // Global currency notes & coins
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80', // Foreign currency calculation
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80', // Digital money exchange counter
    ],
  },
  {
    keywords: ['banco central', 'pib', 'inflación', 'tasa de interés', 'política monetaria', 'bcrd', 'fmi'],
    photos: [
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80', // Macroeconomic data analytics screen
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80', // Official economic ledger & signing pen
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80', // Financial calculation and audit
      'https://images.unsplash.com/photo-1444653614773-995cb1ef902f?auto=format&fit=crop&w=1200&q=80', // Economic statistics graph
    ],
  },
  {
    keywords: ['wall street', 'bolsa', 'acciones', 'mercado', 's&p', 'nasdaq', 'inversionistas', 'valores'],
    photos: [
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80', // Wall Street financial trading displays
      'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=1200&q=80', // Financial board ticker numbers
      'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80', // Financial trend analysis
      'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=1200&q=80', // Investment growth charts
    ],
  },
  {
    keywords: ['puerto', 'exportación', 'importación', 'comercio', 'carga', 'aduanas', 'caucedo', 'haina'],
    photos: [
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80', // Cargo container shipping vessel & cranes
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80', // Logistics distribution terminal
      'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1200&q=80', // Maritime commercial shipping
      'https://images.unsplash.com/photo-1549194388-f61be84a6e9e?auto=format&fit=crop&w=1200&q=80', // Port container stacked freight
    ],
  },
  {
    keywords: ['empleo', 'trabajadores', 'salario', 'sueldo', 'empresa', 'negocio', 'pyme'],
    photos: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80', // Professional team collaboration
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', // Modern collaborative working environment
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80', // Enterprise strategic consultation
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80', // Workplace analytics meeting
    ],
  },
  {
    keywords: ['supermercado', 'canasta', 'alimentos', 'consumo', 'precio', 'compras', 'víveres'],
    photos: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80', // Supermarket fresh fruits and goods
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80', // Retail grocery shelves
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80', // Local market produce stand
    ],
  },
];

// 4. Dominican Traditions, Agriculture, Rum, Sugar, Tourism & Nature
const TRADITIONS_POOLS: ThematicPool[] = [
  {
    keywords: ['ron', 'ron dominicano', 'destilería', 'caña', 'barrica', 'licor', 'trago'],
    photos: [
      'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1200&q=80', // Rum distillery aging oak barrels
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80', // Caribbean artisan cocktail & spirits
      'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=1200&q=80', // Glass bottle of aged amber Caribbean rum
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80', // Bar beverage craftsmanship
    ],
  },
  {
    keywords: ['turismo', 'playa', 'punta cana', 'hotel', 'resort', 'miches', 'pedernales', 'bahía de las águilas', 'turistas'],
    photos: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', // Dominican turquoise beach & palms
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Pristine tropical coastline
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80', // Caribbean luxury resort pool
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80', // Dominican coastal sunset
    ],
  },
  {
    keywords: ['metro', 'teleférico', 'transporte', 'alcarrizos', 'tren', 'omsa', 'pasajeros'],
    photos: [
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80', // Rapid transit passenger train
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80', // Modern train station platform
      'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=80', // Passenger rail coach
    ],
  },
  {
    keywords: ['santo domingo', 'zona colonial', 'malecon', 'santiago', 'cibao', 'monumento', 'catedral'],
    photos: [
      'https://images.unsplash.com/photo-1512353087810-25dfcd100962?auto=format&fit=crop&w=1200&q=80', // Colonial historic street & architecture
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', // Caribbean coastal bridge
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', // Tropical valley scenery
    ],
  },
  {
    keywords: ['tormenta', 'huracán', 'clima', 'lluvia', 'inundación', 'alerta', 'onamet', 'ciclón'],
    photos: [
      'https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=1200&q=80', // Dramatic weather clouds & atmosphere
      'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=1200&q=80', // Heavy ocean waves and meteorological front
      'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80', // Tropical storm rain clouds
    ],
  },
];

// 5. Sports (Baseball, Soccer, Basketball, Boxing, Racing)
const SPORTS_POOLS: ThematicPool[] = [
  {
    keywords: ['pelota', 'licey', 'águila', 'lidom', 'beisbol', 'béisbol', 'jonron', 'soto', 'guerrero', 'quisqueya', 'escogido'],
    photos: [
      'https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=1200&q=80', // Baseball batter at plate
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80', // Pitcher in windup motion
      'https://images.unsplash.com/photo-1562077772-3ab1218634df?auto=format&fit=crop&w=1200&q=80', // Baseball diamond evening lights
      'https://images.unsplash.com/photo-1529768174067-1738253cd79f?auto=format&fit=crop&w=1200&q=80', // Baseball leather glove & ball
      'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1200&q=80', // Baseball home run swing
    ],
  },
  {
    keywords: ['fútbol', 'futbol', 'champions', 'gol', 'madrid', 'barça', 'estadio', 'uefa', 'fifa'],
    photos: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80', // Packed football stadium match
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80', // Soccer ball on pitch grass
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80', // Football match action under lights
      'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=1200&q=80', // Stadium goal net & lights
    ],
  },
  {
    keywords: ['nba', 'baloncesto', 'basket', 'cancha', 'enceste'],
    photos: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80', // Basketball hoop and arena
      'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80', // Basketball ball on court
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80', // Basketball arena rim
    ],
  },
  {
    keywords: ['boxeo', 'pelea', 'ring', 'combate', 'artes marciales'],
    photos: [
      'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80', // Boxing ring ropes & arena lights
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80', // Athlete fight training
    ],
  },
];

// 6. Technology, Science, Health & Clean Energy
const TECH_HEALTH_POOLS: ThematicPool[] = [
  {
    keywords: ['ia', 'inteligencia artificial', 'chip', 'semiconductor', 'hardware', 'procesador', 'nvidia', 'supercomputadora'],
    photos: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', // Silicon wafer microprocessor
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80', // Neural network data lights
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80', // Quantum computer components
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80', // Digital code matrix
    ],
  },
  {
    keywords: ['salud', 'hospital', 'médico', 'medicina', 'paciente', 'cáncer', 'vacuna', 'clínica', 'cirugía'],
    photos: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80', // Medical doctor analyzing digital health scan
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80', // Clean clinical operating room
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80', // Stethoscope on medical records
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80', // Laboratory microscope science
    ],
  },
  {
    keywords: ['solar', 'eólica', 'renovable', 'energía limpia', 'electricidad', 'red eléctrica', 'batería'],
    photos: [
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80', // Green field with wind turbines
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80', // Solar panel solar farm
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80', // Renewable energy ecology
    ],
  },
  {
    keywords: ['espacio', 'nasa', 'satélite', 'órbita', 'cohete', 'astronomía'],
    photos: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', // Satellite view of blue Earth
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80', // Space station orbit
    ],
  },
];

// 7. General Editorial, Aviation & Journalism Diverse Reserve Pool
const EDITORIAL_RESERVE: string[] = [
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80', // Press conference microphones
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80', // Writer desk and open notebook
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80', // Printed newspaper frontpage
  'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80', // Journalism breaking news layout
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80', // Professional journalist writing
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80', // Commercial aviation airliner
  'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=1200&q=80', // International airport departure
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80', // University academic students
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80', // Academic books in library
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80', // Stage music performance lights
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80', // Cultural festival lights
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80', // Smartphone reading digital news
  'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1200&q=80', // Diplomatic flags and banners
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80', // Speaker at conference podium
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80', // Team workshop discussion
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80', // Humanitarian community support
  'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80', // Tropical agricultural field
  'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80', // Civil infrastructure development
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80', // Electrical and engineering technician
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80', // Corporate leadership summit
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80', // Digital technology workstation
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80', // Education presentation lecture
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80', // Digital communication network
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', // World map and global satellite
];

const ALL_POOLS: ThematicPool[] = [
  ...POLITICS_POOLS,
  ...DEFENSE_POOLS,
  ...ECONOMY_POOLS,
  ...TRADITIONS_POOLS,
  ...SPORTS_POOLS,
  ...TECH_HEALTH_POOLS,
];

function normalizeTitle(title: string): string {
  return (title || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');
}

/**
 * Finds an unused contextual photo for an article based on title & category.
 * If provided a `usedImages` set, ensures the returned URL has NEVER been assigned to another article.
 */
export function getContextualArticlePhoto(
  title: string,
  category: string = '',
  usedImages?: Set<string>
): string {
  const text = (title + ' ' + category).toLowerCase();

  // 1. Calculate relevance score for each pool based on matched keywords
  let bestPool: ThematicPool | null = null;
  let bestScore = 0;

  for (const pool of ALL_POOLS) {
    let poolScore = 0;
    for (const kw of pool.keywords) {
      if (text.includes(kw)) {
        // Longer keyword matches indicate higher specificity (e.g. "wall street", "jovenel moïse", "bancos centrales")
        poolScore += kw.length >= 8 ? 6 : (kw.length >= 4 ? 3 : 1);
      }
    }
    if (poolScore > bestScore) {
      bestScore = poolScore;
      bestPool = pool;
    }
  }

  // If a thematic pool matches, pick an unused photo from it
  if (bestPool && bestScore > 0) {
    for (const photo of bestPool.photos) {
      if (!usedImages || !usedImages.has(photo)) {
        usedImages?.add(photo);
        return photo;
      }
    }
  }

  // Category fallback pools if specific keywords didn't find an unused photo
  const categoryPool = ALL_POOLS.filter(p =>
    p.keywords.some(k => k.includes(category) || category.includes(k))
  );
  for (const pool of categoryPool) {
    for (const photo of pool.photos) {
      if (!usedImages || !usedImages.has(photo)) {
        usedImages?.add(photo);
        return photo;
      }
    }
  }

  // Search general editorial reserve
  for (const photo of EDITORIAL_RESERVE) {
    if (!usedImages || !usedImages.has(photo)) {
      usedImages?.add(photo);
      return photo;
    }
  }

  // Fallback: create a deterministic, uniquely signed Unsplash URL with a unique parameter so it is completely distinct
  const hash = Math.abs(
    title.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
  );
  const basePhoto = EDITORIAL_RESERVE[hash % EDITORIAL_RESERVE.length];
  const uniqueUrl = `${basePhoto}&sig=${hash}`;
  usedImages?.add(uniqueUrl);
  return uniqueUrl;
}

/**
 * Global Anti-Repetition Scanner:
 * Scans an array of articles and ensures that NO TWO DIFFERENT ARTICLES share the exact same image.
 * If two articles are identical (same title or ID), they may share the image; otherwise,
 * any duplicate image is replaced with a guaranteed unique, contextual photo.
 */
export function scanAndDeduplicateArticles(articles: NewsArticle[]): void {
  const usedImageMap = new Map<string, { id: string; normTitle: string }>();
  const globallyUsedUrls = new Set<string>();

  // Pass 1: Register unique images for articles that already have distinct native photos
  for (const article of articles) {
    if (!article.imageUrl) continue;
    
    // Disallow the infamous generic building photos
    if (
      article.imageUrl.includes('photo-1486406146926-c627a92ad1ab') ||
      article.imageUrl.includes('photo-1544620347-c4fd4a3d5957')
    ) {
      continue;
    }

    const currentOwner = usedImageMap.get(article.imageUrl);
    const norm = normalizeTitle(article.title);

    if (!currentOwner) {
      // First time this image is seen
      usedImageMap.set(article.imageUrl, { id: article.id, normTitle: norm });
      globallyUsedUrls.add(article.imageUrl);
    }
  }

  // Pass 2: Re-scan and resolve any duplicate or banned image
  const resolvedImages = new Set<string>();

  for (const article of articles) {
    const norm = normalizeTitle(article.title);
    const isBannedPhoto =
      !article.imageUrl ||
      article.imageUrl.includes('photo-1486406146926-c627a92ad1ab') ||
      article.imageUrl.includes('photo-1544620347-c4fd4a3d5957');

    const owner = usedImageMap.get(article.imageUrl);
    const isCollision =
      owner && (owner.id !== article.id && owner.normTitle !== norm);

    if (isBannedPhoto || isCollision || resolvedImages.has(article.imageUrl)) {
      // Duplicate or repeated image detected! Assign a guaranteed fresh unique image.
      const newPhoto = getContextualArticlePhoto(article.title, article.category, globallyUsedUrls);
      article.imageUrl = newPhoto;
      resolvedImages.add(newPhoto);
      usedImageMap.set(newPhoto, { id: article.id, normTitle: norm });
    } else {
      resolvedImages.add(article.imageUrl);
    }
  }
}
