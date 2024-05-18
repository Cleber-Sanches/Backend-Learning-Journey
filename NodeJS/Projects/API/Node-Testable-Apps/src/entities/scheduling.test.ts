import { expect, test } from 'vitest';
import { getFutureDate } from '../test/utils/get-future-date';
import { Scheduling } from './scheduling';


test('Create an scheduling', () => {
  const startsAt = getFutureDate('2023-08-10');
  const endsAt = getFutureDate('2023-08-11');

  const scheduling = new Scheduling({
    customer: 'John Doe',
    startsAt,
    endsAt
  });

  expect(scheduling).toBeInstanceOf(Scheduling);
  expect(scheduling.customer).toEqual('John Doe');
});

test('cannot create an scheduling with and date before start date', () => {
  const startsAt = getFutureDate('2023-08-10');
  const endsAt = getFutureDate('2023-08-09');


  expect(() => {
    return new Scheduling({
      customer: 'John Doe',
      startsAt,
      endsAt
    });
  }).toThrow();
});

test('cannot create an scheduling with start date before now', () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() - 1);
  endsAt.setDate(endsAt.getDate() + 3);

  expect(() => {
    return new Scheduling({
      customer: 'John Doe',
      startsAt,
      endsAt
    });
  }).toThrow();
});