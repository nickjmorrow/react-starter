import 'reflect-metadata';

import { container } from 'tsyringe';
import { RandomSalvageDropMissionRunCountCalculator } from '~/incarnate_simulation/RandomSalvageDropMissionRunCountCalculator';
import { Player } from '~/incarnate_simulation/types';
import { IncarnateAbilityA } from '~/incarnate_simulation/incarnateAbilities';

const getAverage = (input: number[]): number => input.reduce((agg, cur) => agg + cur, 0) / input.length;

describe('random salvage drop mission run count calculator', () => {
    it('base', () => {
        const missionRunCountCalculator = container.resolve(RandomSalvageDropMissionRunCountCalculator);
        const player: Player = {
            incarnateAbilities: [],
            salvage: [],
            incarnateTheads: [],
            desiredIncarnateAbilities: [IncarnateAbilityA],
        };

        const runCount = 1000;

        const results = new Array(runCount).fill(0).map(c => {
            return missionRunCountCalculator.calculateRandomSalvageDropMissionRunCount(player);
        });

        console.log(getAverage(results));

        expect(true).toBe(true);
    });
});
