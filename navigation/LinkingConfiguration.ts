/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
	prefixes: [Linking.createURL("/")],

	config: {
		screens: {
			Login: {
				screens: {
					LoginScreen: "login",
				},
			},
			LoggedIn: {
				screens: {
					Start: {
						screens: {
							HomeScreen: "one",
						},
					},
					Workout: {
						screens: {
							WorkoutScreen: "workout",
						},
					},
					Diet: {
						screens: {
							DietScreen: "diet",
						},
					},
					Chat: {
						screens: {
							ChatScreen: "chat",
						},
					},
					NotFound: {
						screens: {
							ModalScreen: "notfound",
						},
					},
				},
			},
			Modal: "modal",
			NotFound: "*",
		},
	},
};

export default linking;
