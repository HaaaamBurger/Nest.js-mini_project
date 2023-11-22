import { IsEnum, IsOptional } from 'class-validator';

import { PaginationQueryDto } from '../../../../common/dto/pagination_dto/pagination.query.dto';
import { EOrder } from '../../../../common/enums/pagination_enums/order.enum';
import { EUserListOrderField } from '../../enum/user-list-order-field_enum';

export class UserListQueryRequestDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(EOrder)
  order?: EOrder = EOrder.ASC;

  @IsOptional()
  @IsEnum(EUserListOrderField)
  orderBy?: EUserListOrderField = EUserListOrderField.createdAt;
}
