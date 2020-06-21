import { IncarnateAbility, Salvage, IncarnateThread } from '~/incarnate_simulation';

export type Player = {
    incarnateAbilities: IncarnateAbility[];
    salvage: Salvage[];
    incarnateThreads: number;
    empyreanMerits: number;
    desiredIncarnateAbilities: IncarnateAbility[];
};
