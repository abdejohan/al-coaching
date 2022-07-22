import "dotenv/config";
// d0a058
export default {
	expo: {
		owner: "coach-apps",
		name: "AL Coaching",
		slug: "al-coaching",
		version: "1.0.0",
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
			supportsTablet: true,
			usesIcloudStorage: true,
			buildNumber: "8",
			googleServicesFile: "./GoogleService-Info.plist",
			bundleIdentifier: "io.al.coaching",
		},
		android: {
			package: "se.alcoaching.bebrightr",
			googleServicesFile: "./google-services.json",
			versionCode: 1,
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
			apiUrl: process.env.API_URL,
			coachSite: process.env.COACH_SITE,
			coachName: process.env.COACH_NAME,
			chatAppID: process.env.CHAT_APP_ID,
		},
	},
};
