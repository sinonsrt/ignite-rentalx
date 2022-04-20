interface ICreateCarImageDTO {
  car_id: string;
  images_name: string[];
}

interface IFiles {
  filename: string;
}

export { ICreateCarImageDTO, IFiles };
