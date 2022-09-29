import { Router } from 'express';
import { CreateHouseController } from '../modules/houses/useCases/createHouse/CreateHouseController';
import { ListHouseController } from '../modules/houses/useCases/listHouse/ListHouseController';
import { RemoveHouseController } from '../modules/houses/useCases/removeHouse/RemoveHouseController';

const housesRouter = Router();
const createHouseController = new CreateHouseController();
const listHouseController = new ListHouseController();
const removeHouseController = new RemoveHouseController();

housesRouter.post('/', createHouseController.execute);
housesRouter.get('/', listHouseController.execute);
housesRouter.delete('/:id', removeHouseController.execute);

export { housesRouter };
