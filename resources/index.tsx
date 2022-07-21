import Measures from "../components/checkIn/Measures";
import UpcomingWeek from "../components/checkIn/UpcomingWeek";
import WeeklyEvaluation from "../components/checkIn/WeeklyEvaluation";

const checkInSlider = [
	{ key: 1, question: "Veckans framsteg", component: <Measures /> },
	{ key: 2, question: "Hur har veckan gått?", component: <WeeklyEvaluation /> },
	{ key: 3, question: "Utmaningar du klarat av?", component: <UpcomingWeek /> },
];

export { checkInSlider };
