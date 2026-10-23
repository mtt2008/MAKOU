import { describe, expect, it } from "vitest";
import { loadConfig } from "../src/config/env.js";

describe("loadConfig", () => {
  it("applies safe defaults when optional environment values are absent", () => {
    expect(loadConfig({ NODE_ENV: "test" })).toEqual({
      NODE_ENV: "test",
      HOST: "127.0.0.1",
      PORT: 3000,
      LOG_LEVEL: "info",
    });
  });

  it("rejects a port outside the valid TCP range", () => {
    expect(() => loadConfig({ PORT: "70000" })).toThrow("Invalid environment configuration");
  });
});