import {
	useGetCharactersQuery
} from '../services/swapApi'
import {
	useDispatch
} from 'react-redux'
import {
	Button,
	Card,
	Loader,
	Message,
	Pagination,
} from 'semantic-ui-react'
import {
	addFave
} from '../features/faves'
import {
	nanoid
} from '@reduxjs/toolkit'
import {
	useState
} from 'react'

const Characters = () => {

	const [page, setPage] = useState(1);
	const pageSize = 10;

	const {data, isError, isLoading} = useGetCharactersQuery();
	const dispatch = useDispatch();

	const selectCharacter = e => {
		const { title } = e.currentTarget.dataset;
		const character = data.results.find(character => character.name === title);
		return character
	}
	const addToFavourites = e => dispatch(addFave(selectCharacter(e)));

	const handlePagination = (e, {page}) => {
		setPage(page);
	}

	if (isLoading) {
		return <Loader active={isLoading} />
	}
	if (isError) {
		return <Message error={isError}>There was an error</Message>
	}
	if (data && Boolean(data?.results?.length)) {
		return (
			<div>
			<Card.Group centered>
				{data.results.map(character => (
					<Card key={nanoid()}>
						<Card.Content>
							<Card.Header>{character.name}</Card.Header>
							<Card.Meta>Films: {character.films.length}</Card.Meta>
							Height: {character.height} cm
							Weight: {character.mass} kg
							Gender: {character.gender}
							Eye Colour: {character.eye_color}
							Hair Colour: {character.hair_color}
						</Card.Content>
						<Card.Content extra>
							<Button
								icon={{ name: 'plus', size: 'small' }}
								data-title={character.name}
								positive
								content="Add to faves"
								onClick={addToFavourites}
							/>
						</Card.Content>
					</Card>
				))}
			</Card.Group>
				<Pagination activePage={page} totalPages={Math.ceil(data.count / pageSize)}
				onPageChange={handlePagination}/>
			</div>
		)
	}
	else if (data?.results?.length === 0) {
		return <Message
			warning>no
			films
			found</Message>
	}



}
export default Characters
