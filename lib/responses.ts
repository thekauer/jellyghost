import { NextResponse } from "next/server";

type JsonData = Record<string, any> | string;

export const Responses = {
  ok: (data: JsonData) => NextResponse.json({ data }, { status: 200 }),
  created: (data: JsonData = {}) =>
    NextResponse.json({ data }, { status: 201 }),
  badRequest: (message: string = "Bad Request") =>
    NextResponse.json({ error: message }, { status: 400 }),
  unauthorized: (message: string = "Unauhtorized") =>
    NextResponse.json({ error: message }, { status: 401 }),
  forbidden: (message: string = "Forbidden") =>
    NextResponse.json({ error: message }, { status: 403 }),
  notFound: (message: string = "Not Found") =>
    NextResponse.json({ error: message }, { status: 404 }),
  internalError: (message: string = "Internal Server Error") =>
    NextResponse.json({ error: message }, { status: 500 }),
};
