import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ProSidebarProvider} from "react-pro-sidebar";
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index.js";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {UserProvider} from "./assets/User Context/UserContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ProSidebarProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DevSupport ComponentPreviews={ComponentPreviews}
                                useInitialHook={useInitial}
                    >
                        <UserProvider>
                            <App/>
                        </UserProvider>

                    </DevSupport>
                </LocalizationProvider>

            </ProSidebarProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
