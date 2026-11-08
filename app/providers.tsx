
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Project = {
  id: number;
  name: string;
  organization: string;
  funder: string;
  startDate: string;
  endDate: string;
  budget: string;
};

type ProjectContextType = {
  projects: Project[];
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (
    id: number,
    updatedProject: Partial<Omit<Project, "id">>
  ) => void;
  deleteProject: (id: number) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);

export function Providers({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load projects from Local Storage
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem("projectflow-projects");

      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      }
    } catch (error) {
      console.error("Error loading projects:", error);
    }

    setIsLoaded(true);
  }, []);

  // Save projects to Local Storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "projectflow-projects",
        JSON.stringify(projects)
      );
    }
  }, [projects, isLoaded]);

  // Add a new project
  function addProject(project: Omit<Project, "id">) {
    setProjects((previousProjects) => [
      ...previousProjects,
      {
        ...project,
        id: Date.now(),
      },
    ]);
  }

  // Update an existing project
  function updateProject(
    id: number,
    updatedProject: Partial<Omit<Project, "id">>
  ) {
    setProjects((previousProjects) =>
      previousProjects.map((project) =>
        project.id === id
          ? { ...project, ...updatedProject }
          : project
      )
    );
  }

  // Delete a project
  function deleteProject(id: number) {
    setProjects((previousProjects) =>
      previousProjects.filter((project) => project.id !== id)
    );
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProjects must be used within Providers");
  }

  return context;
}
