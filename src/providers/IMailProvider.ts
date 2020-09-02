//Providers, serviçoes externos. Não é masma coisa que utilizar um bando de dados ou semalhante.
interface IAdress {
  email: string;
  name: string;
}

export interface IMessage {
  to: IAdress;
  from: IAdress;
  subject: string;
  body: string;
}

export interface IMailProvider {
  sendMail(message: IMessage): Promise<void>;
}
