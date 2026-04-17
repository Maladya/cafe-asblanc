import { useEffect, useState } from "react";
import QrPage from "./QrPage.jsx";

// ============================================================
// MAPPING GAMBAR BARU (dari data_baru.zip)
// Tempatkan semua foto di folder: src/assets/menu/
// Nama file sesuai dengan key di bawah ini
// ============================================================
import img_01_drink from "./assets/menu/01-drink-p1.png";
import img_02_drink from "./assets/menu/02-drink-p2.png";
import img_03_drink from "./assets/menu/03-drink-p3.png";
import img_05_food from "./assets/menu/05-food-p2.png";
import img_12_menu from "./assets/menu/12-menu-p1.png";
import img_13_menu from "./assets/menu/13-menu-p2.png";
import img_14_menu from "./assets/menu/14-menu-p3.png";
import img_15_menu from "./assets/menu/15-menu-p4.png";
import img_16_menu from "./assets/menu/16-menu-p5.png";
import img_17_menu from "./assets/menu/17-menu-p6.png";
import img_18_menu from "./assets/menu/18-menu-p7.png";
import img_19_menu from "./assets/menu/19-menu-p8.png";
import img_20_menu from "./assets/menu/20-menu-p9.png";
import img_21_menu from "./assets/menu/21-menu-p10.png";
import img_23_menu from "./assets/menu/23-menu-p12.png";
import img_24_menu from "./assets/menu/24-menu-p13.png";
import img_25_menu from "./assets/menu/25-menu-p14.png";
import img_26_menu from "./assets/menu/26-menu-p15.png";
import img_27_menu from "./assets/menu/27-menu-p16.png";
import img_28_menu from "./assets/menu/28-menu-p17.png";
import img_29_menu from "./assets/menu/29-menu-p18.png";

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
    tag: ["Hot", "Classic"],
    description: "Espresso murni, bold dan intense untuk kamu yang suka kopi pekat.",
    image: img_01_drink,
  },
  {
    id: 2,
    name: "Americano",
    price: 22000,
    category: "Coffee",
    tag: ["Hot", "Iced"],
    description: "Espresso yang diencerkan dengan air panas, rasa kopi yang bersih dan ringan.",
    image: img_01_drink,
  },
  {
    id: 3,
    name: "Magic Coffee",
    price: 26000,
    category: "Coffee",
    tag: ["Hot", "Iced", "Signature"],
    description: "Double ristretto dengan susu dingin — creamy, smooth, dan nendang.",
    image: img_02_drink,
  },
  {
    id: 4,
    name: "Cappucino",
    price: 26000,
    category: "Coffee",
    tag: ["Hot", "Iced"],
    description: "Espresso, steamed milk, dan foam tebal yang lembut di setiap tegukan.",
    image: img_02_drink,
  },
  {
    id: 5,
    name: "Caffe Latte",
    price: 24000,
    category: "Coffee",
    tag: ["Hot", "Iced"],
    description: "Perpaduan espresso dan susu segar yang halus dan creamy.",
    image: img_03_drink,
  },
  {
    id: 6,
    name: "Pop Brulée",
    price: 28000,
    category: "Coffee",
    tag: ["Iced", "Signature"],
    description: "Latte dengan sentuhan caramel brulée yang manis dan smoky.",
    image: img_03_drink,
  },
  {
    id: 7,
    name: "Coffee Lemon",
    price: 24000,
    category: "Coffee",
    tag: ["Iced", "Refreshing"],
    description: "Americano bertemu lemon segar — kombinasi unik yang menyegarkan.",
    image: img_12_menu,
  },
  {
    id: 8,
    name: "Special Beans",
    price: 35000,
    category: "Coffee",
    tag: ["Hot", "Premium", "Single Origin"],
    description: "Biji kopi pilihan premium, diseduh dengan metode terbaik untuk kamu.",
    image: img_12_menu,
  },
  {
    id: 9,
    name: "Regular Beans",
    price: 28000,
    category: "Coffee",
    tag: ["Hot", "Manual Brew"],
    description: "Kopi manual brew dengan biji berkualitas, cocok untuk penikmat sejati.",
    image: img_13_menu,
  },

  // ── NON-COFFEE ───────────────────────────────────────────
  {
    id: 10,
    name: "Red Velvet",
    price: 26000,
    category: "Non-Coffee",
    tag: ["Iced", "Sweet"],
    description: "Minuman berbasis red velvet yang kaya rasa dengan sentuhan creamy.",
    image: img_13_menu,
  },
  {
    id: 11,
    name: "Matcha",
    price: 26000,
    category: "Non-Coffee",
    tag: ["Hot", "Iced"],
    description: "Matcha grade premium, earthy dan sedikit pahit, seimbang sempurna.",
    image: img_14_menu,
  },
  {
    id: 12,
    name: "Chocolatte",
    price: 26000,
    category: "Non-Coffee",
    tag: ["Hot", "Iced"],
    description: "Cokelat susu rich dan lembut, pilihan tepat untuk hari santai.",
    image: img_14_menu,
  },
  {
    id: 13,
    name: "Matcha AS Blanc",
    price: 28000,
    category: "Non-Coffee",
    tag: ["Iced", "Signature"],
    description: "Matcha spesial ala AS Blanc dengan blend susu pilihan.",
    image: img_15_menu,
  },
  {
    id: 14,
    name: "Kopi Susu Aren",
    price: 26000,
    category: "Non-Coffee",
    tag: ["Iced", "Local"],
    description: "Kopi susu dengan gula aren asli, manis alami yang khas.",
    image: img_15_menu,
  },
  {
    id: 15,
    name: "Kopi Susu AS",
    price: 28000,
    category: "Non-Coffee",
    tag: ["Iced", "Signature"],
    description: "Racikan kopi susu andalan AS Blanc, creamy dengan rasa yang balanced.",
    image: img_16_menu,
  },
  {
    id: 16,
    name: "Peach Tea",
    price: 18000,
    category: "Non-Coffee",
    tag: ["Iced", "Fruity"],
    description: "Teh segar dengan aroma dan rasa peach yang manis menyegarkan.",
    image: img_16_menu,
  },
  {
    id: 17,
    name: "Lemon Tea",
    price: 18000,
    category: "Non-Coffee",
    tag: ["Iced", "Refreshing"],
    description: "Teh dengan perasan lemon segar, asam manis yang pas.",
    image: img_17_menu,
  },
  {
    id: 18,
    name: "Lychee Tea",
    price: 18000,
    category: "Non-Coffee",
    tag: ["Iced", "Fruity"],
    description: "Teh beraroma lychee yang ringan dan menyegarkan di hari panas.",
    image: img_17_menu,
  },

  // ── SIGNATURE DRINK ──────────────────────────────────────
  {
    id: 19,
    name: "Straw Pink AS",
    price: 26000,
    category: "Signature",
    tag: ["Iced", "Signature", "Instagram-Worthy"],
    description: "Minuman signature pink yang cantik dan segar, favorit para pelanggan.",
    image: img_18_menu,
  },
  {
    id: 20,
    name: "Black Blanc",
    price: 28000,
    category: "Signature",
    tag: ["Iced", "Signature"],
    description: "Minuman hitam misterius dengan rasa bold yang tak terlupakan.",
    image: img_18_menu,
  },
  {
    id: 21,
    name: "Tea Corn",
    price: 26000,
    category: "Signature",
    tag: ["Iced", "Unique"],
    description: "Perpaduan unik teh dan jagung manis, surprisingly delicious!",
    image: img_19_menu,
  },
  {
    id: 22,
    name: "Berry Sweet AS",
    price: 28000,
    category: "Signature",
    tag: ["Iced", "Signature", "Fruity"],
    description: "Mixed berry yang manis dan segar dalam satu gelas cantik.",
    image: img_19_menu,
  },
  {
    id: 23,
    name: "Black Pink",
    price: 28000,
    category: "Signature",
    tag: ["Iced", "Signature"],
    description: "Kontras hitam dan pink yang dramatis — enak dan instagrammable.",
    image: img_20_menu,
  },
  {
    id: 24,
    name: "Sweet Blanc",
    price: 26000,
    category: "Signature",
    tag: ["Iced", "Signature"],
    description: "Signature drink AS Blanc yang lembut, manis, dan creamy sempurna.",
    image: img_20_menu,
  },

  // ── FOOD ─────────────────────────────────────────────────
  {
    id: 25,
    name: "Nasi Goreng AS",
    price: 28000,
    category: "Food",
    tag: ["Rice", "Best Seller"],
    description: "Nasi goreng racikan AS Blanc dengan bumbu rahasia yang khas dan lezat.",
    image: img_05_food,
  },
  {
    id: 26,
    name: "Nasi Goreng Cajo",
    price: 28000,
    category: "Food",
    tag: ["Rice", "Spicy"],
    description: "Nasi goreng dengan cabe rawit hijau ala Cajo, pedas dan nagih.",
    image: img_05_food,
  },
  {
    id: 27,
    name: "Mie Goreng AS",
    price: 26000,
    category: "Food",
    tag: ["Noodle"],
    description: "Mie goreng dengan bumbu spesial AS Blanc, gurih dan menggugah selera.",
    image: img_21_menu,
  },
  {
    id: 28,
    name: "Sop Iga",
    price: 48000,
    category: "Food",
    tag: ["Soup", "Premium"],
    description: "Iga sapi empuk dalam kuah kaldu bening yang kaya rempah.",
    image: img_21_menu,
  },
  {
    id: 29,
    name: "Iga Bakar",
    price: 48000,
    category: "Food",
    tag: ["Grilled", "Premium"],
    description: "Iga bakar dengan marinasi bumbu spesial, smoky dan juicy sempurna.",
    image: img_23_menu,
  },
  {
    id: 30,
    name: "Nasi Timbel Ayam Kremes",
    price: 48000,
    category: "Food",
    tag: ["Rice", "Traditional"],
    description: "Nasi timbel lengkap dengan ayam kremes renyah dan lauk pelengkap.",
    image: img_23_menu,
  },
  {
    id: 31,
    name: "Nasi Timbel Ayam Bakar",
    price: 48000,
    category: "Food",
    tag: ["Rice", "Grilled"],
    description: "Nasi timbel dengan ayam bakar bumbu tradisional yang meresap sempurna.",
    image: img_24_menu,
  },
  {
    id: 32,
    name: "Taichan Ayam",
    price: 26000,
    category: "Food",
    tag: ["Spicy", "Popular"],
    description: "Ayam taichan gaya AS Blanc — pedas, asam, dan bikin nagih.",
    image: img_24_menu,
  },
  {
    id: 33,
    name: "Chicken Rice Bowl",
    price: 26000,
    category: "Food",
    tag: ["Rice Bowl"],
    description: "Rice bowl ayam dengan saus pilihan di atas nasi putih hangat.",
    image: img_25_menu,
  },
  {
    id: 34,
    name: "Beef Rice Bowl",
    price: 28000,
    category: "Food",
    tag: ["Rice Bowl", "Premium"],
    description: "Irisan daging sapi lembut dengan saus teriyaki di atas nasi panas.",
    image: img_25_menu,
  },
  {
    id: 35,
    name: "Spaghetti Carbonara",
    price: 28000,
    category: "Food",
    tag: ["Pasta"],
    description: "Spaghetti creamy ala carbonara dengan bacon dan parmesan pilihan.",
    image: img_26_menu,
  },
  {
    id: 36,
    name: "AS Platter",
    price: 36000,
    category: "Food",
    tag: ["Sharing", "Best Seller"],
    description: "Platter berbagi khas AS Blanc — aneka snack dan lauk dalam satu nampan.",
    image: img_26_menu,
  },

  // ── SNACK ────────────────────────────────────────────────
  {
    id: 37,
    name: "Tahu Cabe Garam",
    price: 16000,
    category: "Snack",
    tag: ["Spicy", "Local"],
    description: "Tahu goreng crispy dengan taburan cabe dan garam yang gurih.",
    image: img_27_menu,
  },
  {
    id: 38,
    name: "Cireng",
    price: 16000,
    category: "Snack",
    tag: ["Local", "Crispy"],
    description: "Cireng aci goreng renyah di luar, kenyal di dalam, cocok buat ngemil.",
    image: img_27_menu,
  },
  {
    id: 39,
    name: "Fire Wings",
    price: 26000,
    category: "Snack",
    tag: ["Spicy", "Chicken"],
    description: "Sayap ayam crispy dengan saus pedas menyala yang bikin keringetan.",
    image: img_28_menu,
  },
  {
    id: 40,
    name: "Pisang Goreng Classic",
    price: 18000,
    category: "Snack",
    tag: ["Sweet", "Traditional"],
    description: "Pisang goreng klasik yang renyah di luar dan lembut manis di dalam.",
    image: img_28_menu,
  },
  {
    id: 41,
    name: "Pisang Keju AS",
    price: 20000,
    category: "Snack",
    tag: ["Sweet", "Cheese"],
    description: "Pisang goreng dengan lelehan keju melted di atasnya, comfort snack terbaik.",
    image: img_29_menu,
  },
  {
    id: 42,
    name: "Donut AS",
    price: 16000,
    category: "Snack",
    tag: ["Sweet", "Baked"],
    description: "Donut lembut khas AS Blanc dengan topping gula halus dan glaze.",
    image: img_29_menu,
  },
  {
    id: 43,
    name: "Churros",
    price: 20000,
    category: "Snack",
    tag: ["Sweet", "Crispy"],
    description: "Churros renyah dengan taburan gula kayu manis, cocok buat kamu yang suka manis.",
    image: img_29_menu,
  },
];

// KATEGORI
// ============================================================
const categories = ["All", "Coffee", "Non-Coffee", "Signature", "Food", "Snack"];

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

  const filtered = menuData.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="app">
      {/* ── HEADER ── */}
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-main">AS Blanc</span>
            <span className="brand-sub">Coffee &amp; House</span>
          </div>
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
                key={item.id}
                className="card"
                onClick={() => setSelectedItem(item)}
              >
                <div className="card-img-wrap">
                  <img src={item.image} alt={item.name} className="card-img" />
                  <span className="card-category">{item.category}</span>
                </div>
                <div className="card-body">
                  <h3 className="card-name">{item.name}</h3>
                  <p className="card-desc">{item.description}</p>
                  <div className="card-tags">
                    {item.tag.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
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
            <img src={selectedItem.image} alt={selectedItem.name} className="modal-img" />
            <div className="modal-body">
              <span className="modal-cat">{selectedItem.category}</span>
              <h2 className="modal-name">{selectedItem.name}</h2>
              <p className="modal-desc">{selectedItem.description}</p>
              <div className="modal-tags">
                {selectedItem.tag.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <p className="modal-price">{formatPrice(selectedItem.price)}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── STYLES ── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cream: #faf6f0;
          --brown-dark: #3b1f0e;
          --brown-mid: #7b4a2b;
          --brown-light: #c4956a;
          --gold: #d4a843;
          --white: #ffffff;
          --gray: #888;
          --text: #2d1b0e;
          --shadow: 0 4px 20px rgba(59,31,14,0.12);
        }

        body { background: var(--cream); font-family: 'Georgia', serif; color: var(--text); }

        /* HEADER */
        .header {
          background: linear-gradient(135deg, var(--brown-dark) 0%, var(--brown-mid) 100%);
          padding: 32px 20px 24px;
          text-align: center;
        }
        .brand { display: flex; align-items: baseline; justify-content: center; gap: 10px; }
        .brand-main {
          font-size: 2.4rem;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 2px;
          font-family: 'Georgia', serif;
        }
        .brand-sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.75);
          letter-spacing: 3px;
          text-transform: uppercase;
          font-family: 'Georgia', serif;
        }
        .brand-tagline {
          color: rgba(255,255,255,0.5);
          font-size: 0.8rem;
          margin-top: 6px;
          letter-spacing: 1px;
          font-style: italic;
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
        .card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(59,31,14,0.18); }

        .card-img-wrap { position: relative; }
        .card-img { width: 100%; height: 160px; object-fit: cover; display: block; }
        .card-category {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(59,31,14,0.8);
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
          background: #fef3e2;
          color: var(--brown-mid);
          font-size: 0.62rem;
          padding: 2px 7px;
          border-radius: 50px;
          font-weight: 600;
          border: 1px solid #f0d9b5;
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
        .modal-img { width: 100%; height: 240px; object-fit: cover; display: block; }
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