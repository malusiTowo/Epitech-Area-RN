
import { Platform } from 'react-native'

const Theme = {};

Theme.font = {
  bold: {
    fontFamily: 'bold',
  },
  heavy: {
    fontFamily: 'heavy',
  },
  regular: {
    fontFamily: 'regular',
  }
};

Theme.spacing = {
  xTiny: 4,
  tiny: 8,
  small: 12,
  base: 16,
  large: 32,
  xLarge: 48
};

Theme.button = {
  AuthButton: {
    height: 41,
    width: '83%',
    marginBottom: 12,
    borderRadius: 40,
    shadowOpacity: 0.1,
    shadowOffset: { height: 0, width: 0 },
    elevation: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: 'white'
  }
}

Theme.header = {
  AuthHeader: {
    backgroundColor: "#FF2540",
    width: "350@s",
    shadowOpacity: 0,
    shadowOffset: { height: 0, width: 0 },
    elevation: 0,
    borderBottomWidth: 0,
    paddingTop: Platform.OS === 'ios' ? "12@vs" : 0,
  }
}




Theme.colors = {
  accent: '#00F94F',
  light_grey: '#DBDBDB',
  dark_blue: '#002649',
  orange: '#ff9c00',
  green: '#00F94F',
  white: '#fff',
  blue: '#0091FF',
  facebook: '#3B5998'
}


Theme.typography = {
  largeTitle: {
    fontSize: "34@ms",
    ...Theme.font.bold,
    color: "#fff",
  },
  title1: {
    fontSize: "28@ms",
    ...Theme.font.bold,
    color: "#fff",
  },
  title2: {
    fontSize: "22@ms",
    ...Theme.font.bold,
    color: "#fff",
  },
  title3: {
    fontSize: "18@ms",
    ...Theme.font.bold,
    color: "#fff",
  },
  titleCaption: {
    fontSize: "16@ms",
    ...Theme.font.book,
    color: "#fff",
  },
  header: {
    fontSize: "16@ms",
    ...Theme.font.bold,
    color: "#fff",
  },
  button: {
    fontSize: 15,
    ...Theme.font.regular,
    textAlign: "center",
  },
  onlyTextButton: {
    fontSize: 14,
    ...Theme.font.bold,
    color: "white",
  },
  input: {
    fontSize: "14@ms",
    ...Theme.font.book,
    color: "#fff",
  },
  body: {
    fontSize: "13@ms",
    ...Theme.font.book,
    color: "#fff",
  },
  caption1: {
    fontSize: "14@ms",
    ...Theme.font.book,
    color: "#fff",
  },
  caption2: {
    fontSize: "12@ms",
    ...Theme.font.book,
    color: "#fff",
  },
  caption3: {
    fontSize: "10@ms",
    ...Theme.font.book,
    color: "#fff",
  }
};

export default Theme;

