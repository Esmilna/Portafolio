namespace SistemaDeInventarioDeVentaDeVehiculos.Utils
{
    public class TokenValidationResult
    {
        public string message { get; set; }
        public bool success { get; set; }
        public UserData? dataSession { get; set; }

        private TokenValidationResult(string message, bool success)
        {
            this.message = message;
            this.success = success;
        }
        private TokenValidationResult (string message, bool success, UserData dataSession)
        {
            this.message = message;
            this.success = success;
            this.dataSession = dataSession;
        }

        public static TokenValidationResult Verify(string authHeader)
        {
            string? token = authHeader?.Split(' ').Last();
            if (token == "Bearer")
            {
                return new TokenValidationResult("token invalido", false);
            }

#pragma warning disable CS8604 // Possible null reference argument.
            bool isExpired = Jwt.IsTokenExpired(token);

            if (!isExpired)
            {
                UserData dataSession = Jwt.GetUserData(token);
                return new TokenValidationResult("Token válido", true, dataSession);
            }
            return new TokenValidationResult("token invalido", false);
        }
    }
}
