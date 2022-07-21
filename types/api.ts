import { User } from "./types";

interface LoginResponse {
	token: string;
	user: User;
}

interface LoginWithTokenResponse {
	client: User;
}

export { LoginResponse, LoginWithTokenResponse };
