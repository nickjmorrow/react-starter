import { injectable } from 'tsyringe';
import { SalvageRarity } from '~/incarnate_simulation';

injectable();
export class SalvageRarityProbabilityProvider {
    getSalvageRarityProbability = (): { rarity: SalvageRarity; probability: number }[] => {
        return [
            { probability: 0.1, rarity: 'VeryRare' },
            { probability: 0.2, rarity: 'Rare' },
            { probability: 0.3, rarity: 'Uncommon' },
            { probability: 0.4, rarity: 'Common' },
        ];
    };
}
