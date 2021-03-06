import PhotoRepository from "../../repository/photo-repository";
import Photo from "../../entity/photo";

export class PhotoUseCase {
  
  constructor(
    private readonly photoRepository: PhotoRepository = new PhotoRepository()
  ) {}

  public async save(filename: string): Promise<Photo>{
    return this.photoRepository.save(filename);
  }

  public async upload(newId: number, id: number): Promise<Photo> {
    return this.photoRepository.upload(newId, id);
  }
}