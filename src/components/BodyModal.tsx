import React, { useEffect, useState } from 'react'
import YTEmbed from './YTEmbed'
import { Button, ModalBody, ModalFooter } from '@nextui-org/react'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { useSession } from 'next-auth/react'
import { IGenres, IMovie } from '../../lib/types'

interface Props {
	movie?: IMovie
	genres?: IGenres[]
	type?: string
	onClose?: () => void
}

interface User {
	email: string
	favorites: number[]
}

const BodyModal = ({ movie, genres, type, onClose }: Props) => {
	const [isFavorite, setIsFavorite] = useState(false)
	const [user, setUser] = useState<User|null>(null)
	const { data: session } = useSession()

	const getUser = async () => {
		try {
			const res = await fetch(`/api/user/${session?.user?.email}`)
			const data = await res.json()
			setUser(data)
			setIsFavorite(data.favorites.includes(movie?.id))
			console.log(data)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		session ? getUser() : null
	}, [session])

	const handleFavorites = async () => {
		try {
			const res = await fetch(`/api/user/${session?.user?.email}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ movieId: movie?.id }),
			})
			const data = await res.json()
			setUser(data)
			setIsFavorite(data.favorites.includes(movie?.id))
		} catch (error) {}
	}

	const genreNames = movie?.genre_ids
		.map(genreId => {
			const genre = genres?.find(genre => genre.id === genreId)
			return genre ? genre.name : ''
		})
		.join(' | ')

	return (
		<>
			<ModalBody>
				<div className='mt-3 overflow-hidden '>
					<YTEmbed movieId={movie?.id} category={type || movie?.media_type} />
				</div>
				<div>
					<div className='flex justify-between'>
						<p className='mt-2 text-zinc-100 font-extrabold'>
							Name:
							<span className='ml-2 text-zinc-200 text-md font-semibold'>{movie?.title || movie?.name}</span>
						</p>
						<Button className='text-red-600' isIconOnly variant='light'>
							{isFavorite ? (
								<Favorite className='text-3xl' onClick={handleFavorites} />
							) : (
								<FavoriteBorder className='text-3xl' onClick={handleFavorites} />
							)}
						</Button>
					</div>
					<p className='mt-2 text-zinc-100 font-extrabold'>
						Release Date:
						<span className='ml-2 text-zinc-200 text-md font-semibold'>
							{movie?.first_air_date || movie?.release_date}{' '}
						</span>
					</p>
					<p className='mt-2 text-xs text-zinc-300 ml-2'>{movie?.overview}</p>

					<p className='mt-2 text-zinc-100 font-extrabold'>
						Rating:
						<span className='ml-2 text-zinc-200 text-sm font-semibold'>{movie?.vote_average.toFixed(1)}</span>
					</p>

					<p className='mt-2 text-zinc-100 font-extrabold'>
						Genres:
						<span className='ml-2 text-zinc-200 text-sm font-semibold'>{genreNames ? genreNames : 'Unknown'}</span>
					</p>
				</div>
			</ModalBody>
			<ModalFooter>
				<Button
					className='bg-transparent hover:!bg-red-600 border-red-600 text-red-500 hover:text-black font-semibold'
					variant='ghost'
					onPress={onClose}>
					Close
				</Button>
			</ModalFooter>
		</>
	)
}

export default BodyModal