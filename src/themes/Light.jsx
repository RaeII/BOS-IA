import { createTheme } from "@mui/material";
import { blue} from "@mui/material/colors";

export const  LigthTheme = createTheme({
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
    palette:{
        primary:{
            main:blue[700],
            dark:blue[700],
            light:blue[700],
            contrastText:"#ffffff",
            
        },
        secondary:{
            main:blue[700],
            dark:blue[700],
            light:blue[700],
            contrastText:"#ffffff"
        },
        background:{
            default:"#242424",
            paper:"#1a1a1a"
        },
        text:{
            primary:'#eeeeee',
            secondary:'#eeeeee',
        }
        
    },
    components:{

        MuiTextField:{
            styleOverrides:{
                root:({ ownerState }) => ({
                    ...(ownerState.color === 'primary' && {
                        borderColor:'#ff0000c2',
                        backgroundColor:'#1a1a1a'
                    }),
                })
            }
        },

        MuiFormLabel: {
            styleOverrides: {
                root:({ ownerState }) => ({
                    ...(ownerState.color === 'primary' && {
                        borderColor:'#ff0000c2',
                        "&.Mui-focused": { // increase the specificity for the pseudo class
                            color: "#eeeeee"
                        },
                        
                    }),
                })
            },
        },

        MuiTypography: {
            styleOverrides: {
                root:{
                    color:"#eeeeee", 
                }
            },
        },
        MuiSvgIcon:{
            styleOverrides: {
                root:{
                    color:"#eeeeee",     
                }
            },
        },

        MuiToolbar:{
            styleOverrides: {
                root:{
                    backgroundColor:'#1a1a1a'
                }
            },
        },        
        
    },

    
})