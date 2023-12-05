import fs from "fs";
import { Docs } from "./docs";
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";

// TODO
/**
 * Create function do add line
 */

const codeSection = (
  type: "bash" | "html" | "typescript" | "prisma" | "http",
  lines: string[]
): string => {
  let text = "";
  text += "```" + type + "\n";
  text += lines.join("\n");
  text += "\n```\n\n";
  return text;
};

const createLine = (text: string, bigBreak: boolean = true): string => {
  text += bigBreak ? "\n\n" : "\n";
  return text;
};

const createHeader = (
  text: string,
  type: "#" | "##" | "###" | "####" | "#####",
  bold: boolean = false
): string => {
  return createLine(`${type} ${bold ? "**" + text + "**" : text}`);
};

(async () => {
  let endpoints: Docs = {
    title: "API References",
    sections: [
      {
        title: "Auth endpoints",
        basePath: "/api/auth",
        subsection: authRoutes,
      },
      {
        title: "User endpoints",
        basePath: "/api/user",
        subsection: userRoutes,
      },
    ],
  };

  let newDocFile = "";

  // Title
  newDocFile += "# Express JWT Server Authentication\n\n";

  // Table of contents
  newDocFile += createHeader("Table of contents", "##");
  newDocFile += "- [Instalation](#installation)\n";
  newDocFile += "- [API References](#api-references)\n";

  await Promise.all(
    endpoints.sections.map(async (section) => {
      newDocFile += `    - [${section.title}](#${section.title
        .toLocaleLowerCase()
        .replaceAll(" ", "-")})\n`;
      await Promise.all(
        section.subsection.map((sub) => {
          let path = section.basePath + sub.title;
          newDocFile += `        - [${path}](#${path.replaceAll("/", "")})\n`;
        })
      );
    })
  );
  newDocFile += "- [Error Handling](#error-handling) - TODO\n";
  newDocFile += "- [Types](#types) - TODO \n\n";

  //Installation
  newDocFile += createHeader("Installation", "##");

  //Install with npm
  newDocFile += createLine("Install with npm");
  newDocFile += codeSection("bash", [
    "git clone https://github.com/pawix135/express-jwt-auth.git",
    "cd express-jwt-auth",
    "npm install",
  ]);
  newDocFile += createLine(
    "Change `.env.example` in the root of the directory to `.env` and replace variables with corresponding values."
  );

  // .env example
  newDocFile += codeSection("html", [
    "NODE_ENV=<ENVIRONMENT_TYPE> # production | development",
    "PORT=<SERVER_PORT> # 8080",
    "JWT_ACCESS_SECRET=<ACCESS_TOKEN_SECRET> # openssl rand -base64 32",
    "JWT_REFRESH_SECRET=<REFRESH_TOKEN_SECRET> # openssl rand -base64 32",
    "DATABASE_URL=<DATABASE_URL> # Your Postgres database provider url",
  ]);

  // Generate prisma

  newDocFile += createLine("Geneare Prisma types and create migration.");
  newDocFile += codeSection("bash", [
    "npx prisma generate",
    "npx prisma migrate dev --name init",
  ]);

  // Start server
  newDocFile += createLine("Run development server");
  newDocFile += codeSection("bash", ["npm run dev"]);

  newDocFile += createLine("Build and run - TODO \n\n");
  newDocFile += codeSection("bash", ["npm run build", "node ./dist/server.js"]);

  // Database
  newDocFile += createHeader("Database", "##");
  newDocFile += createLine(
    "The Prisma ORM is built on top of Postgres database. Right now there's only one model."
  );
  newDocFile += codeSection("prisma", [
    "model User {",
    "  id Int @id @default(autoincrement())",
    "  username String @unique",
    "  hash String",
    "  email String? @unique",
    "}",
  ]);

  // API Endpoints
  newDocFile += `# ${endpoints.title}\n\n`;
  await Promise.all(
    endpoints.sections.map(async (section) => {
      newDocFile += `## **${section.title}**\n\n`;

      await Promise.all(
        section.subsection.map(async (sub) => {
          let path = section.basePath + sub.title;
          let headers: string = sub.request.headers
            ? sub.request.headers.join("\n")
            : "";

          // Title
          newDocFile += createHeader(path, "###", true);

          // Subtitle
          if (sub.subtitle) newDocFile += createLine(sub.subtitle);

          // Request section
          newDocFile += createHeader("Request", "####");
          let sectionHeaders: string[] = [];
          if (sub.request.headers) sectionHeaders = sub.request.headers;
          newDocFile += codeSection("http", [
            sub.request.http,
            ...sectionHeaders,
          ]);

          // Request body section
          if (sub.requestBody) {
            newDocFile += createHeader("Request body", "####");
            newDocFile += codeSection("typescript", [sub.requestBody]);
          }

          // Response section
          newDocFile += createHeader("Response", "####");
          newDocFile += codeSection("typescript", [sub.responseBody]);
        })
      );
    })
  );

  fs.writeFile("./src/docs/doc.md", newDocFile, (err) => {
    if (err) console.log;
  });
})();
