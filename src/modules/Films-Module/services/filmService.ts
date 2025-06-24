import AppError from "../../../error/AppError.js";
import prisma from "../../../prisma/client.js"

const getAllFilms = async (limit: undefined |number = 10,skip: number, orderBy: undefined | string = "title", orderType: undefined | string = "asc", 
filtersCategory: string = "",
filtersLanguage: string = "",
filtersRelease_year: string = "",
filtersLength_type: "gt" | "lt" | "" = "",
filtersLength_value: number = 0,
filtersActor: string = "") => {    
  try {
        const where: any = {};

        if (filtersCategory) {
            where.film_category = {
                some: {
                    category: {
                        name: {
                            equals: filtersCategory
                        }
                    }
                }
            };
        }

        if (filtersLanguage) {
            where.language_film_language_idTolanguage = {
                name: {
                    equals: filtersLanguage
                }
            };
        }

        if (filtersRelease_year) {
            where.release_year = parseInt(filtersRelease_year);
        }

        if (filtersLength_type) {
            where.length = {
                [filtersLength_type]: filtersLength_value
            };
        }

        if (filtersActor) {
            where.film_actor = {
                some: {
                    actor: {
                        OR: [
                            {
                                first_name: {
                                  contains: filtersActor.split(" ")[0],
                                  // mode: "insensitive"
                                }
                            },
                            {
                                last_name: {
                                  contains: filtersActor.split(" ")[1],
                                  // mode: "insensitive"
                                }
                            }
                        ]
                    }
                }
            };
        }

        const films = await prisma.film.findMany({
            where,
            select: {
                film_id: true,
                title: true,
                release_year: true,
                length: true,
                replacement_cost: true,
                rating: true,
                language_film_language_idTolanguage: {
                    select: {
                        name: true
                    }
                }
            },
            skip: skip,
            take: limit,
            orderBy: {
                [orderBy]: orderType
            }
        });

        let total = await prisma.film.count({ where });

        const filmsWithLanguage = films.map(film => ({
            ...film,
            language: film.language_film_language_idTolanguage.name
        }));

        return {
            films: filmsWithLanguage,
            total
        };
    } catch (error) {
        console.log(error);
        throw new AppError("Error Fetching Films",404);
    }
}
const getFilterDetails = async () => {
    try {
        const categories = await prisma.category.findMany({
            select: {
                name: true
            }
        });

        const languages = await prisma.language.findMany({
            select: {
                name: true
            }
        });
        const actors = await prisma.actor.findMany({
            select: {
                first_name: true,
                last_name: true
            }
        });
        const years = await prisma.film.findMany({
          select: {
                release_year: true
            },
            distinct: ["release_year"]
        });
        const lengths = await prisma.film.findMany({
          select: {
                length: true
            },
            distinct: ["length"]
        })

        return {
            categories,
            languages,
            actors,
          years,
          lengths,
        };
    }
        catch (error) {
        console.log(error);
        throw new AppError("Error Fetching Filter Details", 404);
    }
}
const getFilmDetailsById = async (id: number) => {
  try {
    const film = await prisma.film.findUnique({
      where: {
        film_id: id,
      },
      select: {
        title: true,
        description: true,
        release_year: true,
        length: true,
        replacement_cost: true,
        rating: true,
        language_film_language_idTolanguage: {
          select: {
            name: true,
          },
        },
        film_category: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return film;
  } catch (error) {
    console.log(error);
    throw new AppError("Error Fetching Film", 404);
  }
};

const getFilmActorsById = async (id: number) => {
  try {
    const film = await prisma.film_actor.findMany({
      where: {
        film_id: id,
      },
      select: {
        actor: {
          select: {
            first_name: true,
            last_name: true,
            actor_id: true,
          },
        },
      },
    })
    return film;
  } catch (error) {
    console.log(error);
    throw new AppError("Error Fetching Film", 404);
  }
};

export default {
    getAllFilms,
    getFilmDetailsById,
    getFilmActorsById,
  getFilterDetails,
}