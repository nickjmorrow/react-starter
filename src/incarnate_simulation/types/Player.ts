import { IncarnateAbility, Salvage, IncarnateThread } from '~/incarnate_simulation';

export type Player = {
    incarnateAbilities: IncarnateAbility[];
    salvage: Salvage[];
    incarnateTheads: IncarnateThread[];
    desiredIncarnateAbilities: IncarnateAbility[];
};
