## API Endpoints

### Auth endpoints

- [/api/auth/signin](#apiauthsignin)

### **/api/auth/signin**

Signs in user and sets authorization header for access token(30min) and cookie for refresh token(30 days).

#### Request

```http
POST /api/auth/signin HTTP/1.1
```

#### Request body

```typescript
interface SignIn {
  username: string;
  password: string;
  redirect_uri?: string;
}
```

