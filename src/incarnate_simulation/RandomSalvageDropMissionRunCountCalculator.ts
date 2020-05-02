import { injectable, container } from 'tsyringe';
import { Player, IncarnateAbility, Salvage, SalvageRarity } from '~/incarnate_simulation/types';
import { RandomSalvageRarityProvider } from '~/incarnate_simulation/RandomSalvageRarityProvider';

const getUnobtainedIncarnateAbilities = (player: Player): IncarnateAbility[] => {
    return player.desiredIncarnateAbilities.filter(dia => !player.incarnateAbilities.some(ia => ia.name === dia.name));
};

const getConstituentSalvage = (incarnateAbility: IncarnateAbility): Salvage[] => {
    let incarnateAbilities = [incarnateAbility];
    let requiredSalvage: Salvage[] = [];

    while (incarnateAbilities.length > 0) {
        const incarnateAbility = incarnateAbilities.pop()!;
        const { salvage, childIncarnateAbilities } = incarnateAbility;
        requiredSalvage = [...requiredSalvage, ...salvage];
        incarnateAbilities = [...incarnateAbilities, ...childIncarnateAbilities];
    }

    return requiredSalvage;
};

type SalvageRarityDropCount = {
    [K in SalvageRarity]: number;
};

const getInitialSalvageDropRarityCount = (): SalvageRarityDropCount => {
    return {
        VeryRare: 0,
        Rare: 0,
        Uncommon: 0,
        Common: 0,
    };
};

const buildSalvageDropRarityCount = (salvageRarities: SalvageRarity[]): SalvageRarityDropCount => {
    const initialSalvageDropRarityCount = getInitialSalvageDropRarityCount();
    salvageRarities.forEach(sr => {
        initialSalvageDropRarityCount[sr] += 1;
    });

    return initialSalvageDropRarityCount;
};

const doesActualSalvageDropRarityCountMeetRequired = (
    actualSalvageRarityDropCount: SalvageRarityDropCount,
    requiredSalvageRarityDropCount: SalvageRarityDropCount,
): boolean => {
    let doesMeetRequired = true;
    for (const rarity in requiredSalvageRarityDropCount) {
        const requiredCount = requiredSalvageRarityDropCount[rarity as SalvageRarity];
        const actualCount = actualSalvageRarityDropCount[rarity as SalvageRarity];
        doesMeetRequired = doesMeetRequired && actualCount >= requiredCount;
    }
    return doesMeetRequired;
};

const doesPlayerHaveEnoughSalvageDrops = (salvageDrops: SalvageRarity[], requiredSalvage: Salvage[]): boolean => {
    const actualSalvageRarityDropCount = buildSalvageDropRarityCount(salvageDrops);
    const requiredSalvageRarityDropCount = buildSalvageDropRarityCount(requiredSalvage.map(rs => rs.salvageRarity));
    return doesActualSalvageDropRarityCountMeetRequired(actualSalvageRarityDropCount, requiredSalvageRarityDropCount);
};

@injectable()
export class RandomSalvageDropMissionRunCountCalculator {
    private _randomSalvageRarityProvider: RandomSalvageRarityProvider;

    constructor(randomSalvageRarityProvider: RandomSalvageRarityProvider) {
        this._randomSalvageRarityProvider = randomSalvageRarityProvider;
    }

    calculateRandomSalvageDropMissionRunCount(player: Player): number {
        // first,
        const unobtainedIncarnateAbilities = getUnobtainedIncarnateAbilities(player);

        let missionCount = 0;

        let requiredSalvage: Salvage[] = [];

        unobtainedIncarnateAbilities.forEach(incarnateAbility => {
            const constituentSalvage = getConstituentSalvage(incarnateAbility);
            requiredSalvage = [...requiredSalvage, ...constituentSalvage];
        });

        let salvageDrops: SalvageRarity[] = [];

        while (!doesPlayerHaveEnoughSalvageDrops(salvageDrops, requiredSalvage)) {
            const salvageDrop = this._randomSalvageRarityProvider.getRandomSalvageRarity();
            salvageDrops = [...salvageDrops, salvageDrop];
            missionCount += 1;
        }

        return missionCount;
    }
}
