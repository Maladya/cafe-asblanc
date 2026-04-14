import { useState, useMemo, useEffect } from "react";

const coffeImageModules = import.meta.glob(
  "./assets/Coffe/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
);

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .cr {
    font-family:'DM Sans',sans-serif; background:#faf7f2; color:#2c1f14; min-height:100vh;
    --cream:#faf7f2; --warm:#fff9f4; --sand:#f0e9dd; --sand2:#e2d9cc;
    --brown:#6b4f3a; --brown-d:#3d2b1f; --acc:#c4824a; --acc-l:#f5e6d8; --acc-m:#e8c9a8;
    --mid:#6b5040; --muted:#a8927e;
  }
  .serif { font-family:'Cormorant Garamond',Georgia,serif; }

  /* HEADER */
  .hd { background:var(--warm); border-bottom:1px solid var(--sand2); padding:0 16px; position:sticky; top:0; z-index:30; }
  .hd-in { width:100%; max-width:none; margin:0; display:flex; align-items:center; justify-content:space-between; height:64px; gap:12px; }
  .logo-name { font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:600; color:var(--brown-d); letter-spacing:.5px; line-height:1; }
  .logo-sub { font-size:9px; font-weight:300; color:var(--muted); letter-spacing:2.5px; text-transform:uppercase; margin-top:3px; }
  .sw { flex:1; max-width:340px; position:relative; }
  .si { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--muted); font-size:13px; pointer-events:none; }
  .sinp { width:100%; border:1.5px solid var(--sand2); border-radius:100px; padding:9px 14px 9px 36px;
    font-size:13px; font-family:'DM Sans',sans-serif; background:var(--sand); color:var(--brown-d); outline:none;
    transition:border-color .2s,background .2s; }
  .sinp::placeholder { color:var(--muted); }
  .sinp:focus { border-color:var(--acc); background:var(--warm); }

  /* HERO */
  .hero { background:linear-gradient(140deg,#f7ede0 0%,#fdf9f5 55%,#eee4d5 100%);
    padding:44px 20px 38px; text-align:center; border-bottom:1px solid var(--sand2); position:relative; overflow:hidden; }
  .hero::before { content:''; position:absolute; top:-70px; right:-70px; width:260px; height:260px; border-radius:50%; background:rgba(196,130,74,.07); }
  .hero::after  { content:''; position:absolute; bottom:-80px; left:-50px; width:200px; height:200px; border-radius:50%; background:rgba(196,130,74,.05); }
  .hero-eye { display:inline-flex; align-items:center; gap:10px; font-size:10px; letter-spacing:3.5px; text-transform:uppercase; color:var(--acc); font-weight:500; margin-bottom:14px; }
  .hero-eye span { width:28px; height:1px; background:var(--acc); }
  .hero-title { font-family:'Cormorant Garamond',serif; font-size:clamp(32px,7vw,60px); font-weight:300; color:var(--brown-d); line-height:1.08; margin-bottom:12px; }
  .hero-title em { font-style:italic; color:var(--acc); }
  .hero-desc { font-size:13.5px; color:var(--mid); font-weight:300; max-width:400px; margin:0 auto; line-height:1.75; }

  /* TABS */
  .tb-wrap { background:var(--warm); border-bottom:1px solid var(--sand2); position:sticky; top:64px; z-index:20; }
  .tb { width:100%; max-width:none; margin:0; display:flex; overflow-x:auto; padding:0 16px; scrollbar-width:none; }
  .tb::-webkit-scrollbar { display:none; }
  .tbb { border:none; background:none; cursor:pointer; padding:13px 14px; font-size:12.5px;
    font-family:'DM Sans',sans-serif; font-weight:400; color:var(--muted);
    border-bottom:2.5px solid transparent; white-space:nowrap; transition:all .2s;
    display:flex; align-items:center; gap:5px; }
  .tbb:hover { color:var(--brown); }
  .tbb.act { color:var(--acc); border-bottom-color:var(--acc); font-weight:500; }
  .tbc { font-size:9.5px; background:var(--acc-l); color:var(--acc); border-radius:100px; padding:1px 7px; font-weight:500; }
  .tbb.act .tbc { background:var(--acc); color:#fff; }

  /* MAIN */
  .main { width:100%; max-width:none; margin:0; padding:28px 16px 64px; }
  .sh { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:20px; padding-bottom:12px; border-bottom:1px solid var(--sand2); }
  .st { font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:600; color:var(--brown-d); }
  .ss { font-size:11.5px; color:var(--muted); font-weight:300; }

  /* GRID — desktop 4 col, tablet 3, mobile 3 (small) */
  .grid {
    display:grid;
    grid-template-columns: repeat(4, 1fr);
    gap:18px;
  }
  @media(max-width:900px){ .grid { grid-template-columns: repeat(3,1fr); gap:14px; } }
  @media(max-width:600px){ .grid { grid-template-columns: repeat(3,1fr); gap:8px; } }

  /* CARD */
  .card {
    background:var(--warm); border-radius:14px; overflow:hidden; border:1px solid var(--sand2);
    cursor:pointer; transition:transform .2s ease,box-shadow .2s ease; animation:fu .32s ease both;
  }
  .card:hover { transform:translateY(-4px); box-shadow:0 14px 36px rgba(107,79,58,.12); }
  @keyframes fu { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

  /* IMAGE */
  .iw { width:100%; aspect-ratio:4/3; position:relative; overflow:hidden; }
  .iw img { width:100%; height:100%; object-fit:cover; display:block; }
  .iph { width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px;
    background:linear-gradient(145deg,#f0e9dd,#e4d9cc); }
  .iph-ic { width:40px; height:40px; border-radius:50%; background:rgba(196,130,74,.14); display:flex; align-items:center; justify-content:center; font-size:18px; }
  .iph-txt { font-size:8px; color:var(--muted); letter-spacing:1.2px; text-transform:uppercase; }
  .tag { position:absolute; top:7px; left:7px; font-size:8.5px; font-weight:500; letter-spacing:.6px; text-transform:uppercase; padding:3px 8px; border-radius:100px; }

  /* CARD BODY */
  .cb { padding:10px 10px 12px; }
  .cn { font-family:'Cormorant Garamond',serif; font-size:14px; font-weight:600; color:var(--brown-d); margin-bottom:3px; line-height:1.2; }
  .cd { font-size:10.5px; color:var(--muted); font-weight:300; line-height:1.5; margin-bottom:8px;
    display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .cf2 { display:flex; align-items:center; justify-content:space-between; gap:4px; flex-wrap:wrap; }
  .cp { font-family:'Cormorant Garamond',serif; font-size:15px; font-weight:600; color:var(--acc); }
  .ccal { font-size:9.5px; color:var(--muted); background:var(--sand); padding:2px 7px; border-radius:100px; }

  /* TAG COLORS */
  .t-bs  { background:#fff0e5; color:#c4824a; }
  .t-pop { background:#edf2ed; color:#3d7a44; }
  .t-new { background:#e7edf8; color:#3557a8; }
  .t-hlt { background:#ebf5ec; color:#3a7040; }
  .t-ref { background:#e5f2f7; color:#2370a0; }
  .t-spc { background:#f3e8f5; color:#7a3598; }

  /* EMPTY */
  .empty { text-align:center; padding:64px 24px; }
  .empty-ic { font-size:40px; margin-bottom:14px; opacity:.35; }
  .empty-t { font-family:'Cormorant Garamond',serif; font-size:20px; color:var(--mid); margin-bottom:6px; }
  .empty-s { font-size:12.5px; color:var(--muted); }

  /* SEARCH BANNER */
  .sbanner { background:var(--acc-l); border:1px solid var(--acc-m); border-radius:10px;
    padding:10px 15px; font-size:13px; color:var(--acc); font-weight:500; margin-bottom:20px;
    display:flex; align-items:center; gap:8px; }

  /* FOOTER */
  .foot { background:var(--warm); border-top:1px solid var(--sand2); text-align:center; padding:24px 20px; }
  .foot p { font-size:11.5px; color:var(--muted); font-weight:300; line-height:1.9; }

  /* ── MODAL OVERLAY ── */
  .modal-bg {
    position:fixed; inset:0; background:rgba(45,27,14,.55); z-index:100;
    display:flex; align-items:flex-end; justify-content:center;
    padding:0;
    animation:fadein .2s ease;
  }
  @media(min-width:601px){
    .modal-bg { align-items:center; padding:20px; }
  }
  @keyframes fadein { from{opacity:0} to{opacity:1} }

  .modal {
    background:var(--warm); width:100%; max-width:480px;
    border-radius:24px 24px 0 0;
    overflow:hidden; position:relative;
    animation:slideup .28s cubic-bezier(.32,1.2,.42,1) both;
    max-height:92vh; overflow-y:auto;
  }
  @media(min-width:601px){
    .modal { border-radius:22px; max-height:88vh; }
  }
  @keyframes slideup { from{transform:translateY(60px);opacity:0} to{transform:translateY(0);opacity:1} }

  .modal-img { width:100%; aspect-ratio:16/9; position:relative; overflow:hidden; flex-shrink:0; }
  .modal-img img { width:100%; height:100%; object-fit:cover; display:block; }
  .modal-iph { width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px;
    background:linear-gradient(145deg,#f0e9dd,#e4d9cc); }
  .modal-iph-ic { width:64px; height:64px; border-radius:50%; background:rgba(196,130,74,.15); display:flex; align-items:center; justify-content:center; font-size:30px; }
  .modal-iph-txt { font-size:10px; color:var(--muted); letter-spacing:1.5px; text-transform:uppercase; }

  .modal-close {
    position:absolute; top:12px; right:12px; width:32px; height:32px; border-radius:50%;
    background:rgba(255,249,244,.88); border:none; cursor:pointer; font-size:17px;
    display:flex; align-items:center; justify-content:center; color:var(--brown-d);
    backdrop-filter:blur(4px); z-index:5; transition:background .15s;
  }
  .modal-close:hover { background:var(--warm); }

  .modal-body { padding:22px 22px 30px; }
  .modal-tag { display:inline-block; font-size:10px; font-weight:500; letter-spacing:.8px; text-transform:uppercase; padding:4px 12px; border-radius:100px; margin-bottom:12px; }
  .modal-name { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:600; color:var(--brown-d); line-height:1.15; margin-bottom:8px; }
  .modal-desc { font-size:13.5px; color:var(--mid); font-weight:300; line-height:1.75; margin-bottom:20px; }
  .modal-divider { height:1px; background:var(--sand2); margin-bottom:18px; }
  .modal-meta { display:flex; align-items:center; justify-content:space-between; }
  .modal-price { font-family:'Cormorant Garamond',serif; font-size:30px; font-weight:600; color:var(--acc); }
  .modal-cal-wrap { display:flex; flex-direction:column; align-items:flex-end; gap:4px; }
  .modal-cal { font-size:12px; color:var(--muted); background:var(--sand); padding:4px 12px; border-radius:100px; }
  .modal-cat { font-size:11px; color:var(--muted); text-transform:capitalize; }

  .modal-note { margin-top:18px; background:var(--acc-l); border-radius:12px; padding:12px 14px;
    font-size:12px; color:var(--acc); line-height:1.6; font-weight:400; }
`;

const categories = [
  { key:"semua",      label:"Semua",      icon:"✦" },
  { key:"coffee",     label:"Coffee",     icon:"☕" },
  { key:"non-coffee", label:"Non-Coffee", icon:"🧋" },
  { key:"food",       label:"Makanan",    icon:"🍽" },
  { key:"dessert",    label:"Dessert",    icon:"🍰" },
  { key:"snack",      label:"Snack",      icon:"🥐" },
];

function fileNameFromPath(p) {
  const last = p.split("/").pop() || "";
  return last.replace(/\.[^.]+$/, "");
}

const menuMetaByFileName = {
  "espresso": {
    cat: "coffee",
    desc: "Single origin Ethiopia, double shot, crema tebal dan aroma floral khas yang memanjakan hidung",
    price: 28000,
    tag: "Best Seller",
  },
  "caramel latte": {
    cat: "coffee",
    desc: "Susu oat segar, sirup karamel buatan sendiri, sea salt foam lembut di atasnya",
    price: 42000,
    tag: "Popular",
  },
  "matcha": {
    cat: "coffee",
    desc: "Matcha ceremonial grade dari Uji, ditambah espresso shot yang intens dan menggiurkan",
    price: 45000,
    tag: "New",
  },
  "brew float": {
    cat: "coffee",
    desc: "Cold brew 18 jam yang smooth, es krim vanilla bean premium, topping whipped cream segar",
    price: 48000,
    tag: null,
  },
  "rose corrado": {
    cat: "coffee",
    desc: "Espresso ristretto, air mawar segar, susu full cream steamed lembut — elegan di setiap tegukan",
    price: 38000,
    tag: "Spesial",
  },
  "cappucino": {
    cat: "coffee",
    desc: "Double shot espresso, busa susu lembut halus sempurna, sirup hazelnut premium Italia",
    price: 40000,
    tag: "Popular",
  },
  "milk tea": {
    cat: "non-coffee",
    desc: "Teh Thailand asli blend khusus, susu kental manis, tapioca pearl segar kenyal menyenangkan",
    price: 35000,
    tag: "Popular",
  },
  "lemonade": {
    cat: "non-coffee",
    desc: "Yuzu segar diperas langsung, sparkling water, madu asli, daun mint peppermint menyegarkan",
    price: 32000,
    tag: "Refreshing",
  },
  "taro": {
    cat: "non-coffee",
    desc: "Talas Okinawa pilihan, susu oat, swirl butterfly pea yang cantik berwarna ungu natural",
    price: 42000,
    tag: "New",
  },
  "mango smoothies": {
    cat: "non-coffee",
    desc: "Mangga Alphonso pilihan terbaik, yogurt Greek creamy, kapulaga, kelopak mawar harum",
    price: 40000,
    tag: null,
  },
  "strawberry": {
    cat: "non-coffee",
    desc: "Hojicha panggang beraroma kacang yang khas, susu segar, coulis stroberi alami segar merah",
    price: 43000,
    tag: "New",
  },
  "avocado toast": {
    cat: "food",
    desc: "Sourdough artisan panggang, alpukat smashed bumbu lemon, telur poached sempurna, micro herbs segar",
    price: 65000,
    tag: "Best Seller",
  },
  "truffle mushroom": {
    cat: "food",
    desc: "Ciabatta renyah garing, jamur liar tumis bawang putih, truffle oil mewah, parmesan shaved tipis",
    price: 58000,
    tag: null,
  },
  "acai power": {
    cat: "food",
    desc: "Acai blended kental, granola crunchy buatan sendiri, buah segar musiman, kelapa parut, madu lebah hutan",
    price: 72000,
    tag: "Healthy",
  },
  "croissat sandwich": {
    cat: "food",
    desc: "Croissant mentega segar dipanggang, turkey ham premium, brie leleh creamy, saus dijon pedas manis",
    price: 55000,
    tag: "Popular",
  },
  "nasi goreng truffle": {
    cat: "food",
    desc: "Nasi wangi premium dimasak wajan panas, truffle oil mewah, telur mata sapi runny, acar timun segar",
    price: 68000,
    tag: "Spesial",
  },
  "basque chesscake": {
    cat: "dessert",
    desc: "San Sebastian style autentik, bagian tengah creamy bergetar lembut, permukaan caramelized sempurna kehitaman",
    price: 52000,
    tag: "Best Seller",
  },
  "tiramisu": {
    cat: "dessert",
    desc: "Ladyfinger savoiardi ber-espresso kuat, krim mascarpone lembut mengembang, taburan cocoa premium Valrhona",
    price: 48000,
    tag: "Popular",
  },
  "matcha cake": {
    cat: "dessert",
    desc: "Lapisan sponge matcha halus bergantian, ganache dark chocolate 70% premium, butter cream matcha",
    price: 55000,
    tag: "New",
  },
  "brulee": {
    cat: "dessert",
    desc: "Custard vanilla pod Madagaskar klasik Prancis, kulit gula karamel renyah tipis dibakar langsung",
    price: 45000,
    tag: null,
  },
  "croissat butter": {
    cat: "snack",
    desc: "Berlapis mentega Prancis AOP pilihan, fermentasi 3 hari, dipanggang segar hangat setiap pagi hari",
    price: 32000,
    tag: "Best Seller",
  },
  "cheese scone": {
    cat: "snack",
    desc: "Scone hangat mengembang, keju cheddar matured tajam, krim clotted, selai stroberi buatan rumah",
    price: 28000,
    tag: null,
  },
  "banana muffin": {
    cat: "snack",
    desc: "Pisang cavendish matang manis, walnut panggang renyah, streusel brown sugar kasar bertekstur di atas",
    price: 25000,
    tag: "Popular",
  },
  "salmon baggel": {
    cat: "snack",
    desc: "Bagel sesame empuk, salmon smoked cold-smoked, cream cheese lembut, caper, dill segar harum",
    price: 58000,
    tag: "Spesial",
  },
};

const menuItems = Object.entries(coffeImageModules)
  .map(([path, url], idx) => {
    const fileName = fileNameFromPath(path);
    const meta = menuMetaByFileName[fileName.toLowerCase()] || {};

    return {
      id: idx + 1,
      cat: meta.cat || "coffee",
      name: fileName,
      desc: meta.desc || "",
      price: meta.price ?? null,
      tag: meta.tag ?? null,
      img: url,
      cal: meta.cal || "",
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const catIcon = { coffee:"☕","non-coffee":"🧋",food:"🍽",dessert:"🍰",snack:"🥐" };
const catLabel = { coffee:"Coffee","non-coffee":"Non-Coffee",food:"Makanan",dessert:"Dessert",snack:"Snack" };
const tagCls   = { "Best Seller":"t-bs","Popular":"t-pop","New":"t-new","Healthy":"t-hlt","Refreshing":"t-ref","Spesial":"t-spc" };

function formatIDR(p){ return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(p); }

/* ── MODAL ── */
function Modal({ item, onClose }){
  useEffect(()=>{
    const handler = e => { if(e.key==="Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return ()=>{ document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  },[onClose]);

  return (
    <div className="modal-bg" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="modal">

        {/* Image */}
        <div className="modal-img">
          {item.img
            ? <img src={item.img} alt={item.name}/>
            : <div className="modal-iph">
                <div className="modal-iph-ic">{catIcon[item.cat]||"📷"}</div>
                <span className="modal-iph-txt">Foto Menu</span>
              </div>
          }
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {item.tag && <span className={`modal-tag ${tagCls[item.tag]||""}`}>{item.tag}</span>}
          <div className="modal-name serif">{item.name}</div>
          {!!item.desc && <div className="modal-desc">{item.desc}</div>}
          <div className="modal-divider"/>
          <div className="modal-meta">
            <div className="modal-price serif">{item.price != null ? formatIDR(item.price) : ""}</div>
            <div className="modal-cal-wrap">
              {!!item.cal && <div className="modal-cal">🔥 {item.cal}</div>}
              <div className="modal-cat">{catIcon[item.cat]} {catLabel[item.cat]}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── CARD ── */
function Card({ item, delay, onClick }){
  return (
    <div className="card" style={{ animationDelay:`${delay*45}ms` }} onClick={onClick}>

      <div className="iw">
        {item.img
          ? <img src={item.img} alt={item.name}/>
          : <div className="iph">
              <div className="iph-ic">{catIcon[item.cat]||"📷"}</div>
              <span className="iph-txt">Foto Menu</span>
            </div>
        }
        {item.tag && <span className={`tag ${tagCls[item.tag]||""}`}>{item.tag}</span>}
      </div>
      <div className="cb">
        <div className="cn serif">{item.name}</div>
        {!!item.desc && <div className="cd">{item.desc}</div>}
        {(item.price != null || item.cal) && (
          <div className="cf2">
            {item.price != null && <div className="cp serif">{formatIDR(item.price)}</div>}
            {!!item.cal && <div className="ccal">{item.cal}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── MAIN ── */
export default function CafeMenu(){
  const [tab, setTab]       = useState("semua");
  const [q, setQ]           = useState("");
  const [selected, setSel]  = useState(null);

  const filtered = useMemo(()=>{
    let list = tab==="semua" ? menuItems : menuItems.filter(i=>i.cat===tab);
    if(q.trim()){
      const lq=q.toLowerCase();
      list=list.filter(i=>i.name.toLowerCase().includes(lq)||i.desc.toLowerCase().includes(lq)||(i.tag&&i.tag.toLowerCase().includes(lq)));
    }
    return list;
  },[tab,q]);

  const count = key => key==="semua" ? menuItems.length : menuItems.filter(i=>i.cat===key).length;
  const searching = q.trim().length>0;
  const cur = categories.find(c=>c.key===tab);

  return (
    <div className="cr">
      <style>{STYLES}</style>

      {/* HEADER */}
      <header className="hd">
        <div className="hd-in">
          <div>
            <div className="logo-name">Astakira cafe</div>
            <div className="logo-sub">Specialty Café</div>
          </div>
          <div className="sw">
            <span className="si">🔍</span>
            <input className="sinp" placeholder="Cari menu…" value={q} onChange={e=>setQ(e.target.value)}/>
          </div>
        </div>
      </header>

      {/* HERO */}
      {!searching && (
        <div className="hero">
          <div className="hero-eye"><span/>Menu Kami<span/></div>
          <h1 className="hero-title serif">Taste the <em>Artistry</em></h1>
          <p className="hero-desc">Setiap sajian dibuat dengan bahan pilihan terbaik dan penuh cinta — dari biji kopi hingga dessert yang memanjakan.</p>
        </div>
      )}

      {/* TABS */}
      <div className="tb-wrap">
        <div className="tb">
          {categories.map(c=>(
            <button key={c.key} className={`tbb ${tab===c.key?"act":""}`}
              onClick={()=>{ setTab(c.key); setQ(""); }}>
              {c.icon} {c.label}
              <span className="tbc">{count(c.key)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <main className="main">
        {searching
          ? <div className="sbanner">🔍 {filtered.length} hasil untuk "<strong>{q}</strong>"</div>
          : <div className="sh">
              <h2 className="st serif">{cur?.icon} {cur?.label==="Semua"?"Semua Menu":cur?.label}</h2>
              <span className="ss">{filtered.length} item</span>
            </div>
        }

        {filtered.length===0
          ? <div className="empty">
              <div className="empty-ic">🔍</div>
              <div className="empty-t serif">Menu tidak ditemukan</div>
              <div className="empty-s">Coba kata kunci lain atau lihat semua menu</div>
            </div>
          : <div className="grid">
              {filtered.map((item,i)=>(
                <Card key={item.id} item={item} delay={i} onClick={()=>setSel(item)}/>
              ))}
            </div>
        }
      </main>

      {/* FOOTER */}
      <footer className="foot">
        <p>
          <span style={{fontSize:10.5,opacity:.5}}>Maison Noir Café · Open daily 07.00 – 22.00 WIB</span>
        </p>
      </footer>

      {/* MODAL */}
      {selected && <Modal item={selected} onClose={()=>setSel(null)}/>}
    </div>
  );
}