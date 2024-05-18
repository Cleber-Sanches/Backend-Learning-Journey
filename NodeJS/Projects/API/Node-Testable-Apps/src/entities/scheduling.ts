export interface ISchedulingPropos {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}


export class Scheduling {
  private props: ISchedulingPropos;

  get customer() {
    return this.props.customer;
  }

  get startsAt() {
    return this.props.startsAt;
  }

  get endsAt() {
    return this.props.endsAt;
  }

  constructor(props: ISchedulingPropos) {
    const { startsAt, endsAt } = props;

    if (startsAt <= new Date()) {
      throw new Error('Ivalid start date');

    }

    if (endsAt <= startsAt) {
      throw new Error('The end date must be greater than the start date');
    }
    this.props = props;
  }
}