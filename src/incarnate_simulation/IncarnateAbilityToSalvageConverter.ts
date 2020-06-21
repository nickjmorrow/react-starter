import { injectable } from 'tsyringe';
import { IncarnateAbility, Salvage } from '~/incarnate_simulation';

@injectable()
export class IncarnateAbilityToSalvageConverter {
    convertIncarnateAbilityToSalvage(incarnateAbility: IncarnateAbility): Salvage[] {
        throw new Error();
    }
}
