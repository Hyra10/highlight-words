import AuthModel from '../Interfaces/auth-model.entity';

export default class AuthData implements AuthModel {

  constructor(
    public userId: string = '',
    public email: string = '',
    public psw: string = '') {}
}
