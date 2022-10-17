import { ScrollView, View } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import ListItemBasic from "../components/common/ListItemBasic";
import { Headline, Subheading } from "../typography";

interface DietCategoryProps {
	navigation: any;
	route: any;
}

const calculateTotalNutrientValue = (ingredients: Array<any>, unit: string) => {
	const sumOfNutrient = ingredients.reduce((accumulator, ingredient) => {
		if (typeof ingredient[unit] === "number") {
			return accumulator + (ingredient[unit] / 100) * ingredient.gram;
		}
	}, 0);
	return Math.round(sumOfNutrient);
};

const IngredientsScreen: React.FC<DietCategoryProps> = ({ navigation, route }) => {
	const { ingredients, comment } = route.params;
	const { colors, roundness } = useTheme();

	return (
		<ScrollView
			contentContainerStyle={{ padding: 20, paddingBottom: 200 }}
			style={{ backgroundColor: colors.background }}>
			<>
				{typeof comment === "string" && (
					<View
						style={{
							backgroundColor: colors.surface,
							marginBottom: 20,
							padding: 20,
							borderRadius: roundness,
						}}>
						<Headline
							style={{
								fontSize: 22,
								color: colors.highlightText,
								lineHeight: 22,
								marginBottom: 2,
							}}>
							Anders säger:
						</Headline>
						<Subheading>- {comment}</Subheading>
					</View>
				)}
				<View style={{ borderRadius: roundness, backgroundColor: colors.surface }}>
					{ingredients?.map((ingredient: any, index: number) => (
						<View key={index}>
							<ListItemBasic
								style={{ padding: 10, marginRight: 10 }}
								title={ingredient?.name}
								descriptionLeft={`${ingredient?.gram}g`} // dot: \u00B7
								descriptionRight={`${Math.round(
									(ingredient?.kcal / 100) * ingredient?.gram
								)} kcal`}
							/>
							{ingredients?.length !== index + 1 && (
								<Divider style={{ width: "93%", alignSelf: "center" }} />
							)}
						</View>
					))}
				</View>
				<View style={{ flexDirection: "row", justifyContent: "center", padding: 20 }}>
					<Subheading>
						{`${calculateTotalNutrientValue(ingredients, "carbs")}g Kolhydrater \u00B7 `}
					</Subheading>
					<Subheading>
						{`${calculateTotalNutrientValue(ingredients, "fat")}g Fett \u00B7 `}
					</Subheading>
					<Subheading>
						{`${calculateTotalNutrientValue(ingredients, "protein")}g Protein`}
					</Subheading>
				</View>
			</>
		</ScrollView>
	);
};

export default IngredientsScreen;
