import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type CustomButtonProps = {
  title: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  disabled?: boolean;
  onPress: () => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({ title, backgroundColor, textColor, borderColor, disabled, onPress }) => {

  const convertHexToRgba = (hex: string, opacity: number) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return `rgba(${r},${g},${b},${opacity})`;
  };

  const backgroundStyle = disabled
    ? { backgroundColor: convertHexToRgba(backgroundColor, 0.25) }
    : { backgroundColor };
  return (
    <TouchableOpacity
      style={[styles.button, backgroundStyle, { borderColor }]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: "Inter_18pt-SemiBold",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
});

export default CustomButton;