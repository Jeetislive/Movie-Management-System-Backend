import AppError from "../../../error/AppError.js";
import prisma from "../../../prisma/client.js"

const getAllFilms = async (limit: undefined |number = 10,skip: number, orderBy: undefined | string = "title", orderType: undefined | string = "asc",) => {
    try {
        const films = await prisma.film.findMany({
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
        let total = await prisma.film.count();
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
    getFilmActorsById
}