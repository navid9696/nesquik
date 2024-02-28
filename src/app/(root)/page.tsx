import Hero from '@components/Hero'
import Navbar from '@components/Navbar'
import { fetchGenres, fetchTrending } from '../../../actions/movieData'
import MovieRow from '@components/MovieRow'

const Home = async () => {
	const trendingMovies = await fetchTrending('movie')
	const trendingTv = await fetchTrending('tv')
	const trendingShows = [...trendingMovies, ...trendingTv]
	const randomNumber = Math.floor(Math.random() * trendingShows.length)
	const trendingShow = trendingShows[randomNumber]

	const genresMovies = await fetchGenres('movie')
	const genresTv = await fetchGenres('tv')
	const allGenres = [...genresTv, ...genresMovies]

	return (
		<>
			<Navbar />
			<Hero urlCategory={trendingShow} genres={allGenres} />
			<MovieRow title={'Movies'} movies={trendingMovies} />
			<MovieRow title={'Series'} movies={trendingTv} />
		</>
	)
}

export default Home
