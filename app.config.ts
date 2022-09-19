import "dotenv/config";
// d0a058
export default {
	expo: {
		owner: "coach-apps",
		name: "AL Coaching",
		slug: "al-coaching",
		version: "1.5.7",
		orientation: "portrait",
		icon: "./assets/images/icon.png",
		scheme: "myapp",
		backgroundColor: "#121212",
		privacy: "public",
		userInterfaceStyle: "automatic",
		splash: {
			image: "./assets/images/splash.png",
			resizeMode: "contain",
			backgroundColor: "#3DA6AF",
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: false,
			usesIcloudStorage: true,
			buildNumber: "1",
			googleServicesFile: "./GoogleService-Info.plist",
			bundleIdentifier: "io.al.coaching",
		},
		android: {
			package: "app.al.coaching",
			googleServicesFile: "./google-services.json",
			versionCode: 30,
			permissions: ["NOTIFICATIONS"],
			useNextNotificationsApi: true,
			adaptiveIcon: {
				foregroundImage: "./assets/images/adaptive-icon.png",
				backgroundColor: "#3DA6AF",
			},
		},
		androidStatusBar: {
			barStyle: "light-content",
			//backgroundColor: "#121212",
			translucent: true,
		},
		web: {
			favicon: "./assets/images/favicon.png",
		},
		plugins: [
			[
				"expo-build-properties",
				{
					android: {
						enableProguardInReleaseBuilds: true,
					},
				},
			],
			[
				"expo-document-picker",
				{
					appleTeamId: "KAM5Y5YMZ9",
				},
			],
			[
				"expo-notifications",
				{
					icon: "./assets/images/icon.png",
					color: "#1B3E5B",
				},
			],
		],
		extra: {
			eas: {
				projectId: "d5fb7af7-116d-4936-9e78-2254bb8f4f56",
			},
			apiUrl: process.env.API_URL,
			coachSiteUrl: process.env.COACH_SITE_URL,
			coachName: process.env.COACH_NAME,
			chatAppID: process.env.CHAT_APP_ID,
			privacyPolicyUrl: process.env.PRIVACY_POLICY_URL,
		},
	},
};
