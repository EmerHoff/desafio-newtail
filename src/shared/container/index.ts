import { container } from 'tsyringe';
import { HousesRepository } from '../../modules/houses/repositories/HousesRepository';

import { IHousesRepository } from '../../modules/houses/repositories/IHousesRepository';
import { ILordsRepository } from '../../modules/lords/repositories/ILordsRepository';
import { LordsRepository } from '../../modules/lords/repositories/LordsRepository';

container.registerSingleton<IHousesRepository>(
    'HousesRepository',
    HousesRepository
);

container.registerSingleton<ILordsRepository>(
    'LordsRepository',
    LordsRepository
);