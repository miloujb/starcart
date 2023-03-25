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

const Characters = () => {
	const {data, isError, isLoading} = useGetCharactersQuery;
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
	if (!data) {
		return <h1>HELLO</h1>
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
