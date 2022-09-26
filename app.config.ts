import "dotenv/config";
// d0a058
export default {
	expo: {
		owner: "coach-apps",
		name: "AL Coaching",
		slug: "al-coaching",
		version: "1.6.1",
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
			infoPlist: {
				NSCameraUsageDescription:
					"The app needs camera permission in order for you to take images of your fitness progress",
				NSPhotoLibraryUsageDescription:
					"The app needs camera roll permission in order to add photos you've already taken for upload",
			},
		},
		android: {
			package: "app.al.coaching",
			googleServicesFile: "./google-services.json",
			versionCode: 32,
			permissions: ["NOTIFICATIONS"],
			useNextNotificationsApi: true,
			softwareKeyboardLayoutMode: "pan",
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
