import {ForgotPasswordActionsType, forgotPasswordReducer} from "./reducers/forgotPassReducer";
import {ProfileActionType, profileReducer} from "./reducers/profileReducer";
import {TypedUseSelectorHook, useDispatch, useSelector,} from "react-redux";
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AuthActionsType, authReducer} from "./reducers/authReducer";
import {AppActionType, appReducer} from "./reducers/appReducer";
import {packReducer, PacksActionType} from "./reducers/packsReducer";
import {CardsActionType, cardsReducer} from "./reducers/cardsReducer";


const rootReducer = combineReducers({
    auth: authReducer ,
    forgotPas: forgotPasswordReducer,
    profile: profileReducer,
    app: appReducer,
    packs:packReducer,
    card: cardsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
type AppRootActionType= AuthActionsType | AppActionType | ProfileActionType 
    | ForgotPasswordActionsType  | PacksActionType | CardsActionType

// export type AppRootStateType = ReturnType<typeof rootReducer>  old type
export type RootState = ReturnType<typeof store.getState>
// typing all dispatches
export type AppDispatch=ThunkDispatch<RootState,unknown,AppRootActionType>
// new typing for all Thunk, will be work just with useAppSelector!
export type AppThunk<ReturnType = void>=ThunkAction<ReturnType,RootState,unknown,AppRootActionType>


// custom hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch=()=>useDispatch<AppDispatch>()

// @ts-ignore
window.store = store;