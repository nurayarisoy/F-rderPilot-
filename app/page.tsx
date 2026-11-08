
"use client";

import { useState } from "react";
import { useProjects } from "./providers";

export default function Home() {
  const { addProject: createProject } = useProjects();

  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [funder, setFunder] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");

  function addProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    createProject({
      name,
      organization,
      funder,
      startDate,
      endDate,
      budget,
    });

    setName("");
    setOrganization("");
    setFunder("");
    setStartDate("");
    setEndDate("");
    setBudget("");
  }

  return (
    <main className="min-h-screen bg-slate-100 md:flex">
      <aside className="bg-slate-900 p-6 text-white md:min-h-screen md:w-64">
        <h1 className="text-2xl font-bold">FörderPilot</h1>
        <p className="mt-2 text-sm text-slate-400">
          Förderprojekt-Management
        </p>

        <nav className="mt-10 space-y-3">
          <a href="#dashboard" className="block rounded-lg px-4 py-3 hover:bg-slate-800">
            Dashboard
          </a>

          <p className="px-4 pt-4 text-xs uppercase text-slate-400">
            Projekte
          </p>

          <a href="/" className="block rounded-lg bg-slate-700 px-4 py-3">
            Projektübersicht
          </a>

          <a href="/meine-projekte" className="block rounded-lg px-4 py-3 hover:bg-slate-800">
            Meine Projekte
          </a>

          <a href="#tracking" className="block rounded-lg px-4 py-3 hover:bg-slate-800">
            Projekt-Tracking
          </a>

          <a href="#time" className="block rounded-lg px-4 py-3 hover:bg-slate-800">
            Zeiterfassung
          </a>

          <a href="#costs" className="block rounded-lg px-4 py-3 hover:bg-slate-800">
            Kosten & Rechnungen
          </a>

          <a href="#documents" className="block rounded-lg px-4 py-3 hover:bg-slate-800">
            Dokumente
          </a>
        </nav>
      </aside>

      <section className="flex-1 p-6 md:p-10">
        <h2 className="text-3xl font-bold text-slate-900">
          Projektübersicht
        </h2>

        <p className="mt-2 text-slate-600">
          Verwalten Sie Ihre Förderprojekte an einem Ort.
        </p>

        <form
          onSubmit={addProject}
          className="mt-8 space-y-5 rounded-xl bg-white p-6 shadow-sm"
        >
          <h3 className="text-xl font-bold">Neues Förderprojekt</h3>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Projektname
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="z. B. Digitalisierung im Verein"
                className="w-full rounded-lg border border-slate-300 p-3"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Organisation / Verein
              </label>
              <input
                required
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Name der Organisation"
                className="w-full rounded-lg border border-slate-300 p-3"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Fördergeber
              </label>
              <input
                required
                value={funder}
                onChange={(e) => setFunder(e.target.value)}
                placeholder="Name des Fördergebers"
                className="w-full rounded-lg border border-slate-300 p-3"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Geplantes Budget (€)
              </label>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="1000"
                className="w-full rounded-lg border border-slate-300 p-3"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Projektbeginn
              </label>
              <input
                required
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Projektende
              </label>
              <input
                required
                type="date"
                min={startDate || undefined}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3"
              />
            </div>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-emerald-700 px-5 py-3 font-medium text-white hover:bg-emerald-800"
          >
            + Projekt hinzufügen
          </button>
        </form>
      </section>
    </main>
  );
}
