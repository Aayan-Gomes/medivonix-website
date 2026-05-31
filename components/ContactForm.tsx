"use client";

import { Mail, Send } from "lucide-react";
import { FormEvent, useState } from "react";

const companyEmail = "contact@medivonixhealthcare.com";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [contactDetail, setContactDetail] = useState("");
  const [description, setDescription] = useState("");

  function buildMessage() {
    return [
      "New Medivonix enquiry",
      "",
      `Name: ${name}`,
      `Phone or email: ${contactDetail}`,
      "",
      "Enquiry description:",
      description,
    ].join("\n");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = buildMessage();
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
          Phone number or email
          <input
            required
            value={contactDetail}
            onChange={(event) => setContactDetail(event.target.value)}
            autoComplete="email"
            className="rounded-md border border-white/10 bg-white px-4 py-3 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/30"
            placeholder="+91 ... or name@example.com"
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-bold text-white">
        Enquiry
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
        <Mail aria-hidden="true" className="h-5 w-5" />
        <Send aria-hidden="true" className="h-4 w-4" />
        Send enquiry
      </button>
    </form>
  );
}
