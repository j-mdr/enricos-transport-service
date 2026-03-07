export default function KeystaticHeroSection({ heroSet }: { heroSet: string | null }) {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", borderRadius: "8px" }}>
      <strong>Hero Sectie</strong>
      {heroSet ? (
        <p>Set: {heroSet}</p>
      ) : (
        <p style={{ color: "#999" }}>Geen hero set geselecteerd</p>
      )}
    </div>
  );
}
