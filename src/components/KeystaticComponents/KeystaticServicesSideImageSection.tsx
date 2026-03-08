export default function KeystaticServicesSideImageSection({
  servicesSet,
  label = "Services Zij-afbeelding",
}: {
  servicesSet: string | null;
  label?: string;
}) {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", borderRadius: "8px" }}>
      <strong>{label}</strong>
      {servicesSet ? (
        <p>Set: {servicesSet}</p>
      ) : (
        <p style={{ color: "#999" }}>Geen services set geselecteerd</p>
      )}
    </div>
  );
}
