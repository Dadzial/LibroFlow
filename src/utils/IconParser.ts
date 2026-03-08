export const IconsParser = {
    headerIcon: require('../../assets/header-icon.png'),
};

export const getIcon = (name: keyof typeof IconsParser) => IconsParser[name];