export default function KeystaticFeatureLightboxMarqueeSection({
  featureSet,
  label = "Feature Lightbox Marquee",
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
