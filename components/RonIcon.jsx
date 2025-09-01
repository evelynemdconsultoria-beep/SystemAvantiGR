import React from "react";

export default function RonIcon({
  size = 64,
  showLabel = true,
  floating = false,
  onClick,
}) {
  const wrapStyle = floating
    ? { position: "fixed", right: 20, bottom: 20, zIndex: 9999 }
    : { position: "relative" };

  return (
    <div style={wrapStyle}>
      <button
        onClick={onClick}
        aria-label="Abrir Avanti Smart"
        title="Ron"
        style={{
          all: "unset",
          cursor: "pointer",
          display: "grid",
          justifyItems: "center",
          gap: 6,
        }}
      >
        <div className="ron-img-wrap" style={{
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid #b2ff00",
          boxShadow: "0 8px 24px rgba(0,0,0,.35)",
          transition: "transform .18s ease, box-shadow .18s ease",
          background: "#2a2a30",
        }}>
          <img
            src="/ron.png?v=3"
            alt="Ron"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        {showLabel && (
          <span style={{ fontSize: 12, color: "#f5f5f5", fontWeight: 600 }}>Ron</span>
        )}
      </button>

      <style jsx>{`
        .ron-img-wrap:hover { transform: scale(1.06); box-shadow: 0 12px 32px rgba(0,0,0,.5); }
        .ron-img-wrap:active { transform: scale(0.98); }
      `}</style>
    </div>
  );
}
