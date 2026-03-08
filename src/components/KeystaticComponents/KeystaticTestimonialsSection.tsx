export default function KeystaticTestimonialsSection({
  testimonialsSet,
  label = "Testimonials",
}: {
  testimonialsSet: string | null;
  label?: string;
}) {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", borderRadius: "8px" }}>
      <strong>{label}</strong>
      {testimonialsSet ? (
        <p>Set: {testimonialsSet}</p>
      ) : (
        <p style={{ color: "#999" }}>Geen testimonials set geselecteerd</p>
      )}
    </div>
  );
}
