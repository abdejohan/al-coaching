import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/Auth";
import * as TalkRn from "@talkjs/expo";
import { useIsFocused } from "@react-navigation/native";
import NotificationsContext from "../context/Notifications";
import Constants from "expo-constants";
import { View } from "react-native";
import { ActivityIndicator, Colors, useTheme } from "react-native-paper";
import { Headline } from "../typography";

const ChatScreen: React.FC = () => {
	const { user } = useContext(AuthContext);
	const [displayChat, setDisplayChat] = useState(false);
	const { colors } = useTheme();
	const { setChatBadgeCount } = useContext(NotificationsContext);
	const isFocused = useIsFocused();

	const me: TalkRn.User = {
		id: "AL_" + user!.id.toString(),
		photoUrl: user?.avatar,
		name: user?.name,
		role: "default",
	};

	useEffect(() => {
		if (isFocused) {
			setChatBadgeCount(0);
		}
	}, [isFocused]);

	useEffect(() => {
		setTimeout(() => {
			setDisplayChat(true);
		}, 2000);
	}, []);

	const other: TalkRn.User = { id: "AL_1" };
	const conversationBuilder = TalkRn.getConversationBuilder(TalkRn.oneOnOneId(me, other));
	conversationBuilder.setParticipant(me);
	conversationBuilder.setParticipant(other);

	return (
		<View style={{ flex: 1, backgroundColor: colors.white }}>
			{!displayChat && (
				<View
					style={{
						height: "100%",
						backgroundColor: colors.background,
						position: "absolute",
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
						zIndex: 2,
					}}>
					<Headline style={{ marginBottom: 50 }}>Laddar chatten..</Headline>
					<ActivityIndicator animating={true} size={50} color={colors.text} />
				</View>
			)}
			<TalkRn.Session appId={Constants?.manifest?.extra?.chatAppID} me={me}>
				<TalkRn.Chatbox
					showChatHeader={false}
					highlightedWords={["Test"]} // only works with TalkJS growth plan
					conversationBuilder={conversationBuilder}
				/>
			</TalkRn.Session>
		</View>
	);
};

export default ChatScreen;
