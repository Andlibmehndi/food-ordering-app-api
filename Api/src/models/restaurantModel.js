import { Schema, model } from 'mongoose';

const restaurantSchema = new Schema({
    area: Schema.Types.String,
    comments: Schema.Types.String,
    cuisine: Schema.Types.String,
    name: Schema.Types.String,
    place: Schema.Types.String,
    price: Schema.Types.Number
});

const RestaurantModel = model('restaurants', restaurantSchema);

export default RestaurantModel;