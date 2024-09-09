
using System.IdentityModel.Tokens.Jwt;

namespace SistemaDeInventarioDeVentaDeVehiculos.Utils;

public class Jwt
{
    public string? Key { get; set; }
    public string? Issuer { get; set; }
    public string? Audience { get; set; }
    public string? Subject { get; set; }

    public static bool IsTokenExpired(string token)
    {
        if(string.IsNullOrWhiteSpace(token)) return true;

        var jwtTokenHandle = new JwtSecurityTokenHandler();

        //if (!jwtTokenHandle.CanReadToken(token)) return true;
        var jwtToken = jwtTokenHandle.ReadJwtToken(token);
        
        var exp = jwtToken.Payload.Exp;

        var secondsSinceEpoch = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

        return exp < secondsSinceEpoch;
    }

    public static UserData GetUserData(string token)
    {
        var jwtToken = new JwtSecurityToken(token);

        //get current role and email session values
        var email = jwtToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
        var role = jwtToken.Claims.FirstOrDefault(c => c.Type == "role")?.Value;


#pragma warning disable CS8604 // Possible null reference argument.
        UserData userData = new UserData(email, role);
#pragma warning restore CS8604 // Possible null reference argument.

        return userData;
    }

}

public class UserData
{
    public string email { get; set; }
    public string role { get; set; }

    public string? fullName { get; set; }
    public string? avatar { get; set; }

    public UserData(string email, string role)
    {
        this.email = email;
        this.role = role;
    }
}


