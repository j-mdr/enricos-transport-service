export default function KeystaticRequestQuoteSectionBlock({
  sectionSet,
}: {
  sectionSet: string | null;
}) {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", borderRadius: "8px" }}>
      <strong>Offerte sectie met afbeelding (RequestQuoteSection)</strong>
      {sectionSet ? (
        <p>Set: {sectionSet}</p>
      ) : (
        <p style={{ color: "#999" }}>Geen offerte sectie set geselecteerd</p>
      )}
    </div>
  );
}
