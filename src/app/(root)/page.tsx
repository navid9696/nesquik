import Hero from '@components/Hero'
import Navbar from '@components/Navbar'
import { fetchGenres, fetchTrending } from '../../../actions/movieData'
import MovieRow from '@components/MovieRow'
import Footer from '@components/Footer'
import ArrowUp from '@components/ArrowUp'
import { NextUIProvider } from '@nextui-org/react'

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
		<NextUIProvider>
			<Navbar />
			<Hero urlCategory={trendingShow} genres={allGenres} />
			<MovieRow title={'Movies'} movies={trendingMovies} genres={genresMovies} />
			<MovieRow title={'Series'} movies={trendingTv} genres={genresTv} />
			<ArrowUp />
			<Footer />
		</NextUIProvider>
	)
}

export default Home
