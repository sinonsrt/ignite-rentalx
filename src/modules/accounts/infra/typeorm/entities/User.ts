import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  driver_license: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: "avatar_url" })
  getAvatarUrl(): string {
    switch (process.env.disk) {
      case "local":
        return "";
        break;
      case "s3":
        return "";
        break;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }

    if (!this.created_at) {
      this.created_at = new Date();
    }
  }
}

export { User };
