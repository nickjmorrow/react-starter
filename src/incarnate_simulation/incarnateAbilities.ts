import { IncarnateAbility } from '~/incarnate_simulation/types';
import { salvage } from '~/incarnate_simulation/salvage';

const MusculatureBoost: IncarnateAbility = {
    name: 'Musculature Boost',
    childIncarnateAbilities: [],
    salvage: [salvage.BiomorphicGoo, salvage.MeditationTechniques, salvage.GenomicAnalysis],
};

const MusculatureCoreBoost: IncarnateAbility = {
    name: 'Musculature Core Boost',
    childIncarnateAbilities: [MusculatureBoost],
    salvage: [salvage.ArcaneCantrip, salvage.DetailedReports, salvage.WornSpellbook],
};

const MusculatureRadialBoost: IncarnateAbility = {
    name: 'Musculature Radial Boost',
    childIncarnateAbilities: [MusculatureBoost],
    salvage: [salvage.BiomorphicGoo, salvage.EnchantedSand, salvage.GluonCompound],
};

export const incarnateAbilities = {
    MusculatureBoost,
    MusculatureCoreBoost,
    MusculatureRadialBoost,
};
