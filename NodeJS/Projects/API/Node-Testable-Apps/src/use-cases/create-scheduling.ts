import { Scheduling } from '../entities/scheduling';
import { SchedulingsRepository } from '../repositories/schedulings-repository';

interface CreateSchedulingRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateSchedulingResponse = Scheduling

export class CreateScheduling {
  constructor(
    private schedulingsRepository: SchedulingsRepository
  ) { }
  async execute({ customer, startsAt, endsAt }: CreateSchedulingRequest): Promise<CreateSchedulingResponse> {

    const overLappingScheduling = await this.schedulingsRepository.findOverLappingScheduling(
      startsAt,
      endsAt
    );

    if(overLappingScheduling){
      throw new Error('Another scheduling overlaps this scheduling dates');
    }

    const scheduling = new Scheduling(
      {
        customer,
        startsAt,
        endsAt
      }
    );

    await this.schedulingsRepository.create(scheduling);

    return scheduling;

  }
}