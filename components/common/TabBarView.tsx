import { useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { useTheme } from "react-native-paper";
import { TabView, TabBar, TabBarItem, SceneRendererProps } from "react-native-tab-view";
import { Paragraph } from "../../typography";

interface TabBarProps {
	routes: Array<{ key: string; title: string }>;
	renderScene: ({
		route,
		jumpTo,
		position,
	}: SceneRendererProps & { route: any }) => Element;
}

const TabBarView: React.FC<TabBarProps> = (props) => {
	const { routes } = props;
	const { colors, roundness } = useTheme();
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [tabBarItemWidth, setTabBarItemWidth] = useState<number>(100);

	const renderTabBar = (props: any) => (
		<TabBar
			{...props}
			renderIndicator={() => null}
			pressColor={"transparent"}
			indicatorStyle={{ backgroundColor: "white" }}
			style={{
				backgroundColor: colors.surface,
				borderRadius: roundness,
				marginBottom: 20,
			}}
			renderTabBarItem={(props) => (
				<View
					key={Math.random()}
					style={{ flexGrow: 1, margin: 5 }}
					onLayout={(event) => setTabBarItemWidth(event.nativeEvent.layout.width)}>
					<TabBarItem {...props} style={{ padding: 0, justifyContent: "center" }} />
				</View>
			)}
			renderLabel={({ focused, route }) => (
				<View
					key={route.title}
					style={{
						alignItems: "center",
						justifyContent: "center",
						width: tabBarItemWidth,
						flexGrow: 10,
						backgroundColor: focused ? colors.primary : colors.surface,
						borderRadius: roundness,
					}}>
					<Paragraph style={{ color: focused ? colors.surface : colors.text }}>
						{route.title}
					</Paragraph>
				</View>
			)}
		/>
	);

	return (
		<TabView
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			style={{ borderRadius: roundness }}
			renderTabBar={renderTabBar}
			{...props}
		/>
	);
};

export default TabBarView;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingBottom: 0,
	},
});
