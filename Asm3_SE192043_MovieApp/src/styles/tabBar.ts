import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    shadowColor: "#8A1C1C",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 24,
  },
  container: {
    flexDirection: "row",
    paddingTop: 14,
    paddingBottom: 12,
    overflow: "hidden",
  },
  navBarFill: {
    backgroundColor: "#200B0B",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 4,
  },
});
