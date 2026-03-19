// ^[a-z0-9] — begint met kleine letter of cijfer
// (?:-[a-z0-9]+)* — optioneel gevolgd door koppelteken + segment
// (?:\/...)* — optioneel forward slashes voor geneste paden (bijv. diensten/regulier-transport)
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/;

export function slugValidation(Rule: any) {
  return Rule.custom((value: { current?: string } | undefined) => {
    if (!value?.current) return "Slug is verplicht";
    if (!SLUG_REGEX.test(value.current)) {
      return "Alleen kleine letters, cijfers en koppeltekens toegestaan (bijv. mijn-pagina of diensten/regulier-transport)";
    }
    return true;
  });
}
