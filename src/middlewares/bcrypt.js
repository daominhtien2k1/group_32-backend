import { hash } from 'bcrypt';

const hashString = async (value) => {
    return await hash(value, 10);
}

export default hashString