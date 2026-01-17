/* Element Data */
const elements = [
  // Row 1
  { num: 1, sym: 'H', nam: 'Hydrogen', mas: '1.008', cat: 'nonmetal', col: 1, row: 1, gp: 1, per: 1, bp: 20.28, mp: 14.01, state: 'Gas', conf: '1s¹', desc: 'Lightest element, extremely abundant in the universe.', isotopes: [{m:'¹H', n:'Protium', a:'99.98%'}, {m:'²H', n:'Deuterium', a:'0.015%'}, {m:'³H', n:'Tritium', a:'Trace'}] },
  { num: 2, sym: 'He', nam: 'Helium', mas: '4.0026', cat: 'noble', col: 18, row: 1, gp: 18, per: 1, bp: 4.22, mp: 0.95, state: 'Gas', conf: '1s²', desc: 'Inert gas, second most abundant element.', isotopes: [{m:'³He', n:'Helium-3', a:'0.0001%'}, {m:'⁴He', n:'Helium-4', a:'99.99%'}] },
  // Row 2
  { num: 3, sym: 'Li', nam: 'Lithium', mas: '6.94', cat: 'alkali', col: 1, row: 2, gp: 1, per: 2, bp: 1603, mp: 453.65, state: 'Solid', conf: '[He] 2s¹', desc: 'Soft, silvery-white metal, used in batteries.', isotopes: [{m:'⁶Li', n:'Lithium-6', a:'7.5%'}, {m:'⁷Li', n:'Lithium-7', a:'92.5%'}] },
  { num: 4, sym: 'Be', nam: 'Beryllium', mas: '9.0122', cat: 'alkaline', col: 2, row: 2, gp: 2, per: 2, bp: 2742, mp: 1560, state: 'Solid', conf: '[He] 2s²', desc: 'Steel-gray alkaline earth metal, very strong.', isotopes: [{m:'⁹Be', n:'Beryllium-9', a:'100%'}] },
  { num: 5, sym: 'B', nam: 'Boron', mas: '10.81', cat: 'metalloid', col: 13, row: 2, gp: 13, per: 2, bp: 4273, mp: 2349, state: 'Solid', conf: '[He] 2s² 2p¹', desc: 'Metalloid used in glass and high-strength materials.', isotopes: [{m:'¹⁰B', n:'Boron-10', a:'19.9%'}, {m:'¹¹B', n:'Boron-11', a:'80.1%'}] },
  { num: 6, sym: 'C', nam: 'Carbon', mas: '12.011', cat: 'nonmetal', col: 14, row: 2, gp: 14, per: 2, bp: 4300, mp: 3823, state: 'Solid', conf: '[He] 2s² 2p²', desc: 'Basis of all life, appears as diamond or graphite.', isotopes: [{m:'¹²C', n:'Carbon-12', a:'98.9%'}, {m:'¹³C', n:'Carbon-13', a:'1.1%'}, {m:'¹⁴C', n:'Carbon-14', a:'Trace'}] },
  { num: 7, sym: 'N', nam: 'Nitrogen', mas: '14.007', cat: 'nonmetal', col: 15, row: 2, gp: 15, per: 2, bp: 77.36, mp: 63.15, state: 'Gas', conf: '[He] 2s² 2p³', desc: 'Colorless gas making up 78% of air.', isotopes: [{m:'¹⁴N', n:'Nitrogen-14', a:'99.6%'}, {m:'¹⁵N', n:'Nitrogen-15', a:'0.4%'}] },
  { num: 8, sym: 'O', nam: 'Oxygen', mas: '15.999', cat: 'nonmetal', col: 16, row: 2, gp: 16, per: 2, bp: 90.19, mp: 54.36, state: 'Gas', conf: '[He] 2s² 2p⁴', desc: 'Highly reactive nonmetal essential for life.', isotopes: [{m:'¹⁶O', n:'Oxygen-16', a:'99.76%'}, {m:'¹⁷O', n:'Oxygen-17', a:'0.04%'}, {m:'¹⁸O', n:'Oxygen-18', a:'0.2%'}] },
  { num: 9, sym: 'F', nam: 'Fluorine', mas: '18.998', cat: 'halogen', col: 17, row: 2, gp: 17, per: 2, bp: 85.03, mp: 53.48, state: 'Gas', conf: '[He] 2s² 2p⁵', desc: 'Most electronegative and reactive element.', isotopes: [{m:'¹⁹F', n:'Fluorine-19', a:'100%'}] },
  { num: 10, sym: 'Ne', nam: 'Neon', mas: '20.180', cat: 'noble', col: 18, row: 2, gp: 18, per: 2, bp: 27.07, mp: 24.56, state: 'Gas', conf: '[He] 2s² 2p⁶', desc: 'Inert gas known for bright reddish glow.', isotopes: [{m:'²⁰Ne', n:'Neon-20', a:'90.5%'}, {m:'²¹Ne', n:'Neon-21', a:'0.3%'}, {m:'²²Ne', n:'Neon-22', a:'9.2%'}] },
  // Row 3
  { num: 11, sym: 'Na', nam: 'Sodium', mas: '22.990', cat: 'alkali', col: 1, row: 3, gp: 1, per: 3, bp: 1156, mp: 370.87, state: 'Solid', conf: '[Ne] 3s¹', desc: 'Soft silvery metal, highly reactive.', isotopes: [{m:'²³Na', n:'Sodium-23', a:'100%'}] },
  { num: 12, sym: 'Mg', nam: 'Magnesium', mas: '24.305', cat: 'alkaline', col: 2, row: 3, gp: 2, per: 3, bp: 1363, mp: 923, state: 'Solid', conf: '[Ne] 3s²', desc: 'Lightweight structural metal.', isotopes: [{m:'²⁴Mg', n:'Magnesium-24', a:'79%'}, {m:'²⁵Mg', n:'Magnesium-25', a:'10%'}, {m:'²⁶Mg', n:'Magnesium-26', a:'11%'}] },
  { num: 13, sym: 'Al', nam: 'Aluminum', mas: '26.982', cat: 'post', col: 13, row: 3, gp: 13, per: 3, bp: 2743, mp: 933.47, state: 'Solid', conf: '[Ne] 3s² 3p¹', desc: 'Abundant metal, durable and lightweight.', isotopes: [{m:'²⁷Al', n:'Aluminum-27', a:'100%'}] },
  { num: 14, sym: 'Si', nam: 'Silicon', mas: '28.085', cat: 'metalloid', col: 14, row: 3, gp: 14, per: 3, bp: 3538, mp: 1687, state: 'Solid', conf: '[Ne] 3s² 3p²', desc: 'Key semiconductor for electronics.', isotopes: [{m:'²⁸Si', n:'Silicon-28', a:'92.2%'}] },
  { num: 15, sym: 'P', nam: 'Phosphorus', mas: '30.974', cat: 'nonmetal', col: 15, row: 3, gp: 15, per: 3, bp: 553, mp: 317.3, state: 'Solid', conf: '[Ne] 3s² 3p³', desc: 'Essential for DNA and cellular energy.', isotopes: [{m:'³¹P', n:'Phosphorus-31', a:'100%'}] },
  { num: 16, sym: 'S', nam: 'Sulfur', mas: '32.06', cat: 'nonmetal', col: 16, row: 3, gp: 16, per: 3, bp: 717.8, mp: 388.36, state: 'Solid', conf: '[Ne] 3s² 3p⁴', desc: 'Yellow nonmetal used in matches and tires.', isotopes: [{m:'³²S', n:'Sulfur-32', a:'95%'}] },
  { num: 17, sym: 'Cl', nam: 'Chlorine', mas: '35.45', cat: 'halogen', col: 17, row: 3, gp: 17, per: 3, bp: 239.11, mp: 171.6, state: 'Gas', conf: '[Ne] 3s² 3p⁵', desc: 'Toxic gas used for sanitation.', isotopes: [{m:'³⁵Cl', n:'Chlorine-35', a:'75.8%'}] },
  { num: 18, sym: 'Ar', nam: 'Argon', mas: '39.948', cat: 'noble', col: 18, row: 3, gp: 18, per: 3, bp: 87.3, mp: 83.8, state: 'Gas', conf: '[Ne] 3s² 3p⁶', desc: 'Common inert gas in bulbs and labs.', isotopes: [{m:'⁴⁰Ar', n:'Argon-40', a:'99.6%'}] },
  // Row 4
  { num: 19, sym: 'K', nam: 'Potassium', mas: '39.1', cat: 'alkali', col: 1, row: 4, gp: 1, per: 4, bp: 1032, mp: 336.5, state: 'Solid', conf: '[Ar] 4s¹', desc: 'Soft metal, vital for biology.', isotopes: [] },
  { num: 20, sym: 'Ca', nam: 'Calcium', mas: '40.08', cat: 'alkaline', col: 2, row: 4, gp: 2, per: 4, bp: 1757, mp: 1115, state: 'Solid', conf: '[Ar] 4s²', desc: 'Structural component of bones.', isotopes: [] },
  { num: 21, sym: 'Sc', nam: 'Scandium', mas: '44.96', cat: 'transition', col: 3, row: 4, gp: 3, per: 4, bp: 3109, mp: 1814, state: 'Solid', conf: '[Ar] 3d¹ 4s²', desc: 'Used in aerospace.', isotopes: [] },
  { num: 22, sym: 'Ti', nam: 'Titanium', mas: '47.87', cat: 'transition', col: 4, row: 4, gp: 4, per: 4, bp: 3560, mp: 1941, state: 'Solid', conf: '[Ar] 3d² 4s²', desc: 'Strong metal, corrosion resistant.', isotopes: [] },
  { num: 23, sym: 'V', nam: 'Vanadium', mas: '50.94', cat: 'transition', col: 5, row: 4, gp: 5, per: 4, bp: 3680, mp: 2183, state: 'Solid', conf: '[Ar] 3d³ 4s²', desc: 'Used in high-strength steel alloys.', isotopes: [] },
  { num: 24, sym: 'Cr', nam: 'Chromium', mas: '52.00', cat: 'transition', col: 6, row: 4, gp: 6, per: 4, bp: 2944, mp: 2180, state: 'Solid', conf: '[Ar] 3d⁵ 4s¹', desc: 'Shiny metal used in plating.', isotopes: [] },
  { num: 25, sym: 'Mn', nam: 'Manganese', mas: '54.94', cat: 'transition', col: 7, row: 4, gp: 7, per: 4, bp: 2334, mp: 1519, state: 'Solid', conf: '[Ar] 3d⁵ 4s²', desc: 'Vital for iron production.', isotopes: [] },
  { num: 26, sym: 'Fe', nam: 'Iron', mas: '55.85', cat: 'transition', col: 8, row: 4, gp: 8, per: 4, bp: 3134, mp: 1811, state: 'Solid', conf: '[Ar] 3d⁶ 4s²', desc: 'Common element on Earth.', isotopes: [] },
  { num: 27, sym: 'Co', nam: 'Cobalt', mas: '58.93', cat: 'transition', col: 9, row: 4, gp: 9, per: 4, bp: 3200, mp: 1768, state: 'Solid', conf: '[Ar] 3d⁷ 4s²', desc: 'Used in magnets.', isotopes: [] },
  { num: 28, sym: 'Ni', nam: 'Nickel', mas: '58.69', cat: 'transition', col: 10, row: 4, gp: 10, per: 4, bp: 3186, mp: 1728, state: 'Solid', conf: '[Ar] 3d⁸ 4s²', desc: 'Common metal in stainless steel.', isotopes: [] },
  { num: 29, sym: 'Cu', nam: 'Copper', mas: '63.55', cat: 'transition', col: 11, row: 4, gp: 11, per: 4, bp: 2835, mp: 1358, state: 'Solid', conf: '[Ar] 3d¹⁰ 4s¹', desc: 'High electrical conductivity.', isotopes: [] },
  { num: 30, sym: 'Zn', nam: 'Zinc', mas: '65.38', cat: 'transition', col: 12, row: 4, gp: 12, per: 4, bp: 1180, mp: 693, state: 'Solid', conf: '[Ar] 3d¹⁰ 4s²', desc: 'Used to galvanize steel.', isotopes: [] },
  { num: 31, sym: 'Ga', nam: 'Gallium', mas: '69.72', cat: 'post', col: 13, row: 4, gp: 13, per: 4, bp: 2477, mp: 303, state: 'Solid', conf: '[Ar] 3d¹⁰ 4s² 4p¹', desc: 'Melts in hands.', isotopes: [] },
  { num: 32, sym: 'Ge', nam: 'Germanium', mas: '72.63', cat: 'metalloid', col: 14, row: 4, gp: 14, per: 4, bp: 3106, mp: 1211, state: 'Solid', conf: '[Ar] 3d¹⁰ 4s² 4p²', desc: 'Semiconductor metal.', isotopes: [] },
  { num: 33, sym: 'As', nam: 'Arsenic', mas: '74.92', cat: 'metalloid', col: 15, row: 4, gp: 15, per: 4, bp: 887, mp: 1090, state: 'Solid', conf: '[Ar] 3d¹⁰ 4s² 4p³', desc: 'Toxic metalloid.', isotopes: [] },
  { num: 34, sym: 'Se', nam: 'Selenium', mas: '78.97', cat: 'nonmetal', col: 16, row: 4, gp: 16, per: 4, bp: 958, mp: 494, state: 'Solid', conf: '[Ar] 3d¹⁰ 4s² 4p⁴', desc: 'Used in photocells.', isotopes: [] },
  { num: 35, sym: 'Br', nam: 'Bromine', mas: '79.90', cat: 'halogen', col: 17, row: 4, gp: 17, per: 4, bp: 332, mp: 266, state: 'Liquid', conf: '[Ar] 3d¹⁰ 4s² 4p⁵', desc: 'Liquid at STP.', isotopes: [] },
  { num: 36, sym: 'Kr', nam: 'Krypton', mas: '83.80', cat: 'noble', col: 18, row: 4, gp: 18, per: 4, bp: 120, mp: 116, state: 'Gas', conf: '[Ar] 3d¹⁰ 4s² 4p⁶', desc: 'Used in photography.', isotopes: [] },
  { num: 37, sym: 'Rb', nam: 'Rubidium', mas: '85.47', cat: 'alkali', col: 1, row: 5, gp: 1, per: 5, bp: 961, mp: 312, state: 'Solid', conf: '[Kr] 5s¹', desc: 'Reactive alkali metal.', isotopes: [] },
  { num: 38, sym: 'Sr', nam: 'Strontium', mas: '87.62', cat: 'alkaline', col: 2, row: 5, gp: 2, per: 5, bp: 1655, mp: 1050, state: 'Solid', conf: '[Kr] 5s²', desc: 'Reactive alkaline earth metal.', isotopes: [] },
  { num: 39, sym: 'Y', nam: 'Yttrium', mas: '88.91', cat: 'transition', col: 3, row: 5, gp: 3, per: 5, bp: 3609, mp: 1799, state: 'Solid', conf: '[Kr] 4d¹ 5s²', desc: 'Rare-earth used in LEDs.', isotopes: [] },
  { num: 40, sym: 'Zr', nam: 'Zirconium', mas: '91.22', cat: 'transition', col: 4, row: 5, gp: 4, per: 5, bp: 4682, mp: 2128, state: 'Solid', conf: '[Kr] 4d² 5s²', desc: 'Heat and corrosion resistant.', isotopes: [] },
  { num: 41, sym: 'Nb', nam: 'Niobium', mas: '92.91', cat: 'transition', col: 5, row: 5, gp: 5, per: 5, bp: 5017, mp: 2750, state: 'Solid', conf: '[Kr] 4d⁴ 5s¹', desc: 'Used in superalloys.', isotopes: [] },
  { num: 42, sym: 'Mo', nam: 'Molybdenum', mas: '95.95', cat: 'transition', col: 6, row: 5, gp: 6, per: 5, bp: 4912, mp: 2896, state: 'Solid', conf: '[Kr] 4d⁵ 5s¹', desc: 'High melting point.', isotopes: [] },
  { num: 43, sym: 'Tc', nam: 'Technetium', mas: '(98)', cat: 'transition', col: 7, row: 5, gp: 7, per: 5, bp: 4538, mp: 2430, state: 'Solid', conf: '[Kr] 4d⁵ 5s²', desc: 'First synthetic element.', isotopes: [] },
  { num: 44, sym: 'Ru', nam: 'Ruthenium', mas: '101.1', cat: 'transition', col: 8, row: 5, gp: 8, per: 5, bp: 4423, mp: 2607, state: 'Solid', conf: '[Kr] 4d⁷ 5s¹', desc: 'Rare platinum metal.', isotopes: [] },
  { num: 45, sym: 'Rh', nam: 'Rhodium', mas: '102.9', cat: 'transition', col: 9, row: 5, gp: 9, per: 5, bp: 3968, mp: 2237, state: 'Solid', conf: '[Kr] 4d⁸ 5s¹', desc: 'Highly valuable metal.', isotopes: [] },
  { num: 46, sym: 'Pd', nam: 'Palladium', mas: '106.4', cat: 'transition', col: 10, row: 5, gp: 10, per: 5, bp: 3236, mp: 1828, state: 'Solid', conf: '[Kr] 4d¹⁰', desc: 'Used in catalysts.', isotopes: [] },
  { num: 47, sym: 'Ag', nam: 'Silver', mas: '107.9', cat: 'transition', col: 11, row: 5, gp: 11, per: 5, bp: 2435, mp: 1235, state: 'Solid', conf: '[Kr] 4d¹⁰ 5s¹', desc: 'Highest electrical conductivity.', isotopes: [] },
  { num: 48, sym: 'Cd', nam: 'Cadmium', mas: '112.4', cat: 'transition', col: 12, row: 5, gp: 12, per: 5, bp: 1040, mp: 594, state: 'Solid', conf: '[Kr] 4d¹⁰ 5s²', desc: 'Used in batteries.', isotopes: [] },
  { num: 49, sym: 'In', nam: 'Indium', mas: '114.8', cat: 'post', col: 13, row: 5, gp: 13, per: 5, bp: 2345, mp: 430, state: 'Solid', conf: '[Kr] 4d¹⁰ 5s² 5p¹', desc: 'Used in touchscreens.', isotopes: [] },
  { num: 50, sym: 'Sn', nam: 'Tin', mas: '118.7', cat: 'post', col: 14, row: 5, gp: 14, per: 5, bp: 2875, mp: 505, state: 'Solid', conf: '[Kr] 4d¹⁰ 5s² 5p²', desc: 'Malleable metal.', isotopes: [] },
  { num: 51, sym: 'Sb', nam: 'Antimony', mas: '121.8', cat: 'metalloid', col: 15, row: 5, gp: 15, per: 5, bp: 1860, mp: 904, state: 'Solid', conf: '[Kr] 4d¹⁰ 5s² 5p³', desc: 'Used in retardants.', isotopes: [] },
  { num: 52, sym: 'Te', nam: 'Tellurium', mas: '127.6', cat: 'metalloid', col: 16, row: 5, gp: 16, per: 5, bp: 1261, mp: 723, state: 'Solid', conf: '[Kr] 4d¹⁰ 5s² 5p⁴', desc: 'Rare stable metalloid.', isotopes: [] },
  { num: 53, sym: 'I', nam: 'Iodine', mas: '126.9', cat: 'halogen', col: 17, row: 5, gp: 17, per: 5, bp: 457, mp: 387, state: 'Solid', conf: '[Kr] 4d¹⁰ 5s² 5p⁵', desc: 'Lustrous black solid.', isotopes: [] },
  { num: 54, sym: 'Xe', nam: 'Xenon', mas: '131.3', cat: 'noble', col: 18, row: 5, gp: 18, per: 5, bp: 165, mp: 161, state: 'Gas', conf: '[Kr] 4d¹⁰ 5s² 5p⁶', desc: 'Used in discharge bulbs.', isotopes: [] },
  { num: 55, sym: 'Cs', nam: 'Cesium', mas: '132.9', cat: 'alkali', col: 1, row: 6, gp: 1, per: 6, bp: 944, mp: 302, state: 'Solid', conf: '[Xe] 6s¹', desc: 'Reactive alkali metal.', isotopes: [] },
  { num: 56, sym: 'Ba', nam: 'Barium', mas: '137.3', cat: 'alkaline', col: 2, row: 6, gp: 2, per: 6, bp: 2170, mp: 1000, state: 'Solid', conf: '[Xe] 6s²', desc: 'Heavy alkaline earth metal.', isotopes: [] },
  { num: 72, sym: 'Hf', nam: 'Hafnium', mas: '178.5', cat: 'transition', col: 4, row: 6, gp: 4, per: 6, bp: 4876, mp: 2506, state: 'Solid', conf: '[Xe] 4f¹⁴ 5d² 6s²', desc: 'Nuclear rod metal.', isotopes: [] },
  { num: 73, sym: 'Ta', nam: 'Tantalum', mas: '181.0', cat: 'transition', col: 5, row: 6, gp: 5, per: 6, bp: 5731, mp: 3290, state: 'Solid', conf: '[Xe] 4f¹⁴ 5d³ 6s²', desc: 'Corrosion resistant metal.', isotopes: [] },
  { num: 74, sym: 'W', nam: 'Tungsten', mas: '183.8', cat: 'transition', col: 6, row: 6, gp: 6, per: 6, bp: 6203, mp: 3695, state: 'Solid', conf: '[Xe] 4f¹⁴ 5d⁴ 6s²', desc: 'High melting point.', isotopes: [] },
  { num: 75, sym: 'Re', nam: 'Rhenium', mas: '186.2', cat: 'transition', col: 7, row: 6, gp: 7, per: 6, bp: 5869, mp: 3459, state: 'Solid', conf: '[Xe] 4f¹⁴ 5d⁵ 6s²', desc: 'Rare transition metal.', isotopes: [] },
  { num: 76, sym: 'Os', nam: 'Osmium', mas: '190.2', cat: 'transition', col: 8, row: 6, gp: 8, per: 6, bp: 5285, mp: 3306, state: 'Solid', conf: '[Xe] 4f¹⁴ 5d⁶ 6s²', desc: 'Densest natural element.', isotopes: [] },
  { num: 77, sym: 'Ir', nam: 'Iridium', mas: '192.2', cat: 'transition', col: 9, row: 6, gp: 9, per: 6, bp: 4403, mp: 2719, state: 'Solid', conf: '[Xe] 4f¹⁴ 5d⁷ 6s²', desc: 'Rare platinum metal.', isotopes: [] },
  { num: 78, sym: 'Pt', nam: 'Platinum', mas: '195.1', cat: 'transition', col: 10, row: 6, gp: 10, per: 6, bp: 4098, mp: 2041, state: 'Solid', conf: '[Xe] 4f¹⁴ 5d⁹ 6s¹', desc: 'Precious noble metal.', isotopes: [] },
  { num: 79, sym: 'Au', nam: 'Gold', mas: '197.0', cat: 'transition', col: 11, row: 6, gp: 11, per: 6, bp: 3129, mp: 1337, state: 'Solid', conf: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', desc: 'Precious yellow metal.', isotopes: [] },
  { num: 80, sym: 'Hg', nam: 'Mercury', mas: '200.6', cat: 'transition', col: 12, row: 6, gp: 12, per: 6, bp: 630, mp: 234, state: 'Liquid', conf: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', desc: 'Liquid at STP.', isotopes: [] },
  { num: 81, sym: 'Tl', nam: 'Thallium', mas: '204.4', cat: 'post', col: 13, row: 6, gp: 13, per: 6, bp: 1746, mp: 577, state: 'Solid', conf: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', desc: 'Toxic grey metal.', isotopes: [] },
  { num: 82, sym: 'Pb', nam: 'Lead', mas: '207.2', cat: 'post', col: 14, row: 6, gp: 14, per: 6, bp: 2022, mp: 601, state: 'Solid', conf: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', desc: 'Heavy toxic metal.', isotopes: [] },
  { num: 83, sym: 'Bi', nam: 'Bismuth', mas: '209.0', cat: 'post', col: 15, row: 6, gp: 15, per: 6, bp: 1837, mp: 545, state: 'Solid', conf: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', desc: 'Pinkish white metal.', isotopes: [] },
  { num: 84, sym: 'Po', nam: 'Polonium', mas: '(209)', cat: 'post', col: 16, row: 6, gp: 16, per: 6, bp: 1235, mp: 527, state: 'Solid', conf: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', desc: 'Radioactive element.', isotopes: [] },
  { num: 85, sym: 'At', nam: 'Astatine', mas: '(210)', cat: 'metalloid', col: 17, row: 6, gp: 17, per: 6, bp: 610, mp: 575, state: 'Solid', conf: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', desc: 'Rarest natural metalloid.', isotopes: [] },
  { num: 86, sym: 'Rn', nam: 'Radon', mas: '(222)', cat: 'noble', col: 18, row: 6, gp: 18, per: 6, bp: 211, mp: 202, state: 'Gas', conf: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', desc: 'Radioactive inert gas.', isotopes: [] },
  { num: 87, sym: 'Fr', nam: 'Francium', mas: '(223)', cat: 'alkali', col: 1, row: 7, gp: 1, per: 7, bp: 950, mp: 300, state: 'Solid', conf: '[Rn] 7s¹', desc: 'Rare radioactive metal.', isotopes: [] },
  { num: 88, sym: 'Ra', nam: 'Radium', mas: '(226)', cat: 'alkaline', col: 2, row: 7, gp: 2, per: 7, bp: 2010, mp: 973, state: 'Solid', conf: '[Rn] 7s²', desc: 'Radioactive element.', isotopes: [] },
  { num: 104, sym: 'Rf', nam: 'Rutherfordium', mas: '(267)', cat: 'transition', col: 4, row: 7, gp: 4, per: 7, bp: 0, mp: 0, state: 'Solid', conf: '[Rn] 5f¹⁴ 6d² 7s²', desc: 'Synthetic superheavy metal.', isotopes: [] },
  { num: 105, sym: 'Db', nam: 'Dubnium', mas: '(268)', cat: 'transition', col: 5, row: 7, gp: 5, per: 7, bp: 0, mp: 0, state: 'Solid', conf: '[Rn] 5f¹⁴ 6d³ 7s²', desc: 'Synthetic element.', isotopes: [] },
  { num: 106, sym: 'Sg', nam: 'Seaborgium', mas: '(269)', cat: 'transition', col: 6, row: 7, gp: 6, per: 7, bp: 0, mp: 0, state: 'Solid', conf: '[Rn] 5f¹⁴ 6d⁴ 7s²', desc: 'Synthetic radioactive element.', isotopes: [] },
  { num: 107, sym: 'Bh', nam: 'Bohrium', mas: '(270)', cat: 'transition', col: 7, row: 7, gp: 7, per: 7, bp: 0, mp: 0, state: 'Solid', conf: '[Rn] 5f¹⁴ 6d⁵ 7s²', desc: 'Synthetic superheavy metal.', isotopes: [] },
  { num: 108, sym: 'Hs', nam: 'Hassium', mas: '(269)', cat: 'transition', col: 8, row: 7, gp: 8, per: 7, bp: 0, mp: 0, state: 'Solid', conf: '[Rn] 5f¹⁴ 6d⁶ 7s²', desc: 'Synthetic metal.', isotopes: [] },
  { num: 109, sym: 'Mt', nam: 'Meitnerium', mas: '(278)', cat: 'transition', col: 9, row: 7, gp: 9, per: 7, bp: 0, mp: 0, state: 'Solid', conf: '[Rn] 5f¹⁴ 6d⁷ 7s²', desc: 'Named after Lise Meitner.', isotopes: [] },
  { num: 110, sym: 'Ds', nam: 'Darmstadtium', mas: '(281)', cat: 'transition', col: 10, row: 7, gp: 10, per: 7, bp: 0, mp: 0, state: 'Solid', conf: '[Rn] 5f¹⁴ 6d⁸ 7s²', desc: 'Named after Darmstadt.', isotopes: [] },
  { num: 111, sym: 'Rg', nam: 'Roentgenium', mas: '(282)', cat: 'transition', col: 11, row: 7, gp: 11, per: 7, bp: 0, mp: 0, state: 'Solid', conf: '[Rn] 5f¹⁴ 6d⁹ 7s²', desc: 'Synthetic transition metal.', isotopes: [] },
  { num: 112, sym: 'Cn', nam: 'Copernicium', mas: '(285)', cat: 'transition', col: 12, row: 7, gp: 12, per: 7, bp: 357, mp: 283, state: 'Solid', conf: '[Rn] 5f¹⁴ 6d¹⁰ 7s²', desc: 'Synthetic element.', isotopes: [] },
  { num: 113, sym: 'Nh', nam: 'Nihonium', mas: '(286)', cat: 'post', col: 13, row: 7, gp: 13, per: 7, bp: 1430, mp: 700, state: 'Solid', conf: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', desc: 'Synthetic element.', isotopes: [] },
  { num: 114, sym: 'Fl', nam: 'Flerovium', mas: '(289)', cat: 'post', col: 14, row: 7, gp: 14, per: 7, bp: 420, mp: 340, state: 'Solid', conf: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', desc: 'Synthetic metal.', isotopes: [] },
  { num: 115, sym: 'Mc', nam: 'Moscovium', mas: '(290)', cat: 'post', col: 15, row: 7, gp: 15, per: 7, bp: 1400, mp: 670, state: 'Solid', conf: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', desc: 'Named after Moscow region.', isotopes: [] },
  { num: 116, sym: 'Lv', nam: 'Livermorium', mas: '(293)', cat: 'post', col: 16, row: 7, gp: 16, per: 7, bp: 1035, mp: 708, state: 'Solid', conf: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', desc: 'Named after Livermore lab.', isotopes: [] },
  { num: 117, sym: 'Ts', nam: 'Tennessine', mas: '(294)', cat: 'halogen', col: 17, row: 7, gp: 17, per: 7, bp: 883, mp: 723, state: 'Solid', conf: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', desc: 'Second heaviest element.', isotopes: [] },
  { num: 118, sym: 'Og', nam: 'Oganesson', mas: '(294)', cat: 'noble', col: 18, row: 7, gp: 18, per: 7, bp: 350, mp: 325, state: 'Solid', conf: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', desc: 'Heaviest known element.', isotopes: [] },

  // Lanthanides Row 9
  { num: 57, sym: 'La', nam: 'Lanthanum', mas: '138.9', cat: 'lanthanide', col: 3, row: 9, gp: 'N/A', per: 6, bp: 3737, mp: 1193, state: 'Solid', conf: '[Xe] 5d¹ 6s²', desc: 'Soft ductile white metal.', isotopes: [] },
  { num: 58, sym: 'Ce', nam: 'Cerium', mas: '140.1', cat: 'lanthanide', col: 4, row: 9, gp: 'N/A', per: 6, bp: 3716, mp: 1068, state: 'Solid', conf: '[Xe] 4f¹ 5d¹ 6s²', desc: 'Common rare-earth element.', isotopes: [] },
  { num: 59, sym: 'Pr', nam: 'Praseodymium', mas: '140.9', cat: 'lanthanide', col: 5, row: 9, gp: 'N/A', per: 6, bp: 3403, mp: 1208, state: 'Solid', conf: '[Xe] 4f³ 6s²', desc: 'Soft silvery metal.', isotopes: [] },
  { num: 60, sym: 'Nd', nam: 'Neodymium', mas: '144.2', cat: 'lanthanide', col: 6, row: 9, gp: 'N/A', per: 6, bp: 3347, mp: 1297, state: 'Solid', conf: '[Xe] 4f⁴ 6s²', desc: 'Strong permanent magnets.', isotopes: [] },
  { num: 61, sym: 'Pm', nam: 'Promethium', mas: '(145)', cat: 'lanthanide', col: 7, row: 9, gp: 'N/A', per: 6, bp: 3273, mp: 1315, state: 'Solid', conf: '[Xe] 4f⁵ 6s²', desc: 'Radioactive rare-earth metal.', isotopes: [] },
  { num: 62, sym: 'Sm', nam: 'Samarium', mas: '150.4', cat: 'lanthanide', col: 8, row: 9, gp: 'N/A', per: 6, bp: 2067, mp: 1345, state: 'Solid', conf: '[Xe] 4f⁶ 6s²', desc: 'Moderately hard metal.', isotopes: [] },
  { num: 63, sym: 'Eu', nam: 'Europium', mas: '152.0', cat: 'lanthanide', col: 9, row: 9, gp: 'N/A', per: 6, bp: 1802, mp: 1099, state: 'Solid', conf: '[Xe] 4f⁷ 6s²', desc: 'Reactive lanthanide.', isotopes: [] },
  { num: 64, sym: 'Gd', nam: 'Gadolinium', mas: '157.3', cat: 'lanthanide', col: 10, row: 9, gp: 'N/A', per: 6, bp: 3546, mp: 1585, state: 'Solid', conf: '[Xe] 4f⁷ 5d¹ 6s²', desc: 'Rare-earth metal.', isotopes: [] },
  { num: 65, sym: 'Tb', nam: 'Terbium', mas: '158.9', cat: 'lanthanide', col: 11, row: 9, gp: 'N/A', per: 6, bp: 3503, mp: 1629, state: 'Solid', conf: '[Xe] 4f⁹ 6s²', desc: 'Used in electronics.', isotopes: [] },
  { num: 66, sym: 'Dy', nam: 'Dysprosium', mas: '162.5', cat: 'lanthanide', col: 12, row: 9, gp: 'N/A', per: 6, bp: 2840, mp: 1680, state: 'Solid', conf: '[Xe] 4f¹⁰ 6s²', desc: 'High magnetic strength.', isotopes: [] },
  { num: 67, sym: 'Ho', nam: 'Holmium', mas: '164.9', cat: 'lanthanide', col: 13, row: 9, gp: 'N/A', per: 6, bp: 2993, mp: 1734, state: 'Solid', conf: '[Xe] 4f¹¹ 6s²', desc: 'Strong magnetic fields.', isotopes: [] },
  { num: 68, sym: 'Er', nam: 'Erbium', mas: '167.3', cat: 'lanthanide', col: 14, row: 9, gp: 'N/A', per: 6, bp: 3141, mp: 1802, state: 'Solid', conf: '[Xe] 4f¹² 6s²', desc: 'Used in optical amplifiers.', isotopes: [] },
  { num: 69, sym: 'Tm', nam: 'Thulium', mas: '168.9', cat: 'lanthanide', col: 15, row: 9, gp: 'N/A', per: 6, bp: 2223, mp: 1818, state: 'Solid', conf: '[Xe] 4f¹³ 6s²', desc: 'Rare ductile metal.', isotopes: [] },
  { num: 70, sym: 'Yb', nam: 'Ytterbium', mas: '173.1', cat: 'lanthanide', col: 16, row: 9, gp: 'N/A', per: 6, bp: 1469, mp: 1097, state: 'Solid', conf: '[Xe] 4f¹⁴ 6s²', desc: 'Silvery white metal.', isotopes: [] },
  { num: 71, sym: 'Lu', nam: 'Lutetium', mas: '175.0', cat: 'lanthanide', col: 17, row: 9, gp: 'N/A', per: 6, bp: 3675, mp: 1925, state: 'Solid', conf: '[Xe] 4f¹⁴ 5d¹ 6s²', desc: 'Hardest rare-earth metal.', isotopes: [] },

  // Actinides Row 10
  { num: 89, sym: 'Ac', nam: 'Actinium', mas: '(227)', cat: 'actinide', col: 3, row: 10, gp: 'N/A', per: 7, bp: 3471, mp: 1323, state: 'Solid', conf: '[Rn] 6d¹ 7s²', desc: 'Radioactive silvery metal.', isotopes: [] },
  { num: 90, sym: 'Th', nam: 'Thorium', mas: '232.0', cat: 'actinide', col: 4, row: 10, gp: 'N/A', per: 7, bp: 5061, mp: 2023, state: 'Solid', conf: '[Rn] 6d² 7s²', desc: 'Potential nuclear fuel.', isotopes: [] },
  { num: 91, sym: 'Pa', nam: 'Protactinium', mas: '231.0', cat: 'actinide', col: 5, row: 10, gp: 'N/A', per: 7, bp: 4300, mp: 1841, state: 'Solid', conf: '[Rn] 5f² 6d¹ 7s²', desc: 'Dense radioactive metal.', isotopes: [] },
  { num: 92, sym: 'U', nam: 'Uranium', mas: '238.0', cat: 'actinide', col: 6, row: 10, gp: 'N/A', per: 7, bp: 4404, mp: 1405, state: 'Solid', conf: '[Rn] 5f³ 6d¹ 7s²', desc: 'Key fuel for reactors.', isotopes: [] },
  { num: 93, sym: 'Np', nam: 'Neptunium', mas: '(237)', cat: 'actinide', col: 7, row: 10, gp: 'N/A', per: 7, bp: 4175, mp: 917, state: 'Solid', conf: '[Rn] 5f⁴ 6d¹ 7s²', desc: 'Transuranic metal.', isotopes: [] },
  { num: 94, sym: 'Pu', nam: 'Plutonium', mas: '(244)', cat: 'actinide', col: 8, row: 10, gp: 'N/A', per: 7, bp: 3501, mp: 913, state: 'Solid', conf: '[Rn] 5f⁶ 7s²', desc: 'Used in reactors.', isotopes: [] },
  { num: 95, sym: 'Am', nam: 'Americium', mas: '(243)', cat: 'actinide', col: 9, row: 10, gp: 'N/A', per: 7, bp: 2880, mp: 1449, state: 'Solid', conf: '[Rn] 5f⁷ 7s²', desc: 'Used in detectors.', isotopes: [] },
  { num: 96, sym: 'Cm', nam: 'Curium', mas: '(247)', cat: 'actinide', col: 10, row: 10, gp: 'N/A', per: 7, bp: 3383, mp: 1613, state: 'Solid', conf: '[Rn] 5f⁷ 6d¹ 7s²', desc: 'Synthetic element.', isotopes: [] },
  { num: 97, sym: 'Bk', nam: 'Berkelium', mas: '(247)', cat: 'actinide', col: 11, row: 10, gp: 'N/A', per: 7, bp: 0, mp: 1259, state: 'Solid', conf: '[Rn] 5f⁹ 7s²', desc: 'Named after Berkeley.', isotopes: [] },
  { num: 98, sym: 'Cf', nam: 'Californium', mas: '(251)', cat: 'actinide', col: 12, row: 10, gp: 'N/A', per: 7, bp: 0, mp: 1173, state: 'Solid', conf: '[Rn] 5f¹⁰ 7s²', desc: 'Neutron source.', isotopes: [] },
  { num: 99, sym: 'Es', nam: 'Einsteinium', mas: '(252)', cat: 'actinide', col: 13, row: 10, gp: 'N/A', per: 7, bp: 0, mp: 1133, state: 'Solid', conf: '[Rn] 5f¹¹ 7s²', desc: 'Synthetic element.', isotopes: [] },
  { num: 100, sym: 'Fm', nam: 'Fermium', mas: '(257)', cat: 'actinide', col: 14, row: 10, gp: 'N/A', per: 7, bp: 0, mp: 1800, state: 'Solid', conf: '[Rn] 5f¹² 7s²', desc: 'Synthetic element.', isotopes: [] },
  { num: 101, sym: 'Md', nam: 'Mendelevium', mas: '(258)', cat: 'actinide', col: 15, row: 10, gp: 'N/A', per: 7, bp: 0, mp: 1100, state: 'Solid', conf: '[Rn] 5f¹³ 7s²', desc: 'Named after Mendeleev.', isotopes: [] },
  { num: 102, sym: 'No', nam: 'Nobelium', mas: '(259)', cat: 'actinide', col: 16, row: 10, gp: 'N/A', per: 7, bp: 0, mp: 1100, state: 'Solid', conf: '[Rn] 5f¹⁴ 7s²', desc: 'Named after Nobel.', isotopes: [] },
  { num: 103, sym: 'Lr', nam: 'Lawrencium', mas: '(262)', cat: 'actinide', col: 17, row: 10, gp: 'N/A', per: 7, bp: 0, mp: 1900, state: 'Solid', conf: '[Rn] 5f¹⁴ 7s² 7p¹', desc: 'Synthetic metal.', isotopes: [] }
];
/* ===================== UTIL ===================== */
const kToC = (k) => k <= 0 ? 'N/A' : (Math.round((k - 273.15) * 100) / 100) + ' °C';

/* ===================== ELEMENT REFS ===================== */
const viewport = document.getElementById('tableViewport');
const tableContainer = document.getElementById('periodicTable');
const filterContainer = document.getElementById('filterContainer');
const modalOverlay = document.getElementById('modalOverlay');
const modalStaticInfo = document.getElementById('modalStaticInfo');
const modalTabContent = document.getElementById('modalTabContent');
const modalClose = document.getElementById('modalClose');
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');

/* ===================== PAN / ZOOM STATE ===================== */
let scale = 0.8;
let translateX = 0;
let translateY = 0;
let isPanning = false;
let lastX = 0;
let lastY = 0;
let lastPinchDist = 0;

/* ===================== TRANSFORM ===================== */
function updateTransform() {
    if (!tableContainer) return;
    tableContainer.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

/* ===================== CENTER TABLE ===================== */
function centerTable() {
    if (!tableContainer || !viewport) return;

    const tableRect = tableContainer.getBoundingClientRect();
    const viewRect = viewport.getBoundingClientRect();

    translateX = (viewRect.width - tableRect.width * scale) / 2;
    translateY = (viewRect.height - tableRect.height * scale) / 2;

    updateTransform();
}

/* ===================== MOUSE PAN ===================== */
viewport?.addEventListener('mousedown', (e) => {
    isPanning = true;
    lastX = e.clientX;
    lastY = e.clientY;
});

window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    translateX += e.clientX - lastX;
    translateY += e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    updateTransform();
});

window.addEventListener('mouseup', () => isPanning = false);

/* ===================== ZOOM ===================== */
viewport?.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomSpeed = 0.001;
    scale = Math.min(Math.max(scale - e.deltaY * zoomSpeed, 0.25), 3);
    updateTransform();
}, { passive: false });

/* ===================== TOUCH PAN / ZOOM ===================== */
viewport?.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        isPanning = true;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
        isPanning = false;
        lastPinchDist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
    }
});

viewport?.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1 && isPanning) {
        translateX += e.touches[0].clientX - lastX;
        translateY += e.touches[0].clientY - lastY;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
        updateTransform();
    } else if (e.touches.length === 2) {
        const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
        scale *= dist / lastPinchDist;
        lastPinchDist = dist;
        updateTransform();
    }
});

viewport?.addEventListener('touchend', () => {
    isPanning = false;
    lastPinchDist = 0;
});

/* ===================== TABLE ===================== */
let activeCategory = 'all';
let selectedElement = null;

function renderTable() {
    if (!tableContainer) return;
    tableContainer.innerHTML = '';

    elements.forEach(el => {
        const d = document.createElement('div');
        d.className = `element ${el.cat}`;
        d.style.gridColumn = el.col;
        d.style.gridRow = el.row;

        if (activeCategory !== 'all' && el.cat !== activeCategory)
            d.classList.add('dimmed');

        d.innerHTML = `
            <div class="number">${el.num}</div>
            <div class="symbol">${el.sym}</div>
            <div class="name">${el.nam}</div>
            <div class="mass">${el.mas}</div>
        `;

        d.onclick = (e) => {
            if (isPanning) return;
            openModal(el);
            e.stopPropagation();
        };

        tableContainer.appendChild(d);
    });

    const gap = document.createElement('div');
    gap.className = 'f-block-gap';
    gap.style.gridRow = '8';
    tableContainer.appendChild(gap);

    requestAnimationFrame(centerTable);
}

document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        if (target) updateModalTab(target);
    });
});

/* ===================== MODAL ===================== */
function openModal(el) {
    selectedElement = el;

    modalStaticInfo.innerHTML = `
        <div class="modal-header-info">
            <div class="modal-sym-box ${el.cat}">
                <div class="symbol">${el.sym}</div>
            </div>
            <div class="modal-title">
                <div class="modal-cat-tag">${el.cat}</div>
                <h2>${el.nam}</h2>
            </div>
        </div>
        <div class="modal-desc">
            <strong>Overview:</strong> ${el.desc}
        </div>
    `;

    updateModalTab('overview');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateModalTab(tab) {
    if (!selectedElement) return;

    document.querySelectorAll('.modal-tab')
        .forEach(t => t.classList.toggle('active', t.dataset.tab === tab));

    if (tab === 'overview') {
        modalTabContent.innerHTML = `
            <div class="modal-grid">
                <div class="stat-item"><div class="stat-label">Atomic Mass</div><div class="stat-value">${selectedElement.mas}</div></div>
                <div class="stat-item"><div class="stat-label">Group</div><div class="stat-value">${selectedElement.gp}</div></div>
                <div class="stat-item"><div class="stat-label">Period</div><div class="stat-value">${selectedElement.per}</div></div>
                <div class="stat-item"><div class="stat-label">State</div><div class="stat-value">${selectedElement.state}</div></div>
                <div class="stat-item"><div class="stat-label">Boiling Point</div><div class="stat-value">${kToC(selectedElement.bp)}</div></div>
                <div class="stat-item"><div class="stat-label">Melting Point</div><div class="stat-value">${kToC(selectedElement.mp)}</div></div>
                <div class="stat-item" style="grid-column:span 2;">
                    <div class="stat-label">Electron Config</div>
                    <div class="stat-value">${selectedElement.conf}</div>
                </div>
            </div>
        `;
    } else {
        const isos = selectedElement.isotopes?.length
            ? selectedElement.isotopes.map(i => `
                <div class="isotope-item">
                    <span>${i.m} — ${i.n}</span>
                    <span>${i.a}</span>
                    <span class="${i.stable ? 'stable' : 'unstable'}">
                        ${i.stable ? 'Stable' : 'Unstable'}
                    </span>
                </div>
            `).join('')
            : '<p style="opacity:.5;text-align:center;">No isotope data.</p>';

        modalTabContent.innerHTML = `<div class="isotope-list">${isos}</div>`;
    }
}

/* ===================== UI EVENTS ===================== */
filterContainer?.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    filterContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat || 'all';
    renderTable();
});

modalClose.onclick = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
};

hamburger.onclick = () => sideMenu.classList.add('open');
closeMenu.onclick = () => sideMenu.classList.remove('open');

/* ===================== ATOMS BACKGROUND ===================== */
const canvas = document.getElementById('atomsBg');
const ctx = canvas.getContext('2d');

let dots = [];
let explosions = [];

function initDots() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dots = [];

    for (let i = 0; i < 30; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.9,
            vy: (Math.random() - 0.5) * 0.9,
            r: Math.random() * 3 + 2
        });
    }
}

function explode(x, y) {
    explosions.push({ x, y, r: 0, alpha: 1 });
}

function animateAtoms() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 0 || a.x > canvas.width) a.vx *= -1;
        if (a.y < 0 || a.y > canvas.height) a.vy *= -1;

        for (let j = i + 1; j < dots.length; j++) {
            const b = dots[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            if (Math.hypot(dx, dy) < a.r + b.r) {
                explode(a.x, a.y);
                a.x = Math.random() * canvas.width;
                a.y = Math.random() * canvas.height;
            }
        }

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    explosions.forEach((e, i) => {
        e.r += 2;
        e.alpha -= 0.05;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${e.alpha})`;
        ctx.stroke();
        if (e.alpha <= 0) explosions.splice(i, 1);
    });

    requestAnimationFrame(animateAtoms);
}

/* ===================== INIT ===================== */
window.addEventListener('resize', () => {
    initDots();
    centerTable();
});

initDots();
animateAtoms();
renderTable();