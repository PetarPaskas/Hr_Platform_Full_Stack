using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Dto
{
    public class CreateCandidateDto
    {   
        [Required]
        public string FullName { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string ContactNumber { get; set; }
        [Required]
        [MaxLength(255)]
        public string EMail { get; set; }
        [Required]
        public ICollection<int> Skills { get; set; }

        public CreateCandidateDto()
        {
            Skills = new List<int>();
        }
    }
}
