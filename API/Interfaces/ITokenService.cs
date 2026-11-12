using API.Entities;

namespace API.Interfaces
{
    public class ITokenService
    {
        string CreateToken(AppUser user);
    }
}