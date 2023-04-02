import { Role } from "types/Role";

export const TEST_ROLE: Role = {
  project: "test-project-1",
  id: "test-role-1",
  talent: "xKgGDFdm9lW2zTRITH7VfUqALHJ2",
  name: "Test Rolbertson",
  dueDate: 1685577600000,
  description:
    "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
  lines: ["test-line-0", "test-line-1", "test-line-2"],
};

export const TEST_ROLES: Role[] = [
  { ...TEST_ROLE },
  {
    ...TEST_ROLE,
    name: "Rolby Caltest",
    project: "test_project_2",
    lines: ["test_line"],
    id: "test-role-2",
    dueDate: 1681577600000,
  },
  {
    ...TEST_ROLE,
    dueDate: 1683577600000,
    name: "Voice of Narrator",
    project: "test_project_3",
    id: "test-role-3",
  },
];
