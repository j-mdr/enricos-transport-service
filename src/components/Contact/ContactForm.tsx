import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Turnstile } from "@marsidev/react-turnstile";

type FormField = {
  type: "checkbox" | "date" | "email" | "file" | "select" | "tel" | "text" | "textarea" | null;
  name: string | null;
  label: string | null;
  placeholder: string | null;
  required: boolean | null;
  width: "full" | "half" | null;
  options: Array<{ label: string | null; value: string | null }> | null;
};

type SanityForm = {
  title: string | null;
  emailSubject: string | null;
  submitButtonText: string | null;
  successMessage: string | null;
  errorMessage: string | null;
  fields: Array<FormField> | null;
} | null;

interface Props {
  form: SanityForm;
  turnstileSiteKey: string;
  locale: "nl" | "en";
}

const messages = {
  nl: {
    required: "Dit veld is verplicht.",
    emailInvalid: "Vul een geldig emailadres in.",
    turnstileFailed: "CAPTCHA verificatie mislukt. Ververs de pagina en probeer opnieuw.",
    turnstileExpired: "CAPTCHA is verlopen. Verifieer opnieuw hierboven.",
    formTitle: "Contactformulier",
    submitButtonText: "Versturen",
    successMessage: "Bedankt! We nemen zo snel mogelijk contact met u op.",
    errorMessage: "Er is iets misgegaan. Probeer het later opnieuw.",
  },
  en: {
    required: "This field is required.",
    emailInvalid: "Please enter a valid email address.",
    turnstileFailed: "CAPTCHA verification failed. Refresh the page and try again.",
    turnstileExpired: "CAPTCHA has expired. Please verify again above.",
    formTitle: "Contact Form",
    submitButtonText: "Submit",
    successMessage: "Thank you! We will get back to you as soon as possible.",
    errorMessage: "Something went wrong. Please try again later.",
  },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildSchema(fields: FormField[], locale: "nl" | "en") {
  const m = messages[locale];
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of fields) {
    if (!field.name || field.type === "file") continue;
    if (field.type === "checkbox") {
      shape[field.name] = field.required
        ? z.boolean().refine((v) => v, m.required)
        : z.boolean().optional();
    } else if (field.type === "email") {
      const base = z.string().regex(EMAIL_RE, m.emailInvalid);
      shape[field.name] = field.required
        ? base.min(1, m.required)
        : base.optional().or(z.literal(""));
    } else {
      shape[field.name] = field.required ? z.string().min(1, m.required) : z.string().optional();
    }
  }
  return z.object(shape);
}

export default function ContactForm({ form, turnstileSiteKey, locale }: Props) {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileFailed, setTurnstileFailed] = useState(false);
  const [turnstileExpired, setTurnstileExpired] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fileNames, setFileNames] = useState<Record<string, string>>({});
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const m = messages[locale];
  const fields = useMemo(() => (form?.fields ?? []).filter((f) => f.name && f.type), [form]);
  const schema = useMemo(() => buildSchema(fields as FormField[], locale), [fields, locale]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(data: Record<string, unknown>) {
    if (!turnstileToken) return;
    setStatus("loading");

    // Find the email field name and sender name fields
    const emailField = fields.find((f) => f.type === "email");
    const replyToField = emailField?.name ?? "email";
    const senderNameFields = fields
      .filter((f) => f.name === "firstName" || f.name === "lastName")
      .map((f) => f.name as string);

    // Collect file payloads
    let filePayload: { name: string; data: string; type: string } | null = null;
    const fileField = fields.find((f) => f.type === "file");
    if (fileField?.name) {
      const fileInput = fileRefs.current[fileField.name]?.files?.[0] ?? null;
      if (fileInput && fileInput.size > 0) {
        const buffer = await fileInput.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
        filePayload = { name: fileInput.name, data: btoa(binary), type: fileInput.type };
      }
    }

    const payload = {
      "cf-turnstile-response": turnstileToken,
      formTitle: form?.title ?? "",
      emailSubject: form?.emailSubject ?? undefined,
      replyToField,
      senderNameFields,
      fields: data as Record<string, string | boolean>,
      file: filePayload,
    };

    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { success?: boolean; error?: string };

      if (res.ok && json.success) {
        setStatus("success");
        reset();
        setFileNames({});
        Object.values(fileRefs.current).forEach((ref) => {
          if (ref) ref.value = "";
        });
        setTimeout(() => {
          document
            .getElementById("contact-form-message")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 50);
      } else {
        setStatus("error");
        setTimeout(() => {
          document
            .getElementById("contact-form-message")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 50);
      }
    } catch {
      setStatus("error");
      requestAnimationFrame(() =>
        document
          .getElementById("contact-form-message")
          ?.scrollIntoView({ behavior: "smooth", block: "center" }),
      );
    }
  }

  const submitButtonText = form?.submitButtonText ?? m.submitButtonText;
  const successMessage = form?.successMessage ?? m.successMessage;
  const errorMessage = form?.errorMessage ?? m.errorMessage;

  // Group fields: consecutive "half" fields are paired into grid rows
  function renderFields() {
    const rows: Array<FormField[]> = [];
    let i = 0;
    while (i < fields.length) {
      const field = fields[i] as FormField;
      if (
        field.width === "half" &&
        i + 1 < fields.length &&
        (fields[i + 1] as FormField).width === "half"
      ) {
        rows.push([field, fields[i + 1] as FormField]);
        i += 2;
      } else {
        rows.push([field]);
        i += 1;
      }
    }
    return rows.map((row, rowIdx) => {
      const isGrid = row.length === 2;
      return (
        <div key={rowIdx} className={isGrid ? "grid gap-4 sm:grid-cols-2" : undefined}>
          {row.map((field) => renderField(field))}
        </div>
      );
    });
  }

  function renderField(field: FormField) {
    const name = field.name!;
    const label = field.label ?? name;
    const placeholder = field.placeholder ?? "";
    const required = field.required ?? false;
    const error = errors[name];

    if (field.type === "file") {
      return (
        <div key={name} className="flex flex-col gap-1">
          <label htmlFor={name} className="form__label">
            {label}
          </label>
          <input
            type="file"
            className="form__input pointer"
            id={name}
            ref={(el) => {
              fileRefs.current[name] = el;
            }}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp,.zip"
            onChange={(e) =>
              setFileNames((prev) => ({ ...prev, [name]: e.target.files?.[0]?.name ?? "" }))
            }
          />
          {fileNames[name] && <p className="text-sm opacity-70">{fileNames[name]}</p>}
        </div>
      );
    }

    if (field.type === "checkbox") {
      return (
        <div key={name} className="flex items-center gap-2">
          <input type="checkbox" id={name} className="form__checkbox" {...register(name)} />
          <label htmlFor={name} className="form__label mb-0">
            {label}
            {required && <span className="text-red-600"> *</span>}
          </label>
          {error && <p className="text-xs text-red-600">{error.message as string}</p>}
        </div>
      );
    }

    if (field.type === "select") {
      return (
        <div key={name} className="flex flex-col gap-1">
          <label htmlFor={name} className="form__label">
            {label}
            {required && <span className="text-red-600"> *</span>}
          </label>
          <select className="form__input" id={name} {...register(name)}>
            <option value="">{placeholder || label}</option>
            {(field.options ?? []).map((opt) => (
              <option key={opt.value} value={opt.value ?? ""}>
                {opt.label}
              </option>
            ))}
          </select>
          {error && <p className="text-xs text-red-600">{error.message as string}</p>}
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <div key={name} className="flex flex-col gap-1">
          <label htmlFor={name} className="form__label">
            {label}
            {required && <span className="text-red-600"> *</span>}
          </label>
          <textarea
            className="form__input"
            id={name}
            rows={4}
            placeholder={placeholder}
            {...register(name)}
          />
          {error && <p className="text-xs text-red-600">{error.message as string}</p>}
        </div>
      );
    }

    // text | email | tel | date
    const inputType = field.type ?? "text";
    const inputMode = field.type === "email" ? "email" : field.type === "tel" ? "tel" : undefined;

    return (
      <div key={name} className="flex flex-col gap-1">
        <label htmlFor={name} className="form__label">
          {label}
          {required && <span className="text-red-600"> *</span>}
        </label>
        <input
          type={inputType}
          className="form__input"
          id={name}
          inputMode={inputMode}
          placeholder={placeholder}
          {...register(name)}
        />
        {error && <p className="text-xs text-red-600">{error.message as string}</p>}
      </div>
    );
  }

  return (
    <div>
      {status === "success" ? (
        <div
          id="contact-form-message"
          className="mt-6 flex flex-col items-center gap-4 rounded-xl border border-green-200 bg-green-50 px-6 py-8 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
            aria-hidden="true"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 7h3" />
            <path d="M3 11h2" />
            <path d="M9.02 8.801l-.6 6a2 2 0 0 0 1.99 2.199h7.98a2 2 0 0 0 1.99 -1.801l.6 -6a2 2 0 0 0 -1.99 -2.199h-7.98a2 2 0 0 0 -1.99 1.801z" />
            <path d="M9.8 7.5l2.982 3.28a3 3 0 0 0 4.238 .202l3.28 -2.982" />
          </svg>
          <p className="text-lg font-medium text-green-800">{successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4">
          {renderFields()}

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
            <div
              id="contact-form-message"
              className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
              <p>{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!turnstileToken || status === "loading"}
            className="button button--primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "loading" ? "..." : submitButtonText}
          </button>
        </form>
      )}
    </div>
  );
}
