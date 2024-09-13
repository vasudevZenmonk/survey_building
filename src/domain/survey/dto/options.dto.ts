import { IsBoolean, IsNotEmpty, IsUrl } from 'class-validator';

export class OptionsDto {
  @IsUrl({}, { message: 'URL must be a valid URL' })
  url: string;

  @IsBoolean({ message: 'Is_mandatory must be a boolean' })
  @IsNotEmpty({ message: 'Is_mandatory is required' })
  is_mandatory: boolean;
}
