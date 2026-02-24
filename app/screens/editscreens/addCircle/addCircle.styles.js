import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export const useStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.txt,
    marginLeft: 10
  },
  content: {
    alignItems: "center",
    paddingTop: height * 0.05
  },
  imagePicker: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: 30,
    backgroundColor: colors.compbg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.compbg,
  },
  coverImg: { width: "100%", height: "100%" },
  inputWrapper: {
    width: "85%",
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
    marginBottom: 40,
  },
  input: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.txt,
    paddingVertical: 10,
    textAlign: "center"
  },
  createBtn: {
    width: "85%",
    backgroundColor: colors.accent,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: colors.accent,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  },
  btnText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10
  }
});