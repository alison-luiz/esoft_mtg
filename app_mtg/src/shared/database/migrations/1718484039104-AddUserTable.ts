import { User } from '../../../modules/users/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from '../../../modules/users/enums/role.enum';

export class Migrations1718484039104 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new User();
    const password = bcrypt.hashSync('test@123', 10);

    user.firstName = 'Test';
    user.lastName = 'User';
    user.email = 'test@user.com';
    user.password = password;
    user.roles = [Role.ADMIN];

    await queryRunner.manager.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE email = 'test@user.com'`);
  }
}
