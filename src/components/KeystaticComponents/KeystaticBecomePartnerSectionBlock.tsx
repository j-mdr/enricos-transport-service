export default function KeystaticBecomePartnerSectionBlock({
  sectionSet,
}: {
  sectionSet: string | null;
}) {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", borderRadius: "8px" }}>
      <strong>Partner aanmelding sectie (BecomePartnerSection)</strong>
      {sectionSet ? (
        <p>Set: {sectionSet}</p>
      ) : (
        <p style={{ color: "#999" }}>Geen partner aanmelding sectie set geselecteerd</p>
      )}
    </div>
  );
}
