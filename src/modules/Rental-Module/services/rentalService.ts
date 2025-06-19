import AppError from "../../../error/AppError.js";
import prisma from "../../../prisma/client.js"

const getAllRentals = async (
    limit: number = 10,
  orderBy: string = "movie",
    orderType: "asc" | "desc" = "asc",
    currentPage: number = 1,
) => {
    try {
      const rentals = await prisma.rental.findMany({
        select: {
          rental_id: true,
          rental_date: true,
          return_date: true,
          customer: {
            select: {
              first_name: true,
              last_name: true,
              email: true
            }
          },
          inventory: {
            select: {
              film: {
                select: {
                  title: true
                }
              },
              store: {
                select: {
                  store_id: true
                }
              }
            }
          },
          payment: {
            select: {
              amount: true,
              payment_date: true
            }
          }
        },
        take: limit,
        skip: (currentPage - 1) * limit,
        orderBy: orderBy === "movie" 
          ? {
              inventory: {
                film: {
                  title: orderType
                }
              }
            }
          : orderBy === "customer"
          ? {
              customer: {
                first_name: orderType
              }
            }
          : orderBy === "store"
          ? {
              inventory: {
                store: {
                  store_id: orderType
                }
              }
            }
          : {
              inventory: {
                film: {
                  title: orderType
                }
              }
            }
      });
      const totalRentals = await prisma.rental.count();
      return {
        rentals,
        totalRentals,
      };
    } catch (error) {
      console.log(error);
      throw new AppError("Error Fetching Rentals", 404);
    }
}
const getRentalDetailsById = async (rentalId: number) => {
    try {
        const rental = await prisma.rental.findUnique({
            where: {
                rental_id: rentalId
            },
            select: {
                rental_id: true,
                rental_date: true,
                return_date: true,
                customer: {
                    select: {
                        customer_id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        address: {
                            select: {
                                address: true,
                                district: true,
                                city: {
                                    select: {
                                        city: true
                                    }
                                }
                            }
                        }
                    }
                },
                inventory: {
                    select: {
                        film: {
                            select: {
                                film_id: true,
                                title: true,
                                description: true,
                                release_year: true,
                                rental_duration: true,
                                rental_rate: true,
                                length: true,
                                rating: true,
                                special_features: true
                            }
                        },
                        store: {
                            select: {
                                store_id: true,
                                address: {
                                    select: {
                                        address: true,
                                        district: true,
                                        city: {
                                            select: {
                                                city: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                payment: {
                    select: {
                        payment_id: true,
                        amount: true,
                        payment_date: true
                    }
                }
            }
        });

        if (!rental) {
            throw new AppError("Rental not found", 404);
        }

        return rental;

    } catch (error) {
        console.log(error);
        throw new AppError("Error Fetching Rental", 404);
    }
}
const getAllRentalDetailsByRentalDates = async (
    startDate: Date = new Date("1990-01-01"),
    endDate: Date = new Date(),
    store_id: number | undefined,
    customer_id: number | undefined,
    film_id: number | undefined
) => {
    try {
        // console.log(startDate, endDate);
        const rentals = await prisma.rental.findMany({
            where: {
                rental_date: {
                    gte: startDate,
                    lte: endDate,
                },
                inventory: {
                    store: {
                        store_id: store_id || {
                            in: (await prisma.store.findMany({
                                select: {
                                    store_id: true
                                }
                            })).map(store => store.store_id)
                        }
                    },
                    film: {
                        film_id: film_id || {
                            in: (await prisma.film.findMany({
                                select: {
                                    film_id: true
                                }
                            })).map(film => film.film_id)
                        }
                    }
                },
                customer: {
                    customer_id: customer_id || {
                        in: (await prisma.customer.findMany({
                            select: {
                                customer_id: true
                            }
                        })).map(customer => customer.customer_id)
                    }
                },
            },
            select: {
                rental_id: true,
                rental_date: true,
                return_date: true,
                customer: {
                    select: {
                        customer_id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        address: {
                            select: {
                                address: true,
                                district: true,
                                city: {
                                    select: {
                                        city: true
                                    }
                                }
                            }
                        }
                    }
                },
                inventory: {
                    select: {
                        film: {
                            select: {
                                film_id: true,
                                title: true,
                                description: true,
                                release_year: true,
                                rental_duration: true,
                                rental_rate: true,
                                length: true,
                                rating: true,
                                special_features: true
                            }
                        },
                        store: {
                            select: {
                                store_id: true,
                                address: {
                                    select: {
                                        address: true,
                                        district: true,
                                        city: {
                                            select: {
                                                city: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                payment: {
                    select: {
                        payment_id: true,
                        amount: true,
                        payment_date: true
                    }
                }
            },
            take: 10
        });
        return rentals;

    } catch (error) {
        console.log(error);
        throw new AppError("Error Fetching Rental", 404);
    }
}
const getAllStuffDetailsByRentalId = async (rentalId: number) => {
    try {

    } catch (error) {
        console.log(error);
        throw new AppError("Error Fetching Staff", 404);
    }
}

export default {
    getAllRentals,
    getRentalDetailsById,
    getAllRentalDetailsByRentalDates,
    getAllStuffDetailsByRentalId
}