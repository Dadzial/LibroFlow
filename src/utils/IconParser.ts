export const IconsParser = {
    headerIcon: require('../../assets/header-icon.png'),
    drawIcon : require('../../assets/draw.png'),
    deleteIcon: require('../../assets/delete.png'),
    seeIcon: require('../../assets/search.png'),
    addTolibIcon: require('../../assets/add-to-librar.png'),
};

export const getIcon = (name: keyof typeof IconsParser) => IconsParser[name];