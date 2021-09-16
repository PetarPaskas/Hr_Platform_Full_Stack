using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Data.Core.Domain
{
    public class Skill
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<CandidateSkill> CandidateSkill { get; set; }

        public Skill()
        {
            CandidateSkill = new List<CandidateSkill>();
        }
    }
}
