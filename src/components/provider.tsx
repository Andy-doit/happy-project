
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createContext, useContext } from "react"
const AppContext = createContext<{
    isAuth: boolean
    setIsAuth: (value: boolean) => void
}>({
    isAuth: false,
    setIsAuth: () => { }
})

export const useAppContext = () => {
    const context = useContext(AppContext)
    return context
}
const queryClient = new QueryClient(
    {
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnMount: false,
            }
        }
    }
)

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />

        </QueryClientProvider>
    )
}