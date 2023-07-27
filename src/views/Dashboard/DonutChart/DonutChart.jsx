import {ThemeContext} from "../../../assets/ThemeContext/Theme2.jsx";
import Chart from 'react-apexcharts'
import {useEffect, useState} from "react";

const DonutChart = () => {

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



    const categoryName=()=>{
        const Categories=[];
        categories.map((item)=>{
            Categories.push(item.name)
        })

        return Categories;
    }

    const name=categoryName();
    // console.log(name);

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


    const calculateCategoryTotals = (expenditure_categories, expenditures) => {
        // Create an array to store the total expenses for each category
        const categoryTotals = expenditure_categories.map((category) => {
            // Filter the expenditures array to get all items belonging to the current category
            const categoryItems = expenditures.filter((expenditure) => expenditure.category === category);

            // Calculate the total cost for the current category using reduce function
            // Return the total cost for the current category
            return categoryItems.reduce((acc, expenditure) => acc + expenditure.cost, 0);
        });

        // Return both the array of categories and the array of total expenses
        return [expenditure_categories, categoryTotals];
    };

    const [category, categoryTotals] = calculateCategoryTotals(name, expenditure);



    const series=categoryTotals;

    return(
        <ThemeContext.Consumer>{(context)=>{
            const { lightTheme, light, dark } = context;
            const theme = !lightTheme ? light : dark;

            const options={
                series:categoryTotals,
                labels:category,
                plotOptions:{
                    pie:{
                        expandOnClick:false,
                        donut:{
                            labels: {
                                show:true,
                                total:{
                                    show: true,
                                    showAlways:true,
                                    color:theme.text
                                }
                            }
                        }
                    }
                }
            }

            return(
                <div style={{width:'100%',height:'100%',background:theme.bg}}>
                    <Chart
                    options={options}
                    series={series}
                    type={'donut'}
                    width={350}
                    height={350}
                    />
                </div>
            )
        }}

        </ThemeContext.Consumer>
    )

}
export default DonutChart;
