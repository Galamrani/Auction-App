import { Stats } from "fs"
import { create } from "zustand"

 
type State = {
    pageNumber: number
    pageCount: number
    searchTerm: string
    orderBy: string
    filterBy: string
}

type Actions = {
    setParmas: (params: Partial<State>) => void
    reset: () => void
}

const initialState: State = {
    pageNumber: 1,
    pageCount: 1,
    searchTerm: '',
    orderBy: 'make',
    filterBy: 'live'
}

export const useParamsStore = create<State & Actions>()((set) => ({
    ...initialState,
    setParmas: (newParams: Partial<State>) => {
        set((state) => {
            if (newParams.pageNumber) {
                return {...state, pageNumber: newParams.pageNumber}
            } else {
                return {...state, ...newParams, pageNumber: 1}
            }
        })
    },
    reset: () => set(initialState)
}))