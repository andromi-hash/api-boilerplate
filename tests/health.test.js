import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import http from "node:http";

const BASE = "http://localhost:4000";

describe("Health endpoint", () => {
  it("returns 200 and status ok", async () => {
    const res = await fetch(`${BASE}/api/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, "ok");
    assert.ok(data.timestamp);
  });
});
