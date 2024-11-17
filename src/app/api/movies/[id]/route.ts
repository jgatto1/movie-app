import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

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
