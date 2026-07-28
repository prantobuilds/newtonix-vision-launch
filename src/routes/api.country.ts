import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/country")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const response = await fetch("https://ipapi.co/json/");

          if (!response.ok) {
            return Response.json(
              { country_code: "BD" },
              { status: 200 }
            );
          }

          const data = await response.json();

          return Response.json({
            country_code: data.country_code ?? "BD",
          });
        } catch {
          return Response.json(
            { country_code: "BD" },
            { status: 200 }
          );
        }
      },
    },
  },
});