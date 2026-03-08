export default function KeystaticCtaCardSection({
  ctaSet,
  label = "CTA Kaart",
}: {
  ctaSet: string | null;
  label?: string;
}) {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", borderRadius: "8px" }}>
      <strong>{label}</strong>
      {ctaSet ? <p>Set: {ctaSet}</p> : <p style={{ color: "#999" }}>Geen CTA set geselecteerd</p>}
    </div>
  );
}
