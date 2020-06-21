import { Salvage } from '~/incarnate_simulation';

export type IncarnateAbility = {
    name: string;
    childIncarnateAbilities: IncarnateAbility[];
    salvage: Salvage[];
};
