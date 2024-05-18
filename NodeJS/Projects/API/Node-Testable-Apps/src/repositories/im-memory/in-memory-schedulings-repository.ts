import { areIntervalsOverlapping } from 'date-fns';
import { Scheduling } from '../../entities/scheduling';
import { SchedulingsRepository } from '../schedulings-repository';


export class InMemorySchedulingRepository implements SchedulingsRepository {
  public items: Scheduling[] = [];

  async create(scheduling: Scheduling): Promise<void> {
    this.items.push(scheduling);
  }

  async findOverLappingScheduling(startsAt: Date, endsAt: Date): Promise<Scheduling | null> {
    const overLappingScheduling = this.items.find(scheduling => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: scheduling.startsAt, end: scheduling.endsAt },
        { inclusive: true }
      );
    });

    if (!overLappingScheduling) {
      return null;
    }

    return overLappingScheduling;
  }

}