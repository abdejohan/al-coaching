import { useContext } from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Divider, useTheme } from "react-native-paper";
import WeeklyReport from "../../context/WeeklyReport";
import InputValidation from "../InputValidation";
import RadioButton from "../common/RadioButton";
import RadioButtonMulti from "../common/RadioButtonMulti";
import { Headline, Subheading } from "../../typography";

const UpcomingWeek: React.FC = () => {
	const { colors } = useTheme();
	const {
		havePlansForNextWeek,
		nextWeeksWorkoutDays,
		challengesForNextWeek,
		setNextWeeksWorkoutDays,
		setHavePlansForNextWeek,
		setChallengesForNextWeek,
	} = useContext(WeeklyReport);

	// 1. Check if the selected day exist in the nextWeeksWorkoutDays array.
	// 2. If day exists, it gets removed
	// 3. If the day does not exists, it gets added
	const checkIfDayExistsInArray = (day: string) => {
		if (nextWeeksWorkoutDays.includes(day)) {
			setNextWeeksWorkoutDays(nextWeeksWorkoutDays.filter((value) => value !== day));
		} else {
			setNextWeeksWorkoutDays((nextWeeksWorkoutDays: Array<string>) => [
				...nextWeeksWorkoutDays,
				day,
			]);
		}
	};

	return (
		<KeyboardAwareScrollView
			style={{ marginBottom: 30 }}
			contentContainerStyle={{ paddingHorizontal: 25 }}>
			<Headline style={{ color: colors.highlightText, marginBottom: 20 }}>
				Kommande vecka
			</Headline>
			<Divider style={{ backgroundColor: colors.primary, marginBottom: 20 }} />

			<Subheading style={{ color: colors.highlightText, marginBottom: 5 }}>
				Har du planerat din kommande vecka? *
			</Subheading>
			<RadioButton
				value='Ja, det har jag.'
				status={havePlansForNextWeek}
				onPress={() => setHavePlansForNextWeek("Ja, det har jag.")}
			/>
			<RadioButton
				value='Nej, inte än.'
				status={havePlansForNextWeek}
				onPress={() => setHavePlansForNextWeek("Nej, inte än.")}
			/>
			{/* BELLOW THIS IS THE MULTI-SELECT WEEKDAY OPTION */}
			<Subheading style={{ color: colors.highlightText, marginTop: 20, marginBottom: 5 }}>
				Vilka dagar ska du träna kommande veckan? *
			</Subheading>
			<RadioButtonMulti
				value='Måndag'
				arrayOfValues={nextWeeksWorkoutDays}
				onPress={() => checkIfDayExistsInArray("Måndag")}
			/>
			<RadioButtonMulti
				value='Tisdag'
				arrayOfValues={nextWeeksWorkoutDays}
				onPress={() => checkIfDayExistsInArray("Tisdag")}
			/>
			<RadioButtonMulti
				value='Onsdag'
				arrayOfValues={nextWeeksWorkoutDays}
				onPress={() => checkIfDayExistsInArray("Onsdag")}
			/>
			<RadioButtonMulti
				value='Torsdag'
				arrayOfValues={nextWeeksWorkoutDays}
				onPress={() => checkIfDayExistsInArray("Torsdag")}
			/>
			<RadioButtonMulti
				value='Fredag'
				arrayOfValues={nextWeeksWorkoutDays}
				onPress={() => checkIfDayExistsInArray("Fredag")}
			/>
			<RadioButtonMulti
				value='Lördag'
				arrayOfValues={nextWeeksWorkoutDays}
				onPress={() => checkIfDayExistsInArray("Lördag")}
			/>
			<RadioButtonMulti
				value='Söndag'
				arrayOfValues={nextWeeksWorkoutDays}
				onPress={() => checkIfDayExistsInArray("Söndag")}
			/>
			{/* BELLOW THIS IS THE MULTI-LINE TEXT INPUTS */}
			<Subheading style={{ color: colors.highlightText, marginTop: 20 }}>
				Har du några utmaningar den kommande veckan? Om ja, hur planerar du att hantera
				dem? *
			</Subheading>
			<InputValidation
				errorMessage='Ange ett svar.'
				validationRule='text'
				value={challengesForNextWeek?.text}
				onValidation={(valid: boolean, text) => setChallengesForNextWeek({ valid, text })}
				maxLength={255}
				returnKeyType='done'
				multiline
				numberOfLines={6}
			/>
		</KeyboardAwareScrollView>
	);
};

export default UpcomingWeek;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 20,
		marginHorizontal: 20,
	},
});
