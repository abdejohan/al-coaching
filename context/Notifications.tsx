import React, {
	useState,
	FunctionComponent,
	useEffect,
	useRef,
	useMemo,
	useContext,
	createContext,
	useCallback,
} from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { PermissionStatus, Subscription } from "expo-modules-core";
import AuthContext from "./Auth";
import { Notification, NotificationResponse } from "expo-notifications";
import * as RootNavigation from "../navigation/RootNavigation";
import * as Device from "expo-device";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";

type ContextType = {
	permissionStatus: PermissionStatus | undefined;
	setPermissionStatus: (status: PermissionStatus) => void;
	chatBadgeCount: number;
	setChatBadgeCount: (count: number) => void;
	currentRoute: string | null;
	setCurrentRoute: (route: string) => void;
	handleTappedNotifications: (notification: NotificationResponse) => void;
};

const NotificationsContext = createContext<ContextType>({
	permissionStatus: undefined,
	chatBadgeCount: 0,
	setChatBadgeCount: () => {},
	setPermissionStatus: () => {},
	currentRoute: null,
	setCurrentRoute: () => {},
	handleTappedNotifications: () => {},
});

export const NotificationsContextProvider: FunctionComponent = ({ children }) => {
	const [currentRoute, setCurrentRoute] = useState<string | null>(null);
	const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>();
	const [chatBadgeCount, setChatBadgeCount] = useState<number>(0);
	const [notification, setNotification] = useState<Notification>();
	const notificationListener = useRef<Subscription>();
	const { token, user } = useContext(AuthContext);
	const { useAxios } = useAxiosAuthenticated();
	const [{}, editClient] = useAxios(
		{
			url: "/client/edit",
			method: "POST",
		},
		{ manual: true }
	);

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
	/** BE CAREFUL USING THIS BEFORE NAVIGATION IS READY (WILL NOT NAVIGATE). ALSO MIGHT WANT TO MAKE SURE 'USER' IS NOT NULL. **/
	const handleTappedNotifications = useCallback((notification: NotificationResponse) => {
		if (notification) {
			const { type } = notification.notification.request.content.data;
			if (type === "CHAT" && currentRoute !== "Chat") {
				RootNavigation.navigate("Chat");
				setChatBadgeCount(0);
			}
		}
	}, []);

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

	// Save device token if access is granted
	useEffect(() => {
		const handleNotifications = async () => {
			const { status } = await Notifications.getPermissionsAsync();
			if (status === "granted") {
				const expoToken = (await Notifications.getExpoPushTokenAsync()).data;
				if (typeof expoToken === "string" && Device.isDevice && user !== undefined) {
					editClient({ data: { device_token: expoToken } })
						.then((res) => console.log("WORKED FINE: " + expoToken))
						.catch((e) => console.log("did not work: " + expoToken));
				}
			}
		};
		handleNotifications();
	}, []);

	const state = useMemo(
		() => ({
			chatBadgeCount,
			setChatBadgeCount,
			currentRoute,
			setCurrentRoute,
			permissionStatus,
			setPermissionStatus,
			handleTappedNotifications,
		}),
		[
			chatBadgeCount,
			setChatBadgeCount,
			currentRoute,
			setCurrentRoute,
			permissionStatus,
			setPermissionStatus,
			handleTappedNotifications,
		]
	);

	return (
		<NotificationsContext.Provider value={state}>
			{children}
		</NotificationsContext.Provider>
	);
};

export default NotificationsContext;
