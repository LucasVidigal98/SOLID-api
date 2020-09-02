import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateUserUseCase {
  constructor(
    //Essa declaração automaticamente define userRepository como um atributo da classe CreateUserCase.
    //this.userRepository = IUsersRepository
    private userRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async excute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("User already exsists.");
    }

    const user = new User(data);

    await this.userRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Lucas",
        email: "conato@app.com",
      },
      subject: "Teste solid api",
      body: "Testing .. .. ..",
    });
  }
}
