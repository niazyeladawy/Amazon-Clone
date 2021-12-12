export const initialState = {
    basket: [], 
    user:null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        case "EMPTY_BASKET":
            return{
                ...state,
                basket:[]
            }
        case "REMOVE_FROM_BASKET":
            
            const index = state.basket?.findIndex(
                (basketItem) => basketItem.id === action?.item.id
            );
            
            let newBasket = [...state.basket];
            if(index >= 0){
                newBasket.splice(index,1);
            } 
            else{
                console.warn("ss");
            }

            return{
                ...state,
                basket:newBasket
            }
            // return{
            //     ...state,
            //     basket:state.basket.filter(item => item.id !== action.id) 
            // }
        case "SET_USER":
            return{
                ...state,user: action.user
            }
        default:
            return state;
    }
};

export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

export default reducer;