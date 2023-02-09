import colors from 'vuetify/lib/util/colors'

export default dark = {
  dark: true,
  colors: {
    background: '#15202b',
    surface: '#15202b',
    primary: '#3f51b5',
    secondary: '#03dac6',
    error: '#ff5722'
  },
  secondary: colors.indigo,
  // All keys will generate theme styles,
  // Here we add a custom `tertiary` color
  tertiary: colors.pink.base
}
