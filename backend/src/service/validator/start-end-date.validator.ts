import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

// checks if the end date is greater than start date
export function IsStartDateBeforeEndDate(
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isStartDateBeforeEndDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const endDate = args.object['endDate']; // Get the value of endDate property
          return new Date(value) < new Date(endDate); // Return true if startDate is before endDate
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be before ${args.constraints[0]}`;
        },
      },
    });
  };
}
