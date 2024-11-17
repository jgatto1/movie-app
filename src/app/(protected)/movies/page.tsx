"use client";

import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import Spinner from "@/components/Spinner";
import { Movie } from "@/types/movie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { FiPlus } from "react-icons/fi";

export default function Dashboard() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/movies`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Header
          title="My movies"
          icon={
            <FiPlus
              className="w-5 h-5 border border-white rounded-full cursor-pointer"
              onClick={() => {
                router.push("/movies/add");
              }}
            />
          }
        />
      </div>
      {loading && <Spinner />}

      {/* Movie Grid */}
      {!loading && (
        <div className="grid grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button className="text-white px-4 py-2">Prev</button>
        <div className="flex gap-1">
          <span className="bg-white px-3 py-1 rounded">1</span>
          <span className="text-white px-3 py-1">2</span>
        </div>
        <button className="text-white px-4 py-2">Next</button>
      </div>
    </div>
  );
}
