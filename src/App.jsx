import { useEffect, useState } from "react";
import QrPage from "./QrPage.jsx";
import asblanc_logo from "./assets/asblanc.jpeg";

// ============================================================
// MAPPING GAMBAR BARU (dari data_baru.zip)
// Tempatkan semua foto di folder: src/assets/menu/
// Nama file sesuai dengan key di bawah ini
// ============================================================

import beef_rice_bowl from "./assets/menu/beef rice bowl.png";
import berry_sweet_as from "./assets/menu/berry sweet as.png";
import black_blanc from "./assets/menu/black blanc.png";
import black_pink from "./assets/menu/black pink.png";
import chese_roll_latte from "./assets/menu/chese rollLatte.png";
import chicken_rice_bowl from "./assets/menu/chiken rice bowl.png";
import coklat from "./assets/menu/Coklat.png";
import kopi_susu_aren from "./assets/menu/Kopi Susu Aren.png";
import kopi_susu_as from "./assets/menu/Kopi Susu As.png";
import lemon_tea from "./assets/menu/lemon tea.png";
import lychee_tea from "./assets/menu/lychee tea.png";
import matcha_latte from "./assets/menu/Matcha Latte.png";
import matcha from "./assets/menu/Matcha.png";
import nasi_ayam_rempah from "./assets/menu/nasi ayam rempah.png";
import nasi_goreng_cajo from "./assets/menu/nasi goreng cajo.png";
import chiken_fire_wings from "./assets/menu/chiken_fire_wings.png";
import churros_as from "./assets/menu/churros_as.png";
import donut_as from "./assets/menu/donut_as.png";
import iga_bakar from "./assets/menu/iga_bakar.png";
import mie_goreng_as from "./assets/menu/mie_goreng_as.png";
import nasi_ayam_bakar from "./assets/menu/nasi_ayam_bakar.png";
import nasi_ayam_kremes from "./assets/menu/nasi_ayam_kremes.png";
import pisang_keju_as from "./assets/menu/pisang_keju_as.png";
import pisang_keju_clasic from "./assets/menu/pisang_keju_clasic.png";
import platter_as from "./assets/menu/platter_as.png";
import sop_iga from "./assets/menu/sop_iga.png";
import taichan from "./assets/menu/taichan.png";
import tahu_cabe_garam from "./assets/menu/tahu_cabe_garam.png";
import peach_tea from "./assets/menu/peach tea.png";
import red_velvet from "./assets/menu/Red Velvet.png";
import straw_pink_as from "./assets/menu/straw pink as.png";
import sweet_blanc from "./assets/menu/sweet blanc.png";
import tea_corn from "./assets/menu/tea corn.png";
import cireng from "./assets/menu/cireng.png";
import spaghetti from "./assets/menu/spaghetti_carbonara.png";
import pop_brule from "./assets/menu/POP BRULEE.png";
import nasi_goreng_as from "./assets/menu/NASI GORENG AS.png";
import coffe_lemon from "./assets/menu/COFFE_LEMON.png";
import magic_coffe from "./assets/menu/MAGIC_COFFE.png";
import americano from "./assets/menu/AMERICANO.png";  
import latte from "./assets/menu/COFFE.jpg"

const DEFAULT_MENU_IMAGE =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#5A5B47"/>
          <stop offset="1" stop-color="#3E3F31"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg)"/>
      <rect x="60" y="60" width="680" height="480" rx="28" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)"/>
      <g fill="#E8DEB8" font-family="Georgia, serif" text-anchor="middle">
        <text x="400" y="300" font-size="40" font-weight="700">AS Blanc</text>
        <text x="400" y="350" font-size="18" opacity="0.9"></text>
      </g>
    </svg>`
  );

// ============================================================
// DATA MENU AS BLANC COFFEE & HOUSE
// ============================================================
const menuData = [
  // ── COFFEE ──────────────────────────────────────────────
  {
    id: 1,
    name: "Espresso",
    price: 18000,
    category: "Coffee",
    // tag: ["Hot", "Classic"],
    image: DEFAULT_MENU_IMAGE,
  },
  {
    id: 2,
    name: "Americano",
    price: 22000,
    category: "Coffee",
    tag: [ "Iced","Hot"],
    image: americano,
  },
  {
    id: 3,
    name: "Magic Coffee",
    price: 26000,
    category: "Coffee",
    tag: ["Iced","Hot"],
    image: magic_coffe,
  },
  {
    id: 4,
    name: "Cappucino",
    price: 26000,
    category: "Coffee",
    tag: ["Iced","Hot"],
    image: latte,
  },
  {
    id: 5,
    name: "Caffe Latte",
    price: 24000,
    category: "Coffee",
    tag: ["Iced","Hot"],
    image: latte,
  },
  {
    id: 6,
    name: "Pop Brulée",
    price: 28000,
    category: "Coffee",
    // tag: ["Iced", "Signature"],
    image: pop_brule  ,
  },
  {
    id: 7,
    name: "Coffee Lemon",
    price: 24000,
    category: "Coffee",
    // tag: ["Iced", "Refreshing"],
    image: coffe_lemon,
  },
  // ── Filter Coffee ───────────────────────────────────────────
  {
    id: 8,
    name: "Special Beans",
    price: 35000,
    category: "Filter Coffee",
    // tag: ["Hot", "Premium", "Single Origin"],
    image: DEFAULT_MENU_IMAGE,
  },
  {
    id: 9,
    name: "Regular Beans",
    price: 28000,
    category: "Filter Coffee",
    // tag: ["Hot", "Manual Brew"],
    image: DEFAULT_MENU_IMAGE,
  },
  // ── Tea ───────────────────────────────────────────
  {
    id: 10,
    name: "Lemon Tea",
    price: 18000,
    category: "Tea",
    // tag: ["Iced", "Sweet"],
    image: lemon_tea,
  },
  {
    id: 11,
    name: "Lychee Tea",
    price: 18000,
    category: "Tea",
    // tag: ["Hot", "Iced"],
    image: lychee_tea,
  },
  {
    id: 12,
    name: "Peach Tea",
    price: 18000,
    category: "Tea",
    // tag: ["Hot", "Iced"],
    image: peach_tea,
  },
  // ── NON-COFFEE ───────────────────────────────────────────
  {
    id: 13,
    name: "Red Velvet",
    price: 26000,
    category: "Non-Coffee",
    // tag: ["Iced", "Sweet"],
    image: red_velvet,
  },
  {
    id: 14,
    name: "Matcha",
    price: 26000,
    category: "Non-Coffee",
    // tag: ["Hot", "Iced"],
    image: matcha,
  },
  {
    id: 15,
    name: "Chocolatte",
    price: 26000,
    category: "Non-Coffee",
    // tag: ["Hot", "Iced"],
    image: coklat,
  },
  {
    id: 16,
    name: "Matcha AS Blanc",
    price: 28000,
    category: "Non-Coffee",
    // tag: ["Iced", "Signature"],
    image: matcha_latte,
  },
  // ── Milk Based ───────────────────────────────────────────
  {
    id: 17,
    name: "Kopi Susu Aren",
    price: 26000,
    category: "Milk Based",
    // tag: ["Iced", "Local"],
    image: kopi_susu_aren,
  },
  {
    id: 18,
    name: "Kopi Susu AS",
    price: 28000,
    category: "Milk Based",
    // tag: ["Iced", "Signature"],
    image: kopi_susu_as,
  },
  // ── SIGNATURE DRINK ──────────────────────────────────────
  {
    id: 19,
    name: "Straw Pink AS",
    price: 26000,
    category: "Signature Drink",
    // tag: ["Iced", "Signature", "Instagram-Worthy"],
    image: straw_pink_as,
  },
  {
    id: 20,
    name: "Black Blanc",
    price: 28000,
    category: "Signature Drink",
    // tag: ["Iced", "Signature"],
    image: black_blanc,
  },
  {
    id: 21,
    name: "Tea Corn",
    price: 26000,
    category: "Signature Drink",
    // tag: ["Iced", "Unique"],
    image: tea_corn,
  },
  {
    id: 22,
    name: "Berry Sweet AS",
    price: 28000,
    category: "Signature Drink",
    // tag: ["Iced", "Signature", "Fruity"],
    image: berry_sweet_as,
  },
  {
    id: 23,
    name: "Black Pink",
    price: 28000,
    category: "Signature Drink",
    // tag: ["Iced", "Signature"],
    image: black_pink,
  },
  {
    id: 24,
    name: "Sweet Blanc",
    price: 26000,
    category: "Signature Drink",
    // tag: ["Iced", "Signature"],
    image: sweet_blanc,
  },
  // ── MAIN COURSE ─────────────────────────────────────────────────
  {
    id: 25,
    name: "Nasi Goreng AS",
    price: 28000,
    category: "Main Corse",
    // tag: ["Rice", "Best Seller"],
    image: nasi_goreng_as,
  },
  {
    id: 26,
    name: "Nasi Goreng Cajo",
    price: 28000,
    category: "Main Corse",
    // tag: ["Rice", "Spicy"],
    image: nasi_goreng_cajo,
  },
  {
    id: 27,
    name: "Mie Goreng AS",
    price: 26000,
    category: "Main Corse",
    // tag: ["Noodle"],
    image: mie_goreng_as,
  },

  // ── House Favorites  ─────────────────────────────────────────────────
  {
    id: 28,
    name: "Iga Bakar",
    price: 48000,
    category: "House Favorites",
    tag: ["Iga Bakar", "Nasi","Sop kaldu","Sambal"],
    image: iga_bakar,
  },
  // ── Hot Meals  ─────────────────────────────────────────────────
  {
    id: 29,
    name: "Sop Iga",
    price: 48000,
    category: "Hot Meals",
    tag: ["Sop Iga", "Nasi", "Krupuk", "Sambal"],
    image: sop_iga,
  },
  {
    id: 30,
    name: "Taichan",
    price: 26000,
    category: "Hot Meals",
    tag: ["Ayam Taichan", "Nasi"],
    image: taichan,
  },
  // ── Nusantara  ─────────────────────────────────────────────────
  {
    id: 31,
    name: "Nasi Timbel Ayam Kremes",
    price: 48000,
    category: "Nusantara",
    tag: ["Nasi Timbel", "Ayam Kremes", "Tahu", "Cipe"],
    image: nasi_ayam_kremes,
  },
  {
    id: 32,
    name: "Nasi Timbel Ayam Bakar",
    price: 48000,
    category: "Nusantara",
    tag: ["Nasi Timbel", "Ayam Bakar", "Tahu", "Cipe"],
    image: nasi_ayam_bakar,
  },
  {
    id: 33,
    name: "Nasi Ayam Rempah",
    price: 35000,
    category: "Nusantara",
    tag: ["Nasi", "Ayam Rempah", "Kol goreng"],
    image: nasi_ayam_rempah,
  },
  // ── Bowl Series  ─────────────────────────────────────────────────
  {
    id: 33,
    name: "Chicken Rice Bowl",
    price: 26000,
    category: "Bowl Series",
    // tag: ["Rice Bowl"],
    image: chicken_rice_bowl,
  },
  {
    id: 34,
    name: "Beef Rice Bowl",
    price: 28000,
    category: "Bowl Series",
    // tag: ["Rice Bowl", "Premium"],
    image: beef_rice_bowl,
  },
  // ── Special Mood  ─────────────────────────────────────────────────
  {
    id: 35,
    name: "Spaghetti Carbonara",
    price: 28000,
    category: "Special Mood",
    // tag: ["Pasta"],
    image: spaghetti,
  },
  {
    id: 36,
    name: "AS Platter",
    price: 36000,
    category: "Special Mood",
    tag: ["Chiken Wings", "Onion Rings","Kentang Goreng","Sosis Goreng"],
    image: platter_as,
  },
  {
    id: 36,
    name: "Tahu Cabe Garam",
    price: 16000,
    category: "Special Mood",
    // tag: ["Spicy", "Local"],
    image: tahu_cabe_garam,
  },
  {
    id: 37,
    name: "Cireng",
    price: 16000,
    category: "Special Mood",
    // tag: ["Local", "Crispy"],
    image: cireng,
  },
  {
    id: 38,
    name: "Fire Wings",
    price: 26000,
    category: "Special Mood",
    // tag: ["Spicy", "Chicken"],
    image: chiken_fire_wings,
  },
  // ── SNACK ────────────────────────────────────────────────
  {
    id: 39,
    name: "Pisang Goreng Classic",
    price: 18000,
    category: "Snack",
    // tag: ["Sweet", "Traditional"],
    image: pisang_keju_clasic,
  },
  {
    id: 39,
    name: "Pisang Keju AS",
    price: 20000,
    category: "Snack",
    // tag: ["Sweet", "Cheese"],
    image: pisang_keju_as,
  },
  {
    id: 40,
    name: "Donut AS",
    price: 16000,
    category: "Snack",
    // tag: ["Sweet", "Baked"],
    image: donut_as,
  },
  {
    id: 41,
    name: "Churros",
    price: 20000,
    category: "Snack",
    // tag: ["Sweet", "Crispy"],
    image: churros_as,
  },
  {
    id: 41,
    name: "Cheese Roll",
    price: 22000,
    category: "Snack",
    // tag: ["Sweet", "Crispy"],
    image: chese_roll_latte,
  },
];

// KATEGORI
// ============================================================
const categories = ["All", "Coffee", "Filter Coffee", "Tea","Non-Coffee","Milk Based", "Signature Drink", "Main Corse", "House Favorites","Hot Meals","Nusantara","Bowl Series","Special Mood","Snack"];

const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

function usePathname() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return path;
}

// ============================================================
// KOMPONEN UTAMA
// ============================================================
function MenuApp() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewerSrc, setViewerSrc] = useState(null);

  const onMenuImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = DEFAULT_MENU_IMAGE;
  };

  const filtered = menuData.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="app">
      {/* ── HEADER ── */}
      <header className="header">
        <div className="header-inner">
          <img src={asblanc_logo} alt="AS Blanc Coffee & House" className="header-logo" />
          <p className="brand-tagline">Where Every Sip Tells a Story</p>
        </div>
      </header>

      {/* ── SEARCH ── */}
      <div className="search-wrap">
        <input
          type="text"
          className="search-input"
          placeholder="Cari menu favoritmu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="search-clear" onClick={() => setSearchQuery("")}>✕</button>
        )}
      </div>

      {/* ── KATEGORI TABS ── */}
      <div className="tabs-wrap">
        <div className="tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tab-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID MENU ── */}
      <main className="main">
        {filtered.length === 0 ? (
          <div className="empty">
            <p>Menu tidak ditemukan 😢</p>
          </div>
        ) : (
          <div className="grid">
            {filtered.map((item) => (
              <div
                key={`${item.id}-${item.name}`}
                className="card"
                onClick={() => setSelectedItem(item)}
              >
                <div className="card-img-wrap">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img mb-20"
                    onError={onMenuImageError}
                  />
                  <span className="card-category">{item.category}</span>
                </div>
                <div className="card-body">
                  <h3 className="card-name">{item.name}</h3>
                  {Array.isArray(item.tag) && item.tag.length > 0 && (
                    <div className="card-tags">
                      {item.tag.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                  )}
                  <p className="card-price">{formatPrice(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── MODAL DETAIL ── */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>✕</button>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="modal-img"
              onError={onMenuImageError}
              onClick={() => setViewerSrc(selectedItem.image)}
            />
            <div className="modal-body">
              <span className="modal-cat">{selectedItem.category}</span>
              <h2 className="modal-name">{selectedItem.name}</h2>
              {Array.isArray(selectedItem.tag) && selectedItem.tag.length > 0 && (
                <div className="modal-tags">
                  {selectedItem.tag.map((t) => (
                    <span key={t} className="tag"><div className="tag-text">{t}</div></span>
                  ))}
                </div>
              )}
              
              <p className="modal-price">{formatPrice(selectedItem.price)}</p>
            </div>
          </div>
        </div>
      )}

      {viewerSrc && (
        <div className="viewer-overlay" onClick={() => setViewerSrc(null)}>
          <div className="viewer" onClick={(e) => e.stopPropagation()}>
            <button className="viewer-close" onClick={() => setViewerSrc(null)}>✕</button>
            <img
              src={viewerSrc}
              alt=""
              className="viewer-img"
              onError={onMenuImageError}
            />
          </div>
        </div>
      )}

      {/* ── STYLES ── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cream: #5A5B47;
          --brown-dark: #3E3F31;
          --brown-mid: #E8DEB8;
          --brown-light: #A89F7A;
          --gold: #E8DEB8;
          --white: #ffffff;
          --gray: #888;
          --text: #E8DEB8;
          --shadow: 0 4px 20px rgba(62,63,49,0.18);
        }

        body { background: var(--cream); font-family: 'Georgia', serif; color: var(--text); }

        /* HEADER */
        .header {
          background: var(--cream);
          padding: 24px 20px 18px;
          text-align: center;
          border-bottom: 1px solid rgba(232, 222, 184, 0.18);
          box-shadow: 0 2px 16px rgba(0,0,0,0.18);
        }
        .header-logo {
          height: 80px;
          width: auto;
          object-fit: contain;
          display: block;
          margin: 0 auto;
          mix-blend-mode: multiply;
        }
        .brand-tagline {
          color: var(--brown-mid);
          font-size: 0.78rem;
          margin-top: 8px;
          letter-spacing: 2px;
          font-style: italic;
          opacity: 0.7;
        }

        /* SEARCH */
        .search-wrap {
          position: relative;
          max-width: 480px;
          margin: 20px auto 0;
          padding: 0 16px;
        }
        .search-input {
          width: 100%;
          padding: 12px 40px 12px 16px;
          border-radius: 50px;
          border: 2px solid var(--brown-light);
          background: var(--white);
          font-size: 0.95rem;
          color: var(--text);
          outline: none;
          transition: border-color 0.2s;
        }
        .search-input:focus { border-color: var(--brown-mid); }
        .search-clear {
          position: absolute;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--gray);
          cursor: pointer;
          font-size: 1rem;
        }

        /* TABS */
        .tabs-wrap {
          overflow-x: auto;
          padding: 16px 16px 0;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .tabs-wrap::-webkit-scrollbar { display: none; }
        .tabs {
          display: flex;
          gap: 8px;
          min-width: max-content;
          padding-bottom: 8px;
        }
        .tab-btn {
          padding: 8px 18px;
          border-radius: 50px;
          border: 2px solid var(--brown-light);
          background: transparent;
          color: var(--brown-mid);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          font-family: 'Georgia', serif;
        }
        .tab-btn.active, .tab-btn:hover {
          background: var(--brown-dark);
          border-color: var(--brown-dark);
          color: var(--gold);
        }

        /* MAIN */
        .main { padding: 20px 16px 40px; max-width: 1200px; margin: 0 auto; }

        /* GRID */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 16px;
        }
        @media (min-width: 480px) {
          .grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
        }

        /* CARD */
        .card {
          background: var(--white);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(62,63,49,0.18); }

        .card-img-wrap { position: relative; }
        .card-img { width: 100%; height: 160px; object-fit: cover; display: block; }
        .card-category {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(62,63,49,0.85);
          color: var(--gold);
          font-size: 0.65rem;
          padding: 3px 8px;
          border-radius: 50px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          backdrop-filter: blur(4px);
        }

        .card-body { padding: 12px; }
        .card-name { font-size: 0.95rem; font-weight: 700; color: var(--brown-dark); margin-bottom: 4px; }
        .card-desc {
          font-size: 0.75rem;
          color: var(--gray);
          line-height: 1.4;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px; }
        .tag {
          background: rgba(232, 222, 184, 0.12);
          color: var(--brown-mid);
          font-size: 0.62rem;
          padding: 2px 7px;
          border-radius: 50px;
          font-weight: 600;
          border: 1px solid rgba(232, 222, 184, 0.22);
        }
        .card-price {
          font-size: 1rem;
          font-weight: 700;
          color: var(--brown-mid);
        }

        /* EMPTY */
        .empty { text-align: center; padding: 60px 20px; color: var(--gray); font-size: 1rem; }

        /* MODAL */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.65);
          z-index: 100;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 20px;
          backdrop-filter: blur(4px);
        }
        @media (min-width: 600px) {
          .modal-overlay { align-items: center; }
        }
        .modal {
          background: var(--white);
          border-radius: 24px 24px 20px 20px;
          width: 100%;
          max-width: 460px;
          overflow: hidden;
          position: relative;
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .modal-close {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0,0,0,0.45);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 0.85rem;
          z-index: 10;
          backdrop-filter: blur(4px);
        }
        .modal-img { width: 100%; height: 320px; object-fit: cover; display: block; cursor: zoom-in; }
        .modal-body { padding: 20px; }
        .modal-cat {
          display: inline-block;
          background: var(--brown-dark);
          color: var(--gold);
          font-size: 0.65rem;
          padding: 3px 10px;
          border-radius: 50px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .modal-name { font-size: 1.4rem; font-weight: 700; color: var(--brown-dark); margin-bottom: 8px; }
        .modal-desc { font-size: 0.9rem; color: #555; line-height: 1.6; margin-bottom: 12px; }
        .modal-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
        .modal-price { font-size: 1.5rem; font-weight: 700; color: var(--brown-mid); }

        /* IMAGE VIEWER */
        .viewer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          backdrop-filter: blur(6px);
        }
        .viewer {
          position: relative;
          width: min(980px, 100%);
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .viewer-img {
          width: 100%;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.35);
          background: rgba(255,255,255,0.04);
        }
        .viewer-close {
          position: absolute;
          top: -10px;
          right: -10px;
          background: rgba(0,0,0,0.55);
          border: none;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 0.95rem;
          backdrop-filter: blur(4px);
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const path = usePathname();

  if (path === "/qr") {
    return <QrPage />;
  }

  return <MenuApp />;
}