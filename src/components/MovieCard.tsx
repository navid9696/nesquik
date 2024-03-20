'use client'
import { IGenres, IMovie } from '../../lib/types'
import { baseImgUrl } from '../../lib/constants'
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import YTEmbed from './YTEmbed'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { useSession } from 'next-auth/react'

interface Props {
	movie: IMovie
	genres?: IGenres[]
	type?: string
}

const MovieCard = ({ movie, genres, type }: Props) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [isFavorite, setIsFavorite] = useState(false)
	const { data: session } = useSession()

	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.NEXTAUTH_URL_TOKEN}`,
		},
	}

	const genreNames = movie?.genre_ids
		.map(genreId => {
			const genre = genres?.find(genre => genre.id === genreId)
			return genre ? genre.name : ''
		})
		.join(' | ')

	return (
		<>
			{movie.poster_path && (
				<div className='relative min-w-[194px] h-72 my-3 cursor-pointer' onClick={onOpen}>
					<Image
						className='h-full  rounded-lg transition hover:scale-105 hover:outline hover:outline-white hover:outline-3 '
						alt='poster'
						width={200}
						height={0}
						src={`${baseImgUrl}${movie?.poster_path}`}
					/>
				</div>
			)}
			<Modal
				className='pb-1 z-50 xl:self-center'
				hideCloseButton
				placement='bottom-center'
				scrollBehavior='outside'
				backdrop='blur'
				isOpen={isOpen}
				onOpenChange={onOpenChange}>
				<ModalContent className='bg-black '>
					{onClose => (
						<>
							<ModalBody>
								<div className='mt-3 overflow-hidden '>
									<YTEmbed movieId={movie.id} category={type} />
								</div>
								<div>
									<div className='flex justify-between'>
										<p className='mt-2 text-zinc-100 font-extrabold'>
											Name:
											<span className='ml-2 text-zinc-200 text-md font-semibold'>{movie?.title || movie?.name}</span>
										</p>
										<Button
											className='text-red-600'
											isIconOnly
											variant='light'
											onClick={() => {
												setIsFavorite(!isFavorite)
											}}>
											{isFavorite ? <Favorite className='text-3xl' /> : <FavoriteBorder className='text-3xl' />}
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
										<span className='ml-2 text-zinc-200 text-sm font-semibold'>
											{genreNames ? genreNames : 'Unknown'}
										</span>
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
					)}
				</ModalContent>
			</Modal>
		</>
	)
}

export default MovieCard
