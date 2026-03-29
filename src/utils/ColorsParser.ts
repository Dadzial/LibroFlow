export const ColorsParser = {
    primaryColor:'#F2F2F2',
    secondColor:'#FFFFFF',
    accent:'#6A28B0',
    textPrimaryColor:'#454747',
    scrollbarColor:'#909191'
}

export const getColor = (name: keyof typeof ColorsParser) => ColorsParser[name];