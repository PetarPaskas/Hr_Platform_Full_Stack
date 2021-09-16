using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Dto
{
    public class UpdateCandidateDto
    {
        public string FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string ContactNumber { get; set; }
        public string EMail { get; set; }
        public ICollection<int> Skills { get; set; }

        public UpdateCandidateDto()
        {
            Skills = new List<int>();
        }
    }
}
