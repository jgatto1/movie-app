import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

// GET movie by id
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const movie = await prisma.movie.findUnique({
    where: { id: (await params).id },
  });
  return NextResponse.json(movie);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
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
      where: { id: (await params).id },
      data: {
        title,
        publishingYear,
        posterUrl,
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
