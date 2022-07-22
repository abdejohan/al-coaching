import { useState, useEffect, useContext } from "react";
import {
	ScrollView,
	StyleSheet,
	View,
	Image,
	Alert,
	TouchableOpacity,
	AppState,
	AppStateStatus,
} from "react-native";
import { useTheme, IconButton, Switch, Button, Divider, Text } from "react-native-paper";
import AuthContext from "../context/Auth";
import NotificationsContext from "../context/Notifications";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import ListItemSetting from "../components/common/ListItemSetting";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useImagePicker } from "../hooks/useImagePicker";
import { useDialog } from "../hooks/useDialog";
import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";
import { Headline, Subheading, Caption } from "../typography";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

interface SettingsProps {
	navigation: any;
}

const SettingsScreen: React.FC<SettingsProps> = ({ navigation }) => {
	const { useAxios } = useAxiosAuthenticated();
	const { colors, roundness } = useTheme();
	const {
		user,
		darkMode: globaldarkMode,
		logout,
		updateUser,
		setDarkMode,
	} = useContext(AuthContext);
	const { askForPermission } = useContext(NotificationsContext);
	const [allowNotifications, setAllowNotifications] = useState(
		user?.send_notifications === 1 ? true : false
	);
	const [darkmode, setDarkmode] = useState(globaldarkMode ? true : false);
	const [nativeNotificationPermission, setNativeNotificationPermission] =
		useState<boolean>(true);
	const { DialogBox, showDialog, hideDialog } = useDialog();
	const { takeImage, pickImage } = useImagePicker();
	const [, editClient] = useAxios(
		{
			url: "/client/edit",
			method: "POST",
		},
		{ manual: true }
	);

	const notificationSwitch = async () => {
		setAllowNotifications(!allowNotifications);
	};

	const darkmodeSwitch = async () => {
		setDarkmode(!darkmode);
	};

	const uploadAvatar = async (img: string | undefined | null) => {
		if (typeof img === "string") {
			await editClient({ data: { avatar: `data:image/jpeg;base64, ${img}` } }).catch(
				(error) => Alert.alert("Kunde inte spara bilden, försök igen.")
			);
			updateUser();
		}
		if (img === undefined || img === null) {
			await editClient({ data: { avatar: null } }).catch((e) =>
				Alert.alert("Kunde inte ta bort bilden, försök igen.")
			);
			updateUser();
		}
	};

	useEffect(() => {
		const handleDarkMode = async () => {
			if (darkmode) {
				await AsyncStorage.setItem("DARK_MODE", "true");
				setDarkMode(true);
			} else {
				await AsyncStorage.setItem("DARK_MODE", "false");
				setDarkMode(false);
			}
		};
		handleDarkMode();
	}, [darkmode]);

	useEffect(() => {
		const checkPermissionBeforeEditingClient = async () => {
			if (allowNotifications) {
				const { status } = await Notifications.getPermissionsAsync();
				if (status === "granted") {
					await editClient({ data: { send_notifications: 1 } });
				} else {
					const permissionStatus = await askForPermission();
					if (permissionStatus === "granted") {
						checkPermissionBeforeEditingClient();
					} else {
						setAllowNotifications(false);
						setNativeNotificationPermission(false);
					}
				}
			}
			if (!allowNotifications) {
				await editClient({ data: { send_notifications: 0 } });
			}
			updateUser();
		};
		checkPermissionBeforeEditingClient();
	}, [allowNotifications]);

	// Sets event listener for app state
	useEffect(() => {
		if (!nativeNotificationPermission) {
			const subscription = AppState.addEventListener("change", handleAppStateChange);
			return () => {
				subscription.remove();
			};
		}
	}, [nativeNotificationPermission]);

	// Will check if permission changed after user returns to app after changing notifications settings in native app settings
	const handleAppStateChange = (nextAppState: AppStateStatus) => {
		if (nextAppState === "active" && !nativeNotificationPermission) {
			checkPermissionOnFocus();
		}
	};

	// Checks the current permission status
	const checkPermissionOnFocus = async () => {
		const { status } = await Notifications.getPermissionsAsync();
		if (status === "granted") {
			setNativeNotificationPermission(true);
		}
	};

	return (
		<ScrollView
			contentContainerStyle={styles.innerContainer}
			style={[styles.container, { backgroundColor: colors.background }]}>
			<View>
				{typeof user?.avatar === "string" ? (
					<Image
						source={{ uri: user?.avatar }}
						style={{ ...styles.image, borderRadius: roundness }}
					/>
				) : (
					<Image
						source={require("../assets/images/avatar_placeholder.png")}
						style={{ ...styles.image, borderRadius: roundness }}
					/>
				)}
				<IconButton
					icon='pencil'
					size={13}
					rippleColor='transparent'
					style={{
						position: "absolute",
						right: -3,
						top: -3,
						margin: 0,
						backgroundColor: colors.background,
					}}
					onPress={showDialog}
				/>
				<DialogBox>
					<Button
						mode='text'
						onPress={() => {
							hideDialog();
							pickImage().then((img) => uploadAvatar(img?.base64));
						}}
						style={{ margin: 0 }}>
						välj foto
					</Button>
					<Divider />
					<>
						<Button
							mode='text'
							onPress={() => {
								hideDialog();
								takeImage().then((img) => uploadAvatar(img?.base64));
							}}
							style={{ margin: 0 }}>
							Ta foto
						</Button>
						<Divider />
					</>
					<Button
						mode='text'
						color={colors.error}
						onPress={() => {
							hideDialog();
							// If an avatar exists; try and delete it (prevents unnecessary api calls)
							typeof user?.avatar === "string" && uploadAvatar(undefined);
						}}
						style={{ margin: 0 }}>
						Ta bort foto
					</Button>
				</DialogBox>
			</View>
			<Headline
				style={{
					marginTop: 20,
					color: colors.highlightText,
				}}>{`${user?.name}`}</Headline>
			<Subheading>{user?.email}</Subheading>
			<View style={{ paddingVertical: 20, width: "100%" }}>
				<Text style={{ alignSelf: "flex-start", marginBottom: 10 }}>Hantera</Text>
				<ListItemSetting
					title='Notiser'
					rightIcon={
						<Switch
							disabled={!nativeNotificationPermission}
							thumbColor={colors.surface}
							trackColor={{ true: colors.primary, false: colors.background }}
							value={allowNotifications}
							onValueChange={notificationSwitch}
						/>
					}
					leftIcon={<FontAwesome5 name='bell' size={22} color={colors.primary} />}
				/>
				{!nativeNotificationPermission && (
					<View style={{ paddingBottom: 10 }}>
						<Caption style={{ fontSize: 12, lineHeight: 16, paddingLeft: 5 }}>
							För att tillåta notiser behöver du ändra i dina{" "}
							<TouchableOpacity onPress={() => Linking.openSettings()}>
								<Caption
									style={{
										fontSize: 12,
										lineHeight: 16,
										top: 3,
										color: "lightblue",
										textDecorationLine: "underline",
									}}>
									inställningar.
								</Caption>
							</TouchableOpacity>
						</Caption>
					</View>
				)}
				<ListItemSetting
					title='Dark mode'
					rightIcon={
						<Switch
							thumbColor={colors.surface}
							trackColor={{ true: colors.primary, false: colors.background }}
							value={darkmode}
							onValueChange={darkmodeSwitch}
						/>
					}
					leftIcon={<FontAwesome5 name='moon' size={22} color={colors.primary} />}
				/>
				<ListItemSetting
					onPress={() => navigation.navigate("Subscription")}
					title='Ansök om uppsägning'
					rightIcon={
						<View style={{ marginRight: 15 }}>
							<FontAwesome5 name='chevron-right' size={22} color={colors.onSurface} />
						</View>
					}
					leftIcon={
						<MaterialIcons name='highlight-remove' size={24} color={colors.primary} />
					}
				/>
				<ListItemSetting
					onPress={() => {
						logout();
						navigation.reset({
							index: 0,
							routes: [{ name: "Login" }],
						});
					}}
					title='Logga ut'
					rightIcon={
						<View style={{ marginRight: 15 }}>
							<FontAwesome5 name='chevron-right' size={22} color={colors.onSurface} />
						</View>
					}
					leftIcon={<MaterialIcons name='logout' size={24} color={colors.primary} />}
				/>
			</View>
			<View style={{ paddingBottom: 20, width: "100%" }}>
				<Text style={{ alignSelf: "flex-start", marginBottom: 10 }}>
					Policy och villkor
				</Text>
				<ListItemSetting
					onPress={() => Linking.openURL(Constants!.manifest!.extra!.privacyPolicyUrl)}
					title='Sekretesspolicy'
					rightIcon={
						<View style={{ marginRight: 15 }}>
							<FontAwesome5 name='chevron-right' size={22} color={colors.onSurface} />
						</View>
					}
					leftIcon={
						<Ionicons name='document-text-outline' size={24} color={colors.primary} />
					}
				/>
				{false && (
					<ListItemSetting
						title='Användarvillkor'
						rightIcon={
							<View style={{ marginRight: 15 }}>
								<FontAwesome5 name='chevron-right' size={22} color={colors.onSurface} />
							</View>
						}
						leftIcon={
							<Ionicons name='document-text-outline' size={24} color={colors.primary} />
						}
					/>
				)}
			</View>
		</ScrollView>
	);
};

export default SettingsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	innerContainer: {
		paddingBottom: 40,
		paddingTop: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 60,
		height: 60,
		margin: 0,
		padding: 0,
	},
});
