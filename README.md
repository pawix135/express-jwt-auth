# Express JWT Server Authentication

## Installation

Install with npm

```bash
git clone https://github.com/pawix135/express-jwt-auth.git
cd express-jwt-auth
npm install
```

Change `.env.example` in the root of the directory to `.env` and replace variables with corresponding values.

```bash
NODE_ENV=<ENVIRONMENT_TYPE> # production | development
PORT=<SERVER_PORT> # 8080
JWT_ACCESS_SECRET=<ACCESS_TOKEN_SECRET> # openssl rand -base64 32
JWT_REFRESH_SECRET=<REFRESH_TOKEN_SECRET> # openssl rand -base64 32
DATABASE_URL=<DATABASE_URL> # Your Postgres database provider url
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

## Database

The Postgresql database is built on top of Prisma ORM. Right now there's only one model

```prisma
model User {
  id Int @id @default(autoincrement())
  username String @unique
  hash String
  email String? @unique
}
```

## API References

### Auth routes

- [/api/auth/signup](#apiauthsignup) - Create new user account
- [/api/auth/signin](#apiauthsignin) - Sign in user
- [/api/auth/revoke](#apiauthrevoke) - Revoke access token

### **/api/auth/signup**

Create new user account

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

##### Response

```typescript
interface SignUpResponse {
  auth: boolean;
  message: string;
  error?: AuthError;
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

### **/api/auth/signin**

Signs in user and sets authorization header for access token(30min) and cookie for refresh token(30 days).

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

##### Response

```typescript
interface SignInResponse {
  auth: boolean;
  message: string;
  error?: AuthError;
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

### **/api/auth/revoke**

Revokes access token

##### Request

```http
POST /api/auth/revoke HTTP/1.1
Cookie: <refresh_token_cookie>
```

##### Response

```http
Authorization: <access_token>
Set-Cookie: <refresh_token>
```

```typescript
interface RevokeResponse {
  auth: boolean;
  message: string;
  access_token?: string;
  error?: AuthError;
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
- [/api/user/settings](#apiusersettings) - Change selected settings
- [/api/user/settings/email](#apiusersettingsemail) - Change user email
- [/api/user/settings/username](#apiusersettingsusername) - Change user username
- [/api/user/settings/password](#apiusersettingspassword) - Change user password

### **/api/user/me**

##### Request

```http
GET /api/user/me HTTP/1.1
Authorization: Bearer <access_token>
```

##### Response

```typescript
interface UserMeResponse {
  user: User;
  error?: UserError;
}
```

##### Example

```typescript
let user = await fetch("/api/user/me", {
  method: "GET",
});
```

---

### **/api/user/settings**

Set selected user settings

##### Request

```http
POST /api/user/settings HTTP/1.1
Authorization: Bearer <access_token>
Content-Type: application/json
```

##### Request body

```typescript
interface UserSettings {
  email?: string;
  username?: string;
  password?: string;
}
```

##### Response

```typescript
interface UserSettingsResponse {
  ok: boolean;
  error?: UserError;
}
```

##### Example

```typescript
let data: UserSettings = {
  username: "example-2",
  password: "supersecretpassword123!@#$%",
  email: "user123@example.com"
};

let settingsResponse = await fetch("/api/user/settings", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
    "Authorization": localStorage.get("atoken");
  },
});
```

---

### **/api/user/settings/username**

Changes user username

##### Request

```http
POST /api/user/settings/username HTTP/1.1
Authorization: Bearer <access_token>
```

##### Request body

```typescript
interface UserSettingsUsername {
  username: string;
}
```

###### Response

```typescript
interface UserSettingsResponse {
  ok: boolean;
  error?: UserError;
}
```

##### Example

```typescript
let data: UserSettingsUsername = {
  username: "new_username"
};

let usernameResponse = await fetch("/api/user/settings/username", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
    "Authorization": localStorage.get("atoken");
  },
});
```

---

### **/api/user/settings/email**

Changes user email

##### Request

```http
POST /api/user/settings/email HTTP/1.1
Authorization: Bearer <access_token>
```

##### Request body

```typescript
interface UserSettingsEmail {
  email: string;
}
```

###### Response

```typescript
interface UserSettingsResponse {
  ok: boolean;
  error?: UserError;
}
```

##### Example

```typescript
let data: UserSettingsUsername = {
  email: "newuseremail@example.com"
};

let emailResponse = await fetch("/api/user/settings/email", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
    "Authorization": localStorage.get("atoken");
  },
});
```

---

### **/api/user/settings/password**

Changes user password

##### Request

```http
POST /api/user/settings/password HTTP/1.1
Authorization: Bearer <access_token>
```

##### Request body

```typescript
interface UserSettingsPassword {
  passowrd: string;
}
```

###### Response

```typescript
interface UserSettingsResponse {
  ok: boolean;
  error?: UserError;
}
```

##### Example

```typescript
let data: UserSettingsPassword = {
  password: "ultarnewpassword123@!"
};

let passwordChangeResponse = await fetch("/api/user/settings/pasword", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
    "Authorization": localStorage.get("atoken");
  },
});
```

---

## Error handling

Each API Endpoint return Error object that extends to corresponding route.

**Error interfacje**

```typescript
interface APIError {
  error: {
    message: string;
    type: ErrorType;
  };
}
```

**AuthError**

```typescript
interface AuthError extends APIError {}
```
