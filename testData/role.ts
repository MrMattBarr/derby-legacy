import { Role } from "types/Role";

export const TEST_ROLE: Role = {
  project: "test_project_1",
  id: "test_role_1",
  talent: "test_user_1",
  name: "Test Rolbertson",
  dueDate: 1685577600000,
  description:
    "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
  lines: ["test_line_1", "test_line_2", "test_line_3"],
};

export const TEST_ROLES: Role[] = [
  { ...TEST_ROLE },
  {
    ...TEST_ROLE,
    name: "Rolby Caltest",
    project: "test_project_2",
    lines: ["test_line"],
    id: "test_role_2",
    dueDate: 1681577600000,
  },
  {
    ...TEST_ROLE,
    dueDate: 1683577600000,
    name: "Voice of Narrator",
    project: "test_project_3",
    id: "test_role_3",
  },
];
