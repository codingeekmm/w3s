import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

import { Customer } from "@prisma/client";
import { CustomerRepository } from "@/app/_repositories/Customer";

export async function GET(request: NextRequest) {
  try {
    //
    //#### 01_Select //Get all customers
    // const customers = await CustomerRepository.findMany();
    // return NextResponse.json(customers);
    //####
    //------------------------------------------------------//
    //#### 02_SelectDistinct(i)Distinct //Select distinct countries from "Customer" table
    // const distinctCountries = await CustomerRepository.getDistinctCountries();
    // return NextResponse.json(distinctCountries);
    //####
    //------------------------------------------------------//
    //#### 02_SelectDistinct(ii)Count //Count distinct countries from "Customer" table
    // const countDistinctCountries =
    //   await CustomerRepository.getCountDistinctCountries();
    // return NextResponse.json(countDistinctCountries);
    //####
    //------------------------------------------------------//
    //#### 03_Where //Filter customers from the country "Mexico", in "Customer" table
    // const customers = await CustomerRepository.getCustomersBySpecificCounty();
    // return NextResponse.json(customers);
    //####
    //------------------------------------------------------//
    //#### 04_OrderBy(i)ASC & DESC //Select customers from "Customer" table, sorted by the "country"
    // const customers = await CustomerRepository.getCustomersOrderByCountry();
    // return NextResponse.json(customers);
    //####
    //------------------------------------------------------//
    //#### 04_OrderBy(ii)Several Column //Sorted ASC by the "country" and DESC by "customerName"
    // const customers =
    //   await CustomerRepository.getCustomersOrderBySeveralColumn();
    // return NextResponse.json(customers);
    //####
    //------------------------------------------------------//
    //#### 05_And(i)And_LIKE  //Select all customers from Spain that starts with the letter 'G'
    // const customers =
    //   await CustomerRepository.getCustomersInSpainWithNamesStartingWithG();
    // return NextResponse.json(customers);
    //####
    //------------------------------------------------------//
    //#### 05_And(ii)And_AND  //Selects all Customers where Country is "Germany" AND City is "Berlin" AND PostalCode is higher than 12000
    // const customers =
    //   await CustomerRepository.getCustomersInBerlinGermanyWithPostalCodeGreaterThan12000();
    // return NextResponse.json(customers);
    //####
    //------------------------------------------------------//
    //#### 05_And(iii)And_OR  //Select all Spanish customers that starts with either "G" or "R"
    // const customers =
    //   await CustomerRepository.getCustomersInSpainWithNamesStartingWithGOrR();
    // return NextResponse.json(customers);
    //####
    //#### 06_OR(i) //Select all Spanish customers that starts with either "G" or "R"
    // const customers =
    //   await CustomerRepository.getCustomersInSpainWithNamesStartingWithGOrR();
    // return NextResponse.json(customers);
    //####
    //#### 06_OR(ii) //Select all customers from Berlin or Norway  that starts with the letter 'G'
    // const customers =
    //   await CustomerRepository.getCustomersInBarlinOrNorwayWithNamesStartingWithG();
    // return NextResponse.json(customers);
    //####
    //#### 07_NOT(i) //Select all customers that are NOT from Spain
    // const customers = await CustomerRepository.getCustomersNotFromSpain();
    // return NextResponse.json(customers);
    //####
    //#### 07_NOT(ii)NOT_LIKE  //Select customers that does not start with the letter 'A'
    // const customers =
    //   await CustomerRepository.getCustomersWithNamesNotStartWithA();
    // return NextResponse.json(customers);
    //####
    //#### 07_NOT(iii)NOT_BETWEEN  //Select customers with customerID not between 10 and 60
    // const customers =
    //   await CustomerRepository.getCustomersWithIDNotBetween10And60();
    // return NextResponse.json(customers);
    //####
    //#### 07_NOT(iv)NOT_IN  //Select customers that are not from Paris or London
    // const customers =
    //   await CustomerRepository.getCustomersNotFromParisOrLondon();
    // return NextResponse.json(customers);
    //####
    //#### 07_NOT(v)NOT_Greater_Than  //Select customers with a CustomerId not greater than 50
    // const customers =
    //   await CustomerRepository.getCustomersWithIDNotGreaterThan50();
    // return NextResponse.json(customers);
    //####
    //#### 07_NOT(vi)NOT_Less_Than  //Select customers with a CustomerId not less than 50
    // const customers =
    //   await CustomerRepository.getCustomersWithIDNotLessThan50();
    // return NextResponse.json(customers);
    //####
    //#### 08_Limit  //Select top 3 customers from Germany
    const customers = await CustomerRepository.getTop3CustomersFromGermany();
    return NextResponse.json(customers);
    //####
    //------------------------------------------------------//
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const customer: Customer = await request.json();
    const createdCustomer = await CustomerRepository.create(customer);
    // const createdUser = await prisma.user.create({
    //   data: {
    //     ...user,
    //   },
    // });
    console.log(createdCustomer);
    return NextResponse.json(createdCustomer);
    //return NextResponse.json({ createdUser }, { status: 201 });
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
