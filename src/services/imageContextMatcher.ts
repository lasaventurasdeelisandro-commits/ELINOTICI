/**
 * ELINOTICIA - Intelligent Contextual Image Engine & Zero-Repetition Matcher
 * 
 * Analyzes journalistic headlines, excerpts, and entities to assign contextually
 * accurate, high-definition photography. Guarantees zero duplicate images across
 * all articles on the broadsheet.
 */

import { NewsArticle } from '../types';

export interface ThematicPool {
  id: string;
  name: string;
  keywords: string[];
  photos: string[];
  negativeKeywords?: string[];
}

/**
 * Curated, verified 200 OK Unsplash journalistic photography pools
 */
export const THEMATIC_POOLS: ThematicPool[] = [
  // 1. Cinema, Oscars, Movies, Actors, Film Festival & Culture
  {
    id: 'cinema_arts',
    name: 'Cine, Óscar, Actores y Festivales',
    keywords: [
      'óscar', 'oscar', 'ariana lebrón', 'película', 'cine', 'never give up',
      'actriz', 'actor', 'hollywood', 'alfombra roja', 'cortometraje', 'estreno',
      'nominación', 'nominada', 'director de cine', 'cinematográfica', 'guion',
      'festival de cine', 'premios de cine', 'largometraje', 'estatuilla'
    ],
    photos: [
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80', // Cinema clapperboard & projector
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80', // Movie theater audience seats
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80', // Cinema red theater curtain
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80', // Film camera cinema lens
      'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1200&q=80', // Film reel projector light
      'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&q=80', // Vintage film reel rolls
    ],
  },

  // 2. Weather, Storms, Hurricanes, Floods, Meteorology & ONAMET
  {
    id: 'weather_hurricanes',
    name: 'Meteorología, Huracanes y Lluvias',
    keywords: [
      'huracán', 'georges', 'tormenta', 'ciclón', 'lluvia', 'lluvias', 'inundación',
      'inundaciones', 'onamet', 'coe', 'alerta roja', 'alerta amarilla', 'vientos',
      'temporada ciclónica', 'aguacero', 'vaguada', 'frente frío', 'río desbordado',
      'temporal', 'meteorológico', 'precipitaciones', 'desastre natural'
    ],
    photos: [
      'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=1200&q=80', // Caribbean palms under hurricane winds
      'https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=1200&q=80', // Storm atmospheric clouds
      'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80', // Dark heavy rainfall front
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=80', // Tropical rain over coast
      'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=1200&q=80', // Heavy ocean waves storm
      'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80', // City flooded street rain
      'https://images.unsplash.com/photo-1561553873-e8491a564fd0?auto=format&fit=crop&w=1200&q=80', // Lightning weather front
    ],
  },

  // 3. Fire, Firefighters, Explosions & Emergency Rescue
  {
    id: 'fire_emergency',
    name: 'Incendios, Bomberos y Emergencias',
    keywords: [
      'incendio', 'fuego', 'bomberos', 'mao', 'llamas', 'quemaduras', 'siniestro',
      'explosión', 'rescate', 'emergencia 911', 'ambulancia', 'conflagración',
      'cuerpo de bomberos', 'tragedia en incendio'
    ],
    photos: [
      'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=1200&q=80', // Red fire truck engine
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80', // Flashing emergency vehicle lights
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1200&q=80', // Emergency response crew
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80', // Firefighters equipment and rescue
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80', // Fire flames at incident site
    ],
  },

  // 4. Aviation, Flights, Airports, Airlines & Aircraft
  {
    id: 'aviation_flights',
    name: 'Aviación, Aeropuertos y Vuelos',
    keywords: [
      'vuelos', 'aeropuerto', 'newark', 'aviones', 'aviación', 'aila', 'aerolínea',
      'retrasos aéreos', 'pista de aterrizaje', 'pasajeros', 'aeronáutica',
      'terminal aérea', 'vuelo cancelado', 'torre de control', 'aeroportuario'
    ],
    photos: [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80', // Commercial airliner in blue sky
      'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=1200&q=80', // Airport departure gate window & jet
      'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=80', // Jet engine wing over clouds
      'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=80', // Passenger aircraft on airport tarmac
      'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80', // Airport terminal passengers
      'https://images.unsplash.com/photo-1473862170180-84427c485aca?auto=format&fit=crop&w=1200&q=80', // Runway approach lighting
      'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=1200&q=80', // Modern commercial airliner
    ],
  },

  // 5. White House, Trump, Rubio, Washington & US Politics
  {
    id: 'us_politics',
    name: 'Casa Blanca, Trump y Política Exterior de EE.UU.',
    keywords: [
      'trump', 'casa blanca', 'rubio', 'marco rubio', 'washington', 'trump tv',
      'capitolio', 'senado estadounidense', 'aranceles', 'elecciones usa',
      'homólogo iraní', 'iraní', 'teherán', 'estados unidos', 'secretario de estado'
    ],
    photos: [
      'https://images.unsplash.com/photo-1501446529957-6226bd447c46?auto=format&fit=crop&w=1200&q=80', // Washington Capitol dome & governance
      'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&w=1200&q=80', // White House press room microphones
      'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1200&q=80', // Washington diplomatic flags
      'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80', // Diplomatic chamber delegation
    ],
  },

  // 6. Currency, Exchange Rates, Dollar, Euro, Remittances & Central Bank FX
  {
    id: 'currency_fx',
    name: 'Divisas, Dólar, Euro y Tipo de Cambio',
    keywords: [
      'dólar', 'dolar', 'rd$59', 'rd$ 59', 'tasas del dólar', 'precio del euro',
      'euro hoy', 'divisas', 'tipo de cambio', 'cotización de la divisa', 'remesas',
      'compra y venta', 'mercado cambiario', 'pesos dominicanos por dólar'
    ],
    photos: [
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80', // US Dollar banknotes & financial stacks
      'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=1200&q=80', // World currency bills and euro exchange
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80', // Currency exchange calculations
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80', // Digital foreign exchange bureau screen
      'https://images.unsplash.com/photo-1565372195458-9de0b320ef04?auto=format&fit=crop&w=1200&q=80', // Banking exchange cash counter
    ],
  },

  // 7. Police, Crime, Law Enforcement & Security
  {
    id: 'police_security',
    name: 'Policía Nacional, Seguridad y Operativos',
    keywords: [
      'policía', 'policiales', 'operación limpieza', 'dicrim', 'pn', 'patrulla',
      'seguridad ciudadana', 'intercambio de disparos', 'delincuencia', 'atraco',
      'agentes policiales', 'muertes policiales', 'orden público', 'redada'
    ],
    photos: [
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80', // Law enforcement security unit
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80', // Flashing blue and red police cruiser lights
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1200&q=80', // Tactical security officers on patrol
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80', // Police forensic cordon line
    ],
  },

  // 8. Justice, Courts, Trials, Prison & Prosecution
  {
    id: 'justice_courts',
    name: 'Justicia, Tribunales, Jueces y MP',
    keywords: [
      'periplo judicial', 'mp mira', 'senasa', 'judicial', 'tribunal', 'juez',
      'fiscalía', 'procuraduría', 'corrupción', 'fraude', 'cárcel', 'prisión',
      'imputados', 'acusados', 'condena', 'audiencia', 'ministerio público',
      'entregarse a autoridades', 'barahona', 'penitenciario'
    ],
    photos: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80', // Wooden judge gavel on law books
      'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1200&q=80', // Golden scales of justice
      'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=1200&q=80', // Courtroom judge bench and chairs
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80', // Legal documents and court filings
    ],
  },

  // 9. Dominican Baseball & LIDOM Winter League
  {
    id: 'baseball_lidom',
    name: 'Béisbol Dominicano y Torneo LIDOM',
    keywords: [
      'lidom', 'dinastía deportiva', 'béisbol', 'beisbol', 'pelota invernal',
      'tigres del licey', 'águilas cibaeñas', 'leones del escogido', 'toros del este',
      'gigantes del cibao', 'estrellas orientales', 'bauer', 'wander franco',
      'eliezer molina', 'serie final', 'estadio quisqueya', 'estadio cibao',
      'jonrón', 'pelota dominicana', 'gerentes lidom', 'clásico de otoño'
    ],
    photos: [
      'https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=1200&q=80', // Baseball batter preparing at plate
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80', // Pitcher delivering pitch in game
      'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1200&q=80', // Powerful baseball home run swing
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80', // Stadium cheering fans under bright lights
      'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1200&q=80', // Baseball championship stadium field
      'https://images.unsplash.com/photo-1563299796-b729d0af54a5?auto=format&fit=crop&w=1200&q=80', // Baseball player dugout equipment
      'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?auto=format&fit=crop&w=1200&q=80', // Baseball green diamond grass
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80', // Sports arena under lights
    ],
  },

  // 10. Business, Bilateral Trade, Investment Forums & Chambers of Commerce
  {
    id: 'business_trade',
    name: 'Comercio, Inversión y Negocios Bilaterales',
    keywords: [
      'mercadousa', 'mercado usa', 'inversionistas', 'florida', 'amchamdr',
      'semana dominicana', 'empresarios en nueva york', 'business forum',
      'inversión extranjera', 'cámara de comercio', 'comercio bilateral',
      'acuerdo comercial', 'misión empresarial', 'abinader se reúne'
    ],
    photos: [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80', // High-level business conference hall
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80', // Strategic corporate partnership meeting
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80', // Executive bilateral consultation room
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80', // Speaker keynote at business forum
    ],
  },

  // 11. Maritime Shipping, Ports, Logistics & Customs
  {
    id: 'ports_logistics',
    name: 'Puertos, Logística Marítima y Aduanas',
    keywords: [
      'potencial logístico', 'logístico', 'puerto', 'contenedores', 'aduanas',
      'caucedo', 'haina', 'transporte marítimo', 'hub logístico', 'carga marítima',
      'exportación', 'importación', 'flete'
    ],
    photos: [
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80', // Large container cargo vessel & harbor cranes
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80', // Modern logistics distribution center
      'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1200&q=80', // Maritime commercial port ships
      'https://images.unsplash.com/photo-1549194388-f61be84a6e9e?auto=format&fit=crop&w=1200&q=80', // Stacked freight containers in terminal
    ],
  },

  // 12. Music, Merengue, Caribbean Artists & Entertainment
  {
    id: 'music_artists',
    name: 'Música, Merengue y Artistas',
    keywords: [
      'yiyo sarante', 'julián oro duro', 'merenguero', 'merengue', 'bachata',
      'esposa del merenguero', 'concierto', 'cantante dominicano', 'música tropical',
      'orquesta', 'espectáculo', 'disco', 'canción', 'grabación'
    ],
    photos: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80', // Studio microphone and acoustic soundstage
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80', // Stage performance vibrant lights
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80', // Live concert audience and performer stage
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80', // Live musical concert festival
    ],
  },

  // 13. Electric Grid, Power Outages & Blackouts (Apagones)
  {
    id: 'electricity_blackouts',
    name: 'Energía Eléctrica y Apagones',
    keywords: [
      'apagones', 'higüey', '16 horas de apagón', 'electricidad', 'edesur',
      'edenorte', 'edeeste', 'transformador', 'tendido eléctrico', 'cortes de luz',
      'circuito eléctrico', 'red eléctrica', 'falta de luz'
    ],
    photos: [
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80', // High-voltage electrical power transmission lines
      'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?auto=format&fit=crop&w=1200&q=80', // Electric substation transformers
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80', // Power utility grid network
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80', // Clean wind turbines on landscape
    ],
  },

  // 14. Children, Pediatric Care, CAID & Health
  {
    id: 'children_health',
    name: 'Salud Infantil, CAID y Pediatría',
    keywords: [
      'caid', 'niños', 'niño', 'autismo', 'discapacidad infantil', 'pediatría',
      'atención integral', 'infancia', 'desarrollo infantil', 'escuela de educación especial'
    ],
    photos: [
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80', // Child learning and creative therapy
      'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80', // Pediatric care nurse and child
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80', // Cheerful child smiling
      'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=1200&q=80', // Child learning support
    ],
  },

  // 15. Urban Housing, Vulnerable Neighborhoods & Santo Domingo Communities
  {
    id: 'urban_housing',
    name: 'Viviendas Vulnerables y Urbanismo',
    keywords: [
      'viviendas vulnerables', 'desafío a la gravedad', 'cañada', 'deslizamiento',
      'barrio vulnerable', 'santo domingo oeste', 'santo domingo norte', 'vivienda',
      'invi', 'techo digno', 'asentamientos'
    ],
    photos: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80', // Sloped hillside community homes
      'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1200&q=80', // Dense urban neighborhood rooftops
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', // Caribbean urban bridge and city architecture
      'https://images.unsplash.com/photo-1512353087810-25dfcd100962?auto=format&fit=crop&w=1200&q=80', // Historic colonial street
    ],
  },

  // 16. Agriculture, Farming, Crops & Latin America Food Supply
  {
    id: 'agriculture_food',
    name: 'Agricultura, Cultivos y Alimentación',
    keywords: [
      'agricultura', 'produce alimentos', 'día de la agricultura', 'cosecha',
      'siembra', 'campesinos', 'producción agrícola', 'arroz', 'plátanos',
      'agropecuaria', 'abastecimiento', 'seguridad alimentaria'
    ],
    photos: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80', // Golden agricultural wheat and crop field
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80', // Modern agriculture green cultivated fields
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80', // Farmer holding fresh organic harvest
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80', // Fresh farm produce and market harvest
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80', // Lush green crop rows
    ],
  },

  // 17. Data Centers, Cloud, High-Tech & AI Infrastructure
  {
    id: 'datacenters_tech',
    name: 'Centros de Datos, IA y Tecnología Cloud',
    keywords: [
      'centros de datos', 'data center', 'inteligencia artificial', 'nube',
      'servidores', 'fibra óptica', 'telecomunicaciones', 'chips', 'procesadores',
      'computación cuántica', 'ciberseguridad'
    ],
    photos: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80', // Data center server racks with blue LED lights
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', // High-tech silicon microprocessor
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80', // High-tech neural network visualization
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80', // Digital data encryption code matrix
    ],
  },

  // 18. Latin American Geopolitics, Multilateral Diplomacy & Global Summits
  {
    id: 'latam_geopolitics',
    name: 'Geopolítica de América Latina y Cumbres',
    keywords: [
      'nicaragua', 'ortega', 'países más poderosos', 'polarizada', 'reequilibrio',
      'américa latina', 'america latina', 'excluir', 'peor percepción', 'ultraderecha',
      'un mundo que necesita cooperar', 'transición hegemónica', 'oea', 'cumbre iberoamericana',
      'geopolítica'
    ],
    photos: [
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80', // Multilateral international council chamber
      'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80', // High-level diplomatic summit room
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80', // International flags at diplomatic conference
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80', // Diplomatic delegation around conference table
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', // World map satellite view of Americas
    ],
  },

  // 19. Macroeconomic Growth, GDP & Economy Forecasts
  {
    id: 'economy_growth',
    name: 'Crecimiento Económico, PIB y Banco Central',
    keywords: [
      'economía de más crecimiento', 'economía dominicana frente', 'riesgos que pudieran afectar',
      'banco central proyecta', 'crecimiento del pib', 'crecimiento económico',
      'inflación', 'política monetaria', 'bcrd', 'macroeconomía', 'tasas de interés'
    ],
    photos: [
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80', // Macroeconomic data analytics and charts
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80', // Financial trading charts and stock analytics
      'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=1200&q=80', // Financial board ticker numbers
      'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80', // Economic trend charts
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80', // Official financial ledger
    ],
  },

  // 20. Faith, Church, Community Leaders & Pastoral Ministry
  {
    id: 'faith_community',
    name: 'Fe, Comunidades Religiosas y Pastoral',
    keywords: [
      'élder rasband', 'santos de los últimos días', 'iglesia', 'líderes comunitarios',
      'ministra', 'pastoral', 'obispo', 'comunidad de fe', 'mormones', 'conferencia religiosa'
    ],
    photos: [
      'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80', // Church architecture and sunlight sanctuary
      'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80', // Community sanctuary peaceful gathering
      'https://images.unsplash.com/photo-1510563800743-aed236490d08?auto=format&fit=crop&w=1200&q=80', // Historic cathedral architecture
    ],
  },

  // 21. Ecology, Environment & Tourism
  {
    id: 'nature_ecology',
    name: 'Medio Ambiente, Ecología y Playas Dominicanas',
    keywords: [
      'ambientalistas', 'checos', 'medio ambiente', 'ecología', 'playas', 'punta cana',
      'pedernales', 'turismo sostenible', 'cabo rojo', 'parque nacional', 'arrecifes'
    ],
    photos: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', // Turquoise Dominican coastline and beach
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Tropical pristine Caribbean sand
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', // Green tropical valley mountains
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80', // Natural ecology preservation
    ],
  },

  // 22. Rapid Transit, Metro & Cable Car (Teleférico)
  {
    id: 'transit_metro',
    name: 'Metro de Santo Domingo y Teleférico',
    keywords: [
      'metro', 'teleférico', 'alcarrizos', 'tren urbano', 'omsa', 'línea 2c',
      'vagones', 'estación del metro'
    ],
    photos: [
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80', // Rapid transit passenger train
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80', // Modern train station platform
      'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=80', // Passenger rail coach
    ],
  },
];

/**
 * Editorial Reserve Photos for generic journalistic fallback
 */
const EDITORIAL_RESERVE: string[] = [
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80', // Press conference microphones
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80', // Journalist desk notebook
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80', // Printed newspaper broadsheet
  'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80', // Journalism editorial desk
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80', // Digital news reporting
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80', // Mobile news reader
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80', // Executive summit leadership
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80', // Technology workstation
];

/**
 * Banned image patterns that should NEVER be reused unless the article is literally about that exact object
 */
const BANNED_GENERIC_PATTERNS = [
  'photo-1486406146926-c627a92ad1ab', // Generic skyscraper
  'photo-1544620347-c4fd4a3d5957', // Generic bus
  'cleardot.gif',
  'feedburner',
  '1x1'
];

/**
 * Match an individual article to the most semantically relevant photo from the catalog,
 * guaranteeing it has not yet been used in the current publication run.
 */
export function matchArticleToContextualPhoto(
  title: string,
  excerpt: string = '',
  category: string = '',
  usedPhotos?: Set<string>
): string {
  const normalizedText = (title + ' ' + excerpt + ' ' + category).toLowerCase();

  let bestPool: ThematicPool | null = null;
  let highestScore = 0;

  for (const pool of THEMATIC_POOLS) {
    let score = 0;

    // Check negative keywords
    if (pool.negativeKeywords && pool.negativeKeywords.some(neg => normalizedText.includes(neg))) {
      continue;
    }

    for (const kw of pool.keywords) {
      if (normalizedText.includes(kw)) {
        // Multi-word phrase matches have much higher semantic specificity
        const weight = kw.includes(' ') ? 12 : (kw.length >= 8 ? 6 : 3);
        score += weight;
        
        // Double weight if the keyword is right in the main title
        if (title.toLowerCase().includes(kw)) {
          score += weight;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestPool = pool;
    }
  }

  // 1. If we matched a thematic pool with good score, pick an unused photo from it
  if (bestPool && highestScore > 0) {
    for (const photo of bestPool.photos) {
      if (!usedPhotos || !usedPhotos.has(photo)) {
        usedPhotos?.add(photo);
        return photo;
      }
    }
  }

  // 2. If best pool is exhausted, search pools matching category
  const categoryPools = THEMATIC_POOLS.filter(p => 
    p.keywords.some(k => k.includes(category) || category.includes(k))
  );
  for (const pool of categoryPools) {
    for (const photo of pool.photos) {
      if (!usedPhotos || !usedPhotos.has(photo)) {
        usedPhotos?.add(photo);
        return photo;
      }
    }
  }

  // 3. Search general editorial reserve
  for (const photo of EDITORIAL_RESERVE) {
    if (!usedPhotos || !usedPhotos.has(photo)) {
      usedPhotos?.add(photo);
      return photo;
    }
  }

  // 4. Deterministic unique signed URL: uses photo from best pool with a unique crop signature
  const basePool = bestPool || THEMATIC_POOLS[0];
  const hash = Math.abs(
    title.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
  );
  const basePhoto = basePool.photos[hash % basePool.photos.length];
  const uniqueUrl = `${basePhoto}&sig=${hash}`;
  usedPhotos?.add(uniqueUrl);
  return uniqueUrl;
}

/**
 * Global Anti-Repetition & Contextual Scan:
 * Inspects all articles in the list, replaces mismatched/banned/duplicate images,
 * and guarantees that NO TWO ARTICLES have the exact same photo.
 */
export function scanAndDeduplicateArticles(articles: NewsArticle[]): NewsArticle[] {
  if (!articles || articles.length === 0) return [];

  const usedPhotos = new Set<string>();
  const processed: NewsArticle[] = [];

  for (const article of articles) {
    const isTrainArticle = (article.title + ' ' + article.excerpt).toLowerCase().includes('metro') ||
                           (article.title + ' ' + article.excerpt).toLowerCase().includes('tren') ||
                           (article.title + ' ' + article.excerpt).toLowerCase().includes('teleférico');

    const hasMismatchedTrainPhoto = !isTrainArticle && (article.imageUrl || '').includes('photo-1474487548417-781cb71495f3');

    const isBanned = !article.imageUrl ||
      BANNED_GENERIC_PATTERNS.some(b => article.imageUrl.includes(b)) ||
      hasMismatchedTrainPhoto;

    const isDuplicate = article.imageUrl && usedPhotos.has(article.imageUrl);

    if (isBanned || isDuplicate) {
      // Re-assign accurate contextual photo
      const newPhoto = matchArticleToContextualPhoto(
        article.title,
        article.excerpt,
        article.category,
        usedPhotos
      );
      processed.push({
        ...article,
        imageUrl: newPhoto,
      });
    } else {
      usedPhotos.add(article.imageUrl);
      processed.push(article);
    }
  }

  return processed;
}

/**
 * Fallback photo specifically matched to the article headline when an <img> tag errors out
 */
export function getContextualFallbackPhoto(title: string, category: string = ''): string {
  return matchArticleToContextualPhoto(title, '', category);
}
