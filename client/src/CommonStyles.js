export let CommonStyles = (WindowWidth, Colors = '#fff') => {
    return {
        bigContainer: {
            paddingLeft: WindowWidth >= 970 ? 270 : 0,
            paddingRight: WindowWidth >= 1300 ? 370 : 0,
            paddingBottom: WindowWidth >= 970 ? 0 : 70,

            width: '100vw',
            minHeight: '100vh',

            backgroundColor: Colors.white
        },
    }
}