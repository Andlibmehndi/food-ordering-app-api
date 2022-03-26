import express from 'express';
import { restaurantController } from '../controllers';
import { verifyToken } from '../lib/auth'
const routes = express.Router();

routes.get('/search/:searchValue', verifyToken, async (req, res, next) => {
    try {
        const record = await restaurantController.searchRestaurant(req.params.searchValue);
        if (record) {
            res.json({
                success: true,
                record
            });
        }
    }
    catch (error) {
        res.json({ error: true, message: error.message });
        next(error);
    }
});

routes.get('/search', verifyToken, async (req, res, next) => {
    try {
        const record = await restaurantController.findAllRestaurant();
        if (record) {
            res.json({
                success: true,
                record
            });
        }
    }
    catch (error) {
        res.json({ error: true, message: error.message });
        next(error);
    }
});

routes.post('/filter', verifyToken, async (req, res, next) => {
    try {
        const record = await restaurantController.filterRestaurant(req.body);
        if (record) {
            res.json({
                success: true,
                record
            });
        }
    }
    catch (error) {
        res.json({ error: true, message: error.message });
        next(error);
    }
});

export default routes;