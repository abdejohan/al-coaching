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
import {
	useTheme,
	IconButton,
	Switch,
	Button,
	Divider,
	Text,
	ActivityIndicator,
} from "react-native-paper";
import AuthContext from "../context/Auth";
import NotificationsContext from "../context/Notifications";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import ListItemSetting from "../components/common/ListItemSetting";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useDialog } from "../hooks/useDialog";
import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";
import { Headline, Subheading, Caption } from "../typography";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import avatar_placeholder from "../assets/images/avatar_placeholder.png";
import * as Device from "expo-device";
import * as DocumentPicker from "expo-document-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
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
		userLoading,
		token,
		setDarkMode,
	} = useContext(AuthContext);
	const { permissionStatus, setPermissionStatus } = useContext(NotificationsContext);
	const [allowNotifications, setAllowNotifications] = useState(
		permissionStatus === "granted"
	);
	const [darkmode, setDarkmode] = useState(globaldarkMode ? true : false);
	const { DialogBox, showDialog, hideDialog } = useDialog();
	const [{ loading: avatarLoading }, editClient] = useAxios(
		{
			url: "/client/edit",
			method: "POST",
		},
		{ manual: true }
	);

	const notificationSwitch = () => {
		setAllowNotifications(!allowNotifications);
	};

	const darkmodeSwitch = () => {
		setDarkmode(!darkmode);
	};

	const pickDocument = async () => {
		let pickedImage = await DocumentPicker.getDocumentAsync({
			type: "image/*",
		});

		const manipulatedImageResult = await manipulateAsync(
			// @ts-ignore
			pickedImage.uri,
			[{ resize: { height: 60, width: 60 } }],
			{ base64: true, compress: 1, format: SaveFormat.PNG }
		);

		return manipulatedImageResult.base64;
	};

	// For some reason, using axios for POSTing avatar will give an error and display the Alert message to the user that saving failed.
	// even thought the avatar is succesfully saved to S3 storage.
	const uploadAvatar = async (img: string | undefined | null) => {
		if (typeof img === "string") {
			fetch(Constants!.manifest!.extra!.apiUrl + "/client/edit", {
				method: "POST",
				headers: {
					Authorization: "Bearer " + token,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ avatar: `data:image/png;base64, ${img}` }),
			})
				.then(() => updateUser())
				.catch((error) => Alert.alert("Kunde inte spara bilden, försök igen."));
		}
	};

	const removeAvatar = async () => {
		await editClient({ data: { avatar: null } })
			.then(() => updateUser())
			.catch(() => Alert.alert("Kunde inte ta bort bilden, försök igen."));
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
		const handleInitialNotificationValue = async () => {
			const { status } = await Notifications.getPermissionsAsync();
			setPermissionStatus(status);
			if (status === "granted") {
				setAllowNotifications(true);
			}
		};
		handleInitialNotificationValue();
	}, []);

	useEffect(() => {
		if (allowNotifications && permissionStatus === "undetermined") {
			const handleNotifications = async () => {
				const { status } = await Notifications.requestPermissionsAsync();
				setPermissionStatus(status);
				if (status === "granted") {
					const expoToken = (await Notifications.getExpoPushTokenAsync()).data;
					if (typeof expoToken === "string" && Device.isDevice && user !== undefined) {
						editClient({ data: { device_token: expoToken } });
					}
				} else {
					setAllowNotifications(false);
				}
			};
			handleNotifications();
		}
	}, [allowNotifications]);

	// Sets event listener for app state
	useEffect(() => {
		const subscription = AppState.addEventListener("change", handleAppStateChange);
		return () => {
			subscription.remove();
		};
	}, [permissionStatus]);

	// Will check if permission changed after user returns to app after changing notifications settings in native app settings
	const handleAppStateChange = async (nextAppState: AppStateStatus) => {
		if (nextAppState === "active") {
			const { status } = await Notifications.getPermissionsAsync();
			if (status === "granted") {
				const expoToken = (await Notifications.getExpoPushTokenAsync()).data;
				if (typeof expoToken === "string" && Device.isDevice && user !== undefined) {
					editClient({ data: { device_token: expoToken } });
				}
				setAllowNotifications(true);
			}
			setPermissionStatus(status);
		}
	};

	return (
		<ScrollView
			contentContainerStyle={styles.innerContainer}
			style={[styles.container, { backgroundColor: colors.background }]}>
			<View>
				{avatarLoading || userLoading ? (
					<ActivityIndicator size='small' style={{ ...styles.image }} />
				) : (
					<>
						<Image
							source={user?.avatar ? { uri: user?.avatar } : avatar_placeholder}
							style={{ ...styles.image, borderRadius: roundness }}
						/>
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
									pickDocument()
										.then((base64Img) => uploadAvatar(base64Img))
										.catch(() => null);
								}}
								style={{ margin: 0 }}>
								välj foto
							</Button>
							<Divider />
							<Button
								mode='text'
								color={colors.error}
								onPress={() => {
									hideDialog();
									user?.avatar && removeAvatar();
								}}
								style={{ margin: 0 }}>
								Ta bort foto
							</Button>
						</DialogBox>
					</>
				)}
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
							disabled={permissionStatus === "denied"}
							thumbColor={colors.surface}
							trackColor={{ true: colors.primary, false: colors.background }}
							value={allowNotifications}
							onValueChange={notificationSwitch}
						/>
					}
					leftIcon={<FontAwesome5 name='bell' size={22} color={colors.primary} />}
				/>
				{permissionStatus === "denied" && (
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
				{permissionStatus === "granted" && !allowNotifications && (
					<View style={{ paddingBottom: 10 }}>
						<Caption style={{ fontSize: 12, lineHeight: 16, paddingLeft: 5 }}>
							För att stäng av notiser helt behöver du ändra i dina{" "}
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
					onPress={() => navigation.navigate("Deals")}
					title='Erbjudanden'
					rightIcon={
						<View style={{ marginRight: 15 }}>
							<FontAwesome5 name='chevron-right' size={22} color={colors.onSurface} />
						</View>
					}
					leftIcon={<MaterialIcons name='local-offer' size={24} color={colors.primary} />}
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
