// src/context/state.js
import { createContext, useContext, useReducer } from 'react'
import { user_reducer } from '../reducers';

const initial_state = {
  user: null,
}

const AppContext = createContext()

function AppWrapper({ children }) {
  const state = initial_state

  const [user, dispatch] = useReducer(user_reducer, state)
  return (
    <AppContext.Provider value={{ user, dispatch }}> {children} </AppContext.Provider>
  )
}

function useAppContext() {
  return useContext(AppContext)
}

export { AppWrapper, useAppContext };