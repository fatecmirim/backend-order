import { PhotoUseCase } from "../../use-case/photo/photo-use-case";
import { ResponseStatus } from "../../facilities/enums/respose-status";

export default class PhotoController {
  constructor(
    private readonly photoUseCase: PhotoUseCase = new PhotoUseCase()
  ) { }

  public async savePhoto(req, res, next): Promise<void> {
    const { filename } = req.file;
    console.log(filename);
    try {
      const response = await this.photoUseCase.save(filename);
      if (response) {
        return res.status(ResponseStatus.CREATED).json({ photo: response });
      }
      return res.status(ResponseStatus.BAD_REQUEST).json();
    } catch (error) {
      return res.status(ResponseStatus.SERVER_ERROR).json(error);
    }
  }
}