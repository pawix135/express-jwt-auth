## API Endpoints

### Auth endpoints

- [/api/auth/signup](#apiauthsignup)
- [/api/auth/signin](#apiauthsignin)

### **/api/auth/signup**

Create new user account

#### Request

```http
POST /api/auth/signup HTTP/1.1
Content-Type: application/json
```

#### Request body

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
  error?: AuthError;
}
```

---

### **/api/auth/signin**

Signs in user and sets authorization header for access token(30min) and cookie for refresh token(30 days).

#### Request

```http
POST /api/auth/signin HTTP/1.1
Content-Type: application/json
```

#### Request body

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
  error?: AuthError;
} 
```

---

