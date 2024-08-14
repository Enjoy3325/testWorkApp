import { View, StyleSheet, Text } from 'react-native';

interface WrapperTextProps {
  title?: string;
  text?: string;
}

const WrapperText: React.FC<WrapperTextProps> = ({ title, text }) => {
  return (
    <View style={styles.wrapperText}>
      <Text style={styles.title}>
        {title}
      </Text>
      <Text style={styles.text}>
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapperText: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 40,
  },
  title: {
    fontFamily: "Outfit-SemiBold",
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 28.8,
    color: "#14171D"
  },
  text: {
    width: "90%",
    fontFamily: "Inter_18pt-Regular",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22.4,
    color: "#667085"
  }
});

export default WrapperText;
