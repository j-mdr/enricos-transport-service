export default function KeystaticAwardsSection({
  awardsSet,
  label = "Awards Sectie",
}: {
  awardsSet: string | null;
  label?: string;
}) {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", borderRadius: "8px" }}>
      <strong>{label}</strong>
      {awardsSet ? (
        <p>Set: {awardsSet}</p>
      ) : (
        <p style={{ color: "#999" }}>Geen awards set geselecteerd</p>
      )}
    </div>
  );
}
