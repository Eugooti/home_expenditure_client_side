import {Component, createContext} from "react";

export const ThemeContext=createContext()
class ThemeContextProvider extends Component{
    state={
        lightTheme:true,
        // light:{text:'#8E91FC',uiElements:'#F1F1F1',bg:'#5B616A'},
        // light:{text:'#555',uiElements:'#ddd',bg:'#eee'},
        light:{text:'#555',uiElements:'#AAA5BA',bg:'#D0D0DB',button:'#0F2C25'},

        // dark:{text: '#E07A5F',uiElements: '#1F2A30',bg:'#D8D8D8'}
        // dark:{text: '#ddd',uiElements: '#333',bg:'#555'}
        dark:{text: '#ddd',uiElements: '#544671',bg:'#2E3239',button:'#0F2C25'}
    }

    toggleTheme=()=>{
        this.setState({lightTheme:!this.state.lightTheme})
    }
    render() {
        return(
            <ThemeContext.Provider value={{...this.state,toggleTheme:this.toggleTheme}}>
                {/* eslint-disable-next-line react/prop-types */}
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}
export default ThemeContextProvider;