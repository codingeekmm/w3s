import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { Customer } from "@prisma/client";
import { CustomerRepository } from "@/app/_repositories/Customer";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const customer: Customer = await request.json();
    const updatedCustomer = await CustomerRepository.update(
      params.id,
      customer
    );

    return NextResponse.json(updatedCustomer);
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const deletedCustomer = await CustomerRepository.remove(params.id);
    return NextResponse.json(deletedCustomer);
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    //const user: User = await request.json();
    const editedCustomer = await CustomerRepository.findUnique(params.id);
    return NextResponse.json(editedCustomer);
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
