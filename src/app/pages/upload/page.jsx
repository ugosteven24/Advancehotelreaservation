"use client";

import { useEffect, useState } from "react";
import { doc, writeBatch, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { buildDestinations } from "@/lib/destinations";

const CHUNK = 12; // 36 docs -> 3 batches (Firestore allows up to 500 writes per batch)

export default function UploadDestinationsPage() {
  const [items, setItems] = useState([]);
  const [collectionName, setCollectionName] = useState("destinations");
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(0);
  const [log, setLog] = useState([]);
  const [showJson, setShowJson] = useState(false);

  // Built after mount so the random images don't cause a hydration mismatch
  const generate = () => { setItems(buildDestinations()); setDone(0); setLog([]); };
  useEffect(generate, []);

  const addLog = (msg, type = "info") =>
    setLog((l) => [...l, { msg, type, t: new Date().toLocaleTimeString() }]);

  const upload = async () => {
    if (!confirmed || busy || items.length === 0) return;
    setBusy(true); setDone(0); setLog([]);
    addLog(`Uploading ${items.length} destinations to "${collectionName}"...`);

    try {
      for (let i = 0; i < items.length; i += CHUNK) {
        const batch = writeBatch(db);
        const part = items.slice(i, i + CHUNK);

        part.forEach((d) => {
          // Document id = slug, so running this twice updates instead of duplicating
          batch.set(doc(db, collectionName, d.slug), {
            ...d,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        });

        await batch.commit();
        setDone(i + part.length);
        addLog(`Saved ${part.map((d) => d.state).join(", ")}`, "ok");
      }
      addLog("Upload complete. Check the Firebase console.", "ok");
    } catch (err) {
      console.error(err);
      addLog(`Upload failed: ${err.code || err.message}`, "error");
    } finally {
      setBusy(false);
    }
  };

  const pct = items.length ? Math.round((done / items.length) * 100) : 0;

  return (
    <main style={s.page}>
      <div style={s.wrap}>
        <header style={s.header}>
          <span style={s.eyebrow}>Admin tool</span>
          <h1 style={s.h1}>Upload Nigerian State Destinations</h1>
          <p style={s.sub}>
            Writes {items.length || 36} destination documents (one per state) to Firestore.
            Each has 1 cover image and 7 random gallery images.
          </p>
        </header>

        <section style={s.card}>
          <div style={s.row}>
            <label style={s.label}>
              Firestore collection
              <input style={s.input} value={collectionName} disabled={busy}
                onChange={(e) => setCollectionName(e.target.value.trim())} />
            </label>
            <button style={s.ghost} onClick={generate} disabled={busy}>Shuffle images</button>
            <button style={s.ghost} onClick={() => setShowJson((v) => !v)}>
              {showJson ? "Hide" : "Preview"} JSON
            </button>
          </div>

          <label style={s.check}>
            <input type="checkbox" checked={confirmed} disabled={busy}
              onChange={(e) => setConfirmed(e.target.checked)} />
            I understand documents with the same slug will be overwritten.
          </label>

          <button style={{ ...s.primary, opacity: !confirmed || busy ? 0.55 : 1 }}
            disabled={!confirmed || busy} onClick={upload}>
            {busy ? `Uploading... ${pct}%` : `Upload ${items.length} destinations to Firestore`}
          </button>

          {(busy || done > 0) && (
            <div style={s.bar} aria-label="Upload progress">
              <div style={{ ...s.fill, width: `${pct}%` }} />
            </div>
          )}

          {log.length > 0 && (
            <ul style={s.log}>
              {log.map((l, i) => (
                <li key={i} style={{ color: l.type === "error" ? "#c62828" : l.type === "ok" ? "#1b7a4b" : "#3b4f6e" }}>
                  <small>{l.t}</small> {l.msg}
                </li>
              ))}
            </ul>
          )}
        </section>

        {showJson && items[0] && (
          <pre style={s.json}>{JSON.stringify(items[0], null, 2)}</pre>
        )}

        <section style={s.card}>
          <h2 style={s.h2}>Preview ({items.length})</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={s.table}>
              <thead>
                <tr><th>#</th><th>State</th><th>City</th><th>Slug</th><th>Gallery</th><th>Featured</th></tr>
              </thead>
              <tbody>
                {items.map((d, i) => (
                  <tr key={d.slug}>
                    <td>{i + 1}</td><td>{d.state}</td><td>{d.city}</td>
                    <td><code>{d.slug}</code></td>
                    <td>{d.galleryImages.length} images</td>
                    <td>{d.featured ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p style={s.note}>
          This page writes from the browser, so your Firestore rules must allow writes while you run it.
          Restrict or delete this page and tighten your rules once the upload is done.
        </p>
      </div>
    </main>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#f3f6fb", padding: "40px 20px", fontFamily: "Inter, Segoe UI, Arial, sans-serif", color: "#0d1b33" },
  wrap: { maxWidth: 980, margin: "0 auto", display: "grid", gap: 20 },
  header: { padding: "8px 0 4px" },
  eyebrow: { display: "inline-block", background: "#ffb627", color: "#0a1a33", fontSize: 11, fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase", padding: "6px 12px", borderRadius: 30 },
  h1: { fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, letterSpacing: -1.2, margin: "14px 0 8px", color: "#0a1a33" },
  sub: { margin: 0, color: "#5d6f8a", lineHeight: 1.6 },
  card: { background: "#fff", border: "1px solid #dfe7f2", borderRadius: 18, padding: 24, boxShadow: "0 2px 8px rgba(10,26,51,.06)", display: "grid", gap: 16 },
  row: { display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" },
  label: { display: "grid", gap: 6, fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "#0a1a33", flex: 1, minWidth: 220 },
  input: { height: 46, padding: "0 14px", border: "2px solid #dfe7f2", borderRadius: 12, fontSize: 15, outline: "none" },
  check: { display: "flex", gap: 10, alignItems: "center", fontSize: 14, color: "#3b4f6e" },
  primary: { height: 52, border: 0, borderRadius: 12, background: "linear-gradient(135deg,#1b6bff,#0f52d4)", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer" },
  ghost: { height: 46, padding: "0 18px", border: "2px solid #0a1a33", borderRadius: 12, background: "#fff", color: "#0a1a33", fontWeight: 800, cursor: "pointer" },
  bar: { height: 10, background: "#e6edf7", borderRadius: 10, overflow: "hidden" },
  fill: { height: "100%", background: "#1b7a4b", transition: "width .3s ease" },
  log: { listStyle: "none", margin: 0, padding: 14, background: "#f7f9fc", borderRadius: 12, maxHeight: 220, overflowY: "auto", fontSize: 13, display: "grid", gap: 6 },
  json: { background: "#0a1a33", color: "#d6e4ff", padding: 20, borderRadius: 14, overflow: "auto", maxHeight: 420, fontSize: 12 },
  h2: { margin: 0, fontSize: 18, fontWeight: 900 },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 14 },
  note: { fontSize: 13, color: "#5d6f8a", lineHeight: 1.6, margin: 0 },
};