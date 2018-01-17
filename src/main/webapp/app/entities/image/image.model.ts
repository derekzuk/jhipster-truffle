import { BaseEntity } from './../../shared';

export class Image implements BaseEntity {
    constructor(
        public id?: number,
        public crypto_user?: string,
        public image_location?: string,
        public upvoteCount?: number,
        public imageBase64?: string
    ) {
    }
}
