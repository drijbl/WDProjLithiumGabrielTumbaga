const REACTIONS = [
    { name: 'Pure Water', formula: 'H2O', elements: { H: 2, O: 1 }, heal: 20 },
    { name: 'Table Salt', formula: 'NaCl', elements: { Na: 1, Cl: 1 }, dmg: 25 },
    { name: 'Carbon Dioxide', formula: 'CO2', elements: { C: 1, O: 2 }, dmg: 30 },
    { name: 'Ferric Oxide', formula: 'Fe2O3', elements: { Fe: 2, O: 3 }, dmg: 45 },
    { name: 'Hydrochloric Acid', formula: 'HCl', elements: { H: 1, Cl: 1 }, dmg: 35 },
    { name: 'Magnesium Oxide', formula: 'MgO', elements: { Mg: 1, O: 1 }, dmg: 28 },
    { name: 'Copper Oxide', formula: 'CuO', elements: { Cu: 1, O: 1 }, dmg: 32 },
    { name: 'Sulfur Dioxide', formula: 'SO2', elements: { S: 1, O: 2 }, dmg: 35 },
    { name: 'Ammonia', formula: 'NH3', elements: { N: 1, H: 3 }, dmg: 30 },
    { name: 'Methane', formula: 'CH4', elements: { C: 1, H: 4 }, dmg: 40 },
    { name: 'Magnesium Chloride', formula: 'MgCl2', elements: { Mg: 1, Cl: 2 }, dmg: 38 },
    { name: 'Nitrogen Dioxide', formula: 'NO2', elements: { N: 1, O: 2 }, dmg: 42 },
    { name: 'Hydrogen Sulfide', formula: 'H2S', elements: { H: 2, S: 1 }, dmg: 35 },
    { name: 'Sulfuric Acid', formula: 'H2SO4', elements: { H: 2, S: 1, O: 4 }, dmg: 55 },
    { name: 'Nitric Acid', formula: 'HNO3', elements: { H: 1, N: 1, O: 3 }, dmg: 50 },
    { name: 'Acetic Acid', formula: 'C2H4O2', elements: { C: 2, H: 4, O: 2 }, dmg: 40 },
    { name: 'Sodium Acetate', formula: 'NaC2H3O2', elements: { Na: 1, C: 2, H: 3, O: 2 }, dmg: 52 },
    { name: 'Sodium Bicarbonate', formula: 'NaHCO3', elements: { Na: 1, H: 1, C: 1, O: 3 }, heal: 40 },
    { name: 'Iron Sulfide', formula: 'FeS', elements: { Fe: 1, S: 1 }, dmg: 30 },
    { name: 'Helium Shield', formula: 'He', elements: { He: 1 }, heal: 15 },
    { name: 'Neon Buffer', formula: 'Ne', elements: { Ne: 1 }, heal: 15 }
];

const ELEMENTS = [
    { s: 'C', n: 'Carbon' }, { s: 'Cl', n: 'Chlorine' }, { s: 'Cu', n: 'Copper' },
    { s: 'Fe', n: 'Iron' }, { s: 'H', n: 'Hydrogen' }, { s: 'Mg', n: 'Magnesium' },
    { s: 'N', n: 'Nitrogen' }, { s: 'Na', n: 'Sodium' }, { s: 'O', n: 'Oxygen' },
    { s: 'S', n: 'Sulfur' }, { s: 'He', n: 'Helium' }, { s: 'Ne', n: 'Neon' }
];

let pHP = 100, eHP = 100;
let selEls = [];
let selQuants = {};
let locked = false;

const grid = document.getElementById('element-grid');
const bLock = document.getElementById('btn-lock');
const bTrans = document.getElementById('btn-transmute');
const bCancel = document.getElementById('btn-cancel');
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const quantList = document.getElementById('quant-items');
const recList = document.getElementById('rec-list');
const fName = document.getElementById('formula-name');
const fTxt = document.getElementById('formula-txt');
const turnTxt = document.getElementById('turn-txt');
const stabTag = document.getElementById('stab-tag');
const synthBox = document.getElementById('synth-box');
const bFill = document.getElementById('beaker-fill');
const sTxt = document.getElementById('synth-text');
const vicScr = document.getElementById('vic-scr');
const defScr = document.getElementById('def-scr');
const btnRetryV = document.getElementById('btn-retry-v');
const btnRetryD = document.getElementById('btn-retry-d');

function init() {
    grid.innerHTML = '';
    ELEMENTS.forEach(el => {
        const d = document.createElement('div');
        d.className = 'el-btn';
        d.innerHTML = `<span class="sym">${el.s}</span><span class="name">${el.n}</span>`;
        d.onclick = () => {
            if (locked) return;
            const idx = selEls.indexOf(el.s);
            if (idx > -1) {
                selEls.splice(idx, 1);
                d.classList.remove('active');
            } else if (selEls.length < 5) {
                selEls.push(el.s);
                d.classList.add('active');
            }
            bLock.disabled = selEls.length === 0;
            bLock.className = selEls.length > 0 ? 'btn-main btn-ready' : 'btn-main btn-inactive';
            updatePreview(false);
        };
        grid.appendChild(d);
    });
}

function resetGame() {
    pHP = 100;
    eHP = 100;
    vicScr.style.display = 'none';
    defScr.style.display = 'none';
    recList.innerHTML = '<div style="color: #666; text-align: center; margin-top: 60px; font-family: \'Cinzel\', serif; font-size: 1.1rem; letter-spacing: 2px;">TOME IS EMPTY...</div>';
    updateHP();
    resetPhases();
}

btnRetryV.onclick = resetGame;
btnRetryD.onclick = resetGame;

bLock.onclick = () => {
    step1.style.display = 'none';
    step2.style.display = 'flex';
    renderQuants();
    updatePreview(false);
};

bCancel.onclick = () => {
    step1.style.display = 'block';
    step2.style.display = 'none';
    selQuants = {};
    updatePreview(false);
};

function renderQuants() {
    quantList.innerHTML = '';
    selEls.forEach(s => {
        if (!selQuants[s]) selQuants[s] = 1;
        const b = document.createElement('div');
        b.className = 'quant-box';
        b.innerHTML = `<div class="sym">${s}</div> <div class="quant-btns"> <button class="q-button q-sub" data-s="${s}">-</button> <div class="q-num" id="qc-${s}">${selQuants[s]}</div> <button class="q-button q-add" data-s="${s}">+</button> </div>`;
        quantList.appendChild(b);
    });

    quantList.querySelectorAll('.q-button').forEach(btn => {
        btn.onclick = () => {
            const s = btn.getAttribute('data-s');
            const d = btn.classList.contains('q-add') ? 1 : -1;
            selQuants[s] = Math.max(1, Math.min(5, (selQuants[s] || 1) + d));
            document.getElementById(`qc-${s}`).innerText = selQuants[s];
            updatePreview(false);
        };
    });
}

function updatePreview(transed, customReaction) {
    const m = customReaction || getMatch();
    if (transed) {
        if (m) {
            fName.innerText = m.name.toUpperCase();
            fName.style.color = '#fff';
            fTxt.innerText = m.formula || '';
            stabTag.style.display = 'block';
        } else {
            fName.innerText = "UNKNOWN RESULT";
            fName.style.color = '#ef4444';
            fTxt.innerText = "";
            stabTag.style.display = 'none';
        }
    } else {
        fName.innerText = "- SCANNING -";
        fName.style.color = '#fff';
        fTxt.innerText = "";
        stabTag.style.display = 'none';
    }
}

function getMatch() {
    return REACTIONS.find(r => {
        const rk = Object.keys(r.elements);
        if (rk.length !== selEls.length) return false;
        return rk.every(k => selQuants[k] === r.elements[k]);
    });
}

bTrans.onclick = async () => {
    if (locked) return;
    locked = true;

    const m = getMatch();
    await doSynthAnim(!!m);

    step1.style.display = 'block';
    step2.style.display = 'none';
    updatePreview(true);

    if (m) {
        if (m.dmg) {
            eHP = Math.max(0, eHP - m.dmg);
            addRec(`${m.name}. Dealt ${m.dmg} dmg.`, 'p');
            document.getElementById('p2-img').classList.add('shake');
        } else if (m.heal) {
            pHP = Math.min(100, pHP + m.heal);
            addRec(`${m.name}. Healed ${m.heal} HP.`, 'p');
        }
    } else {
        addRec(`FAILED! Transmutation failed.`, 'p');
    }

    updateHP();

    setTimeout(async () => {
        document.getElementById('p2-img').classList.remove('shake');
        if (eHP <= 0) {
            showEnd('victory');
        } else {
            await enemyTurn();
        }
    }, 1200);
};

async function doSynthAnim(ok) {
    synthBox.style.display = 'flex';
    sTxt.innerText = "SYNTHESIZING...";
    sTxt.style.color = "white";
    bFill.style.height = '0%';

    await new Promise(r => setTimeout(r, 400));
    
    // Animate beaker fill only
    bFill.style.height = '85%';

    await new Promise(r => setTimeout(r, 1500));

    sTxt.innerText = ok ? "SUCCESSFUL!" : "FAILED";
    sTxt.style.color = ok ? "#10b981" : "#ef4444";

    await new Promise(r => setTimeout(r, 1200));
    synthBox.style.display = 'none';
    bFill.style.height = '0%';
}

async function enemyTurn() {
    turnTxt.innerText = "ENEMY'S TURN";
    fName.innerText = "- PREPARING -";
    await new Promise(r => setTimeout(r, 800));

    const offensive = REACTIONS.filter(r => r.dmg);
    const chosen = offensive[Math.floor(Math.random() * offensive.length)];

    updatePreview(true, chosen);

    pHP = Math.max(0, pHP - chosen.dmg);
    addRec(`${chosen.name}. Dealt ${chosen.dmg} dmg.`, 'e');
    document.getElementById('p1-img').classList.add('shake');

    updateHP();

    setTimeout(() => {
        document.getElementById('p1-img').classList.remove('shake');
        if (pHP <= 0) {
            showEnd('defeat');
        } else {
            unlockNextTurn();
        }
    }, 1000);
}

function unlockNextTurn() {
    locked = false;
    selEls = [];
    selQuants = {};
    turnTxt.innerText = "YOUR TURN, ALCHEMIST";
    document.querySelectorAll('.el-btn').forEach(btn => btn.classList.remove('active'));
    bLock.disabled = true;
    bLock.className = 'btn-main btn-inactive';
}

function resetPhases() {
    locked = false;
    selEls = [];
    selQuants = {};
    turnTxt.innerText = "YOUR TURN, ALCHEMIST";
    step1.style.display = 'block';
    step2.style.display = 'none';
    updatePreview(false);
    init();
}

function updateHP() {
    document.getElementById('p1-bar').style.width = pHP + '%';
    document.getElementById('p1-hp-txt').innerText = `${pHP}/100`;
    document.getElementById('p2-bar').style.width = eHP + '%';
    document.getElementById('p2-hp-txt').innerText = `${eHP}/100`;
}

function addRec(msg, type) {
    if (recList.innerText.includes('TOME IS EMPTY')) recList.innerHTML = '';

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const d = document.createElement('div');
    d.className = `rec-card rec-${type}`;

    const label = type === 'p' ? 'YOU' : 'ENEMY';

    d.innerHTML = `
        <div class="rec-label">${label}</div>
        <div class="rec-msg">${msg}</div>
        <div class="rec-time">[${timeStr}]</div>
    `;

    // Insert at top
    recList.insertBefore(d, recList.firstChild);
    // Keep scroll at top to see the newest entry immediately
    recList.scrollTop = 0;
}

function showEnd(t) {
    if (t === 'victory') vicScr.style.display = 'flex';
    else defScr.style.display = 'flex';
}

init();