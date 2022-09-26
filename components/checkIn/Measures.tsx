import { View, Image, TouchableOpacity } from "react-native";
import { Divider, TextInput, useTheme } from "react-native-paper";
import InputValidation from "../InputValidation";
import { useImagePicker } from "../../hooks/useImagePicker";
import { FontAwesome5 } from "@expo/vector-icons";
import { useContext, useState } from "react";
import WeeklyReport from "../../context/WeeklyReport";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Headline, Subheading } from "../../typography";

const Measures: React.FC = () => {
	const [uploadImageWidth, setUploadImageWidth] = useState<number>(0);
	const {
		weight,
		biceps,
		glutes,
		waist,
		thighs,
		weeklySteps,
		frontImage,
		backImage,
		sideImage,
		setWeight,
		setBiceps,
		setGlutes,
		setWaist,
		setThighs,
		setWeeklySteps,
		setFrontImage,
		setBackImage,
		setSideImage,
	} = useContext(WeeklyReport);
	const { colors } = useTheme();
	const { pickImage } = useImagePicker();

	return (
		<KeyboardAwareScrollView
			style={{ marginBottom: 30 }}
			enableOnAndroid
			contentContainerStyle={{ paddingHorizontal: 25 }}>
			<Headline style={{ marginBottom: 20, color: colors.highlightText }}>
				Veckans framsteg
			</Headline>
			<Divider style={{ backgroundColor: colors.primary, marginBottom: 20 }} />
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Subheading style={{ marginBottom: 30 }}>Vikt *</Subheading>
				<InputValidation
					value={weight?.text}
					onValidation={(valid: boolean, text) => setWeight({ valid, text })}
					validationRule='weightOrHeight'
					maxLength={6}
					textAlign='center'
					errorMessage='Ange ett svar.'
					returnKeyType='done'
					keyboardType='number-pad'
					validationContainerStyle={{ minWidth: 130 }}
					right={<TextInput.Affix text='kg' />}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Subheading style={{ marginBottom: 30 }}>Biceps *</Subheading>
				<InputValidation
					value={biceps?.text}
					onValidation={(valid: boolean, text) => setBiceps({ valid, text })}
					validationRule='weightOrHeight'
					maxLength={6}
					textAlign='center'
					errorMessage='Ange ett svar.'
					returnKeyType='done'
					keyboardType='number-pad'
					validationContainerStyle={{ minWidth: 130 }}
					right={<TextInput.Affix text='cm' />}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Subheading style={{ marginBottom: 30 }}>Rumpa *</Subheading>
				<InputValidation
					value={glutes?.text}
					onValidation={(valid: boolean, text) => setGlutes({ valid, text })}
					validationRule='weightOrHeight'
					maxLength={6}
					textAlign='center'
					errorMessage='Ange ett svar.'
					returnKeyType='done'
					keyboardType='number-pad'
					validationContainerStyle={{ minWidth: 130 }}
					right={<TextInput.Affix text='cm' />}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Subheading style={{ marginBottom: 30 }}>Midja *</Subheading>
				<InputValidation
					value={waist?.text}
					onValidation={(valid: boolean, text) => setWaist({ valid, text })}
					validationRule='weightOrHeight'
					maxLength={6}
					textAlign='center'
					errorMessage='Ange ett svar.'
					returnKeyType='done'
					keyboardType='number-pad'
					validationContainerStyle={{ minWidth: 130 }}
					right={<TextInput.Affix text='cm' />}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Subheading style={{ marginBottom: 30 }}>Lår *</Subheading>
				<InputValidation
					value={thighs?.text}
					onValidation={(valid: boolean, text) => setThighs({ valid, text })}
					validationRule='weightOrHeight'
					maxLength={6}
					textAlign='center'
					errorMessage='Ange ett svar.'
					returnKeyType='done'
					keyboardType='number-pad'
					validationContainerStyle={{ minWidth: 130 }}
					right={<TextInput.Affix text='cm' />}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Subheading style={{ maxWidth: "50%", marginBottom: 30 }}>
					Antal steg i snitt senaste veckan *
				</Subheading>
				<InputValidation
					value={weeklySteps?.text}
					onValidation={(valid: boolean, text) => setWeeklySteps({ valid, text })}
					validationRule={"onlyDigits"}
					maxLength={10}
					textAlign='center'
					errorMessage='Ange ett svar.'
					returnKeyType='done'
					keyboardType='number-pad'
					validationContainerStyle={{ minWidth: 130 }}
					right={<TextInput.Affix text='steg' />}
				/>
			</View>
			{/* BELOW HERE IS THE UPLOAD IMAGES ELEMENTS */}
			<Divider style={{ backgroundColor: colors.primary, marginTop: 5 }} />
			<View style={{ marginVertical: 20 }}>
				<Subheading style={{ marginBottom: 20 }}>
					Bilder (Frivilligt, men fördelaktigt)
				</Subheading>
				<View
					onLayout={(event) => {
						const { width } = event.nativeEvent.layout;
						setUploadImageWidth(width);
					}}
					style={{ flex: 1, marginBottom: 10 }}>
					<TouchableOpacity
						style={{
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
							height: uploadImageWidth,
							borderWidth: 1,
							borderColor: colors.highlightText,
							borderRadius: 5,
						}}
						onPress={() => pickImage().then((base64Img) => setFrontImage(base64Img))}>
						{!frontImage && <Headline>Framsida</Headline>}
						{!frontImage && (
							<Subheading style={{ textAlign: "center", padding: 10 }}>
								Tryck för att ladda upp bild
							</Subheading>
						)}
						{frontImage && (
							<>
								<View
									style={{
										backgroundColor: "rgba(0,0,0,1)",
										borderRadius: 5,
									}}>
									<Image
										source={{ uri: `data:image/jpeg;base64,${frontImage.base64}` }}
										style={{
											width: uploadImageWidth,
											height: uploadImageWidth,
											marginTop: 0,
											borderRadius: 5,
											opacity: 0.7,
										}}
									/>
								</View>
								<TouchableOpacity
									onPress={() => setFrontImage(undefined)}
									style={{ position: "absolute", top: 3, right: 5 }}>
									<FontAwesome5 name='times-circle' size={20} color='#CBD2D0' />
								</TouchableOpacity>
							</>
						)}
					</TouchableOpacity>
				</View>
				<View style={{ flex: 1, marginBottom: 10 }}>
					<TouchableOpacity
						style={{
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
							height: uploadImageWidth,
							borderWidth: 1,
							borderColor: colors.highlightText,
							borderRadius: 5,
						}}
						onPress={() => pickImage().then((base64Img) => setSideImage(base64Img))}>
						{!sideImage && <Headline>Profil</Headline>}
						{!sideImage && (
							<Subheading
								onPress={() => pickImage().then((base64Img) => setSideImage(base64Img))}
								style={{ textAlign: "center", padding: 10 }}>
								Tryck för att ladda upp bild
							</Subheading>
						)}
						{sideImage && (
							<>
								<View
									style={{
										backgroundColor: "rgba(0,0,0,1)",
										borderRadius: 5,
									}}>
									<Image
										source={{ uri: `data:image/jpeg;base64,${sideImage.base64}` }}
										style={{
											width: uploadImageWidth,
											height: uploadImageWidth,
											marginTop: 0,
											borderRadius: 5,
											opacity: 0.7,
										}}
									/>
								</View>
								<TouchableOpacity
									onPress={() => setSideImage(undefined)}
									style={{ position: "absolute", top: 3, right: 5 }}>
									<FontAwesome5 name='times-circle' size={20} color='#CBD2D0' />
								</TouchableOpacity>
							</>
						)}
					</TouchableOpacity>
				</View>
				<View style={{ flex: 1, marginBottom: 10 }}>
					<TouchableOpacity
						style={{
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
							height: uploadImageWidth,
							borderWidth: 1,
							borderColor: colors.highlightText,
							borderRadius: 5,
						}}
						onPress={() => pickImage().then((base64Img) => setBackImage(base64Img))}>
						{!backImage && <Headline>Baksida</Headline>}
						{!backImage && (
							<Subheading
								onPress={() => pickImage().then((base64Img) => setBackImage(base64Img))}
								style={{ textAlign: "center", padding: 10 }}>
								Tryck för att ladda upp bild
							</Subheading>
						)}
						{backImage && (
							<>
								<View
									style={{
										backgroundColor: "rgba(0,0,0,1)",
										borderRadius: 5,
									}}>
									<Image
										source={{ uri: `data:image/jpeg;base64,${backImage.base64}` }}
										style={{
											width: uploadImageWidth,
											height: uploadImageWidth,
											marginTop: 0,
											borderRadius: 5,
											opacity: 0.7,
										}}
									/>
								</View>
								<TouchableOpacity
									onPress={() => setBackImage(undefined)}
									style={{ position: "absolute", top: 3, right: 5 }}>
									<FontAwesome5 name='times-circle' size={20} color='#CBD2D0' />
								</TouchableOpacity>
							</>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default Measures;
