export default function KeystaticFaqSection({
  faqSet,
  label = "FAQ Sectie",
}: {
  faqSet: string | null;
  label?: string;
}) {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", borderRadius: "8px" }}>
      <strong>{label}</strong>
      {faqSet ? <p>Set: {faqSet}</p> : <p style={{ color: "#999" }}>Geen FAQ set geselecteerd</p>}
    </div>
  );
}
