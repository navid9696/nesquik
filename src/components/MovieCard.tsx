import { IGenres, IMovie } from '../../lib/types'
import { baseImgUrl } from '../../lib/constants'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import { fetchGenres, fetchTrailers } from '../../actions/movieData'
import { YouTubeEmbed } from '@next/third-parties/google'

interface Props {
	movie: IMovie
	genres: IGenres[]
}

const MovieCard = ({ movie, genres }: Props) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const genreNames = movie?.genre_ids
		.map(genreId => {
			const genre = genres.find(genre => genre.id === genreId)
			return genre ? genre.name : ''
		})
		.join(' | ')
	return (
		<>
			{movie.poster_path && (
				<div className='relative min-w-[194px] h-72 my-10 cursor-pointer' onClick={onOpen}>
					<Image
						className='h-full w-full rounded-lg transition hover:scale-105 hover:outline hover:outline-white hover:outline-3 '
						alt='poster'
						width={200}
						height={0}
						src={`${baseImgUrl}${movie?.poster_path}`}
					/>
				</div>
			)}
			<Modal
				className='pb-3 z-50 xl:self-center'
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
									<YouTubeEmbed
										videoid='e1k1PC0TtmE'
										params='autoplay=1&disablekb=1&controls=0&iv_load_policy=0&loop=1&rel=0&cc_load_policy=0'
									/>
								</div>
								<div>
									<p className='mt-2 text-zinc-100 font-extrabold'>
										Name:<span className='ml-2 text-zinc-200 font-semibold'>{movie?.title || movie?.name}</span>
									</p>
									<p className='mt-2 text-zinc-100 font-extrabold'>
										Release Date:
										<span className='ml-2 text-red-200 font-semibold'>
											{movie?.release_date}tu powinna być data ale się nie wyświetla{' '}
										</span>
									</p>
									<p className='mt-2 text-sm text-zinc-200 ml-2'>{movie?.overview}</p>

									<p className='mt-2 text-zinc-100 font-extrabold'>
										Rating:<span className='ml-2 text-zinc-200 font-semibold'>{movie?.vote_average.toFixed(1)}</span>
									</p>
									<p className='mt-2 text-zinc-100 font-extrabold'>
										Genres:
										<span className='ml-2 text-zinc-200 font-semibold'>{genreNames}</span>
									</p>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='ghost' onPress={onClose}>
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
