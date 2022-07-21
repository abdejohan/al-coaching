import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContextProvider } from "./context/Auth";
import { AppState, AppStateStatus } from "react-native";
import { NotificationsContextProvider } from "./context/Notifications";
import { ThemeProvider } from "./context/Theme";
import { WeeklyReportContextProvider } from "./context/WeeklyReport";
import * as Notifications from "expo-notifications";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import * as SystemUI from "expo-system-ui";
import NetInfo from "@react-native-community/netinfo";
import NoConnection from "./components/NoConnection";

const App: React.FC = () => {
	const { isLoadingComplete, initialRoute } = useCachedResources();
	const [networkConnection, setNetworkConnection] = useState<boolean>(false);

	// This makes sure that the app is only visible for uers if they have network connection
	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) =>
			setNetworkConnection(state.isConnected ? true : false)
		);

		return () => {
			unsubscribe();
		};
	}, []);

	/**	 useEffect(() => {
		 const colorFunction = async () => {
			 const color = await SystemUI.getBackgroundColorAsync();
			 console.log("SYSTEM COLOR: " + color?.toString());
			};
			colorFunction();
		}, []); 	*/

	/** This will clear the notifications badge */
	useEffect(() => {
		const subscription = AppState.addEventListener("change", _handleAppStateChange);
		return () => {
			subscription.remove();
		};
	}, []);

	/** This will clear the notifications badge */
	const _handleAppStateChange = (nextAppState: AppStateStatus) => {
		// If you need to know if app just came from background, use if statement below
		// if (appState.current.match(/inactive|background/) && nextAppState === "active")
		if (nextAppState === "active") Notifications.setBadgeCountAsync(0);
	};

	if (!isLoadingComplete) {
		return null;
	}
	return (
		<SafeAreaProvider>
			<AuthContextProvider initialRoute={initialRoute}>
				<NotificationsContextProvider>
					<WeeklyReportContextProvider>
						<ThemeProvider>
							<Navigation initialRoute={initialRoute} />
							{!networkConnection && <NoConnection />}
						</ThemeProvider>
					</WeeklyReportContextProvider>
				</NotificationsContextProvider>
			</AuthContextProvider>
		</SafeAreaProvider>
	);
};

export default App;
