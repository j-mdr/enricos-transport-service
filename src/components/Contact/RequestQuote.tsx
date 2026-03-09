import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

interface Option {
  value: string;
  label: string;
}

interface Labels {
  formTitle: string;
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  postalCodeFromLabel: string;
  postalCodeToLabel: string;
  cargoTypeLabel: string;
  cargoOptions: Option[];
  cargoOptionAnders: string;
  otherCargoLabel: string;
  sizeWeightLabel: string;
  sizeOptions: Option[];
  transportDateLabel: string;
  urgentLabel: string;
  submitButtonText: string;
  successMessage: string;
  errorMessage: string;
}

interface Props {
  labels: Labels;
  turnstileSiteKey: string;
}

export default function RequestQuote({ labels, turnstileSiteKey }: Props) {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [cargoType, setCargoType] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!turnstileToken) return;

    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    formData.set("cf-turnstile-response", turnstileToken);

    try {
      const res = await fetch("/api/request-quote", { method: "POST", body: formData });
      const data = (await res.json()) as { success?: boolean; error?: string };

      if (res.ok && data.success) {
        setStatus("success");
        formRef.current?.reset();
        setCargoType("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setTimeout(
      () => messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
      0,
    );
  }

  return (
    <div>
      <h2 className="h2">{labels.formTitle}</h2>

      {status === "success" ? (
        <p ref={messageRef} className="mt-6 text-green-600">
          {labels.successMessage}
        </p>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          {/* Voornaam + Achternaam */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName" className="form__label">
                {labels.firstNameLabel} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="form__input"
                name="firstName"
                id="firstName"
                placeholder={labels.firstNameLabel}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName" className="form__label">
                {labels.lastNameLabel} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="form__input"
                name="lastName"
                id="lastName"
                placeholder={labels.lastNameLabel}
                required
              />
            </div>
          </div>

          {/* Emailadres */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="form__label">
              {labels.emailLabel} <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              className="form__input"
              name="email"
              id="email"
              inputMode="email"
              placeholder={labels.emailLabel}
              required
            />
          </div>

          {/* Postcode van + naar */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="postalCodeFrom" className="form__label">
                {labels.postalCodeFromLabel} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="form__input"
                name="postalCodeFrom"
                id="postalCodeFrom"
                placeholder={labels.postalCodeFromLabel}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="postalCodeTo" className="form__label">
                {labels.postalCodeToLabel} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="form__input"
                name="postalCodeTo"
                id="postalCodeTo"
                placeholder={labels.postalCodeToLabel}
                required
              />
            </div>
          </div>

          {/* Wat moet er vervoerd worden? */}
          <div className="flex flex-col gap-1">
            <label htmlFor="cargoType" className="form__label">
              {labels.cargoTypeLabel} <span className="text-red-600">*</span>
            </label>
            <select
              className="form__input"
              name="cargoType"
              id="cargoType"
              value={cargoType}
              onChange={(e) => setCargoType(e.target.value)}
              required
            >
              <option value="" disabled>
                —
              </option>
              {labels.cargoOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
              <option value="anders">{labels.cargoOptionAnders}</option>
            </select>
          </div>

          {/* Extra veld bij "anders" */}
          {cargoType === "anders" && (
            <div className="flex flex-col gap-1">
              <label htmlFor="otherCargo" className="form__label">
                {labels.otherCargoLabel}
              </label>
              <input
                type="text"
                className="form__input"
                name="otherCargo"
                id="otherCargo"
                placeholder={labels.otherCargoLabel}
              />
            </div>
          )}

          {/* Geschatte grootte / gewicht */}
          <fieldset className="flex flex-col gap-2">
            <legend className="form__label mb-1">
              {labels.sizeWeightLabel} <span className="text-red-600">*</span>
            </legend>
            {labels.sizeOptions.map((opt) => (
              <label key={opt.value} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="sizeWeight"
                  value={opt.value}
                  required
                  className="accent-primary"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </fieldset>

          {/* Datum transport */}
          <div className="flex flex-col gap-1">
            <label htmlFor="transportDate" className="form__label">
              {labels.transportDateLabel} <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              className="form__input"
              name="transportDate"
              id="transportDate"
              required
            />
          </div>

          {/* Spoedtransport */}
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" name="urgent" value="ja" className="accent-primary" />
            <span className="text-sm">{labels.urgentLabel}</span>
          </label>

          <Turnstile siteKey={turnstileSiteKey} onSuccess={(token) => setTurnstileToken(token)} />

          {status === "error" && (
            <p ref={messageRef} className="text-red-600">
              {labels.errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={!turnstileToken || status === "loading"}
            className="button button--primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "loading" ? "..." : labels.submitButtonText}
          </button>
        </form>
      )}
    </div>
  );
}
