import 'reflect-metadata';

import { container } from 'tsyringe';
import sinon from 'sinon';

import { RandomSalvageRarityProvider } from '~/incarnate_simulation/RandomSalvageRarityProvider';
import { RandomNumberProvider } from '~/incarnate_simulation/RandomNumberProvider';
import { SalvageRarity } from '~/incarnate_simulation/types/SalvageRarity';
import { SalvageRarityProbabilityProvider } from '~/incarnate_simulation/SalvageRarityProbabilityProvider';

interface TestMacroConfig {
    randomNumber: number;
    expectedSalvageRarity: SalvageRarity;
}

const testMacro = ({ randomNumber, expectedSalvageRarity }: TestMacroConfig): void => {
    const randomNumberProvider = container.resolve(RandomNumberProvider);
    sinon.stub(randomNumberProvider, 'getRandomNumber').returns(randomNumber);

    const salvageRarityProbabilityProvider = container.resolve(SalvageRarityProbabilityProvider);
    sinon.stub(salvageRarityProbabilityProvider, 'getSalvageRarityProbability').returns([
        { probability: 0.1, rarity: 'VeryRare' },
        { probability: 0.2, rarity: 'Rare' },
        { probability: 0.3, rarity: 'Uncommon' },
        { probability: 0.4, rarity: 'Common' },
    ]);

    const randomSalvageRarityProvider = new RandomSalvageRarityProvider(
        randomNumberProvider,
        salvageRarityProbabilityProvider,
    );

    const actualSalvageRarity = randomSalvageRarityProvider.getRandomSalvageRarity();
    expect(actualSalvageRarity).toBe(expectedSalvageRarity);
};

describe('random salvage rarity provider', () => {
    it('probability below very rare limit', () => {
        testMacro({ randomNumber: 0.05, expectedSalvageRarity: 'VeryRare' });
    });
    it('probability at very rare limit', () => {
        testMacro({ randomNumber: 0.1, expectedSalvageRarity: 'Rare' });
    });

    it('probability between very rare and rare', () => {
        testMacro({ randomNumber: 0.2, expectedSalvageRarity: 'Rare' });
    });

    it('probability between uncommon and common', () => {
        testMacro({ randomNumber: 0.7, expectedSalvageRarity: 'Common' });
    });
});
