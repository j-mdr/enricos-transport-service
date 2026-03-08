export default function KeystaticTeamMemberCardsSection({
  teamSet,
  label = "Team Members",
}: {
  teamSet: string | null;
  label?: string;
}) {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", borderRadius: "8px" }}>
      <strong>{label}</strong>
      {teamSet ? (
        <p>Set: {teamSet}</p>
      ) : (
        <p style={{ color: "#999" }}>Geen team set geselecteerd</p>
      )}
    </div>
  );
}
