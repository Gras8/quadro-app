/* ============ dati iniziali (gen–lug 2026 BPER + PayPal fino al 3/8) ============ */
/* SEED_BPER: vedi data.js */
/* SEED_PP: vedi data.js */

/* ============ regole di categorizzazione (stesse dell'Excel) ============ */
const RULES = [
["RATA PRESTITO","Rata mutuo"],["GIACALONE","Casa: acquisto (una tantum)"],["COMPRAVENDITA","Casa: acquisto (una tantum)"],
["ONERI FINANZIAMENTO","Casa: oneri (una tantum)"],["SALVA MUTUO","Casa: oneri (una tantum)"],["TOMMASO DE LUCA","Casa: oneri (una tantum)"],
["GIULIA ASCIUTTO","Casa: oneri (una tantum)"],["ASSICURAZIONE CASA","Casa: oneri (una tantum)"],
["DIRECTA","Risparmio: Directa"],["SPOSTAMENTO CONTO DEPOSITO","Risparmio: Trade Republic"],
["FASTWEB","Internet/telefono"],["VODAFONE","Internet/telefono"],["AUSTRION","Polizza vita (chiusa)"],
["UNIPOLMOVE","Auto: telepass"],["PAYPAL","PayPal (senza dettaglio)"],
["ENI","Auto: carburante"],["TAMOIL","Auto: carburante"],["Q8","Auto: carburante"],["API IP","Auto: carburante"],
["AUTOMOBILE CLUB","Auto: bollo/ACI"],["MO.VER","Auto: parcheggi"],["EASYPARK","Auto: parcheggi"],["ICONTO-PAGOPA","Auto: parcheggi"],
["CONAD","Alimentari"],["ESSELUNGA","Alimentari"],["EUROSPIN","Alimentari"],["LIDL","Alimentari"],["PAGEMA","Alimentari"],
["GABRIELLI","Alimentari"],["MACELLERIA","Alimentari"],["SALUMIFICIO","Alimentari"],["IN'S","Alimentari"],
["MCDONALD","Ristoranti/bar"],["RISTORANTE","Ristoranti/bar"],["PIZZERIA","Ristoranti/bar"],["PIZZARDA","Ristoranti/bar"],
["GELATER","Ristoranti/bar"],["PASTICCERIA","Ristoranti/bar"],["BAR ","Ristoranti/bar"],["CAFFE","Ristoranti/bar"],
["POKE","Ristoranti/bar"],["KEBAB","Ristoranti/bar"],["TAVERNA","Ristoranti/bar"],["HOT POT","Ristoranti/bar"],
["ASUKA","Ristoranti/bar"],["BLUEFIN","Ristoranti/bar"],["SAPORI TOSCANA","Ristoranti/bar"],["HO SOGNATO","Ristoranti/bar"],
["MADAME SOPHIE","Ristoranti/bar"],["CANTINA","Ristoranti/bar"],["PORCA VACCA","Ristoranti/bar"],["IL POETA","Ristoranti/bar"],
["PETRIOLA","Ristoranti/bar"],["BATTIL'ORO","Ristoranti/bar"],["OCTOPUS","Ristoranti/bar"],["MIKI BAR","Ristoranti/bar"],
["TENNIS","Sport"],["PADEL","Sport"],["ASD ","Sport"],["CIRCOLO","Sport"],["SPORTIVA","Sport"],["PARDINI","Sport"],["CINIELLO","Personal trainer (rimborsato)"],
["FISIOTERAP","Salute"],["FARMACIA","Salute"],["DR MAX","Salute"],["SALUS","Salute"],["MEDICINA DELLO SPORT","Salute"],["STUDIO STROPPA","Salute"],
["OTTICA","Ottica/occhiali"],["OPTOMETRICO","Ottica/occhiali"],
["BEAUTY","Cura persona"],["HAIR","Cura persona"],["TANNING","Cura persona"],
["AMAZON","Shopping/Amazon"],["AMZN","Shopping/Amazon"],["ANTHROPIC","Abbonamenti"],["MONDADORI","Libri/cultura"],
["AMSTERDAM","Viaggi"],["SCHIPHOL","Viaggi"],["OVPAY","Viaggi"],["BUNKHOTEL","Viaggi"],["PURMEREND","Viaggi"],
["ALBERT HEIJN","Viaggi"],["BCK*","Viaggi"],["SAN GIULIANO","Viaggi"],
["LENZONI","Trasferimenti amici"],["BARTILOTTA","Trasferimenti amici"],["VISSANI","Trasferimenti amici"],["SCHIPILLITI","Trasferimenti amici"],
["PRELIEV","Prelievi contanti"],["AFFITTO","Affitto (chiuso)"],["EMOLUMENTI","Entrata: stipendio"],["SALUTISSIMA","Entrata: rimborsi sanitari"],["ARCA RISPARMIO","Entrata: straordinaria"],["INFRUTTIFERO","Entrata: straordinaria"]
];
const SPESA_CATS_BASE = ["Rata mutuo","Bollette","Internet/telefono","Alimentari","Ristoranti/bar","Auto: carburante","Auto: telepass","Auto: parcheggi","Auto: bollo/ACI","Assicurazione auto","Sport","Salute","Cura persona","Shopping/Amazon","Abbonamenti","PayPal (senza dettaglio)","Libri/cultura","Trasferimenti amici","Viaggi","Ottica/occhiali","Prelievi contanti","Affitto (chiuso)","Abbigliamento","Personal trainer (rimborsato)","Polizza vita (chiusa)","Altro"];
const EXTRA_CATS = ["Casa: acquisto (una tantum)","Casa: oneri (una tantum)"];
const SAVE_CATS = ["Risparmio: Trade Republic","Risparmio: Directa"];
const IN_CATS = ["Entrata: stipendio","Entrata: rimborsi sanitari","Entrata: straordinaria","Entrata: altro"];
const spesaCats = () => [...SPESA_CATS_BASE, ...((typeof S!=='undefined'&&S&&S.customCats)||[])];
const allCats = () => [...spesaCats(), ...EXTRA_CATS, ...SAVE_CATS, ...IN_CATS];
const DEFAULT_BUDGET = {"Rata mutuo":645,"Bollette":120,"Internet/telefono":25,"Alimentari":165,"Ristoranti/bar":150,"Auto: carburante":100,"Auto: telepass":40,"Auto: parcheggi":6,"Auto: bollo/ACI":0,"Assicurazione auto":0,"Sport":90,"Salute":55,"Cura persona":30,"Shopping/Amazon":30,"Abbonamenti":45,"PayPal (senza dettaglio)":0,"Libri/cultura":10,"Trasferimenti amici":50,"Viaggi":50,"Ottica/occhiali":0,"Prelievi contanti":0,"Affitto (chiuso)":0,"Abbigliamento":0,"Personal trainer (rimborsato)":0,"Polizza vita (chiusa)":0,"Altro":20};
const MESI = ["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"];

/* ============ stato ============ */
let S = null; // {bper:[], pp:[], overrides:{}, budget:{}, cushion:{tr,cc,soglia,goal}}
const fmt = n => n.toLocaleString('it-IT',{minimumFractionDigits:0,maximumFractionDigits:0})+"\u00a0€";
const fmt2 = n => n.toLocaleString('it-IT',{minimumFractionDigits:2,maximumFractionDigits:2});
const normDesc = x => x.toUpperCase()
  .replace(/^PAGAMENTO SU CIRCUITO INTERNAZIONALE\s*/,'')
  .replace(/^PAGAMENTO CIRC\. BANCOMAT\s*/,'')
  .replace(/\s+/g,' ').trim();
const txid = t => { const p=t.d.split('/'); return parseInt(p[0],10)+"/"+p[1]+"|"+t.s+"|"+t.a.toFixed(2)+"|"+normDesc(t.x).slice(0,25); };
const monthOf = d => { const p=d.split('/'); return parseInt(p[1],10); };

const PP_RULES=[["NESPRESSO","Alimentari"],["PROZIS","Alimentari"],["SPOTIFY","Abbonamenti"],
["MISTER TENNIS","Sport"],["ADIDAS","Abbigliamento"],["THEORY","Sport"],["TELECOM","Internet/telefono"],
["EASYPARK","Auto: parcheggi"],["TOURS AND TICKETS","Viaggi"],["SAVE THE CHILDREN","Trasferimenti amici"],
["SUBITO","Entrata: altro"],["EVOX","Altro"]];
const ppMonth = p => parseInt(p.d.split('/')[1],10);
const pp2026 = p => p.d.split('/')[2]==='2026';
const ppSkip = p => p.t==='Bonifico bancario sul conto PayPal' || p.t==='Pagamento con credito acquirenti PayPal' || (p.t||'').indexOf('Trasferimento avviato')===0 || (p.n||'').indexOf('PayPal (Europe)')===0;
function categorizePP(p){
  if(S.ppOv && S.ppOv[p.id]) return S.ppOv[p.id];
  const T=((p.n||'')+' '+(p.m||'')).toUpperCase();
  const u = matchUserRules(T, p.g<0?'D':'A'); if(u) return u;
  for(const [kw,c] of PP_RULES){ if(T.includes(kw)) return c; }
  const persona = p.n && p.n.split(' ').length<=3 && /^[a-zà-ú' .]+$/i.test(p.n) && !/(S\.?R\.?L|S\.?P\.?A|LTD|LIMITED|B\.V|GMBH|\.COM|INC|SCA|SPA|SRL)/i.test(p.n);
  if(p.g<0) return (p.t==='Denaro inviato'||p.t==='Rimborso inviato'||persona) ? 'Trasferimenti amici' : 'Shopping/Amazon';
  return 'Entrata: altro';
}
function matchUserRules(T, sign){
  for(const [kw,cat] of (S.userRules||[])){
    if(!T.includes(kw)) continue;
    const isIn = cat.indexOf('Entrata')===0;
    if(sign==='A' ? isIn : !isIn) return cat;
  }
  return null;
}
function categorize(t){
  const o = S.overrides[txid(t)];
  if(o) return o;
  const D = t.x.toUpperCase();
  const u = matchUserRules(D, t.s); if(u) return u;
  if(t.s==="A"){
    if(D.includes("PAYPAL")) return "Giroconto interno"; // travaso dal saldo PayPal: non e' un'entrata
    for(const [kw,cat] of RULES){ if(D.includes(kw) && cat.indexOf("Entrata")===0) return cat; }
    if(D.includes("AUSTRION")) return "Entrata: straordinaria"; // riscatto polizza
    return "Entrata: altro";
  }
  if(D.includes("OTTICA")||D.includes("OPTOMETRICO")) return t.a>=100 ? "Ottica/occhiali" : "Salute"; // lenti a contatto vs occhiali
  for(const [kw,cat] of RULES){ if(D.includes(kw) && cat.indexOf("Entrata")!==0) return cat; }
  return "Altro";
}

/* ============ storage ============ */
const store = {
  where: (window.storage && window.storage.set) ? 'claude' : 'browser',
  async get(k){
    if(this.where==='claude'){ try{ const r=await window.storage.get(k); return r&&r.value?r.value:null; }catch(e){ return null; } }
    try{ return localStorage.getItem(k); }catch(e){ return null; }
  },
  async set(k,v){
    if(this.where==='claude'){ await window.storage.set(k,v); return; }
    localStorage.setItem(k,v);
  }
};
let fileHandle = null;

/* ---- ricorda il file collegato tra sessioni (handle in IndexedDB) ---- */
const HDB = {
  db(){ return new Promise((res,rej)=>{ const r=indexedDB.open('quadro-handle',1);
    r.onupgradeneeded=()=>r.result.createObjectStore('h'); r.onsuccess=()=>res(r.result); r.onerror=()=>rej(r.error); }); },
  async set(v){ try{ const db=await this.db(); return new Promise(res=>{ const tx=db.transaction('h','readwrite'); tx.objectStore('h').put(v,'file'); tx.oncomplete=()=>res(true); tx.onerror=()=>res(false); }); }catch(e){ return false; } },
  async get(){ try{ const db=await this.db(); return new Promise(res=>{ const tx=db.transaction('h','readonly'); const rq=tx.objectStore('h').get('file'); rq.onsuccess=()=>res(rq.result||null); rq.onerror=()=>res(null); }); }catch(e){ return null; } },
  async clear(){ try{ const db=await this.db(); return new Promise(res=>{ const tx=db.transaction('h','readwrite'); tx.objectStore('h').delete('file'); tx.oncomplete=()=>res(true); tx.onerror=()=>res(false); }); }catch(e){ return false; } }
};
async function ensurePerm(handle, write){
  const opts={mode: write?'readwrite':'read'};
  if(await handle.queryPermission(opts)==='granted') return true;
  if(await handle.requestPermission(opts)==='granted') return true;
  return false;
}
async function readHandleData(handle){
  const f = await handle.getFile();
  if(f.size < 2) return null;
  const j = JSON.parse(await f.text());
  if(!j.bper || !j.cushion) return null;
  return j;
}
async function writeBackupFile(){
  if(!fileHandle) return false;
  try{
    const w = await fileHandle.createWritable();
    await w.write(JSON.stringify(S,null,1));
    await w.close();
    return true;
  }catch(e){
    document.getElementById('linkstate').textContent = "\u26a0 scrittura file fallita: ricollega";
    fileHandle = null;
    return false;
  }
}
async function linkBackup(){
  if(!window.showSaveFilePicker){
    log("Il collegamento diretto al file funziona solo su Chrome o Edge (aprendo l'app dal PC). Su questo browser usa Scarica/Carica backup.", true);
    return;
  }
  try{
    const hnd = await window.showSaveFilePicker({
      suggestedName: 'quadro-backup.json',
      types: [{description:'Backup Quadro', accept:{'application/json':['.json']}}]
    });
    // se il file scelto contiene gia' un backup valido, offro di caricarlo
    try{
      const f = await hnd.getFile();
      if(f.size > 2){
        const j = JSON.parse(await f.text());
        if(j.bper && j.cushion){
          const usa = confirm("Il file contiene un backup con "+j.bper.length+" movimenti.\nOK = carica quei dati nell'app\nAnnulla = sovrascrivi il file con i dati attuali");
          if(usa){ S = j; renderAll(); }
        }
      }
    }catch(e){ /* file nuovo o non leggibile: si sovrascrive */ }
    fileHandle = hnd;
    await HDB.set(hnd);
    await writeBackupFile();
    document.getElementById('linkstate').textContent = "\u2713 collegato: "+hnd.name+" \u2014 e' la tua fonte dati (si apre e salva da qui)";
    scheduleSave();
  }catch(e){ /* utente ha annullato il picker */ }
}
let saveTimer=null;
const setSaveMsg = m => document.getElementById('savestate').textContent = m;
async function doSave(attempt){
  try{
    await store.set('quadro-v1', JSON.stringify(S));
    const wrote = await writeBackupFile();
    setSaveMsg("\u2713 salvato"+(store.where==='browser'?" (browser":"")+(wrote?(store.where==='browser'?" + file)":" (+ file)"):(store.where==='browser'?")":""))+" "+new Date().toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'}));
  }catch(e){
    if(attempt<3){
      setSaveMsg("riprovo il salvataggio\u2026 ("+(attempt+1)+"/3)");
      setTimeout(()=>doSave(attempt+1), 1500*(attempt+1));
    }else{
      setSaveMsg("\u26a0 salvataggio non riuscito: "+((e&&e.message)||e||"errore sconosciuto"));
    }
  }
}
function scheduleSave(){
  setSaveMsg("salvataggio\u2026");
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>doSave(0),800);
}
async function saveNow(){
  const payload = JSON.stringify(S);
  let ok=false;
  try{ await store.set('quadro-v1', payload); ok=true; }catch(e){ ok=false; }
  const wrote = await writeBackupFile();
  setSaveMsg((ok||wrote ? "\u2713 salvato" : "\u26a0 non salvato")+(store.where==='browser'?" (browser)":"")+(wrote?" +file":"")+" "+new Date().toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'}));
  return ok||wrote;
}
async function applyBackup(j){
  if(!j || !j.bper || !j.cushion) throw new Error('non sembra un backup del Quadro');
  S = j;
  S.overrides=S.overrides||{}; S.ppOv=S.ppOv||{}; S.userRules=S.userRules||[];
  S.customCats=S.customCats||[]; S.cash=S.cash||[]; S.budget=S.budget||{...DEFAULT_BUDGET};
  renderAll();
  await saveNow();   // scrittura IMMEDIATA, così al reload non torna indietro
}

async function loadState(){
  try{
    const v = await store.get('quadro-v1');
    if(v){ S = JSON.parse(v); S.ppOv=S.ppOv||{}; S.userRules=S.userRules||[]; S.customCats=S.customCats||[]; S.cash=S.cash||[]; return; }
  }catch(e){ /* chiave assente o corrotta: primo avvio */ }
  S = {bper:SEED_BPER.slice(), pp:SEED_PP.slice(), overrides:{}, ppOv:{}, userRules:[], customCats:[], cash:[], budget:{...DEFAULT_BUDGET}, cushion:{tr:200, cc:12323, imp:10500, soglia:1800, goal:6000}};
  scheduleSave();
}

/* ============ import file ============ */
const log = (msg, err) => { const el=document.getElementById('importlog'); el.innerHTML += (err?'<span class="err">':'')+msg+(err?'</span>':'')+"\n"; };

async function handleFiles(files){
  document.getElementById('importlog').innerHTML="";
  for(const f of files){
    try{
      if(f.name.toLowerCase().endsWith('.pdf')) await importBperPdf(f);
      else if(f.name.toLowerCase().endsWith('.csv')) await importCsv(f);
      else if(/\.xlsx?$/i.test(f.name)) await importBperXls(f);
      else log("Formato non riconosciuto: "+f.name, true);
    }catch(e){ log("Errore su "+f.name+": "+e.message, true); }
  }
  renderAll(); scheduleSave();
}

const TR_RX = /SPOSTAMENTO CONTO DEPOSITO|TRADE REPUBLIC/i;
function trackTR(t){
  if(!TR_RX.test(t.x)) return 0;
  if(t.s==='D'){ S.cushion.tr=(S.cushion.tr||0)+t.a; return t.a; }
  S.cushion.tr=Math.max(0,(S.cushion.tr||0)-t.a); return -t.a;
}
async function importBperXls(file){
  if(!window.XLSX){ log("Libreria fogli di calcolo non caricata: riprova tra qualche secondo.", true); return; }
  const MESI_IT = {gennaio:1,febbraio:2,marzo:3,aprile:4,maggio:5,giugno:6,luglio:7,agosto:8,settembre:9,ottobre:10,novembre:11,dicembre:12};
  const buf = await file.arrayBuffer();
  const wbk = XLSX.read(buf, {type:'array'});
  const sh = wbk.Sheets[wbk.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sh, {header:1, raw:true, defval:''});
  // trovo la riga di intestazione "Data operazione"
  // saldo disponibile: si aggiorna da solo
  for(const r of rows){
    const i = r.findIndex(c => String(c).trim()==='Saldo disponibile');
    if(i>=0){
      for(let j=i+1;j<r.length;j++){
        const v = String(r[j]).replace(/[€\s]/g,'');
        if(v){ const n = parseFloat(v.replace(/\./g,'').replace(',','.'));
          if(!isNaN(n)){ S.cushion.cc = Math.round(n); log("Saldo conto aggiornato dal file: "+n.toLocaleString('it-IT',{minimumFractionDigits:2})+" \u20ac"); }
          break; }
      }
      break;
    }
  }
  let hi = rows.findIndex(r => r.some(c => String(c).trim()==='Data operazione'));
  if(hi<0){ log(file.name+": non trovo la tabella movimenti (serve l'export Lista Movimenti di BPER).", true); return; }
  const head = rows[hi].map(c=>String(c).trim());
  const col = n => head.indexOf(n);
  const cD=col('Data operazione'), cX=col('Descrizione'), cE=col('Entrate'), cU=col('Uscite');
  const toNum = v => { if(v===''||v==null) return 0; if(typeof v==='number') return v; return parseFloat(String(v).replace(/\./g,'').replace(',','.'))||0; };
  const toDate = v => {
    const s = String(v).trim().toLowerCase();
    const m = s.match(/^(\d{1,2})\s+([a-zà]+)\s+(\d{4})$/);
    if(m && MESI_IT[m[2]]) return parseInt(m[1],10)+"/"+String(MESI_IT[m[2]]).padStart(2,'0')+"/"+m[3].slice(2);
    return null;
  };
  const known = new Set(S.bper.map(txid));
  let found=0, added=0, trTot=0;
  for(const r of rows.slice(hi+1)){
    const d = toDate(r[cD]); if(!d) continue;
    const inc = toNum(r[cE]), out = toNum(r[cU]);
    const x = String(r[cX]||'').replace(/\s+/g,' ').trim().slice(0,120);
    if(!x || (inc===0 && out===0)) continue;
    found++;
    const t = inc>0 ? {d, s:'A', a:Math.abs(inc), x} : {d, s:'D', a:Math.abs(out), x};
    const k = txid(t);
    if(!known.has(k)){ S.bper.push(t); known.add(k); added++; trTot+=trackTR(t); }
  }
  log(file.name+": trovati "+found+" movimenti, aggiunti "+added+" nuovi ("+(found-added)+" doppioni scartati).");
  if(trTot!==0) log("Bonifici Trade Republic rilevati: "+(trTot>0?"+":"")+trTot.toLocaleString('it-IT')+" \u20ac \u2192 saldo TR aggiornato a "+(S.cushion.tr||0).toLocaleString('it-IT')+" \u20ac");
}

async function importBperPdf(file){
  if(!window.pdfjsLib){ log("Libreria PDF non caricata: riprova tra qualche secondo.", true); return; }
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({data:buf}).promise;
  let lines=[];
  for(let p=1;p<=pdf.numPages;p++){
    const page = await pdf.getPage(p);
    const tc = await page.getTextContent();
    const byY = {};
    for(const it of tc.items){
      const y = Math.round(it.transform[5]/3)*3;
      (byY[y]=byY[y]||[]).push({x:it.transform[4], s:it.str});
    }
    const ys = Object.keys(byY).map(Number).sort((a,b)=>b-a);
    for(const y of ys){
      const line = byY[y].sort((a,b)=>a.x-b.x).map(o=>o.s).join(" ");
      lines.push(line);
    }
  }
  const rx = /^\s*(\d{1,2}\/\d{2}\/26)\s+([DA])\s+([\d\.]+,\d{2})\s+(\d{1,2}\/\d{2}\/2[56])\s+(.*)$/;
  const skip = /^(DATA|Mod\.|OPERAZIONI|RIEPILOGO|DEL CONTO|PRESSO|FOGLIO|ABI|IBAN|PAESE|CIN|IT\s|GRASSELLI|VIA PIETRO|62024|05387|BPER|BIC)/;
  let cur=null, parsed=[];
  const push=()=>{ if(cur) parsed.push(cur); cur=null; };
  for(const ln of lines){
    const m = ln.match(rx);
    if(m){
      push();
      cur = {d:m[1], s:m[2], a:parseFloat(m[3].replace(/\./g,'').replace(',','.')), x:m[5].trim().slice(0,120)};
    } else if(cur && ln.trim() && !skip.test(ln.trim())){
      cur.x = (cur.x+" "+ln.trim()).slice(0,120);
    }
  }
  push();
  const known = new Set(S.bper.map(txid));
  let added=0, trTot=0;
  for(const t of parsed){ const k=txid(t); if(!known.has(k)){ S.bper.push(t); known.add(k); added++; trTot+=trackTR(t); } }
  log(file.name+": trovati "+parsed.length+" movimenti, aggiunti "+added+" nuovi ("+(parsed.length-added)+" doppioni scartati).");
  if(trTot!==0) log("Bonifici Trade Republic rilevati: "+(trTot>0?"+":"")+trTot.toLocaleString('it-IT')+" \u20ac \u2192 saldo TR aggiornato a "+(S.cushion.tr||0).toLocaleString('it-IT')+" \u20ac");
}

function parseCsvText(text){
  const rows=[]; let row=[], cell='', q=false;
  for(let i=0;i<text.length;i++){
    const c=text[i];
    if(q){ if(c==='"'){ if(text[i+1]==='"'){cell+='"';i++;} else q=false; } else cell+=c; }
    else{ if(c==='"') q=true; else if(c===','){ row.push(cell); cell=''; } else if(c==='\n'||c==='\r'){ if(cell!==''||row.length){row.push(cell);rows.push(row);row=[];cell='';} } else cell+=c; }
  }
  if(cell!==''||row.length){row.push(cell);rows.push(row);}
  return rows;
}
async function importCsv(file){
  const text = (await file.text()).replace(/^\uFEFF/,'');
  const rows = parseCsvText(text);
  const head = rows[0];
  const idx = n => head.findIndex(h=>h.trim()===n);
  if(idx('Tipo')<0 || idx('Lordo')<0){ log(file.name+": non sembra il Download.CSV di PayPal (uso solo quel formato).", true); return; }
  const iD=idx('Data'), iN=idx('Nome'), iT=idx('Tipo'), iL=idx('Lordo'), iC=idx('Codice transazione'), iO=idx('Titolo oggetto')>=0?idx('Titolo oggetto'):idx('Oggetto'), iM=idx('Messaggio');
  const known = new Set(S.pp.map(p=>p.id));
  let added=0, tot=0;
  for(const r of rows.slice(1)){
    if(r.length<head.length-2) continue;
    const tipo = (r[iT]||'').trim();
    if(tipo==='Autorizzazione generica') continue;
    tot++;
    const id=(r[iC]||'').trim();
    if(id && known.has(id)) continue;
    S.pp.push({d:(r[iD]||'').trim(), n:(r[iN]||'').trim(), t:tipo,
      g:parseFloat((r[iL]||'0').replace(/\./g,'').replace(',','.')),
      m:(((iO>=0?r[iO]:'')||'')+' '+((iM>=0?r[iM]:'')||'')).trim().slice(0,80), id});
    known.add(id); added++;
  }
  log(file.name+": "+tot+" movimenti PayPal, aggiunti "+added+" nuovi.");
}

/* ============ render ============ */
function ppCoveredMonths(){
  const cov = new Set();
  for(const p of S.pp){ if(pp2026(p)) cov.add(ppMonth(p)); }
  return cov;
}
function computeMatrix(){
  const M = {}; // cat -> [12]
  for(const c of allCats()) M[c]=Array(12).fill(0);
  const cov = ppCoveredMonths();
  for(const t of S.bper){
    const c = categorize(t), m = monthOf(t.d)-1;
    if(m<0||m>11) continue;
    if(c==='PayPal (senza dettaglio)' && cov.has(m+1)) continue; // provvista: il dettaglio c'e'
    if(!(c in M)) M[c]=Array(12).fill(0);
    M[c][m]+=t.a;
  }
  for(const x of (S.cash||[])){
    const spesa = x.m-1, pool = ((x.mp||x.m))-1;
    if(spesa<0||spesa>11||pool<0||pool>11) continue;
    if(!(x.c in M)) M[x.c]=Array(12).fill(0);
    M[x.c][spesa]+=x.a;
    M['Prelievi contanti'][pool]-=x.a;
  }
  for(const p of S.pp){
    if(!pp2026(p) || ppSkip(p)) continue;
    const m = ppMonth(p)-1; if(m<0||m>11) continue;
    const c = categorizePP(p);
    if(!(c in M)) M[c]=Array(12).fill(0);
    if(p.g<0) M[c][m]+=(-p.g);
    else if(IN_CATS.includes(c)) M[c][m]+=p.g;
    else M[c][m]-=p.g; // rimborso da negozio: compensa la categoria
  }
  return M;
}
function renderMatrix(){
  const M = computeMatrix();
  const monthsWithData = Array(12).fill(false);
  for(const t of S.bper){ const m=monthOf(t.d)-1; if(m>=0&&m<12) monthsWithData[m]=true; }
  let h = "<tr><th>Categoria</th><th>Budget</th>"+MESI.map(m=>"<th>"+m+"</th>").join("")+"</tr>";
  for(const c of spesaCats()){
    const b = S.budget[c] ?? 0;
    h += "<tr><td>"+c+"</td><td class='bud'><input data-cat=\""+c+"\" value=\""+b+"\" inputmode='numeric' aria-label='Budget "+c+"'></td>";
    for(let m=0;m<12;m++){
      const v = M[c]?M[c][m]:0;
      let cls="cell", txt;
      if(!monthsWithData[m] || v===0){ txt="<span class='dash'>–</span>"; }
      else if(b<=0){ txt = fmt2(v); cls += " dim"; }
      else { txt = fmt2(v); cls += (v>b+0.001) ? " bad" : " ok"; }
      h += "<td class='"+cls+"' data-cat=\""+c+"\" data-m='"+m+"'>"+txt+"</td>";
    }
    h += "</tr>";
  }
  // totale vita
  h += "<tr class='tot'><td>TOTALE USCITE VITA</td><td class='bud'>"+fmt2(spesaCats().reduce((s,c)=>s+(S.budget[c]||0),0))+"</td>";
  const totRow=[], inRow=[], savRow=[];
  for(let m=0;m<12;m++){
    let tot=0; for(const c of spesaCats()) tot += M[c]?M[c][m]:0;
    totRow.push(tot);
    let inc=0; for(const c of IN_CATS) inc += M[c]?M[c][m]:0;
    inRow.push(inc);
    let sv=0; for(const c of SAVE_CATS) sv += M[c]?M[c][m]:0;
    savRow.push(sv);
    h += "<td>"+(monthsWithData[m]?fmt2(totRow[m]):"<span class='dash'>–</span>")+"</td>";
  }
  h += "</tr>";
  h += "<tr><td>Risparmio (TR + Directa)</td><td></td>"+savRow.map((v,m)=>"<td>"+(monthsWithData[m]&&v?fmt2(v):"<span class='dash'>–</span>")+"</td>").join("")+"</tr>";
  h += "<tr><td>Entrate</td><td></td>"+inRow.map((v,m)=>"<td>"+(monthsWithData[m]&&v?fmt2(v):"<span class='dash'>–</span>")+"</td>").join("")+"</tr>";
  h += "<tr class='saldo'><td>Saldo mese (dopo risparmi)</td><td></td>";
  for(let m=0;m<12;m++){
    if(!monthsWithData[m]){ h+="<td><span class='dash'>–</span></td>"; continue; }
    let extra=0; for(const c of EXTRA_CATS) extra += M[c]?M[c][m]:0;
    const s = inRow[m]-totRow[m]-savRow[m]-extra;
    h += "<td class='"+(s<0?'neg':'pos')+"'>"+fmt2(s)+"</td>";
  }
  h += "</tr>";
  document.getElementById('matrix').innerHTML=h;
  document.querySelectorAll('#matrix td.bud input').forEach(inp=>{
    inp.addEventListener('change',()=>{ S.budget[inp.dataset.cat]=parseFloat(inp.value)||0; renderMatrix(); renderYear(); scheduleSave(); });
  });
  document.querySelectorAll('#matrix td.cell').forEach(td=>{
    td.addEventListener('click',()=>renderDetail(td.dataset.cat, parseInt(td.dataset.m,10)));
  });
}
function renderDetail(cat, m){
  const cov = ppCoveredMonths();
  const list = S.bper.filter(t=>{
    if(categorize(t)!==cat || monthOf(t.d)-1!==m) return false;
    if(cat==='PayPal (senza dettaglio)' && cov.has(m+1)) return false;
    return true;
  });
  const ppList = S.pp.filter(p=>pp2026(p) && !ppSkip(p) && ppMonth(p)-1===m && categorizePP(p)===cat);
  const cashList = (S.cash||[]).filter(x=>x.m-1===m && x.c===cat);
  const el = document.getElementById('detail');
  el.className='open';
  const tot = list.reduce((s,t)=>s+t.a,0) + ppList.reduce((s,p)=>s+(p.g<0?-p.g:(IN_CATS.includes(cat)?p.g:-p.g)),0) + cashList.reduce((s,x)=>s+x.a,0);
  let h = "<h3>"+cat+" — "+MESI[m]+" · "+(list.length+ppList.length)+" movimenti · "+fmt2(tot)+" €</h3>";
  const opts = sel => [...allCats(),'\u2795 Nuova categoria\u2026'].map(c=>"<option"+(c===sel?" selected":"")+">"+c+"</option>").join("");
  for(const t of list){
    h += "<div class='txrow'><span class='d'>"+t.d+"</span><span class='a'>"+fmt2(t.a)+"</span><span class='x' title=\""+t.x.replace(/"/g,'&quot;')+"\">"+t.x+"</span><select data-src='b' data-id=\""+txid(t).replace(/"/g,'&quot;')+"\" aria-label='Cambia categoria'>"+opts(cat)+"</select><button class='btn btn-rule' data-mkrule='b'>regola</button></div>";
  }
  for(const p of ppList){
    const label = (p.n||p.t)+(p.m?" · "+p.m:"");
    h += "<div class='txrow'><span class='d'>"+p.d.split('/').slice(0,2).join('/')+"</span><span class='a'>"+fmt2(Math.abs(p.g))+"</span><span class='x' title=\""+label.replace(/"/g,'&quot;')+"\">\ud83c\udd7f\ufe0f "+label+"</span><select data-src='p' data-id=\""+p.id+"\" aria-label='Cambia categoria'>"+opts(cat)+"</select><button class='btn btn-rule' data-mkrule='p'>regola</button></div>";
  }
  for(const x of cashList){
    h += "<div class='txrow'><span class='d'>contanti</span><span class='a'>"+fmt2(x.a)+"</span><span class='x'>\ud83d\udcb6 "+(x.n||'spesa in contanti')+((x.mp&&x.mp!==x.m)?" (prelievo di "+MESI[x.mp-1]+")":"")+"</span><a href='#' data-delcash='"+x.id+"' style='color:var(--clay);text-decoration:none;font-size:15px' aria-label='Elimina'>\u2715</a></div>";
  }
  if(cat==='Prelievi contanti'){
    const pool = list.reduce((s,t)=>s+(t.s==='D'?t.a:0),0);
    const allocMese = (S.cash||[]).filter(x=>((x.mp||x.m))-1===m).reduce((s,x)=>s+x.a,0);
    const residuo = pool - allocMese;
    h += "<div style='margin-top:12px;padding:10px;border:1.5px solid var(--brass);border-radius:8px;background:#FBF6EA'>";
    h += "<div style='font-family:var(--mono);font-size:13px;margin-bottom:8px'>Fondo cassa "+MESI[m]+": prelevati "+fmt2(pool)+" \u00b7 attribuiti "+fmt2(allocMese)+" \u00b7 <b>da attribuire "+fmt2(residuo)+"</b></div>";
    h += "<div style='display:flex;gap:8px;flex-wrap:wrap;align-items:center'>";
    h += "<input id='cash-a' type='number' step='0.5' min='0' placeholder='importo' style='width:90px;font-family:var(--mono);padding:5px;border:1px solid var(--line);border-radius:5px'>";
    h += "<select id='cash-c' style='font-size:12px;padding:5px;border:1px solid var(--line);border-radius:5px'>"+spesaCats().filter(c=>c!=='Prelievi contanti').map(c=>"<option>"+c+"</option>").join("")+"</select>";
    h += "<label style='font-size:11.5px;color:var(--mist)'>speso a</label><select id='cash-m' style='font-size:12px;padding:5px;border:1px solid var(--line);border-radius:5px'>"+MESI.map((nm,i)=>"<option value='"+(i+1)+"'"+(i===m?" selected":"")+">"+nm+"</option>").join("")+"</select>";
    h += "<input id='cash-n' type='text' placeholder='nota (es. affitto, mercato)' style='flex:1;min-width:140px;padding:5px;border:1px solid var(--line);border-radius:5px'>";
    h += "<button class='btn' id='cash-add' style='padding:5px 12px'>Assegna</button></div></div>";
  }
  el.innerHTML=h;
  const addBtn = el.querySelector('#cash-add');
  if(addBtn) addBtn.addEventListener('click',()=>{
    const a = parseFloat(el.querySelector('#cash-a').value)||0;
    if(a<=0) return;
    S.cash = S.cash||[];
    S.cash.push({id: Date.now()+"-"+Math.random().toString(36).slice(2,7), m: parseInt(el.querySelector('#cash-m').value,10), mp: m+1, a, c: el.querySelector('#cash-c').value, n: el.querySelector('#cash-n').value.trim()});
    renderMatrix(); renderYear(); renderDetail(cat,m); scheduleSave();
  });
  el.querySelectorAll('a[data-delcash]').forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault();
    S.cash = (S.cash||[]).filter(x=>x.id!==a.dataset.delcash);
    renderMatrix(); renderYear(); renderDetail(cat,m); scheduleSave();
  }));
  el.querySelectorAll('select').forEach(sel=>{
    if(sel.id==='cash-c') return;
    sel.addEventListener('change',()=>{
      let val = sel.value;
      if(val.indexOf('Nuova categoria')>=0){
        const nome = (prompt("Nome della nuova categoria:")||'').trim();
        if(!nome){ renderDetail(cat,m); return; }
        S.customCats = S.customCats||[];
        if(!S.customCats.includes(nome) && !allCats().includes(nome)) S.customCats.push(nome);
        if(!(nome in S.budget)) S.budget[nome]=0;
        val = nome;
      }
      if(sel.dataset.src==='p'){ S.ppOv = S.ppOv||{}; S.ppOv[sel.dataset.id]=val; }
      else S.overrides[sel.dataset.id]=val;
      renderMatrix(); renderYear(); renderDetail(cat,m); scheduleSave();
    });
  });
  el.querySelectorAll('button[data-mkrule]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const row = btn.parentElement;
      const sel = row.querySelector('select');
      const descEl = row.querySelector('.x');
      const base = (descEl ? descEl.textContent : '').replace('\ud83c\udd7f\ufe0f','').trim();
      const sugg = base.split(' ').slice(0,3).join(' ').toUpperCase();
      const kw = (prompt("Parola chiave della regola (se compare nella descrizione, assegna sempre \""+sel.value+"\"):", sugg)||'').trim().toUpperCase();
      if(!kw) return;
      S.userRules = S.userRules||[];
      S.userRules.unshift([kw, sel.value]);
      renderMatrix(); renderUserRules(); renderDetail(cat,m); scheduleSave();
    });
  });
  el.scrollIntoView({behavior:'smooth', block:'nearest'});
}
function renderUserRules(){
  const el = document.getElementById('userrules');
  const rs = S.userRules||[];
  if(!rs.length){ el.innerHTML=""; return; }
  el.innerHTML = "<span style='font-size:12px;color:var(--mist)'>Regole personali (hanno la precedenza): </span>"+
    rs.map((r,i)=>"<span style='display:inline-block;margin:2px 4px;padding:2px 8px;border:1px solid var(--line);border-radius:12px;font-size:12px;font-family:var(--mono)'>"+r[0]+" \u2192 "+r[1]+" <a href='#' data-delrule='"+i+"' style='color:var(--clay);text-decoration:none' aria-label='Elimina regola'>\u2715</a></span>").join("");
  el.querySelectorAll('a[data-delrule]').forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault(); S.userRules.splice(parseInt(a.dataset.delrule,10),1);
    renderMatrix(); renderUserRules(); scheduleSave();
  }));
}
function renderCushion(){
  const c=S.cushion;
  const netto = (c.tr||0) + Math.max(0,(c.cc||0)-(c.imp||0)-(c.soglia||0));
  const pct = Math.min(1, netto/(c.goal||6000));
  document.getElementById('n-netto').textContent=fmt(netto);
  document.getElementById('n-pct').textContent=Math.round(pct*100)+"%";
  document.getElementById('n-manca').textContent=fmt(Math.max(0,(c.goal||6000)-netto));
  document.getElementById('cgoal').textContent=fmt(c.goal||6000);
  const track = document.getElementById('court').clientWidth;
  const px = Math.max(2, pct*(track-30));
  document.getElementById('cfill').style.width=px+"px";
  document.getElementById('cball').style.left=px+"px";
  for(const [id,key] of [["in-tr","tr"],["in-cc","cc"],["in-imp","imp"],["in-soglia","soglia"],["in-goal","goal"]]){
    const el=document.getElementById(id);
    if(document.activeElement!==el) el.value=c[key]??"";
  }
}
function renderPP(){
  const by={};
  let financed=0, repaid=0;
  for(const p of S.pp){
    if(p.t==='Bonifico bancario sul conto PayPal') continue;
    if(p.t==='Pagamento con credito acquirenti PayPal' && p.g>0){ financed+=p.g; continue; }
    if(p.g>=0) continue;
    let k = p.n || p.t;
    if(k.indexOf('PayPal (Europe)')===0){ k='Paga in 3 rate (rimborsi)'; repaid+=(-p.g); }
    by[k]=(by[k]||0)+(-p.g);
  }
  const residuo = Math.max(0, financed-repaid);
  const el=document.getElementById('ppgrid');
  let h = "<div class='pprow' style='border-color:var(--brass);background:#FBF6EA'><span><b style='font-family:var(--sans)'>Rate residue da rimborsare</b></span><b style='color:var(--brass)'>"+fmt2(residuo)+"</b></div>";
  h += Object.entries(by).sort((a,b)=>b[1]-a[1]).slice(0,18)
    .map(([k,v])=>"<div class='pprow'><span>"+k+"</span><b>"+fmt2(v)+"</b></div>").join("");
  el.innerHTML = h;
}
function renderYear(){
  const M = computeMatrix();
  const monthsWithData = new Set();
  for(const t of S.bper){ const m=monthOf(t.d)-1; if(m>=0&&m<12) monthsWithData.add(m); }
  const n = Math.max(1, monthsWithData.size);
  let rows = [];
  for(const c of spesaCats()){
    const spent = (M[c]||[]).reduce((a,b)=>a+b,0);
    const b = S.budget[c]||0;
    if(spent===0 && b===0) continue;
    rows.push({c, b, ann: b*n, spent, oneoff: b<=0});
  }
  let h = "<tr><th>Categoria</th><th>Budget annuo ("+n+" mesi)</th><th>Speso</th><th>Differenza</th><th>Esito</th></tr>";
  let totB=0, totS=0;
  // prima le voci con budget, ordinate per scostamento peggiore
  const conB = rows.filter(r=>!r.oneoff).sort((a,b)=>(b.spent-b.ann)-(a.spent-a.ann));
  const senzaB = rows.filter(r=>r.oneoff).sort((a,b)=>b.spent-a.spent);
  for(const r of conB){
    totB+=r.ann; totS+=r.spent;
    const diff = r.ann-r.spent;
    const esito = diff>=0 ? "\u2713 nel budget" : "\u2717 sforato";
    const cls = diff>=0 ? "style='color:var(--court);font-weight:600'" : "style='color:var(--clay);font-weight:600'";
    h += "<tr><td>"+r.c+"</td><td>"+fmt2(r.ann)+"</td><td>"+fmt2(r.spent)+"</td><td "+cls+">"+(diff>=0?"+":"")+fmt2(diff)+"</td><td "+cls+">"+esito+"</td></tr>";
  }
  h += "<tr class='tot'><td>TOTALE voci con budget</td><td>"+fmt2(totB)+"</td><td>"+fmt2(totS)+"</td><td>"+(totB-totS>=0?"+":"")+fmt2(totB-totS)+"</td><td>"+(totB>=totS?"\u2713":"\u2717")+"</td></tr>";
  for(const r of senzaB){
    totS+=r.spent;
    h += "<tr><td>"+r.c+"</td><td><span class='dash'>una tantum</span></td><td class='dim'>"+fmt2(r.spent)+"</td><td><span class='dash'>–</span></td><td><span class='dash'>–</span></td></tr>";
  }
  let sav=0; for(const c of SAVE_CATS) sav += (M[c]||[]).reduce((a,b)=>a+b,0);
  h += "<tr class='tot'><td>Risparmiato nell'anno (TR + Directa)</td><td></td><td style='color:var(--court);font-weight:600'>"+fmt2(sav)+"</td><td></td><td></td></tr>";
  document.getElementById('yeartbl').innerHTML = h;
}
function renderAll(){ renderMatrix(); renderYear(); renderUserRules(); renderCushion(); renderPP(); }

/* ============ eventi ============ */
function bind(){
  const drop=document.getElementById('drop'), fi=document.getElementById('fileinput');
  drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('on');});
  drop.addEventListener('dragleave',()=>drop.classList.remove('on'));
  drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('on');handleFiles(e.dataTransfer.files);});
  fi.addEventListener('change',()=>handleFiles(fi.files));
  for(const [id,key] of [["in-tr","tr"],["in-cc","cc"],["in-imp","imp"],["in-soglia","soglia"],["in-goal","goal"]]){
    document.getElementById(id).addEventListener('input',e=>{ S.cushion[key]=parseFloat(e.target.value)||0; renderCushion(); scheduleSave(); });
  }
  document.getElementById('btn-export').addEventListener('click',()=>{
    const blob=new Blob([JSON.stringify(S,null,1)],{type:'application/json'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='quadro-backup.json'; a.click();
  });
  document.getElementById('man-add').addEventListener('click',()=>{
    const d = (document.getElementById('man-d').value||'').trim();
    const a = parseFloat(document.getElementById('man-a').value)||0;
    const x = (document.getElementById('man-x').value||'').trim();
    const s = document.getElementById('man-s').value;
    if(!/^\d{1,2}\/\d{2}\/\d{2}$/.test(d)){ log("Data non valida: usa il formato gg/mm/aa, es. 15/03/26", true); return; }
    if(a<=0 || !x){ log("Servono importo e descrizione.", true); return; }
    const t = {d, s, a, x: x.slice(0,120)};
    const known = new Set(S.bper.map(txid));
    if(known.has(txid(t))){ log("Movimento identico gi\u00e0 presente: non aggiunto.", true); return; }
    S.bper.push(t);
    log("Aggiunto: "+d+" "+(s==='D'?'-':'+')+fmt2(a)+" \u20ac \u2014 "+x);
    document.getElementById('man-a').value=''; document.getElementById('man-x').value='';
    renderAll(); scheduleSave();
  });
  document.getElementById('btn-link').addEventListener('click',linkBackup);
  const relink=document.getElementById('btn-relink');
  if(relink) relink.addEventListener('click',async ()=>{
    const hnd=await HDB.get(); if(!hnd){ log("Nessun file collegato: usa 'Collega file di backup'.",true); return; }
    if(!(await ensurePerm(hnd,true))){ log("Permesso negato sul file.",true); return; }
    const j=await readHandleData(hnd); fileHandle=hnd;
    if(j){ await applyBackup(j); }
    document.getElementById('linkstate').textContent="\u2713 riaperto: "+hnd.name;
  });
  document.getElementById('btn-import').addEventListener('click',()=>document.getElementById('backupinput').click());
  document.getElementById('backupinput').addEventListener('change',async e=>{
    const f=e.target.files[0]; if(!f) return;
    try{
      const j=JSON.parse(await f.text());
      await applyBackup(j);
      log("\u2713 Backup caricato e salvato: "+j.bper.length+" movimenti.");
    }catch(err){ log("Backup non valido: "+err.message, true); }
    e.target.value='';
  });
  document.getElementById('btn-reset').addEventListener('click',async ()=>{
    if(!confirm("Cancella tutti i dati inseriti e torna ai dati iniziali (gen–lug 2026)?")) return;
    S = {bper:SEED_BPER.slice(), pp:SEED_PP.slice(), overrides:{}, ppOv:{}, userRules:[], customCats:[], cash:[], budget:{...DEFAULT_BUDGET}, cushion:{tr:200, cc:12323, imp:10500, soglia:1800, goal:6000}};
    renderAll(); scheduleSave();
  });
  window.addEventListener('resize',renderCushion);
}

async function bootFromLinkedFile(){
  // se c'e' un file collegato da una sessione precedente, i dati partono da LI'
  try{
    const hnd = await HDB.get();
    if(!hnd) return false;
    if(!(await ensurePerm(hnd, true))) return false; // l'utente deve ri-autorizzare (1 click)
    const j = await readHandleData(hnd);
    fileHandle = hnd;
    if(j){
      S = j;
      S.overrides=S.overrides||{}; S.ppOv=S.ppOv||{}; S.userRules=S.userRules||[];
      S.customCats=S.customCats||[]; S.cash=S.cash||[]; S.budget=S.budget||{...DEFAULT_BUDGET};
      const el=document.getElementById('linkstate');
      if(el) el.textContent="\u2713 dati dal file collegato: "+hnd.name;
      return true;
    } else {
      // file vuoto: lo useremo come destinazione, ma i dati vengono da storage/seed
      await loadState();
      await writeBackupFile();
      return true;
    }
  }catch(e){ return false; }
}
(async function init(){
  const fromFile = await bootFromLinkedFile();
  if(!fromFile) await loadState();
  document.getElementById('loading').style.display='none';
  document.getElementById('app').style.display='block';
  bind();
  renderAll();
})();


/* ============ PWA: service worker ============ */
if('serviceWorker' in navigator && location.protocol.startsWith('http')){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./sw.js').catch(()=>{ /* offline non disponibile: nessun problema */ });
  });
}