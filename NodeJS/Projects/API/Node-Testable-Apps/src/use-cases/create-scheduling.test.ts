import { describe, expect, it } from 'vitest';
import { InMemorySchedulingRepository } from '../repositories/im-memory/in-memory-schedulings-repository';
import { getFutureDate } from '../test/utils/get-future-date';
import { CreateScheduling } from './create-scheduling';


describe('Create Scheduling', () => {

  it('should not be able to create an scheduling with overlapping dates', async () => {

    const startsAt = getFutureDate('2023-08-10');
    const endsAt = getFutureDate('2023-08-15');

    const schedulingsRepository = new InMemorySchedulingRepository();
    const createScheduling = new CreateScheduling(
      schedulingsRepository
    );

    await createScheduling.execute(
      {
        customer: 'John Doe',
        startsAt,
        endsAt
      });

    expect(createScheduling.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2024-08-14'),
      endsAt: getFutureDate('2024-08-18')
    })).rejects.toBeInstanceOf(Error);

    expect(createScheduling.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2024-08-08'),
      endsAt: getFutureDate('2024-08-12')
    })).rejects.toBeInstanceOf(Error);

    expect(createScheduling.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2024-08-08'),
      endsAt: getFutureDate('2024-08-17')
    })).rejects.toBeInstanceOf(Error);

    expect(createScheduling.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2024-08-11'),
      endsAt: getFutureDate('2024-08-12')
    })).rejects.toBeInstanceOf(Error);

    
  });
});