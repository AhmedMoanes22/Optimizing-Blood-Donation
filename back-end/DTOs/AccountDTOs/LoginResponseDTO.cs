﻿namespace BloodDonation.DTOs.AccountDTOs
{
    public class LoginResponseDTO
    {
        public string Id { get; set; } 
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; } // "Donor", "Recipient", or "Hospital"
    }
}