import { prisma } from "../_utils/prismaSingleton";
import { Customer } from "@prisma/client";

export namespace CustomerRepository {
  //#### 01_SelectAll //all customers
  export async function findMany() {
    return await prisma.customer.findMany();
  }
  //####

  export async function create(customer: Customer) {
    return await prisma.customer.create({
      //   data: user,
      data: {
        ...customer,
      },
    });
  }

  export async function findUnique(id: number) {
    return await prisma.customer.findUnique({
      where: {
        id: id,
      },
    });
  }

  export async function update(id: number, customer: Customer) {
    return await prisma.customer.update({
      where: {
        id: id,
      },
      data: {
        ...customer,
      },
    });
  }

  export async function remove(id: number) {
    return await prisma.customer.delete({
      where: {
        id: id,
      },
    });
  }

  //#### 02_SelectDistinct(i)Distinct //Select distinct countries from "Customer" tablee
  export async function getDistinctCountries() {
    const distinctCountries = await prisma.customer.findMany({
      distinct: ["country"],
      select: {
        country: true,
      },
    });

    return distinctCountries.map((customer) => customer.country);
  }
  //####

  //#### 02_SelectDistinct(ii)Count //Count distinct countries from "Customer" table
  export async function getCountDistinctCountries() {
    const distinctCountries = await prisma.customer.findMany({
      distinct: ["country"],
      select: {
        country: true,
      },
    });

    return distinctCountries.map((customer) => customer.country).length;
  }
  //####

  ///#### 03_Where //Filter customers from the country "Mexico", in "Customer" table
  export async function getCustomersBySpecificCounty() {
    return await prisma.customer.findMany({
      where: {
        country: { equals: "Mexico" }, //country : "Mexico"
      },
    });
  }
  //####

  //#### 04_OrderBy(i)ASC & DESC //Select customers from "Customer" table, sorted by the "country"
  export async function getCustomersOrderByCountry() {
    return await prisma.customer.findMany({
      orderBy: {
        country: "asc", //Change 'asc' to 'desc' if you want descending order
      },
    });
  }
  //####

  //#### 04_OrderBy(ii)Several Column //Sorted ASC by the "country" and DESC by "customerName"
  export async function getCustomersOrderBySeveralColumn() {
    return await prisma.customer.findMany({
      orderBy: [
        {
          country: "asc",
        },
        {
          customerName: "desc",
        },
      ],
    });
  }
  //####

  //#### 05_And(i)And_LIKE  //Select all customers from Spain that starts with the letter 'G'
  export async function getCustomersInSpainWithNamesStartingWithG() {
    return await prisma.customer.findMany({
      where: {
        country: "Spain",
        customerName: {
          startsWith: "G",
        },
      },
    });
  }
  //####

  //#### 05_And(ii)And_AND  //Selects all Customers where Country is "Germany" AND City is "Berlin" AND PostalCode is higher than 12000
  export async function getCustomersInBerlinGermanyWithPostalCodeGreaterThan12000() {
    return await prisma.customer.findMany({
      where: {
        AND: [
          { country: "Germany" },
          { city: "Berlin" },
          { postalCode: { gt: "12000" } },
        ],
      },
      // where: {
      //   country: "Germany",
      //   city: "Berlin",
      //   postalCode: {
      //     gt: "12000",
      //   },
      // },
    });
  }
  //####

  //#### 06_OR(i) //Select all Spanish customers that starts with either "G" or "R"
  export async function getCustomersInSpainWithNamesStartingWithGOrR() {
    return await prisma.customer.findMany({
      where: {
        country: "Spain",
        OR: [
          {
            customerName: {
              startsWith: "G",
            },
          },
          {
            customerName: {
              startsWith: "R",
            },
          },
        ],
      },
    });
  }
  //####

  //#### 06_OR(ii) //Select all customers from Berlin or Norway  that starts with the letter 'G'
  export async function getCustomersInBarlinOrNorwayWithNamesStartingWithG() {
    return await prisma.customer.findMany({
      where: {
        OR: [
          {
            city: "Berlin",
          },
          {
            customerName: {
              startsWith: "G%",
            },
          },
          {
            country: "Norway",
          },
        ],
      },
    });
  }
  //####

  //#### 07_NOT(i)  //Select all customers that are NOT from Spain
  export async function getCustomersNotFromSpain() {
    return await prisma.customer.findMany({
      where: {
        NOT: [
          {
            country: "Spain",
          },
        ],
      },
    });
  }
  //####

  //#### 07_NOT(ii)NOT_LIKE  //Select customers that does not start with the letter 'A'
  export async function getCustomersWithNamesNotStartWithA() {
    return await prisma.customer.findMany({
      where: {
        NOT: {
          customerName: {
            startsWith: "A",
          },
        },
      },
    });
  }
  //####

  //#### 07_NOT(iii)NOT_BETWEEN  //Select customers with customerID not between 10 and 60
  export async function getCustomersWithIDNotBetween10And60() {
    return await prisma.customer.findMany({
      where: {
        NOT: {
          id: {
            gte: 10,
            lte: 60,
          },
        },
      },
    });
  }
  //####

  //#### 07_NOT(iv)NOT_IN  //Select customers that are not from Paris or London
  export async function getCustomersNotFromParisOrLondon() {
    return await prisma.customer.findMany({
      where: {
        city: {
          not: {
            in: ["Paris", "London"],
          },
        },
      },
    });
  }
  //####

  //#### 07_NOT(v)NOT_Greater_Than  //Select customers with a CustomerId not greater than 50
  export async function getCustomersWithIDNotGreaterThan50() {
    return await prisma.customer.findMany({
      where: {
        id: {
          not: {
            gt: 50,
          },
        },
      },
    });
  }
  //####

  //#### 07_NOT(vi)NOT_Less_Than  //Select customers with a CustomerId not less than 50
  export async function getCustomersWithIDNotLessThan50() {
    return await prisma.customer.findMany({
      where: {
        id: {
          not: {
            lt: 50,
          },
        },
      },
    });
  }
  //####

  //#### 08_Limit  //Select top 3 customers from Germany
  export async function getTop3CustomersFromGermany() {
    return await prisma.customer.findMany({
      where: {
        country: "Germany",
      },
      take: 3,
    });
  }
  //####
}
