import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Turnstile } from "@marsidev/react-turnstile";

interface Labels {
  formTitle: string;
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  descriptionLabel: string;
  fileUploadLabel: string;
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
    turnstileFailed: "CAPTCHA verificatie mislukt. Ververs de pagina en probeer opnieuw.",
    turnstileExpired: "CAPTCHA is verlopen. Verifieer opnieuw hierboven.",
  },
  en: {
    required: "This field is required.",
    emailInvalid: "Please enter a valid email address.",
    turnstileFailed: "CAPTCHA verification failed. Refresh the page and try again.",
    turnstileExpired: "CAPTCHA has expired. Please verify again above.",
  },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildSchema(locale: "nl" | "en") {
  const m = messages[locale];
  return z.object({
    firstName: z.string().min(1, m.required),
    lastName: z.string().min(1, m.required),
    email: z.string().min(1, m.required).regex(EMAIL_RE, m.emailInvalid),
    description: z.string().min(1, m.required),
  });
}

export default function ContactForm({ labels, turnstileSiteKey, locale }: Props) {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileFailed, setTurnstileFailed] = useState(false);
  const [turnstileExpired, setTurnstileExpired] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fileName, setFileName] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);

  const m = messages[locale];
  const schema = useMemo(() => buildSchema(locale), [locale]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: z.infer<ReturnType<typeof buildSchema>>) {
    if (!turnstileToken) return;
    setStatus("loading");

    const fileInput = fileRef.current?.files?.[0] ?? null;
    let filePayload: { name: string; data: string; type: string } | null = null;
    if (fileInput && fileInput.size > 0) {
      const buffer = await fileInput.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      filePayload = { name: fileInput.name, data: btoa(binary), type: fileInput.type };
    }

    const payload = { ...data, file: filePayload, "cf-turnstile-response": turnstileToken };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { success?: boolean; error?: string };

      if (res.ok && json.success) {
        setStatus("success");
        reset();
        setFileName("");
        if (fileRef.current) fileRef.current.value = "";
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

          {/* Beschrijving */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="form__label">
              {labels.descriptionLabel} <span className="text-red-600">*</span>
            </label>
            <textarea
              className="form__input"
              id="description"
              rows={4}
              placeholder={labels.descriptionLabel}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Bestandsupload (optioneel) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="file" className="form__label">
              {labels.fileUploadLabel}
            </label>
            <input
              type="file"
              className="form__input pointer"
              id="file"
              ref={fileRef}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp,.zip"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            />
            {fileName && <p className="text-sm opacity-70">{fileName}</p>}
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
          {turnstileFailed && <p className="text-sm text-red-600">{m.turnstileFailed}</p>}
          {turnstileExpired && !turnstileFailed && (
            <p className="text-sm text-amber-600">{m.turnstileExpired}</p>
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
