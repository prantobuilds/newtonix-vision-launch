import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { submitContactForm } from "./contact";

describe("submitContactForm", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("submits the form payload to the configured endpoint", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue(new Response(null, { status: 200 }));

    await submitContactForm({
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+8801712345678",
      company: "Acme",
      service: "Website Development",
      details: "Need a modern website",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://formsubmit.co/ajax/info@newtonixtech.com");
    expect(options?.method).toBe("POST");
    expect(options?.body).toBeInstanceOf(FormData);
  });
});
