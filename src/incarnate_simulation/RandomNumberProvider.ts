import { injectable } from 'tsyringe';

@injectable()
export class RandomNumberProvider {
    getRandomNumber = (): number => {
        return Math.random();
    };
}
