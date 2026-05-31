"use client";

import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

const companyEmail = "contact@medivonixhealthcare.com";
const whatsappNumber = "919477348046";

const contactChannels = [
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { value: "email", label: "Email", icon: Mail },
  { value: "phone", label: "Phone call", icon: Phone },
];

export default function ContactForm() {
  const [channel, setChannel] = useState("whatsapp");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredContact, setPreferredContact] = useState("");
  const [description, setDescription] = useState("");

  const selectedLabel = useMemo(
    () =>
      contactChannels.find((contactChannel) => contactChannel.value === channel)
        ?.label ?? "WhatsApp",
    [channel],
  );

  function buildMessage() {
    return [
      "New Medivonix enquiry",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Preferred reply channel: ${selectedLabel}`,
      preferredContact
        ? `Specific contact detail: ${preferredContact}`
        : "Specific contact detail: Not specified",
      "",
      "Enquiry description:",
      description,
    ].join("\n");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = buildMessage();

    if (channel === "whatsapp") {
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }

    const subject = encodeURIComponent(`Medivonix enquiry from ${name}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${companyEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-white">
          Name
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            className="rounded-md border border-white/10 bg-white px-4 py-3 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/30"
            placeholder="Your name"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-white">
          Phone number
          <input
            required
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            autoComplete="tel"
            inputMode="tel"
            className="rounded-md border border-white/10 bg-white px-4 py-3 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/30"
            placeholder="+91 ..."
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-bold text-white">
        Email
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          className="rounded-md border border-white/10 bg-white px-4 py-3 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/30"
          placeholder="name@example.com"
        />
      </label>

      <fieldset className="mt-5">
        <legend className="text-sm font-bold text-white">
          Preferred reply channel
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {contactChannels.map((contactChannel) => {
            const Icon = contactChannel.icon;
            const isSelected = channel === contactChannel.value;

            return (
              <label
                key={contactChannel.value}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-3 text-sm font-bold transition ${
                  isSelected
                    ? "border-teal-300 bg-teal-300 text-slate-950"
                    : "border-white/10 bg-white/[0.05] text-slate-200 hover:border-teal-200"
                }`}
              >
                <input
                  type="radio"
                  name="contact-channel"
                  value={contactChannel.value}
                  checked={isSelected}
                  onChange={(event) => setChannel(event.target.value)}
                  className="sr-only"
                />
                <Icon aria-hidden="true" className="h-4 w-4" />
                {contactChannel.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="mt-4 grid gap-2 text-sm font-bold text-white">
        Specific handle or timing
        <input
          value={preferredContact}
          onChange={(event) => setPreferredContact(event.target.value)}
          className="rounded-md border border-white/10 bg-white px-4 py-3 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/30"
          placeholder="WhatsApp number, email, best call time, or other"
        />
      </label>

      <label className="mt-4 grid gap-2 text-sm font-bold text-white">
        What are you asking for?
        <textarea
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={5}
          className="resize-none rounded-md border border-white/10 bg-white px-4 py-3 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/30"
          placeholder="Tell us about the product, demo, collaboration, hospital need, or question."
        />
      </label>

      <button
        type="submit"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-teal-400 px-5 py-4 font-black text-slate-950 transition hover:bg-teal-300"
      >
        <Send aria-hidden="true" className="h-5 w-5" />
        Send enquiry
      </button>
    </form>
  );
}
