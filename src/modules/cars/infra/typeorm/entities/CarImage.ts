import { Column, CreateDateColumn, Entity } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("cars_image")
class CarImage {
  @Column()
  id: string;

  @Column()
  car_id: string;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { CarImage };
