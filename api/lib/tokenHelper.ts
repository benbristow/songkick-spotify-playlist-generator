import * as jwt from 'jsonwebtoken';
import * as dayjs from 'dayjs';

import { InvalidTokenException } from './exceptions/invalidTokenException';

const secretKey = process.env.SECRET_KEY;

export const createJwtToken = (spotifyToken: string): string => {
    const expiresIn = dayjs().add(1, 'hour').toDate().getMilliseconds();
    return jwt.sign({ spotifyToken }, secretKey, { expiresIn: expiresIn });
}

export const decodeSpotifyToken = (jwtToken: string): string => {
    const decoded: any = jwt.verify(jwtToken, secretKey);

    if (!decoded) {
        throw new InvalidTokenException();
    }

    return decoded.spotifyToken;
}
