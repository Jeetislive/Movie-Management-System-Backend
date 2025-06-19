import AppError from "../../../error/AppError.js";
import prisma from "../../../prisma/client.js"

const getAllStores = async () => {
    try {
        const stores = await prisma.store.findMany({
        include: {
            staff_store_manager_staff_idTostaff: {
            select: {
                first_name: true,
                last_name: true,
            },
            },
            address: {
            select: {
                address: true,
            },
            },
            inventory: {
            select: {
                rental: {
                select: {
                    rental_id: true,
                },
                },
            },
            },
            staff_staff_store_idTostore: {
            select: {
                staff_id: true,
            },
            },
        },
        });
        const result = stores.map((store) => {
        const totalRentals = store.inventory.reduce(
            (sum, inv) => sum + inv.rental.length,
            0
        );

        return {
            storeId: store.store_id,
            manager: `${store.staff_store_manager_staff_idTostaff.first_name} ${store.staff_store_manager_staff_idTostaff.last_name}`,
            address: store.address.address,
            staffCount: store.staff_staff_store_idTostore.length,
            totalRentals,
        };
        });
        return result;
    } catch (error) {
        console.log(error);
        throw new AppError("Error Fetching Stores",404);
    }
}
const getStoreDetailsById = async (storeId: number) => {
    try {
        const store = await prisma.store.findUnique({
        where: {
            store_id: storeId,
        },
        include: {
            staff_store_manager_staff_idTostaff: {
            select: {
                first_name: true,
                last_name: true,
            },
            },
            address: {
            select: {
                address: true,
                district: true,
                postal_code: true,
            },
            },
            staff_staff_store_idTostore: {
            select: {
                staff_id: true,
            },
            },
        },
        });
        const staff = store?.staff_staff_store_idTostore.map((staff) => ({
        staffId: staff.staff_id
        }));
        return {
        manager: `${store?.staff_store_manager_staff_idTostaff.first_name} ${store?.staff_store_manager_staff_idTostaff.last_name}`,
        address: `${store?.address.address}, ${store?.address.district}, ${store?.address.postal_code}`,
        staffCount: store?.staff_staff_store_idTostore.length,
        staff,
        };
    } catch (error) {
        console.log(error);
        throw new AppError("Error Fetching Store",404);
    }
}
const getAllRentalDetailsByStoreId = async (storeId: number, pageNo: number, pageSize: number) => {
  try {
    const inventories = await prisma.inventory.findMany({
        where: {
            store_id: storeId
        },
        include: {
            store: true,
            film: {
            select: { title: true }
            },
            rental: true,
        }
    });
    
    interface RentalStats {
        [key: string]: {
            storeId: number;
            filmName: string;
            rentalCount: number;
        }
    }
    
    const rentalStats: RentalStats = {};
    
    for (const inv of inventories) {
        const key = `${inv.store_id}-${inv.film.title}`;
        if (!rentalStats[key]) {
            rentalStats[key] = {
                storeId: inv.store_id,
                filmName: inv.film.title,
                rentalCount: 0,
            };
        }
        rentalStats[key].rentalCount += inv.rental.length;
    }
    
    const result = Object.values(rentalStats);
    const totalCount = result.length;
    // console.log(result);

    const startIndex = (pageNo - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedResult = result.slice(startIndex, endIndex);
    return {
        data: paginatedResult,
        totalCount: totalCount
    };} catch (error) {
        console.log(error);
        throw new AppError("Error Fetching Rentals", 404);
  }
}
const getAllStuffDetailsByStoreId = async (storeId: number) => {
    try {
        const store = await prisma.store.findUnique({
        where: {
            store_id: storeId,
        },
        include: {
            staff_store_manager_staff_idTostaff: {
            select: {
                first_name: true,
                last_name: true,
            },
            },
            address: {
            select: {
                address: true,
                district: true,
                postal_code: true,
            },
            },
            staff_staff_store_idTostore: {
            select: {
                staff_id: true,
            },
            },
        },
        });
        const staff = store?.staff_staff_store_idTostore.map((staff) => ({
        staffId: staff.staff_id
        }));        
        return {
        manager: `${store?.staff_store_manager_staff_idTostaff.first_name} ${store?.staff_store_manager_staff_idTostaff.last_name}`,
      address:
        store?.address.address +
        ", " +
        store?.address.district +
        ", " +
        store?.address.postal_code,
      staffId: store?.staff_staff_store_idTostore.pop()?.staff_id,
        };
    } catch (error) {
        console.log(error);
        throw new AppError("Error Fetching Staff", 404);
    }
}

export default {
    getAllStores,
    getStoreDetailsById,
    getAllRentalDetailsByStoreId,
    getAllStuffDetailsByStoreId
}