# Express JWT Server Authentication

##

---

## Installation

Install with npm

```bash
git clone https://github.com/pawix135/express-jwt-auth.git
cd express-jwt-auth
npm install
```

Change `.env.example` in the root of the directory to `.env` and replace variables with corresponding values.

```bash
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

#### Response

```typescript
interface SignUpResponse {
  auth: boolean;
  message: string;
  error?: string | { mesasge: string; type: AuthErrorType };
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

---

### **Sign in user**

Sets authorization header for access token(30min) and cookie for refresh token(30 days).

##### Request

```http
POST /api/auth/signin HTTP/1.1
Content-Type: application/json
```

##### Request body

```typescript
interface SignIn {
  username: string;
  password: string;
  redirect_uri?: string;
}
```

#### Response

```typescript
interface SignInResponse {
  auth: boolean;
  message: string;
  error?: string | { mesasge: string; type: AuthErrorType };
}
```

##### Example

```typescript
let data: SignIn = {
  username: "example",
  password: "supersecretpassword",
  redirect_uri: "http://localhost:3000/", // Redirect, no response if authentication is successful
};

let signUp = await fetch("/api/auth/signup", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
  },
});
```

---

### **Revoke access token**

If access token expires hit this route with refresh token to sign new access token.

##### Request

```http
POST /api/auth/revoke HTTP/1.1
Cookie: <refresh_token_cookie>
```

#### Response

```http
Authorization: <access_token>
Set-Cookie: <refresh_token>
```

```typescript
interface RevokeResponse {
  auth: boolean;
  message: string;
  access_token?: string;
  error?: string | { mesasge: string; type: AuthErrorType };
}
```

##### Example

```typescript
let signUp = await fetch("/api/auth/revoke", {
  method: "POST",
});
```

---

### **User routes**

- [/api/user/me](#apiuserme) - Return user data
- Settings
  - [/api/user/settings/email](#apiusersettingsemail) - Change user email
  - [/api/user/settings/username](#apiusersettingsusername) - Change username

### **/api/user/me**

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

#### Response

```typescript
interface SignUpResponse {
  auth: boolean;
  message: string;
  error?: string | { mesasge: string; type: AuthErrorType };
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

---

### **/api/user/settings/email**

Sets authorization header for access token(30min) and cookie for refresh token(30 days).

##### Request

```http
POST /api/auth/signin HTTP/1.1
Content-Type: application/json
```

##### Request body

```typescript
interface SignIn {
  username: string;
  password: string;
  redirect_uri?: string;
}
```

#### Response

```typescript
interface SignInResponse {
  auth: boolean;
  message: string;
  error?: string | { mesasge: string; type: AuthErrorType };
}
```

##### Example

```typescript
let data: SignIn = {
  username: "example",
  password: "supersecretpassword",
  redirect_uri: "http://localhost:3000/", // Redirect, no response if authentication is successful
};

let signUp = await fetch("/api/auth/signup", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
  },
});
```

---

### **/api/user/settings/username**

If access token expires hit this route with refresh token to sign new access token.

##### Request

```http
POST /api/auth/revoke HTTP/1.1
Cookie: <refresh_token_cookie>
```

#### Response

```http
Authorization: <access_token>
Set-Cookie: <refresh_token>
```

```typescript
interface RevokeResponse {
  auth: boolean;
  message: string;
  access_token?: string;
  error?: string | { mesasge: string; type: AuthErrorType };
}
```

##### Example

```typescript
let signUp = await fetch("/api/auth/revoke", {
  method: "POST",
});
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
