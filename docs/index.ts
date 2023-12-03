import fs from "fs";

type DocSubsection = {
  title: string;
  subtitle?: string;
  request: {
    http: string;
    headers?: string[];
  };
  requestBody: string;
  responseBody: string;
};

type DocSection = {
  title: string;
  basePath: string;
  subsection: DocSubsection[];
};

interface XD {
  title: string;
  sections: DocSection[];
}

(async () => {
  let endpoints: XD = {
    title: "API Endpoints",
    sections: [
      {
        title: "Auth endpoints",
        basePath: "/api/auth",
        subsection: [
          {
            title: "/signin",
            subtitle:
              "Signs in user and sets authorization header for access token(30min) and cookie for refresh token(30 days).",
            request: {
              http: "POST /api/auth/signin HTTP/1.1",
              headers: ["Content-Type: application/json"],
            },
            requestBody: `interface SignIn {
  username: string;
  password: string;
  redirect_uri?: string;
}`,
            responseBody: `interface SignInResponse {
                    auth: boolean;
                    message: string;
                    error?: AuthError;
                  }
                  `,
          },
        ],
      },
    ],
  };

  let newDocFile = "";
  newDocFile += `## ${endpoints.title}\n\n`;

  await Promise.all(
    endpoints.sections.map(async (section) => {
      newDocFile += `### ${section.title}\n\n`;

      await Promise.all(
        section.subsection.map((sub) => {
          let path = section.basePath + sub.title;
          newDocFile += `- [${path}](#${path.replaceAll("/", "")})\n`;
        })
      );

      newDocFile += "\n";

      await Promise.all(
        section.subsection.map((sub) => {
          let path = section.basePath + sub.title;

          newDocFile += `### **${path}**\n\n`;
          newDocFile += `${sub.subtitle}\n\n`;
          newDocFile += "#### Request\n\n";
          newDocFile += "```http\n" + sub.request.http + "\n```\n\n";
          newDocFile += "#### Request body\n\n";
          newDocFile += "```typescript\n";
          newDocFile += sub.requestBody + "\n";
          newDocFile += "```\n\n";
        })
      );
    })
  );

  fs.writeFile("./docs/doc.md", newDocFile, (err) => {
    if (err) console.log;
  });
})();
