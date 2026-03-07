export default function KeystaticFaqSection({ faqSet }: { faqSet: string | null }) {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", borderRadius: "8px" }}>
      <strong>FAQ Sectie</strong>
      {faqSet ? <p>Set: {faqSet}</p> : <p style={{ color: "#999" }}>Geen FAQ set geselecteerd</p>}
    </div>
  );
}
