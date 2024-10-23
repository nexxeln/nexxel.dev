const generateR2Url = (imagePath: string) => {
    const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const secetKey = process.env.CLOUDFLARE_SECRET_KEY;
};

export default { generateR2Url };