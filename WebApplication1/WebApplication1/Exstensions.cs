using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Controllers.Api;
using WebApplication1.Data.Core.Domain;
using WebApplication1.Dto;

namespace WebApplication1
{
    internal static class Exstensions
    {
        public static CandidateDto AsDto(this Candidate item)
        {
            IEnumerable<SkillDto> skills = item.Skills.Select(cs => cs.Skill.AsDto());

            return new CandidateDto
            {
                Id = item.Id,
                FullName = item.FullName,
                EMail = item.EMail,
                ContactNumber = item.ContactNumber,
                DateOfBirth = item.DateOfBirth,
                Skills = skills is null ? new List<SkillDto>() : skills
            };
        }

        public static SkillDto AsDto(this Skill item)
        {
            return new SkillDto()
            {
                Id = item.Id,
                Name = item.Name
            };
        }
    }
}
