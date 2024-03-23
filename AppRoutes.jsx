import { useContext,useMemo,useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom"
import Login from "./src/pages/Login/Login";
import { Chat } from "./src/pages/Chat/Chat"
import { MainProvider } from './src/contexts/MainProviders';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthProvider, AuthContext, } from "./src/contexts/auth";
// import { AppThemeProvider } from "./src/contexts/theme";
// import { AlertProvider } from "./secontexts/Alert";



const AppRoutes = () => {
    const themePreference = localStorage.getItem('themePref');
    const [mode, setMode] = useState(themePreference || 'dark');
    const theme = useMemo(() =>
    createTheme({
        palette: {
        mode: mode,
        },
    })
    );

    const Private = ({children}) => {
        const {authenticated,loading} = useContext(AuthContext);

        if(loading){
            return <div className="loading">Loading...</div>
        }
       
        if(!authenticated) return <Navigate to="/login"/>
        
        return children
    }

    return(
        <Router >
            {/* <AlertProvider> */}
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <MainProvider themeMode={mode} setThemeMode={setMode}>
                            <Routes >
                                <Route 
                                    exact 
                                    path="/login" 
                                    element={<Login/>}
                                
                                />
                                <Route 
                                    exact 
                                    path="/" 
                                    element={ <Private> <Chat/> </Private>}
                                />
                            </Routes>   
                    </MainProvider>
                </ThemeProvider>
            </AuthProvider>
            {/* </AlertProvider> */}
        </Router>
    )
}

export default AppRoutes
