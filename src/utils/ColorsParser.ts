export const Colors = {
    light: {
        primaryColor: '#F2F2F2',
        secondColor: '#FFFFFF',
        accent: '#6A28B0',
        textPrimaryColor: '#454747',
        textSecondaryColor: '#a5a6a6',
        scrollbarColor: '#909191',
        accentRed: '#FC090E'
    },
    dark: {
        primaryColor: '#121212',
        secondColor: '#1E1E1E',
        accent: '#BB86FC',
        textPrimaryColor: '#E1E1E1',
        textSecondaryColor: '#9a9999',
        scrollbarColor: '#4A4A4A',
        accentRed: '#CF6679'
    }
};

export type ColorType = keyof typeof Colors.light;

export const getColor = (name: ColorType) => Colors.light[name];
export const getThemeColors = (theme: 'light' | 'dark') => Colors[theme];
