import { RestaurantModel } from "../models";

const parseFilterQuery = (inputData) => {
    const keys = Object.keys(inputData);
    const filterList = keys.map((val) => {
        if(val=='cuisine'){
            return { [val]: { $regex: `${inputData[val]}`, $options: "i" } }
        }else{
            return { [val]: { $eq: `${inputData[val]}` } }
        }
    })
    return filterList;
}

function searchRestaurant(searchValue) {
    return RestaurantModel.find(
        {
            $or: [
                { "name": { $regex: searchValue, $options: "i" } },
                { "cuisine": { $regex: searchValue, $options: "i" } },
                { "place": { $regex: searchValue, $options: "i" } }
            ]
        }
    ).select({ "_id": 0 });
}

function filterRestaurant(filterValue) {
    const filterQuery = parseFilterQuery(filterValue);
    return RestaurantModel.find(
        {
            $and: filterQuery
        }
    ).select({ "_id": 0 });
}

function findAllRestaurant() {
    return RestaurantModel.find().select({ "_id": 0 });
}



export {
    searchRestaurant,
    findAllRestaurant,
    filterRestaurant
};