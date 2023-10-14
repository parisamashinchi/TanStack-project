 import { createContext , useReducer} from "react"
 
 export const CourseContext = createContext();

 const reducer = (state, action) => ({...state, ...action });

 const initialState = {
    course: {}
 }

export function CourseProvider(props) {
    const [state, update] = useReducer(reducer, initialState);
    return  <CourseContext.Provider value={{state, update}} >
        {props.children}
    </CourseContext.Provider>
   
}
