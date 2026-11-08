

"use client";

import { useState } from "react";
import { useProjects, type Project } from "../providers";

export default function MeineProjekte() {
  const { projects, updateProject, deleteProject } = useProjects();

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedProject, setEditedProject] = useState<Project | null>(null);

  // Search and filter projects
  const filteredProjects = projects.filter((project) =>
    [
      project.name,
      project.organization,
      project.funder,
    ].some((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    )
  );

  // Start editing a project
  function handleEdit(project: Project) {
    setEditingId(project.id);
    setEditedProject({ ...project });
  }

  // Update the edited field
  function handleChange(
    field: keyof Omit<Project, "id">,
    value: string
  ) {
    if (!editedProject) return;

    setEditedProject({
      ...editedProject,
      [field]: value,
    });
  }

  // Save changes
  function handleSave() {
    if (!editedProject || editingId === null) return;

    updateProject(editingId, {
      name: editedProject.name,
      organization: editedProject.organization,
      funder: editedProject.funder,
      budget: editedProject.budget,
      startDate: editedProject.startDate,
      endDate: editedProject.endDate,
    });

    setEditingId(null);
    setEditedProject(null);
  }

  // Cancel editing
  function handleCancel() {
    setEditingId(null);
    setEditedProject(null);
  }

  // Delete a project
  function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Möchten Sie dieses Projekt wirklich löschen?"
    );

    if (confirmed) {
      deleteProject(id);
    }
  }

  // Format budget as Euro
  function formatBudget(budget: string) {
    return Number(budget).toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
    });
  }

  return (
    <main className="min-h-screen bg-slate-100 md:flex">
      {/* Sidebar */}
      <aside className="bg-slate-900 p-6 text-white md:min-h-screen md:w-64">
        <h1 className="text-2xl font-bold">FörderPilot</h1>

        <p className="mt-2 text-sm text-slate-400">
          Förderprojekt-Management
        </p>

        <nav className="mt-10 space-y-3">
          <a
            href="#dashboard"
            className="block rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            Dashboard
          </a>

          <p className="px-4 pt-4 text-xs uppercase text-slate-400">
            Projekte
          </p>

          <a
            href="/"
            className="block rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            Projektübersicht
          </a>

          <a
            href="/meine-projekte"
            className="block rounded-lg bg-slate-700 px-4 py-3"
          >
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

      {/* Main content */}
      <section className="min-w-0 flex-1 p-6 md:p-10">
        <h2 className="text-3xl font-bold text-slate-900">
          Meine Projekte
        </h2>

        <p className="mt-2 text-slate-600">
          Verwalten und bearbeiten Sie Ihre Förderprojekte.
        </p>

        {/* Search field */}
        <div className="mt-8 rounded-xl bg-white p-5 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Projekte suchen
          </label>

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Projektname, Organisation oder Fördergeber suchen..."
            className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-emerald-600"
          />
        </div>

        {/* Project table */}
        <div className="mt-6 overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4">Projektname</th>
                  <th className="p-4">Organisation</th>
                  <th className="p-4">Fördergeber</th>
                  <th className="p-4">Budget (€)</th>
                  <th className="p-4">Projektbeginn</th>
                  <th className="p-4">Projektende</th>
                  <th className="p-4">Aktionen</th>
                </tr>
              </thead>

              <tbody>
                {filteredProjects.map((project) => {
                  const isEditing = editingId === project.id;

                  return (
                    <tr
                      key={project.id}
                      className="border-b border-slate-200 hover:bg-slate-50"
                    >
                      {(
                        [
                          ["name", "text"],
                          ["organization", "text"],
                          ["funder", "text"],
                          ["budget", "number"],
                          ["startDate", "date"],
                          ["endDate", "date"],
                        ] as const
                      ).map(([field, inputType]) => (
                        <td key={field} className="p-3">
                          {isEditing && editedProject ? (
                            <input
                              type={inputType}
                              min={
                                field === "budget"
                                  ? "0"
                                  : field === "endDate"
                                    ? editedProject.startDate
                                    : undefined
                              }
                              step={field === "budget" ? "0.01" : undefined}
                              value={editedProject[field]}
                              onChange={(e) =>
                                handleChange(field, e.target.value)
                              }
                              className="w-full min-w-28 rounded border border-slate-300 p-2"
                            />
                          ) : (
                            <span className="text-slate-700">
                              {field === "budget"
                                ? formatBudget(project.budget)
                                : project[field]}
                            </span>
                          )}
                        </td>
                      ))}

                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={handleSave}
                                disabled={
                                  !editedProject?.name.trim() ||
                                  !editedProject?.organization.trim() ||
                                  !editedProject?.funder.trim() ||
                                  !editedProject?.startDate ||
                                  !editedProject?.endDate ||
                                  Number(editedProject?.budget) < 0 ||
                                  editedProject?.endDate < editedProject?.startDate
                                }
                                className="rounded bg-emerald-700 px-3 py-2 text-white hover:bg-emerald-800 disabled:opacity-50"
                              >
                                Speichern
                              </button>

                              <button
                                onClick={handleCancel}
                                className="rounded bg-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-300"
                              >
                                Abbrechen
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(project)}
                                className="rounded bg-green-900 px-3 py-2 text-white hover:bg-green-950"
                              >
                                Bearbeiten
                              </button>

                              <button
                                onClick={() => handleDelete(project.id)}
                                className="rounded bg-green-900 px-3 py-2 text-white hover:bg-green-950"
                              >
                                Löschen
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredProjects.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-8 text-center text-slate-500"
                    >
                      {projects.length === 0
                        ? "Noch keine Projekte vorhanden."
                        : "Keine passenden Projekte gefunden."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-200 p-4 text-sm text-slate-500">
            {filteredProjects.length} von {projects.length} Projekten
          </div>
        </div>
      </section>
    </main>
  );
}
