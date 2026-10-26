namespace API.Entities
{
    public class AppUser
    {
        public string Id { get; set; } = Guid.NewGuid().ToString(); // Gives each user a unique id be default
        public required string DisplayName { get; set; }
        public string Email { get; set; }
    }
}