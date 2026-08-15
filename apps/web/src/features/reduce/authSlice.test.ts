import { describe, expect, it } from "vitest";
import authReducer, { setUser, clearUser, setLoading, setError } from "./authSlice";
import type { User } from "@lingualink/shared";

const buildUser = (overrides: Partial<User> = {}): User => ({
  _id: "u1",
  name: "Ana",
  lastname: "Perez",
  email: "ana@example.com",
  username: "anaperez",
  role: null,
  analytics: {
    questions: { votesAccepted: 0, votesRejected: 0, questionsAsked: 0 },
    answers: { votesAccepted: 0, votesRejected: 0, answersGiven: 0, acceptedAnswers: 0 },
  },
  status: true,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  ...overrides,
});

describe("authSlice", () => {
  it("empieza sin usuario autenticado", () => {
    const state = authReducer(undefined, { type: "@@INIT" });
    expect(state.user).toBeNull();
  });

  it("setUser hidrata el usuario autenticado", () => {
    const user = buildUser();
    const state = authReducer(undefined, setUser(user));
    expect(state.user).toEqual(user);
  });

  it("clearUser limpia el usuario (logout)", () => {
    const withUser = authReducer(undefined, setUser(buildUser()));
    const state = authReducer(withUser, clearUser());
    expect(state.user).toBeNull();
  });

  it("setLoading y setError actualizan sus campos independientemente del usuario", () => {
    let state = authReducer(undefined, setLoading(true));
    expect(state.isLoading).toBe(true);

    state = authReducer(state, setError("Credenciales inválidas"));
    expect(state.error).toBe("Credenciales inválidas");
    expect(state.isLoading).toBe(true);
  });
});
