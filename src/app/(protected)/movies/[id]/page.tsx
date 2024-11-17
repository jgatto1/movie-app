"use client";

import Header from "@/components/Header";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import { Movie } from "@/types/movie";
import { useParams } from "next/dist/client/components/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";

export default function MoviePage() {
  const { id } = useParams();
  const router = useRouter();
  const isEdit = id !== undefined && id !== "add";
  const [movie, setMovie] = useState<Movie>({});
  const [submitting, setSubmitting] = useState(false);
  const [isMovieLoading, setIsMovieLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit");

    setSubmitting(true);
    try {
      // Add your API call here
      if (isEdit) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(movie),
          }
        );
        if (res.ok) {
          router.push("/movies");
        }
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`, {
          method: "POST",
          body: JSON.stringify(movie),
        });
        if (res.ok) {
          router.push("/movies");
        } else {
          console.error("Error creating movie");
          alert("Error creating movie");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const loadMovie = async () => {
      setIsMovieLoading(true);
      const movieRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`
      );
      const movie = await movieRes.json();
      setMovie(movie);
      setIsMovieLoading(false);
    };
    if (isEdit) {
      loadMovie();
    }
  }, [id, isEdit]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex">
        <Header title={isEdit ? "Edit" : "Create"} />
      </div>
      <div className="space-y-4 mt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {isMovieLoading && <Spinner />}
          {!isMovieLoading && (
            <div className="flex justify-between items-center gap-8">
              <div className="flex-1">
                <div className="bg-input aspect-[3/4] relative overflow-hidden flex items-center justify-center border-2 border-dashed border-white rounded-lg p-4 cursor-pointer">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FaUpload className="w-5 h-5 text-white" />
                    Drop an image here
                  </div>
                </div>
              </div>
              <div className="flex-1 gap-2 flex flex-col">
                <Input
                  type="text"
                  placeholder="Title"
                  value={movie.title}
                  onChange={(e) =>
                    setMovie({ ...movie, title: e.target.value })
                  }
                  required
                />
                <Input
                  type="number"
                  placeholder="Publishing Year"
                  value={movie.publishingYear}
                  onChange={(e) =>
                    setMovie({
                      ...movie,
                      publishingYear: parseInt(e.target.value),
                    })
                  }
                  required
                />
                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    onClick={() => router.push("/movies")}
                    disabled={submitting}
                    className="px-4 py-2 border rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={submitting}
                    className="px-4 py-2 bg-primary text-white rounded-md"
                  >
                    {!submitting && (
                      <span className="font-bold">
                        {isEdit ? "Update" : "Create"}
                      </span>
                    )}
                    {submitting && <Spinner />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
