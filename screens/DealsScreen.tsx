import { MaterialIcons } from "@expo/vector-icons";
import { Linking, ScrollView } from "react-native";
import { useTheme, Card } from "react-native-paper";
import Button from "../components/common/Button";
import { Text } from "../typography";

const deals = [
	{
		title: "15% hos Enough",
		description:
			"Jag har nu möjlighet att erbjuda er en rabatt  hos Enough! 15% om ni uppger kod: anders15",
		url: "https://www.enough-store.se/kosttillskott/",
	},
	{
		title: "30% hos BB och GASP",
		description:
			"Ni får nu 30% rabatt på kläder och tillbehör genom att använda koden ALCOACHING30#. Denna kod är inte bara för ett köp utan ni kan använda den året ut vid köp hos både BB och GASP.",
		url: "https://www.betterbodies.com/",
	},
	{
		title: "10% hos Gripstars",
		description:
			"Nu har ni alla möjlighet till ett magiskt grepp till ett grymt pris genom mig. 10% rabatt hos gripstars med koden: Anders10",
		url: "https://www.gripstars.com/",
	},
];

const DealsScreen: React.FC = () => {
	const { colors } = useTheme();

	return (
		<ScrollView
			contentContainerStyle={{ paddingBottom: 40 }}
			style={{
				padding: 20,
				backgroundColor: colors.background,
			}}>
			{deals.map((deal, index) => (
				<Card style={{ marginBottom: 20 }} key={index}>
					<Card.Title
						titleStyle={{ textDecorationLine: "underline" }}
						leftStyle={{ marginRight: 0 }}
						title={deal.title}
						left={() => (
							<MaterialIcons name='local-offer' size={30} color={colors.primary} />
						)}
					/>
					{/**
					 * 
					<Card.Cover
						source={{
							uri: deal.image,
						}}
					/>
						*/}
					<Card.Content>
						<Text style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
							{deal.description}
						</Text>
						<Button style={{ marginBottom: 0 }} onPress={() => Linking.openURL(deal.url)}>
							Gå till erbjudande
						</Button>
					</Card.Content>
				</Card>
			))}
		</ScrollView>
	);
};

export default DealsScreen;
