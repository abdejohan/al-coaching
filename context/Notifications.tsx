import React, {
	useState,
	FunctionComponent,
	useEffect,
	useRef,
	useMemo,
	useContext,
	useCallback,
	createContext,
} from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { PermissionStatus, Subscription } from "expo-modules-core";
import AuthContext from "./Auth";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import { Notification, NotificationResponse } from "expo-notifications";

type ContextType = {
	expoPushToken: string | null;
	askForPermission(): Promise<PermissionStatus.GRANTED | undefined>;
	chatBadgeCount: number;
	setChatBadgeCount: (count: number) => void;
	currentRoute: string | null;
	setCurrentRoute: (route: string) => void;
};

const NotificationsContext = createContext<ContextType>({
	expoPushToken: null,
	askForPermission: async () => undefined,
	chatBadgeCount: 0,
	setChatBadgeCount: () => {},
	currentRoute: null,
	setCurrentRoute: () => {},
});

/** HOW NOTIFICATIONS WILL BE HANDLED WHEN APP IS FOREGROUND (OPEN)  */
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

export const NotificationsContextProvider: FunctionComponent = ({ children }) => {
	const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
	const [currentRoute, setCurrentRoute] = useState<string | null>(null);
	const [chatBadgeCount, setChatBadgeCount] = useState<number>(0);
	const [notification, setNotification] = useState<Notification>();
	const [notificationResponse, setNotificationResponse] =
		useState<NotificationResponse>();
	const notificationListener = useRef<Subscription>();
	const responseListener = useRef<Subscription>();
	const { token, user } = useContext(AuthContext);
	const { useAxios } = useAxiosAuthenticated();
	const [, editClient] = useAxios(
		{
			url: "/client/edit",
			method: "POST",
			headers: { Authorization: "Bearer " + token },
		},
		{ manual: true }
	);

	const saveExpoTokenToStore = useCallback(
		async (t: string | null) => {
			if (typeof t === "string" && user) {
				await editClient({ data: { device_token: t } }).catch(() => undefined);
			}
			setExpoPushToken(t);
		},
		[token]
	);

	const askForPermission = useCallback(async (): Promise<
		PermissionStatus.GRANTED | undefined
	> => {
		const { status } = await Notifications.requestPermissionsAsync();
		if (status === "granted") {
			return status;
		} else {
			return undefined;
		}
	}, []);

	useEffect(() => {
		if (
			notification &&
			notification.request.content.data.type === "CHAT" &&
			currentRoute !== "Chat"
		) {
			setChatBadgeCount(chatBadgeCount + 1);
			setNotification(undefined);
		}
	}, [notification]);

	useEffect(() => {
		if (
			notificationResponse &&
			notificationResponse.notification.request.content.data.type === "CHAT" &&
			currentRoute !== "Chat"
		) {
			setChatBadgeCount(chatBadgeCount + 1);
			setNotificationResponse(undefined);
		}
	}, [notificationResponse]);

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
			(incomingNotification) => {
				console.log(incomingNotification);
				setNotification(incomingNotification);
			}
		);
		// This listener is fired whenever a user taps on or interacts
		// with a notification (works when app is foregrounded, backgrounded, or killed)
		responseListener.current = Notifications.addNotificationResponseReceivedListener(
			(incomingNotification) => {
				console.log(" -------- incomingNotification --------");
				setNotificationResponse(incomingNotification);
				console.log(incomingNotification);
			}
		);

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current!);
			Notifications.removeNotificationSubscription(responseListener.current!);
		};
	}, []);

	// This checkes if the user has allowed us to send notifications, and if so we will initialize the listeners
	useEffect(() => {
		if (Device.isDevice && token !== null && user !== undefined) {
			const checkPermissionToFetchDeviceToken = async () => {
				const { status } = await Notifications.getPermissionsAsync();
				if (status === "granted") {
					const fetchedExpoToken = (await Notifications.getExpoPushTokenAsync()).data;
					saveExpoTokenToStore(fetchedExpoToken);
				}
			};
			checkPermissionToFetchDeviceToken();
		}
	}, [token]);

	const state = useMemo(
		() => ({
			expoPushToken,
			askForPermission,
			chatBadgeCount,
			setChatBadgeCount,
			currentRoute,
			setCurrentRoute,
		}),
		[
			askForPermission,
			expoPushToken,
			chatBadgeCount,
			setChatBadgeCount,
			currentRoute,
			setCurrentRoute,
		]
	);

	return (
		<NotificationsContext.Provider value={state}>
			{children}
		</NotificationsContext.Provider>
	);
};

export default NotificationsContext;
