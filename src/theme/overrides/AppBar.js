// ----------------------------------------------------------------------

export default function AppBar(theme) {
    return {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    // Some CSS
                    backgroundColor: theme.palette.common.white,
                    boxShadow:"none",
                    //color:theme.palette.common.black
                },
                colorPrimary:{
                    color:theme.palette.common.black
                }
            }
        },
    };
}
