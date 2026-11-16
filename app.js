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
["SPEEDIANCE","Casa: arredo (una tantum)"],["MOBILE SU MISURA","Casa: arredo (una tantum)"],["ARREDO","Casa: arredo (una tantum)"],["MONDO CONVENIENZA","Casa: arredo (una tantum)"],["IKEA","Casa: arredo (una tantum)"],["RATA MOBILE","Casa: arredo (una tantum)"],["PRELIEV","Prelievi contanti"],["AFFITTO","Affitto (chiuso)"],["EMOLUMENTI","Entrata: stipendio"],["SALUTISSIMA","Entrata: rimborsi sanitari"],["ARCA RISPARMIO","Entrata: straordinaria"],["INFRUTTIFERO","Entrata: straordinaria"]
];
const SPESA_CATS_BASE = ["Rata mutuo","Bollette","Internet/telefono","Alimentari","Ristoranti/bar","Auto: carburante","Auto: telepass","Auto: parcheggi","Auto: bollo/ACI","Assicurazione auto","Sport","Salute","Cura persona","Shopping/Amazon","Abbonamenti","PayPal (senza dettaglio)","Libri/cultura","Trasferimenti amici","Viaggi","Ottica/occhiali","Prelievi contanti","Affitto (chiuso)","Casa: arredo (una tantum)","Abbigliamento","Personal trainer (rimborsato)","Polizza vita (chiusa)","Altro"];
const EXTRA_CATS = ["Casa: acquisto (una tantum)","Casa: oneri (una tantum)"];
const SAVE_CATS = ["Risparmio: Trade Republic","Risparmio: Directa"];
const IN_CATS = ["Entrata: stipendio","Entrata: rimborsi sanitari","Entrata: straordinaria","Entrata: altro"];
/* entrata a parte: NON e' stipendio ne' "altro", non entra nella riga Entrate (ha una riga sua) */
const RIMB_CAT = "Entrata: rimborso mutuo (Giulia)";
const RIMB_CATS = [RIMB_CAT];
const isIncomeCat = c => String(c).indexOf('Entrata')===0;
/* "spese correnti" = uscite vita senza casa / una tantum / prelievi (i prelievi sono solo provvista contanti) */
const isCurrentCat = c => !/^Casa:/.test(c) && c.indexOf('(una tantum)')<0 && c!=='Prelievi contanti';
const spesaCats = () => [...SPESA_CATS_BASE, ...((typeof S!=='undefined'&&S&&S.customCats)||[])];
const allCats = () => [...spesaCats(), ...EXTRA_CATS, ...SAVE_CATS, ...IN_CATS, ...RIMB_CATS];
/* regole utente aggiunte una sola volta ai dati (non risorgono se le cancelli dall'interfaccia) */
const MIGR_RULES = [["SPEEDIANCE","Casa: arredo (una tantum)"],["GIULIA ASCIUTTO",RIMB_CAT]];
const newPiano = () => ({voci:[],rata:400,start:9,extra:1000,liquidita:9000});
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const DEFAULT_BUDGET = {"Rata mutuo":645,"Bollette":120,"Internet/telefono":25,"Alimentari":165,"Ristoranti/bar":150,"Auto: carburante":100,"Auto: telepass":40,"Auto: parcheggi":6,"Auto: bollo/ACI":0,"Assicurazione auto":0,"Sport":90,"Salute":55,"Cura persona":30,"Shopping/Amazon":30,"Abbonamenti":45,"PayPal (senza dettaglio)":0,"Libri/cultura":10,"Trasferimenti amici":50,"Viaggi":50,"Ottica/occhiali":0,"Prelievi contanti":0,"Affitto (chiuso)":0,"Casa: arredo (una tantum)":0,"Abbigliamento":0,"Personal trainer (rimborsato)":0,"Polizza vita (chiusa)":0,"Altro":20};
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
["SUBITO","Entrata: altro"],["EVOX","Altro"],["SPEEDIANCE","Casa: arredo (una tantum)"]];
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
    const isIn = isIncomeCat(cat);
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

/* ============ stato: un unico punto di normalizzazione (ogni S = ... passa da qui) ============ */
function freshState(){
  return {bper:SEED_BPER.slice(), pp:SEED_PP.slice(), overrides:{}, ppOv:{}, userRules:[], customCats:[], cash:[], piano:{voci:[
    {n:"Scrittura privata", tot:4274, pag:4274, chi:"compagna", note:"pagata"},
    {n:"Letto 2a rata", tot:1040, pag:1040, chi:"compagna", note:"pagata"},
    {n:"Mobili ulteriori", tot:5000, pag:5000, chi:"comune", note:"contanti 1370 + 600 compagna + 3030 Marco"},
    {n:"Mobile su misura - anticipo", tot:1500, pag:1500, chi:"Marco", note:"anticipo versato"},
    {n:"Speediance", tot:4000, pag:4000, chi:"Marco", note:"pagato in unica soluzione"},
    {n:"Mobile su misura - saldo", tot:5000, pag:0, chi:"Marco", note:"a rate con l'amico"}
  ], rata:400, start:9, extra:1000, liquidita:9000}, budget:{...DEFAULT_BUDGET}, cushion:{tr:200, cc:12323, imp:10500, soglia:1800, goal:6000}};
}
function normalizeState(){
  let changed=false;
  S.bper=S.bper||[]; S.pp=S.pp||[];
  S.overrides=S.overrides||{}; S.ppOv=S.ppOv||{}; S.userRules=S.userRules||[];
  S.customCats=S.customCats||[]; S.cash=S.cash||[];
  S.cushion=S.cushion||{tr:0,cc:0,imp:0,soglia:1800,goal:6000};
  S.budget=S.budget||{...DEFAULT_BUDGET};
  S.piano=S.piano||newPiano();
  S.piano.voci=S.piano.voci||[];
  S.migr=S.migr||{};
  if(!S.migr.rules6){
    for(const [kw,cat] of MIGR_RULES){ if(!S.userRules.some(r=>r[0]===kw)) S.userRules.unshift([kw,cat]); }
    S.migr.rules6=true; changed=true;
  }
  for(const c of spesaCats()){ if(!(c in S.budget)) S.budget[c]=DEFAULT_BUDGET[c]||0; }
  return changed;
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
          if(usa){ S = j; normalizeState(); renderAll(); }
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
  S.savedAt=Date.now();
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
  S.savedAt=Date.now();
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
  normalizeState();
  renderAll();
  await saveNow();   // scrittura IMMEDIATA, così al reload non torna indietro
}

async function loadState(){
  try{
    const v = await store.get('quadro-v1');
    if(v){ S = JSON.parse(v); if(normalizeState()) scheduleSave(); return; }
  }catch(e){ /* chiave assente o corrotta: primo avvio */ }
  S = freshState(); normalizeState();
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
    else if(isIncomeCat(c)) M[c][m]+=p.g;
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
  const totRow=[], curRow=[], inRow=[], savRow=[], rimbRow=[];
  const curCats = spesaCats().filter(isCurrentCat);
  for(let m=0;m<12;m++){
    let tot=0; for(const c of spesaCats()) tot += M[c]?M[c][m]:0;
    totRow.push(tot);
    let cur=0; for(const c of curCats) cur += M[c]?M[c][m]:0;
    curRow.push(cur);
    let inc=0; for(const c of IN_CATS) inc += M[c]?M[c][m]:0;
    inRow.push(inc);
    let sv=0; for(const c of SAVE_CATS) sv += M[c]?M[c][m]:0;
    savRow.push(sv);
    let rb=0; for(const c of RIMB_CATS) rb += M[c]?M[c][m]:0;
    rimbRow.push(rb);
    h += "<td>"+(monthsWithData[m]?fmt2(totRow[m]):"<span class='dash'>–</span>")+"</td>";
  }
  h += "</tr>";
  // spese correnti: senza casa / una tantum / prelievi contanti, cosi' il margine si legge
  h += "<tr class='tot'><td title='Esclude Casa:*, voci (una tantum) e Prelievi contanti'>SPESE CORRENTI <small>(senza casa/una tantum/prelievi)</small></td><td class='bud'>"+fmt2(curCats.reduce((s,c)=>s+(S.budget[c]||0),0))+"</td>";
  for(let m=0;m<12;m++) h += "<td>"+(monthsWithData[m]?fmt2(curRow[m]):"<span class='dash'>–</span>")+"</td>";
  h += "</tr>";
  h += "<tr><td>Risparmio (TR + Directa)</td><td></td>"+savRow.map((v,m)=>"<td>"+(monthsWithData[m]&&v?fmt2(v):"<span class='dash'>–</span>")+"</td>").join("")+"</tr>";
  h += "<tr><td>Entrate</td><td></td>"+inRow.map((v,m)=>"<td>"+(monthsWithData[m]&&v?fmt2(v):"<span class='dash'>–</span>")+"</td>").join("")+"</tr>";
  h += "<tr class='saldo'><td>Margine corrente (entrate − spese correnti)</td><td></td>";
  for(let m=0;m<12;m++){
    if(!monthsWithData[m]){ h+="<td><span class='dash'>–</span></td>"; continue; }
    const mg = inRow[m]-curRow[m];
    h += "<td class='"+(mg<0?'neg':'pos')+"'>"+fmt2(mg)+"</td>";
  }
  h += "</tr>";
  h += "<tr><td>"+RIMB_CAT.replace('Entrata: ','Entrata a parte: ')+"</td><td></td>";
  for(let m=0;m<12;m++){
    const v=rimbRow[m];
    h += (monthsWithData[m]&&v) ? "<td class='cell' data-cat=\""+RIMB_CAT+"\" data-m='"+m+"'>"+fmt2(v)+"</td>" : "<td><span class='dash'>–</span></td>";
  }
  h += "</tr>";
  h += "<tr class='saldo'><td>Saldo mese (dopo risparmi, incl. rimborso mutuo)</td><td></td>";
  for(let m=0;m<12;m++){
    if(!monthsWithData[m]){ h+="<td><span class='dash'>–</span></td>"; continue; }
    let extra=0; for(const c of EXTRA_CATS) extra += M[c]?M[c][m]:0;
    const sd = inRow[m]+rimbRow[m]-totRow[m]-savRow[m]-extra;
    h += "<td class='"+(sd<0?'neg':'pos')+"'>"+fmt2(sd)+"</td>";
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
let editCashId = null;
const cashDupes = x => (S.cash||[]).filter(y=>y.id!==x.id && y.c===x.c && y.m===x.m);
const monthOpts = sel => MESI.map((nm,i)=>"<option value='"+(i+1)+"'"+((i+1)===sel?" selected":"")+">"+nm+"</option>").join("");
function cashRowHtml(x){
  const inp = "padding:4px;border:1px solid var(--line);border-radius:5px;font-size:12px";
  if(editCashId===x.id){
    return "<div class='txrow' style='flex-wrap:wrap'>"+
      "<input class='ce-a' type='number' step='0.5' min='0' value='"+x.a+"' style='width:90px;font-family:var(--mono);"+inp+"' aria-label='Importo'>"+
      "<select class='ce-c' style='"+inp+"'>"+spesaCats().filter(c=>c!=='Prelievi contanti').map(c=>"<option"+(c===x.c?" selected":"")+">"+esc(c)+"</option>").join("")+"</select>"+
      "<label style='font-size:11.5px;color:var(--mist)'>speso a</label><select class='ce-m' style='"+inp+"'>"+monthOpts(x.m)+"</select>"+
      "<label style='font-size:11.5px;color:var(--mist)'>prelievo di</label><select class='ce-mp' style='"+inp+"'>"+monthOpts(x.mp||x.m)+"</select>"+
      "<input class='ce-n' type='text' value=\""+esc(x.n||'')+"\" placeholder='nota' style='flex:1;min-width:120px;"+inp+"'>"+
      "<button class='btn' data-savecash='"+esc(x.id)+"' style='padding:4px 10px'>Salva</button>"+
      "<button class='btn' data-cancelcash='1' style='padding:4px 10px'>Annulla</button></div>";
  }
  const dup = cashDupes(x).length>0;
  return "<div class='txrow'><span class='d'>contanti</span><span class='a'>"+fmt2(x.a)+"</span><span class='x' title='"+esc(x.c)+"'>\ud83d\udcb6 "+esc(x.c)+" · "+esc(x.n||'spesa in contanti')+((x.mp&&x.mp!==x.m)?" (speso "+MESI[x.m-1]+", prelievo di "+MESI[x.mp-1]+")":"")+
    (dup?" <b style='color:var(--clay)' title='Stessa categoria e stesso mese gia presenti: possibile doppione'>\u26a0 doppione?</b>":"")+"</span>"+
    "<a href='#' data-editcash='"+esc(x.id)+"' style='text-decoration:none;font-size:15px;margin-right:6px' aria-label='Modifica'>\u270e</a>"+
    "<a href='#' data-delcash='"+esc(x.id)+"' style='color:var(--clay);text-decoration:none;font-size:15px' aria-label='Elimina'>\u2715</a></div>";
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
  const poolList = cat==='Prelievi contanti' ? (S.cash||[]).filter(x=>((x.mp||x.m))-1===m) : [];
  const el = document.getElementById('detail');
  el.className='open';
  const tot = list.reduce((s,t)=>s+t.a,0) + ppList.reduce((s,p)=>s+(p.g<0?-p.g:(isIncomeCat(cat)?p.g:-p.g)),0) + cashList.reduce((s,x)=>s+x.a,0);
  let h = "<h3>"+cat+" — "+MESI[m]+" · "+(list.length+ppList.length)+" movimenti · "+fmt2(tot)+" €</h3>";
  const opts = sel => [...allCats(),'\u2795 Nuova categoria\u2026'].map(c=>"<option"+(c===sel?" selected":"")+">"+c+"</option>").join("");
  for(const t of list){
    h += "<div class='txrow'><span class='d'>"+t.d+"</span><span class='a'>"+fmt2(t.a)+"</span><span class='x' title=\""+t.x.replace(/"/g,'&quot;')+"\">"+t.x+"</span><select data-src='b' data-id=\""+txid(t).replace(/"/g,'&quot;')+"\" aria-label='Cambia categoria'>"+opts(cat)+"</select><button class='btn btn-rule' data-mkrule='b'>regola</button></div>";
  }
  for(const p of ppList){
    const label = (p.n||p.t)+(p.m?" · "+p.m:"");
    h += "<div class='txrow'><span class='d'>"+p.d.split('/').slice(0,2).join('/')+"</span><span class='a'>"+fmt2(Math.abs(p.g))+"</span><span class='x' title=\""+label.replace(/"/g,'&quot;')+"\">\ud83c\udd7f\ufe0f "+label+"</span><select data-src='p' data-id=\""+p.id+"\" aria-label='Cambia categoria'>"+opts(cat)+"</select><button class='btn btn-rule' data-mkrule='p'>regola</button></div>";
  }
  for(const x of cashList) h += cashRowHtml(x);
  if(poolList.length){ h += "<div style='margin-top:10px;font-size:12px;color:var(--mist)'>Attribuzioni di questo prelievo (correggibili):</div>"; for(const x of poolList) h += cashRowHtml(x); }
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
    const nx = {id: Date.now()+"-"+Math.random().toString(36).slice(2,7), m: parseInt(el.querySelector('#cash-m').value,10), mp: m+1, a, c: el.querySelector('#cash-c').value, n: el.querySelector('#cash-n').value.trim()};
    const dups = cashDupes(nx);
    if(dups.length && !confirm("Attenzione: per \""+nx.c+"\" a "+MESI[nx.m-1]+" c'e' gia' "+dups.map(d=>fmt2(d.a)+" \u20ac"+(d.n?" ("+d.n+")":"")).join(" + ")+".\nVuoi aggiungere comunque "+fmt2(nx.a)+" \u20ac?\n(Annulla se e' un doppione: puoi correggere la riga esistente con \u270e)")) return;
    S.cash.push(nx);
    renderMatrix(); renderYear(); renderDetail(cat,m); scheduleSave();
  });
  el.querySelectorAll('a[data-delcash]').forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault();
    S.cash = (S.cash||[]).filter(x=>x.id!==a.dataset.delcash);
    renderMatrix(); renderYear(); renderDetail(cat,m); scheduleSave();
  }));
  el.querySelectorAll('a[data-editcash]').forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault(); editCashId=a.dataset.editcash; renderDetail(cat,m);
  }));
  const cancelBtn = el.querySelector('button[data-cancelcash]');
  if(cancelBtn) cancelBtn.addEventListener('click',()=>{ editCashId=null; renderDetail(cat,m); });
  const saveBtn = el.querySelector('button[data-savecash]');
  if(saveBtn) saveBtn.addEventListener('click',()=>{
    const row = saveBtn.parentElement;
    const x = (S.cash||[]).find(y=>y.id===saveBtn.dataset.savecash); if(!x) return;
    const nv = {id:x.id, a: parseFloat(row.querySelector('.ce-a').value)||0, c: row.querySelector('.ce-c').value,
      m: parseInt(row.querySelector('.ce-m').value,10), mp: parseInt(row.querySelector('.ce-mp').value,10), n: row.querySelector('.ce-n').value.trim()};
    if(nv.a<=0) return;
    const dups = cashDupes(nv);
    if(dups.length && !confirm("Per \""+nv.c+"\" a "+MESI[nv.m-1]+" esiste gia' un'altra voce ("+dups.map(d=>fmt2(d.a)+" \u20ac").join(" + ")+"). Salvare comunque?")) return;
    Object.assign(x, nv);
    editCashId=null;
    renderMatrix(); renderYear(); renderDetail(cat,m); scheduleSave();
  });
  el.querySelectorAll('select').forEach(sel=>{
    if(sel.id==='cash-c' || !sel.dataset.src) return;
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
let editVoce = null; // indice voce in modifica (null = nuova)
const monthAbs = da => { const m=/^(\d{4})-(\d{2})$/.exec(da||''); return m ? (parseInt(m[1],10)-2026)*12+parseInt(m[2],10)-1 : null; };
function buildCal(debito, rata, startAbs, extra){
  let m=startAbs, righe=[], giro=0;
  while(debito>0 && rata>0 && giro<60){
    const mm=((m%12)+12)%12;
    const q=Math.min(rata + (mm===11?extra:0), debito);
    debito-=q;
    righe.push({m:mm, q, anno:2026+Math.floor(m/12)});
    m++; giro++;
  }
  return righe;
}
const calChips = (righe, extra) => righe.map(r=>"<span style='display:inline-block;margin:2px;padding:3px 9px;border:1px solid var(--line);border-radius:12px'>"+MESI[r.m]+" "+String(r.anno).slice(2)+": <b>"+fmt2(r.q)+"</b>"+(r.m===11&&extra?" \ud83c\udf81":"")+"</span>").join("");
function renderPiano(){
  const P = S.piano || (S.piano=newPiano());
  const tbl = document.getElementById('pianotbl'); if(!tbl) return;
  let totale=0, pagato=0;
  let h = "<tr><th>Voce</th><th>Totale</th><th>Pagato</th><th>Da pagare</th><th>Chi</th><th>Rate</th><th>Note</th><th></th></tr>";
  P.voci.forEach((v,i)=>{
    const tot=+v.tot||0, pag=+v.pag||0;
    totale+=tot; pagato+=pag;
    const resta=tot-pag;
    const cls = resta<=0 ? "style='color:var(--court)'" : "style='color:var(--clay);font-weight:600'";
    const rateTxt = (+v.rata>0) ? fmt2(+v.rata)+"/mese"+(v.da?" da "+MESI[parseInt(v.da.slice(5),10)-1]+" "+v.da.slice(2,4):"") : "";
    h += "<tr><td>"+esc(v.n)+"</td><td>"+fmt2(tot)+"</td><td>"+fmt2(pag)+"</td><td "+cls+">"+(resta<=0?"\u2713 saldata":fmt2(resta))+"</td><td style='text-align:left'>"+esc(v.chi)+"</td><td style='text-align:left;font-size:12px'>"+rateTxt+"</td><td style='text-align:left;white-space:normal;font-family:var(--sans);font-size:12px;color:var(--mist)'>"+esc(v.note||'')+"</td>"+
      "<td style='white-space:nowrap'><a href='#' data-editvoce='"+i+"' style='text-decoration:none;margin-right:6px' aria-label='Modifica voce'>\u270e</a><a href='#' data-delvoce='"+i+"' style='color:var(--clay);text-decoration:none' aria-label='Elimina voce'>\u2715</a></td></tr>";
  });
  const resta = totale-pagato;
  h += "<tr class='tot'><td>TOTALE</td><td>"+fmt2(totale)+"</td><td>"+fmt2(pagato)+"</td><td>"+fmt2(resta)+"</td><td></td><td></td><td></td><td></td></tr>";
  tbl.innerHTML=h;
  tbl.querySelectorAll('a[data-editvoce]').forEach(a=>a.addEventListener('click',e=>{ e.preventDefault(); openVoce(parseInt(a.dataset.editvoce,10)); }));
  tbl.querySelectorAll('a[data-delvoce]').forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault();
    const i=parseInt(a.dataset.delvoce,10);
    if(!confirm("Eliminare la voce \""+(P.voci[i]&&P.voci[i].n)+"\"?")) return;
    P.voci.splice(i,1); if(editVoce!==null) closeVoce();
    renderPiano(); scheduleSave();
  }));

  // riepilogo in alto: usa il saldo conto REALE che arriva dagli import
  const cc = (S.cushion&&S.cushion.cc)||0, soglia=(S.cushion&&S.cushion.soglia)||0;
  const disponibile = Math.max(0, cc - soglia);
  const copertura = disponibile - resta;
  const sum = document.getElementById('pianosum');
  if(sum) sum.innerHTML =
    "<div class='cn'><b>"+fmt(resta)+"</b><small>Ancora da pagare</small></div>"+
    "<div class='cn'><b>"+fmt(disponibile)+"</b><small>Disponibile sul conto</small></div>"+
    "<div class='cn'><b style='color:"+(copertura>=0?"var(--court)":"var(--clay)")+"'>"+(copertura>=0?"+":"")+fmt(copertura)+"</b><small>"+(copertura>=0?"Copertura":"Da coprire col reddito")+"</small></div>";

  // calendario rate: le voci con rate proprie hanno il loro calendario, il resto va nella rata mobile globale
  const rata=P.rata||0, start=P.start||9, extra=P.extra||0;
  const cal=document.getElementById('pc-cal');
  if(cal){
    const own = P.voci.filter(v=>(+v.rata>0) && (+v.tot||0)-(+v.pag||0)>0);
    const restaGlob = P.voci.filter(v=>!(+v.rata>0)).reduce((s,v)=>s+Math.max(0,(+v.tot||0)-(+v.pag||0)),0);
    let ch="<div style='font-family:var(--mono);font-size:12.5px'>";
    if(rata>0 && restaGlob>0){
      const righe=buildCal(restaGlob, rata, start-1, extra);
      ch+="<div style='margin:6px 0;color:var(--mist)'>Calendario rata mobile (voci senza rate proprie, "+fmt2(restaGlob)+" \u20ac): chiusura prevista <b>"+MESI[righe[righe.length-1].m]+" "+righe[righe.length-1].anno+"</b> in "+righe.length+" rate</div>"+calChips(righe, extra);
    }
    for(const v of own){
      const abs = monthAbs(v.da); const sa = abs===null ? start-1 : abs;
      const righe=buildCal((+v.tot||0)-(+v.pag||0), +v.rata, sa, 0);
      ch+="<div style='margin:10px 0 6px;color:var(--mist)'>"+esc(v.n)+": chiusura prevista <b>"+MESI[righe[righe.length-1].m]+" "+righe[righe.length-1].anno+"</b> in "+righe.length+" rate</div>"+calChips(righe,0);
    }
    ch+="</div>";
    cal.innerHTML = (rata>0&&restaGlob>0) || own.length ? ch : "";
  }
  // campi
  const ri=document.getElementById('pc-rata'), st=document.getElementById('pc-start'), ex=document.getElementById('pc-extra');
  if(ri && document.activeElement!==ri) ri.value=rata;
  if(ex && document.activeElement!==ex) ex.value=extra;
  if(st && !st.options.length){ st.innerHTML=Array.from({length:24},(_,i)=>"<option value='"+(i+1)+"'>"+MESI[i%12]+" "+(2026+Math.floor(i/12))+"</option>").join(""); }
  if(st) st.value=start;
}
function openVoce(i){
  editVoce = i;
  const v = i===null ? {n:'',tot:'',pag:0,chi:'Marco',note:'',rata:'',da:''} : S.piano.voci[i];
  const set=(id,val)=>{ const e=document.getElementById(id); if(e) e.value = val==null?'':val; };
  set('pv-n',v.n); set('pv-tot',v.tot); set('pv-pag',v.pag); set('pv-chi',v.chi); set('pv-note',v.note); set('pv-rata',v.rata||''); set('pv-da',v.da||'');
  const t=document.getElementById('pv-title'); if(t) t.textContent = i===null ? 'Nuova voce' : 'Modifica: '+v.n;
  const box=document.getElementById('pv-box'); if(box){ box.open=true; box.scrollIntoView({behavior:'smooth',block:'nearest'}); }
}
function closeVoce(){ editVoce=null; const box=document.getElementById('pv-box'); if(box) box.open=false; }
function saveVoce(){
  const n=(document.getElementById('pv-n').value||'').trim();
  const tot=parseFloat(document.getElementById('pv-tot').value);
  const pag=parseFloat(document.getElementById('pv-pag').value)||0;
  if(!n || isNaN(tot) || tot<0){ alert("Servono almeno nome e totale."); return; }
  const v={n, tot, pag, chi:(document.getElementById('pv-chi').value||'').trim(), note:(document.getElementById('pv-note').value||'').trim(),
    rata:parseFloat(document.getElementById('pv-rata').value)||0, da:document.getElementById('pv-da').value||''};
  S.piano=S.piano||newPiano(); S.piano.voci=S.piano.voci||[];
  if(editVoce===null) S.piano.voci.push(v); else S.piano.voci[editVoce]=v;
  closeVoce(); renderPiano(); scheduleSave();
}
function renderAll(){ renderMatrix(); renderYear(); renderUserRules(); renderCushion(); renderPP(); renderPiano(); }

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
  const pcs=document.getElementById('pc-save');
  if(pcs) pcs.addEventListener('click',()=>{
    S.piano=S.piano||{};
    S.piano.rata=parseFloat(document.getElementById('pc-rata').value)||0;
    S.piano.start=parseInt(document.getElementById('pc-start').value,10)||9;
    S.piano.extra=parseFloat(document.getElementById('pc-extra').value)||0;
    renderPiano(); scheduleSave();
  });
  const pvs=document.getElementById('pv-save'); if(pvs) pvs.addEventListener('click',saveVoce);
  const pvc=document.getElementById('pv-cancel'); if(pvc) pvc.addEventListener('click',closeVoce);
  const pvn=document.getElementById('pv-new'); if(pvn) pvn.addEventListener('click',()=>openVoce(null));
  const imp0=document.getElementById('btn-imp0');
  if(imp0) imp0.addEventListener('click',()=>{ S.cushion.imp=0; renderCushion(); scheduleSave(); });
  document.getElementById('btn-link').addEventListener('click',linkBackup);
  const relink=document.getElementById('btn-relink');
  if(relink) relink.addEventListener('click',async ()=>{
    const hnd=await HDB.get(); if(!hnd){ log("Nessun file collegato: usa 'Collega file di backup'.",true); return; }
    if(!(await ensurePerm(hnd,true))){ log("Permesso negato sul file.",true); return; }
    const j=await readHandleData(hnd); fileHandle=hnd;
    if(j){
      const localNewer = (S&&S.savedAt||0) > (j.savedAt||0);
      if(!localNewer) await applyBackup(j);
      else if(confirm("I dati nell'app sono PIU' RECENTI del file collegato (modifiche fatte mentre il file non era autorizzato).\nOK = tieni i dati dell'app e aggiorna il file\nAnnulla = carica il file (perdi le modifiche piu' recenti)")) await saveNow();
      else await applyBackup(j);
    } else { await saveNow(); }
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
    S = freshState(); normalizeState();
    renderAll(); scheduleSave();
  });
  window.addEventListener('resize',renderCushion);
}

async function bootFromLinkedFile(){
  // se c'e' un file collegato da una sessione precedente, i dati partono da LI'
  try{
    const hnd = await HDB.get();
    if(!hnd) return false;
    if(!(await ensurePerm(hnd, true))){ // l'utente deve ri-autorizzare (1 click)
      window.__linkedPending = true;
      return false;
    }
    const j = await readHandleData(hnd);
    fileHandle = hnd;
    if(j){
      S = j;
      if(normalizeState()) scheduleSave();
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
  if(window.__linkedPending){ const el=document.getElementById('linkstate'); if(el) el.textContent="\u26a0 file collegato NON autorizzato: le modifiche vanno solo nel browser. Clicca 'Riapri file collegato'."; }
})();


/* ============ PWA: service worker ============ */
if('serviceWorker' in navigator && location.protocol.startsWith('http')){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./sw.js').catch(()=>{ /* offline non disponibile: nessun problema */ });
  });
}