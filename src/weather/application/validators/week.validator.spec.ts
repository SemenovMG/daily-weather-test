import { Test, TestingModule } from '@nestjs/testing';

import { IDateProvider, IDateValidator } from 'src/weather/core/interfaces';
import { OneWeekDateValidator } from './one-week-date.validator';

describe('WeatherController', () => {
    let dateValidator: IDateValidator;
    let dateProvider: IDateProvider;

    beforeEach(async () => {
        const module: TestingModule =
            await Test.createTestingModule({
                providers: [
                    {
                        provide: 'IDateProvider',
                        useValue: {
                            now: jest.fn().mockImplementation(() => new Date('2022-03-12T00:00:00Z'))
                        },
                    },
                    {
                        provide: 'IDateValidator',
                        useClass: OneWeekDateValidator
                    },
                ],
            })
                .compile();

        dateProvider = module.get<IDateProvider>("IDateProvider");
        dateValidator = module.get<IDateValidator>("IDateValidator");
    });

    describe('validate', () => {

        it('should return true for tomorrow', async () => {
            const tomorrowString = "13.03.2022";

            let actResult = dateValidator.validate(tomorrowString);

            expect(actResult).toBe(true);
        });

        it('should return false for next month', async () => {
            const nextMonthString = "12.04.2022";

            let actResult = dateValidator.validate(nextMonthString);

            expect(actResult).toBe(false);
        });

        it('should return false for day before', async () => {
            const yesterdayString = "11.03.2022";

            let actResult = dateValidator.validate(yesterdayString);

            expect(actResult).toBe(false);
        });
    });
});