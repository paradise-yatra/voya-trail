import { Router } from 'express';
import {
  createTour,
  updateTour,
  archiveTour,
  listToursAdmin,
  getTourAdmin,
} from '../controllers/tourAdminController';
import {
  createDestination,
  listDestinationsAdmin,
  getDestinationAdmin,
  updateDestination,
  deleteDestination,
} from '../controllers/destinationAdminController';
import { uploadTourImage } from '../controllers/uploadController';
import {
  createCategory,
  listCategoriesAdmin,
  getCategoryAdmin,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryAdminController';
import {
  createAmenity,
  listAmenitiesAdmin,
  updateAmenity,
} from '../controllers/amenityAdminController';
import { auth } from '../middleware/auth';
import { roleCheck } from '../middleware/roleCheck';

const router = Router();

// All admin tour endpoints require authenticated admin
router.use(auth, roleCheck(['admin']));

// Tour packages
router.get('/tours', listToursAdmin);
router.get('/tours/:id', getTourAdmin);
router.post('/tours', createTour);
router.put('/tours/:id', updateTour);
router.delete('/tours/:id', archiveTour);

// Media uploads
router.post('/uploads/tour-image', uploadTourImage);

// Categories
router.get('/categories', listCategoriesAdmin);
router.get('/categories/:id', getCategoryAdmin);
router.post('/categories', createCategory);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Destinations
router.get('/destinations', listDestinationsAdmin);
router.get('/destinations/:id', getDestinationAdmin);
router.post('/destinations', createDestination);
router.put('/destinations/:id', updateDestination);
router.delete('/destinations/:id', deleteDestination);

// Amenities
router.get('/amenities', listAmenitiesAdmin);
router.post('/amenities', createAmenity);
router.put('/amenities/:id', updateAmenity);

export default router;


