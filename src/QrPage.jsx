import { useEffect, useMemo, useState } from "react";
import * as QRCode from "qrcode";

export default function QrPage() {
  const [value, setValue] = useState("https://localhost:5173");
  const [size, setSize] = useState(512);
  const [dataUrl, setDataUrl] = useState("");
  const [err, setErr] = useState("");

  const canGenerate = useMemo(() => value.trim().length > 0, [value]);

  useEffect(() => {
    let active = true;

    async function gen() {
      try {
        setErr("");
        if (!canGenerate) {
          setDataUrl("");
          return;
        }

        const url = await QRCode.toDataURL(value.trim(), {
          width: Number(size) || 512,
          margin: 1,
          errorCorrectionLevel: "M",
        });

        if (active) setDataUrl(url);
      } catch (e) {
        if (active) {
          setDataUrl("");
          setErr(e instanceof Error ? e.message : "Gagal membuat QR");
        }
      }
    }

    gen();

    return () => {
      active = false;
    };
  }, [value, size, canGenerate]);

  function download() {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qr.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <div style={{ minHeight: "100vh", background: "#faf7f2", color: "#2c1f14" }}>
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "28px 16px 64px",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 0.2 }}>QR Generator</div>
            <div style={{ fontSize: 12.5, opacity: 0.7, marginTop: 4 }}>
              Buat QR dari teks/URL lalu unduh sebagai PNG.
            </div>
          </div>
          <a href="/" style={{ fontSize: 13, color: "#c4824a", textDecoration: "none" }}>
            Kembali ke Menu
          </a>
        </div>

        <div
          className="qr-grid"
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "1.1fr .9fr",
            gap: 18,
          }}
        >
          <div
            style={{
              background: "#fff9f4",
              border: "1px solid #e2d9cc",
              borderRadius: 14,
              padding: 16,
            }}
          >
            <label style={{ display: "block", fontSize: 12.5, opacity: 0.8, marginBottom: 8 }}>
              Isi QR
            </label>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={6}
              style={{
                width: "100%",
                resize: "vertical",
                borderRadius: 12,
                border: "1.5px solid #e2d9cc",
                padding: "10px 12px",
                fontSize: 13.5,
                outline: "none",
                background: "#f0e9dd",
                color: "#3d2b1f",
              }}
              placeholder="Contoh: https://instagram.com/..."
            />

            <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12, flexWrap: "wrap" }}>
              <label style={{ fontSize: 12.5, opacity: 0.8 }}>Ukuran</label>
              <input
                type="number"
                min={128}
                max={2048}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                style={{
                  width: 120,
                  borderRadius: 12,
                  border: "1.5px solid #e2d9cc",
                  padding: "8px 10px",
                  fontSize: 13.5,
                  outline: "none",
                  background: "#f0e9dd",
                  color: "#3d2b1f",
                }}
              />

              <button
                type="button"
                onClick={download}
                disabled={!dataUrl}
                style={{
                  marginLeft: "auto",
                  border: "none",
                  cursor: dataUrl ? "pointer" : "not-allowed",
                  borderRadius: 999,
                  padding: "10px 14px",
                  fontSize: 13,
                  fontWeight: 600,
                  background: dataUrl ? "#c4824a" : "#e8c9a8",
                  color: "#fff",
                }}
              >
                Unduh QR
              </button>
            </div>

            {!!err && (
              <div style={{ marginTop: 12, color: "#9b2c2c", fontSize: 12.5 }}>
                {err}
              </div>
            )}
          </div>

          <div
            style={{
              background: "#fff9f4",
              border: "1px solid #e2d9cc",
              borderRadius: 14,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {dataUrl ? (
              <img
                src={dataUrl}
                alt="QR"
                style={{ width: "100%", maxWidth: 360, height: "auto", borderRadius: 12, background: "#fff" }}
              />
            ) : (
              <div style={{ textAlign: "center", opacity: 0.65, fontSize: 13.5 }}>
                Masukkan teks/URL untuk membuat QR.
              </div>
            )}
            {dataUrl && (
              <div style={{ fontSize: 12.5, opacity: 0.7, textAlign: "center" }}>
                Klik <b>Unduh QR</b> untuk menyimpan PNG.
              </div>
            )}
          </div>
        </div>

        <style>
          {`@media (max-width: 820px){
            .qr-grid { grid-template-columns: 1fr; }
          }`}
        </style>
      </div>
    </div>
  );
}
