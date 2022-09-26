import { useState } from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity } from "react-native";
import { Caption, useTheme, TextInput } from "react-native-paper";
import Button from "../components/common/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import intro_background from "../assets/images/intro_background.jpg";
import { useNavigation } from "@react-navigation/native";
import InputValidation from "../components/InputValidation";
import { ValidInput } from "../types/types";
import { useDialog } from "../hooks/useDialog";
import { Headline, Subheading, Paragraph, Text } from "../typography";
import { StatusBar } from "expo-status-bar";

interface ForgotPasswordProps {
	navigation: any;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordProps> = ({ navigation }) => {
	const { useAxios } = useAxiosAuthenticated();
	const { DialogBox, showDialog, hideDialog } = useDialog();
	const navigate = useNavigation();
	const [email, setEmail] = useState<ValidInput>();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const { colors } = useTheme();
	const [{ loading: newPasswordLoading }, fetchNewPassword] = useAxios(
		{
			url: `/password/email`,
			method: "POST",
			data: { email: email?.text },
		},
		{ manual: true }
	);
	const sendUserNewPassword = () => {
		fetchNewPassword()
			.then((response) => {
				if (response.status === 200) {
					showDialog();
				}
			})
			.catch((error) => setErrorMessage(error.response.data.email));
	};

	return (
		<ImageBackground source={intro_background} style={{ flex: 1 }}>
			<StatusBar style='light' />
			<KeyboardAwareScrollView
				enableOnAndroid
				style={{ backgroundColor: colors.darkestfade }}
				contentContainerStyle={styles.scrollContentContainer}>
				<Headline style={{ color: colors.white, marginBottom: 5 }}>
					Glömt lösenord
				</Headline>
				<Subheading style={{ color: colors.white, fontSize: 18 }}>
					Ange din mailadress så skickar vi information om hur du återställer ditt konto.
				</Subheading>

				<Caption
					style={{ paddingLeft: 10, color: colors.error, minHeight: 20, fontSize: 14 }}>
					{errorMessage ? `${errorMessage}, Försök igen` : null}
				</Caption>
				<Subheading style={{ color: colors.white, marginTop: 10 }}>Mailadress</Subheading>
				<InputValidation
					value={email?.text}
					autoCorrect={false}
					onValidation={(valid: boolean, text) => setEmail({ valid, text })}
					validationRule='email'
					outlineColor={colors.white}
					textAlign={"center"}
					errorMessage='Ange en korrekt mailadress.'
					returnKeyType='done'
					left={<TextInput.Icon color={colors.white} name='account-outline' />}
					style={{
						marginVertical: 2,
						backgroundColor: "transparent",
						marginBottom: 0,
					}}
					theme={{ colors: { text: colors.white } }} // this sets the text color
					activeOutlineColor={colors.white}
					onFocus={() => setErrorMessage(null)}
					placeholderTextColor={colors.white}
					placeholder='Mailadress'
					keyboardType='email-address'
					mode='outlined'
				/>
				<Button
					onPress={!email?.valid ? () => {} : () => sendUserNewPassword()}
					loading={newPasswordLoading}
					style={{ marginBottom: 10 }}>
					{newPasswordLoading ? "Laddar" : "Skicka"}
				</Button>
				<TouchableOpacity onPress={() => navigate.goBack()} style={{ padding: 10 }}>
					<Text style={{ color: colors.white, textAlign: "center" }}> Tillbaka</Text>
				</TouchableOpacity>
				<DialogBox noCancel>
					<View style={{ padding: 20, marginBottom: 20 }}>
						<Headline>Skickat!</Headline>
						<Subheading style={{ marginBottom: 20 }}>
							Instruktioner om hur du återställer ditt lösenord har skickats till den
							angivna mailadressen.
						</Subheading>
						<Paragraph>
							OBS! Mail kan ibland sorteras som skräppost. Om du inte får något mail,
							vänta minst 30 minuter innan du försöker igen. Om problem kvarstår,
							konstakta din coach!
						</Paragraph>
					</View>
					<Button
						style={{ marginBottom: 0 }}
						onPress={() => {
							hideDialog();
							navigate.goBack();
						}}>
						Tillbaka till login
					</Button>
				</DialogBox>
			</KeyboardAwareScrollView>
		</ImageBackground>
	);
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
	scrollContentContainer: {
		justifyContent: "flex-end",
		flex: 1,
		paddingHorizontal: 20,
		marginBottom: 50,
	},
});
