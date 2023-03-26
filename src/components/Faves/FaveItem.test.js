import FaveItem
	from './FaveItem'
import {render, screen} from '@testing-library/react'

const props = {
	fave: {id: 123, name: "A New Hope", rating: 4}
}

describe('Fave Item Tests', () => {
	it('renders the title on the page', () => {
		render(<FaveItem {...props} />)
		expect(screen.getByText(props.fave.name)).toBeInTheDocument();
	})
})