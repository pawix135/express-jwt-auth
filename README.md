# Express JWT Server Authentication

<div style="display: flex; flexDirection: row; gap: 5px; flexWrap: wrap; max-width: 100px;">
  <span style="font-size: 12px; padding: 5px 10px; background-color: black; border-radius: 25px;">Express</span>
  <span style="font-size: 12px; padding: 5px 10px; background-color: black; border-radius: 25px;">Jsonwebtoken</span>
  <span style="font-size: 12px; padding: 5px 10px; background-color: black; border-radius: 25px;">Prisma</span>
  <span style="font-size: 12px; padding: 5px 10px; background-color: black; border-radius: 25px;">Zod</span>
</div>

## Installation

Install with npm

```bash
git clone https://github.com/pawix135/express-jwt-auth.git
cd express-jwt-auth
npm install
```

Change `.env.example` in the root of the directory to `.env` and replace variables with corresponding values.

```html
NODE_ENV=<ENVIRONMENT_TYPE>
PORT=<SERVER_PORT>
JWT_ACCESS_SECRET=<ACCESS_TOKEN_SECRET>
JWT_REFRESH_SECRET=<REFRESH_TOKEN_SECRET>
DATABASE_URL=<DATABASE_URL>
```

Generate Prisma types and create migration.

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Run development server

```bash
npm run dev
```

Build and run

```bash
npm run build
node ./dist/server.js
```

## API References

### Auth routes

- [/api/auth/signup](#sign-up-user) - Create user
- [/api/auth/signin](#sign-in-user) - Sign in user
- [/api/auth/revoke](#revoke-access-token) - Revoke access token
  <br /><br />

---

### **Sign up user**

##### Request

```http
POST /api/auth/signup HTTP/1.1
Authorization: Bearer <access_token>
Content-Type: application/json
```

##### Request body

```typescript
interface SignUp {
  username: string;
  password: string;
}
```

##### Example

```typescript
let data: SignUp = {
  username: "example",
  password: "supersecretpassword",
};

let signUp = await fetch("/api/auth/signup", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
  },
});
```

#### Response

```typescript
interface SignUpResponse {
  auth: boolean;
  message: string;
  error?: string | { mesasge: string; type: AuthErrorType };
}
```

---

<!--

```html
  NODE_ENV=<ENVIRONMENT_TYPE>
  PORT=<SERVER_PORT>
  JWT_ACCESS_SECRET=<ACCESS_TOKEN_SECRET>
  JWT_REFRESH_SECRET=<REFRESH_TOKEN_SECRET>
  DATABASE_URL=<DATABASE_URL>
```

 -->
