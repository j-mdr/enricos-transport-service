import { useState, useRef } from "react";
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
}

export default function ContactForm({ labels, turnstileSiteKey }: Props) {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fileName, setFileName] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!turnstileToken) return;

    setStatus("loading");

    const form = e.currentTarget;
    const rawData = new FormData(form);

    const fileInput = rawData.get("file") as File | null;
    let filePayload: { name: string; data: string; type: string } | null = null;
    if (fileInput && fileInput.size > 0) {
      const buffer = await fileInput.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      filePayload = { name: fileInput.name, data: btoa(binary), type: fileInput.type };
    }

    const payload = {
      "cf-turnstile-response": turnstileToken,
      firstName: rawData.get("firstName") as string,
      lastName: rawData.get("lastName") as string,
      email: rawData.get("email") as string,
      description: rawData.get("description") as string,
      file: filePayload,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };

      if (res.ok && data.success) {
        setStatus("success");
        formRef.current?.reset();
        setFileName("");
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

          {/* Beschrijving */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="form__label">
              {labels.descriptionLabel} <span className="text-red-600">*</span>
            </label>
            <textarea
              className="form__input"
              name="description"
              id="description"
              rows={4}
              placeholder={labels.descriptionLabel}
              required
            />
          </div>

          {/* Bestandsupload (optioneel) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="file" className="form__label">
              {labels.fileUploadLabel}
            </label>
            <input
              type="file"
              className="form__input"
              name="file"
              id="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp,.zip"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            />
            {fileName && <p className="text-sm opacity-70">{fileName}</p>}
          </div>

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
