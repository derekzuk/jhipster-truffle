export class ImageUpload {
    public imageUploadId?: any;
    public imagePath?: string;
    public cryptoUser?: string;

    constructor(
        imageUploadId?: any,
        imagePath?: string,
        cryptoUser?: string
    ) {
        this.imageUploadId = imageUploadId ? imageUploadId : null;
        this.imagePath = imagePath ? imagePath : null;
        this.cryptoUser = cryptoUser ? cryptoUser : null;
    }
}
