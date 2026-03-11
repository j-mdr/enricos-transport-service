import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Turnstile } from "@marsidev/react-turnstile";

interface Labels {
  formTitle: string;
  firstNameLabel: string;
  lastNameLabel: string;
  companyLabel: string;
  locationLabel: string;
  emailLabel: string;
  phoneLabel: string;
  vehicleTypeLabel: string;
  availabilityLabel: string;
  niwoLabel: string;
  adrLabel: string;
  transportInsuranceLabel: string;
  messageLabel: string;
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
  },
  en: {
    required: "This field is required.",
    emailInvalid: "Please enter a valid email address.",
  },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildSchema(locale: "nl" | "en") {
  const m = messages[locale];
  return z.object({
    firstName: z.string().min(1, m.required),
    lastName: z.string().min(1, m.required),
    company: z.string().min(1, m.required),
    location: z.string().min(1, m.required),
    email: z.string().min(1, m.required).regex(EMAIL_RE, m.emailInvalid),
    phone: z.string().min(1, m.required),
    vehicleType: z.string().min(1, m.required),
    availability: z.string().min(1, m.required),
    niwo: z.boolean().optional(),
    adr: z.boolean().optional(),
    transportInsurance: z.boolean().optional(),
    message: z.string().optional(),
  });
}

export default function BecomePartnerForm({ labels, turnstileSiteKey, locale }: Props) {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileFailed, setTurnstileFailed] = useState(false);
  const [turnstileExpired, setTurnstileExpired] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const messageRef = useRef<HTMLParagraphElement>(null);

  const schema = useMemo(() => buildSchema(locale), [locale]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      niwo: false,
      adr: false,
      transportInsurance: false,
    },
  });

  async function onSubmit(data: z.infer<ReturnType<typeof buildSchema>>) {
    if (!turnstileToken) return;
    setStatus("loading");

    const payload = { ...data, "cf-turnstile-response": turnstileToken };

    try {
      const res = await fetch("/api/become-partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
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

          {/* Bedrijf + Locatie */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="company" className="form__label">
                {labels.companyLabel} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="form__input"
                id="company"
                placeholder={labels.companyLabel}
                {...register("company")}
              />
              {errors.company && <p className="text-xs text-red-600">{errors.company.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="location" className="form__label">
                {labels.locationLabel} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="form__input"
                id="location"
                placeholder={labels.locationLabel}
                {...register("location")}
              />
              {errors.location && <p className="text-xs text-red-600">{errors.location.message}</p>}
            </div>
          </div>

          {/* Emailadres + Telefoonnummer */}
          <div className="grid gap-4 sm:grid-cols-2">
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
            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="form__label">
                {labels.phoneLabel} <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                className="form__input"
                id="phone"
                inputMode="tel"
                placeholder={labels.phoneLabel}
                {...register("phone")}
              />
              {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Type voertuig + Beschikbaarheid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="vehicleType" className="form__label">
                {labels.vehicleTypeLabel} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="form__input"
                id="vehicleType"
                placeholder={labels.vehicleTypeLabel}
                {...register("vehicleType")}
              />
              {errors.vehicleType && (
                <p className="text-xs text-red-600">{errors.vehicleType.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="availability" className="form__label">
                {labels.availabilityLabel} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="form__input"
                id="availability"
                placeholder={labels.availabilityLabel}
                {...register("availability")}
              />
              {errors.availability && (
                <p className="text-xs text-red-600">{errors.availability.message}</p>
              )}
            </div>
          </div>

          {/* Checkboxes: NIWO, ADR, Transportverzekering */}
          <div className="flex flex-wrap gap-6">
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="accent-primary" {...register("niwo")} />
              <span className="text-sm">{labels.niwoLabel}</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="accent-primary" {...register("adr")} />
              <span className="text-sm">{labels.adrLabel}</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="accent-primary"
                {...register("transportInsurance")}
              />
              <span className="text-sm">{labels.transportInsuranceLabel}</span>
            </label>
          </div>

          {/* Bericht (optioneel) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="form__label">
              {labels.messageLabel}
            </label>
            <textarea
              className="form__input min-h-[120px]"
              id="message"
              placeholder={labels.messageLabel}
              {...register("message")}
            />
          </div>

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
