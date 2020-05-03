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

const rarities = Object.keys(getInitialSalvageDropRarityCount()) as SalvageRarity[];

const getDifferenceInActualVsRequiredSalvageRarityCount = (
    actualSalvageRarityDropCount: SalvageRarityDropCount,
    requiredSalvageRarityDropCount: SalvageRarityDropCount,
): SalvageRarityDropCount => {
    const salvageDropCountDifferent = getInitialSalvageDropRarityCount();
    rarities.forEach(rarity => {
        const requiredCount = requiredSalvageRarityDropCount[rarity as SalvageRarity];
        const actualCount = actualSalvageRarityDropCount[rarity as SalvageRarity];
        salvageDropCountDifferent[rarity] = requiredCount - actualCount;
    });
    return salvageDropCountDifferent;
};

const salvageRarityToThreadCost = {
    Common: 20,
    Uncommon: 60,
};

const salvageRarityToMeritCost = {
    Rare: 8,
    VeryRare: 20,
};

const doesPlayerHaveEnoughSalvageDrops = (
    salvageDrops: SalvageRarity[],
    requiredSalvage: Salvage[],
    player: Player,
): boolean => {
    const actualSalvageRarityDropCount = buildSalvageDropRarityCount(salvageDrops);
    const requiredSalvageRarityDropCount = buildSalvageDropRarityCount(requiredSalvage.map(rs => rs.salvageRarity));
    const salvageDifference = getDifferenceInActualVsRequiredSalvageRarityCount(
        actualSalvageRarityDropCount,
        requiredSalvageRarityDropCount,
    );

    let { incarnateThreads, empyreanMerits } = player;

    rarities.forEach(rarity => {
        const missingSalvage = Math.max(0, salvageDifference[rarity]);
        if (rarity in salvageRarityToThreadCost) {
            incarnateThreads -=
                missingSalvage * salvageRarityToThreadCost[rarity as keyof typeof salvageRarityToThreadCost];
        } else if (rarity in salvageRarityToMeritCost) {
            empyreanMerits -=
                missingSalvage * salvageRarityToMeritCost[rarity as keyof typeof salvageRarityToMeritCost];
        }
    });

    return incarnateThreads >= 0 && empyreanMerits >= 0;
};

@injectable()
export class RandomSalvageDropMissionRunCountCalculator {
    private _randomSalvageRarityProvider: RandomSalvageRarityProvider;

    constructor(randomSalvageRarityProvider: RandomSalvageRarityProvider) {
        this._randomSalvageRarityProvider = randomSalvageRarityProvider;
    }

    calculateRandomSalvageDropMissionRunCount(player: Player): number {
        const unobtainedIncarnateAbilities = getUnobtainedIncarnateAbilities(player);

        let missionCount = 0;

        let requiredSalvage: Salvage[] = [];

        unobtainedIncarnateAbilities.forEach(incarnateAbility => {
            const constituentSalvage = getConstituentSalvage(incarnateAbility);
            requiredSalvage = [...requiredSalvage, ...constituentSalvage];
        });

        let salvageDrops: SalvageRarity[] = [];

        while (!doesPlayerHaveEnoughSalvageDrops(salvageDrops, requiredSalvage, player)) {
            const salvageDrop = this._randomSalvageRarityProvider.getRandomSalvageRarity();
            salvageDrops = [...salvageDrops, salvageDrop];
            missionCount += 1;
        }

        return missionCount;
    }
}
