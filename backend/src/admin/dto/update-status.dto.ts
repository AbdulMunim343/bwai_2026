import { IsArray, IsString, IsIn, ArrayMinSize, IsUUID } from 'class-validator';

const VALID_STATUSES = ['pending', 'confirm', 'shortlist', 'reject', 'check-in'];

export class UpdateRegistrationStatusDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one registration ID is required' })
  @IsUUID('4', { each: true, message: 'Each id must be a valid UUID' })
  ids: string[];

  @IsString()
  @IsIn(VALID_STATUSES, {
    message: `status must be one of: ${VALID_STATUSES.join(', ')}`,
  })
  status: string;
}
