import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import ListItemBasic from "../components/common/ListItemBasic";
import { Paragraph } from "../typography";

interface DietCategoryProps {
	navigation: any;
	route: any;
}

const IngredientsScreen: React.FC<DietCategoryProps> = ({ navigation, route }) => {
	const { meals } = route.params;
	const { colors, roundness } = useTheme();

	return (
		<View style={{ paddingHorizontal: 20, backgroundColor: colors.background, flex: 1 }}>
			{meals ? (
				<View style={{ borderRadius: roundness, backgroundColor: colors.surface }}>
					{meals?.map((meal: any) => {
						return meal?.products?.map((ingredient: any, index: number) => (
							<View key={index}>
								<ListItemBasic
									style={{ padding: 10, marginRight: 10 }}
									title={ingredient.name}
									descriptionLeft={`${ingredient.gram}g`} // dot: \u00B7
									descriptionRight={`${ingredient.kcal} kcal`}
								/>
								{meal?.products?.length !== index + 1 && (
									<Divider style={{ width: "93%", alignSelf: "center" }} />
								)}
							</View>
						));
					})}
				</View>
			) : (
				<View>
					<Paragraph style={{ textAlign: "center", marginTop: 50 }}>
						Inga ingredienser!{" "}
					</Paragraph>
					<MaterialCommunityIcons
						name='food-drumstick-off-outline'
						size={40}
						color={colors.text}
						style={{ alignSelf: "center", margin: 20 }}
					/>
				</View>
			)}
		</View>
	);
};

export default IngredientsScreen;
