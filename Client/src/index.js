import React, { createContext } from 'react'
//import ReactDOM from 'react-dom';
import UserStore from './store/UserStore'
import ItemStore from './store/ItemStore'

import ReactDOM from 'react-dom/client'
import App from './App'
import BasketStore from './store/BasketStore'

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Context.Provider
            value={{
                user: new UserStore(),
                item: new ItemStore(),
                basket: new BasketStore(),
            }}
        >
            <App />
        </Context.Provider>
    </React.StrictMode>
)
