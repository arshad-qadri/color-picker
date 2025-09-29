"use client";
import React, { useEffect, useState } from "react";
import chroma from "chroma-js";

export default function ColorPickerApp() {
  const [mainColors, setMainColors] = useState([]);
  const [selectedShades, setSelectedShades] = useState([]);
  const [toast, setToast] = useState("");

  const isTooWhite = (color) => {
    const [r, g, b] = chroma(color).rgb();
    return r > 245 && g > 245 && b > 245;
  };

  const generateMainColors = () => {
    const colorSet = new Set();

    // Generate vivid colors
    const vividCount = 95;
    const hueStep = 360 / vividCount;

    for (let i = 0; i < vividCount; i++) {
      const hue = i * hueStep;
      const saturation = 0.65;
      const lightness = 0.5;
      const color = chroma.hsl(hue, saturation, lightness).hex();
      if (!isTooWhite(color)) colorSet.add(color);
    }

    // Add dark and light colors
    ["#000000", "#1c1c1c", "#2f2f2f", "#4f4f4f", "#dcdcdc"].forEach((c) =>
      colorSet.add(c)
    );

    // Fill remaining with random colors without duplicates
    while (colorSet.size < 100) {
      const c = chroma.random().hex();
      if (!isTooWhite(c)) colorSet.add(c);
    }

    return Array.from(colorSet);
  };

  const generateShades = (baseColor) => {
    const keys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const light = chroma(baseColor).brighten(2);
    const dark = chroma(baseColor).darken(2);
    const scale = chroma.scale([light, baseColor, dark]).mode("lab").colors(10);
    return keys.map((key, idx) => ({ key, color: scale[idx] }));
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setToast(`Copied ${code}`);
    setTimeout(() => setToast(""), 1500);
  };

  useEffect(() => {
    setMainColors(generateMainColors());
  }, []);

  return (
    <div
      style={{
        padding: 24,
        fontFamily: "Inter, Roboto, system-ui, sans-serif",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#111827" }}
      >
        🎨 Color Explorer
      </h1>
      <p style={{ marginTop: 6, marginBottom: 20, color: "#6b7280" }}>
        Pick a color to see its shades. Click a shade to copy its hex code.
      </p>

      {/* Main colors responsive grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
          gap: 12,
        }}
      >
        {mainColors.map((c, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedShades(generateShades(c))}
            title={c}
            style={{
              width: "100%",
              aspectRatio: "1/1",
              background: c,
              borderRadius: "50%",
              cursor: "pointer",
              border: "2px solid #fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.15s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        ))}
      </div>

      {/* Shades Modal */}
      {selectedShades.length > 0 && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
          onClick={() => setSelectedShades([])}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              maxWidth: "90%",
              width: 600,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                fontSize: 22,
                fontWeight: 600,
                marginBottom: 12,
                color: "#111827",
              }}
            >
              Shades
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                gap: 12,
              }}
            >
              {selectedShades.map((s) => (
                <div
                  key={s.key}
                  onClick={() => handleCopy(s.color)}
                  style={{
                    background: s.color,
                    borderRadius: 8,
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    color: "#fff",
                    cursor: "pointer",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    transition: "transform 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  title="Click to copy"
                >
                  {s.color}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#111827",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 6,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            fontSize: 14,
            animation: "fadeInOut 1.5s ease",
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
