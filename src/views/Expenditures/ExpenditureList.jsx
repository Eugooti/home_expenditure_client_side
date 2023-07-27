import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import { setLocalStorage} from "../../Utils/localStorage.jsx";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import UpdateExpenditure from "../Dashboard/Recent Expenditure/UpdateExpenditure.jsx";

const ExpenditureList = () => {

    const [expenditure,setExpenditure]=useState([]);

    useEffect(()=>{
        const fetchExpenditure=async ()=>{
            try {
                const response=await fetch('http://localhost:5000/api/expenditures')
                const data=await response.json();
                setExpenditure(data.expenditures)
            }catch (error){
                console.log('Failed to fetch expenditures:', error)
            }
        }
        fetchExpenditure();
    },[])

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

    return(
        <ThemeContext.Consumer>{
            (context)=>{
                const {lightTheme,light,dark}=context;
                const theme=!lightTheme?light:dark;

                const columns=[
                    {field:"id",headerName:'ID'},
                    {field: 'name',headerName: "Expenditure",flex:1,cellClassName:"name-column--cell"},
                    {field: 'category',headerName: 'Category',flex: 1},
                    {field: 'date',headerName: 'Date',flex: 1}

                ]

                return(
                    <div className={'centerAlign'} style={{background:theme.bg,height:'100%',width:'100%'}}>
                        <div style={{display:"flex",flexDirection:"column",width:'100%',height:'95%',color:theme.text,justifyContent:"center",alignItems:"center",paddingBottom:'7%'}}>
                            <h2>Categories</h2>
                            <label>See all the existing categories</label>
                        <Box
                            m="0 0 0 0"
                            height="85%"
                            width='80%'
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
                                    color:theme.text,
                                    borderBottom: "none",
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                    backgroundColor: theme.bg,
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    borderTop: "none",
                                    color:theme.text,
                                    backgroundColor: theme.uiElements,
                                },
                                "& .MuiCheckbox-root": {
                                    color: `${theme.text} !important`,
                                },
                                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                    color: `${theme.text} !important`,
                                },

                            }}
                        >
                            {/*<DataGrid  columns={columns}*/}
                            {/*          rows={expenditure}*/}
                            {/*          components={{ Toolbar: GridToolbar }}*/}
                            {/*          checkboxSelection*/}
                            {/*/>*/}

                            {expenditure.length > 0 ? (
                                <DataGrid
                                    components={{ Toolbar: GridToolbar }}
                                    columns={columns}
                                    checkboxSelection
                                    rows={expenditure} onRowClick={handlePrintValues} />
                            ) : (
                                <p>Loading data...</p>
                            )}
                        </Box>
                        </div>
                        <UpdateExpenditure open={ExpenditureUpdate} handleClose={handleClose}/>
                    </div>
                )
            }
        }

        </ThemeContext.Consumer>
    )

}
export default ExpenditureList;
