import { ApiExtension } from '@nestjs/swagger';
import {
  Bundle,
  BundlePermissions,
  Permission,
} from 'src/lib/permissions.enum';

@ApiExtension('x-bundle-permissions', BundlePermissions)
export class PermissionsDto {
  bundles: Bundle[];
  permissions: Permission[];
}
