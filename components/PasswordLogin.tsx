import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { TextInput, ActivityIndicator, useTheme, Caption } from "react-native-paper";
// import l from "../languages";
import Button from "./common/Button";
import AuthContext from "../context/Auth";
import { LoginResponse } from "../types/api";
import useAxios from "axios-hooks";
import Constants from "expo-constants";
import { Text } from "../typography";
import InputValidation from "./InputValidation";
import { ValidInput } from "../types/types";

interface PasswordLoginProps {
	navigation?: any;
}
const PasswordLogin: React.FC<PasswordLoginProps> = ({ navigation }) => {
	const { login } = useContext(AuthContext);
	const { colors } = useTheme();
	const [email, setEmail] = useState<ValidInput>({ valid: false, text: "" });
	const [password, setPassword] = useState<ValidInput>({ valid: false, text: "" });
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const [
		{ data: loginData, loading: loginLoading, error: loginError },
		getSessionAndDomains,
	] = useAxios<LoginResponse>(
		{
			url: `${Constants!.manifest!.extra!.apiUrl}/login`,
			data: {
				email: email.text,
				password: password.text,
			},
			method: "post",
		},
		{ manual: true, useCache: false }
	);

	useEffect(() => {
		if (loginData?.token) {
			login(loginData);
		}
	}, [loginData]);

	const fetchUser = () => {
		getSessionAndDomains().catch((e) => setErrorMessage(e));
	};

	return (
		<View>
			<View>
				<InputValidation
					onValidation={(valid: boolean, text) => setEmail({ valid, text })}
					validationRule={"email"}
					errorMessages={["Ange en giltig emailadress."]}
					autoComplete='email'
					autoCorrect={false}
					mode='outlined'
					outlineColor={colors.white}
					placeholder='Mailadress'
					left={
						<TextInput.Icon
							color={colors.white}
							name='account-outline'
							rippleColor='transparent'
						/>
					}
					placeholderTextColor={colors.white}
					style={{ backgroundColor: "transparent" }}
					theme={{ colors: { text: colors.white } }} // this sets the text color
					activeOutlineColor={colors.white}
					value={email?.text}
					onFocus={() => setErrorMessage(null)}
					keyboardType='email-address'
				/>
				<InputValidation
					onValidation={(valid: boolean, text) => setPassword({ valid, text })}
					validationRule={"min5"}
					errorMessages={["För kort."]}
					// keyboardType="visible-password"
					// returnKeyLabel="logga in"
					autoCapitalize='none'
					autoComplete='password'
					autoCorrect={false}
					mode='outlined'
					outlineColor={colors.white}
					placeholder='Lösenord'
					placeholderTextColor={colors.white}
					left={
						<TextInput.Icon
							color={colors.white}
							name='lock-open-outline'
							rippleColor='transparent'
						/>
					}
					returnKeyType='send'
					secureTextEntry
					clearTextOnFocus
					spellCheck={false}
					style={{ backgroundColor: "transparent" }}
					theme={{ colors: { text: colors.white } }} // this sets the text color
					activeOutlineColor={colors.white}
					value={password?.text}
					onSubmitEditing={fetchUser}
					onFocus={() => setErrorMessage(null)}
				/>
				<View style={{ height: 40, justifyContent: "center" }}>
					{loginLoading && (
						<ActivityIndicator style={{ marginLeft: 10 }} color={colors.white} />
					)}
					{errorMessage && (
						<View style={{ alignItems: "center" }}>
							<Caption style={{ color: colors.error, lineHeight: 12 }}>
								Inloggning misslyckades!
							</Caption>
							<Caption style={{ color: colors.error, lineHeight: 12 }}>
								Kontrollera dina inloggningsuppgifter.
							</Caption>
						</View>
					)}
				</View>
			</View>

			<Button
				style={{ marginBottom: 10 }}
				disable={!password.valid || !email.valid}
				onPress={fetchUser}>
				Logga in
			</Button>
			<TouchableOpacity
				onPress={() => navigation.navigate("ForgotPassword")}
				style={{ padding: 10 }}>
				<Text style={{ color: colors.white, textAlign: "center" }}>Glömt lösenord?</Text>
			</TouchableOpacity>
		</View>
	);
};

export default PasswordLogin;
