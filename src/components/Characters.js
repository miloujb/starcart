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
} from 'semantic-ui-react'
import {
	addFave
} from '../features/faves'
import {
	nanoid
} from '@reduxjs/toolkit'
import FilmDetails
	from './FilmDetails'

const Characters = () => {
	const {data, isError, isLoading} = useGetCharactersQuery();
	console.log(data);
	const dispatch = useDispatch();

	const selectCharacters = e => {
		const {name} = e.target.dataset();
		const character = data.results.find(character => character.name === name);
		return character
	}
	const addToFavourites = e => dispatch(addFave(selectCharacters(e)))

	if (isLoading) {
		return <Loader active={isLoading} />
	}
	if (isError) {
		return <Message error={isError}>There was an error</Message>
	}
	if (data && Boolean(data?.results?.length)) {
		return (
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
		)
	}
	else if (data?.results?.length === 0) {
		console.log("I'm in here")
		return <Message
			warning>no
			films
			found</Message>
	}



}
export default Characters
