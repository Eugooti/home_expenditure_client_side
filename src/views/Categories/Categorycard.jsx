import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import {useEffect, useState} from "react";
// import CategoryModal from "./CategoryModal.jsx";
import {setLocalStorage} from "../../Utils/localStorage.jsx";

// eslint-disable-next-line react/prop-types
const CategoryCard = ({Category,description,id}) => {
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
            }); // Delay of 4 seconds (4000 milliseconds)
        };

        fetchExpenditures();
    }, []);

    function countByAttribute(arr, attr, value) {
        return arr.reduce((count, obj) => {
            return count + (obj[attr] === value);
        }, 0);
    }

    function calculateTotalExpenditureByCategory(expenditureArray, category) {
        let total = 0;

        for (let i = 0; i < expenditureArray.length; i++) {
            const expenditure = expenditureArray[i];
            if (expenditure.category === category) {
                total += expenditure.cost;
            }
        }

        return total;
    }

    // const [categoryCard,setCategoryCard]=useState(false);





    return(
        <ThemeContext.Consumer>{(context)=>{
            const { lightTheme, light, dark } = context;
            const theme = !lightTheme ? light : dark;
            const setCategoryItem = () => {
                setLocalStorage("card",{Category,description,id})
            }


            return(
                <div className={'card'} onClick={setCategoryItem} style={{color:theme.text,width:155,height:150,display:"flex",flexDirection:"column",
                alignItems:"center",justifyContent:"center",background:theme.uiElements,borderRadius:15}}>
                        <h2>{Category}</h2>
                        <label>{countByAttribute(expenditures,"category",Category)}</label>
                        <label>{calculateTotalExpenditureByCategory(expenditures,Category)}</label>
                </div>


            )
        }}

        </ThemeContext.Consumer>
    )

}
export default CategoryCard
