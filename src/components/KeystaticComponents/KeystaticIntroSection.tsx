export default function KeystaticIntroSection({
  introSet,
  label = "Intro Sectie",
}: {
  introSet: string | null;
  label?: string;
}) {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", borderRadius: "8px" }}>
      <strong>{label}</strong>
      {introSet ? (
        <p>Set: {introSet}</p>
      ) : (
        <p style={{ color: "#999" }}>Geen intro set geselecteerd</p>
      )}
    </div>
  );
}
