import { ImageInfo } from "expo-image-picker";
import React, {
	useState,
	FunctionComponent,
	useMemo,
	useEffect,
	useContext,
} from "react";
import { Alert } from "react-native";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import { ValidInput } from "../types/types";
import AuthContext from "./Auth";

type ContextType = {
	notAllFieldsAreValid: boolean;
	setNotAllFieldAreValid: (value: boolean) => void;
	submitWeeklyReport: () => Promise<string>;
	/* START OF CHECK-IN PAGE 1 */
	weight: ValidInput | null;
	biceps: ValidInput | null;
	glutes: ValidInput | null;
	waist: ValidInput | null;
	thighs: ValidInput | null;
	weeklySteps: ValidInput | null;
	frontImage: ImageInfo | undefined;
	backImage: ImageInfo | undefined;
	sideImage: ImageInfo | undefined;
	setWeight: (weight: ValidInput) => void;
	setBiceps: (biceps: ValidInput) => void;
	setGlutes: (glutes: ValidInput) => void;
	setWaist: (waist: ValidInput) => void;
	setThighs: (thighs: ValidInput) => void;
	setWeeklySteps: (weeklySteps: ValidInput) => void;
	setFrontImage: (frontImage: ImageInfo | undefined) => void;
	setBackImage: (backImage: ImageInfo | undefined) => void;
	setSideImage: (sideImage: ImageInfo | undefined) => void;
	/* START OF CHECK-IN PAGE 2 */
	howHasTheWeekBeen: string;
	completedChallenges: ValidInput | null;
	didThingsGoAsPlanned: ValidInput | null;
	setHowHasTheWeekBeen: (howHasTheWeekBeen: string) => void;
	setCompletedChallenges: (completedChallenges: ValidInput) => void;
	setDidThingsGoAsPlanned: (didThingsGoAsPlanned: ValidInput) => void;
	/* START OF CHECK-IN PAGE 3 */
	havePlansForNextWeek: string;
	nextWeeksWorkoutDays: Array<string>;
	challengesForNextWeek: ValidInput | null;
	setHavePlansForNextWeek: (havePlansForNextWeek: string) => void;
	setNextWeeksWorkoutDays: (nextWeeksWorkoutDays: any) => void;
	setChallengesForNextWeek: (challengesForNextWeek: ValidInput) => void;
};

const WeeklyReport = React.createContext<ContextType>({
	notAllFieldsAreValid: true,
	setNotAllFieldAreValid: () => {},
	submitWeeklyReport: async () => "",
	/* START OF CHECK-IN PAGE 1 */
	weight: { valid: false, text: "" },
	biceps: { valid: false, text: "" },
	glutes: { valid: false, text: "" },
	waist: { valid: false, text: "" },
	thighs: { valid: false, text: "" },
	weeklySteps: { valid: false, text: "" },
	frontImage: undefined,
	backImage: undefined,
	sideImage: undefined,
	setWeight: () => {},
	setBiceps: () => {},
	setGlutes: () => {},
	setWaist: () => {},
	setThighs: () => {},
	setWeeklySteps: () => {},
	setFrontImage: () => {},
	setBackImage: () => {},
	setSideImage: () => {},
	/* START OF CHECK-IN PAGE 2 */
	howHasTheWeekBeen: "Jättebra",
	completedChallenges: { valid: false, text: "" },
	didThingsGoAsPlanned: { valid: false, text: "" },
	setHowHasTheWeekBeen: () => {},
	setCompletedChallenges: () => {},
	setDidThingsGoAsPlanned: () => {},
	/* START OF CHECK-IN PAGE 3 */
	havePlansForNextWeek: "Ja, det har jag.",
	nextWeeksWorkoutDays: [],
	challengesForNextWeek: { valid: false, text: "" },
	setHavePlansForNextWeek: () => {},
	setNextWeeksWorkoutDays: () => {},
	setChallengesForNextWeek: () => {},
});

interface WeeklyReportProps {
	children: any;
}
export const WeeklyReportContextProvider: FunctionComponent<WeeklyReportProps> = ({
	children,
}) => {
	const { updateUser, user, token } = useContext(AuthContext);
	const { useAxios } = useAxiosAuthenticated();
	const [, postWeeklyCheckIn] = useAxios(
		{
			method: "POST",
			headers: { Authorization: "Bearer " + token },
			url: "/update/create",
		},
		{ manual: true }
	);
	const [, weeklyReportSent] = useAxios(
		{
			url: "/client/edit",
			headers: { Authorization: "Bearer " + token },
			method: "POST",
			data: { weekly_update_sent: 1 },
		},
		{ manual: true }
	);
	const [notAllFieldsAreValid, setNotAllFieldAreValid] = useState<boolean>(true);
	// START OF CHECK-IN PAGE 1 { text: "50", valid: true }
	const [weight, setWeight] = useState<ValidInput | null>(null);
	const [biceps, setBiceps] = useState<ValidInput | null>(null);
	const [glutes, setGlutes] = useState<ValidInput | null>(null);
	const [waist, setWaist] = useState<ValidInput | null>(null);
	const [thighs, setThighs] = useState<ValidInput | null>(null);
	const [weeklySteps, setWeeklySteps] = useState<ValidInput | null>(null);
	const [frontImage, setFrontImage] = useState<ImageInfo | undefined>();
	const [backImage, setBackImage] = useState<ImageInfo | undefined>();
	const [sideImage, setSideImage] = useState<ImageInfo | undefined>();
	// START OF CHECK-IN PAGE 2
	const [howHasTheWeekBeen, setHowHasTheWeekBeen] = useState("Jättebra");
	const [completedChallenges, setCompletedChallenges] = useState<ValidInput | null>(null);
	const [didThingsGoAsPlanned, setDidThingsGoAsPlanned] = useState<ValidInput | null>(
		null
	);
	// START OF CHECK-IN PAGE 3
	const [havePlansForNextWeek, setHavePlansForNextWeek] = useState("Ja, det har jag.");
	const [nextWeeksWorkoutDays, setNextWeeksWorkoutDays] = useState<Array<string>>([]);
	const [challengesForNextWeek, setChallengesForNextWeek] = useState<ValidInput | null>(
		null
	);

	const submitWeeklyReport = async (): Promise<string> => {
		try {
			const fields = {
				/* START OF CHECK-IN PAGE 1 */
				weight: weight?.text,
				biceps: biceps?.text,
				glutes: glutes?.text,
				waist: waist?.text,
				thighs: thighs?.text,
				weeklySteps: weeklySteps?.text,
				frontImage: frontImage?.base64
					? `data:image/jpg;base64,${frontImage?.base64}`
					: undefined,
				backImage: backImage?.base64
					? `data:image/jpg;base64,${backImage?.base64}`
					: undefined,
				sideImage: sideImage?.base64
					? `data:image/jpg;base64,${sideImage?.base64}`
					: undefined,
				/* START OF CHECK-IN PAGE 2 */
				howHasTheWeekBeen: howHasTheWeekBeen,
				completedChallenges: completedChallenges?.text,
				didThingsGoAsPlanned: didThingsGoAsPlanned?.text,
				/* START OF CHECK-IN PAGE 3 */
				havePlansForNextWeek: havePlansForNextWeek,
				nextWeeksWorkoutDays: nextWeeksWorkoutDays.toString(),
				challengesForNextWeek: challengesForNextWeek?.text,
			};

			const responseStatus = await postWeeklyCheckIn({ data: fields })
				.then((response) => {
					return response.status;
				})
				.catch(() => {});

			if (responseStatus === 200) {
				await weeklyReportSent({}).catch((e) => {});
				updateUser();
			} else {
				return "error";
			}

			return "success";
		} catch (error) {
			return "error";
		}
	};

	/* Check that all validation fields are validated */
	// 1. Place variables to validate in 'fields' array
	// 1. Place variables to validate in dependency array
	// 2. Check if all values are valid
	// 3. Toggle notAllFieldsAreValid to disable "send" button in CheckInScreen.tsx
	useEffect(() => {
		const fieldsToValidate = [
			weight,
			biceps,
			glutes,
			waist,
			thighs,
			weeklySteps,
			completedChallenges,
			didThingsGoAsPlanned,
			challengesForNextWeek,
		];
		const validationRule = (currentField: { valid: boolean }) =>
			currentField?.valid === true;
		const allFieldsAreValidated = fieldsToValidate.every(validationRule);
		if (nextWeeksWorkoutDays.length > 0) {
			if (allFieldsAreValidated === false) {
				setNotAllFieldAreValid(true);
			} else {
				setNotAllFieldAreValid(false);
			}
		} else {
			setNotAllFieldAreValid(true);
		}
	}, [
		weight,
		biceps,
		glutes,
		waist,
		thighs,
		weeklySteps,
		completedChallenges,
		didThingsGoAsPlanned,
		challengesForNextWeek,
		nextWeeksWorkoutDays,
	]);

	const state = useMemo(
		() => ({
			notAllFieldsAreValid,
			setNotAllFieldAreValid,
			submitWeeklyReport,
			/* START OF CHECK-IN PAGE 1 */
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
			/* START OF CHECK-IN PAGE 2 */
			howHasTheWeekBeen,
			completedChallenges,
			didThingsGoAsPlanned,
			setHowHasTheWeekBeen,
			setCompletedChallenges,
			setDidThingsGoAsPlanned,
			/* START OF CHECK-IN PAGE 3 */
			havePlansForNextWeek,
			nextWeeksWorkoutDays,
			challengesForNextWeek,
			setHavePlansForNextWeek,
			setNextWeeksWorkoutDays,
			setChallengesForNextWeek,
		}),
		[
			notAllFieldsAreValid,
			setNotAllFieldAreValid,
			submitWeeklyReport,
			/* START OF CHECK-IN PAGE 1 */
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
			/* START OF CHECK-IN PAGE 2 */
			howHasTheWeekBeen,
			completedChallenges,
			didThingsGoAsPlanned,
			setHowHasTheWeekBeen,
			setCompletedChallenges,
			setDidThingsGoAsPlanned,
			/* START OF CHECK-IN PAGE 3 */
			havePlansForNextWeek,
			nextWeeksWorkoutDays,
			challengesForNextWeek,
			setHavePlansForNextWeek,
			setNextWeeksWorkoutDays,
			setChallengesForNextWeek,
		]
	);

	return <WeeklyReport.Provider value={state}>{children}</WeeklyReport.Provider>;
};

export default WeeklyReport;
