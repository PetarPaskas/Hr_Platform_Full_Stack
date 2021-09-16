using System;
using System.Collections.Generic;
using WebApplication1.Data.Core.Domain;

namespace WebApplication1.Dto
{
     public class CandidateDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string ContactNumber { get; set; }
        public string EMail { get; set; }

        public IEnumerable<SkillDto> Skills { get; set; }

        public CandidateDto()
        {
            Skills = new List<SkillDto>();
        }
    }
}