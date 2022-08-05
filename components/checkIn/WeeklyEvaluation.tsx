import { useContext } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Divider, useTheme } from "react-native-paper";
import RadioButton from "../common/RadioButton";
import WeeklyReport from "../../context/WeeklyReport";
import InputValidation from "../InputValidation";
import { Headline, Subheading } from "../../typography";

const WeeklyEvaluation: React.FC = () => {
	const {
		howHasTheWeekBeen,
		completedChallenges,
		didThingsGoAsPlanned,
		setHowHasTheWeekBeen,
		setCompletedChallenges,
		setDidThingsGoAsPlanned,
	} = useContext(WeeklyReport);
	const { colors } = useTheme();
	return (
		<KeyboardAwareScrollView
			style={{ marginBottom: 30 }}
			contentContainerStyle={{ paddingHorizontal: 25 }}>
			<View
				style={{
					flexDirection: "column",
				}}>
				<Headline style={{ color: colors.highlightText, marginBottom: 20 }}>
					Föregående vecka
				</Headline>
				<Divider style={{ backgroundColor: colors.primary, marginBottom: 20 }} />
				<Subheading style={{ color: colors.highlightText }}>
					Hur har veckan gått? *
				</Subheading>
				<RadioButton
					value='Jättebra'
					status={howHasTheWeekBeen}
					onPress={() => setHowHasTheWeekBeen("Jättebra")}
				/>
				<RadioButton
					value='Bra'
					status={howHasTheWeekBeen}
					onPress={() => setHowHasTheWeekBeen("Bra")}
				/>
				<RadioButton
					value='Okej'
					status={howHasTheWeekBeen}
					onPress={() => setHowHasTheWeekBeen("Okej")}
				/>
				<RadioButton
					value='Mindre bra'
					status={howHasTheWeekBeen}
					onPress={() => setHowHasTheWeekBeen("Mindre bra")}
				/>
				<Subheading style={{ color: colors.highlightText, marginTop: 20 }}>
					Utmaningar du klarat av? *
				</Subheading>
				<InputValidation
					errorMessage='Ange ett svar.'
					validationRule='text'
					value={completedChallenges?.text}
					onValidation={(valid: boolean, text) => setCompletedChallenges({ valid, text })}
					maxLength={255}
					returnKeyType='done'
					multiline
					numberOfLines={6}
				/>
				<Subheading style={{ color: colors.highlightText, marginTop: 20 }}>
					Följde du din plan? Om inte, vad hände? *
				</Subheading>
				<InputValidation
					errorMessage='Ange ett svar.'
					validationRule='text'
					value={didThingsGoAsPlanned?.text}
					onValidation={(valid: boolean, text) =>
						setDidThingsGoAsPlanned({ valid, text })
					}
					maxLength={255}
					returnKeyType='done'
					multiline
					numberOfLines={6}
				/>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default WeeklyEvaluation;
