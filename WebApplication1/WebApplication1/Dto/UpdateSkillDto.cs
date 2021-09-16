using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Dto
{
    public class UpdateSkillDto
    {
        [MaxLength(255)]
        [Required]
        public string Name { get; set; }
    }
}
