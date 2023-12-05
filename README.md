# Express JWT Server Authentication

## Table of contents

- [Instalation](#installation)
- [API References](#api-references)
    - [Auth endpoints](#auth-endpoints)
        - [/api/auth/signup](#apiauthsignup)
        - [/api/auth/signin](#apiauthsignin)
        - [/api/auth/revoke](#apiauthrevoke)
    - [User endpoints](#user-endpoints)
        - [/api/user/me](#apiuserme)
        - [/api/user/settings](#apiusersettings)
        - [/api/user/settings/username](#apiusersettingsusername)
        - [/api/user/settings/username](#apiusersettingsusername)
        - [/api/user/settings/password](#apiusersettingspassword)
- [Error Handling](#error-handling) - TODO
- [Types](#types) - TODO 

## Installation

Install with npm

```bash
git clone https://github.com/pawix135/express-jwt-auth.git
cd express-jwt-auth
npm install
```

Change `.env.example` in the root of the directory to `.env` and replace variables with corresponding values.

```html
NODE_ENV=<ENVIRONMENT_TYPE> # production | development
PORT=<SERVER_PORT> # 8080
JWT_ACCESS_SECRET=<ACCESS_TOKEN_SECRET> # openssl rand -base64 32
JWT_REFRESH_SECRET=<REFRESH_TOKEN_SECRET> # openssl rand -base64 32
DATABASE_URL=<DATABASE_URL> # Your Postgres database provider url
```

Geneare Prisma types and create migration.

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Run development server

```bash
npm run dev
```

Build and run - TODO 



```bash
npm run build
node ./dist/server.js
```

## Database

The Prisma ORM is built on top of Postgres database. Right now there's only one model.

```prisma
model User {
  id Int @id @default(autoincrement())
  username String @unique
  hash String
  email String? @unique
}
```

# API References

## **Auth endpoints**

### **/api/auth/signup**

Create new user account

#### Request

```http
POST /api/auth/signup HTTP/1.1
Content-Type: application/json
```

#### Request body

```typescript
interface AuthSignUpBody {
  username: string;
  password: string;
}
```

#### Response

```typescript
interface AuthSignUpResponse {
  auth: boolean,
  error?: APIError;
}
```

### **/api/auth/signin**

Signs in user and sets authorization header for access token(30min) and cookie for refresh token(30 days).

#### Request

```http
POST /api/auth/signin HTTP/1.1
Content-Type: application/json
```

#### Request body

```typescript
interface AuthSignInBody {
  username: string;
  password: string;
}
```

#### Response

```typescript
interface AuthSignUpResponse {
  access_token: string;
  auth: boolean;
  error?: APIError;
}
```

### **/api/auth/revoke**

Revoke access token

#### Request

```http
POST /api/auth/revoke HTTP/1.1
Content-Type: application/json
Cookie: <refresh_token>
```

#### Response

```typescript
interface AuthRevokeResponse {
  access_token: string;
  auth: boolean;
  error?: APIError;
}
```

## **User endpoints**

### **/api/user/me**

Return user

#### Request

```http
GET /api/user/me HTTP/1.1
Authorization: Bearer <access_token>
```

#### Response

```typescript
interface UserMeResponse {
  ok: boolean;
  me: User;
  error?: APIError;
}
```

### **/api/user/settings**

Update selected user settings

#### Request

```http
POST /api/user/settings HTTP/1.1
Authorization: Bearer <access_token>
```

#### Request body

```typescript
interface UserChangeSettingsBody{
  username?: string;
  email?: string;
  password?: string;
}
```

#### Response

```typescript
interface UserChangeSettingsResponse {
  ok: boolean;
  success: boolean;
  error?: APIError;
}
```

### **/api/user/settings/username**

Update user username

#### Request

```http
POST /api/user/settings/username HTTP/1.1
Authorization: Bearer <access_token>
```

#### Request body

```typescript
interface UserChangeUsernameBody{
  username: string;
}
```

#### Response

```typescript
interface UserChangeUsernameResponse {
  ok: boolean;
  success: boolean;
  error?: APIError;
}
```

### **/api/user/settings/username**

Update user email

#### Request

```http
POST /api/user/settings/email HTTP/1.1
Authorization: Bearer <access_token>
```

#### Request body

```typescript
interface UserChangeEmailBody{
  email: string;
}
```

#### Response

```typescript
interface UserChangeEmailResponse {
  ok: boolean;
  success: boolean;
  error?: APIError;
}
```

### **/api/user/settings/password**

Update user password

#### Request

```http
POST /api/user/settings/password HTTP/1.1
Authorization: Bearer <access_token>
```

#### Request body

```typescript
interface UserChangePasswordBody{
  password: string;
}
```

#### Response

```typescript
interface UserChangePasswordResponse {
  ok: boolean;
  success: boolean;
  error?: APIError;
}
```

