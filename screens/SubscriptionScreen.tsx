import { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import Button from "../components/common/Button";
import AuthContext from "../context/Auth";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import dayjs from "dayjs";
import { Headline, Paragraph, Title } from "../typography";

const SubscriptionScreen: React.FC = () => {
	const { user } = useContext(AuthContext);
	const { useAxios } = useAxiosAuthenticated();
	const { colors } = useTheme();
	const [disableButton, setDisableButton] = useState(false);
	const [subscriptionStatus, setSubscriptionStatus] = useState("Avsluta prenumeration");
	const [{ loading: subscriptionLoading }, sendEndSubscription] = useAxios(
		{ url: "/client/edit", method: "POST" },
		{ manual: true }
	);

	const endSubscription = async () => {
		sendEndSubscription({
			data: {
				requested_end_subscription: 1,
				requested_end_subscription_date: dayjs().format(),
			},
		})
			.then(() => {
				setSubscriptionStatus("Under hantering");
				setDisableButton(true);
			})
			.catch(() => Alert.alert("Something went wrong! Try again."));
	};

	useEffect(() => {
		if (user?.requested_end_subscription === 1) {
			setSubscriptionStatus("Under hantering");
			setDisableButton(true);
		}
	}, [user]);

	return (
		<View style={{ padding: 20, flex: 1, backgroundColor: colors.background }}>
			<View style={[styles.subscriptionContainer, { backgroundColor: colors.surface }]}>
				<Headline>Prenumeration</Headline>
				<Divider
					style={{ backgroundColor: colors.primary, height: 2, marginBottom: 10 }}
				/>
				<Title style={{ alignSelf: "flex-start", marginBottom: 5 }}>Uppsägning</Title>
				<Paragraph style={{ marginBottom: 5 }}>
					Kundens uppsägning av avtalet skall vara skriftlig och ske senast 30 dagar före
					utgången av löpande avtalstid.
				</Paragraph>
				<Paragraph style={{ marginBottom: 5 }}>
					Avtalet löper annars vidare med en månad i taget till dess Kunden sagt upp det
					på sätt som anges ovan, d v s senast 30 dagar före kommande betalning. Under
					fortlöpande avtalstid gäller samma villkor som tidigare.
				</Paragraph>
				<Paragraph style={{ marginBottom: 5 }}>
					Kundens uppsägning av avtalet under löpande avtalstid är bara giltig om Kunden
					genom läkarintyg kan visa att Kunden på grund av sjukdom eller skada är
					oförmögen att fullfölja under resterande del av avtalstiden
				</Paragraph>
				<Button
					disable={disableButton}
					style={{ marginTop: 20 }}
					onPress={endSubscription}
					loading={subscriptionLoading}>
					{subscriptionStatus}
				</Button>
			</View>
		</View>
	);
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
	subscriptionContainer: {
		padding: 20,
		marginBottom: 20,
		borderRadius: 5,
	},
});
