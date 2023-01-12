import { createContext } from 'react'

export const AppContext = createContext(null!);

type AppContextProviderProps = {
  children: React.ReactNode
}
const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  return (
    <AppContext.Provider value={null!}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider