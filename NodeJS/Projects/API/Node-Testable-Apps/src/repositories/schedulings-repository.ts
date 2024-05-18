import { Scheduling } from '../entities/scheduling';

export interface SchedulingsRepository {
  create(scheduling: Scheduling): Promise<void>
  findOverLappingScheduling(startsAt: Date, endsAt: Date): Promise<Scheduling | null>
}