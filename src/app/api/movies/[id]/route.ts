import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: params.id },
    });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch movie" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, publishingYear, posterUrl } = body;

    // Validate required fields
    if (!title || !publishingYear || !posterUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedMovie = await prisma.movie.update({
      where: { id: params.id },
      data: {
        title,
        publishingYear,
        posterUrl
      },
    });

    return NextResponse.json(updatedMovie);
  } catch (error) {
    console.error("Error updating movie", error);
    return NextResponse.json(
      { error: "Failed to update movie" },
      { status: 500 }
    );
  }
}
