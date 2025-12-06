export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  phone: number | string;
  role: "adming" | "customer";
}
