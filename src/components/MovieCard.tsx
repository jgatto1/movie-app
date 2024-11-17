import { Movie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link
      href={`/movies/${movie.id}`}
      key={movie.id}
      className="relative group block hover:opacity-80 transition-opacity bg-card rounded-lg"
    >
      <div className="relative overflow-hidden rounded-lg min-h-[300px]">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-2 p-2 gap-2 flex flex-col">
        <h3 className="text-white text-base font-bold">{movie.title}</h3>
        <p className="text-white text-xs font-medium">
          {movie.publishingYear}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
