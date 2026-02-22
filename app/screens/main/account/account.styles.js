import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
const wp = (p) => width * (p / 100);
const hp = (p) => height * (p / 100);

export const useStyles = (colors) => StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  backBtn: { padding: wp(4) },
  container: {
    alignItems: "center",
    paddingHorizontal: wp(10),
    justifyContent: 'center',
    flex: 0.8
  },
  pfpContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  pfp: {
    width: wp(45),
    height: wp(45),
    borderRadius: wp(25),
    borderWidth: 4,
    borderColor: colors.compbgd
  },
  name: {
    fontSize: wp(7),
    fontWeight: "900",
    color: colors.txt,
    marginTop: hp(2),
    marginBottom: hp(4)
  },
  btn: {
    width: '100%',
    paddingVertical: hp(2),
    borderRadius: 16,
    marginVertical: hp(1),
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2
  },
  btntxt: {
    fontSize: wp(4.5),
    fontWeight: "bold",
    color: '#FFF'
  },
  signOutBtn: { backgroundColor: "#FF6F61" },
  resetBtn: { backgroundColor: colors.accent },
  deleteBtn: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#FF6F61", marginTop: hp(4) }
});