export default function KeystaticIntroSection({
  title,
  introText,
}: {
  title: string;
  introText: string;
}) {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", borderRadius: "8px" }}>
      <strong>{title || "Intro Sectie"}</strong>
      {introText && (
        <p style={{ color: "#666", marginTop: "0.5rem", fontSize: "0.875rem" }}>{introText}</p>
      )}
    </div>
  );
}
