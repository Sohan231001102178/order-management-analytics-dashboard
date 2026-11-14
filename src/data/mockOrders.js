// Mock Orders dataset: 50 normalized order records spanning the last 90 days
// Categories: Electronics, Apparel, Home, Software
// Statuses: Completed, Processing, Pending, Cancelled

// Base timestamp generator relative to reference date (2026-11-14 or current date)
const referenceDate = new Date();

const createDateDaysAgo = (daysAgo, hours = 10, minutes = 30) => {
  const d = new Date(referenceDate);
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
};

export const rawOrdersData = [
  // Last 7 days (Days 0 to 6)
  {
    id: 'ORD-9801',
    customerId: 'CUST-101',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.r@fintech.io',
    category: 'Electronics',
    amount: 1249.50,
    quantity: 2,
    status: 'Completed',
    date: createDateDaysAgo(0, 14, 22),
    items: ['Pro Ultra 4K Monitor', 'USB-C Docking Hub']
  },
  {
    id: 'ORD-9802',
    customerId: 'CUST-102',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@cloudscale.net',
    category: 'Software',
    amount: 899.00,
    quantity: 1,
    status: 'Completed',
    date: createDateDaysAgo(1, 9, 15),
    items: ['DevSecOps Enterprise Seat']
  },
  {
    id: 'ORD-9803',
    customerId: 'CUST-103',
    customerName: 'Sophia Lin',
    customerEmail: 'sophia.l@designworks.co',
    category: 'Apparel',
    amount: 320.00,
    quantity: 4,
    status: 'Processing',
    date: createDateDaysAgo(1, 16, 40),
    items: ['Merino Wool Overcoats', 'Cashmere Knit Beanie']
  },
  {
    id: 'ORD-9804',
    customerId: 'CUST-104',
    customerName: 'David Kim',
    customerEmail: 'dkim@apexlogistics.com',
    category: 'Home',
    amount: 450.75,
    quantity: 3,
    status: 'Pending',
    date: createDateDaysAgo(2, 11, 5),
    items: ['Ergonomic Mesh Chair', 'Lumbar Support Cushion']
  },
  {
    id: 'ORD-9805',
    customerId: 'CUST-105',
    customerName: 'Amara Okafor',
    customerEmail: 'a.okafor@biolabs.org',
    category: 'Electronics',
    amount: 680.00,
    quantity: 1,
    status: 'Completed',
    date: createDateDaysAgo(2, 18, 12),
    items: ['Noise-Cancelling Studio Headphones']
  },
  {
    id: 'ORD-9806',
    customerId: 'CUST-106',
    customerName: 'Julian Hayes',
    customerEmail: 'julian@strata-ai.com',
    category: 'Software',
    amount: 1450.00,
    quantity: 2,
    status: 'Cancelled',
    date: createDateDaysAgo(3, 10, 45),
    items: ['Enterprise Analytics Core 1Y License']
  },
  {
    id: 'ORD-9807',
    customerId: 'CUST-107',
    customerName: 'Chloe Bennett',
    customerEmail: 'c.bennett@retailflow.com',
    category: 'Apparel',
    amount: 185.50,
    quantity: 2,
    status: 'Completed',
    date: createDateDaysAgo(3, 13, 30),
    items: ['Water-Resistant Commuter Jacket']
  },
  {
    id: 'ORD-9808',
    customerId: 'CUST-108',
    customerName: 'Liam O\'Connor',
    customerEmail: 'liam.oc@celtictech.ie',
    category: 'Home',
    amount: 890.00,
    quantity: 1,
    status: 'Processing',
    date: createDateDaysAgo(4, 15, 50),
    items: ['Motorized Standing Desk Bamboo 60x30']
  },
  {
    id: 'ORD-9809',
    customerId: 'CUST-109',
    customerName: 'Zoe Kravitz',
    customerEmail: 'zkravitz@voguepress.com',
    category: 'Electronics',
    amount: 2199.99,
    quantity: 1,
    status: 'Completed',
    date: createDateDaysAgo(4, 17, 10),
    items: ['MacBook Pro M3 Max 36GB']
  },
  {
    id: 'ORD-9810',
    customerId: 'CUST-110',
    customerName: 'Tariq Al-Mansoor',
    customerEmail: 'tariq.m@gulfenergy.ae',
    category: 'Software',
    amount: 540.00,
    quantity: 3,
    status: 'Pending',
    date: createDateDaysAgo(5, 8, 20),
    items: ['Cloud Database Monitoring Agents']
  },
  {
    id: 'ORD-9811',
    customerId: 'CUST-111',
    customerName: 'Hannah Abbott',
    customerEmail: 'h.abbott@greenleaf.org',
    category: 'Apparel',
    amount: 245.00,
    quantity: 2,
    status: 'Processing',
    date: createDateDaysAgo(5, 14, 55),
    items: ['Organic Cotton Trenchcoat']
  },
  {
    id: 'ORD-9812',
    customerId: 'CUST-112',
    customerName: 'Vikram Patel',
    customerEmail: 'vpatel@solardrive.in',
    category: 'Home',
    amount: 320.00,
    quantity: 2,
    status: 'Completed',
    date: createDateDaysAgo(6, 12, 10),
    items: ['Smart Air Purifier HEPA 13']
  },

  // Days 7 to 30 (Last Month)
  {
    id: 'ORD-9813',
    customerId: 'CUST-113',
    customerName: 'Clara Oswald',
    customerEmail: 'clara@tardis-consulting.uk',
    category: 'Electronics',
    amount: 410.00,
    quantity: 2,
    status: 'Completed',
    date: createDateDaysAgo(7, 10, 0),
    items: ['Mechanical Gaming Keyboard RGB']
  },
  {
    id: 'ORD-9814',
    customerId: 'CUST-114',
    customerName: 'Nathaniel Drake',
    customerEmail: 'n.drake@archaeo.org',
    category: 'Apparel',
    amount: 590.00,
    quantity: 3,
    status: 'Completed',
    date: createDateDaysAgo(8, 11, 20),
    items: ['Expedition Waterproof Boots', 'Ripstop Cargo Pants']
  },
  {
    id: 'ORD-9815',
    customerId: 'CUST-115',
    customerName: 'Samantha Ray',
    customerEmail: 'sam.ray@cyberedge.com',
    category: 'Software',
    amount: 2400.00,
    quantity: 4,
    status: 'Completed',
    date: createDateDaysAgo(9, 16, 45),
    items: ['SOC2 Compliance Automation Suite']
  },
  {
    id: 'ORD-9816',
    customerId: 'CUST-116',
    customerName: 'Benjamin Torres',
    customerEmail: 'btorres@metroware.com',
    category: 'Home',
    amount: 720.00,
    quantity: 2,
    status: 'Cancelled',
    date: createDateDaysAgo(10, 13, 15),
    items: ['Smart Induction Cooking Station']
  },
  {
    id: 'ORD-9817',
    customerId: 'CUST-117',
    customerName: 'Fiona Gallagher',
    customerEmail: 'fiona.g@southside.co',
    category: 'Electronics',
    amount: 850.00,
    quantity: 1,
    status: 'Processing',
    date: createDateDaysAgo(11, 15, 30),
    items: ['Tablet Pro 11-inch OLED']
  },
  {
    id: 'ORD-9818',
    customerId: 'CUST-118',
    customerName: 'Oliver Queen',
    customerEmail: 'oliver@starlingindustries.com',
    category: 'Apparel',
    amount: 1100.00,
    quantity: 5,
    status: 'Completed',
    date: createDateDaysAgo(12, 17, 0),
    items: ['Tactical Archery Fleece', 'Thermal Baseline Gear']
  },
  {
    id: 'ORD-9819',
    customerId: 'CUST-119',
    customerName: 'Grace Hopper',
    customerEmail: 'grace@compilersys.edu',
    category: 'Software',
    amount: 3200.00,
    quantity: 5,
    status: 'Completed',
    date: createDateDaysAgo(13, 9, 30),
    items: ['Parallel Computing Compiler Suite']
  },
  {
    id: 'ORD-9820',
    customerId: 'CUST-120',
    customerName: 'Lucas Moura',
    customerEmail: 'lmoura@tottenham-fans.br',
    category: 'Home',
    amount: 280.00,
    quantity: 1,
    status: 'Pending',
    date: createDateDaysAgo(14, 14, 40),
    items: ['Aroma Diffuser Ultrasonic Pro']
  },
  {
    id: 'ORD-9821',
    customerId: 'CUST-101',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.r@fintech.io',
    category: 'Software',
    amount: 650.00,
    quantity: 1,
    status: 'Completed',
    date: createDateDaysAgo(16, 11, 20),
    items: ['Realtime WebSocket Gateway Addon']
  },
  {
    id: 'ORD-9822',
    customerId: 'CUST-121',
    customerName: 'Aiden Pearce',
    customerEmail: 'aiden@ctos-watch.ch',
    category: 'Electronics',
    amount: 1540.00,
    quantity: 3,
    status: 'Processing',
    date: createDateDaysAgo(18, 16, 10),
    items: ['Portable SDR Transceiver', 'Encrypted SSD Drive 4TB']
  },
  {
    id: 'ORD-9823',
    customerId: 'CUST-122',
    customerName: 'Maya Angelis',
    customerEmail: 'maya@hellenicdesign.gr',
    category: 'Apparel',
    amount: 430.00,
    quantity: 3,
    status: 'Completed',
    date: createDateDaysAgo(20, 10, 15),
    items: ['Linen Summer Blazer', 'Silk Neck Scarf']
  },
  {
    id: 'ORD-9824',
    customerId: 'CUST-123',
    customerName: 'Klaus Mikaelson',
    customerEmail: 'klaus@frenchquarter.org',
    category: 'Home',
    amount: 1850.00,
    quantity: 2,
    status: 'Completed',
    date: createDateDaysAgo(22, 13, 45),
    items: ['Artisan Hand-Carved Oak Bookcase']
  },
  {
    id: 'ORD-9825',
    customerId: 'CUST-124',
    customerName: 'Diana Prince',
    customerEmail: 'diana@themiscira-museum.org',
    category: 'Software',
    amount: 1200.00,
    quantity: 2,
    status: 'Pending',
    date: createDateDaysAgo(25, 12, 0),
    items: ['Virtual Artifact 3D Reconstruction Engine']
  },
  {
    id: 'ORD-9826',
    customerId: 'CUST-125',
    customerName: 'Peter Parker',
    customerEmail: 'peter.p@dailybugle.nyc',
    category: 'Electronics',
    amount: 950.00,
    quantity: 1,
    status: 'Completed',
    date: createDateDaysAgo(27, 18, 30),
    items: ['Mirrorless Action Camera 4K 120fps']
  },
  {
    id: 'ORD-9827',
    customerId: 'CUST-126',
    customerName: 'Gemma Chan',
    customerEmail: 'gemma@cinemagroup.co.uk',
    category: 'Apparel',
    amount: 670.00,
    quantity: 4,
    status: 'Cancelled',
    date: createDateDaysAgo(29, 14, 25),
    items: ['Designer Evening Gown', 'Satin Wrap']
  },

  // Days 31 to 60 (2 Months Ago)
  {
    id: 'ORD-9828',
    customerId: 'CUST-127',
    customerName: 'Arthur Dent',
    customerEmail: 'arthur@hitchhiker.gal',
    category: 'Home',
    amount: 340.00,
    quantity: 2,
    status: 'Completed',
    date: createDateDaysAgo(32, 10, 30),
    items: ['Sub-Etha Precision Tea Maker']
  },
  {
    id: 'ORD-9829',
    customerId: 'CUST-128',
    customerName: 'Bruce Wayne',
    customerEmail: 'bruce@wayneenterprises.com',
    category: 'Electronics',
    amount: 4500.00,
    quantity: 6,
    status: 'Completed',
    date: createDateDaysAgo(35, 15, 10),
    items: ['Thermal Night-Vision Sensors 8K']
  },
  {
    id: 'ORD-9830',
    customerId: 'CUST-129',
    customerName: 'Selina Kyle',
    customerEmail: 'selina@gothamgem.org',
    category: 'Apparel',
    amount: 820.00,
    quantity: 2,
    status: 'Completed',
    date: createDateDaysAgo(38, 20, 15),
    items: ['Leather Motorcycle Suit Custom Fit']
  },
  {
    id: 'ORD-9831',
    customerId: 'CUST-130',
    customerName: 'Walter White',
    customerEmail: 'ww@albuquerque-chem.edu',
    category: 'Software',
    amount: 1750.00,
    quantity: 2,
    status: 'Completed',
    date: createDateDaysAgo(40, 11, 40),
    items: ['Spectrometry Chromatography Analysis Pro']
  },
  {
    id: 'ORD-9832',
    customerId: 'CUST-131',
    customerName: 'Jesse Pinkman',
    customerEmail: 'jesse@chili-p.com',
    category: 'Electronics',
    amount: 720.00,
    quantity: 2,
    status: 'Cancelled',
    date: createDateDaysAgo(43, 14, 50),
    items: ['Studio Boom Subwoofer Speakers']
  },
  {
    id: 'ORD-9833',
    customerId: 'CUST-132',
    customerName: 'Arya Stark',
    customerEmail: 'arya@winterfell.north',
    category: 'Apparel',
    amount: 290.00,
    quantity: 2,
    status: 'Completed',
    date: createDateDaysAgo(45, 9, 15),
    items: ['Fleece Lined Winter Cloak']
  },
  {
    id: 'ORD-9834',
    customerId: 'CUST-133',
    customerName: 'Tyrion Lannister',
    customerEmail: 'tyrion@casterlyrock.gov',
    category: 'Home',
    amount: 1420.00,
    quantity: 3,
    status: 'Completed',
    date: createDateDaysAgo(48, 17, 30),
    items: ['Solid Mahogany Wine Cellar Rack']
  },
  {
    id: 'ORD-9835',
    customerId: 'CUST-134',
    customerName: 'Ada Lovelace',
    customerEmail: 'ada@analytical-engine.org',
    category: 'Software',
    amount: 2900.00,
    quantity: 4,
    status: 'Completed',
    date: createDateDaysAgo(52, 10, 0),
    items: ['Bernoulli Number Simulation Algorithm']
  },
  {
    id: 'ORD-9836',
    customerId: 'CUST-135',
    customerName: 'Tony Stark',
    customerEmail: 'tony@starkindustries.com',
    category: 'Electronics',
    amount: 3890.00,
    quantity: 5,
    status: 'Completed',
    date: createDateDaysAgo(55, 12, 40),
    items: ['Arc Reactor Telemetry Receiver', 'Holographic Display Module']
  },
  {
    id: 'ORD-9837',
    customerId: 'CUST-136',
    customerName: 'Natasha Romanoff',
    customerEmail: 'natasha@avengers.gov',
    category: 'Apparel',
    amount: 510.00,
    quantity: 3,
    status: 'Processing',
    date: createDateDaysAgo(58, 16, 20),
    items: ['Reinforced Ballistic Vest Liner']
  },

  // Days 61 to 90 (3 Months Ago)
  {
    id: 'ORD-9838',
    customerId: 'CUST-137',
    customerName: 'Steve Rogers',
    customerEmail: 'steve@brooklyn1941.mil',
    category: 'Home',
    amount: 380.00,
    quantity: 2,
    status: 'Completed',
    date: createDateDaysAgo(62, 8, 30),
    items: ['Classic Hardwood Dining Bench']
  },
  {
    id: 'ORD-9839',
    customerId: 'CUST-138',
    customerName: 'Wanda Maximoff',
    customerEmail: 'wanda@westview.nj',
    category: 'Home',
    amount: 650.00,
    quantity: 4,
    status: 'Completed',
    date: createDateDaysAgo(66, 15, 0),
    items: ['Mid-Century Ceramic Lamp Set']
  },
  {
    id: 'ORD-9840',
    customerId: 'CUST-139',
    customerName: 'Stephen Strange',
    customerEmail: 'strange@sanctum.ny',
    category: 'Software',
    amount: 1980.00,
    quantity: 2,
    status: 'Completed',
    date: createDateDaysAgo(70, 11, 10),
    items: ['Multiverse Dimensional Mapping Engine']
  },
  {
    id: 'ORD-9841',
    customerId: 'CUST-140',
    customerName: 'Carol Danvers',
    customerEmail: 'carol@starforce.space',
    category: 'Electronics',
    amount: 2150.00,
    quantity: 3,
    status: 'Completed',
    date: createDateDaysAgo(73, 13, 20),
    items: ['Hyperspace Communicator Beacon']
  },
  {
    id: 'ORD-9842',
    customerId: 'CUST-141',
    customerName: 'Scott Lang',
    customerEmail: 'scott@x-con-security.biz',
    category: 'Home',
    amount: 490.00,
    quantity: 1,
    status: 'Pending',
    date: createDateDaysAgo(76, 17, 45),
    items: ['Smart Digital Safe with Biometric Lock']
  },
  {
    id: 'ORD-9843',
    customerId: 'CUST-142',
    customerName: 'Hope van Dyne',
    customerEmail: 'hope@pymtech.com',
    category: 'Electronics',
    amount: 3100.00,
    quantity: 4,
    status: 'Completed',
    date: createDateDaysAgo(79, 10, 15),
    items: ['Quantum Particle Sensor Field Kit']
  },
  {
    id: 'ORD-9844',
    customerId: 'CUST-143',
    customerName: 'Bucky Barnes',
    customerEmail: 'bucky@shield-ops.gov',
    category: 'Apparel',
    amount: 340.00,
    quantity: 2,
    status: 'Processing',
    date: createDateDaysAgo(82, 14, 0),
    items: ['All-Weather Tactical Leather Gloves']
  },
  {
    id: 'ORD-9845',
    customerId: 'CUST-144',
    customerName: 'Sam Wilson',
    customerEmail: 'sam@falcon-flight.org',
    category: 'Electronics',
    amount: 1820.00,
    quantity: 2,
    status: 'Completed',
    date: createDateDaysAgo(84, 16, 50),
    items: ['Aerodynamic Carbon Fiber Drone Rig']
  },
  {
    id: 'ORD-9846',
    customerId: 'CUST-145',
    customerName: 'Charles Xavier',
    customerEmail: 'charles@xavier-school.edu',
    category: 'Software',
    amount: 4200.00,
    quantity: 6,
    status: 'Completed',
    date: createDateDaysAgo(86, 9, 20),
    items: ['Cerebro Neural Network Interface V4']
  },
  {
    id: 'ORD-9847',
    customerId: 'CUST-146',
    customerName: 'Erik Lehnsherr',
    customerEmail: 'erik@genosha-council.net',
    category: 'Home',
    amount: 980.00,
    quantity: 2,
    status: 'Cancelled',
    date: createDateDaysAgo(87, 12, 10),
    items: ['Magnetic Levitation Audio Turntable']
  },
  {
    id: 'ORD-9848',
    customerId: 'CUST-147',
    customerName: 'Jean Grey',
    customerEmail: 'jean@phoenix-found.org',
    category: 'Apparel',
    amount: 480.00,
    quantity: 3,
    status: 'Completed',
    date: createDateDaysAgo(88, 15, 30),
    items: ['Tailored Crimson Cashmere Coat']
  },
  {
    id: 'ORD-9849',
    customerId: 'CUST-148',
    customerName: 'Logan Howlett',
    customerEmail: 'logan@weapon-x.ca',
    category: 'Apparel',
    amount: 620.00,
    quantity: 2,
    status: 'Completed',
    date: createDateDaysAgo(89, 11, 40),
    items: ['Heavy-Duty Distressed Buffalo Leather Jacket']
  },
  {
    id: 'ORD-9850',
    customerId: 'CUST-149',
    customerName: 'Hank McCoy',
    customerEmail: 'hank@biogen-institute.org',
    category: 'Electronics',
    amount: 2750.00,
    quantity: 3,
    status: 'Completed',
    date: createDateDaysAgo(90, 13, 0),
    items: ['Centrifuge Digital Thermal Cycler']
  }
];

export const CATEGORIES = ['ALL', 'Electronics', 'Apparel', 'Home', 'Software'];
export const STATUSES = ['Completed', 'Processing', 'Pending', 'Cancelled'];
export const DATE_RANGES = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: 'ytd', label: 'Year To Date' },
  { value: 'all', label: 'All Time' }
];
