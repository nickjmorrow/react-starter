import { injectable } from 'tsyringe';
import { SalvageRarity } from '~/incarnate_simulation';
import { RandomNumberProvider } from '~/incarnate_simulation/RandomNumberProvider';
import { SalvageRarityProbabilityProvider } from '~/incarnate_simulation/SalvageRarityProbabilityProvider';

const getCumulativeChance = (index: number, chances: number[]) => {
    return chances.reduce((agg, cur, i) => {
        if (i > index) {
            return agg;
        }

        return agg + cur;
    }, 0);
};

@injectable()
export class RandomSalvageRarityProvider {
    private _randomNumberProvider: RandomNumberProvider;
    private _salvageRarityProbabilityProvider: SalvageRarityProbabilityProvider;

    constructor(
        randomNumberProvider: RandomNumberProvider,
        salvageRarityProbabilityProvider: SalvageRarityProbabilityProvider,
    ) {
        this._randomNumberProvider = randomNumberProvider;
        this._salvageRarityProbabilityProvider = salvageRarityProbabilityProvider;
    }

    getRandomSalvageRarity = (): SalvageRarity => {
        const randomNumber: number = this._randomNumberProvider.getRandomNumber();
        const probabilityMappings = this._salvageRarityProbabilityProvider.getSalvageRarityProbability();

        for (let i = 0; i < probabilityMappings.length; i++) {
            const cumulativeChance = getCumulativeChance(
                i,
                probabilityMappings.map(a => a.probability),
            );

            if (randomNumber < cumulativeChance) {
                return probabilityMappings[i].rarity;
            }
        }

        throw new Error();
    };
}
