import { NextResponse } from "next/server";
import { Movie } from "@/types/movie";
import prisma from "../../../../prisma/client";

// GET all movies
export async function GET() {
  try {
    const movies = await prisma.movie.findMany();
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}

// POST new movie
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, publishingYear, posterUrl } = body;
    // TODO: Validate required fields using zod or similar
    // Validate required fields
    if (!title || !publishingYear) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newMovie: Movie = {
      id: Date.now().toString(), // Replace with proper ID generation
      title: title,
      publishingYear: publishingYear,
      posterUrl: posterUrl || 'https://picsum.photos/200/300',
    };

    // Add your database logic here
    const createdMovie = await prisma.movie.create({ data: newMovie });
    return NextResponse.json(createdMovie, { status: 201 });
  } catch (error) {
    console.error("Error updating movie", error);
    return NextResponse.json(
      { error: "Failed to create movie" },
      { status: 500 }
    );
  }
}
