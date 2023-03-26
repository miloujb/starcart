import { createSlice, nanoid } from '@reduxjs/toolkit'

const createItem = item => ({
	id: nanoid(),
	...item,
})
const initialState = {
	items: [],
	total: 0,
	prices: {
		people: 10,
		starships: 20,
		vehicles: 5.5,
		planets: 100,
		films: 12.99,
	},
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducer: {
		addItem: (state, action) => {
			const newItem = createItem(action.payload.item);
			// add item to items
			state.items.push(newItem);
			state.total = state.prices[action.payload.itemType];
			return state;
		},
		removeItem: (state, action) => {
			// find fave
			state.items = state.items.filter(item => item.id !== action.payload.id);
			// remove fave
			state.total -= state.prices[action.payload.itemType];
			return state;
		},
		editItem: (state, action) => {
			return [...state, action.payload];
		}
	},
})

export const { addItem, removeItem } = cartSlice
