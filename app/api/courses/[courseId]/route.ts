import { getIsAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";

export const GET = async (
    req: Request,
    { params }: { params: { courseId: number } },
  ) => {
    if (!getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 401 });
    };
  
    const data = await db.query.courses.findFirst({
      where: eq(courses.id, params.courseId),
    });
  
    return NextResponse.json(data);
  };

  export const PUT = async (
    req: Request,
    { params }: { params: { courseId: number } },
  ) => {
    if (!getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 401 });
    };
  
    const body = await req.json();
    const data = await db.update(courses).set({
      ...body,
    }).where(eq(courses.id, params.courseId)).returning();
  
    return NextResponse.json(data[0]);
  };


  export const DELETE = async (
    req: Request,
    { params }: { params: { courseId: number } },
  ) => {
    if (!getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 401 });
    };
  
    const data = await db.delete(courses)
      .where(eq(courses.id, params.courseId)).returning();
  
    return NextResponse.json(data[0]);
  };