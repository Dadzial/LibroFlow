export const IconsParser = {
    headerIcon: require('../../assets/header-icon.png'),
    drawIcon : require('../../assets/draw.png'),
    deleteIcon: require('../../assets/delete.png'),
};

export const getIcon = (name: keyof typeof IconsParser) => IconsParser[name];