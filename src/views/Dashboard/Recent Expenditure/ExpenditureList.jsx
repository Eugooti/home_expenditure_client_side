    import { ThemeContext } from "../../../assets/ThemeContext/Theme2.jsx";
    import { Box } from "@mui/material";
    import { useEffect, useState } from "react";
    import { DataGrid } from "@mui/x-data-grid";
    import {getFromLocalStorage, setLocalStorage} from "../../../Utils/localStorage.jsx";
    import UpdateExpenditure from "./UpdateExpenditure.jsx";

    const ExpenditureList = () => {
        const [expenditures, setExpenditures] = useState([]);

        useEffect(() => {
            const fetchExpenditures = () => {
                setTimeout(async () => {
                    try {
                        const response = await fetch("http://localhost:5000/api/expenditures");
                        const data = await response.json();
                        setExpenditures(data.expenditures);
                    } catch (error) {
                        console.error("Failed to fetch expenditures:", error);
                    }
                }, 1500); // Delay of 4 seconds (4000 milliseconds)
            };

            fetchExpenditures();
        }, []);


        const [ExpenditureUpdate,setExpenditureUpdate]=useState(false);

        const handleClose = () => {
          setExpenditureUpdate(false);
        }

        //logging raw values
        const handlePrintValues = (params) => {
            const rowValues = params.row;
            setLocalStorage("Row",rowValues)
            // console.log(getFromLocalStorage("Row"))
            setExpenditureUpdate(true);
        };


        return (
            <ThemeContext.Consumer>
                {(context) => {
                    const { lightTheme, light, dark } = context;
                    const theme = !lightTheme ? light : dark;

                    const columns = [
                        { field: "id", headerName: "ID" },
                        { field: "name", headerName: "Expenditure", flex: 1, cellClassName: "name-column--cell" },
                        { field: "category", headerName: "Category", flex: 1 },
                        { field: "cost", headerName: "Cost", flex: 1 },
                    ];

                    return (
                        <div
                            style={{
                                background: theme.bg,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", color: theme.text }}>
                                <h2>Recent Expenditure</h2>

                                <Box
                                    height="100%"
                                    width="100%"
                                    sx={{
                                        "& .MuiDataGrid-root": {
                                            border: "none",
                                        },
                                        "& .MuiDataGrid-cell": {
                                            borderBottom: "none",
                                        },
                                        "& .name-column--cell": {
                                            color: theme.text,
                                        },
                                        "& .MuiDataGrid-columnHeaders": {
                                            backgroundColor: theme.uiElements,
                                            color: theme.text,
                                            borderBottom: "none",
                                        },
                                        "& .MuiDataGrid-virtualScroller": {
                                            backgroundColor: theme.bg,
                                        },
                                        "& .MuiDataGrid-footerContainer": {
                                            borderTop: "none",
                                            color: theme.text,
                                            backgroundColor: theme.uiElements,
                                        },
                                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                            color: `${theme.text} !important`,
                                        },
                                    }}
                                >
                                    {expenditures.length > 0 ? (
                                        <DataGrid columns={columns} rows={expenditures} onRowClick={handlePrintValues} />
                                    ) : (
                                        <p>Loading data...</p>
                                    )}
                                </Box>
                            </div>
                            <UpdateExpenditure open={ExpenditureUpdate} handleClose={handleClose}/>
                        </div>
                    );
                }}
            </ThemeContext.Consumer>
        );
    };

    export default ExpenditureList;
