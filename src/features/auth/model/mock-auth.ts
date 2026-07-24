import { persistAuthSession, persistRole } from "./session";

const MOCK_USER = {
  id: "1",
  full_name: "Demo User",
  position: "User",
  role_name: "Admin",
  login: "demo",
  access_token: `mock-token-${Date.now()}`,
  refresh_token: `mock-refresh-${Date.now()}`,
};

const MOCK_ROLE = {
  id: "1",
  name: "Admin",
  privileges: {},
};

export function performMockLogin(): void {
  persistAuthSession(MOCK_USER);
  persistRole({ status: "OK", data: MOCK_ROLE });
}
