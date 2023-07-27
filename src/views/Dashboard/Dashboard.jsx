import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import './Dashboard.css'
import CategoryCard from "../Categories/Categorycard.jsx";
import ExpenditureList from "./Recent Expenditure/ExpenditureList.jsx";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import NewCategory from "../Categories/NewCategory.jsx";
import CategoryModal from "../Categories/CategoryModal.jsx";
import {getFromLocalStorage} from "../../Utils/localStorage.jsx";
import DonutChart from "./DonutChart/DonutChart.jsx";

const DashboardHome = () => {

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


    const [categoryCard,setCategoryCard]=useState(false);
    const [EditModal,setEditModal]=useState(false);


    const CategoryItem=getFromLocalStorage('card');


    return(
      <ThemeContext.Consumer>{(context)=>{
          const { lightTheme, light, dark } = context;
          const theme = !lightTheme ? light : dark;

          const OpenCategoryCard = () => {
              setCategoryCard(true)
          }
          const CloseCategoryCard = () => {
              setCategoryCard(false);
          }

          const OpenEditModal = () => {
            setEditModal(true)
          }
          const CloseEditModal = () => {
            setEditModal(false)
          }

          // const CategoryItem=getFromLocalStorage("card")

          return(
              <div style={{background:theme.bg,height:'90%',display:"flex",alignItems:"start",justifyContent:"start",width:'100%'}}>
                  <div style={{height:'100%',paddingLeft:'2%',width:'90%',display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                      <div style={{width:'70%',paddingRight:'3%',display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                          <div style={{height:'27%',width:'100%'}}>
                              <div style={{height:"100%",width:'100%',color:theme.text}}>
                                  <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingBottom:'1.5%'}}>
                                      <h2>Categories.</h2>
                                      <Button onClick={OpenCategoryCard} style={{background:theme.button,color:'white',borderRadius:15}} variant={'contained'}>Add Category</Button>
                                  </div>

                                  <div className={"cards"}>
                                      {categories.map((items,index)=>(
                                          <div onClick={OpenEditModal} key={index}><CategoryCard Category={items.name} description={items.description} date={items.date} id={items.id}/></div>
                                      ))}
                                  </div>

                                  <CategoryModal open={EditModal} handleClose={CloseEditModal} category={CategoryItem && CategoryItem.Category?CategoryItem.Category:""} description={CategoryItem && CategoryItem.description?CategoryItem.description:""} id={CategoryItem && CategoryItem.id?CategoryItem.id:""}/>
                              </div>
                          </div>
                          <div style={{paddingBottom:'1%',height:'67%',alignItems:'start',justifyContent:"start"}}>
                              <div style={{width:'100%',height:'80%'}}>
                                  <ExpenditureList/>
                              </div>
                          </div>

                      </div>
                      <div style={{width:'30%',color:theme.text}}>
                          <div style={{background:theme.bg,height:'95%',width:'100%',borderRadius:20}}>
                              <h2>Expenditure analysis</h2>
                              <hr/>
                              <DonutChart/>
                          </div>
                      </div>

                  </div>
                  <NewCategory open={categoryCard} handleClose={CloseCategoryCard}/>

              </div>
          )
      }}

      </ThemeContext.Consumer>
  )
}
export default DashboardHome;
