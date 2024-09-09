
using Microsoft.Extensions.Configuration;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DB.Data.Entities;

public class CloudinaryService
{
    private readonly IConfiguration _config;


    public CloudinaryService(IConfiguration config)
    {
        _config = config;
    }

    public Account GetAccount()
    {
        var cloudinary = _config.GetSection("Cloudinary");

        string cloudName = cloudinary.GetValue<string>("CloudName");
        string apiKey = cloudinary.GetValue<string>("ApiKey");
        string apiSecret = cloudinary.GetValue<string>("ApiSecret");

        var account = new Account(cloudName, apiKey, apiSecret);

        return account;
    }

    public async Task<string> UploadImage(byte[] bytes, string fileName)
    {
        using (var stream = new MemoryStream(bytes))
        {
            var fileDescription = new FileDescription(fileName, stream);

            var account = GetAccount();
            var cloudinary = new Cloudinary(account);

            var uploadParams = new ImageUploadParams
            {
                File = fileDescription
            };

            var uploadResult = await cloudinary.UploadAsync(uploadParams);
            string imageUrl = uploadResult.SecureUrl.AbsoluteUri;

            return imageUrl;
        }
    }


    public async Task DestroyImage(string publicId)
    {
        var account = GetAccount();
        var cloudinary = new Cloudinary(account);

        var deletionParams = new DeletionParams(publicId)
        {
            ResourceType = ResourceType.Image,
            Invalidate = true
        };

        await cloudinary.DestroyAsync(deletionParams);
    }
}