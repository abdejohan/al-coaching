import { makeUseAxios } from "axios-hooks";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/Auth";
import Constants from "expo-constants";

export const useAxiosAuthenticated = () => {
	const { token } = useContext(AuthContext);

	const useAxios = makeUseAxios({
		axios: axios.create({
			baseURL: Constants!.manifest!.extra!.apiUrl,
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			maxContentLength: Infinity,
			maxBodyLength: Infinity,
		}),
	});

	return { useAxios };
};
