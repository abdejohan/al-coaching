import React, {
	useState,
	FunctionComponent,
	useEffect,
	useRef,
	useMemo,
	useContext,
	createContext,
} from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { PermissionStatus, Subscription } from "expo-modules-core";
import AuthContext from "./Auth";
import { Notification } from "expo-notifications";
import * as RootNavigation from "../navigation/RootNavigation";

type ContextType = {
	permissionStatus: PermissionStatus | undefined;
	setPermissionStatus: (status: PermissionStatus) => void;
	chatBadgeCount: number;
	setChatBadgeCount: (count: number) => void;
	currentRoute: string | null;
	setCurrentRoute: (route: string) => void;
};

const NotificationsContext = createContext<ContextType>({
	permissionStatus: undefined,
	chatBadgeCount: 0,
	setChatBadgeCount: () => {},
	setPermissionStatus: () => {},
	currentRoute: null,
	setCurrentRoute: () => {},
});

export const NotificationsContextProvider: FunctionComponent = ({ children }) => {
	const [currentRoute, setCurrentRoute] = useState<string | null>(null);
	const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>();
	const [chatBadgeCount, setChatBadgeCount] = useState<number>(0);
	const [notification, setNotification] = useState<Notification>();
	const lastNotificationResponse = Notifications.useLastNotificationResponse();
	const notificationListener = useRef<Subscription>();
	const { token, user } = useContext(AuthContext);

	if (
		user &&
		notification &&
		notification.request.content.data.type === "CHAT" &&
		currentRoute === "Chat"
	) {
		/** HOW NOTIFICATIONS WILL BE HANDLED WHEN APP IS FOREGROUND (OPEN)  */
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: false,
				shouldPlaySound: false,
				shouldSetBadge: false,
			}),
		});
	} else {
		/** HOW NOTIFICATIONS WILL BE HANDLED WHEN APP IS FOREGROUND (OPEN)  */
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: true,
				shouldPlaySound: true,
				shouldSetBadge: false,
			}),
		});
	}

	/** Check what type of notification is being received when app is in FOREGROUND **/
	/** If its a chat notification, and the current route is not 'Chat'; we increment the chat badge **/
	useEffect(() => {
		if (notification) {
			const { type } = notification.request.content.data;
			if (type === "CHAT" && currentRoute !== "Chat")
				setChatBadgeCount(chatBadgeCount + 1);
		}
	}, [notification]);

	/** Check what type of notification it is when user taps the notification, works in FOREGROUND, BACKGROUND, KILLED **/
	/** If its a chat notification, and the current route is not 'Chat'; we reset the chat badge and route the user to chat screen **/
	useEffect(() => {
		if (
			user &&
			lastNotificationResponse &&
			lastNotificationResponse.actionIdentifier ===
				Notifications.DEFAULT_ACTION_IDENTIFIER
		) {
			const { type } = lastNotificationResponse.notification.request.content.data;
			if (type === "CHAT" && currentRoute !== "Chat") {
				RootNavigation.navigate("Chat");
				setChatBadgeCount(0);
			}
		}
	}, [lastNotificationResponse]);

	/** Android specific settings for how to display notifications */
	useEffect(() => {
		if (Platform.OS === "android") {
			Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FFC83D",
			});
		}

		// This listener is fired whenever a notification is received while the app is foregrounded
		notificationListener.current = Notifications.addNotificationReceivedListener(
			(incomingNotification) => setNotification(incomingNotification)
		);

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current!);
		};
	}, []);

	// This checkes if the user has allowed us to send notifications
	useEffect(() => {
		const checkPermissionToFetchDeviceToken = async () => {
			const { status } = await Notifications.getPermissionsAsync();
			setPermissionStatus(status);
		};
		checkPermissionToFetchDeviceToken();
	}, [token]);

	const state = useMemo(
		() => ({
			chatBadgeCount,
			setChatBadgeCount,
			currentRoute,
			setCurrentRoute,
			permissionStatus,
			setPermissionStatus,
		}),
		[
			chatBadgeCount,
			setChatBadgeCount,
			currentRoute,
			setCurrentRoute,
			permissionStatus,
			setPermissionStatus,
		]
	);

	return (
		<NotificationsContext.Provider value={state}>
			{children}
		</NotificationsContext.Provider>
	);
};

export default NotificationsContext;
