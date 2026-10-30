namespace API.Entities
{
    public class AppUser
    {
        public string Id { get; set; } = Guid.NewGuid().ToString(); // Gives each user a unique id be default
        public required string DisplayName { get; set; }
        public required string Email { get; set; }
        public required byte[] PasswordHash { get; set; }
        public required byte[] PasswordSalt { get; set; }
    }
}
