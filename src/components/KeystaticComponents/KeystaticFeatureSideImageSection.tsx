export default function KeystaticFeatureSideImageSection({
  featureSet,
  label = "Feature Zij-afbeelding",
}: {
  featureSet: string | null;
  label?: string;
}) {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", borderRadius: "8px" }}>
      <strong>{label}</strong>
      {featureSet ? (
        <p>Set: {featureSet}</p>
      ) : (
        <p style={{ color: "#999" }}>Geen feature set geselecteerd</p>
      )}
    </div>
  );
}
