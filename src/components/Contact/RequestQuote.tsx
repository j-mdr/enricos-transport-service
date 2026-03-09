import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  locale: "nl" | "en";
}

const messages = {
  nl: {
    required: "Dit veld is verplicht.",
    emailInvalid: "Vul een geldig emailadres in.",
    postalCodeInvalid: "Vul een geldige postcode in (bijv. 1234 AB).",
    cargoTypeRequired: "Selecteer wat er vervoerd moet worden.",
    sizeWeightRequired: "Selecteer een geschatte grootte / gewicht.",
    transportDateRequired: "Vul een transportdatum in.",
  },
  en: {
    required: "This field is required.",
    emailInvalid: "Please enter a valid email address.",
    postalCodeInvalid: "Enter a valid postal code (e.g. 1234 AB).",
    cargoTypeRequired: "Select what needs to be transported.",
    sizeWeightRequired: "Select an estimated size / weight.",
    transportDateRequired: "Please enter a transport date.",
  },
} as const;

const POSTCODE_RE = /^\d{4}\s?[a-zA-Z]{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildSchema(locale: "nl" | "en") {
  const m = messages[locale];
  return z.object({
    firstName: z.string().min(1, m.required),
    lastName: z.string().min(1, m.required),
    email: z.string().min(1, m.required).regex(EMAIL_RE, m.emailInvalid),
    postalCodeFrom: z.string().regex(POSTCODE_RE, m.postalCodeInvalid),
    postalCodeTo: z.string().regex(POSTCODE_RE, m.postalCodeInvalid),
    cargoType: z.string().min(1, m.cargoTypeRequired),
    otherCargo: z.string().optional(),
    sizeWeight: z.string().min(1, m.sizeWeightRequired),
    transportDate: z.string().min(1, m.transportDateRequired),
    urgent: z.boolean().optional(),
  });
}

export default function RequestQuote({ labels, turnstileSiteKey, locale }: Props) {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileFailed, setTurnstileFailed] = useState(false);
  const [turnstileExpired, setTurnstileExpired] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const messageRef = useRef<HTMLParagraphElement>(null);
  const otherCargoRef = useRef<HTMLInputElement | null>(null);

  const schema = useMemo(() => buildSchema(locale), [locale]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { cargoType: "", sizeWeight: "", urgent: false },
  });

  const cargoType = watch("cargoType");

  useEffect(() => {
    if (cargoType === "anders") {
      setTimeout(() => otherCargoRef.current?.focus(), 0);
    }
  }, [cargoType]);

  const { ref: registerOtherCargoRef, ...otherCargoRegister } = register("otherCargo");

  async function onSubmit(data: z.infer<ReturnType<typeof buildSchema>>) {
    if (!turnstileToken) return;
    setStatus("loading");

    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined) formData.set(k, String(v));
    });
    formData.set("cf-turnstile-response", turnstileToken);

    try {
      const res = await fetch("/api/request-quote", { method: "POST", body: formData });
      const json = (await res.json()) as { success?: boolean; error?: string };

      if (res.ok && json.success) {
        setStatus("success");
        reset();
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
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4">
          {/* Voornaam + Achternaam */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName" className="form__label">
                {labels.firstNameLabel} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="form__input"
                id="firstName"
                placeholder={labels.firstNameLabel}
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-xs text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName" className="form__label">
                {labels.lastNameLabel} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="form__input"
                id="lastName"
                placeholder={labels.lastNameLabel}
                {...register("lastName")}
              />
              {errors.lastName && <p className="text-xs text-red-600">{errors.lastName.message}</p>}
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
              id="email"
              inputMode="email"
              placeholder={labels.emailLabel}
              {...register("email")}
            />
            {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
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
                id="postalCodeFrom"
                placeholder="1234 AB"
                {...register("postalCodeFrom")}
              />
              {errors.postalCodeFrom && (
                <p className="text-xs text-red-600">{errors.postalCodeFrom.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="postalCodeTo" className="form__label">
                {labels.postalCodeToLabel} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="form__input"
                id="postalCodeTo"
                placeholder="1234 AB"
                {...register("postalCodeTo")}
              />
              {errors.postalCodeTo && (
                <p className="text-xs text-red-600">{errors.postalCodeTo.message}</p>
              )}
            </div>
          </div>

          {/* Wat moet er vervoerd worden? */}
          <div className="flex flex-col gap-1">
            <label htmlFor="cargoType" className="form__label">
              {labels.cargoTypeLabel} <span className="text-red-600">*</span>
            </label>
            <select className="form__input" id="cargoType" {...register("cargoType")}>
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
            {errors.cargoType && <p className="text-xs text-red-600">{errors.cargoType.message}</p>}
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
                id="otherCargo"
                placeholder={labels.otherCargoLabel}
                ref={(el) => {
                  registerOtherCargoRef(el);
                  otherCargoRef.current = el;
                }}
                {...otherCargoRegister}
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
                  value={opt.value}
                  className="accent-primary"
                  {...register("sizeWeight")}
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
            {errors.sizeWeight && (
              <p className="text-xs text-red-600">{errors.sizeWeight.message}</p>
            )}
          </fieldset>

          {/* Datum transport */}
          <div className="flex flex-col gap-1">
            <label htmlFor="transportDate" className="form__label">
              {labels.transportDateLabel} <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              className="form__input"
              id="transportDate"
              {...register("transportDate")}
            />
            {errors.transportDate && (
              <p className="text-xs text-red-600">{errors.transportDate.message}</p>
            )}
          </div>

          {/* Spoedtransport */}
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" className="accent-primary" {...register("urgent")} />
            <span className="text-sm">{labels.urgentLabel}</span>
          </label>

          <Turnstile
            siteKey={turnstileSiteKey}
            onSuccess={(token) => {
              setTurnstileToken(token);
              setTurnstileFailed(false);
              setTurnstileExpired(false);
            }}
            onError={() => {
              setTurnstileToken("");
              setTurnstileFailed(true);
            }}
            onExpire={() => {
              setTurnstileToken("");
              setTurnstileExpired(true);
            }}
          />
          {turnstileFailed && (
            <p className="text-sm text-red-600">
              CAPTCHA verificatie mislukt. Ververs de pagina en probeer opnieuw.
            </p>
          )}
          {turnstileExpired && !turnstileFailed && (
            <p className="text-sm text-amber-600">
              CAPTCHA is verlopen. Verifieer opnieuw hierboven.
            </p>
          )}

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
