import FaveItem
	from './FaveItem'
import {
	fireEvent,
	getByTestId,
	render,
	screen,
} from '@testing-library/react'
import {
	handleRating
} from './types'

const props = {
	fave: {id: 123, name: "A New Hope", rating: 4}
}

describe('Fave Item Tests', () => {
	it('renders the title on the page', () => {
		render(<FaveItem {...props} />)
		expect(screen.getByText(props.fave.name)).toBeInTheDocument();
	})
	it("calls add fave on button click", async() => {
		const handleRemove = jest.fn();
		render(<FaveItem {...props} handleRating={handleRating} handleRemove={handleRemove} />)
		fireEvent.click(screen.getByTestId('remove-button'));
		expect(handleRemove).toHaveBeenCalled();
	})
})