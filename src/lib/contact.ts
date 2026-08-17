export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  details: string;
}

export async function submitContactForm(payload: ContactFormPayload) {
  try {
    const response = await fetch("/api/contact.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to send inquiry");
    }

    return response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to send inquiry"
    );
  }
}