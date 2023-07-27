import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import {Box, IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import NewCategory from "./NewCategory.jsx";



const CategoriesList = () => {

    const [categories,setCategories]=useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/categories');
                const data = await response.json();
                // console.log(data.categories);
                setCategories(data.categories)
            } catch (error) {
                console.error('Failed to fetch expenditures:', error);
            }
        };

        fetchCategories();
    }, []);




    const [CategoryCard,setCategoryCard]=useState(false);

    return(
      <ThemeContext.Consumer>{(context)=>{
          const { lightTheme, light, dark } = context;
          const theme = !lightTheme ? light : dark;

          const columns=[
              {field:"id",headerName:'ID'},
              {field: "name",headerName: "Category",flex:1,cellClassName:"name-column--cell"},
              {field: "date",headerName: "Date",flex: 1},
              {field: "edit",headerName: "Edit",flex: 1,
                  renderCell:()=>{
                  return(
                      <IconButton onClick={()=>{console.log("clicked edit")}}><EditIcon style={{color:theme.text}}/></IconButton>
                  )
                  }
              },
              {field: "Delete",headerName: "Delete",flex: 1,
                  renderCell:()=>{
                  return(
                      <IconButton onClick={()=>{console.log("clicked")}}><DeleteIcon style={{color:theme.text}}/></IconButton>
                  )
                  }
              }

          ]
          const OpenCategoryCard = () => {
              setCategoryCard(true)
          }
          const CloseCategoryCard = () => {
              setCategoryCard(false);
          }

          return(
              <div style={{background:theme.bg,height:'90%',display:"flex",justifyContent:"center",alignItems:"start"}}>
                  <div style={{width:'85%',height:'90%',color:theme.text}}>
                      <h2>Categories</h2>
                      <label>See all the existing categories</label>
                      <div style={{display:"flex",justifyContent:"end",alignItems:"end"}}>
                          <IconButton onClick={OpenCategoryCard}>+</IconButton>
                      </div>
                  <Box
                      m="0 0 0 0"
                      height="75%"
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
                      <DataGrid onCellClick={()=>{console.log("clicked")}} columns={columns}
                                rows={categories}
                                components={{ Toolbar: GridToolbar }}
                                checkboxSelection
                      />
                  </Box>
                  </div>
                  <NewCategory open={CategoryCard} handleClose={CloseCategoryCard}/>
              </div>
          )
      }}

      </ThemeContext.Consumer>
  )
}
export default CategoriesList;